"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = initSocketServer;
exports.getSocketServer = getSocketServer;
exports.closeSocketServer = closeSocketServer;
const socket_io_1 = require("socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const logger_1 = require("../../../utils/logger");
const queue_config_1 = require("../../queue/config/queue.config");
let ioServer = null;
let pubClient = null;
let subClient = null;
/**
   * Initializes the Socket.io Server instance with CORS and Redis adapter.
   */
function initSocketServer(httpServer) {
    ioServer = new socket_io_1.Server(httpServer, {
        cors: {
            origin: (origin, callback) => {
                const envOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
                    .split(',')
                    .map((url) => url.trim().replace(/\/$/, ''))
                    .filter(Boolean);
                const safeOrigins = [
                    // Local development origins
                    'http://localhost:3000',
                    'http://localhost:5173',
                    'http://127.0.0.1:3000',
                    'http://127.0.0.1:5173',
                    // Production frontend domain (Nexly — primary)
                    'https://nexly-labs.vercel.app',
                    // Legacy production frontend domains
                    'https://bca-department-website.vercel.app',
                    'https://bca-web.vercel.app',
                    // Firebase Hosting domains
                    'https://bca-department-website.firebaseapp.com',
                    'https://bca-department-website.web.app',
                    ...envOrigins,
                ];
                const normalizedOrigin = origin ? origin.replace(/\/$/, '') : '';
                if (!origin || safeOrigins.includes(origin) || safeOrigins.includes(normalizedOrigin)) {
                    callback(null, origin || true);
                }
                else {
                    callback(new Error(`CORS: Origin '${origin}' is not allowed.`));
                }
            },
            credentials: true,
        },
        pingTimeout: 20000, // 20s idle timeout before disconnect
        pingInterval: 10000, // 10s ping intervals
        maxHttpBufferSize: 1e6, // 1MB buffer cap
    });
    // Decoupled Redis Pub/Sub connections for cluster-wide adapter synchronization
    pubClient = (0, queue_config_1.createRedisInstance)();
    subClient = pubClient.duplicate();
    ioServer.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
    logger_1.logger.info({
        eventName: 'SOCKET_SERVER_INIT',
        message: 'Socket.io Server initialized with Redis adapter.',
    });
    return ioServer;
}
/**
   * Retrieves the active Socket.io Server instance.
   */
function getSocketServer() {
    if (!ioServer) {
        throw new Error('Socket.io Server is not initialized yet.');
    }
    return ioServer;
}
/**
   * Closes active connections cleanly.
   */
async function closeSocketServer() {
    if (ioServer) {
        ioServer.close();
    }
    if (pubClient) {
        await pubClient.quit();
    }
    if (subClient) {
        await subClient.quit();
    }
    logger_1.logger.info({
        eventName: 'SOCKET_SERVER_CLOSED',
        message: 'Socket.io Server and Redis Adapter connections closed.',
    });
}
