import app from './app';
import { config } from './config';
import { logger } from './utils/logger';
import { initSocketServer, closeSocketServer } from './modules/realtime/config/socket.config';
import { SocketGateway } from './modules/realtime/gateways/socket.gateway';
import { SubmissionWorker } from './modules/queue/workers/submission.worker';
import { ContestGateway } from './modules/contest/gateways/contest.gateway';
import { ContestScheduler } from './modules/contest/schedulers/contest.scheduler';
import { ProfileGateway } from './modules/profile/gateways/profile.gateway';
import { ProfileWorker } from './modules/profile/workers/profile.worker';

// Start BullMQ Worker processing queues on application boot
const submissionWorker = new SubmissionWorker();

// Start Distributed Contest State Scheduler
const contestScheduler = new ContestScheduler();
contestScheduler.start();

// Start Profile Event Worker
const profileWorker = new ProfileWorker();
profileWorker.start();

// Start HTTP Server
const server = app.listen(config.app.port, () => {
  logger.info({
    message: `⚡ Server initialized successfully`,
    environment: config.app.env,
    port: config.app.port,
    pid: process.pid,
  });
});

// Initialize Socket.io Server with Redis Adapter bindings
const io = initSocketServer(server);

// Register Socket Gateways and namespaces eagerly
new SocketGateway();
new ContestGateway();
ProfileGateway.initialize(io);

// Graceful Shutdown Handler
const gracefulShutdown = (signal: string) => {
  logger.info({ message: `Received ${signal}. Shutting down application gracefully...` });
  
  server.close(async () => {
    logger.info({ message: 'HTTP server closed. Shutting down active queue workers...' });
    try {
      await submissionWorker.close();
      await profileWorker.shutdown();
      await contestScheduler.stop();
      await closeSocketServer();
      logger.info({ message: 'Clean system shutdown. Exiting process.' });
      process.exit(0);
    } catch (err: any) {
      logger.error({ message: 'Worker/Socket shutdown encountered error:', error: err.message });
      process.exit(1);
    }
  });

  // Force close after 10s if connections linger
  setTimeout(() => {
    logger.error({ message: 'Could not close connections in time, forcefully shutting down.' });
    process.exit(1);
  }, 10000);
};

// Process-level event interceptors
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

process.on('uncaughtException', (error: Error) => {
  logger.fatal({
    message: 'UNCAUGHT EXCEPTION! System shutting down...',
    error: error.message,
    stack: error.stack,
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason: any) => {
  logger.fatal({
    message: 'UNHANDLED REJECTION! System shutting down...',
    reason: reason instanceof Error ? reason.message : reason,
    stack: reason instanceof Error ? reason.stack : undefined,
  });
  process.exit(1);
});
