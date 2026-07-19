import { Request, Response } from 'express';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { FirebaseAuthService } from './services/firebase-auth.service';
import { ApiResponse } from '../../utils/response';
import { UnauthorizedError } from '../../errors';
import { AuthenticatedRequest } from './middleware/auth.middleware';

export class AuthController {
  private readonly authService: AuthService;
  private readonly tokenService: TokenService;
  private readonly firebaseService: FirebaseAuthService;

  constructor(
    authService = new AuthService(),
    tokenService = new TokenService(),
    firebaseService = new FirebaseAuthService()
  ) {
    this.authService = authService;
    this.tokenService = tokenService;
    this.firebaseService = firebaseService;
  }

  /**
   * Registers a new user.
   */
  public register = async (req: Request, res: Response): Promise<void> => {
    const { email, username, password } = req.body;
    const sanitizedUser = await this.authService.register(email, username, password);
    res.status(201).json(ApiResponse.success(sanitizedUser));
  };

  /**
   * Performs user credential verification and registers session cookies.
   */
  public login = async (req: Request, res: Response): Promise<void> => {
    const { identifier, password } = req.body;
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const session = await this.authService.login(identifier, password, ipAddress, userAgent);
    
    // Bind token into secure HTTPOnly cookie
    this.tokenService.setRefreshTokenCookie(res, session.refreshToken);

    res.status(200).json(ApiResponse.success({
      accessToken: session.accessToken,
      user: session.user,
    }));
  };

  /**
   * Executes token rotation and sets new access/refresh credentials.
   */
  public refresh = async (req: Request, res: Response): Promise<void> => {
    // Attempt parsing from cookie first, fallback to payload body
    const token = req.cookies.refreshToken || req.body.refreshToken;
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    if (!token) {
      throw new UnauthorizedError('Session validation credentials are missing.');
    }

    const credentials = await this.authService.refresh(token, ipAddress, userAgent);
    
    // Bind rotated token
    this.tokenService.setRefreshTokenCookie(res, credentials.refreshToken);

    res.status(200).json(ApiResponse.success({
      accessToken: credentials.accessToken,
    }));
  };

  /**
   * Revokes the current session and clears authorization cookies.
   */
  public logout = async (req: Request, res: Response): Promise<void> => {
    const token = req.cookies.refreshToken || req.body.refreshToken;

    if (token) {
      await this.authService.logout(token);
    }

    // Always clean cookies on logout triggers
    this.tokenService.clearRefreshTokenCookie(res);

    res.status(200).json(ApiResponse.success({ message: 'Session logged out successfully.' }));
  };

  /**
   * Retrieves details for the currently active user profile.
   */
  public getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }

    const user = await this.authService.getCurrentUser(req.user.id);
    res.status(200).json(ApiResponse.success(user));
  };

  /**
   * Exchanges Firebase token for local JWT access and refresh tokens.
   */
  public firebaseExchange = async (req: Request, res: Response): Promise<void> => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Authorization header is missing or malformed.');
    }
    const idToken = authHeader.split(' ')[1];
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const session = await this.firebaseService.exchangeFirebaseToken(idToken, ipAddress, userAgent);

    // Bind token into secure HTTPOnly cookie
    this.tokenService.setRefreshTokenCookie(res, session.refreshToken);

    res.status(200).json(ApiResponse.success({
      accessToken: session.accessToken,
      user: session.user,
    }));
  };
}
export default AuthController;
