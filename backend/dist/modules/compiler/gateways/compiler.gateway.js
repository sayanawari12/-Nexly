"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompilerGateway = void 0;
const socket_config_1 = require("../../realtime/config/socket.config");
const socket_auth_middleware_1 = require("../../realtime/middleware/socket-auth.middleware");
const interactive_execution_service_1 = require("../services/interactive-execution.service");
const logger_1 = require("../../../utils/logger");
let compilerNamespaceInstance = null;
class CompilerGateway {
    io;
    compilerNamespace;
    constructor() {
        this.io = (0, socket_config_1.getSocketServer)();
        // Dedicated Socket.IO namespace for real-time code execution (guaranteed registered once)
        if (!compilerNamespaceInstance) {
            compilerNamespaceInstance = this.io.of('/compiler');
            compilerNamespaceInstance.use(socket_auth_middleware_1.socketAuthMiddleware);
            this.initializeHandlers(compilerNamespaceInstance);
        }
        this.compilerNamespace = compilerNamespaceInstance;
    }
    initializeHandlers(ns) {
        ns.on('connection', (socket) => {
            const user = socket.data.user;
            const sessionId = socket.id;
            logger_1.logger.info({
                eventName: 'COMPILER_SOCKET_CONNECTED',
                socketId: socket.id,
                userId: user.id,
            });
            // Handle interactive code execution start
            socket.on('interactive:start', async (data) => {
                const { language, code } = data || {};
                logger_1.logger.info({
                    eventName: 'COMPILER_INTERACTIVE_START_REQUEST',
                    socketId: socket.id,
                    userId: user.id,
                    language,
                });
                await interactive_execution_service_1.interactiveExecutionService.startSession({
                    sessionId,
                    userId: user.id,
                    language: language || '',
                    code: code || '',
                    onStdout: (text) => {
                        socket.emit('interactive:stdout', { text });
                    },
                    onStderr: (text) => {
                        socket.emit('interactive:stderr', { text });
                    },
                    onExit: (result) => {
                        socket.emit('interactive:exit', result);
                    },
                    onError: (errorMsg) => {
                        socket.emit('interactive:error', { error: errorMsg });
                    },
                });
            });
            // Handle real-time stdin input from frontend terminal (bound to authenticated user)
            socket.on('interactive:stdin', (data) => {
                const inputStr = data?.input || '';
                interactive_execution_service_1.interactiveExecutionService.writeStdin(sessionId, inputStr, user.id);
            });
            // Handle explicit Stop Execution action (bound to authenticated user)
            socket.on('interactive:stop', async () => {
                logger_1.logger.info({
                    eventName: 'COMPILER_INTERACTIVE_STOP_REQUEST',
                    socketId: socket.id,
                    userId: user.id,
                });
                await interactive_execution_service_1.interactiveExecutionService.stopSession(sessionId, 'USER_STOPPED', user.id);
            });
            // Handle client disconnect (browser closed, tab closed, connection dropped)
            socket.on('disconnect', async (reason) => {
                logger_1.logger.info({
                    eventName: 'COMPILER_SOCKET_DISCONNECTED',
                    socketId: socket.id,
                    userId: user.id,
                    reason,
                });
                await interactive_execution_service_1.interactiveExecutionService.stopSession(sessionId);
            });
        });
    }
}
exports.CompilerGateway = CompilerGateway;
exports.default = CompilerGateway;
