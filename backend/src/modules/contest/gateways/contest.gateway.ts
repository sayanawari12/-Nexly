import { Server, Namespace } from 'socket.io';
import { getSocketServer } from '../../realtime/config/socket.config';
import { socketAuthMiddleware } from '../../realtime/middleware/socket-auth.middleware';
import { logger } from '../../../utils/logger';
import { v4 as uuidv4 } from 'uuid';
import { ContestEventEnvelope } from '../types';
import { ContestStatus } from '@prisma/client';

let contestsNamespace: Namespace | null = null;

export class ContestGateway {
  private readonly io: Server;
  private readonly namespace: Namespace;

  constructor() {
    this.io = getSocketServer();
    
    if (!contestsNamespace) {
      contestsNamespace = this.io.of('/contests');
      contestsNamespace.use(socketAuthMiddleware);
      this.initializeHandlers(contestsNamespace);
    }
    
    this.namespace = contestsNamespace;
  }

  /**
   * Binds connection logic and room management listeners
   */
  private initializeHandlers(ns: Namespace): void {
    ns.on('connection', (socket) => {
      const user = socket.data.user;
      const userId = user.id;

      // Enable client to join a specific contest channel
      socket.on('join_contest', (data: { contestId: string }) => {
        const { contestId } = data;
        if (!contestId) return;

        const generalRoom = `contest:${contestId}`;
        const leaderboardRoom = `contest:${contestId}:leaderboard`;
        const privateUserRoom = `contest:${contestId}:user:${userId}`;

        socket.join(generalRoom);
        socket.join(leaderboardRoom);
        socket.join(privateUserRoom);

        if (user.role === 'ADMIN') {
          socket.join(`contest:${contestId}:admins`);
        }

        logger.info({
          eventName: 'CONTEST_SOCKET_ROOM_JOINED',
          socketId: socket.id,
          userId,
          contestId,
          role: user.role,
        });
      });

      socket.on('disconnect', (reason) => {
        logger.info({
          eventName: 'CONTEST_SOCKET_DISCONNECTED',
          socketId: socket.id,
          userId,
          reason,
        });
      });
    });
  }

  /**
   * Helper preparing the contract-compliant envelope wrapping payloads
   */
  private createEnvelope<T>(contestId: string, payload: T, schemaVersion = 1): ContestEventEnvelope<T> {
    return {
      eventId: uuidv4(),
      correlationId: 'socket-broadcast',
      schemaVersion,
      timestamp: new Date().toISOString(),
      contestId,
      sequenceNumber: Date.now(),
      payload,
    };
  }

  /**
   * Broadcasts contest start, freeze, and end state events
   */
  public async broadcastStateChange(contestId: string, status: ContestStatus, eventName: string): Promise<void> {
    const envelope = this.createEnvelope(contestId, { status });
    this.namespace.to(`contest:${contestId}`).emit(eventName, envelope);
    
    logger.info({
      eventName: 'CONTEST_STATE_BROADCAST',
      contestId,
      status,
      event: eventName,
    });
  }

  /**
   * Broadcasts live score rankings (respecting freeze conditions)
   */
  public async broadcastLeaderboardUpdate(contestId: string, status: ContestStatus): Promise<void> {
    const { LeaderboardService } = require('../services/leaderboard.service');
    const leaderboardService = new LeaderboardService();

    // 1. Fetch real-time cached board details
    const liveRankings = await leaderboardService.getLeaderboard(contestId, status, true);
    
    // 2. Broadcast live rankings to admins room unconditionally
    const adminEnvelope = this.createEnvelope(contestId, { rankings: liveRankings });
    this.namespace.to(`contest:${contestId}:admins`).emit('contest:leaderboard', adminEnvelope);

    // 3. For public rooms, do not broadcast updates if the contest is frozen or ended
    if (status === ContestStatus.FROZEN || status === ContestStatus.ENDED) {
      logger.info({
        eventName: 'LEADERBOARD_BROADCAST_FROZEN',
        contestId,
        message: 'Leaderboard update broadcast suspended under frozen/ended state.',
      });
      return;
    }

    // 4. Emit live update publicly
    const publicEnvelope = this.createEnvelope(contestId, { rankings: liveRankings });
    this.namespace.to(`contest:${contestId}:leaderboard`).emit('contest:leaderboard', publicEnvelope);

    logger.info({
      eventName: 'LEADERBOARD_BROADCAST_SENT',
      contestId,
      rankingsCount: liveRankings.length,
    });
  }

  /**
   * Broadcasts announcement messages
   */
  public async broadcastAnnouncement(contestId: string, announcement: any): Promise<void> {
    const envelope = this.createEnvelope(contestId, announcement);
    this.namespace.to(`contest:${contestId}`).emit('contest:announcement', envelope);

    logger.info({
      eventName: 'ANNOUNCEMENT_BROADCAST_SENT',
      contestId,
      announcementId: announcement.id,
    });
  }

  /**
   * Delivers answered clarifications (public announcements vs private alerts)
   */
  public async broadcastClarificationResponse(contestId: string, clarification: any): Promise<void> {
    const envelope = this.createEnvelope(contestId, clarification);

    if (clarification.isPublic) {
      // Broadcast to the whole contest channel
      this.namespace.to(`contest:${contestId}`).emit('contest:clarification', envelope);
    } else {
      // Send privately only to the questioning user
      this.namespace.to(`contest:${contestId}:user:${clarification.userId}`).emit('contest:clarification', envelope);
    }

    logger.info({
      eventName: 'CLARIFICATION_BROADCAST_SENT',
      contestId,
      clarificationId: clarification.id,
      isPublic: clarification.isPublic,
    });
  }
}
export default ContestGateway;
