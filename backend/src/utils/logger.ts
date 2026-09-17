import pino from 'pino';
import { config } from '../config';
import { RequestContext } from './context';

export const logger = pino({
  level: config.logger.level,
  redact: {
    paths: [
      'password',
      'passwordHash',
      'token',
      'accessToken',
      'refreshToken',
      'authorization',
      'cookie',
      'secret',
      'apiKey',
      '*.password',
      '*.passwordHash',
      '*.token',
      '*.accessToken',
      '*.refreshToken',
      '*.authorization',
      '*.cookie',
      '*.secret',
      '*.apiKey',
      'headers.authorization',
      'headers.cookie',
      'req.headers.authorization',
      'req.headers.cookie',
    ],
    censor: '[REDACTED]',
  },
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
