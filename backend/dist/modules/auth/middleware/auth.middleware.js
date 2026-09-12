"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.optionalAuth = exports.requireAuth = void 0;
const token_service_1 = require("../services/token.service");
const errors_1 = require("../../../errors");
const context_1 = require("../../../utils/context");
const tokenService = new token_service_1.TokenService();
/**
 * Middleware that guards endpoints requiring user authentication.
 * Intercepts Bearer tokens inside headers and validates claims.
 */
const requireAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next(new errors_1.UnauthorizedError('Access token is missing or invalid.'));
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = tokenService.verifyAccessToken(token);
        // Propagate variables to AsyncLocalStorage request context store
        context_1.RequestContext.set('userId', decoded.sub);
        context_1.RequestContext.set('role', decoded.role);
        req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        };
        next();
    }
    catch (err) {
        next(new errors_1.UnauthorizedError('Access token is expired or invalid.'));
    }
};
exports.requireAuth = requireAuth;
/**
 * Middleware that parses authentication headers optionally without throwing on failure.
 * Allows anonymous requests but binds user context if token is present.
 */
const optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        next();
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = tokenService.verifyAccessToken(token);
        context_1.RequestContext.set('userId', decoded.sub);
        context_1.RequestContext.set('role', decoded.role);
        req.user = {
            id: decoded.sub,
            email: decoded.email,
            role: decoded.role,
        };
    }
    catch (err) {
        // Fail silently to support anonymous reads
    }
    next();
};
exports.optionalAuth = optionalAuth;
/**
 * Middleware that guards endpoints restricting access based on user RBAC roles.
 */
const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            next(new errors_1.UnauthorizedError('Authentication required.'));
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            next(new errors_1.ForbiddenError('You do not have permission to access this resource.'));
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
