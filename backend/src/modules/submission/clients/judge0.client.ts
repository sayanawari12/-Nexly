import axios from 'axios';
import { config } from '../../../config';
import { JudgeClient, ExecutionLimits, NormalizedResult } from '../types';
import { logger } from '../../../utils/logger';
import { ExternalServiceError } from '../../../errors';

export class Judge0Client implements JudgeClient {
  private readonly client: any;
  
  // Circuit Breaker State Properties
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  private failureCount = 0;
  private lastStateChangeTime: number = Date.now();
  
  private readonly failureThreshold = 5;
  private readonly cooldownMs = 15000; // 15 seconds

  constructor() {
    this.client = axios.create({
      baseURL: config.judge0.apiUrl,
      timeout: 5000, // 5 seconds timeout limit
    });
  }

  /**
   * Helper verifying Circuit Breaker status prior to scheduling network calls.
   */
  private checkCircuit(): void {
    const now = Date.now();

    if (this.state === 'OPEN') {
      if (now - this.lastStateChangeTime > this.cooldownMs) {
        this.transitionTo('HALF_OPEN');
      } else {
        logger.error({
          eventName: 'JUDGE_CIRCUIT_OPEN_BLOCKED',
          state: this.state,
          cooldownRemainingMs: this.cooldownMs - (now - this.lastStateChangeTime),
          message: 'Circuit is open. Reverting connection attempt early.',
        });
        throw new ExternalServiceError('Compilation engine is temporarily offline.');
      }
    }
  }

  /**
   * Handles state transitions and logs indicators structured.
   */
  private transitionTo(newState: 'CLOSED' | 'OPEN' | 'HALF_OPEN'): void {
    const oldState = this.state;
    this.state = newState;
    this.lastStateChangeTime = Date.now();

    logger.info({
      eventName: 'JUDGE_CIRCUIT_STATE_CHANGE',
      oldState,
      newState,
      failureCount: this.failureCount,
      message: `Execution circuit transitioned from ${oldState} to ${newState}.`,
    });
  }

  /**
   * Records success checks, resetting failure loops.
   */
  private recordSuccess(): void {
    this.failureCount = 0;
    if (this.state === 'HALF_OPEN') {
      this.transitionTo('CLOSED');
    }
  }

  /**
   * Records failures, tripping the breaker when thresholds are exceeded.
   */
  private recordFailure(): void {
    this.failureCount++;
    logger.warn({
      eventName: 'JUDGE_CLIENT_FAILURE',
      state: this.state,
      failureCount: this.failureCount,
      threshold: this.failureThreshold,
    });

    if (this.state === 'CLOSED' && this.failureCount >= this.failureThreshold) {
      this.transitionTo('OPEN');
    } else if (this.state === 'HALF_OPEN') {
      this.transitionTo('OPEN');
    }
  }

  /**
   * Hits the system status endpoint.
   */
  public async healthCheck(): Promise<boolean> {
    try {
      const res = await this.client.get('/system_info');
      return res.status === 200;
    } catch (err) {
      return false;
    }
  }

  /**
   * Posts code payload to Judge0 and returns token.
   */
  public async submit(
    sourceCode: string,
    judge0LanguageId: number,
    input: string,
    expectedOutput: string,
    limits: ExecutionLimits
  ): Promise<string> {
    this.checkCircuit();

    const payload = {
      source_code: Buffer.from(sourceCode).toString('base64'),
      language_id: judge0LanguageId,
      stdin: Buffer.from(input).toString('base64'),
      expected_output: Buffer.from(expectedOutput).toString('base64'),
      cpu_time_limit: limits.timeLimit,
      memory_limit: limits.memoryLimit,
    };

    try {
      const startTime = Date.now();
      const res = await this.client.post('/submissions?base64_encoded=true&wait=false', payload);
      const duration = Date.now() - startTime;

      this.recordSuccess();

      logger.info({
        eventName: 'JUDGE_SUBMISSION_POSTED',
        executionDurationMs: duration,
        judgeToken: res.data.token,
      });

      return res.data.token;
    } catch (err: any) {
      this.recordFailure();
      logger.error({
        eventName: 'JUDGE_SUBMISSION_POST_FAILED',
        error: err.message,
      });
      throw new ExternalServiceError('Failed to dispatch code to execution sandbox.', err.response?.data);
    }
  }

  /**
   * Polls specific token outcomes.
   */
  public async poll(token: string): Promise<NormalizedResult> {
    try {
      const startTime = Date.now();
      const res = await this.client.get(`/submissions/${token}?base64_encoded=true`);
      const duration = Date.now() - startTime;

      this.recordSuccess();

      const statusId = res.data.status?.id;

      logger.info({
        eventName: 'JUDGE_POLL_COMPLETED',
        judgeToken: token,
        statusId,
        executionDurationMs: duration,
      });

      // 1. If still processing or in queue, return status PROCESSING early
      if (statusId === 1 || statusId === 2) {
        return { status: 'PROCESSING' };
      }

      // 2. Decode outputs
      const stdout = res.data.stdout ? Buffer.from(res.data.stdout, 'base64').toString('utf-8') : undefined;
      const stderr = res.data.stderr ? Buffer.from(res.data.stderr, 'base64').toString('utf-8') : undefined;
      const compileOutput = res.data.compile_output ? Buffer.from(res.data.compile_output, 'base64').toString('utf-8') : undefined;
      
      const executionTime = res.data.time ? parseFloat(res.data.time) : undefined;
      const memoryUsage = res.data.memory ? parseInt(res.data.memory, 10) : undefined;
      const exitCode = res.data.exit_code !== null ? parseInt(res.data.exit_code, 10) : undefined;

      // 3. Map status ID to internal enums
      let status: NormalizedResult['status'] = 'INTERNAL_ERROR';

      if (statusId === 3) status = 'ACCEPTED';
      else if (statusId === 4) status = 'WRONG_ANSWER';
      else if (statusId === 5) status = 'TIME_LIMIT_EXCEEDED';
      else if (statusId === 6) status = 'COMPILATION_ERROR';
      else if (statusId >= 7 && statusId <= 12) status = 'RUNTIME_ERROR';
      else if (statusId === 13 || statusId === 14) status = 'INTERNAL_ERROR';

      return {
        status,
        stdout,
        stderr,
        compileOutput,
        message: res.data.message,
        executionTime,
        memoryUsage,
        exitCode,
      };
    } catch (err: any) {
      this.recordFailure();
      logger.error({
        eventName: 'JUDGE_POLL_FAILED',
        judgeToken: token,
        error: err.message,
      });
      throw new ExternalServiceError('Failed to retrieve code execution status from sandbox.', err.response?.data);
    }
  }
}
export default Judge0Client;
