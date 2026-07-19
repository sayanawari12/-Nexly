import { v4 as uuidv4 } from 'uuid';
import { User, RefreshToken } from '@prisma/client';
import { UserRepository } from '../repositories/user.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { PasswordService } from './password.service';
import { TokenService, TokenPayload } from './token.service';
import { UnauthorizedError, ConflictError, NotFoundError } from '../../../errors';
import { logger } from '../../../utils/logger';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'passwordHash'>;
}

export class AuthService {
  private readonly userRepo: UserRepository;
  private readonly tokenRepo: RefreshTokenRepository;
  private readonly passwordService: PasswordService;
  private readonly tokenService: TokenService;

  constructor(
    userRepo = new UserRepository(),
    tokenRepo = new RefreshTokenRepository(),
    passwordService = new PasswordService(),
    tokenService = new TokenService()
  ) {
    this.userRepo = userRepo;
    this.tokenRepo = tokenRepo;
    this.passwordService = passwordService;
    this.tokenService = tokenService;
  }

  /**
   * Registers a new user.
   */
  public async register(email: string, username: string, password: string): Promise<Omit<User, 'passwordHash'>> {
    // Check conflicts
    const existingEmail = await this.userRepo.findByEmail(email);
    if (existingEmail) {
      logger.warn({ message: 'Register failure: Email already exists', email });
      throw new ConflictError('Email is already registered.');
    }

    const existingUsername = await this.userRepo.findByUsername(username);
    if (existingUsername) {
      logger.warn({ message: 'Register failure: Username already taken', username });
      throw new ConflictError('Username is already taken.');
    }

    const passwordHash = await this.passwordService.hashPassword(password);
    
    const user = await this.userRepo.create({
      email,
      username,
      passwordHash,
      role: 'USER',
    });

    logger.info({ message: 'User registered successfully', userId: user.id, username });

    const { passwordHash: _, ...sanitizedUser } = user;
    return sanitizedUser;
  }

  /**
   * Performs credential verification and generates access and refresh tokens.
   */
  public async login(
    identifier: string,
    password: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<AuthSession> {
    const user = await this.userRepo.findByEmailOrUsername(identifier);
    
    // Constant-time check simulation: compare password anyway if user not found
    const passwordHash = user ? user.passwordHash : '$2b$10$invalidPasswordHashPlaceholderForTimingEnforcements';
    const isPasswordValid = await this.passwordService.comparePassword(password, passwordHash);

    if (!user || !isPasswordValid) {
      logger.warn({ message: 'Auth failure: Invalid credentials identifier', identifier, ipAddress });
      throw new UnauthorizedError('Invalid email/username or password.');
    }

    // Generate tokens
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const rawRefreshToken = this.tokenService.generateOpaqueToken();
    const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
    const expiresAt = this.tokenService.getRefreshTokenExpiry();
    const familyId = uuidv4(); // Start a new refresh token family

    // Persist hashed token in database
    await this.tokenRepo.create({
      token: tokenHash,
      userId: user.id,
      familyId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    logger.info({ message: 'User logged in successfully', userId: user.id, familyId });

    const { passwordHash: _, ...sanitizedUser } = user;
    
    return {
      accessToken,
      refreshToken: rawRefreshToken,
      user: sanitizedUser,
    };
  }

  /**
   * Refreshes access and refresh tokens using Refresh Token Rotation (RTR).
   */
  public async refresh(
    rawRefreshToken: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
    const tokenRecord = await this.tokenRepo.findByToken(tokenHash);

    if (!tokenRecord) {
      logger.warn({ message: 'Auth refresh failure: Token hash not found', ipAddress });
      throw new UnauthorizedError('Invalid or expired refresh token.');
    }

    const { id, userId, familyId, expiresAt, revoked } = tokenRecord;

    // 1. REPLAY DETECTION: Check if token has already been revoked
    if (revoked) {
      logger.fatal({
        message: 'CRITICAL SECURITY BREACH: Refresh token reuse detected!',
        userId,
        familyId,
        ipAddress,
        userAgent,
      });

      // Revoke all tokens in family to terminate active intruder/victim sessions
      await this.tokenRepo.revokeFamily(familyId);
      throw new UnauthorizedError('Security warning: Session invalidated due to reuse detection.');
    }

    // 2. Expiration check
    if (new Date() > expiresAt) {
      logger.warn({ message: 'Auth refresh failure: Token expired', userId, familyId });
      throw new UnauthorizedError('Refresh token expired. Please login again.');
    }

    // 3. Perform Token Rotation (RTR)
    // Revoke old token
    await this.tokenRepo.revokeToken(id);

    // Fetch user details for claims
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError('User associated with session not found.');
    }

    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = this.tokenService.generateAccessToken(payload);
    const newRawRefreshToken = this.tokenService.generateOpaqueToken();
    const newHash = this.tokenService.hashOpaqueToken(newRawRefreshToken);
    const newExpiresAt = this.tokenService.getRefreshTokenExpiry();

    // Register new token under the same familyId with parent trace
    await this.tokenRepo.create({
      token: newHash,
      userId,
      familyId,
      parentToken: tokenHash,
      expiresAt: newExpiresAt,
      ipAddress,
      userAgent,
    });

    logger.info({ message: 'Refresh token rotated successfully', userId, familyId });

    return {
      accessToken: newAccessToken,
      refreshToken: newRawRefreshToken,
    };
  }

  /**
   * Revokes the current session refresh token.
   */
  public async logout(rawRefreshToken: string): Promise<void> {
    const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
    const tokenRecord = await this.tokenRepo.findByToken(tokenHash);

    if (tokenRecord) {
      await this.tokenRepo.revokeToken(tokenRecord.id);
      logger.info({ message: 'Session logged out successfully', userId: tokenRecord.userId, tokenId: tokenRecord.id });
    }
  }

  /**
   * Global logout: Revokes all active refresh tokens/sessions associated with the user ID.
   */
  public async logoutAll(userId: string): Promise<void> {
    await this.tokenRepo.revokeAllForUser(userId);
    logger.info({ message: 'Global logout successfully executed', userId });
  }

  /**
   * Retrieves the current user details.
   */
  public async getCurrentUser(userId: string): Promise<Omit<User, 'passwordHash'>> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new NotFoundError('User profile not found.');
    }
    const { passwordHash: _, ...sanitizedUser } = user;
    return sanitizedUser;
  }
}
export default AuthService;
