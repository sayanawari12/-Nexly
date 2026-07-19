export interface QueueConfig {
  redisUrl: string;
}

export const queueConfig: QueueConfig = {
  redisUrl: process.env.REDIS_URL || '',
};
