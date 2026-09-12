"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const base_repository_1 = require("../../../repositories/base.repository");
class UserRepository extends base_repository_1.BaseRepository {
    /**
     * Creates a new user record.
     */
    async create(data, tx) {
        return this.getClient(tx).user.create({ data });
    }
    /**
     * Finds a user by their unique primary key ID.
     */
    async findById(id, tx) {
        return this.getClient(tx).user.findUnique({ where: { id } });
    }
    /**
     * Finds a user by their unique email.
     */
    async findByEmail(email, tx) {
        return this.getClient(tx).user.findUnique({ where: { email } });
    }
    /**
     * Finds a user by their unique username.
     */
    async findByUsername(username, tx) {
        return this.getClient(tx).user.findUnique({ where: { username } });
    }
    /**
     * Finds a user by email or username (used for login credentials checks).
     */
    async findByEmailOrUsername(identifier, tx) {
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
exports.UserRepository = UserRepository;
