import { Prisma, RefreshToken } from '@prisma/client';
import { BaseRepository } from '../../../repositories/base.repository';

export class RefreshTokenRepository extends BaseRepository {
  /**
   * Registers a new refresh token inside the database.
   */
  public async create(data: Prisma.RefreshTokenUncheckedCreateInput, tx?: Prisma.TransactionClient): Promise<RefreshToken> {
    return this.getClient(tx).refreshToken.create({ data });
  }

  /**
   * Finds an active refresh token by its hashed token value.
   */
  public async findByToken(tokenHash: string, tx?: Prisma.TransactionClient): Promise<RefreshToken | null> {
    return this.getClient(tx).refreshToken.findUnique({
      where: { token: tokenHash },
    });
  }

  /**
   * Revokes a specific token by its unique ID.
   */
  public async revokeToken(id: string, tx?: Prisma.TransactionClient): Promise<RefreshToken> {
    return this.getClient(tx).refreshToken.update({
      where: { id },
      data: { revoked: true },
    });
  }

  /**
   * Revokes an entire token family chain (used upon replay detection to log out all devices).
   */
  public async revokeFamily(familyId: string, tx?: Prisma.TransactionClient): Promise<Prisma.BatchPayload> {
    return this.getClient(tx).refreshToken.updateMany({
      where: { familyId },
      data: { revoked: true },
    });
  }

  /**
   * Revokes all active refresh tokens belonging to a specific user (global logout).
   */
  public async revokeAllForUser(userId: string, tx?: Prisma.TransactionClient): Promise<Prisma.BatchPayload> {
    return this.getClient(tx).refreshToken.updateMany({
      where: { userId, revoked: false },
      data: { revoked: true },
    });
  }

  /**
   * Purges expired or revoked tokens older than a specific date (used by cleanup cron jobs).
   */
  public async purgeObsoleteTokens(olderThan: Date, tx?: Prisma.TransactionClient): Promise<Prisma.BatchPayload> {
    return this.getClient(tx).refreshToken.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } }, // already expired
          { AND: [{ revoked: true }, { createdAt: { lt: olderThan } }] }, // revoked and old
        ],
      },
    });
  }
}
