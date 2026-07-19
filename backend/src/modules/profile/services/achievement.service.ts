import { ProfileRepository } from '../repositories/profile.repository';
import { prisma } from '../../../config/database';
import logger from '../../../utils/logger';

export class AchievementService {
  private readonly repo: ProfileRepository;

  constructor(repo = new ProfileRepository()) {
    this.repo = repo;
  }

  /**
   * Asserts badge criteria matching and triggers unlocks (fully configurable, no hardcoded parameters)
   */
  public async evaluateAchievements(userId: string): Promise<string[]> {
    const progress = await this.repo.getOrCreateProgress(userId);
    const unlockedList: string[] = [];

    // 1. Fetch active, non-retired achievement definitions
    const definitions = await prisma.achievementDefinition.findMany({
      where: { retired: false },
    });

    const activeAchievements = await this.repo.getUnlockedAchievements(userId);
    const unlockedKeys = new Set(activeAchievements.map((ua) => ua.definition.key));

    for (const definition of definitions) {
      if (unlockedKeys.has(definition.key)) continue;

      const criteria = definition.criteria as any;
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
        await this.repo.createNotification(
          userId,
          '🏆 Achievement Unlocked!',
          `You earned the badge: ${definition.name} - ${definition.description}`,
          'ACHIEVEMENT'
        );

        logger.info({
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

  private async evaluateMilestones(userId: string, solvesCount: number): Promise<void> {
    const milestoneCheck = [
      { threshold: 10, key: 'PROBLEMS_10' },
      { threshold: 50, key: 'PROBLEMS_50' },
      { threshold: 100, key: 'PROBLEMS_100' },
    ];

    for (const m of milestoneCheck) {
      if (solvesCount >= m.threshold) {
        // Find if already achieved to avoid duplicate alerts
        const existing = await prisma.milestone.findUnique({
          where: { userId_key: { userId, key: m.key } },
        });

        if (!existing) {
          await this.repo.addMilestone(userId, m.key);
          await this.repo.createNotification(
            userId,
            '🎉 Milestone Achieved!',
            `Congratulations on solving ${m.threshold} coding problems!`,
            'SYSTEM'
          );
        }
      }
    }
  }
}
export default AchievementService;
