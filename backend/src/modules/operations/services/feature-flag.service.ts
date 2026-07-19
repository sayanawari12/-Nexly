import crypto from 'crypto';
import { OperationsRepository } from '../repositories/operations.repository';

export class FeatureFlagService {
  private readonly repo: OperationsRepository;

  constructor(repo = new OperationsRepository()) {
    this.repo = repo;
  }

  /**
   * Asserts if a target feature flag is enabled for the specific user (factors in rollout percentages)
   */
  public async isEnabled(key: string, userId?: string): Promise<boolean> {
    const flag = await this.repo.getFeatureFlag(key);
    if (!flag || !flag.enabled) return false;

    // Rollout checks
    if (flag.rollout >= 1.0) return true;
    if (!userId) return false; // Anon users get false on partial rollouts

    // Hash user + flag key to get deterministic 0-99 percentage bracket
    const hash = crypto
      .createHash('sha256')
      .update(`${userId}:${key}`)
      .digest('hex');

    const userPercent = parseInt(hash.substring(0, 8), 16) % 100;
    const targetPercent = flag.rollout * 100;

    return userPercent < targetPercent;
  }
}
export default FeatureFlagService;
