"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreakService = void 0;
const profile_repository_1 = require("../repositories/profile.repository");
class StreakService {
    repo;
    constructor(repo = new profile_repository_1.ProfileRepository()) {
        this.repo = repo;
    }
    /**
     * Evaluates coding streak consecutive days increment/reset logic
     */
    async processStreakUpdate(userId, solveDate) {
        const progress = await this.repo.getOrCreateProgress(userId);
        let currentStreak = progress.currentStreak;
        let longestStreak = progress.longestStreak;
        const todayStr = solveDate.toISOString().split('T')[0];
        if (!progress.lastSolveDate) {
            // First solve ever
            currentStreak = 1;
            longestStreak = 1;
        }
        else {
            const lastSolveStr = progress.lastSolveDate.toISOString().split('T')[0];
            if (todayStr === lastSolveStr) {
                // Already solved today, streak status unchanged
                return { currentStreak, longestStreak };
            }
            // Calculate days difference
            const lastSolveTime = new Date(lastSolveStr).getTime();
            const todayTime = new Date(todayStr).getTime();
            const diffDays = Math.round((todayTime - lastSolveTime) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                // Solved yesterday, increment streak
                currentStreak += 1;
                longestStreak = Math.max(longestStreak, currentStreak);
            }
            else if (diffDays > 1) {
                // Missed days, streak reset
                currentStreak = 1;
            }
        }
        await this.repo.updateProgress(userId, {
            solvesInc: 0,
            attemptsInc: 0,
            averageRuntime: progress.averageRuntime,
            averageMemory: progress.averageMemory,
            currentStreak,
            longestStreak,
            lastSolveDate: solveDate,
        });
        return { currentStreak, longestStreak };
    }
}
exports.StreakService = StreakService;
exports.default = StreakService;
