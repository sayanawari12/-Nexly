"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenRepository = void 0;
const base_repository_1 = require("../../../repositories/base.repository");
class RefreshTokenRepository extends base_repository_1.BaseRepository {
    /**
     * Registers a new refresh token inside the database.
     */
    async create(data, tx) {
        return this.getClient(tx).refreshToken.create({ data });
    }
    /**
     * Finds an active refresh token by its hashed token value.
     */
    async findByToken(tokenHash, tx) {
        return this.getClient(tx).refreshToken.findUnique({
            where: { token: tokenHash },
        });
    }
    /**
     * Revokes a specific token by its unique ID.
     */
    async revokeToken(id, tx) {
        return this.getClient(tx).refreshToken.update({
            where: { id },
            data: { revoked: true },
        });
    }
    /**
     * Revokes an entire token family chain (used upon replay detection to log out all devices).
     */
    async revokeFamily(familyId, tx) {
        return this.getClient(tx).refreshToken.updateMany({
            where: { familyId },
            data: { revoked: true },
        });
    }
    /**
     * Revokes all active refresh tokens belonging to a specific user (global logout).
     */
    async revokeAllForUser(userId, tx) {
        return this.getClient(tx).refreshToken.updateMany({
            where: { userId, revoked: false },
            data: { revoked: true },
        });
    }
    /**
     * Purges expired or revoked tokens older than a specific date (used by cleanup cron jobs).
     */
    async purgeObsoleteTokens(olderThan, tx) {
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
exports.RefreshTokenRepository = RefreshTokenRepository;
