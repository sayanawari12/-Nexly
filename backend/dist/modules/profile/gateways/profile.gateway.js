"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileGateway = void 0;
const token_service_1 = require("../../auth/services/token.service");
const logger_1 = __importDefault(require("../../../utils/logger"));
let ioInstance = null;
const tokenService = new token_service_1.TokenService();
class ProfileGateway {
    /**
     * Initializes the profiles namespace inside socket server
     */
    static initialize(io) {
        ioInstance = io;
        const namespace = io.of('/profiles');
        // Middleware to verify JWT tokens
        namespace.use((socket, next) => {
            const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];
            if (!token) {
                return next(new Error('Authentication failed. No credentials supplied.'));
            }
            try {
                const decoded = tokenService.verifyAccessToken(token);
                socket.data = { userId: decoded.sub };
                next();
            }
            catch (err) {
                next(new Error('Authentication failed. Invalid credentials.'));
            }
        });
        namespace.on('connection', (socket) => {
            const userId = socket.data.userId;
            const userRoom = `user:profile:${userId}`;
            socket.join(userRoom);
            logger_1.default.info({
                eventName: 'PROFILE_SOCKET_CONNECTED',
                socketId: socket.id,
                userId,
                room: userRoom,
            });
            socket.on('disconnect', (reason) => {
                logger_1.default.info({
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
    async sendNotification(userId, payload) {
        if (!ioInstance) {
            logger_1.default.warn({
                eventName: 'PROFILE_GATEWAY_NOT_INITIALIZED',
                message: 'Could not dispatch real-time socket updates. ioInstance is null.',
            });
            return;
        }
        const userRoom = `user:profile:${userId}`;
        ioInstance.of('/profiles').to(userRoom).emit('notification:received', payload);
        logger_1.default.info({
            eventName: 'PROFILE_NOTIFICATION_EMITTED',
            userId,
            room: userRoom,
            notificationId: payload.id,
        });
    }
    /**
     * Dispatches profile snapshot updates
     */
    async broadcastProfileUpdate(userId, data) {
        if (!ioInstance)
            return;
        const userRoom = `user:profile:${userId}`;
        ioInstance.of('/profiles').to(userRoom).emit('profile:updated', data);
    }
}
exports.ProfileGateway = ProfileGateway;
exports.default = ProfileGateway;
