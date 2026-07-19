import { Prisma, Problem } from '@prisma/client';
import { BaseRepository } from '../../../repositories/base.repository';

export interface FindProblemsParams {
  search?: string;
  difficulty?: Prisma.EnumDifficultyFilter | any;
  status?: Prisma.EnumProblemStatusFilter | any;
  visibility?: Prisma.EnumProblemVisibilityFilter | any;
  authorId?: string;
  tag?: string;
  skip: number;
  take: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ProblemRepository extends BaseRepository {
  /**
   * Registers a new problem record in the database.
   */
  public async create(data: Prisma.ProblemUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<Problem> {
    return this.getClient(tx).problem.create({ data });
  }

  /**
   * Updates an existing problem record.
   */
  public async update(
    id: string,
    data: Prisma.ProblemUncheckedUpdateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Problem> {
    return this.getClient(tx).problem.update({
      where: { id },
      data,
    });
  }

  /**
   * Fetches a problem record by its primary key UUID.
   */
  public async findById(id: string, tx?: Prisma.TransactionClient): Promise<Problem | null> {
    return this.getClient(tx).problem.findUnique({
      where: { id },
    });
  }

  /**
   * Fetches a problem record by its unique URL slug.
   */
  public async findBySlug(slug: string, tx?: Prisma.TransactionClient): Promise<Problem | null> {
    return this.getClient(tx).problem.findUnique({
      where: { slug },
    });
  }

  /**
   * Lists problems based on dynamic filters and performs search.
   * Returns a tuple [records, totalCount].
   */
  public async findManyAndCount(
    params: FindProblemsParams,
    tx?: Prisma.TransactionClient
  ): Promise<[Problem[], number]> {
    const {
      search,
      difficulty,
      status,
      visibility,
      authorId,
      tag,
      skip,
      take,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = params;

    // Build the query where clause
    const where: Prisma.ProblemWhereInput = {
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
export default ProblemRepository;
