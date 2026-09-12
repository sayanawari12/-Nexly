"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestGateway = void 0;
const socket_config_1 = require("../../realtime/config/socket.config");
const socket_auth_middleware_1 = require("../../realtime/middleware/socket-auth.middleware");
const logger_1 = require("../../../utils/logger");
const uuid_1 = require("uuid");
const client_1 = require("@prisma/client");
let contestsNamespace = null;
class ContestGateway {
    io;
    namespace;
    constructor() {
        this.io = (0, socket_config_1.getSocketServer)();
        if (!contestsNamespace) {
            contestsNamespace = this.io.of('/contests');
            contestsNamespace.use(socket_auth_middleware_1.socketAuthMiddleware);
            this.initializeHandlers(contestsNamespace);
        }
        this.namespace = contestsNamespace;
    }
    /**
     * Binds connection logic and room management listeners
     */
    initializeHandlers(ns) {
        ns.on('connection', (socket) => {
            const user = socket.data.user;
            const userId = user.id;
            // Enable client to join a specific contest channel
            socket.on('join_contest', (data) => {
                const { contestId } = data;
                if (!contestId)
                    return;
                const generalRoom = `contest:${contestId}`;
                const leaderboardRoom = `contest:${contestId}:leaderboard`;
                const privateUserRoom = `contest:${contestId}:user:${userId}`;
                socket.join(generalRoom);
                socket.join(leaderboardRoom);
                socket.join(privateUserRoom);
                if (user.role === 'ADMIN') {
                    socket.join(`contest:${contestId}:admins`);
                }
                logger_1.logger.info({
                    eventName: 'CONTEST_SOCKET_ROOM_JOINED',
                    socketId: socket.id,
                    userId,
                    contestId,
                    role: user.role,
                });
            });
            socket.on('disconnect', (reason) => {
                logger_1.logger.info({
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
    createEnvelope(contestId, payload, schemaVersion = 1) {
        return {
            eventId: (0, uuid_1.v4)(),
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
    async broadcastStateChange(contestId, status, eventName) {
        const envelope = this.createEnvelope(contestId, { status });
        this.namespace.to(`contest:${contestId}`).emit(eventName, envelope);
        logger_1.logger.info({
            eventName: 'CONTEST_STATE_BROADCAST',
            contestId,
            status,
            event: eventName,
        });
    }
    /**
     * Broadcasts live score rankings (respecting freeze conditions)
     */
    async broadcastLeaderboardUpdate(contestId, status) {
        const { LeaderboardService } = require('../services/leaderboard.service');
        const leaderboardService = new LeaderboardService();
        // 1. Fetch real-time cached board details
        const liveRankings = await leaderboardService.getLeaderboard(contestId, status, true);
        // 2. Broadcast live rankings to admins room unconditionally
        const adminEnvelope = this.createEnvelope(contestId, { rankings: liveRankings });
        this.namespace.to(`contest:${contestId}:admins`).emit('contest:leaderboard', adminEnvelope);
        // 3. For public rooms, do not broadcast updates if the contest is frozen or ended
        if (status === client_1.ContestStatus.FROZEN || status === client_1.ContestStatus.ENDED) {
            logger_1.logger.info({
                eventName: 'LEADERBOARD_BROADCAST_FROZEN',
                contestId,
                message: 'Leaderboard update broadcast suspended under frozen/ended state.',
            });
            return;
        }
        // 4. Emit live update publicly
        const publicEnvelope = this.createEnvelope(contestId, { rankings: liveRankings });
        this.namespace.to(`contest:${contestId}:leaderboard`).emit('contest:leaderboard', publicEnvelope);
        logger_1.logger.info({
            eventName: 'LEADERBOARD_BROADCAST_SENT',
            contestId,
            rankingsCount: liveRankings.length,
        });
    }
    /**
     * Broadcasts announcement messages
     */
    async broadcastAnnouncement(contestId, announcement) {
        const envelope = this.createEnvelope(contestId, announcement);
        this.namespace.to(`contest:${contestId}`).emit('contest:announcement', envelope);
        logger_1.logger.info({
            eventName: 'ANNOUNCEMENT_BROADCAST_SENT',
            contestId,
            announcementId: announcement.id,
        });
    }
    /**
     * Delivers answered clarifications (public announcements vs private alerts)
     */
    async broadcastClarificationResponse(contestId, clarification) {
        const envelope = this.createEnvelope(contestId, clarification);
        if (clarification.isPublic) {
            // Broadcast to the whole contest channel
            this.namespace.to(`contest:${contestId}`).emit('contest:clarification', envelope);
        }
        else {
            // Send privately only to the questioning user
            this.namespace.to(`contest:${contestId}:user:${clarification.userId}`).emit('contest:clarification', envelope);
        }
        logger_1.logger.info({
            eventName: 'CLARIFICATION_BROADCAST_SENT',
            contestId,
            clarificationId: clarification.id,
            isPublic: clarification.isPublic,
        });
    }
}
exports.ContestGateway = ContestGateway;
exports.default = ContestGateway;
