import { TestCase } from '@prisma/client';
import { TestCaseRepository } from '../repositories/testcase.repository';
import { ProblemRepository } from '../repositories/problem.repository';
import { NotFoundError, UnauthorizedError } from '../../../errors';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../config/database';

export class TestCaseService {
  private readonly testCaseRepo: TestCaseRepository;
  private readonly problemRepo: ProblemRepository;

  constructor(
    testCaseRepo = new TestCaseRepository(),
    problemRepo = new ProblemRepository()
  ) {
    this.testCaseRepo = testCaseRepo;
    this.problemRepo = problemRepo;
  }

  /**
   * Registers a single testcase for a problem.
   */
  public async createTestCase(problemId: string, data: any): Promise<TestCase> {
    const problem = await this.problemRepo.findById(problemId);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    const testCase = await this.testCaseRepo.create({
      ...data,
      problemId,
    });

    logger.info({ message: 'TestCase created', testCaseId: testCase.id, problemId });
    return testCase;
  }

  /**
   * Updates an existing testcase.
   */
  public async updateTestCase(id: string, data: any): Promise<TestCase> {
    const testCase = await this.testCaseRepo.findById(id);
    if (!testCase) {
      throw new NotFoundError('TestCase not found.');
    }

    const updated = await this.testCaseRepo.update(id, data);
    logger.info({ message: 'TestCase updated', testCaseId: id });
    return updated;
  }

  /**
   * Deletes a testcase.
   */
  public async deleteTestCase(id: string): Promise<void> {
    const testCase = await this.testCaseRepo.findById(id);
    if (!testCase) {
      throw new NotFoundError('TestCase not found.');
    }

    await this.testCaseRepo.delete(id);
    logger.info({ message: 'TestCase deleted', testCaseId: id });
  }

  /**
   * Overwrites/syncs a batch array of test cases inside a database transaction.
   */
  public async batchImportTestCases(problemId: string, testCases: any[]): Promise<void> {
    const problem = await this.problemRepo.findById(problemId);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    // Execute atomic transaction: clear old testcases and import new batch
    await prisma.$transaction(async (tx) => {
      // 1. Delete old test cases
      await tx.testCase.deleteMany({
        where: { problemId },
      });

      // 2. Insert new test cases
      if (testCases.length > 0) {
        const payload = testCases.map((tc, idx) => ({
          problemId,
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          isSample: tc.isSample ?? false,
          orderIndex: tc.orderIndex ?? idx,
        }));

        await tx.testCase.createMany({
          data: payload,
        });
      }
    });

    logger.info({ message: 'Batch testcases imported successfully', problemId, count: testCases.length });
  }

  /**
   * Fetches testcases for a problem.
   * If USER, strictly filters to return only public sample testcases.
   */
  public async getTestCases(problemId: string, userId?: string, role?: string): Promise<TestCase[]> {
    const problem = await this.problemRepo.findById(problemId);
    if (!problem || problem.isDeleted) {
      throw new NotFoundError('Problem not found.');
    }

    const isAdmin = role === 'ADMIN';
    const isAuthor = userId && problem.authorId === userId;

    // Filter public samples if non-admin/non-author accesses
    const onlySample = !isAdmin && !isAuthor;

    return this.testCaseRepo.findManyByProblemId(problemId, onlySample);
  }
}
export default TestCaseService;
