import crypto from 'crypto';
import { Submission, SubmissionStatus } from '@prisma/client';
import { SubmissionRepository } from '../repositories/submission.repository';
import { TestCaseRepository } from '../../problem/repositories/testcase.repository';
import { ProblemRepository } from '../../problem/repositories/problem.repository';
import { QueueService } from '../../queue/services/queue.service';
import { redisConnection } from '../../queue/config/queue.config';
import { ConflictError, NotFoundError, UnauthorizedError } from '../../../errors';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../config/database';

export class SubmissionService {
  private readonly submissionRepo: SubmissionRepository;
  private readonly testCaseRepo: TestCaseRepository;
  private readonly problemRepo: ProblemRepository;
  private readonly queueService: QueueService;
  private readonly lockTimeoutMs = 5000; // 5 seconds lock

  constructor(
    submissionRepo = new SubmissionRepository(),
    testCaseRepo = new TestCaseRepository(),
    problemRepo = new ProblemRepository(),
    queueService = new QueueService()
  ) {
    this.submissionRepo = submissionRepo;
    this.testCaseRepo = testCaseRepo;
    this.problemRepo = problemRepo;
    this.queueService = queueService;
  }

  /**
   * Submits user code for validation, acquires an idempotency lock, 
   * and triggers background queue processing.
   */
  public async createSubmission(
    userId: string,
    problemId: string,
    languageId: string,
    sourceCode: string,
    contestId?: string
  ): Promise<Submission> {
    // 1. Enforce distributed atomic idempotency lock in Redis across multi-instance clusters
    const codeHash = crypto
      .createHash('sha256')
      .update(`${userId}:${problemId}:${sourceCode}`)
      .digest('hex');
    const lockKey = `lock:submission:${codeHash}`;

    const acquired = await redisConnection.set(lockKey, '1', 'PX', this.lockTimeoutMs, 'NX');
    if (!acquired) {
      logger.warn({
        eventName: 'SUBMISSION_LOCK_REJECTED',
        userId,
        problemId,
        message: 'Duplicate submission request blocked by distributed Redis idempotency filter.',
      });
      throw new ConflictError('Duplicate submission detected. Please wait 5 seconds.');
    }

    // 1a. Validate contest context constraints if enqueued under a contest
    if (contestId) {
      const { ContestService } = require('../../contest/services/contest.service');
      const contestService = new ContestService();
      await contestService.validateContestSubmission(contestId, userId, problemId);
    }

    // 2. Validate problem exists and is not deleted
    const problem = await this.problemRepo.findById(problemId);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem target not found.');
    }

    // 3. Resolve internal language mapping parameters
    const language = await prisma.language.findUnique({
      where: { id: languageId },
    });
    if (!language || !language.isActive) {
      throw new NotFoundError('Selected language compiler is not supported or active.');
    }

    // 4. Create initial pending record
    const submission = await this.submissionRepo.create({
      userId,
      problemId,
      languageId,
      sourceCode,
      status: SubmissionStatus.PENDING,
    });

    logger.info({
      eventName: 'SUBMISSION_RECORD_CREATED',
      submissionId: submission.id,
      userId,
      problemId,
    });

    // 4a. Link submission to contest context
    if (contestId) {
      const { ContestRepository } = require('../../contest/repositories/contest.repository');
      const contestRepo = new ContestRepository();
      await contestRepo.linkSubmission(contestId, userId, problemId, submission.id);
    }

    // 5. Enqueue execution task to BullMQ processing queue
    await this.queueService.addSubmissionJob(userId, {
      submissionId: submission.id,
      problemId,
      languageId,
      judge0LanguageId: language.judge0LanguageId,
      sourceCode,
    });

    return submission;
  }

  /**
   * Fetches the submission details, checking permission boundaries.
   */
  public async getSubmissionById(id: string, userId: string, role: string): Promise<Submission> {
    const submission = await this.submissionRepo.findById(id);
    if (!submission) {
      throw new NotFoundError('Submission record not found.');
    }

    // Access containment guard
    if (role !== 'ADMIN' && submission.userId !== userId) {
      throw new UnauthorizedError('You do not have permission to view this submission.');
    }

    return submission;
  }

  /**
   * Lists paginated submissions belonging to a specific user.
   */
  public async listSubmissions(
    userId: string,
    skip: number,
    take: number
  ): Promise<[Submission[], number]> {
    return this.submissionRepo.findManyByUserId(userId, skip, take);
  }
}
export default SubmissionService;
