import { Request, Response } from 'express';
import { TestCaseService } from './services/testcase.service';
import { ApiResponse } from '../../utils/response';
import { AuthenticatedRequest } from '../auth/middleware/auth.middleware';

export class TestCaseController {
  private readonly testCaseService: TestCaseService;

  constructor(testCaseService = new TestCaseService()) {
    this.testCaseService = testCaseService;
  }

  /**
   * Registers a single test case for a problem (Admin-only).
   */
  public create = async (req: Request, res: Response): Promise<void> => {
    const { problemId } = req.params;
    const testCase = await this.testCaseService.createTestCase(problemId as string, req.body);
    res.status(201).json(ApiResponse.success(testCase));
  };

  /**
   * Updates an existing test case specifications (Admin-only).
   */
  public update = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const testCase = await this.testCaseService.updateTestCase(id as string, req.body);
    res.status(200).json(ApiResponse.success(testCase));
  };

  /**
   * Deletes a test case record (Admin-only).
   */
  public delete = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    await this.testCaseService.deleteTestCase(id as string);
    res.status(200).json(ApiResponse.success({ message: 'TestCase deleted successfully.' }));
  };

  /**
   * Overwrites/syncs a batch array of test cases inside a transaction (Admin-only).
   */
  public batchImport = async (req: Request, res: Response): Promise<void> => {
    const { problemId } = req.params;
    const { testCases } = req.body;
    await this.testCaseService.batchImportTestCases(problemId as string, testCases);
    res.status(200).json(ApiResponse.success({ message: 'Batch testcases synchronized successfully.' }));
  };

  /**
   * Lists testcases for a problem.
   * If USER request context, strictly hides non-sample validation tests.
   */
  public list = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { problemId } = req.params;
    const userId = req.user?.id;
    const role = req.user?.role;

    const testCases = await this.testCaseService.getTestCases(problemId as string, userId, role);
    res.status(200).json(ApiResponse.success(testCases));
  };
}
export default TestCaseController;
