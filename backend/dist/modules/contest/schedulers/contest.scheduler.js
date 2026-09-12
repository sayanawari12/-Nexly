"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestScheduler = void 0;
const queue_config_1 = require("../../queue/config/queue.config");
const contest_repository_1 = require("../repositories/contest.repository");
const leaderboard_service_1 = require("../services/leaderboard.service");
const client_1 = require("@prisma/client");
const logger_1 = require("../../../utils/logger");
const uuid_1 = require("uuid");
class ContestScheduler {
    schedulerId = (0, uuid_1.v4)();
    contestRepo = new contest_repository_1.ContestRepository();
    leaderboardService = new leaderboard_service_1.LeaderboardService();
    redis = queue_config_1.redisConnection;
    checkInterval = null;
    heartbeatInterval = null;
    isLeader = false;
    /**
     * Starts the distributed scheduler polling loops
     */
    start() {
        logger_1.logger.info({
            eventName: 'SCHEDULER_STARTUP',
            schedulerId: this.schedulerId,
            message: 'Initializing distributed Contest state transition scheduler.',
        });
        // Tick every 10 seconds to check leader locks and run state checks
        this.checkInterval = setInterval(() => this.tick(), 10000);
        // Run immediately on boot
        this.tick();
    }
    /**
     * Stops loops and cleans up leadership locks gracefully
     */
    async stop() {
        if (this.checkInterval)
            clearInterval(this.checkInterval);
        if (this.heartbeatInterval)
            clearInterval(this.heartbeatInterval);
        if (this.isLeader) {
            await this.redis.del('lock:contest_scheduler');
            logger_1.logger.info({
                eventName: 'SCHEDULER_SHUTDOWN',
                schedulerId: this.schedulerId,
                message: 'Released leadership lock and stopped scheduler.',
            });
        }
    }
    /**
     * Periodic tick routine attempting leader acquisition or processing transitions
     */
    async tick() {
        try {
            if (!this.isLeader) {
                // Attempt lock acquisition (expires in 15 seconds)
                const acquired = await this.redis.set('lock:contest_scheduler', this.schedulerId, 'PX', 15000, 'NX');
                if (acquired === 'OK') {
                    this.isLeader = true;
                    logger_1.logger.info({
                        eventName: 'SCHEDULER_LEADER_ELECTED',
                        schedulerId: this.schedulerId,
                        message: 'Acquired distributed lock. Assuming scheduler leadership.',
                    });
                    // Start lock renewal heartbeat every 3 seconds
                    this.heartbeatInterval = setInterval(() => this.renewLock(), 3000);
                }
            }
            if (this.isLeader) {
                await this.evaluateTransitions();
            }
        }
        catch (err) {
            logger_1.logger.error({
                eventName: 'SCHEDULER_TICK_ERROR',
                error: err.message,
            });
        }
    }
    /**
     * Heartbeat task extending scheduler lock expiration
     */
    async renewLock() {
        try {
            const lockValue = await this.redis.get('lock:contest_scheduler');
            if (lockValue === this.schedulerId) {
                await this.redis.pexpire('lock:contest_scheduler', 15000);
            }
            else {
                // Lost leadership
                this.isLeader = false;
                if (this.heartbeatInterval) {
                    clearInterval(this.heartbeatInterval);
                    this.heartbeatInterval = null;
                }
                logger_1.logger.warn({
                    eventName: 'SCHEDULER_LEADER_LOST',
                    schedulerId: this.schedulerId,
                    message: 'Leadership lock overwritten or lost. Reverting to follower.',
                });
            }
        }
        catch (err) {
            logger_1.logger.error({
                eventName: 'SCHEDULER_RENEW_ERROR',
                error: err.message,
            });
        }
    }
    /**
     * Scans all active/pending contests and executes status transitions
     */
    async evaluateTransitions() {
        const now = new Date();
        // 1. Check SCHEDULED contests to start
        const scheduled = await this.contestRepo.listContests({ status: client_1.ContestStatus.SCHEDULED });
        for (const contest of scheduled) {
            if (now >= new Date(contest.startTime)) {
                await this.executeTransition(contest, client_1.ContestStatus.SCHEDULED, client_1.ContestStatus.LIVE, 'contest:started');
            }
        }
        // 2. Check LIVE contests to freeze (Transition LIVE -> FREEZING)
        const live = await this.contestRepo.listContests({ status: client_1.ContestStatus.LIVE });
        for (const contest of live) {
            if (contest.freezeTime && now >= new Date(contest.freezeTime)) {
                await this.executeTransition(contest, client_1.ContestStatus.LIVE, client_1.ContestStatus.FREEZING, 'contest:freezing');
            }
            else if (now >= new Date(contest.endTime)) {
                await this.executeTransition(contest, client_1.ContestStatus.LIVE, client_1.ContestStatus.ENDED, 'contest:ended', async () => {
                    await this.leaderboardService.saveSnapshot(contest.id, false);
                });
            }
        }
        // 3. Check FREEZING contests to complete queue drain and transition FREEZING -> FROZEN
        const freezing = await this.contestRepo.listContests({ status: client_1.ContestStatus.FREEZING });
        for (const contest of freezing) {
            const { prisma } = require('../../../config/database');
            // Count pending submissions created before or at freezeTime
            const pendingCount = await prisma.contestSubmission.count({
                where: {
                    contestId: contest.id,
                    createdAt: { lte: contest.freezeTime },
                    submission: {
                        status: { in: ['PENDING', 'PROCESSING'] },
                    },
                },
            });
            const elapsedFreezingSec = Math.floor((now.getTime() - new Date(contest.freezeTime).getTime()) / 1000);
            const isDrainComplete = pendingCount === 0 || elapsedFreezingSec >= 60; // 60s timeout guard
            if (isDrainComplete) {
                await this.executeTransition(contest, client_1.ContestStatus.FREEZING, client_1.ContestStatus.FROZEN, 'contest:frozen', async () => {
                    // Generate exactly ONE frozen snapshot containing all judged pre-freeze submissions
                    await this.leaderboardService.saveSnapshot(contest.id, true);
                });
            }
        }
        // 4. Check FROZEN contests to end
        const frozen = await this.contestRepo.listContests({ status: client_1.ContestStatus.FROZEN });
        for (const contest of frozen) {
            if (now >= new Date(contest.endTime)) {
                await this.executeTransition(contest, client_1.ContestStatus.FROZEN, client_1.ContestStatus.ENDED, 'contest:ended', async () => {
                    await this.leaderboardService.saveSnapshot(contest.id, false);
                });
            }
        }
    }
    /**
     * Performs CAS transition and broadcasts updates via gateway
     */
    async executeTransition(contest, fromStatus, toStatus, socketEvent, preCommitHook) {
        try {
            if (preCommitHook) {
                await preCommitHook();
            }
            const success = await this.contestRepo.transitionContestStatus(contest.id, fromStatus, toStatus, contest.version);
            if (success) {
                logger_1.logger.info({
                    eventName: 'CONTEST_STATUS_TRANSITIONED',
                    contestId: contest.id,
                    from: fromStatus,
                    to: toStatus,
                });
                await this.contestRepo.logAudit(contest.id, null, `TRANSITIONED_${toStatus}`, { fromStatus });
                // Broadcast to WebSocket namespace
                const { ContestGateway } = require('../gateways/contest.gateway');
                const gateway = new ContestGateway();
                await gateway.broadcastStateChange(contest.id, toStatus, socketEvent);
            }
        }
        catch (err) {
            logger_1.logger.error({
                eventName: 'CONTEST_TRANSITION_FAILED',
                contestId: contest.id,
                from: fromStatus,
                to: toStatus,
                error: err.message,
            });
        }
    }
}
exports.ContestScheduler = ContestScheduler;
exports.default = ContestScheduler;
