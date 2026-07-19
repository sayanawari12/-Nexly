import { Prisma, TestCase } from '@prisma/client';
import { BaseRepository } from '../../../repositories/base.repository';

export class TestCaseRepository extends BaseRepository {
  /**
   * Registers a new testcase record in the database.
   */
  public async create(data: Prisma.TestCaseUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<TestCase> {
    return this.getClient(tx).testCase.create({ data });
  }

  /**
   * Updates an existing testcase record.
   */
  public async update(
    id: string,
    data: Prisma.TestCaseUncheckedUpdateInput,
    tx?: Prisma.TransactionClient
  ): Promise<TestCase> {
    return this.getClient(tx).testCase.update({
      where: { id },
      data,
    });
  }

  /**
   * Deletes a specific testcase record by its primary key UUID.
   */
  public async delete(id: string, tx?: Prisma.TransactionClient): Promise<TestCase> {
    return this.getClient(tx).testCase.delete({
      where: { id },
    });
  }

  /**
   * Fetches a testcase by its unique ID.
   */
  public async findById(id: string, tx?: Prisma.TransactionClient): Promise<TestCase | null> {
    return this.getClient(tx).testCase.findUnique({
      where: { id },
    });
  }

  /**
   * Retrieves testcase lists belonging to a specific problem.
   * Can filter to return public sample testcases only, protecting hidden evaluators.
   */
  public async findManyByProblemId(
    problemId: string,
    onlySample = false,
    tx?: Prisma.TransactionClient
  ): Promise<TestCase[]> {
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
  public async createMany(
    data: Prisma.TestCaseCreateManyInput[],
    tx?: Prisma.TransactionClient
  ): Promise<Prisma.BatchPayload> {
    return this.getClient(tx).testCase.createMany({
      data,
    });
  }
}
export default TestCaseRepository;
