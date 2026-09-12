"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
const profile_repository_1 = require("../repositories/profile.repository");
const streak_service_1 = require("./streak.service");
const database_1 = require("../../../config/database");
const logger_1 = __importDefault(require("../../../utils/logger"));
class AnalyticsService {
    repo;
    streakService;
    constructor(repo = new profile_repository_1.ProfileRepository(), streakService = new streak_service_1.StreakService()) {
        this.repo = repo;
        this.streakService = streakService;
    }
    /**
     * Processes submission metrics, updates skills levels, daily statistics, and refreshes the snapshot cache
     */
    async processSolveAnalytics(params) {
        const { userId, category, language, runtimeMs, memoryKb, isAccepted, submittedAt } = params;
        // 1. Update general progress counters
        const progress = await this.repo.getOrCreateProgress(userId);
        let runtimeSum = progress.averageRuntime * progress.totalAttempts + runtimeMs;
        let memorySum = progress.averageMemory * progress.totalAttempts + memoryKb;
        const nextAttempts = progress.totalAttempts + 1;
        const avgRuntime = runtimeSum / nextAttempts;
        const avgMemory = memorySum / nextAttempts;
        // 2. Adjust streaks if accepted
        if (isAccepted) {
            await this.streakService.processStreakUpdate(userId, submittedAt);
        }
        // Refresh streak values in local context
        const updatedProgress = await this.repo.updateProgress(userId, {
            solvesInc: isAccepted ? 1 : 0,
            attemptsInc: 1,
            averageRuntime: avgRuntime,
            averageMemory: avgMemory,
            currentStreak: progress.currentStreak,
            longestStreak: progress.longestStreak,
            lastSolveDate: isAccepted ? submittedAt : progress.lastSolveDate || undefined,
        });
        // 3. Upsert skills statistics for category tag
        const skills = await this.repo.getSkills(userId);
        const targetSkill = skills.find((s) => s.category.toLowerCase() === category.toLowerCase());
        const currentSolved = targetSkill ? targetSkill.solvedCount : 0;
        const currentAttempts = targetSkill ? targetSkill.attemptsCount : 0;
        const nextSolved = currentSolved + (isAccepted ? 1 : 0);
        const nextAttemptsSkill = currentAttempts + 1;
        const accuracy = nextSolved / nextAttemptsSkill;
        const confidence = (nextSolved / (nextSolved + 10)) * accuracy;
        const level = 1 + Math.floor(Math.sqrt(nextSolved));
        const growth = (nextSolved - currentSolved) / (currentSolved || 1);
        await this.repo.upsertSkill(userId, category, {
            level,
            solvedInc: isAccepted ? 1 : 0,
            attemptsInc: 1,
            accuracy,
            confidenceScore: confidence,
            growthRate: growth,
        });
        // 4. Log Daily Statistics
        await this.repo.upsertDailyStatistics(userId, submittedAt, {
            solvesInc: isAccepted ? 1 : 0,
            attemptsInc: 1,
            language,
        });
        // 5. Asynchronously refresh user dashboard projection snapshot
        await this.generateProfileSnapshot(userId);
    }
    /**
     * Builds and saves a static composite dashboard projection block to avoid expensive runtime SQL joins
     */
    async generateProfileSnapshot(userId) {
        const user = await database_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                rating: true,
                skills: true,
                progress: true,
                milestones: true,
            },
        });
        if (!user)
            return;
        // Load active unlocked achievements
        const achievements = await this.repo.getUnlockedAchievements(userId);
        const snapshotPayload = {
            userId: user.id,
            username: user.username,
            rating: user.rating?.currentRating || 1200,
            highestRating: user.rating?.highestRating || 1200,
            contestsPlayed: user.rating?.contestsPlayed || 0,
            totalSolves: user.progress?.totalSolves || 0,
            acceptanceRate: user.progress?.acceptanceRate || 0,
            currentStreak: user.progress?.currentStreak || 0,
            longestStreak: user.progress?.longestStreak || 0,
            skills: user.skills.map((s) => ({
                category: s.category,
                level: s.level,
                solvedCount: s.solvedCount,
                accuracy: s.accuracy,
                confidence: s.confidenceScore,
            })),
            achievements: achievements.map((a) => ({
                key: a.definition.key,
                name: a.definition.name,
                description: a.definition.description,
                unlockedAt: a.unlockedAt,
            })),
            milestones: user.milestones.map((m) => ({
                key: m.key,
                achievedAt: m.achievedAt,
            })),
            generatedAt: new Date(),
        };
        await this.repo.saveProfileSnapshot(userId, snapshotPayload);
        logger_1.default.info({
            eventName: 'PROFILE_SNAPSHOT_GENERATED',
            userId,
        });
    }
}
exports.AnalyticsService = AnalyticsService;
exports.default = AnalyticsService;
