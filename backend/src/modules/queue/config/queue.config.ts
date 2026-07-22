import Redis, { RedisOptions } from 'ioredis';
import { config } from '../../../config';
import { logger } from '../../../utils/logger';

/**
 * Centralized factory for ALL Redis connections in the application.
 * Explicitly parses REDIS_URL to extract host, port, auth, and TLS so ioredis never falls back to "host".
 */
export function createRedisInstance(extraOptions: Partial<RedisOptions> = {}): Redis {
  const redisUrl = config.queue.redisUrl;
  if (!redisUrl) {
    throw new Error('❌ REDIS_URL environment variable is missing or empty!');
  }

  try {
    const parsedUrl = new URL(redisUrl);
    const isTls = parsedUrl.protocol === 'rediss:';
    let host = parsedUrl.hostname;

    // Fix placeholder "host" hostname in environment variables
    if (host === 'host' || !host) {
      host = '127.0.0.1';
    }

    return new Redis({
      host,
      port: parsedUrl.port ? parseInt(parsedUrl.port, 10) : 6379,
      username: parsedUrl.username ? decodeURIComponent(parsedUrl.username) : undefined,
      password: parsedUrl.password ? decodeURIComponent(parsedUrl.password) : undefined,
      db: parsedUrl.pathname ? parseInt(parsedUrl.pathname.replace('/', ''), 10) || 0 : 0,
      tls: isTls ? { rejectUnauthorized: false } : undefined,
      maxRetriesPerRequest: null, // mandatory config for BullMQ compatibility
      enableReadyCheck: false,
      retryStrategy(times) {
        // Capped backoff (max 30s) to prevent reconnect log spamming
        return Math.min(times * 1000, 30000);
      },
      ...extraOptions,
    });
  } catch (err: any) {
    return new Redis(redisUrl, {
      maxRetriesPerRequest: null,
      enableReadyCheck: false,
      retryStrategy(times) {
        return Math.min(times * 1000, 30000);
      },
      ...extraOptions,
    });
  }
}

// Create a single shared connection to our dedicated Redis container
export const redisConnection = createRedisInstance();

redisConnection.on('connect', () => {
  logger.info({
    eventName: 'REDIS_CONNECTION_CONNECTED',
    message: 'Established connection to Redis container.',
  });
});

redisConnection.on('error', (err) => {
  logger.error({
    eventName: 'REDIS_CONNECTION_FAILED',
    error: err.message,
    message: 'Lost connection to Redis container.',
  });
});

export const defaultQueueOptions = {
  connection: redisConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000, // 1s, 2s, 4s...
    },
    removeOnComplete: {
      age: 3600, // 1 hour retention in memory
      count: 1000,
    },
    removeOnFail: {
      age: 24 * 3600 * 7, // 7 days retention
      count: 5000,
    },
  },
};
