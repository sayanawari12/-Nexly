"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeatureFlagService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const operations_repository_1 = require("../repositories/operations.repository");
class FeatureFlagService {
    repo;
    constructor(repo = new operations_repository_1.OperationsRepository()) {
        this.repo = repo;
    }
    /**
     * Asserts if a target feature flag is enabled for the specific user (factors in rollout percentages)
     */
    async isEnabled(key, userId) {
        const flag = await this.repo.getFeatureFlag(key);
        if (!flag || !flag.enabled)
            return false;
        // Rollout checks
        if (flag.rollout >= 1.0)
            return true;
        if (!userId)
            return false; // Anon users get false on partial rollouts
        // Hash user + flag key to get deterministic 0-99 percentage bracket
        const hash = crypto_1.default
            .createHash('sha256')
            .update(`${userId}:${key}`)
            .digest('hex');
        const userPercent = parseInt(hash.substring(0, 8), 16) % 100;
        const targetPercent = flag.rollout * 100;
        return userPercent < targetPercent;
    }
}
exports.FeatureFlagService = FeatureFlagService;
exports.default = FeatureFlagService;
