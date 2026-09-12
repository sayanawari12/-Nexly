"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = exports.Glicko2Strategy = exports.EloStrategy = void 0;
const profile_repository_1 = require("../repositories/profile.repository");
const database_1 = require("../../../config/database");
const logger_1 = __importDefault(require("../../../utils/logger"));
const queue_config_1 = require("../../queue/config/queue.config");
class EloStrategy {
    K = 32;
    calculate(currentRating, rd, volatility, opponentRatings, opponentRDs, outcomes) {
        let ratingChange = 0;
        for (let i = 0; i < opponentRatings.length; i++) {
            const oppRating = opponentRatings[i];
            const outcome = outcomes[i];
            const expected = 1 / (1 + Math.pow(10, (oppRating - currentRating) / 400));
            ratingChange += this.K * (outcome - expected);
        }
        const nextRating = Math.round(currentRating + ratingChange);
        return {
            rating: nextRating,
            rd,
            volatility,
        };
    }
}
exports.EloStrategy = EloStrategy;
class Glicko2Strategy {
    tau = 0.5; // System constant controlling volatility shifts
    calculate(currentRating, rd, volatility, opponentRatings, opponentRDs, outcomes) {
        // Step 2: Convert to Glicko-2 scale
        const mu = (currentRating - 1200) / 173.7178;
        const phi = rd / 173.7178;
        const sigma = volatility;
        if (opponentRatings.length === 0) {
            // User did not compete
            const newPhi = Math.sqrt(phi * phi + sigma * sigma);
            return {
                rating: currentRating,
                rd: Math.min(newPhi * 173.7178, 350.0),
                volatility,
            };
        }
        const oppMus = opponentRatings.map((r) => (r - 1200) / 173.7178);
        const oppPhis = opponentRDs.map((d) => d / 173.7178);
        // Helpers
        const g = (p) => 1 / Math.sqrt(1 + (3 * p * p) / (Math.PI * Math.PI));
        const E = (m, mj, pj) => 1 / (1 + Math.exp(-g(pj) * (m - mj)));
        // Step 3: Compute v
        let vSum = 0;
        for (let j = 0; j < oppMus.length; j++) {
            const eVal = E(mu, oppMus[j], oppPhis[j]);
            const gVal = g(oppPhis[j]);
            vSum += gVal * gVal * eVal * (1 - eVal);
        }
        const v = 1 / vSum;
        // Step 4: Compute delta
        let deltaSum = 0;
        for (let j = 0; j < oppMus.length; j++) {
            const eVal = E(mu, oppMus[j], oppPhis[j]);
            const gVal = g(oppPhis[j]);
            deltaSum += gVal * (outcomes[j] - eVal);
        }
        const delta = v * deltaSum;
        // Step 5: Iteration to find new volatility (Illinois algorithm / Regula Falsi)
        const a = Math.log(sigma * sigma);
        const f = (x) => {
            const ex = Math.exp(x);
            const d2 = delta * delta;
            const phi2 = phi * phi;
            const num = ex * (d2 - phi2 - v - ex);
            const den = 2 * Math.pow(phi2 + v + ex, 2);
            return num / den - (x - a) / (this.tau * this.tau);
        };
        let A = a;
        let B = 0;
        if (delta * delta > phi * phi + v) {
            B = Math.log(delta * delta - phi * phi - v);
        }
        else {
            let k = 1;
            while (f(a - k * this.tau) < 0) {
                k++;
            }
            B = a - k * this.tau;
        }
        let fA = f(A);
        let fB = f(B);
        const epsilon = 0.000001;
        let limit = 0;
        while (Math.abs(B - A) > epsilon && limit < 100) {
            const C = A + ((A - B) * fA) / (fB - fA);
            const fC = f(C);
            if (fC * fB < 0) {
                A = B;
                fA = fB;
            }
            else {
                fA = fA / 2;
            }
            B = C;
            fB = fC;
            limit++;
        }
        const nextVolatility = Math.exp(B / 2);
        // Step 6: Update variables
        const phiStar = Math.sqrt(phi * phi + nextVolatility * nextVolatility);
        const nextPhi = 1 / Math.sqrt(1 / (phiStar * phiStar) + 1 / v);
        let muUpdate = 0;
        for (let j = 0; j < oppMus.length; j++) {
            const eVal = E(mu, oppMus[j], oppPhis[j]);
            const gVal = g(oppPhis[j]);
            muUpdate += gVal * (outcomes[j] - eVal);
        }
        const nextMu = mu + nextPhi * nextPhi * muUpdate;
        // Convert back to standard Scale
        const nextRating = 173.7178 * nextMu + 1200;
        const nextRD = 173.7178 * nextPhi;
        return {
            rating: Math.round(nextRating),
            rd: Math.min(nextRD, 350.0),
            volatility: nextVolatility,
        };
    }
}
exports.Glicko2Strategy = Glicko2Strategy;
class RatingService {
    repo;
    redis;
    defaultStrategy;
    constructor(repo = new profile_repository_1.ProfileRepository()) {
        this.repo = repo;
        this.redis = (0, queue_config_1.createRedisInstance)();
        this.defaultStrategy = new Glicko2Strategy();
    }
    /**
     * Calculates dynamic contest ratings for all participants (idempotent, safe, and replayable)
     */
    async calculateContestRatings(contestId) {
        // 1. Acquire distributed lock for contest rating processing
        const lockKey = `lock:contest:${contestId}:rating`;
        const lockToken = `token_${Date.now()}`;
        const acquired = await this.redis.set(lockKey, lockToken, 'PX', 120000, 'NX');
        if (acquired !== 'OK') {
            logger_1.default.info({
                eventName: 'RATING_CALCULATION_SKIPPED',
                contestId,
                message: 'Contest rating calculation already in progress or completed.',
            });
            return;
        }
        try {
            // 2. Assert idempotency check: inspect if ratings have already been written to UserRatingHistory
            const ratingExists = await database_1.prisma.userRatingHistory.findFirst({
                where: { contestId },
            });
            if (ratingExists) {
                logger_1.default.info({
                    eventName: 'RATING_CALCULATION_ALREADY_DONE',
                    contestId,
                    message: 'Ratings for this contest were already generated.',
                });
                return;
            }
            // 3. Load participant standings (sorted rank ascending)
            const scores = await database_1.prisma.contestScore.findMany({
                where: { contestId },
                include: { user: true },
                orderBy: [{ solvedCount: 'desc' }, { totalPenalty: 'asc' }],
            });
            if (scores.length <= 1) {
                logger_1.default.info({
                    eventName: 'RATING_CALCULATION_INSUFFICIENT_USERS',
                    contestId,
                    count: scores.length,
                });
                return;
            }
            const activeSeason = await this.repo.getOrCreateActiveSeason();
            // Load initial ratings for all users
            const userRatings = {};
            for (const score of scores) {
                const rating = await this.repo.getOrCreateRating(score.userId);
                userRatings[score.userId] = {
                    rating: rating.currentRating,
                    rd: rating.rd,
                    volatility: rating.volatility,
                };
            }
            // Compute outcomes & execute pluggable calculations
            for (let i = 0; i < scores.length; i++) {
                const userA = scores[i];
                const ratingA = userRatings[userA.userId];
                const opponentRatings = [];
                const opponentRDs = [];
                const outcomes = [];
                for (let j = 0; j < scores.length; j++) {
                    if (i === j)
                        continue;
                    const userB = scores[j];
                    const ratingB = userRatings[userB.userId];
                    opponentRatings.push(ratingB.rating);
                    opponentRDs.push(ratingB.rd);
                    // Determine outcome based on relative rank indices
                    if (i < j) {
                        outcomes.push(1.0); // Win (lower index = higher solved count = better rank)
                    }
                    else if (i > j) {
                        outcomes.push(0.0); // Loss
                    }
                    else {
                        outcomes.push(0.5); // Tie
                    }
                }
                // Calculate rating update using Glicko-2
                const updated = this.defaultStrategy.calculate(ratingA.rating, ratingA.rd, ratingA.volatility, opponentRatings, opponentRDs, outcomes);
                // Save rating stats and write history records inside a transaction
                await this.repo.updateRatingAndHistory({
                    userId: userA.userId,
                    contestId,
                    seasonId: activeSeason.id,
                    oldRating: ratingA.rating,
                    newRating: updated.rating,
                    volatility: updated.volatility,
                    rd: updated.rd,
                    algorithm: 'GLICKO_2',
                    reason: `Finished contest: ${contestId}`,
                });
                // Push new score to Redis leaderboard cache
                await this.redis.zadd('leaderboard:global:rating', updated.rating, userA.userId);
                await this.redis.zadd(`leaderboard:season:${activeSeason.id}:rating`, updated.rating, userA.userId);
            }
            logger_1.default.info({
                eventName: 'RATING_CALCULATION_COMPLETE',
                contestId,
                participantsCount: scores.length,
            });
        }
        finally {
            // Safely release lock using lua script to check token matching
            const luaScript = `
        if redis.call('get', KEYS[1]) == ARGV[1] then
          return redis.call('del', KEYS[1])
        else
          return 0
        end
      `;
            await this.redis.eval(luaScript, 1, lockKey, lockToken);
        }
    }
    /**
     * Replays contest history for recalculation & verification (idempotent recovery workflow)
     */
    async replayAllRatings() {
        logger_1.default.info({
            eventName: 'RATING_REPLAY_ENGINE_START',
            message: 'Wiping all rating histories to run full contest replay calculations.',
        });
        // 1. Get all users
        const users = await database_1.prisma.user.findMany({ select: { id: true } });
        // 2. Reset ratings back to genesis baseline (1200) for all users
        for (const user of users) {
            await this.repo.resetRatingsForReplay(user.id);
        }
        // 3. Clear Redis leaderboard keys
        await this.redis.del('leaderboard:global:rating');
        const seasons = await database_1.prisma.season.findMany({ select: { id: true } });
        for (const season of seasons) {
            await this.redis.del(`leaderboard:season:${season.id}:rating`);
        }
        // 4. Fetch all non-draft contests chronologically
        const contests = await database_1.prisma.contest.findMany({
            where: {
                NOT: { status: 'DRAFT' },
            },
            orderBy: { endTime: 'asc' },
        });
        // 5. Sequentially recalculate ratings for each contest
        for (const contest of contests) {
            logger_1.default.info({
                eventName: 'RATING_REPLAY_CONTEST_RUN',
                contestId: contest.id,
                title: contest.title,
            });
            await this.calculateContestRatings(contest.id);
        }
        logger_1.default.info({
            eventName: 'RATING_REPLAY_ENGINE_COMPLETE',
            totalContestsReplayed: contests.length,
        });
    }
    async closeConnections() {
        await this.redis.quit();
    }
}
exports.RatingService = RatingService;
