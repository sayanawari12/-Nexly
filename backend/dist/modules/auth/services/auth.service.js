"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const uuid_1 = require("uuid");
const user_repository_1 = require("../repositories/user.repository");
const refresh_token_repository_1 = require("../repositories/refresh-token.repository");
const password_service_1 = require("./password.service");
const token_service_1 = require("./token.service");
const errors_1 = require("../../../errors");
const logger_1 = require("../../../utils/logger");
class AuthService {
    userRepo;
    tokenRepo;
    passwordService;
    tokenService;
    constructor(userRepo = new user_repository_1.UserRepository(), tokenRepo = new refresh_token_repository_1.RefreshTokenRepository(), passwordService = new password_service_1.PasswordService(), tokenService = new token_service_1.TokenService()) {
        this.userRepo = userRepo;
        this.tokenRepo = tokenRepo;
        this.passwordService = passwordService;
        this.tokenService = tokenService;
    }
    /**
     * Registers a new user.
     */
    async register(email, username, password) {
        // Check conflicts
        const existingEmail = await this.userRepo.findByEmail(email);
        if (existingEmail) {
            logger_1.logger.warn({ message: 'Register failure: Email already exists', email });
            throw new errors_1.ConflictError('Email is already registered.');
        }
        const existingUsername = await this.userRepo.findByUsername(username);
        if (existingUsername) {
            logger_1.logger.warn({ message: 'Register failure: Username already taken', username });
            throw new errors_1.ConflictError('Username is already taken.');
        }
        const passwordHash = await this.passwordService.hashPassword(password);
        const user = await this.userRepo.create({
            email,
            username,
            passwordHash,
            role: 'USER',
        });
        logger_1.logger.info({ message: 'User registered successfully', userId: user.id, username });
        const { passwordHash: _, ...sanitizedUser } = user;
        return sanitizedUser;
    }
    /**
     * Performs credential verification and generates access and refresh tokens.
     */
    async login(identifier, password, ipAddress, userAgent) {
        const user = await this.userRepo.findByEmailOrUsername(identifier);
        // Constant-time check simulation: compare password anyway if user not found
        const passwordHash = user ? user.passwordHash : '$2b$10$invalidPasswordHashPlaceholderForTimingEnforcements';
        const isPasswordValid = await this.passwordService.comparePassword(password, passwordHash);
        if (!user || !isPasswordValid) {
            logger_1.logger.warn({ message: 'Auth failure: Invalid credentials identifier', identifier, ipAddress });
            throw new errors_1.UnauthorizedError('Invalid email/username or password.');
        }
        // Generate tokens
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = this.tokenService.generateAccessToken(payload);
        const rawRefreshToken = this.tokenService.generateOpaqueToken();
        const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
        const expiresAt = this.tokenService.getRefreshTokenExpiry();
        const familyId = (0, uuid_1.v4)(); // Start a new refresh token family
        // Persist hashed token in database
        await this.tokenRepo.create({
            token: tokenHash,
            userId: user.id,
            familyId,
            expiresAt,
            ipAddress,
            userAgent,
        });
        logger_1.logger.info({ message: 'User logged in successfully', userId: user.id, familyId });
        const { passwordHash: _, ...sanitizedUser } = user;
        return {
            accessToken,
            refreshToken: rawRefreshToken,
            user: sanitizedUser,
        };
    }
    /**
     * Refreshes access and refresh tokens using Refresh Token Rotation (RTR).
     */
    async refresh(rawRefreshToken, ipAddress, userAgent) {
        const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
        const tokenRecord = await this.tokenRepo.findByToken(tokenHash);
        if (!tokenRecord) {
            logger_1.logger.warn({ message: 'Auth refresh failure: Token hash not found', ipAddress });
            throw new errors_1.UnauthorizedError('Invalid or expired refresh token.');
        }
        const { id, userId, familyId, expiresAt, revoked } = tokenRecord;
        // 1. REPLAY DETECTION: Check if token has already been revoked
        if (revoked) {
            logger_1.logger.fatal({
                message: 'CRITICAL SECURITY BREACH: Refresh token reuse detected!',
                userId,
                familyId,
                ipAddress,
                userAgent,
            });
            // Revoke all tokens in family to terminate active intruder/victim sessions
            await this.tokenRepo.revokeFamily(familyId);
            throw new errors_1.UnauthorizedError('Security warning: Session invalidated due to reuse detection.');
        }
        // 2. Expiration check
        if (new Date() > expiresAt) {
            logger_1.logger.warn({ message: 'Auth refresh failure: Token expired', userId, familyId });
            throw new errors_1.UnauthorizedError('Refresh token expired. Please login again.');
        }
        // 3. Perform Token Rotation (RTR)
        // Revoke old token
        await this.tokenRepo.revokeToken(id);
        // Fetch user details for claims
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new errors_1.NotFoundError('User associated with session not found.');
        }
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const newAccessToken = this.tokenService.generateAccessToken(payload);
        const newRawRefreshToken = this.tokenService.generateOpaqueToken();
        const newHash = this.tokenService.hashOpaqueToken(newRawRefreshToken);
        const newExpiresAt = this.tokenService.getRefreshTokenExpiry();
        // Register new token under the same familyId with parent trace
        await this.tokenRepo.create({
            token: newHash,
            userId,
            familyId,
            parentToken: tokenHash,
            expiresAt: newExpiresAt,
            ipAddress,
            userAgent,
        });
        logger_1.logger.info({ message: 'Refresh token rotated successfully', userId, familyId });
        return {
            accessToken: newAccessToken,
            refreshToken: newRawRefreshToken,
        };
    }
    /**
     * Revokes the current session refresh token.
     */
    async logout(rawRefreshToken) {
        const tokenHash = this.tokenService.hashOpaqueToken(rawRefreshToken);
        const tokenRecord = await this.tokenRepo.findByToken(tokenHash);
        if (tokenRecord) {
            await this.tokenRepo.revokeToken(tokenRecord.id);
            logger_1.logger.info({ message: 'Session logged out successfully', userId: tokenRecord.userId, tokenId: tokenRecord.id });
        }
    }
    /**
     * Global logout: Revokes all active refresh tokens/sessions associated with the user ID.
     */
    async logoutAll(userId) {
        await this.tokenRepo.revokeAllForUser(userId);
        logger_1.logger.info({ message: 'Global logout successfully executed', userId });
    }
    /**
     * Retrieves the current user details.
     */
    async getCurrentUser(userId) {
        const user = await this.userRepo.findById(userId);
        if (!user) {
            throw new errors_1.NotFoundError('User profile not found.');
        }
        const { passwordHash: _, ...sanitizedUser } = user;
        return sanitizedUser;
    }
}
exports.AuthService = AuthService;
exports.default = AuthService;
