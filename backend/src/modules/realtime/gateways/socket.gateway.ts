import { Server, Namespace } from 'socket.io';
import { getSocketServer } from '../config/socket.config';
import { socketAuthMiddleware } from '../middleware/socket-auth.middleware';
import { logger } from '../../../utils/logger';

export class SocketGateway {
  private readonly io: Server;
  private readonly submissionsNamespace: Namespace;

  constructor() {
    this.io = getSocketServer();
    
    // Namespace separation for code submissions
    this.submissionsNamespace = this.io.of('/submissions');

    // Attach authentication handshake guards
    this.submissionsNamespace.use(socketAuthMiddleware);

    this.initializeHandlers();
  }

  /**
   * Initializes event listeners and lifecycle handlers.
   */
  private initializeHandlers(): void {
    this.submissionsNamespace.on('connection', (socket) => {
      const user = socket.data.user;
      const userRoom = `user:${user.id}`;

      // Automatically join the private user session room
      socket.join(userRoom);

      logger.info({
        eventName: 'SOCKET_ROOM_JOINED',
        socketId: socket.id,
        userId: user.id,
        room: userRoom,
        message: `Socket connection connected and bound to private room: ${userRoom}.`,
      });

      socket.on('disconnect', (reason) => {
        logger.info({
          eventName: 'SOCKET_DISCONNECTED',
          socketId: socket.id,
          userId: user.id,
          reason,
        });
      });
    });
  }

  /**
   * Broadcasts a real-time message to a specific user session room.
   */
  public sendToUser(userId: string, eventName: string, payload: any): void {
    const userRoom = `user:${userId}`;
    this.submissionsNamespace.to(userRoom).emit(eventName, payload);
    
    logger.info({
      eventName: 'SOCKET_BROADCAST_SENT',
      userId,
      room: userRoom,
      event: eventName,
    });
  }
}
export default SocketGateway;
