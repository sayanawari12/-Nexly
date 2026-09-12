"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./services/auth.service");
const token_service_1 = require("./services/token.service");
const firebase_auth_service_1 = require("./services/firebase-auth.service");
const response_1 = require("../../utils/response");
const errors_1 = require("../../errors");
class AuthController {
    authService;
    tokenService;
    firebaseService;
    constructor(authService = new auth_service_1.AuthService(), tokenService = new token_service_1.TokenService(), firebaseService = new firebase_auth_service_1.FirebaseAuthService()) {
        this.authService = authService;
        this.tokenService = tokenService;
        this.firebaseService = firebaseService;
    }
    /**
     * Registers a new user.
     */
    register = async (req, res) => {
        const { email, username, password } = req.body;
        const sanitizedUser = await this.authService.register(email, username, password);
        res.status(201).json(response_1.ApiResponse.success(sanitizedUser));
    };
    /**
     * Performs user credential verification and registers session cookies.
     */
    login = async (req, res) => {
        const { identifier, password } = req.body;
        const ipAddress = req.ip || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const session = await this.authService.login(identifier, password, ipAddress, userAgent);
        // Bind token into secure HTTPOnly cookie
        this.tokenService.setRefreshTokenCookie(res, session.refreshToken);
        res.status(200).json(response_1.ApiResponse.success({
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            user: session.user,
        }));
    };
    /**
     * Executes token rotation and sets new access/refresh credentials.
     */
    refresh = async (req, res) => {
        // Attempt parsing from cookie first, fallback to payload body
        const token = req.cookies.refreshToken || req.body.refreshToken;
        const ipAddress = req.ip || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        if (!token) {
            throw new errors_1.UnauthorizedError('Session validation credentials are missing.');
        }
        const credentials = await this.authService.refresh(token, ipAddress, userAgent);
        // Bind rotated token
        this.tokenService.setRefreshTokenCookie(res, credentials.refreshToken);
        res.status(200).json(response_1.ApiResponse.success({
            accessToken: credentials.accessToken,
        }));
    };
    /**
     * Revokes the current session and clears authorization cookies.
     */
    logout = async (req, res) => {
        const token = req.cookies.refreshToken || req.body.refreshToken;
        if (token) {
            await this.authService.logout(token);
        }
        // Always clean cookies on logout triggers
        this.tokenService.clearRefreshTokenCookie(res);
        res.status(200).json(response_1.ApiResponse.success({ message: 'Session logged out successfully.' }));
    };
    /**
     * Retrieves details for the currently active user profile.
     */
    getMe = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const user = await this.authService.getCurrentUser(req.user.id);
        res.status(200).json(response_1.ApiResponse.success(user));
    };
    /**
     * Exchanges Firebase token for local JWT access and refresh tokens.
     */
    firebaseExchange = async (req, res) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.UnauthorizedError('Authorization header is missing or malformed.');
        }
        const idToken = authHeader.split(' ')[1];
        const ipAddress = req.ip || req.socket.remoteAddress;
        const userAgent = req.headers['user-agent'];
        const session = await this.firebaseService.exchangeFirebaseToken(idToken, ipAddress, userAgent);
        // Bind token into secure HTTPOnly cookie
        this.tokenService.setRefreshTokenCookie(res, session.refreshToken);
        res.status(200).json(response_1.ApiResponse.success({
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
            user: session.user,
        }));
    };
}
exports.AuthController = AuthController;
exports.default = AuthController;
