"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseController = void 0;
const testcase_service_1 = require("./services/testcase.service");
const response_1 = require("../../utils/response");
class TestCaseController {
    testCaseService;
    constructor(testCaseService = new testcase_service_1.TestCaseService()) {
        this.testCaseService = testCaseService;
    }
    /**
     * Registers a single test case for a problem (Admin-only).
     */
    create = async (req, res) => {
        const { problemId } = req.params;
        const testCase = await this.testCaseService.createTestCase(problemId, req.body);
        res.status(201).json(response_1.ApiResponse.success(testCase));
    };
    /**
     * Updates an existing test case specifications (Admin-only).
     */
    update = async (req, res) => {
        const { id } = req.params;
        const testCase = await this.testCaseService.updateTestCase(id, req.body);
        res.status(200).json(response_1.ApiResponse.success(testCase));
    };
    /**
     * Deletes a test case record (Admin-only).
     */
    delete = async (req, res) => {
        const { id } = req.params;
        await this.testCaseService.deleteTestCase(id);
        res.status(200).json(response_1.ApiResponse.success({ message: 'TestCase deleted successfully.' }));
    };
    /**
     * Overwrites/syncs a batch array of test cases inside a transaction (Admin-only).
     */
    batchImport = async (req, res) => {
        const { problemId } = req.params;
        const { testCases } = req.body;
        await this.testCaseService.batchImportTestCases(problemId, testCases);
        res.status(200).json(response_1.ApiResponse.success({ message: 'Batch testcases synchronized successfully.' }));
    };
    /**
     * Lists testcases for a problem.
     * If USER request context, strictly hides non-sample validation tests.
     */
    list = async (req, res) => {
        const { problemId } = req.params;
        const userId = req.user?.id;
        const role = req.user?.role;
        const testCases = await this.testCaseService.getTestCases(problemId, userId, role);
        res.status(200).json(response_1.ApiResponse.success(testCases));
    };
}
exports.TestCaseController = TestCaseController;
exports.default = TestCaseController;
