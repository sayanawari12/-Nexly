"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketGateway = void 0;
const socket_config_1 = require("../config/socket.config");
const socket_auth_middleware_1 = require("../middleware/socket-auth.middleware");
const logger_1 = require("../../../utils/logger");
class SocketGateway {
    io;
    submissionsNamespace;
    constructor() {
        this.io = (0, socket_config_1.getSocketServer)();
        // Namespace separation for code submissions
        this.submissionsNamespace = this.io.of('/submissions');
        // Attach authentication handshake guards
        this.submissionsNamespace.use(socket_auth_middleware_1.socketAuthMiddleware);
        this.initializeHandlers();
    }
    /**
     * Initializes event listeners and lifecycle handlers.
     */
    initializeHandlers() {
        this.submissionsNamespace.on('connection', (socket) => {
            const user = socket.data.user;
            const userRoom = `user:${user.id}`;
            // Automatically join the private user session room
            socket.join(userRoom);
            logger_1.logger.info({
                eventName: 'SOCKET_ROOM_JOINED',
                socketId: socket.id,
                userId: user.id,
                room: userRoom,
                message: `Socket connection connected and bound to private room: ${userRoom}.`,
            });
            socket.on('disconnect', (reason) => {
                logger_1.logger.info({
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
    sendToUser(userId, eventName, payload) {
        const userRoom = `user:${userId}`;
        this.submissionsNamespace.to(userRoom).emit(eventName, payload);
        logger_1.logger.info({
            eventName: 'SOCKET_BROADCAST_SENT',
            userId,
            room: userRoom,
            event: eventName,
        });
    }
}
exports.SocketGateway = SocketGateway;
exports.default = SocketGateway;
