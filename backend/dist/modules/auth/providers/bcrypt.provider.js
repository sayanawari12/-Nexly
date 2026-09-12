"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptProvider = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptProvider {
    saltRounds = 10;
    async hash(payload) {
        return bcrypt_1.default.hash(payload, this.saltRounds);
    }
    async compare(payload, hashed) {
        return bcrypt_1.default.compare(payload, hashed);
    }
}
exports.BcryptProvider = BcryptProvider;
