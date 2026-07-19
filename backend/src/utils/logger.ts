import pino from 'pino';
import { config } from '../config';
import { RequestContext } from './context';

export const logger = pino({
  level: config.logger.level,
  // Auto-inject correlation tracking parameters into structured JSON logs
  mixin() {
    const requestId = RequestContext.getRequestId();
    const userId = RequestContext.get('userId');
    
    return {
      ...(requestId && { requestId }),
      ...(userId && { userId }),
    };
  },
  transport: config.app.env !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
});

export default logger;
