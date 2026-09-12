"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestCaseRepository = void 0;
const base_repository_1 = require("../../../repositories/base.repository");
class TestCaseRepository extends base_repository_1.BaseRepository {
    /**
     * Registers a new testcase record in the database.
     */
    async create(data, tx) {
        return this.getClient(tx).testCase.create({ data });
    }
    /**
     * Updates an existing testcase record.
     */
    async update(id, data, tx) {
        return this.getClient(tx).testCase.update({
            where: { id },
            data,
        });
    }
    /**
     * Deletes a specific testcase record by its primary key UUID.
     */
    async delete(id, tx) {
        return this.getClient(tx).testCase.delete({
            where: { id },
        });
    }
    /**
     * Fetches a testcase by its unique ID.
     */
    async findById(id, tx) {
        return this.getClient(tx).testCase.findUnique({
            where: { id },
        });
    }
    /**
     * Retrieves testcase lists belonging to a specific problem.
     * Can filter to return public sample testcases only, protecting hidden evaluators.
     */
    async findManyByProblemId(problemId, onlySample = false, tx) {
        return this.getClient(tx).testCase.findMany({
            where: {
                problemId,
                ...(onlySample && { isSample: true }),
            },
            orderBy: {
                orderIndex: 'asc',
            },
        });
    }
    /**
     * Atomic batch import of testcases inside database transactions.
     */
    async createMany(data, tx) {
        return this.getClient(tx).testCase.createMany({
            data,
        });
    }
}
exports.TestCaseRepository = TestCaseRepository;
exports.default = TestCaseRepository;
