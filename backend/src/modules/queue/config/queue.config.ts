import Redis, { RedisOptions } from 'ioredis';
import { config } from '../../../config';
import { logger } from '../../../utils/logger';

/**
 * Creates a fresh ioredis instance configured with REDIS_URL and mandatory BullMQ options.
 */
export function createRedisInstance(extraOptions: Partial<RedisOptions> = {}): Redis {
  return new Redis(config.queue.redisUrl, {
    maxRetriesPerRequest: null, // mandatory config for BullMQ compatibility
    enableReadyCheck: false,
    ...extraOptions,
  });
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
