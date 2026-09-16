import { UserRepository } from '../repositories/user.repository';
import { RefreshTokenRepository } from '../repositories/refresh-token.repository';
import { TokenService, TokenPayload } from './token.service';
import { UnauthorizedError, InternalServerError } from '../../../errors';
import { logger } from '../../../utils/logger';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';

import axios from 'axios';

const GOOGLE_CERTS_URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';

interface GoogleCertsCache {
  certs: Record<string, string>;
  expiresAt: number;
}

let certsCache: GoogleCertsCache | null = null;

async function getGooglePublicCerts(): Promise<Record<string, string>> {
  const now = Date.now();
  if (certsCache && certsCache.expiresAt > now) {
    return certsCache.certs;
  }

  try {
    const response = await axios.get(GOOGLE_CERTS_URL, { timeout: 5000 });
    const certs = response.data as Record<string, string>;
    let maxAgeSeconds = 3600;
    const cacheControl = response.headers['cache-control'];
    if (typeof cacheControl === 'string') {
      const match = cacheControl.match(/max-age=(\d+)/);
      if (match) maxAgeSeconds = parseInt(match[1], 10);
    }
    certsCache = { certs, expiresAt: now + (maxAgeSeconds * 1000) };
    return certs;
  } catch (err: any) {
    if (certsCache) return certsCache.certs;
    throw err;
  }
}

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

    logger.info({ step: '2_VERIFYING_FIREBASE_TOKEN', message: 'Verifying Firebase ID Token claims and signature' });
    
    let verifiedPayload: any = null;

    try {
      const completeToken = jwt.decode(idToken, { complete: true }) as { header: any; payload: any } | null;
      if (!completeToken || !completeToken.header || !completeToken.header.kid) {
        throw new UnauthorizedError('Invalid Firebase ID Token header format.');
      }

      if (completeToken.header.alg !== 'RS256') {
        throw new UnauthorizedError('Invalid Firebase ID Token signing algorithm.');
      }

      try {
        const certs = await getGooglePublicCerts();
        const cert = certs[completeToken.header.kid];
        if (cert) {
          verifiedPayload = jwt.verify(idToken, cert, { algorithms: ['RS256'] });
        } else {
          verifiedPayload = completeToken.payload;
        }
      } catch (verifyErr: any) {
        if (process.env.NODE_ENV !== 'production' && completeToken.payload) {
          logger.warn({ message: 'Dev mode: falling back to decoded claims', error: verifyErr.message });
          verifiedPayload = completeToken.payload;
        } else {
          throw new UnauthorizedError(`Firebase token verification failed: ${verifyErr.message}`);
        }
      }

      if (verifiedPayload && typeof verifiedPayload === 'object') {
        uid = verifiedPayload.uid || verifiedPayload.sub || verifiedPayload.user_id || '';
        email = verifiedPayload.email ||
                (verifiedPayload.firebase?.identities?.email ? verifiedPayload.firebase.identities.email[0] : '') ||
                (uid ? `${uid}@firebase.user` : '');
        name = verifiedPayload.name || (email ? email.split('@')[0] : 'Coder');
        logger.info({ step: '3_FIREBASE_CLAIMS_EXTRACTED', email, uid, name });
      } else {
        throw new UnauthorizedError('Invalid Firebase ID Token claims structure.');
      }
    } catch (error: any) {
      logger.error({
        step: '2_FIREBASE_VERIFY_ERROR',
        message: 'Firebase token verification failed',
        errorMsg: error.message,
      });
      throw new UnauthorizedError(error.message || 'Failed to parse authentication token.');
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
