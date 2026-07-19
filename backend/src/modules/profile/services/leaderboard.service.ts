import { Redis } from 'ioredis';
import { prisma } from '../../../config/database';
import { config } from '../../../config';
import logger from '../../../utils/logger';

export class LeaderboardService {
  private readonly redis: Redis;

  constructor() {
    this.redis = new Redis(config.queue.redisUrl);
  }

  /**
   * Refreshes Redis Sorted Sets scores for a given user
   */
  public async updateLeaderboardScore(userId: string, rating: number, solves: number, seasonId?: string): Promise<void> {
    await this.redis.zadd('leaderboard:global:rating', rating, userId);
    await this.redis.zadd('leaderboard:global:solves', solves, userId);

    if (seasonId) {
      await this.redis.zadd(`leaderboard:season:${seasonId}:rating`, rating, userId);
    }
  }

  /**
   * Fetches range-based leaderboard rankings (Global or Seasonal)
   */
  public async getLeaderboard(
    type: 'rating' | 'solves',
    limit = 50,
    offset = 0
  ): Promise<any[]> {
    const key = `leaderboard:global:${type}`;
    return this.fetchRankingsFromRedis(key, limit, offset);
  }

  public async getSeasonalLeaderboard(
    seasonId: string,
    limit = 50,
    offset = 0
  ): Promise<any[]> {
    const key = `leaderboard:season:${seasonId}:rating`;
    return this.fetchRankingsFromRedis(key, limit, offset);
  }

  /**
   * Fetches rankings centered surrounding a target user ("Around Me" windowing)
   */
  public async getLeaderboardAroundUser(
    userId: string,
    type: 'rating' | 'solves',
    limitAroundUser = 5
  ): Promise<any[]> {
    const key = `leaderboard:global:${type}`;

    const rankIndex = await this.redis.zrevrank(key, userId);

    if (rankIndex === null) {
      return this.getLeaderboard(type, limitAroundUser, 0);
    }

    const start = Math.max(0, rankIndex - limitAroundUser);
    const end = rankIndex + limitAroundUser;

    return this.fetchRankingsFromRedis(key, end - start + 1, start);
  }

  /**
   * Rebuilds all sorted set caches from PostgreSQL source-of-truth
   */
  public async rebuildAllCaches(): Promise<void> {
    logger.info({
      eventName: 'LEADERBOARD_CACHE_REBUILD_START',
      message: 'Rebuilding all Redis sorted sets from PostgreSQL records.',
    });

    await this.redis.del('leaderboard:global:rating');
    await this.redis.del('leaderboard:global:solves');

    const seasonsList = await prisma.season.findMany({
      select: { id: true },
    });

    for (const season of seasonsList) {
      await this.redis.del(`leaderboard:season:${season.id}:rating`);
    }

    const ratings = await prisma.userRating.findMany({
      include: { user: true },
    });

    for (const r of ratings) {
      await this.redis.zadd('leaderboard:global:rating', r.currentRating, r.userId);
    }

    const progresses = await prisma.userProgress.findMany();

    for (const p of progresses) {
      await this.redis.zadd('leaderboard:global:solves', p.totalSolves, p.userId);
    }

    const seasonRatings = await prisma.userSeasonRating.findMany();

    for (const sr of seasonRatings) {
      await this.redis.zadd(
        `leaderboard:season:${sr.seasonId}:rating`,
        sr.currentRating,
        sr.userId
      );
    }

    logger.info({
      eventName: 'LEADERBOARD_CACHE_REBUILD_COMPLETE',
      ratingsCount: ratings.length,
      progressCount: progresses.length,
    });
  }

  private async fetchRankingsFromRedis(
    key: string,
    limit: number,
    offset: number
  ): Promise<any[]> {
    const range = await this.redis.zrevrange(
      key,
      offset,
      offset + limit - 1,
      'WITHSCORES'
    );

    if (range.length === 0) return [];

    const rankings: any[] = [];

    for (let i = 0; i < range.length; i += 2) {
      const userId = range[i];
      const score = parseFloat(range[i + 1]);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          username: true,
        },
      });

      rankings.push({
        rank: offset + Math.floor(i / 2) + 1,
        userId,
        username: user?.username || 'Unknown',
        score,
      });
    }

    return rankings;
  }

  public async closeConnections(): Promise<void> {
    await this.redis.quit();
  }
}

export default LeaderboardService;