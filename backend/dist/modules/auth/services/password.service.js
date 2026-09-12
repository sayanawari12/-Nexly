"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordService = void 0;
const bcrypt_provider_1 = require("../providers/bcrypt.provider");
class PasswordService {
    hashProvider;
    constructor(hashProvider = new bcrypt_provider_1.BcryptProvider()) {
        this.hashProvider = hashProvider;
    }
    /**
     * Hashes a plaintext password string.
     */
    async hashPassword(password) {
        return this.hashProvider.hash(password);
    }
    /**
     * Compares a plaintext password with a database hash.
     */
    async comparePassword(password, hashed) {
        return this.hashProvider.compare(password, hashed);
    }
}
exports.PasswordService = PasswordService;
