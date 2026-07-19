import { Prisma, Submission } from '@prisma/client';
import { BaseRepository } from '../../../repositories/base.repository';

export class SubmissionRepository extends BaseRepository {
  /**
   * Registers a new user code submission record.
   */
  public async create(
    data: Prisma.SubmissionUncheckedCreateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Submission> {
    return this.getClient(tx).submission.create({ data });
  }

  /**
   * Updates an existing submission record with status or sandbox execution values.
   */
  public async update(
    id: string,
    data: Prisma.SubmissionUncheckedUpdateInput,
    tx?: Prisma.TransactionClient
  ): Promise<Submission> {
    return this.getClient(tx).submission.update({
      where: { id },
      data,
    });
  }

  /**
   * Fetches a submission record by its unique ID.
   */
  public async findById(id: string, tx?: Prisma.TransactionClient): Promise<Submission | null> {
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
  public async findManyByUserId(
    userId: string,
    skip: number,
    take: number,
    tx?: Prisma.TransactionClient
  ): Promise<[Submission[], number]> {
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
export default SubmissionRepository;
