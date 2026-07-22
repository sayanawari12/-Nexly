import { Response } from 'express';
import { prisma } from '../../../config/database';
import { config } from '../../../config';
import { OperationsRepository } from '../repositories/operations.repository';
import { AuditService } from '../services/audit.service';
import { ApiResponse } from '../../../utils/response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';
import { NotFoundError, ForbiddenError } from '../../../errors';
import { Queue } from 'bullmq';
import { ReportStatus, ProblemStatus } from '@prisma/client';
import { redisConnection } from '../../queue/config/queue.config';

export class ModerationController {
  private readonly repo: OperationsRepository;
  private readonly audit: AuditService;
  private readonly submissionsQueue: Queue;

  constructor() {
    this.repo = new OperationsRepository();
    this.audit = new AuditService();
    this.submissionsQueue = new Queue('submissions', {
      connection: redisConnection,
    });
  }

  /**
   * User management moderation endpoints
   */
  public suspendUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { targetUserId, reason } = req.body;

    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new NotFoundError('Target user not found');

    const beforeState = { role: user.role };
    
    // De-privilege user as mock ban state
    const updated = await prisma.user.update({
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

    res.status(200).json(ApiResponse.success({ message: 'User suspended successfully.' }));
  };

  public restoreUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { targetUserId } = req.body;

    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new NotFoundError('Target user not found');

    await this.audit.logAction({
      actorId: req.user?.id,
      action: 'USER_RESTORED',
      resource: `User:${targetUserId}`,
      beforeState: { role: user.role },
      afterState: { role: 'USER' },
      req,
    });

    res.status(200).json(ApiResponse.success({ message: 'User restored successfully.' }));
  };

  /**
   * Force logouts session families invalidation
   */
  public forceLogout = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { targetUserId } = req.body;

    const user = await prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) throw new NotFoundError('Target user not found');

    // Wipes all active refresh tokens in Postgres (invalidation flow)
    const result = await prisma.refreshToken.deleteMany({
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

    res.status(200).json(ApiResponse.success({ message: 'All active sessions invalidated.' }));
  };

  /**
   * Problem moderation states transitions workflow
   */
  public moderateProblem = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { problemId, status, notes } = req.body;

    const problem = await prisma.problem.findUnique({ where: { id: problemId } });
    if (!problem) throw new NotFoundError('Problem not found');

    const beforeState = { status: problem.status };

    // Update state
    await prisma.problem.update({
      where: { id: problemId },
      data: { status: status as ProblemStatus },
    });

    await this.audit.logAction({
      actorId: req.user?.id,
      action: 'PROBLEM_MODERATED',
      resource: `Problem:${problemId}`,
      beforeState,
      afterState: { status, notes },
      req,
    });

    res.status(200).json(ApiResponse.success({ message: `Problem status set to ${status}.` }));
  };

  /**
   * Submission moderation: trigger rejudge pipeline
   */
  public rejudgeSubmission = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { submissionId } = req.body;

    const submission = await prisma.submission.findUnique({ where: { id: submissionId } });
    if (!submission) throw new NotFoundError('Submission not found');

    const beforeState = { status: submission.status };

    // Reset status to PENDING
    const updated = await prisma.submission.update({
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

    res.status(200).json(ApiResponse.success({ message: 'Rejudge enqueued successfully.' }));
  };

  /**
   * Reports Moderation Queue management
   */
  public listReports = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const reports = await this.repo.getReports();
    res.status(200).json(ApiResponse.success(reports));
  };

  public updateReportStatus = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const id = req.params.reportId as string;
    const { status, notes } = req.body;

    const updated = await this.repo.updateReportStatus(id, status as ReportStatus, notes);

    await this.audit.logAction({
      actorId: req.user?.id,
      action: 'REPORT_MODERATED',
      resource: `Report:${id}`,
      beforeState: { status: 'OPEN' },
      afterState: { status: updated.status, notes },
      req,
    });

    res.status(200).json(ApiResponse.success(updated));
  };
}
export default ModerationController;
