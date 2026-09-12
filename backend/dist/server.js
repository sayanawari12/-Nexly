"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const socket_config_1 = require("./modules/realtime/config/socket.config");
const socket_gateway_1 = require("./modules/realtime/gateways/socket.gateway");
const submission_worker_1 = require("./modules/queue/workers/submission.worker");
const contest_gateway_1 = require("./modules/contest/gateways/contest.gateway");
const contest_scheduler_1 = require("./modules/contest/schedulers/contest.scheduler");
const profile_gateway_1 = require("./modules/profile/gateways/profile.gateway");
const profile_worker_1 = require("./modules/profile/workers/profile.worker");
// Start BullMQ Worker processing queues on application boot
const submissionWorker = new submission_worker_1.SubmissionWorker();
// Start Distributed Contest State Scheduler
const contestScheduler = new contest_scheduler_1.ContestScheduler();
contestScheduler.start();
// Start Profile Event Worker
const profileWorker = new profile_worker_1.ProfileWorker();
profileWorker.start();
// Start HTTP Server
const server = app_1.default.listen(config_1.config.app.port, () => {
    console.log("NODE PID:", process.pid);
    logger_1.logger.info({
        message: `⚡ Server initialized successfully`,
        environment: config_1.config.app.env,
        port: config_1.config.app.port,
        pid: process.pid,
    });
});
const compiler_gateway_1 = require("./modules/compiler/gateways/compiler.gateway");
// Initialize Socket.io Server with Redis Adapter bindings
const io = (0, socket_config_1.initSocketServer)(server);
// Register Socket Gateways and namespaces eagerly
new socket_gateway_1.SocketGateway();
new contest_gateway_1.ContestGateway();
new compiler_gateway_1.CompilerGateway();
profile_gateway_1.ProfileGateway.initialize(io);
// Graceful Shutdown Handler
const gracefulShutdown = (signal) => {
    logger_1.logger.info({ message: `Received ${signal}. Shutting down application gracefully...` });
    server.close(async () => {
        logger_1.logger.info({ message: 'HTTP server closed. Shutting down active queue workers...' });
        try {
            await submissionWorker.close();
            await profileWorker.shutdown();
            await contestScheduler.stop();
            await (0, socket_config_1.closeSocketServer)();
            logger_1.logger.info({ message: 'Clean system shutdown. Exiting process.' });
            process.exit(0);
        }
        catch (err) {
            logger_1.logger.error({ message: 'Worker/Socket shutdown encountered error:', error: err.message });
            process.exit(1);
        }
    });
    // Force close after 10s if connections linger
    setTimeout(() => {
        logger_1.logger.error({ message: 'Could not close connections in time, forcefully shutting down.' });
        process.exit(1);
    }, 10000);
};
// Process-level event interceptors
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
    logger_1.logger.fatal({
        message: 'UNCAUGHT EXCEPTION! System shutting down...',
        error: error.message,
        stack: error.stack,
    });
    process.exit(1);
});
process.on('unhandledRejection', (reason) => {
    logger_1.logger.fatal({
        message: 'UNHANDLED REJECTION! System shutting down...',
        reason: reason instanceof Error ? reason.message : reason,
        stack: reason instanceof Error ? reason.stack : undefined,
    });
    process.exit(1);
});
