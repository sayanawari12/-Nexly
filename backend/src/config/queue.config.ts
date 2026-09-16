import { config } from './index';

export interface QueueConfig {
  redisUrl: string;
}

export const queueConfig: QueueConfig = {
  redisUrl: config.queue.redisUrl,
};
