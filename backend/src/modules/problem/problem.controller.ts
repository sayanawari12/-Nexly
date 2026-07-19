import { Request, Response } from 'express';
import { ProblemService } from './services/problem.service';
import { ApiResponse } from '../../utils/response';
import { PaginationUtil } from '../../utils/pagination';
import { AuthenticatedRequest } from '../auth/middleware/auth.middleware';
import { UnauthorizedError } from '../../errors';

export class ProblemController {
  private readonly problemService: ProblemService;

  constructor(problemService = new ProblemService()) {
    this.problemService = problemService;
  }

  /**
   * Creates a new problem draft (Admin-only).
   */
  public create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const problem = await this.problemService.createProblem(req.body, req.user.id);
    res.status(201).json(ApiResponse.success(problem));
  };

  /**
   * Updates an existing problem spec (Admin-only).
   */
  public update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const { id } = req.params;
    const problem = await this.problemService.updateProblem(id as string, req.body, req.user.id);
    res.status(200).json(ApiResponse.success(problem));
  };

  /**
   * Soft deletes a problem (Admin-only).
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.problemService.deleteProblem(id as string);
    res.status(200).json(ApiResponse.success({ message: 'Problem deleted successfully.' }));
  };

  /**
   * Promotes problem status to PUBLISHED (Admin-only).
   */
  public publish = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const problem = await this.problemService.publishProblem(id as string);
    res.status(200).json(ApiResponse.success(problem));
  };

  /**
   * Archives a problem (Admin-only).
   */
  public archive = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const problem = await this.problemService.archiveProblem(id as string);
    res.status(200).json(ApiResponse.success(problem));
  };

  /**
   * Restores a soft-deleted or archived problem (Admin-only).
   */
  public restore = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const problem = await this.problemService.restoreProblem(id as string);
    res.status(200).json(ApiResponse.success(problem));
  };

  /**
   * Retrieves a single problem by ID or unique slug (Public-facing, with visibility filtering).
   */
  public get = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { slug } = req.params;
    const userId = req.user?.id;
    const role = req.user?.role;

    // Detect if the param is a UUID or a slug string
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug as string);

    const problem = isUuid
      ? await this.problemService.getProblemById(slug as string, userId, role)
      : await this.problemService.getProblemBySlug(slug as string, userId, role);

    res.status(200).json(ApiResponse.success(problem));
  };

  /**
   * Lists problems with dynamic query filtering and offset pagination.
   */
  public list = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const role = req.user?.role;
    
    // Parse offset pagination parameters
    const pageParams = PaginationUtil.parse(req.query.page, req.query.limit);
    
    const [problems, totalCount] = await this.problemService.listProblems(
      req.query,
      { skip: pageParams.offset, take: pageParams.limit },
      userId,
      role
    );

    const meta = PaginationUtil.buildMetadata(totalCount, pageParams.page, pageParams.limit);
    res.status(200).json(ApiResponse.paginated(problems, meta));
  };
}
export default ProblemController;
