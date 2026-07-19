import Redis from 'ioredis';
import { config } from '../../../config';
import { logger } from '../../../utils/logger';

// Create a single shared connection to our dedicated Redis container
export const redisConnection = new Redis(config.queue.redisUrl, {
  maxRetriesPerRequest: null, // mandatory config for BullMQ compatibility
});

redisConnection.on('connect', () => {
  logger.info({
    eventName: 'REDIS_CONNECTION_CONNECTED',
    message: 'Established connection connection with APEX Redis container.',
  });
});

redisConnection.on('error', (err) => {
  logger.error({
    eventName: 'REDIS_CONNECTION_FAILED',
    error: err.message,
    message: 'Lost connection connection to Redis container.',
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
