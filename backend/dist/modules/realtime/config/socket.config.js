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
            origin: '*', // Customize this per deployment requirements
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
