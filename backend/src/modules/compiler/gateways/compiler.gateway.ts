import { Server, Namespace, Socket } from 'socket.io';
import { getSocketServer } from '../../realtime/config/socket.config';
import { socketAuthMiddleware } from '../../realtime/middleware/socket-auth.middleware';
import { interactiveExecutionService } from '../services/interactive-execution.service';
import { logger } from '../../../utils/logger';

let compilerNamespaceInstance: Namespace | null = null;

export class CompilerGateway {
  private readonly io: Server;
  private readonly compilerNamespace: Namespace;

  constructor() {
    this.io = getSocketServer();
    
    // Dedicated Socket.IO namespace for real-time code execution (guaranteed registered once)
    if (!compilerNamespaceInstance) {
      compilerNamespaceInstance = this.io.of('/compiler');
      compilerNamespaceInstance.use(socketAuthMiddleware);
      this.initializeHandlers(compilerNamespaceInstance);
    }

    this.compilerNamespace = compilerNamespaceInstance;
  }

  private initializeHandlers(ns: Namespace): void {
    ns.on('connection', (socket: Socket) => {
      const user = socket.data.user;
      const sessionId = socket.id;

      logger.info({
        eventName: 'COMPILER_SOCKET_CONNECTED',
        socketId: socket.id,
        userId: user.id,
      });

      // Handle interactive code execution start
      socket.on('interactive:start', async (data: { language: string; code: string }) => {
        const { language, code } = data || {};

        logger.info({
          eventName: 'COMPILER_INTERACTIVE_START_REQUEST',
          socketId: socket.id,
          userId: user.id,
          language,
        });

        await interactiveExecutionService.startSession({
          sessionId,
          userId: user.id,
          language: language || '',
          code: code || '',
          onStdout: (text: string) => {
            socket.emit('interactive:stdout', { text });
          },
          onStderr: (text: string) => {
            socket.emit('interactive:stderr', { text });
          },
          onExit: (result) => {
            socket.emit('interactive:exit', result);
          },
          onError: (errorMsg: string) => {
            socket.emit('interactive:error', { error: errorMsg });
          },
        });
      });

      // Handle real-time stdin input from frontend terminal (bound to authenticated user)
      socket.on('interactive:stdin', (data: { input: string }) => {
        const inputStr = data?.input || '';
        interactiveExecutionService.writeStdin(sessionId, inputStr, user.id);
      });

      // Handle explicit Stop Execution action (bound to authenticated user)
      socket.on('interactive:stop', async () => {
        logger.info({
          eventName: 'COMPILER_INTERACTIVE_STOP_REQUEST',
          socketId: socket.id,
          userId: user.id,
        });
        await interactiveExecutionService.stopSession(sessionId, 'USER_STOPPED', user.id);
      });

      // Handle client disconnect (browser closed, tab closed, connection dropped)
      socket.on('disconnect', async (reason: string) => {
        logger.info({
          eventName: 'COMPILER_SOCKET_DISCONNECTED',
          socketId: socket.id,
          userId: user.id,
          reason,
        });
        await interactiveExecutionService.stopSession(sessionId);
      });
    });
  }
}
export default CompilerGateway;
