import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';

interface RateLimitRecord {
  timestamps: number[];
}

const authAttemptsHistory = new Map<string, RateLimitRecord>();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_AUTH_ATTEMPTS = 10; // 10 attempts per minute per IP

// Periodic cleanup of stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of authAttemptsHistory.entries()) {
    record.timestamps = record.timestamps.filter((ts) => ts > now - WINDOW_MS);
    if (record.timestamps.length === 0) {
      authAttemptsHistory.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Server-side Rate Limiter Middleware for Authentication Endpoints
 * Prevents credential brute-forcing, automated registration spam, and token exchange abuse.
 */
export function authRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const key = `auth_attempt:${ip}`;
  const now = Date.now();

  let record = authAttemptsHistory.get(key);
  if (!record) {
    record = { timestamps: [] };
    authAttemptsHistory.set(key, record);
  }

  // Filter timestamps within the last 1 minute
  record.timestamps = record.timestamps.filter((ts) => ts > now - WINDOW_MS);

  if (record.timestamps.length >= MAX_AUTH_ATTEMPTS) {
    const oldest = record.timestamps[0];
    const retryAfterSec = Math.ceil((oldest + WINDOW_MS - now) / 1000);

    logger.warn({
      eventName: 'AUTH_RATE_LIMIT_EXCEEDED',
      ip,
      endpoint: req.originalUrl,
      retryAfterSec,
    });

    res.setHeader('Retry-After', retryAfterSec);
    res.status(429).json({
      success: false,
      error: `Too many authentication attempts. Please wait ${retryAfterSec} seconds before trying again.`,
    });
    return;
  }

  record.timestamps.push(now);
  next();
}

export default authRateLimiter;
