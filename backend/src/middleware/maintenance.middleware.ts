import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/database';
import { AuthenticatedRequest } from '../modules/auth/middleware/auth.middleware';
import { ServiceUnavailableError, ForbiddenError } from '../errors';

let cachedMode: string | null = null;
let lastCheckTime = 0;
const CACHE_TTL_MS = 5000; // 5-second config cache protection limit

/**
 * Global interceptor middleware enforcing Maintenance and Read-Only restrictions
 */
export async function maintenanceModeGuard(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const now = Date.now();
  
  // Throttle database lookups to protect against high load spikes
  if (!cachedMode || now - lastCheckTime > CACHE_TTL_MS) {
    try {
      const setting = await prisma.platformSetting.findUnique({
        where: { key: 'MAINTENANCE_MODE' },
      });
      cachedMode = setting ? setting.value : 'NORMAL';
      lastCheckTime = now;
    } catch (err) {
      // Fallback to NORMAL on connection limits errors
      cachedMode = 'NORMAL';
    }
  }

  const mode = cachedMode;

  if (mode === 'NORMAL') {
    return next();
  }

  const role = req.user?.role;
  const isPrivileged = role === 'SUPER_ADMIN' || role === 'PLATFORM_ADMIN';

  if (mode === 'EMERGENCY') {
    next(new ServiceUnavailableError('System is locked under emergency lockout status.'));
    return;
  }

  if (mode === 'MAINTENANCE') {
    if (isPrivileged) return next();
    next(new ServiceUnavailableError('System is undergoing scheduled maintenance operations.'));
    return;
  }

  if (mode === 'READ_ONLY') {
    const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
    if (isMutation && !isPrivileged) {
      next(new ForbiddenError('System is in read-only state. Mutations are suspended.'));
      return;
    }
  }

  next();
}
export default maintenanceModeGuard;
