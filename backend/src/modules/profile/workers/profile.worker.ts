import { Worker, Queue, Job } from 'bullmq';
import { AnalyticsService } from '../services/analytics.service';
import { AchievementService } from '../services/achievement.service';
import { RatingService } from '../services/rating.service';
import { ProfileRepository } from '../repositories/profile.repository';
import logger from '../../../utils/logger';

const REDIS_OPTIONS = {
  port: 6380, // Dedicated APEX queue/caching Redis container
  host: 'localhost',
};

// Expose the BullMQ queue instance
export const profileQueue = new Queue('profile-queue', {
  connection: REDIS_OPTIONS,
});

export class ProfileWorker {
  private worker!: Worker;
  private readonly analyticsService: AnalyticsService;
  private readonly achievementService: AchievementService;
  private readonly ratingService: RatingService;
  private readonly repo: ProfileRepository;

  constructor() {
    this.analyticsService = new AnalyticsService();
    this.achievementService = new AchievementService();
    this.ratingService = new RatingService();
    this.repo = new ProfileRepository();
  }

  /**
   * Starts the BullMQ profile worker loop
   */
  public start(): void {
    this.worker = new Worker(
      'profile-queue',
      async (job: Job) => {
        logger.info({
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
              logger.warn({
                eventName: 'PROFILE_WORKER_UNKNOWN_JOB',
                jobName: job.name,
              });
              break;
          }

          logger.info({
            eventName: 'PROFILE_WORKER_JOB_COMPLETE',
            jobId: job.id,
            jobName: job.name,
          });
        } catch (err: any) {
          logger.error({
            eventName: 'PROFILE_WORKER_JOB_FAILED',
            jobId: job.id,
            jobName: job.name,
            error: err.message,
            stack: err.stack,
          });
          throw err; // Let BullMQ retry
        }
      },
      {
        connection: REDIS_OPTIONS,
        concurrency: 5,
      }
    );

    this.worker.on('failed', (job, err) => {
      logger.error({
        eventName: 'PROFILE_WORKER_FAILED_LISTENER',
        jobId: job?.id,
        error: err.message,
      });
    });
  }

  /**
   * Shuts down the worker safely
   */
  public async shutdown(): Promise<void> {
    if (this.worker) {
      await this.worker.close();
    }
  }

  /**
   * Handler for submission:accepted jobs
   */
  private async handleSubmissionAccepted(data: {
    userId: string;
    problemId: string;
    submissionId: string;
    language: string;
    runtimeMs: number;
    memoryKb: number;
    category: string;
    isAccepted: boolean;
    submittedAt: string;
  }): Promise<void> {
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
      logger.info({
        eventName: 'RECOMMENDATION_REQUESTED_HOOK',
        userId,
        reason: `Unlocked achievements: ${unlockedBadges.join(', ')}`,
      });
    }
  }

  /**
   * Handler for contest:ended rating updates
   */
  private async handleContestEnded(data: { contestId: string }): Promise<void> {
    const { contestId } = data;
    await this.ratingService.calculateContestRatings(contestId);
  }
}
export default ProfileWorker;
