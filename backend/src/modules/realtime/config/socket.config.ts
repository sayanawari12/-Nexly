import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import { config } from '../../../config';
import { logger } from '../../../utils/logger';
import { createRedisInstance } from '../../queue/config/queue.config';

let ioServer: Server | null = null;
let pubClient: Redis | null = null;
let subClient: Redis | null = null;

/**
   * Initializes the Socket.io Server instance with CORS and Redis adapter.
   */
export function initSocketServer(httpServer: any): Server {
  ioServer = new Server(httpServer, {
    cors: {
      origin: '*', // Customize this per deployment requirements
      credentials: true,
    },
    pingTimeout: 20000, // 20s idle timeout before disconnect
    pingInterval: 10000, // 10s ping intervals
    maxHttpBufferSize: 1e6, // 1MB buffer cap
  });

  // Decoupled Redis Pub/Sub connections for cluster-wide adapter synchronization
  pubClient = createRedisInstance();
  subClient = pubClient.duplicate();

  ioServer.adapter(createAdapter(pubClient, subClient));

  logger.info({
    eventName: 'SOCKET_SERVER_INIT',
    message: 'Socket.io Server initialized with Redis adapter.',
  });

  return ioServer;
}

/**
   * Retrieves the active Socket.io Server instance.
   */
export function getSocketServer(): Server {
  if (!ioServer) {
    throw new Error('Socket.io Server is not initialized yet.');
  }
  return ioServer;
}

/**
   * Closes active connections cleanly.
   */
export async function closeSocketServer(): Promise<void> {
  if (ioServer) {
    ioServer.close();
  }
  if (pubClient) {
    await pubClient.quit();
  }
  if (subClient) {
    await subClient.quit();
  }
  logger.info({
    eventName: 'SOCKET_SERVER_CLOSED',
    message: 'Socket.io Server and Redis Adapter connections closed.',
  });
}
