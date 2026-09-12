"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const submission_repository_1 = require("../repositories/submission.repository");
const testcase_repository_1 = require("../../problem/repositories/testcase.repository");
const problem_repository_1 = require("../../problem/repositories/problem.repository");
const queue_service_1 = require("../../queue/services/queue.service");
const queue_config_1 = require("../../queue/config/queue.config");
const errors_1 = require("../../../errors");
const logger_1 = require("../../../utils/logger");
const database_1 = require("../../../config/database");
class SubmissionService {
    submissionRepo;
    testCaseRepo;
    problemRepo;
    queueService;
    lockTimeoutMs = 5000; // 5 seconds lock
    constructor(submissionRepo = new submission_repository_1.SubmissionRepository(), testCaseRepo = new testcase_repository_1.TestCaseRepository(), problemRepo = new problem_repository_1.ProblemRepository(), queueService = new queue_service_1.QueueService()) {
        this.submissionRepo = submissionRepo;
        this.testCaseRepo = testCaseRepo;
        this.problemRepo = problemRepo;
        this.queueService = queueService;
    }
    /**
     * Submits user code for validation, acquires an idempotency lock,
     * and triggers background queue processing.
     */
    async createSubmission(userId, problemId, languageId, sourceCode, contestId) {
        // 1. Enforce distributed atomic idempotency lock in Redis across multi-instance clusters
        const codeHash = crypto_1.default
            .createHash('sha256')
            .update(`${userId}:${problemId}:${sourceCode}`)
            .digest('hex');
        const lockKey = `lock:submission:${codeHash}`;
        const acquired = await queue_config_1.redisConnection.set(lockKey, '1', 'PX', this.lockTimeoutMs, 'NX');
        if (!acquired) {
            logger_1.logger.warn({
                eventName: 'SUBMISSION_LOCK_REJECTED',
                userId,
                problemId,
                message: 'Duplicate submission request blocked by distributed Redis idempotency filter.',
            });
            throw new errors_1.ConflictError('Duplicate submission detected. Please wait 5 seconds.');
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
            throw new errors_1.NotFoundError('Problem target not found.');
        }
        // 3. Resolve internal language mapping parameters
        const language = await database_1.prisma.language.findUnique({
            where: { id: languageId },
        });
        if (!language || !language.isActive) {
            throw new errors_1.NotFoundError('Selected language compiler is not supported or active.');
        }
        // 4. Create initial pending record
        const submission = await this.submissionRepo.create({
            userId,
            problemId,
            languageId,
            sourceCode,
            status: client_1.SubmissionStatus.PENDING,
        });
        logger_1.logger.info({
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
            sourceCode,
        });
        return submission;
    }
    /**
     * Fetches the submission details, checking permission boundaries.
     */
    async getSubmissionById(id, userId, role) {
        const submission = await this.submissionRepo.findById(id);
        if (!submission) {
            throw new errors_1.NotFoundError('Submission record not found.');
        }
        // Access containment guard
        if (role !== 'ADMIN' && submission.userId !== userId) {
            throw new errors_1.UnauthorizedError('You do not have permission to view this submission.');
        }
        return submission;
    }
    /**
     * Lists paginated submissions belonging to a specific user.
     */
    async listSubmissions(userId, skip, take) {
        return this.submissionRepo.findManyByUserId(userId, skip, take);
    }
}
exports.SubmissionService = SubmissionService;
exports.default = SubmissionService;
