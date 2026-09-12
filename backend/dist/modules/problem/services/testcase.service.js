"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseService = void 0;
const testcase_repository_1 = require("../repositories/testcase.repository");
const problem_repository_1 = require("../repositories/problem.repository");
const errors_1 = require("../../../errors");
const logger_1 = require("../../../utils/logger");
const database_1 = require("../../../config/database");
class TestCaseService {
    testCaseRepo;
    problemRepo;
    constructor(testCaseRepo = new testcase_repository_1.TestCaseRepository(), problemRepo = new problem_repository_1.ProblemRepository()) {
        this.testCaseRepo = testCaseRepo;
        this.problemRepo = problemRepo;
    }
    /**
     * Registers a single testcase for a problem.
     */
    async createTestCase(problemId, data) {
        const problem = await this.problemRepo.findById(problemId);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        const testCase = await this.testCaseRepo.create({
            ...data,
            problemId,
        });
        logger_1.logger.info({ message: 'TestCase created', testCaseId: testCase.id, problemId });
        return testCase;
    }
    /**
     * Updates an existing testcase.
     */
    async updateTestCase(id, data) {
        const testCase = await this.testCaseRepo.findById(id);
        if (!testCase) {
            throw new errors_1.NotFoundError('TestCase not found.');
        }
        const updated = await this.testCaseRepo.update(id, data);
        logger_1.logger.info({ message: 'TestCase updated', testCaseId: id });
        return updated;
    }
    /**
     * Deletes a testcase.
     */
    async deleteTestCase(id) {
        const testCase = await this.testCaseRepo.findById(id);
        if (!testCase) {
            throw new errors_1.NotFoundError('TestCase not found.');
        }
        await this.testCaseRepo.delete(id);
        logger_1.logger.info({ message: 'TestCase deleted', testCaseId: id });
    }
    /**
     * Overwrites/syncs a batch array of test cases inside a database transaction.
     */
    async batchImportTestCases(problemId, testCases) {
        const problem = await this.problemRepo.findById(problemId);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        // Execute atomic transaction: clear old testcases and import new batch
        await database_1.prisma.$transaction(async (tx) => {
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
        logger_1.logger.info({ message: 'Batch testcases imported successfully', problemId, count: testCases.length });
    }
    /**
     * Fetches testcases for a problem.
     * If USER, strictly filters to return only public sample testcases.
     */
    async getTestCases(problemId, userId, role) {
        const problem = await this.problemRepo.findById(problemId);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        const isAdmin = role === 'ADMIN';
        const isAuthor = userId && problem.authorId === userId;
        // Filter public samples if non-admin/non-author accesses
        const onlySample = !isAdmin && !isAuthor;
        return this.testCaseRepo.findManyByProblemId(problemId, onlySample);
    }
}
exports.TestCaseService = TestCaseService;
exports.default = TestCaseService;
