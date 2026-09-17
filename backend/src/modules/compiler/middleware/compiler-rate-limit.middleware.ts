import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../utils/logger';

interface RateLimitRecord {
  timestamps: number[];
}

const executionHistory = new Map<string, RateLimitRecord>();
const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_EXECUTIONS_PER_WINDOW = 10;

// Periodic cleanup of stale rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of executionHistory.entries()) {
    record.timestamps = record.timestamps.filter((ts) => ts > now - WINDOW_MS);
    if (record.timestamps.length === 0) {
      executionHistory.delete(key);
    }
  }
}, 5 * 60 * 1000);

/**
 * Server-side Rate Limiter Middleware for Code Execution Endpoints
 * Enforces max 10 executions per minute per IP / User identity.
 */
export function compilerRateLimiter(req: Request, res: Response, next: NextFunction): void {
  const userKey = (req as any).user?.id || req.ip || req.headers['x-forwarded-for'] || 'anonymous';
  const key = `compiler_exec:${userKey}`;
  const now = Date.now();

  let record = executionHistory.get(key);
  if (!record) {
    record = { timestamps: [] };
    executionHistory.set(key, record);
  }

  // Filter timestamps within the last 1 minute
  record.timestamps = record.timestamps.filter((ts) => ts > now - WINDOW_MS);

  if (record.timestamps.length >= MAX_EXECUTIONS_PER_WINDOW) {
    const oldest = record.timestamps[0];
    const retryAfterSec = Math.ceil((oldest + WINDOW_MS - now) / 1000);

    logger.warn({
      eventName: 'COMPILER_RATE_LIMIT_EXCEEDED',
      userKey,
      retryAfterSec,
    });

    res.setHeader('Retry-After', retryAfterSec);
    res.status(429).json({
      success: false,
      error: `Rate limit exceeded. Maximum 10 code executions per minute permitted. Please wait ${retryAfterSec} seconds.`,
    });
    return;
  }

  record.timestamps.push(now);
  next();
}

export default compilerRateLimiter;
