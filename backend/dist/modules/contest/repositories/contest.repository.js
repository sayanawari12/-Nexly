"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestRepository = void 0;
const database_1 = require("../../../config/database");
class ContestRepository {
    db = database_1.prisma;
    /**
     * Creates a new Contest with transactional problem mapping
     */
    async createContest(data, problemIds) {
        return this.db.$transaction(async (tx) => {
            const contest = await tx.contest.create({
                data: {
                    ...data,
                    version: 0,
                },
            });
            if (problemIds.length > 0) {
                await tx.contestProblem.createMany({
                    data: problemIds.map((p) => ({
                        contestId: contest.id,
                        problemId: p.problemId,
                        points: p.points,
                        orderIndex: p.orderIndex,
                    })),
                });
            }
            return contest;
        });
    }
    /**
     * Retrieves a Contest by ID, including its associated problems
     */
    async getContestById(id) {
        return this.db.contest.findUnique({
            where: { id },
            include: {
                problems: {
                    orderBy: { orderIndex: 'asc' },
                },
            },
        });
    }
    /**
     * Retrieves all contests matching optional visibility or status criteria
     */
    async listContests(filters) {
        return this.db.contest.findMany({
            where: filters,
            orderBy: { startTime: 'desc' },
        });
    }
    /**
     * Safe state transition utilizing Optimistic Concurrency Control (Compare-And-Swap)
     */
    async transitionContestStatus(id, expectedStatus, targetStatus, currentVersion) {
        const result = await this.db.contest.updateMany({
            where: {
                id,
                status: expectedStatus,
                version: currentVersion,
            },
            data: {
                status: targetStatus,
                version: { increment: 1 },
            },
        });
        return result.count > 0;
    }
    /**
     * Registers a participant to a contest
     */
    async registerParticipant(contestId, userId, approved = true) {
        return this.db.contestParticipant.create({
            data: {
                contestId,
                userId,
                approved,
            },
        });
    }
    /**
     * Retrieves registration for a participant
     */
    async getParticipant(contestId, userId) {
        return this.db.contestParticipant.findUnique({
            where: {
                contestId_userId: { contestId, userId },
            },
        });
    }
    /**
     * Links a standard submission to a contest context
     */
    async linkSubmission(contestId, userId, problemId, submissionId) {
        return this.db.contestSubmission.create({
            data: {
                contestId,
                userId,
                problemId,
                submissionId,
            },
        });
    }
    /**
     * Upsert score for a contest participant (thread-safe transaction)
     */
    async upsertScore(contestId, userId, solvedCount, totalPoints, totalPenalty, problemDetails) {
        return this.db.contestScore.upsert({
            where: {
                contestId_userId: { contestId, userId },
            },
            create: {
                contestId,
                userId,
                solvedCount,
                totalPoints,
                totalPenalty,
                problemDetails,
            },
            update: {
                solvedCount,
                totalPoints,
                totalPenalty,
                problemDetails,
            },
        });
    }
    /**
     * Fetches active score entries for a contest
     */
    async getScoresByContest(contestId) {
        return this.db.contestScore.findMany({
            where: { contestId },
            include: {
                user: {
                    select: { username: true },
                },
            },
        });
    }
    /**
     * Saves a permanent historical snapshot of the leaderboard standings
     */
    async createLeaderboardSnapshot(contestId, rankings, isFrozen) {
        return this.db.contestLeaderboardSnapshot.create({
            data: {
                contestId,
                snapshotAt: new Date(),
                rankings,
                isFrozen,
            },
        });
    }
    /**
     * Retrieves the latest snapshot for a contest (e.g. latest frozen view)
     */
    async getLatestSnapshot(contestId, isFrozen) {
        const whereClause = { contestId };
        if (isFrozen !== undefined) {
            whereClause.isFrozen = isFrozen;
        }
        return this.db.contestLeaderboardSnapshot.findFirst({
            where: whereClause,
            orderBy: { snapshotAt: 'desc' },
        });
    }
    /**
     * Creates a clarification request
     */
    async createClarification(contestId, userId, question) {
        return this.db.contestClarification.create({
            data: {
                contestId,
                userId,
                question,
            },
        });
    }
    /**
     * Answers a clarification request (Admin operation)
     */
    async answerClarification(id, answer, answeredBy, isPublic) {
        return this.db.contestClarification.update({
            where: { id },
            data: {
                answer,
                answeredBy,
                isPublic,
            },
        });
    }
    /**
     * Lists clarifications for a contest (with filtering for public/private logic)
     */
    async listClarifications(contestId, userId) {
        if (userId) {
            // User sees all public clarifications + their own private ones
            return this.db.contestClarification.findMany({
                where: {
                    contestId,
                    OR: [
                        { isPublic: true },
                        { userId },
                    ],
                },
                orderBy: { createdAt: 'desc' },
            });
        }
        // Admins see everything
        return this.db.contestClarification.findMany({
            where: { contestId },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Creates a contest announcement
     */
    async createAnnouncement(contestId, title, content) {
        return this.db.contestAnnouncement.create({
            data: {
                contestId,
                title,
                content,
            },
        });
    }
    /**
     * Lists announcements for a contest
     */
    async listAnnouncements(contestId) {
        return this.db.contestAnnouncement.findMany({
            where: { contestId },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Logs a security or workflow action for auditing
     */
    async logAudit(contestId, userId, action, metadata) {
        return this.db.contestAuditLog.create({
            data: {
                contestId,
                userId,
                action,
                metadata,
            },
        });
    }
}
exports.ContestRepository = ContestRepository;
