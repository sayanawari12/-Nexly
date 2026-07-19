import { Request, Response, NextFunction, RequestHandler } from 'express';
import { TokenService } from '../services/token.service';
import { UnauthorizedError, ForbiddenError } from '../../../errors';
import { RequestContext } from '../../../utils/context';

const tokenService = new TokenService();

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

/**
 * Middleware that guards endpoints requiring user authentication.
 * Intercepts Bearer tokens inside headers and validates claims.
 */
export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnauthorizedError('Access token is missing or invalid.'));
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = tokenService.verifyAccessToken(token);
    
    // Propagate variables to AsyncLocalStorage request context store
    RequestContext.set('userId', decoded.sub);
    RequestContext.set('role', decoded.role);

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    next(new UnauthorizedError('Access token is expired or invalid.'));
  }
};

/**
 * Middleware that parses authentication headers optionally without throwing on failure.
 * Allows anonymous requests but binds user context if token is present.
 */
export const optionalAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next();
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = tokenService.verifyAccessToken(token);
    
    RequestContext.set('userId', decoded.sub);
    RequestContext.set('role', decoded.role);

    req.user = {
      id: decoded.sub,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    // Fail silently to support anonymous reads
  }
  next();
};

/**
 * Middleware that guards endpoints restricting access based on user RBAC roles.
 */
export const requireRole = (...allowedRoles: string[]): RequestHandler => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new UnauthorizedError('Authentication required.'));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new ForbiddenError('You do not have permission to access this resource.'));
      return;
    }

    next();
  };
};
