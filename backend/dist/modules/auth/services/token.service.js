"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("../../../config");
class TokenService {
    accessSecret = config_1.config.auth.jwtAccessSecret;
    refreshSecret = config_1.config.auth.jwtRefreshSecret;
    accessExpiry = config_1.config.auth.jwtAccessExpiry;
    refreshExpiry = config_1.config.auth.jwtRefreshExpiry;
    /**
     * Generates a signed stateless JWT Access Token.
     */
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessSecret, {
            algorithm: 'HS256',
            expiresIn: this.accessExpiry,
        });
    }
    /**
     * Decodes and validates a JWT Access Token.
     */
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.accessSecret);
    }
    /**
     * Generates a cryptographically secure random token string for session verification.
     */
    generateOpaqueToken() {
        return crypto_1.default.randomBytes(32).toString('hex');
    }
    /**
     * Hashes an opaque token using SHA-256 (pre-db insert/lookup storage helper).
     */
    hashOpaqueToken(token) {
        return crypto_1.default.createHash('sha256').update(token).digest('hex');
    }
    /**
     * Calculates the expiration DateTime for a refresh token (default 7 days).
     */
    getRefreshTokenExpiry() {
        const days = 7;
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + days);
        return expiry;
    }
    /**
     * Appends the refresh token cookie securely to the HTTP Express response.
     */
    setRefreshTokenCookie(res, token) {
        const isProd = config_1.config.app.env === 'production';
        res.cookie('refreshToken', token, {
            httpOnly: true,
            secure: isProd, // true in prod (requires HTTPS)
            sameSite: isProd ? 'none' : 'lax', // 'none' in prod to allow cross-site cookie transmission between Vercel and Render
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            path: '/api/v1/auth', // scope cookies specifically to auth handlers
        });
    }
    /**
     * Cleans/deletes the refresh token cookie from the client.
     */
    clearRefreshTokenCookie(res) {
        res.clearCookie('refreshToken', {
            path: '/api/v1/auth',
        });
    }
}
exports.TokenService = TokenService;
exports.default = TokenService;
