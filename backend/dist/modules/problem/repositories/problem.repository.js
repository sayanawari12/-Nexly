"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemRepository = void 0;
const base_repository_1 = require("../../../repositories/base.repository");
class ProblemRepository extends base_repository_1.BaseRepository {
    /**
     * Registers a new problem record in the database.
     */
    async create(data, tx) {
        return this.getClient(tx).problem.create({ data });
    }
    /**
     * Updates an existing problem record.
     */
    async update(id, data, tx) {
        return this.getClient(tx).problem.update({
            where: { id },
            data,
        });
    }
    /**
     * Fetches a problem record by its primary key UUID.
     */
    async findById(id, tx) {
        return this.getClient(tx).problem.findUnique({
            where: { id },
        });
    }
    /**
     * Fetches a problem record by its unique URL slug.
     */
    async findBySlug(slug, tx) {
        return this.getClient(tx).problem.findUnique({
            where: { slug },
        });
    }
    /**
     * Lists problems based on dynamic filters and performs search.
     * Returns a tuple [records, totalCount].
     */
    async findManyAndCount(params, tx) {
        const { search, difficulty, status, visibility, authorId, tag, skip, take, sortBy = 'createdAt', sortOrder = 'desc', } = params;
        // Build the query where clause
        const where = {
            isDeleted: false,
            ...(difficulty && { difficulty }),
            ...(status && { status }),
            ...(visibility && { visibility }),
            ...(authorId && { authorId }),
            ...(tag && {
                tags: {
                    has: tag,
                },
            }),
            ...(search && {
                OR: [
                    { title: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ],
            }),
        };
        const client = this.getClient(tx);
        const [problems, count] = await Promise.all([
            client.problem.findMany({
                where,
                skip,
                take,
                orderBy: {
                    [sortBy]: sortOrder,
                },
            }),
            client.problem.count({ where }),
        ]);
        return [problems, count];
    }
}
exports.ProblemRepository = ProblemRepository;
exports.default = ProblemRepository;
