import { Problem, ProblemStatus, ProblemVisibility } from '@prisma/client';
import { ProblemRepository } from '../repositories/problem.repository';
import { TestCaseRepository } from '../repositories/testcase.repository';
import { Helpers } from '../../../utils/helpers';
import { NotFoundError, UnauthorizedError, ValidationError } from '../../../errors';
import { logger } from '../../../utils/logger';

export class ProblemService {
  private readonly problemRepo: ProblemRepository;
  private readonly testCaseRepo: TestCaseRepository;

  constructor(
    problemRepo = new ProblemRepository(),
    testCaseRepo = new TestCaseRepository()
  ) {
    this.problemRepo = problemRepo;
    this.testCaseRepo = testCaseRepo;
  }

  /**
   * Registers a new problem, creating a unique slug and setting status as DRAFT.
   */
  public async createProblem(data: any, authorId: string): Promise<Problem> {
    let baseSlug = Helpers.slugify(data.title);
    let slug = baseSlug;
    let suffix = 1;

    // Resolve slug conflicts
    while (true) {
      const existing = await this.problemRepo.findBySlug(slug);
      if (!existing) break;
      slug = `${baseSlug}-${suffix++}`;
    }

    const problem = await this.problemRepo.create({
      ...data,
      slug,
      status: ProblemStatus.DRAFT,
      authorId,
    });

    logger.info({ message: 'Problem created as draft', problemId: problem.id, slug, authorId });
    return problem;
  }

  /**
   * Updates an existing problem. Enforces slug immutability on published problems.
   */
  public async updateProblem(id: string, data: any, editorId: string): Promise<Problem> {
    const problem = await this.problemRepo.findById(id);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    // Slug immutability once published
    if (problem.status === ProblemStatus.PUBLISHED && data.title && Helpers.slugify(data.title) !== problem.slug) {
      throw new ValidationError('The slug of a published problem is immutable.');
    }

    const updated = await this.problemRepo.update(id, {
      ...data,
      lastEditorId: editorId,
    });

    logger.info({ message: 'Problem updated successfully', problemId: id, editorId });
    return updated;
  }

  /**
   * Soft deletes a problem.
   */
  public async deleteProblem(id: string): Promise<void> {
    const problem = await this.problemRepo.findById(id);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    await this.problemRepo.update(id, { isDeleted: true });
    logger.info({ message: 'Problem soft-deleted', problemId: id });
  }

  /**
   * Promotes problem status to PUBLISHED.
   * Mandates that the problem has at least 1 sample case and 1 hidden case.
   */
  public async publishProblem(id: string): Promise<Problem> {
    const problem = await this.problemRepo.findById(id);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    // Enforce test case existence before publishing
    const testCases = await this.testCaseRepo.findManyByProblemId(id);
    const hasSample = testCases.some((t) => t.isSample);
    const hasHidden = testCases.some((t) => !t.isSample);

    if (!hasSample || !hasHidden) {
      throw new ValidationError('A problem must have at least one sample test case and one hidden test case before publishing.');
    }

    const updated = await this.problemRepo.update(id, {
      status: ProblemStatus.PUBLISHED,
    });

    logger.info({ message: 'Problem status promoted to PUBLISHED', problemId: id });
    return updated;
  }

  /**
   * Archives a problem.
   */
  public async archiveProblem(id: string): Promise<Problem> {
    const problem = await this.problemRepo.findById(id);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    const updated = await this.problemRepo.update(id, {
      status: ProblemStatus.ARCHIVED,
    });

    logger.info({ message: 'Problem archived', problemId: id });
    return updated;
  }

  /**
   * Restores a soft-deleted or archived problem back to DRAFT.
   */
  public async restoreProblem(id: string): Promise<Problem> {
    const problem = await this.problemRepo.findById(id);
    if (!problem) {
      throw new NotFoundError('Problem not found.');
    }

    const updated = await this.problemRepo.update(id, {
      isDeleted: false,
      status: ProblemStatus.DRAFT,
    });

    logger.info({ message: 'Problem restored to DRAFT status', problemId: id });
    return updated;
  }

  /**
   * Resolves query access checks and retrieves a problem.
   */
  public async getProblemById(id: string, userId?: string, role?: string): Promise<Problem> {
    const problem = await this.problemRepo.findById(id);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    this.checkVisibility(problem, userId, role);
    return problem;
  }

  /**
   * Resolves query access checks and retrieves a problem by its slug.
   */
  public async getProblemBySlug(slug: string, userId?: string, role?: string): Promise<Problem> {
    const problem = await this.problemRepo.findBySlug(slug);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    this.checkVisibility(problem, userId, role);
    return problem;
  }

  /**
   * Lists problems filtering by author, difficulty, tags, and status.
   */
  public async listProblems(
    queryParams: any,
    pageParams: { skip: number; take: number },
    userId?: string,
    role?: string
  ): Promise<[Problem[], number]> {
    const isAdmin = role === 'ADMIN';

    // Users can only view public published problems
    const status = isAdmin && queryParams.status ? queryParams.status : ProblemStatus.PUBLISHED;
    const visibility = isAdmin && queryParams.visibility ? queryParams.visibility : ProblemVisibility.PUBLIC;

    const findParams = {
      search: queryParams.search,
      difficulty: queryParams.difficulty,
      tag: queryParams.tag,
      status,
      visibility,
      authorId: queryParams.authorId,
      skip: pageParams.skip,
      take: pageParams.take,
      sortBy: queryParams.sortBy,
      sortOrder: queryParams.sortOrder,
    };

    return this.problemRepo.findManyAndCount(findParams);
  }

  /**
   * Security guard validating read permissions on drafts/private problems.
   */
  private checkVisibility(problem: Problem, userId?: string, role?: string): void {
    const isAdmin = role === 'ADMIN';
    const isAuthor = userId && problem.authorId === userId;

    if (problem.status !== ProblemStatus.PUBLISHED || problem.visibility !== ProblemVisibility.PUBLIC) {
      if (!isAdmin && !isAuthor) {
        throw new UnauthorizedError('You do not have permission to view this problem.');
      }
    }
  }
}
export default ProblemService;
