import { Worker, Job } from 'bullmq';
import { SubmissionStatus } from '@prisma/client';
import { defaultQueueOptions } from '../config/queue.config';
import { SubmissionJobPayload } from '../types';
import { SubmissionRepository } from '../../submission/repositories/submission.repository';
import { TestCaseRepository } from '../../problem/repositories/testcase.repository';
import { ProblemRepository } from '../../problem/repositories/problem.repository';
import { Judge0Client } from '../../submission/clients/judge0.client';
import { JudgeClient, NormalizedResult } from '../../submission/types';
import { SubmissionPublisher } from '../../realtime/publishers/submission.publisher';
import { logger } from '../../../utils/logger';
import { contextStore } from '../../../utils/context';

export class SubmissionWorker {
  private readonly worker: Worker<SubmissionJobPayload>;
  private readonly submissionRepo: SubmissionRepository;
  private readonly testCaseRepo: TestCaseRepository;
  private readonly problemRepo: ProblemRepository;
  private readonly judgeClient: JudgeClient;
  private readonly publisher: SubmissionPublisher;

  constructor(
    submissionRepo = new SubmissionRepository(),
    testCaseRepo = new TestCaseRepository(),
    problemRepo = new ProblemRepository(),
    judgeClient = new Judge0Client(),
    publisher = new SubmissionPublisher()
  ) {
    this.submissionRepo = submissionRepo;
    this.testCaseRepo = testCaseRepo;
    this.problemRepo = problemRepo;
    this.judgeClient = judgeClient;
    this.publisher = publisher;

    // Start BullMQ Worker processing submissions queue
    this.worker = new Worker<SubmissionJobPayload>(
      'submission-queue',
      async (job: Job<SubmissionJobPayload>) => {
        await this.processJob(job);
      },
      {
        connection: defaultQueueOptions.connection,
        concurrency: 5, // Process up to 5 compile runs in parallel
      }
    );

    this.worker.on('failed', (job, err) => {
      logger.error({
        eventName: 'QUEUE_WORKER_JOB_FAILED',
        jobId: job?.id,
        error: err.message,
        message: 'Compilation worker task crashed.',
      });
    });
  }

  /**
   * Traces job execution, injecting tracking IDs and running validations.
   */
  private async processJob(job: Job<SubmissionJobPayload>): Promise<void> {
    const { submissionId, userId, problemId, judge0LanguageId, sourceCode, requestId } = job.data;

    // 1. Inject Request Context tracing boundaries
    if (requestId) {
      contextStore.run({ requestId }, async () => {
        await this.executePipeline(submissionId, userId, problemId, judge0LanguageId, sourceCode);
      });
    } else {
      await this.executePipeline(submissionId, userId, problemId, judge0LanguageId, sourceCode);
    }
  }

  /**
   * Execution logic mapping compilation variables and updating database records.
   */
  private async executePipeline(
    submissionId: string,
    userId: string,
    problemId: string,
    judge0LanguageId: number,
    sourceCode: string
  ): Promise<void> {
    // 1. Validate problem specs and fetch execution limits
    const problem = await this.problemRepo.findById(problemId);
    if (!problem) {
      logger.error({
        eventName: 'WORKER_PROBLEM_MISSING',
        submissionId,
        problemId,
      });
      await this.submissionRepo.update(submissionId, {
        status: SubmissionStatus.INTERNAL_ERROR,
        compileOutput: 'Evaluation failed: Target problem configuration missing.',
      });
      return;
    }

    const testCases = await this.testCaseRepo.findManyByProblemId(problemId);
    if (testCases.length === 0) {
      logger.error({
        eventName: 'WORKER_TESTCASES_MISSING',
        submissionId,
        problemId,
      });
      await this.submissionRepo.update(submissionId, {
        status: SubmissionStatus.INTERNAL_ERROR,
        compileOutput: 'Evaluation failed: No test cases found.',
      });
      return;
    }

    logger.info({
      eventName: 'WORKER_PIPELINE_START',
      submissionId,
      testCaseCount: testCases.length,
    });

    // Update state to active execution
    await this.submissionRepo.update(submissionId, {
      status: SubmissionStatus.PROCESSING,
    });

    // Publish: submission is processing
    this.publisher.publishSubmissionUpdate(userId, {
      submissionId,
      status: 'PROCESSING',
      sequenceNumber: 1,
    });

    let finalStatus: SubmissionStatus = SubmissionStatus.ACCEPTED;
    let compileOutput: string | null = null;
    let runtimeOutput: string | null = null;
    let peakMemory = 0;
    let peakTime = 0.0;
    let primaryToken: string | null = null;

    // 2. Loop test cases sequentially
    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];

