import { ProfileRepository } from '../repositories/profile.repository';

export class StreakService {
  private readonly repo: ProfileRepository;

  constructor(repo = new ProfileRepository()) {
    this.repo = repo;
  }

  /**
   * Evaluates coding streak consecutive days increment/reset logic
   */
  public async processStreakUpdate(userId: string, solveDate: Date): Promise<{ currentStreak: number; longestStreak: number }> {
    const progress = await this.repo.getOrCreateProgress(userId);
    let currentStreak = progress.currentStreak;
    let longestStreak = progress.longestStreak;

    const todayStr = solveDate.toISOString().split('T')[0];
    
    if (!progress.lastSolveDate) {
      // First solve ever
      currentStreak = 1;
      longestStreak = 1;
    } else {
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
      } else if (diffDays > 1) {
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
export default StreakService;
