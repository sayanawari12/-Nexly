import crypto from 'crypto';
import { Queue } from 'bullmq';
import { defaultQueueOptions, redisConnection } from '../config/queue.config';
import { SubmissionJobPayload } from '../types';
import { logger } from '../../../utils/logger';
import { RequestContext } from '../../../utils/context';
import { ServiceUnavailableError } from '../../../errors';

export class QueueService {
  private readonly submissionQueue: Queue<SubmissionJobPayload>;
  private readonly maxQueueDepth = 1000;
  private readonly reserveCapacity = 200; // Contest reserve capacity slots

  constructor() {
    this.submissionQueue = new Queue<SubmissionJobPayload>('submission-queue', defaultQueueOptions);
  }

  /**
   * Generates a unique, deterministic job ID hash for deduplication.
   */
  public generateJobId(userId: string, problemId: string, sourceCode: string): string {
    return crypto
      .createHash('sha256')
      .update(`${userId}:${problemId}:${sourceCode}`)
      .digest('hex');
  }

  /**
   * Pushes a submission execution job to the BullMQ stream, applying load shedding.
   */
  public async addSubmissionJob(
    userId: string,
    payload: Omit<SubmissionJobPayload, 'userId' | 'schemaVersion' | 'requestId' | 'correlationId'>,
    priority: number = 10 // Standard practice priority (Contests priority = 1)
  ): Promise<string> {
    // 1. Admission Control & Load Shedding checks
    const counts = await this.submissionQueue.getJobCounts();
    const currentDepth = (counts.waiting || 0) + (counts.active || 0);

    // Shed load if queue exceeds capacity, reserving remaining slots for contest users
    if (currentDepth >= this.maxQueueDepth) {
      throw new ServiceUnavailableError('Code execution engine is currently overloaded. Please try again.');
    }
    
    if (priority > 1 && currentDepth >= (this.maxQueueDepth - this.reserveCapacity)) {
      logger.warn({
        eventName: 'QUEUE_LOAD_SHED_PRACTICE',
        currentDepth,
        message: 'Practice submission rejected early under load shedding parameters to protect contests.',
      });
      throw new ServiceUnavailableError('Practice executions are temporarily throttled to prioritize live contests.');
    }

    // 2. Generate unique deterministic job id to prevent duplicate enqueues
    const jobId = this.generateJobId(userId, payload.problemId, payload.sourceCode);

    // 3. Inject request context for distributed logging tracing
    const requestId = RequestContext.getRequestId();
    
    const jobPayload: SubmissionJobPayload = {
      ...payload,
      userId,
      schemaVersion: 1, // Current payload schema version
      requestId,
      correlationId: requestId,
    };

    const job = await this.submissionQueue.add('submission', jobPayload, {
      jobId,
      priority,
    });

    logger.info({
      eventName: 'QUEUE_JOB_ENQUEUED',
      jobId: job.id,
      submissionId: payload.submissionId,
      currentDepth,
    });

    return job.id!;
  }

  /**
   * Retrieves active metrics for monitoring telemetry.
   */
  public async getQueueMetrics(): Promise<any> {
    const counts = await this.submissionQueue.getJobCounts();
    return {
      waiting: counts.waiting,
      active: counts.active,
      completed: counts.completed,
      failed: counts.failed,
      delayed: counts.delayed,
    };
  }
}
export default QueueService;
