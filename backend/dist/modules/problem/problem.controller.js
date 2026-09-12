"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const problem_service_1 = require("./services/problem.service");
const response_1 = require("../../utils/response");
const pagination_1 = require("../../utils/pagination");
const errors_1 = require("../../errors");
class ProblemController {
    problemService;
    constructor(problemService = new problem_service_1.ProblemService()) {
        this.problemService = problemService;
    }
    /**
     * Creates a new problem draft (Admin-only).
     */
    create = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const problem = await this.problemService.createProblem(req.body, req.user.id);
        res.status(201).json(response_1.ApiResponse.success(problem));
    };
    /**
     * Updates an existing problem spec (Admin-only).
     */
    update = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const { id } = req.params;
        const problem = await this.problemService.updateProblem(id, req.body, req.user.id);
        res.status(200).json(response_1.ApiResponse.success(problem));
    };
    /**
     * Soft deletes a problem (Admin-only).
     */
    delete = async (req, res) => {
        const { id } = req.params;
        await this.problemService.deleteProblem(id);
        res.status(200).json(response_1.ApiResponse.success({ message: 'Problem deleted successfully.' }));
    };
    /**
     * Promotes problem status to PUBLISHED (Admin-only).
     */
    publish = async (req, res) => {
        const { id } = req.params;
        const problem = await this.problemService.publishProblem(id);
        res.status(200).json(response_1.ApiResponse.success(problem));
    };
    /**
     * Archives a problem (Admin-only).
     */
    archive = async (req, res) => {
        const { id } = req.params;
        const problem = await this.problemService.archiveProblem(id);
        res.status(200).json(response_1.ApiResponse.success(problem));
    };
    /**
     * Restores a soft-deleted or archived problem (Admin-only).
     */
    restore = async (req, res) => {
        const { id } = req.params;
        const problem = await this.problemService.restoreProblem(id);
        res.status(200).json(response_1.ApiResponse.success(problem));
    };
    /**
     * Retrieves a single problem by ID or unique slug (Public-facing, with visibility filtering).
     */
    get = async (req, res) => {
        const { slug } = req.params;
        const userId = req.user?.id;
        const role = req.user?.role;
        // Detect if the param is a UUID or a slug string
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(slug);
        const problem = isUuid
            ? await this.problemService.getProblemById(slug, userId, role)
            : await this.problemService.getProblemBySlug(slug, userId, role);
        res.status(200).json(response_1.ApiResponse.success(problem));
    };
    /**
     * Lists problems with dynamic query filtering and offset pagination.
     */
    list = async (req, res) => {
        const userId = req.user?.id;
        const role = req.user?.role;
        // Parse offset pagination parameters
        const pageParams = pagination_1.PaginationUtil.parse(req.query.page, req.query.limit);
        const [problems, totalCount] = await this.problemService.listProblems(req.query, { skip: pageParams.offset, take: pageParams.limit }, userId, role);
        const meta = pagination_1.PaginationUtil.buildMetadata(totalCount, pageParams.page, pageParams.limit);
        res.status(200).json(response_1.ApiResponse.paginated(problems, meta));
    };
}
exports.ProblemController = ProblemController;
exports.default = ProblemController;
