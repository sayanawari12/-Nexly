"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardService = void 0;
const database_1 = require("../../../config/database");
const logger_1 = __importDefault(require("../../../utils/logger"));
const queue_config_1 = require("../../queue/config/queue.config");
class LeaderboardService {
    redis;
    constructor() {
        this.redis = (0, queue_config_1.createRedisInstance)();
    }
    /**
     * Refreshes Redis Sorted Sets scores for a given user
     */
    async updateLeaderboardScore(userId, rating, solves, seasonId) {
        await this.redis.zadd('leaderboard:global:rating', rating, userId);
        await this.redis.zadd('leaderboard:global:solves', solves, userId);
        if (seasonId) {
            await this.redis.zadd(`leaderboard:season:${seasonId}:rating`, rating, userId);
        }
    }
    /**
     * Fetches range-based leaderboard rankings (Global or Seasonal)
     */
    async getLeaderboard(type, limit = 50, offset = 0) {
        const key = `leaderboard:global:${type}`;
        return this.fetchRankingsFromRedis(key, limit, offset);
    }
    async getSeasonalLeaderboard(seasonId, limit = 50, offset = 0) {
        const key = `leaderboard:season:${seasonId}:rating`;
        return this.fetchRankingsFromRedis(key, limit, offset);
    }
    /**
     * Fetches rankings centered surrounding a target user ("Around Me" windowing)
     */
    async getLeaderboardAroundUser(userId, type, limitAroundUser = 5) {
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
    async rebuildAllCaches() {
        logger_1.default.info({
            eventName: 'LEADERBOARD_CACHE_REBUILD_START',
            message: 'Rebuilding all Redis sorted sets from PostgreSQL records.',
        });
        await this.redis.del('leaderboard:global:rating');
        await this.redis.del('leaderboard:global:solves');
        const seasonsList = await database_1.prisma.season.findMany({
            select: { id: true },
        });
        for (const season of seasonsList) {
            await this.redis.del(`leaderboard:season:${season.id}:rating`);
        }
        const ratings = await database_1.prisma.userRating.findMany({
            include: { user: true },
        });
        for (const r of ratings) {
            await this.redis.zadd('leaderboard:global:rating', r.currentRating, r.userId);
        }
        const progresses = await database_1.prisma.userProgress.findMany();
        for (const p of progresses) {
            await this.redis.zadd('leaderboard:global:solves', p.totalSolves, p.userId);
        }
        const seasonRatings = await database_1.prisma.userSeasonRating.findMany();
        for (const sr of seasonRatings) {
            await this.redis.zadd(`leaderboard:season:${sr.seasonId}:rating`, sr.currentRating, sr.userId);
        }
        logger_1.default.info({
            eventName: 'LEADERBOARD_CACHE_REBUILD_COMPLETE',
            ratingsCount: ratings.length,
            progressCount: progresses.length,
        });
    }
    async fetchRankingsFromRedis(key, limit, offset) {
        const range = await this.redis.zrevrange(key, offset, offset + limit - 1, 'WITHSCORES');
        if (range.length === 0)
            return [];
        const rankings = [];
        for (let i = 0; i < range.length; i += 2) {
            const userId = range[i];
            const score = parseFloat(range[i + 1]);
            const user = await database_1.prisma.user.findUnique({
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
    async closeConnections() {
        await this.redis.quit();
    }
}
exports.LeaderboardService = LeaderboardService;
exports.default = LeaderboardService;
