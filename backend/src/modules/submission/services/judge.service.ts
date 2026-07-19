import { JudgeClient } from '../types';
import { Judge0Client } from '../clients/judge0.client';
import { logger } from '../../../utils/logger';

export class JudgeService {
  private readonly judgeClient: JudgeClient;

  constructor(judgeClient: JudgeClient = new Judge0Client()) {
    this.judgeClient = judgeClient;
  }

  /**
   * Asserts compiler sandbox containers are online and responsive.
   */
  public async verifyEngineStatus(): Promise<boolean> {
    const isHealthy = await this.judgeClient.healthCheck();
    if (!isHealthy) {
      logger.fatal({
        eventName: 'JUDGE_ENGINE_DOWN',
        message: 'Compilation sandbox engine returned unresponsive status. Alerting operator channels.',
      });
    } else {
      logger.info({
        eventName: 'JUDGE_ENGINE_UP',
        message: 'Compilation sandbox engine connection verified healthy.',
      });
    }
    return isHealthy;
  }
}
export default JudgeService;
