"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketAuthMiddleware = socketAuthMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../../config");
const logger_1 = require("../../../utils/logger");
function socketAuthMiddleware(socket, next) {
    try {
        let token = socket.handshake.auth?.token || socket.handshake.headers?.authorization;
        if (!token && socket.handshake.query?.token) {
            token = socket.handshake.query.token;
        }
        if (!token) {
            logger_1.logger.warn({
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
        const decoded = jsonwebtoken_1.default.verify(token, config_1.config.auth.jwtAccessSecret);
        // Bind authenticated user identity directly to socket data context
        socket.data.user = {
            id: decoded.sub,
            role: decoded.role,
        };
        logger_1.logger.info({
            eventName: 'SOCKET_AUTH_SUCCESS',
            socketId: socket.id,
            userId: decoded.sub,
        });
        next();
    }
    catch (err) {
        logger_1.logger.warn({
            eventName: 'SOCKET_AUTH_FAILED',
            socketId: socket.id,
            error: err.message,
            message: 'Rejecting socket handshake: Token validation failed.',
        });
        next(new Error('Invalid or expired authentication token.'));
    }
}
exports.default = socketAuthMiddleware;