      logger.info({
        eventName: 'WORKER_TESTCASE_RUN',
        submissionId,
        testCaseId: tc.id,
        index: i,
      });

      // Update socket progress
      this.publisher.publishSubmissionUpdate(userId, {
        submissionId,
        status: 'PROCESSING',
        sequenceNumber: 2,
      });

      // Submit execution to Judge0
      const token = await this.judgeClient.submit(
        sourceCode,
        judge0LanguageId,
        tc.input,
        tc.expectedOutput,
        { timeLimit: problem.timeLimit, memoryLimit: problem.memoryLimit }
      );

      if (i === 0) {
        primaryToken = token;
      }

      // Poll results
      const result = await this.pollSubmissionResult(token);

      // Record peak execution stats
      if (result.memoryUsage && result.memoryUsage > peakMemory) {
        peakMemory = result.memoryUsage;
      }
      if (result.executionTime && result.executionTime > peakTime) {
        peakTime = result.executionTime;
      }

      // Stop on compilation / runtime error boundaries
      if (result.status !== 'ACCEPTED') {
        finalStatus = result.status as SubmissionStatus;
        compileOutput = result.compileOutput || null;
        runtimeOutput = result.stderr || result.message || null;
        break;
      }
    }

    // 3. Persist final normalized result metrics to database
    await this.submissionRepo.update(submissionId, {
      status: finalStatus,
      token: primaryToken,
      compileOutput,
      runtimeOutput,
      memoryUsage: peakMemory > 0 ? peakMemory : null,
      executionTime: peakTime > 0 ? peakTime : null,
      finishedAt: new Date(),
    });

    // Publish: final result
    this.publisher.publishSubmissionUpdate(userId, {
      submissionId,
      status: finalStatus,
      executionTime: peakTime > 0 ? peakTime : null,
      memoryUsage: peakMemory > 0 ? peakMemory : null,
      compileOutput,
      runtimeOutput,
      sequenceNumber: 3,
    });

    logger.info({
      eventName: 'WORKER_PIPELINE_COMPLETE',
      submissionId,
      finalStatus,
      peakTime,
      peakMemory,
    });

    // Check if this is a contest submission and update scoreboard
    const { prisma: dbConn } = require('../../../config/database');
    const contestSub = await dbConn.contestSubmission.findUnique({
      where: { submissionId },
    });
    if (contestSub) {
      const { ContestService } = require('../../contest/services/contest.service');
      const contestService = new ContestService();
      await contestService.processContestSubmissionUpdate(contestSub.contestId, contestSub.userId);
    }

    // Enqueue profile updates asynchronously on profileQueue
    try {
      const { profileQueue } = require('../../profile/workers/profile.worker');
      const lang = await dbConn.language.findFirst({ where: { judge0LanguageId } });
      const languageName = lang ? lang.displayName : 'Python';
      const category = (problem.tags && (problem.tags as string[]).length > 0) ? (problem.tags as string[])[0] : 'General';

      await profileQueue.add('submission:accepted', {
        userId,
        problemId,
        submissionId,
        language: languageName,
        runtimeMs: Math.round(peakTime * 1000),
        memoryKb: peakMemory,
        category,
        isAccepted: finalStatus === 'ACCEPTED',
        submittedAt: new Date().toISOString(),
      });
    } catch (profileErr: any) {
      logger.error({
        eventName: 'WORKER_PROFILE_QUEUE_PUSH_FAILED',
        submissionId,
        error: profileErr.message,
      });
    }
  }

  /**
   * Helper that polls Judge0 status checking status parameters.
   */
  private async pollSubmissionResult(token: string): Promise<NormalizedResult> {
    const maxPolls = 15;
    const pollIntervalMs = 1500;

    for (let attempt = 1; attempt <= maxPolls; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
      const result = await this.judgeClient.poll(token);

      if (result.status !== 'PROCESSING') {
        return result;
      }
    }

    logger.error({
      eventName: 'WORKER_POLLING_TIMEOUT',
      judgeToken: token,
    });

    return {
      status: 'INTERNAL_ERROR',
      message: 'Evaluation pipeline timed out during background worker polling.',
    };
  }

  /**
   * Closes connection pools cleanly on SIGTERM signals.
   */
  public async close(): Promise<void> {
    await this.worker.close();
    logger.info({
      eventName: 'QUEUE_WORKER_CLOSED',
      message: 'SubmissionWorker connection closed cleanly.',
    });
  }
}
export default SubmissionWorker;
