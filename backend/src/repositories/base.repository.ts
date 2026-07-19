import { Prisma } from '@prisma/client';
import { prisma } from '../config/database';

export abstract class BaseRepository {
  /**
   * Retrieves the appropriate Prisma database client connection.
   * If a transaction client (tx) is injected, it routes all queries through 
   * the active transaction boundaries. Otherwise, it defaults to the standard client.
   * 
   * @param tx Optional Prisma transaction client instance
   */
  protected getClient(tx?: Prisma.TransactionClient): Prisma.TransactionClient {
    return tx || prisma;
  }
}

export default BaseRepository;
