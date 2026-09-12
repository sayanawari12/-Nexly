"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileWorker = exports.profileQueue = void 0;
const bullmq_1 = require("bullmq");
const analytics_service_1 = require("../services/analytics.service");
const achievement_service_1 = require("../services/achievement.service");
const rating_service_1 = require("../services/rating.service");
const profile_repository_1 = require("../repositories/profile.repository");
const logger_1 = __importDefault(require("../../../utils/logger"));
const queue_config_1 = require("../../queue/config/queue.config");
// Expose the BullMQ queue instance using shared valid Redis connection
exports.profileQueue = new bullmq_1.Queue('profile-queue', {
    connection: queue_config_1.redisConnection,
});
class ProfileWorker {
    worker;
    analyticsService;
    achievementService;
    ratingService;
    repo;
    constructor() {
        this.analyticsService = new analytics_service_1.AnalyticsService();
        this.achievementService = new achievement_service_1.AchievementService();
        this.ratingService = new rating_service_1.RatingService();
        this.repo = new profile_repository_1.ProfileRepository();
    }
    /**
     * Starts the BullMQ profile worker loop
     */
    start() {
        this.worker = new bullmq_1.Worker('profile-queue', async (job) => {
            logger_1.default.info({
                eventName: 'PROFILE_WORKER_JOB_START',
                jobId: job.id,
                jobName: job.name,
            });
            try {
                switch (job.name) {
                    case 'submission:accepted':
                        await this.handleSubmissionAccepted(job.data);
                        break;
                    case 'contest:ended':
                        await this.handleContestEnded(job.data);
                        break;
                    default:
                        logger_1.default.warn({
                            eventName: 'PROFILE_WORKER_UNKNOWN_JOB',
                            jobName: job.name,
                        });
                        break;
                }
                logger_1.default.info({
                    eventName: 'PROFILE_WORKER_JOB_COMPLETE',
                    jobId: job.id,
                    jobName: job.name,
                });
            }
            catch (err) {
                logger_1.default.error({
                    eventName: 'PROFILE_WORKER_JOB_FAILED',
                    jobId: job.id,
                    jobName: job.name,
                    error: err.message,
                    stack: err.stack,
                });
                throw err; // Let BullMQ retry
            }
        }, {
            connection: (0, queue_config_1.createRedisInstance)(),
            concurrency: 5,
        });
        this.worker.on('failed', (job, err) => {
            logger_1.default.error({
                eventName: 'PROFILE_WORKER_FAILED_LISTENER',
                jobId: job?.id,
                error: err.message,
            });
        });
    }
    /**
     * Shuts down the worker safely
     */
    async shutdown() {
        if (this.worker) {
            await this.worker.close();
        }
    }
    /**
     * Handler for submission:accepted jobs
     */
    async handleSubmissionAccepted(data) {
        const { userId, problemId, submissionId, language, runtimeMs, memoryKb, category, isAccepted, submittedAt } = data;
        // 1. Process stats summaries, skills growth, and snapshots
        await this.analyticsService.processSolveAnalytics({
            userId,
            problemId,
            category,
            language,
            runtimeMs,
            memoryKb,
            isAccepted,
            submittedAt: new Date(submittedAt),
        });
        // 2. Process gamification rules & badge checks
        const unlockedBadges = await this.achievementService.evaluateAchievements(userId);
        // 3. Emit recommendation requested hook events if badge or milestone checks occur
        if (unlockedBadges.length > 0) {
            logger_1.default.info({
                eventName: 'RECOMMENDATION_REQUESTED_HOOK',
                userId,
                reason: `Unlocked achievements: ${unlockedBadges.join(', ')}`,
            });
        }
    }
    /**
     * Handler for contest:ended rating updates
     */
    async handleContestEnded(data) {
        const { contestId } = data;
        await this.ratingService.calculateContestRatings(contestId);
    }
}
exports.ProfileWorker = ProfileWorker;
exports.default = ProfileWorker;
