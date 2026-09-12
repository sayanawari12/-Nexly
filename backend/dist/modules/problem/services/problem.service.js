"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemService = void 0;
const client_1 = require("@prisma/client");
const problem_repository_1 = require("../repositories/problem.repository");
const testcase_repository_1 = require("../repositories/testcase.repository");
const helpers_1 = require("../../../utils/helpers");
const errors_1 = require("../../../errors");
const logger_1 = require("../../../utils/logger");
class ProblemService {
    problemRepo;
    testCaseRepo;
    constructor(problemRepo = new problem_repository_1.ProblemRepository(), testCaseRepo = new testcase_repository_1.TestCaseRepository()) {
        this.problemRepo = problemRepo;
        this.testCaseRepo = testCaseRepo;
    }
    /**
     * Registers a new problem, creating a unique slug and setting status as DRAFT.
     */
    async createProblem(data, authorId) {
        let baseSlug = helpers_1.Helpers.slugify(data.title);
        let slug = baseSlug;
        let suffix = 1;
        // Resolve slug conflicts
        while (true) {
            const existing = await this.problemRepo.findBySlug(slug);
            if (!existing)
                break;
            slug = `${baseSlug}-${suffix++}`;
        }
        const problem = await this.problemRepo.create({
            ...data,
            slug,
            status: client_1.ProblemStatus.DRAFT,
            authorId,
        });
        logger_1.logger.info({ message: 'Problem created as draft', problemId: problem.id, slug, authorId });
        return problem;
    }
    /**
     * Updates an existing problem. Enforces slug immutability on published problems.
     */
    async updateProblem(id, data, editorId) {
        const problem = await this.problemRepo.findById(id);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        // Slug immutability once published
        if (problem.status === client_1.ProblemStatus.PUBLISHED && data.title && helpers_1.Helpers.slugify(data.title) !== problem.slug) {
            throw new errors_1.ValidationError('The slug of a published problem is immutable.');
        }
        const updated = await this.problemRepo.update(id, {
            ...data,
            lastEditorId: editorId,
        });
        logger_1.logger.info({ message: 'Problem updated successfully', problemId: id, editorId });
        return updated;
    }
    /**
     * Soft deletes a problem.
     */
    async deleteProblem(id) {
        const problem = await this.problemRepo.findById(id);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        await this.problemRepo.update(id, { isDeleted: true });
        logger_1.logger.info({ message: 'Problem soft-deleted', problemId: id });
    }
    /**
     * Promotes problem status to PUBLISHED.
     * Mandates that the problem has at least 1 sample case and 1 hidden case.
     */
    async publishProblem(id) {
        const problem = await this.problemRepo.findById(id);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        // Enforce test case existence before publishing
        const testCases = await this.testCaseRepo.findManyByProblemId(id);
        const hasSample = testCases.some((t) => t.isSample);
        const hasHidden = testCases.some((t) => !t.isSample);
        if (!hasSample || !hasHidden) {
            throw new errors_1.ValidationError('A problem must have at least one sample test case and one hidden test case before publishing.');
        }
        const updated = await this.problemRepo.update(id, {
            status: client_1.ProblemStatus.PUBLISHED,
        });
        logger_1.logger.info({ message: 'Problem status promoted to PUBLISHED', problemId: id });
        return updated;
    }
    /**
     * Archives a problem.
     */
    async archiveProblem(id) {
        const problem = await this.problemRepo.findById(id);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        const updated = await this.problemRepo.update(id, {
            status: client_1.ProblemStatus.ARCHIVED,
        });
        logger_1.logger.info({ message: 'Problem archived', problemId: id });
        return updated;
    }
    /**
     * Restores a soft-deleted or archived problem back to DRAFT.
     */
    async restoreProblem(id) {
        const problem = await this.problemRepo.findById(id);
        if (!problem) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        const updated = await this.problemRepo.update(id, {
            isDeleted: false,
            status: client_1.ProblemStatus.DRAFT,
        });
        logger_1.logger.info({ message: 'Problem restored to DRAFT status', problemId: id });
        return updated;
    }
    /**
     * Resolves query access checks and retrieves a problem.
     */
    async getProblemById(id, userId, role) {
        const problem = await this.problemRepo.findById(id);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        this.checkVisibility(problem, userId, role);
        return problem;
    }
    /**
     * Resolves query access checks and retrieves a problem by its slug.
     */
    async getProblemBySlug(slug, userId, role) {
        const problem = await this.problemRepo.findBySlug(slug);
        if (!problem || problem.isDeleted) {
            throw new errors_1.NotFoundError('Problem not found.');
        }
        this.checkVisibility(problem, userId, role);
        return problem;
    }
    /**
     * Lists problems filtering by author, difficulty, tags, and status.
     */
    async listProblems(queryParams, pageParams, userId, role) {
        const isAdmin = role === 'ADMIN';
        // Users can only view public published problems
        const status = isAdmin && queryParams.status ? queryParams.status : client_1.ProblemStatus.PUBLISHED;
        const visibility = isAdmin && queryParams.visibility ? queryParams.visibility : client_1.ProblemVisibility.PUBLIC;
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
    checkVisibility(problem, userId, role) {
        const isAdmin = role === 'ADMIN';
        const isAuthor = userId && problem.authorId === userId;
        if (problem.status !== client_1.ProblemStatus.PUBLISHED || problem.visibility !== client_1.ProblemVisibility.PUBLIC) {
            if (!isAdmin && !isAuthor) {
                throw new errors_1.UnauthorizedError('You do not have permission to view this problem.');
            }
        }
    }
}
exports.ProblemService = ProblemService;
exports.default = ProblemService;
