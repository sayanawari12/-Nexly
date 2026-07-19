import { UserRepository } from '../repositories/user.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { TokenService, TokenPayload } from './token.service';
import { getFirebaseAdmin } from '../providers/firebase.provider';
import { UnauthorizedError, InternalServerError } from '../../../errors';
import { logger } from '../../../utils/logger';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

export interface FirebaseAuthSession {
  accessToken: string;
  refreshToken: string;
  user: Omit<User, 'passwordHash'>;
}

export class FirebaseAuthService {
  private readonly userRepo: UserRepository;
  private readonly tokenRepo: RefreshTokenRepository;
  private readonly tokenService: TokenService;

  constructor(
    userRepo = new UserRepository(),
    tokenRepo = new RefreshTokenRepository(),
    tokenService = new TokenService()
  ) {
    this.userRepo = userRepo;
    this.tokenRepo = tokenRepo;
    this.tokenService = tokenService;
  }

  /**
   * Verifies Firebase ID token and exchanges it for a Project APEX session.
   */
  public async exchangeFirebaseToken(
    idToken: string,
    ipAddress?: string,
    userAgent?: string
  ): Promise<FirebaseAuthSession> {
    let email: string;
    let uid: string;
    let name: string = 'Coder';

    const adminSdk = getFirebaseAdmin();

    if (adminSdk) {
      try {
        const decodedToken = await (adminSdk as any).auth().verifyIdToken(idToken);
        email = decodedToken.email || '';
        uid = decodedToken.uid;
        name = decodedToken.name || (email ? email.split('@')[0] : 'Coder');
      } catch (error: any) {
        logger.error({ message: 'Firebase token verification failed cryptographically', error: error.message });
        throw new UnauthorizedError('Invalid Firebase authentication token.');
      }
    } else {
      // Offline fallback / local development mock validation
      if (process.env.NODE_ENV === 'production') {
        throw new InternalServerError('Firebase authentication is not configured in production.');
      }

      logger.warn('Firebase Admin SDK is not initialized. Using local mock claims parsing.');

      try {
        const decoded = jwt.decode(idToken) as any;
        if (!decoded || typeof decoded !== 'object') {
          // If not a valid JWT format, treat the token itself as mock user identifier (useful for simple offline dev tools)
          if (idToken.includes('@')) {
            email = idToken;
            uid = `mock_${idToken.split('@')[0]}`;
          } else {
            email = `${idToken}@apex.local`;
            uid = `mock_${idToken}`;
          }
        } else {
          email = decoded.email || '';
          uid = decoded.uid || decoded.sub || 'mock_uid';
          name = decoded.name || (email ? email.split('@')[0] : 'Coder');
        }
      } catch (err) {
        logger.error('Failed parsing mock JWT token.');
        throw new UnauthorizedError('Invalid mock authentication credentials.');
      }
    }

    if (!email) {
      throw new UnauthorizedError('Firebase ID Token claims do not contain a verified email.');
    }

    // Find user or auto-provision record
    let user = await this.userRepo.findByEmail(email);

    if (!user) {
      logger.info({ message: 'Auto-provisioning user from Firebase token claims', email, uid });

      // Generate a unique username
      let baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      if (baseUsername.length < 3) baseUsername = 'user';
      let username = baseUsername;

      let isTaken = await this.userRepo.findByUsername(username);
      while (isTaken) {
        username = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;
        isTaken = await this.userRepo.findByUsername(username);
      }

      // Generate strong placeholder password hash
      const randomPassword = uuidv4();
      const passwordHash = await bcrypt.hash(randomPassword, 10);

      user = await this.userRepo.create({
        email,
        username,
        passwordHash,
        role: 'USER',
      });

      logger.info({ message: 'User provisioned successfully', userId: user.id, username });
    }

    // Generate session JWT Access/Refresh tokens
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.tokenService.generateAccessToken(payload);
    const rawRefreshToken = this.tokenService.generateOpaqueToken();
    const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
    const expiresAt = this.tokenService.getRefreshTokenExpiry();
    const familyId = uuidv4();

    // Persist refresh token session in database
    await this.tokenRepo.create({
      token: tokenHash,
      userId: user.id,
      familyId,
      expiresAt,
      ipAddress,
      userAgent,
    });

    const { passwordHash: _, ...sanitizedUser } = user;

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      user: sanitizedUser,
    };
  }
}
export default FirebaseAuthService;
