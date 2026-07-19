import { Prisma, User } from '@prisma/client';
import { BaseRepository } from '../../../repositories/base.repository';

export class UserRepository extends BaseRepository {
  /**
   * Creates a new user record.
   */
  public async create(data: Prisma.UserCreateInput, tx?: Prisma.TransactionClient): Promise<User> {
    return this.getClient(tx).user.create({ data });
  }

  /**
   * Finds a user by their unique primary key ID.
   */
  public async findById(id: string, tx?: Prisma.TransactionClient): Promise<User | null> {
    return this.getClient(tx).user.findUnique({ where: { id } });
  }

  /**
   * Finds a user by their unique email.
   */
  public async findByEmail(email: string, tx?: Prisma.TransactionClient): Promise<User | null> {
    return this.getClient(tx).user.findUnique({ where: { email } });
  }

  /**
   * Finds a user by their unique username.
   */
  public async findByUsername(username: string, tx?: Prisma.TransactionClient): Promise<User | null> {
    return this.getClient(tx).user.findUnique({ where: { username } });
  }

  /**
   * Finds a user by email or username (used for login credentials checks).
   */
  public async findByEmailOrUsername(identifier: string, tx?: Prisma.TransactionClient): Promise<User | null> {
    return this.getClient(tx).user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });
  }
}
