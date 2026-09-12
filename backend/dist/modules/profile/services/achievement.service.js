"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementService = void 0;
const profile_repository_1 = require("../repositories/profile.repository");
const database_1 = require("../../../config/database");
const logger_1 = __importDefault(require("../../../utils/logger"));
class AchievementService {
    repo;
    constructor(repo = new profile_repository_1.ProfileRepository()) {
        this.repo = repo;
    }
    /**
     * Asserts badge criteria matching and triggers unlocks (fully configurable, no hardcoded parameters)
     */
    async evaluateAchievements(userId) {
        const progress = await this.repo.getOrCreateProgress(userId);
        const unlockedList = [];
        // 1. Fetch active, non-retired achievement definitions
        const definitions = await database_1.prisma.achievementDefinition.findMany({
            where: { retired: false },
        });
        const activeAchievements = await this.repo.getUnlockedAchievements(userId);
        const unlockedKeys = new Set(activeAchievements.map((ua) => ua.definition.key));
        for (const definition of definitions) {
            if (unlockedKeys.has(definition.key))
                continue;
            const criteria = definition.criteria;
            let shouldUnlock = false;
            switch (criteria.type) {
                case 'FIRST_SOLVE':
                    if (progress.totalSolves >= 1) {
                        shouldUnlock = true;
                    }
                    break;
                case 'SOLVES_COUNT':
                    if (progress.totalSolves >= (criteria.count || 1)) {
                        shouldUnlock = true;
                    }
                    break;
                case 'STREAK_COUNT':
                    if (progress.currentStreak >= (criteria.count || 1)) {
                        shouldUnlock = true;
                    }
                    break;
                case 'NIGHT_OWL':
                    // Check if latest solve date hour was late night
                    if (progress.lastSolveDate) {
                        const hour = new Date(progress.lastSolveDate).getHours();
                        if (hour >= 23 || hour <= 4) {
                            shouldUnlock = true;
                        }
                    }
                    break;
                default:
                    break;
            }
            if (shouldUnlock) {
                await this.repo.unlockAchievement(userId, definition.id);
                unlockedList.push(definition.name);
                // Queue notifications
                await this.repo.createNotification(userId, '🏆 Achievement Unlocked!', `You earned the badge: ${definition.name} - ${definition.description}`, 'ACHIEVEMENT');
                logger_1.default.info({
                    eventName: 'ACHIEVEMENT_UNLOCKED',
                    userId,
                    definitionId: definition.id,
                    key: definition.key,
                });
            }
        }
        // 2. Evaluate milestone triggers
        await this.evaluateMilestones(userId, progress.totalSolves);
        return unlockedList;
    }
    async evaluateMilestones(userId, solvesCount) {
        const milestoneCheck = [
            { threshold: 10, key: 'PROBLEMS_10' },
            { threshold: 50, key: 'PROBLEMS_50' },
            { threshold: 100, key: 'PROBLEMS_100' },
        ];
        for (const m of milestoneCheck) {
            if (solvesCount >= m.threshold) {
                // Find if already achieved to avoid duplicate alerts
                const existing = await database_1.prisma.milestone.findUnique({
                    where: { userId_key: { userId, key: m.key } },
                });
                if (!existing) {
                    await this.repo.addMilestone(userId, m.key);
                    await this.repo.createNotification(userId, '🎉 Milestone Achieved!', `Congratulations on solving ${m.threshold} coding problems!`, 'SYSTEM');
                }
            }
        }
    }
}
exports.AchievementService = AchievementService;
exports.default = AchievementService;
