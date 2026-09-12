"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionController = void 0;
const submission_service_1 = require("../services/submission.service");
const response_1 = require("../../../utils/response");
const pagination_1 = require("../../../utils/pagination");
const errors_1 = require("../../../errors");
const database_1 = require("../../../config/database");
class SubmissionController {
    submissionService;
    constructor(submissionService = new submission_service_1.SubmissionService()) {
        this.submissionService = submissionService;
    }
    /**
     * Submits code for asynchronous execution (returns 202 Accepted).
     */
    create = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const { problemId, languageId, sourceCode, contestId } = req.body;
        const submission = await this.submissionService.createSubmission(req.user.id, problemId, languageId, sourceCode, contestId);
        // Return 202 Accepted for background execution
        res.status(202).json(response_1.ApiResponse.success(submission));
    };
    /**
     * Retrieves full details of a submission.
     */
    get = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const { id } = req.params;
        const submission = await this.submissionService.getSubmissionById(id, req.user.id, req.user.role);
        res.status(200).json(response_1.ApiResponse.success(submission));
    };
    /**
     * Endpoint specifically for polling status updates.
     */
    status = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const { id } = req.params;
        const submission = await this.submissionService.getSubmissionById(id, req.user.id, req.user.role);
        // Respond only with status and execution statistics
        res.status(200).json(response_1.ApiResponse.success({
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
    list = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const pageParams = pagination_1.PaginationUtil.parse(req.query.page, req.query.limit);
        const [submissions, totalCount] = await this.submissionService.listSubmissions(req.user.id, pageParams.offset, pageParams.limit);
        const meta = pagination_1.PaginationUtil.buildMetadata(totalCount, pageParams.page, pageParams.limit);
        res.status(200).json(response_1.ApiResponse.paginated(submissions, meta));
    };
    /**
     * Lists all active/supported compilers from the database.
     */
    listLanguages = async (req, res) => {
        const languages = await database_1.prisma.language.findMany({
            where: { isActive: true },
            orderBy: { displayName: 'asc' },
        });
        res.status(200).json(response_1.ApiResponse.success(languages));
    };
}
exports.SubmissionController = SubmissionController;
exports.default = SubmissionController;
