import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { Response } from 'express';
import { config } from '../../../config';

export interface TokenPayload {
  sub: string; // User UUID
  email: string;
  role: string;
}

export class TokenService {
  private readonly accessSecret = config.auth.jwtAccessSecret;
  private readonly refreshSecret = config.auth.jwtRefreshSecret;
  private readonly accessExpiry = config.auth.jwtAccessExpiry;
  private readonly refreshExpiry = config.auth.jwtRefreshExpiry;

  /**
   * Generates a signed stateless JWT Access Token.
   */
  public generateAccessToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.accessSecret, {
      algorithm: 'HS256',
      expiresIn: this.accessExpiry as any,
    });
  }

  /**
   * Decodes and validates a JWT Access Token.
   */
  public verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, this.accessSecret) as TokenPayload;
  }

  /**
   * Generates a cryptographically secure random token string for session verification.
   */
  public generateOpaqueToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hashes an opaque token using SHA-256 (pre-db insert/lookup storage helper).
   */
  public hashOpaqueToken(token: string): string {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  /**
   * Calculates the expiration DateTime for a refresh token (default 7 days).
   */
  public getRefreshTokenExpiry(): Date {
    const days = 7;
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    return expiry;
  }

  /**
   * Appends the refresh token cookie securely to the HTTP Express response.
   */
  public setRefreshTokenCookie(res: Response, token: string): void {
    const isProd = config.app.env === 'production';
    
    res.cookie('refreshToken', token, {
      httpOnly: true,
      secure: isProd, // true in prod (requires HTTPS)
      sameSite: isProd ? 'strict' : 'lax', // strict in prod to block CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/api/v1/auth', // scope cookies specifically to auth handlers
    });
  }

  /**
   * Cleans/deletes the refresh token cookie from the client.
   */
  public clearRefreshTokenCookie(res: Response): void {
    res.clearCookie('refreshToken', {
      path: '/api/v1/auth',
    });
  }
}
export default TokenService;
