"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
const database_1 = require("../config/database");
class BaseRepository {
    /**
     * Retrieves the appropriate Prisma database client connection.
     * If a transaction client (tx) is injected, it routes all queries through
     * the active transaction boundaries. Otherwise, it defaults to the standard client.
     *
     * @param tx Optional Prisma transaction client instance
     */
    getClient(tx) {
        return tx || database_1.prisma;
    }
}
exports.BaseRepository = BaseRepository;
exports.default = BaseRepository;
