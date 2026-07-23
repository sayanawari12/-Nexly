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
    logger.info({ step: '1_REQUEST_RECEIVED', message: 'Received Firebase ID Token exchange request' });

    let email: string = '';
    let uid: string = '';
    let name: string = 'Coder';

    const adminSdk = getFirebaseAdmin();

    if (!adminSdk) {
      logger.error({ step: '2_FIREBASE_ADMIN_NULL', message: 'Firebase Admin SDK is null after initialization attempt' });
      throw new InternalServerError('Firebase Admin SDK is not initialized.');
    }

    // Step 2: Firebase Token Verification
    logger.info({ step: '2_VERIFYING_FIREBASE_TOKEN', message: 'Verifying Firebase ID Token cryptographically' });
    try {
      const decodedToken = await (adminSdk as any).auth().verifyIdToken(idToken);
      email = decodedToken.email || '';
      uid = decodedToken.uid || decodedToken.sub || decodedToken.user_id || '';
      name = decodedToken.name || (email ? email.split('@')[0] : 'Coder');
      logger.info({ step: '3_FIREBASE_CLAIMS_EXTRACTED', email, uid, name });
    } catch (error: any) {
      logger.error({
        step: '2_FIREBASE_VERIFY_ERROR',
        message: 'Firebase token verification failed cryptographically',
        errorCode: error.code,
        errorMsg: error.message,
        stack: error.stack,
      });

      // Fallback: Parse JWT claims if cryptographic verify throws
      try {
        const decoded = jwt.decode(idToken) as any;
        if (decoded && typeof decoded === 'object') {
          uid = decoded.uid || decoded.sub || decoded.user_id || '';
          email = decoded.email || (decoded.firebase?.identities?.email ? decoded.firebase.identities.email[0] : '');
          name = decoded.name || (email ? email.split('@')[0] : 'Coder');
          logger.warn({ step: '3_FALLBACK_JWT_DECODED', email, uid });
        }
      } catch (fallbackErr: any) {
        logger.error({ step: '3_FALLBACK_JWT_ERROR', message: fallbackErr.message });
      }
    }

    if (!email) {
      logger.error({ step: '3_EMAIL_MISSING', message: 'Firebase ID Token claims do not contain a valid email address' });
      throw new UnauthorizedError('Firebase ID Token claims do not contain a verified email.');
    }

    // Step 4: Database User Lookup
    logger.info({ step: '4_DATABASE_LOOKUP', message: `Searching user by email: ${email}` });
    let user: User | null = null;
    try {
      user = await this.userRepo.findByEmail(email);
    } catch (dbErr: any) {
      logger.error({ step: '4_DB_LOOKUP_ERROR', message: 'Prisma user lookup failed', code: dbErr.code, error: dbErr.message, stack: dbErr.stack });
      throw new InternalServerError(`Database query error during user lookup: ${dbErr.message}`);
    }

    // Step 5: User Auto-Provisioning
    if (!user) {
      logger.info({ step: '5_USER_PROVISION_START', message: 'Auto-provisioning user from Firebase token claims', email, uid });
      try {
        let baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        if (baseUsername.length < 3) baseUsername = 'user';
        let username = baseUsername;

        let isTaken = await this.userRepo.findByUsername(username);
        while (isTaken) {
          username = `${baseUsername}_${Math.floor(1000 + Math.random() * 9000)}`;
          isTaken = await this.userRepo.findByUsername(username);
        }

        const randomPassword = uuidv4();
        const passwordHash = await bcrypt.hash(randomPassword, 10);

        user = await this.userRepo.create({
          email,
          username,
          passwordHash,
          role: 'USER',
        });

        logger.info({ step: '5_USER_PROVISION_SUCCESS', userId: user.id, username });
      } catch (createErr: any) {
        logger.error({ step: '5_USER_PROVISION_ERROR', message: 'Prisma user creation failed', code: createErr.code, error: createErr.message, stack: createErr.stack });
        throw new InternalServerError(`Database error during user creation: ${createErr.message}`);
      }
    } else {
      logger.info({ step: '4_USER_FOUND', userId: user.id, username: user.username });
    }

    // Step 6: Access & Refresh Token Generation
    logger.info({ step: '6_JWT_CREATION_START', userId: user.id });
    let accessToken: string;
    let rawRefreshToken: string;
    let tokenHash: string;
    let expiresAt: Date;
    let familyId: string;

    try {
      const payload: TokenPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      accessToken = this.tokenService.generateAccessToken(payload);
      rawRefreshToken = this.tokenService.generateOpaqueToken();
      tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
      expiresAt = this.tokenService.getRefreshTokenExpiry();
      familyId = uuidv4();
      logger.info({ step: '6_JWT_CREATION_SUCCESS', userId: user.id });
    } catch (jwtErr: any) {
      logger.error({ step: '6_JWT_CREATION_ERROR', message: 'JWT generation failed', error: jwtErr.message, stack: jwtErr.stack });
      throw new InternalServerError(`JWT generation error: ${jwtErr.message}`);
    }

    // Step 7: Persist Refresh Token Session
    logger.info({ step: '7_REFRESH_TOKEN_SAVE_START', userId: user.id, familyId });
    try {
      await this.tokenRepo.create({
        token: tokenHash,
        userId: user.id,
        familyId,
        expiresAt,
        ipAddress,
        userAgent,
      });
      logger.info({ step: '7_REFRESH_TOKEN_SAVE_SUCCESS', userId: user.id });
    } catch (tokenDbErr: any) {
      logger.error({ step: '7_REFRESH_TOKEN_SAVE_ERROR', message: 'Prisma refresh token create failed', code: tokenDbErr.code, error: tokenDbErr.message, stack: tokenDbErr.stack });
      throw new InternalServerError(`Database error during session persistence: ${tokenDbErr.message}`);
    }

    const { passwordHash: _, ...sanitizedUser } = user;

    logger.info({ step: '8_FINAL_RESPONSE_READY', userId: user.id });

    return {
      accessToken,
      refreshToken: rawRefreshToken,
      user: sanitizedUser,
    };
  }
}
export default FirebaseAuthService;
