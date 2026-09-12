"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestService = void 0;
const contest_repository_1 = require("../repositories/contest.repository");
const scoring_service_1 = require("./scoring.service");
const leaderboard_service_1 = require("./leaderboard.service");
const client_1 = require("@prisma/client");
const database_1 = require("../../../config/database");
class ContestService {
    contestRepo = new contest_repository_1.ContestRepository();
    scoringService = new scoring_service_1.ScoringService();
    leaderboardService = new leaderboard_service_1.LeaderboardService();
    /**
     * Creates a new Contest
     */
    async createContest(data, problemIds) {
        const contest = await this.contestRepo.createContest({
            title: data.title,
            description: data.description || null,
            startTime: data.startTime,
            endTime: data.endTime,
            freezeTime: data.freezeTime || null,
            unfreezeTime: data.unfreezeTime || null,
            status: client_1.ContestStatus.DRAFT,
            type: data.type,
            scoringType: data.scoringType,
            inviteCode: data.inviteCode || null,
            maxParticipants: data.maxParticipants || null,
            config: data.config,
            creatorId: data.creatorId,
        }, problemIds);
        await this.contestRepo.logAudit(contest.id, data.creatorId, 'CREATED', { title: contest.title });
        return contest;
    }
    /**
     * Registers a user to a contest, checking constraints (invite code, max participants)
     */
    async registerUser(contestId, userId, inviteCode) {
        const contest = await this.contestRepo.getContestById(contestId);
        if (!contest) {
            throw new Error('Contest not found');
        }
        if (contest.status === client_1.ContestStatus.ARCHIVED || contest.status === client_1.ContestStatus.ENDED) {
            throw new Error('Contest has ended');
        }
        // Check configuration late registration limits
        const config = contest.config;
        if (new Date().getTime() > new Date(contest.startTime).getTime() && !config.lateRegistration) {
            throw new Error('Registration closed after contest started');
        }
        // Check private contest checks
        if (contest.type === client_1.ContestType.PRIVATE || contest.type === client_1.ContestType.INVITE_ONLY) {
            if (contest.inviteCode && contest.inviteCode !== inviteCode) {
                throw new Error('Invalid registration invite code');
            }
        }
        // Execute duplicate check, max capacity check, insertion, and audit logging inside an interactive transaction
        return database_1.prisma.$transaction(async (tx) => {
            const existing = await tx.contestParticipant.findUnique({
                where: {
                    contestId_userId: { contestId, userId },
                },
            });
            if (existing) {
                return existing;
            }
            if (contest.maxParticipants) {
                const currentParticipants = await tx.contestParticipant.count({
                    where: { contestId },
                });
                if (currentParticipants >= contest.maxParticipants) {
                    throw new Error('Contest has reached maximum participant capacity');
                }
            }
            const participant = await tx.contestParticipant.create({
                data: {
                    contestId,
                    userId,
                    approved: true,
                },
            });
            await tx.contestAuditLog.create({
                data: {
                    contestId,
                    userId,
                    action: 'REGISTERED',
                    metadata: {},
                },
            });
            return participant;
        });
    }
    /**
     * Submits code to a contest problem, checking participant eligibility and cooldowns
     */
    async validateContestSubmission(contestId, userId, problemId) {
        const contest = await this.contestRepo.getContestById(contestId);
        if (!contest) {
            throw new Error('Contest not found');
        }
        // Ensure contest is live
        if (contest.status !== client_1.ContestStatus.LIVE && contest.status !== client_1.ContestStatus.FROZEN) {
            throw new Error('Contest is not active');
        }
        // Ensure user is registered
        const participant = await this.contestRepo.getParticipant(contestId, userId);
        if (!participant) {
            throw new Error('User is not registered for this contest');
        }
        // Check submission cooldown frequency
        const config = contest.config;
        if (config.submissionCooldown > 0) {
            const lastSub = await database_1.prisma.contestSubmission.findFirst({
                where: { contestId, userId },
                orderBy: { createdAt: 'desc' },
            });
            if (lastSub) {
                const diffSeconds = (new Date().getTime() - new Date(lastSub.createdAt).getTime()) / 1000;
                if (diffSeconds < config.submissionCooldown) {
                    throw new Error(`Submission cooldown active. Wait ${Math.ceil(config.submissionCooldown - diffSeconds)}s.`);
                }
            }
        }
        // Check max attempts
        if (config.maxAttempts) {
            const attemptsCount = await database_1.prisma.contestSubmission.count({
                where: { contestId, userId, problemId },
            });
            if (attemptsCount >= config.maxAttempts) {
                throw new Error(`Maximum submission attempts of ${config.maxAttempts} exceeded for this problem.`);
            }
        }
    }
    /**
     * Recalculates scoring standings and updates Redis Sorted Set leaderboard cache.
     * Invoked automatically by worker pipelines on terminal submission updates.
     */
    async processContestSubmissionUpdate(contestId, userId) {
        const contest = await this.contestRepo.getContestById(contestId);
        if (!contest)
            return;
        // Fetch all submissions of this user in this contest context
        const contestSubs = await database_1.prisma.contestSubmission.findMany({
            where: { contestId, userId },
            include: {
                submission: true,
            },
        });
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            select: { username: true },
        });
        const username = user?.username || 'Unknown';
        const submissions = contestSubs.map((cs) => cs.submission);
        let solvedCount = 0;
        let totalPoints = 0;
        let totalPenalty = 0;
        let problemDetails = {};
        let lastSubmissionTimeMs = 0;
        if (contest.scoringType === 'ICPC') {
            const res = this.scoringService.calculateIcpcScore(contest, submissions);
            solvedCount = res.solvedCount;
            totalPenalty = res.totalPenalty;
            problemDetails = res.problemDetails;
            Object.values(res.problemDetails).forEach((p) => {
                if (p.firstSolvedAt) {
                    const time = new Date(p.firstSolvedAt).getTime();
                    if (time > lastSubmissionTimeMs) {
                        lastSubmissionTimeMs = time;
                    }
                }
            });
        }
        else {
            // Fetch points weight mapping from ContestProblems
            const problemWeights = {};
            contest.problems.forEach((p) => {
                problemWeights[p.problemId] = p.points;
            });
            const res = this.scoringService.calculateIoiScore(contest, submissions, problemWeights);
            totalPoints = res.totalPoints;
            problemDetails = res.problemDetails;
            Object.values(res.problemDetails).forEach((p) => {
                if (p.firstSolvedAt) {
                    const time = new Date(p.firstSolvedAt).getTime();
                    if (time > lastSubmissionTimeMs) {
                        lastSubmissionTimeMs = time;
                    }
                }
            });
        }
        // Save final calculated score fields to DB
        await this.contestRepo.upsertScore(contestId, userId, solvedCount, totalPoints, totalPenalty, problemDetails);
        // Update Sorted Set cache inside Redis
        await this.leaderboardService.updateScore(contestId, userId, username, solvedCount, totalPoints, totalPenalty, problemDetails, contest.scoringType, lastSubmissionTimeMs);
        // Trigger realtime leaderboard broadcast
        const { ContestGateway } = require('../gateways/contest.gateway');
        const gateway = new ContestGateway();
        await gateway.broadcastLeaderboardUpdate(contestId, contest.status);
    }
    /**
     * Submits a clarification question
     */
    async askQuestion(contestId, userId, question) {
        const contest = await this.contestRepo.getContestById(contestId);
        if (!contest) {
            throw new Error('Contest not found');
        }
        const participant = await this.contestRepo.getParticipant(contestId, userId);
        if (!participant) {
            throw new Error('User is not registered for this contest');
        }
        return this.contestRepo.createClarification(contestId, userId, question);
    }
    /**
     * Responds to a clarification question (Admin only)
     */
    async answerQuestion(contestId, clarificationId, answer, adminId, isPublic) {
        const res = await this.contestRepo.answerClarification(clarificationId, answer, adminId, isPublic);
        // Notify clients of the answered clarification
        const { ContestGateway } = require('../gateways/contest.gateway');
        const gateway = new ContestGateway();
        await gateway.broadcastClarificationResponse(contestId, res);
        return res;
    }
    /**
     * Creates an Announcement (Admin only)
     */
    async createAnnouncement(contestId, title, content, adminId) {
        const announcement = await this.contestRepo.createAnnouncement(contestId, title, content);
        await this.contestRepo.logAudit(contestId, adminId, 'ANNOUNCEMENT_CREATED', { title });
        // Broadcast to websocket clients
        const { ContestGateway } = require('../gateways/contest.gateway');
        const gateway = new ContestGateway();
        await gateway.broadcastAnnouncement(contestId, announcement);
        return announcement;
    }
    /**
     * Lists clarifications for a contest
     */
    async listClarifications(contestId, userId) {
        return this.contestRepo.listClarifications(contestId, userId);
    }
}
exports.ContestService = ContestService;
exports.default = ContestService;
