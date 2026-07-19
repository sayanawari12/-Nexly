import { Response } from 'express';
import { SubmissionService } from '../services/submission.service';
import { ApiResponse } from '../../../utils/response';
import { PaginationUtil } from '../../../utils/pagination';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';
import { UnauthorizedError } from '../../../errors';
import { prisma } from '../../../config/database';

export class SubmissionController {
  private readonly submissionService: SubmissionService;

  constructor(submissionService = new SubmissionService()) {
    this.submissionService = submissionService;
  }

  /**
   * Submits code for asynchronous execution (returns 202 Accepted).
   */
  public create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }

    const { problemId, languageId, sourceCode, contestId } = req.body;
    
    const submission = await this.submissionService.createSubmission(
      req.user.id,
      problemId,
      languageId,
      sourceCode,
      contestId
    );

    // Return 202 Accepted for background execution
    res.status(202).json(ApiResponse.success(submission));
  };

  /**
   * Retrieves full details of a submission.
   */
  public get = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const { id } = req.params;
    const submission = await this.submissionService.getSubmissionById(
      id as string,
      req.user.id,
      req.user.role
    );
    res.status(200).json(ApiResponse.success(submission));
  };

  /**
   * Endpoint specifically for polling status updates.
   */
  public status = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const { id } = req.params;
    const submission = await this.submissionService.getSubmissionById(
      id as string,
      req.user.id,
      req.user.role
    );
    
    // Respond only with status and execution statistics
    res.status(200).json(ApiResponse.success({
      status: submission.status,
      executionTime: submission.executionTime,
      memoryUsage: submission.memoryUsage,
      compileOutput: submission.compileOutput,
      runtimeOutput: submission.runtimeOutput,
    }));
  };

  /**
   * Lists paginated submissions of the currently authenticated user.
   */
  public list = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }

    const pageParams = PaginationUtil.parse(req.query.page, req.query.limit);
    
    const [submissions, totalCount] = await this.submissionService.listSubmissions(
      req.user.id,
      pageParams.offset,
      pageParams.limit
    );

    const meta = PaginationUtil.buildMetadata(totalCount, pageParams.page, pageParams.limit);
    res.status(200).json(ApiResponse.paginated(submissions, meta));
  };

  /**
   * Lists all active/supported compilers from the database.
   */
  public listLanguages = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const languages = await prisma.language.findMany({
      where: { isActive: true },
      orderBy: { displayName: 'asc' },
    });
    res.status(200).json(ApiResponse.success(languages));
  };
}
export default SubmissionController;
