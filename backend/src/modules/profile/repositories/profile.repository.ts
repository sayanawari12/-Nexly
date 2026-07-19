import { PrismaClient, UserRating, UserSeasonRating, UserRatingHistory, UserSkill, UserAchievement, UserProgress, DailyStatistics, UserProfileSnapshot, NotificationPreference, Milestone, Notification, Season, AchievementDefinition } from '@prisma/client';
import { prisma } from '../../../config/database';

export class ProfileRepository {
  private readonly db: PrismaClient = prisma;

  /**
   * Fetch user rating or initialize to default 1200
   */
  public async getOrCreateRating(userId: string): Promise<UserRating> {
    const rating = await this.db.userRating.findUnique({ where: { userId } });
    if (rating) return rating;

    return this.db.userRating.create({
      data: {
        userId,
        currentRating: 1200,
        highestRating: 1200,
        rd: 350.0,
        volatility: 0.06,
      },
    });
  }

  /**
   * Fetch active season or seed one if none exists
   */
  public async getOrCreateActiveSeason(): Promise<Season> {
    let season = await this.db.season.findFirst({ where: { isActive: true } });
    if (!season) {
      const now = new Date();
      season = await this.db.season.create({
        data: {
          name: 'Season Genesis',
          startTime: new Date(now.getTime() - 86400000), // 1 day ago
          endTime: new Date(now.getTime() + 86400000 * 30), // 30 days later
          isActive: true,
        },
      });
    }
    return season;
  }

  /**
   * Fetch seasonal rating or initialize
   */
  public async getOrCreateSeasonRating(userId: string, seasonId: string): Promise<UserSeasonRating> {
    const rating = await this.db.userSeasonRating.findUnique({
      where: { userId_seasonId: { userId, seasonId } },
    });
    if (rating) return rating;

    return this.db.userSeasonRating.create({
      data: {
        userId,
        seasonId,
        currentRating: 1200,
        rd: 350.0,
        volatility: 0.06,
      },
    });
  }

  /**
   * Atomic transactional update of rating stats and immutable history logs
   */
  public async updateRatingAndHistory(params: {
    userId: string;
    contestId?: string;
    seasonId?: string;
    oldRating: number;
    newRating: number;
    volatility: number;
    rd: number;
    algorithm: string;
    reason: string;
  }): Promise<void> {
    const { userId, contestId, seasonId, oldRating, newRating, volatility, rd, algorithm, reason } = params;
    const delta = newRating - oldRating;

    await this.db.$transaction(async (tx) => {
      // 1. Get rating record
      const rating = await tx.userRating.findUnique({ where: { userId } });
      const currentHighest = rating ? rating.highestRating : 1200;
      const highest = Math.max(currentHighest, newRating);

      // 2. Upsert UserRating
      const userRating = await tx.userRating.upsert({
        where: { userId },
        create: {
          userId,
          currentRating: newRating,
          highestRating: highest,
          rd,
          volatility,
          contestsPlayed: 1,
        },
        update: {
          currentRating: newRating,
          highestRating: highest,
          rd,
          volatility,
          contestsPlayed: { increment: 1 },
        },
      });

      // 3. Update Seasonal Rating if seasonId matches
      if (seasonId) {
        await tx.userSeasonRating.upsert({
          where: { userId_seasonId: { userId, seasonId } },
          create: {
            userId,
            seasonId,
            currentRating: newRating,
            rd,
            volatility,
          },
          update: {
            currentRating: newRating,
            rd,
            volatility,
          },
        });
      }

      // 4. Create immutable history log entry
      await tx.userRatingHistory.create({
        data: {
          userRatingId: userRating.id,
          oldRating,
          newRating,
          delta,
          contestId,
          seasonId,
          algorithm,
          reason,
        },
      });
    });
  }

  /**
   * Get rating history entries
   */
  public async getRatingHistory(userId: string): Promise<UserRatingHistory[]> {
    const rating = await this.db.userRating.findUnique({ where: { userId } });
    if (!rating) return [];

    return this.db.userRatingHistory.findMany({
      where: { userRatingId: rating.id },
      orderBy: { calculatedAt: 'desc' },
    });
  }

  /**
   * Wipe rating logs and reset profile ratings for replay engine
   */
  public async resetRatingsForReplay(userId: string): Promise<void> {
    const rating = await this.db.userRating.findUnique({ where: { userId } });
    if (!rating) return;

    await this.db.$transaction([
      this.db.userRatingHistory.deleteMany({ where: { userRatingId: rating.id } }),
      this.db.userSeasonRating.deleteMany({ where: { userId } }),
      this.db.userRating.update({
        where: { userId },
        data: {
          currentRating: 1200,
          highestRating: 1200,
          rd: 350.0,
          volatility: 0.06,
          contestsPlayed: 0,
        },
      }),
    ]);
  }

  /**
   * Skills updates
   */
  public async getSkills(userId: string): Promise<UserSkill[]> {
    return this.db.userSkill.findMany({ where: { userId } });
  }

  public async upsertSkill(
    userId: string,
    category: string,
    data: {
      level: number;
      solvedInc: number;
      attemptsInc: number;
      accuracy: number;
      confidenceScore: number;
      growthRate: number;
    }
  ): Promise<UserSkill> {
    const { level, solvedInc, attemptsInc, accuracy, confidenceScore, growthRate } = data;
    return this.db.userSkill.upsert({
      where: { userId_category: { userId, category } },
      create: {
        userId,
        category,
        level,
        solvedCount: solvedInc,
        attemptsCount: attemptsInc,
        accuracy,
        confidenceScore,
        growthRate,
      },
      update: {
        level,
        solvedCount: { increment: solvedInc },
        attemptsCount: { increment: attemptsInc },
        accuracy,
        confidenceScore,
        growthRate,
      },
    });
  }

