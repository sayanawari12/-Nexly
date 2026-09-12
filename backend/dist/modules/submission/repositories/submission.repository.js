"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRepository = void 0;
const base_repository_1 = require("../../../repositories/base.repository");
class SubmissionRepository extends base_repository_1.BaseRepository {
    /**
     * Registers a new user code submission record.
     */
    async create(data, tx) {
        return this.getClient(tx).submission.create({ data });
    }
    /**
     * Updates an existing submission record with status or sandbox execution values.
     */
    async update(id, data, tx) {
        return this.getClient(tx).submission.update({
            where: { id },
            data,
        });
    }
    /**
     * Fetches a submission record by its unique ID.
     */
    async findById(id, tx) {
        return this.getClient(tx).submission.findUnique({
            where: { id },
            include: {
                language: true,
                problem: true,
            },
        });
    }
    /**
     * Retrieves paginated list of submissions for a user.
     */
    async findManyByUserId(userId, skip, take, tx) {
        const client = this.getClient(tx);
        const where = { userId };
        const [submissions, count] = await Promise.all([
            client.submission.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    problem: {
                        select: {
                            title: true,
                            slug: true,
                        },
                    },
                    language: {
                        select: {
                            displayName: true,
                        },
                    },
                },
            }),
            client.submission.count({ where }),
        ]);
        return [submissions, count];
    }
}
exports.SubmissionRepository = SubmissionRepository;
exports.default = SubmissionRepository;
