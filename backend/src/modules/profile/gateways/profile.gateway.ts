import { Server, Socket } from 'socket.io';
import { TokenService } from '../../auth/services/token.service';
import logger from '../../../utils/logger';

let ioInstance: Server | null = null;
const tokenService = new TokenService();

export class ProfileGateway {
  /**
   * Initializes the profiles namespace inside socket server
   */
  public static initialize(io: Server): void {
    ioInstance = io;
    const namespace = io.of('/profiles');

    // Middleware to verify JWT tokens
    namespace.use((socket: Socket, next) => {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
      if (!token) {
        return next(new Error('Authentication failed. No credentials supplied.'));
      }

      try {
        const decoded = tokenService.verifyAccessToken(token);
        socket.data = { userId: decoded.sub };
        next();
      } catch (err) {
        next(new Error('Authentication failed. Invalid credentials.'));
      }
    });

    namespace.on('connection', (socket: Socket) => {
      const userId = socket.data.userId;
      const userRoom = `user:profile:${userId}`;
      socket.join(userRoom);

      logger.info({
        eventName: 'PROFILE_SOCKET_CONNECTED',
        socketId: socket.id,
        userId,
        room: userRoom,
      });

      socket.on('disconnect', (reason) => {
        logger.info({
          eventName: 'PROFILE_SOCKET_DISCONNECTED',
          socketId: socket.id,
          userId,
          reason,
        });
      });
    });
  }

  /**
   * Dispatches real-time WebSocket notification directly to the connected user channel
   */
  public async sendNotification(userId: string, payload: {
    id: string;
    title: string;
    message: string;
    type: string;
    createdAt: Date;
  }): Promise<void> {
    if (!ioInstance) {
      logger.warn({
        eventName: 'PROFILE_GATEWAY_NOT_INITIALIZED',
        message: 'Could not dispatch real-time socket updates. ioInstance is null.',
      });
      return;
    }

    const userRoom = `user:profile:${userId}`;
    ioInstance.of('/profiles').to(userRoom).emit('notification:received', payload);

    logger.info({
      eventName: 'PROFILE_NOTIFICATION_EMITTED',
      userId,
      room: userRoom,
      notificationId: payload.id,
    });
  }

  /**
   * Dispatches profile snapshot updates
   */
  public async broadcastProfileUpdate(userId: string, data: any): Promise<void> {
    if (!ioInstance) return;

    const userRoom = `user:profile:${userId}`;
    ioInstance.of('/profiles').to(userRoom).emit('profile:updated', data);
  }
}
export default ProfileGateway;