  /**
   * Achievements and Definitions
   */
  public async getOrCreateAchievementDefinition(key: string, name: string, description: string, criteria: any): Promise<AchievementDefinition> {
    const existing = await this.db.achievementDefinition.findFirst({ where: { key, retired: false } });
    if (existing) return existing;

    return this.db.achievementDefinition.create({
      data: {
        key,
        name,
        description,
        criteria,
        version: 1,
      },
    });
  }

  public async getUnlockedAchievements(userId: string): Promise<(UserAchievement & { definition: AchievementDefinition })[]> {
    return this.db.userAchievement.findMany({
      where: { userId },
      include: { definition: true },
      orderBy: { unlockedAt: 'desc' },
    });
  }

  public async unlockAchievement(userId: string, definitionId: string): Promise<void> {
    await this.db.userAchievement.upsert({
      where: { userId_definitionId: { userId, definitionId } },
      create: { userId, definitionId },
      update: {}, // Empty update acts as "no-op" keeping unlock idempotent
    });
  }

  /**
   * User progress stats
   */
  public async getOrCreateProgress(userId: string): Promise<UserProgress> {
    const progress = await this.db.userProgress.findUnique({ where: { userId } });
    if (progress) return progress;

    return this.db.userProgress.create({
      data: {
        userId,
        totalSolves: 0,
        totalAttempts: 0,
        acceptanceRate: 0,
        currentStreak: 0,
        longestStreak: 0,
      },
    });
  }

  public async updateProgress(
    userId: string,
    data: {
      solvesInc: number;
      attemptsInc: number;
      averageRuntime: number;
      averageMemory: number;
      currentStreak: number;
      longestStreak: number;
      lastSolveDate?: Date;
    }
  ): Promise<UserProgress> {
    const { solvesInc, attemptsInc, averageRuntime, averageMemory, currentStreak, longestStreak, lastSolveDate } = data;

    // Read current state to perform safe updates
    const current = await this.getOrCreateProgress(userId);
    const newSolves = current.totalSolves + solvesInc;
    const newAttempts = current.totalAttempts + attemptsInc;
    const accuracy = newAttempts > 0 ? newSolves / newAttempts : 0.0;

    return this.db.userProgress.update({
      where: { userId },
      data: {
        totalSolves: newSolves,
        totalAttempts: newAttempts,
        acceptanceRate: accuracy,
        averageRuntime,
        averageMemory,
        currentStreak,
        longestStreak,
        lastSolveDate,
      },
    });
  }

  /**
   * Time series DailyStatistics logs (with monthly/yearly partitioning layout)
   */
  public async upsertDailyStatistics(
    userId: string,
    date: Date,
    data: {
      solvesInc: number;
      attemptsInc: number;
      language: string;
    }
  ): Promise<DailyStatistics> {
    const { solvesInc, attemptsInc, language } = data;
    const dateOnly = new Date(date.toISOString().split('T')[0]); // Strip hour elements

    const existing = await this.db.dailyStatistics.findUnique({
      where: { userId_date: { userId, date: dateOnly } },
    });

    const langStats: Record<string, number> = existing ? (existing.languageStats as Record<string, number>) : {};
    langStats[language] = (langStats[language] || 0) + solvesInc;

    return this.db.dailyStatistics.upsert({
      where: { userId_date: { userId, date: dateOnly } },
      create: {
        userId,
        date: dateOnly,
        solvesCount: solvesInc,
        attemptsCount: attemptsInc,
        languageStats: langStats,
      },
      update: {
        solvesCount: { increment: solvesInc },
        attemptsCount: { increment: attemptsInc },
        languageStats: langStats,
      },
    });
  }

  public async getDailyStatistics(userId: string): Promise<DailyStatistics[]> {
    return this.db.dailyStatistics.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });
  }

  /**
   * Dashboard Snapshots
   */
  public async saveProfileSnapshot(userId: string, snapshotData: any): Promise<UserProfileSnapshot> {
    return this.db.userProfileSnapshot.upsert({
      where: { userId },
      create: { userId, snapshotData },
      update: { snapshotData, generatedAt: new Date() },
    });
  }

  public async getProfileSnapshot(userId: string): Promise<UserProfileSnapshot | null> {
    return this.db.userProfileSnapshot.findUnique({ where: { userId } });
  }

  /**
   * Preferences
   */
  public async getOrCreatePreferences(userId: string): Promise<NotificationPreference> {
    const pref = await this.db.notificationPreference.findUnique({ where: { userId } });
    if (pref) return pref;

    return this.db.notificationPreference.create({
      data: { userId },
    });
  }

  public async updatePreferences(userId: string, data: Partial<Omit<NotificationPreference, 'id' | 'userId'>>): Promise<NotificationPreference> {
    return this.db.notificationPreference.upsert({
      where: { userId },
      create: { userId, ...data },
      update: data,
    });
  }

  /**
   * Milestones
   */
  public async addMilestone(userId: string, key: string): Promise<Milestone> {
    return this.db.milestone.upsert({
      where: { userId_key: { userId, key } },
      create: { userId, key },
      update: {},
    });
  }

  public async getMilestones(userId: string): Promise<Milestone[]> {
    return this.db.milestone.findMany({ where: { userId } });
  }

  /**
   * Notifications
   */
  public async createNotification(userId: string, title: string, message: string, type: string): Promise<Notification> {
    return this.db.notification.create({
      data: { userId, title, message, type },
    });
  }

  public async getNotifications(userId: string, limit = 50): Promise<Notification[]> {
    return this.db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  public async markNotificationRead(userId: string, id: string): Promise<void> {
    await this.db.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });
  }
}
