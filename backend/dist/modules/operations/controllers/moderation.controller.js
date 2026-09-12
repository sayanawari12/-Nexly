"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationController = void 0;
const database_1 = require("../../../config/database");
const operations_repository_1 = require("../repositories/operations.repository");
const audit_service_1 = require("../services/audit.service");
const response_1 = require("../../../utils/response");
const errors_1 = require("../../../errors");
const bullmq_1 = require("bullmq");
const queue_config_1 = require("../../queue/config/queue.config");
class ModerationController {
    repo;
    audit;
    submissionsQueue;
    constructor() {
        this.repo = new operations_repository_1.OperationsRepository();
        this.audit = new audit_service_1.AuditService();
        this.submissionsQueue = new bullmq_1.Queue('submissions', {
            connection: queue_config_1.redisConnection,
        });
    }
    /**
     * User management moderation endpoints
     */
    suspendUser = async (req, res) => {
        const { targetUserId, reason } = req.body;
        const user = await database_1.prisma.user.findUnique({ where: { id: targetUserId } });
        if (!user)
            throw new errors_1.NotFoundError('Target user not found');
        const beforeState = { role: user.role };
        // De-privilege user as mock ban state
        const updated = await database_1.prisma.user.update({
            where: { id: targetUserId },
            data: { role: 'USER' }, // Resets privileged roles on suspension
        });
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'USER_SUSPENDED',
            resource: `User:${targetUserId}`,
            beforeState,
            afterState: { role: updated.role, reason },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success({ message: 'User suspended successfully.' }));
    };
    restoreUser = async (req, res) => {
        const { targetUserId } = req.body;
        const user = await database_1.prisma.user.findUnique({ where: { id: targetUserId } });
        if (!user)
            throw new errors_1.NotFoundError('Target user not found');
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'USER_RESTORED',
            resource: `User:${targetUserId}`,
            beforeState: { role: user.role },
            afterState: { role: 'USER' },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success({ message: 'User restored successfully.' }));
    };
    /**
     * Force logouts session families invalidation
     */
    forceLogout = async (req, res) => {
        const { targetUserId } = req.body;
        const user = await database_1.prisma.user.findUnique({ where: { id: targetUserId } });
        if (!user)
            throw new errors_1.NotFoundError('Target user not found');
        // Wipes all active refresh tokens in Postgres (invalidation flow)
        const result = await database_1.prisma.refreshToken.deleteMany({
            where: { userId: targetUserId },
        });
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'USER_FORCE_LOGOUT',
            resource: `User:${targetUserId}`,
            beforeState: { activeTokensDeleted: result.count },
            afterState: { activeTokensDeleted: 0 },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success({ message: 'All active sessions invalidated.' }));
    };
    /**
     * Problem moderation states transitions workflow
     */
    moderateProblem = async (req, res) => {
        const { problemId, status, notes } = req.body;
        const problem = await database_1.prisma.problem.findUnique({ where: { id: problemId } });
        if (!problem)
            throw new errors_1.NotFoundError('Problem not found');
        const beforeState = { status: problem.status };
        // Update state
        await database_1.prisma.problem.update({
            where: { id: problemId },
            data: { status: status },
        });
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'PROBLEM_MODERATED',
            resource: `Problem:${problemId}`,
            beforeState,
            afterState: { status, notes },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success({ message: `Problem status set to ${status}.` }));
    };
    /**
     * Submission moderation: trigger rejudge pipeline
     */
    rejudgeSubmission = async (req, res) => {
        const { submissionId } = req.body;
        const submission = await database_1.prisma.submission.findUnique({ where: { id: submissionId } });
        if (!submission)
            throw new errors_1.NotFoundError('Submission not found');
        const beforeState = { status: submission.status };
        // Reset status to PENDING
        const updated = await database_1.prisma.submission.update({
            where: { id: submissionId },
            data: {
                status: 'PENDING',
                executionTime: null,
                memoryUsage: null,
                compileOutput: null,
            },
        });
        // Enqueue submission run back to BullMQ wait queue
        await this.submissionsQueue.add('submission', {
            submissionId,
            userId: submission.userId,
            problemId: submission.problemId,
            sourceCode: submission.sourceCode,
        });
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'SUBMISSION_REJUDGED',
            resource: `Submission:${submissionId}`,
            beforeState,
            afterState: { status: updated.status },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success({ message: 'Rejudge enqueued successfully.' }));
    };
    /**
     * Reports Moderation Queue management
     */
    listReports = async (req, res) => {
        const reports = await this.repo.getReports();
        res.status(200).json(response_1.ApiResponse.success(reports));
    };
    updateReportStatus = async (req, res) => {
        const id = req.params.reportId;
        const { status, notes } = req.body;
        const updated = await this.repo.updateReportStatus(id, status, notes);
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'REPORT_MODERATED',
            resource: `Report:${id}`,
            beforeState: { status: 'OPEN' },
            afterState: { status: updated.status, notes },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success(updated));
    };
}
exports.ModerationController = ModerationController;
exports.default = ModerationController;
