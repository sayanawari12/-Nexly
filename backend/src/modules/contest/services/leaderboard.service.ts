import { redisConnection } from '../../queue/config/queue.config';
import { ContestRepository } from '../repositories/contest.repository';
import { LeaderboardRankEntry } from '../types';
import { Contest, ScoringType, ContestStatus } from '@prisma/client';
import { logger } from '../../../utils/logger';

export class LeaderboardService {
  private readonly contestRepo = new ContestRepository();
  private readonly redis = redisConnection;

  /**
   * Encodes contest scoring metrics into a single sortable float for Redis Sorted Sets.
   * Lower score represents higher rank because Redis ZRANGE runs ascendingly.
   */
  public encodeScore(
    solvedCount: number,
    totalPoints: number,
    totalPenalty: number,
    scoringType: ScoringType,
    lastSubmissionTimeMs = 0
  ): number {
    if (scoringType === ScoringType.ICPC) {
      // Solve count (descending) priority, then penalty (ascending).
      // Max possible solved is capped in ranking formula at 1000.
      return (1000 - solvedCount) * 1e7 + totalPenalty;
    } else {
      // IOI: Total points (descending) priority, then timestamp of last points gain (ascending).
      // Standardize timestamp offsets relative to epoch.
      const timestampOffset = lastSubmissionTimeMs > 0 ? (lastSubmissionTimeMs / 100000) : 0;
      return (10000 - totalPoints) * 1e7 + timestampOffset;
    }
  }

  /**
   * Updates ranking score for a user in a contest leaderboard
   */
  public async updateScore(
    contestId: string,
    userId: string,
    username: string,
    solvedCount: number,
    totalPoints: number,
    totalPenalty: number,
    problemDetails: any,
    scoringType: ScoringType,
    lastSubmissionTimeMs = 0
  ): Promise<void> {
    const redisScore = this.encodeScore(solvedCount, totalPoints, totalPenalty, scoringType, lastSubmissionTimeMs);
    const redisKey = `contest:${contestId}:leaderboard`;
    const detailsKey = `contest:${contestId}:user:${userId}:details`;

    await this.redis.multi()
      .zadd(redisKey, redisScore, userId)
      .set(detailsKey, JSON.stringify({
        userId,
        username,
        solvedCount,
        totalPoints,
        totalPenalty,
        problemDetails,
      }))
      .exec();

    logger.info({
      eventName: 'LEADERBOARD_SCORE_UPDATED',
      contestId,
      userId,
      redisScore,
    });
  }

  /**
   * Resolves the current standings for a contest
   */
  public async getLeaderboard(
    contestId: string,
    status: ContestStatus,
    isAdmin = false
  ): Promise<LeaderboardRankEntry[]> {
    const isFrozenState = status === ContestStatus.FROZEN || status === ContestStatus.ENDED;

    // Under freeze, non-admin users read from the frozen snapshot in PostgreSQL
    if (isFrozenState && !isAdmin) {
      const snapshot = await this.contestRepo.getLatestSnapshot(contestId, true);
      if (snapshot) {
        return snapshot.rankings as any;
      }
      // Fallback to empty if snapshot has not been generated yet
      return [];
    }

    // Otherwise, fetch active real-time standings from Redis ZSET
    const redisKey = `contest:${contestId}:leaderboard`;
    const userIds = await this.redis.zrange(redisKey, 0, -1);

    if (userIds.length === 0) {
      return [];
    }

    const pipeline = this.redis.pipeline();
    userIds.forEach((userId) => {
      pipeline.get(`contest:${contestId}:user:${userId}:details`);
    });

    const detailsJson = await pipeline.exec();
    const rankings: LeaderboardRankEntry[] = [];

    detailsJson?.forEach((res, index) => {
      if (res[0] === null && typeof res[1] === 'string') {
        try {
          const parsed = JSON.parse(res[1]);
          rankings.push({
            ...parsed,
            rank: index + 1, // ZRANGE returns elements sorted lowest to highest (rank 1 at index 0)
          });
        } catch (err) {}
      }
    });

    return rankings;
  }

  /**
   * Generates a permanent snapshot of the current leaderboard in the database
   */
  public async saveSnapshot(contestId: string, isFrozen: boolean): Promise<void> {
    const rankings = await this.getLeaderboard(contestId, isFrozen ? ContestStatus.LIVE : ContestStatus.ENDED, true);
    await this.contestRepo.createLeaderboardSnapshot(contestId, rankings, isFrozen);
    logger.info({
      eventName: 'LEADERBOARD_SNAPSHOT_GENERATED',
      contestId,
      isFrozen,
    });
  }

  /**
   * Rebuilds the Redis leaderboard cache from PostgreSQL database truth
   */
  public async rebuildLeaderboard(contestId: string): Promise<void> {
    const contest = await this.contestRepo.getContestById(contestId);
    if (!contest) return;

    const scores = await this.contestRepo.getScoresByContest(contestId);
    const redisKey = `contest:${contestId}:leaderboard`;

    // Clear old Redis entries
    await this.redis.del(redisKey);

    const pipeline = this.redis.pipeline();

    for (const score of scores) {
      // Find latest submission timestamp to determine ties
      let lastSubmissionTimeMs = 0;
      try {
        const details = score.problemDetails as Record<string, any>;
        Object.values(details).forEach((p: any) => {
          if (p.firstSolvedAt) {
            const time = new Date(p.firstSolvedAt).getTime();
            if (time > lastSubmissionTimeMs) {
              lastSubmissionTimeMs = time;
            }
          }
        });
      } catch (err) {}

      const redisScore = this.encodeScore(
        score.solvedCount,
        score.totalPoints,
        score.totalPenalty,
        contest.scoringType,
        lastSubmissionTimeMs
      );

      pipeline.zadd(redisKey, redisScore, score.userId);
      pipeline.set(`contest:${contestId}:user:${score.userId}:details`, JSON.stringify({
        userId: score.userId,
        username: (score as any).user?.username || 'Unknown',
        solvedCount: score.solvedCount,
        totalPoints: score.totalPoints,
        totalPenalty: score.totalPenalty,
        problemDetails: score.problemDetails,
      }));
    }

    await pipeline.exec();
    logger.info({
      eventName: 'LEADERBOARD_REBUILT',
      contestId,
      scoreCount: scores.length,
    });
  }
}
export default LeaderboardService;
