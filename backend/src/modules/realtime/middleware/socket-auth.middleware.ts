import jwt from 'jsonwebtoken';
import { Socket } from 'socket.io';
import { config } from '../../../config';
import { logger } from '../../../utils/logger';

export function socketAuthMiddleware(socket: Socket, next: (err?: Error) => void): void {
  try {
    let token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;

    if (!token && socket.handshake.query?.token) {
      token = socket.handshake.query.token as string;
    }

    if (!token) {
      logger.warn({
        eventName: 'SOCKET_AUTH_MISSING',
        socketId: socket.id,
        message: 'Rejecting socket handshake: Authentication token missing.',
      });
      return next(new Error('Authentication token missing.'));
    }

    // Handle Bearer formatting prefix if present
    if (token.startsWith('Bearer ')) {
      token = token.slice(7);
    }

    const decoded = jwt.verify(token, config.auth.jwtAccessSecret) as any;

    // Bind authenticated user identity directly to socket data context
    socket.data.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    logger.info({
      eventName: 'SOCKET_AUTH_SUCCESS',
      socketId: socket.id,
      userId: decoded.sub,
    });

    next();
  } catch (err: any) {
    logger.warn({
      eventName: 'SOCKET_AUTH_FAILED',
      socketId: socket.id,
      error: err.message,
      message: 'Rejecting socket handshake: Token validation failed.',
    });
    next(new Error('Invalid or expired authentication token.'));
  }
}
export default socketAuthMiddleware;
