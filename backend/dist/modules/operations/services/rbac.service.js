"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RbacService = void 0;
const client_1 = require("@prisma/client");
const operations_repository_1 = require("../repositories/operations.repository");
const errors_1 = require("../../../errors");
class RbacService {
    repo;
    constructor(repo = new operations_repository_1.OperationsRepository()) {
        this.repo = repo;
    }
    /**
     * Resolves if a role has the target permission, factoring in role inheritance trees
     */
    async roleHasPermission(role, permissionName) {
        // 1. Super Admin possesses absolute platform clearance
        if (role === client_1.Role.SUPER_ADMIN)
            return true;
        // 2. Fetch specific database-mapped permissions for role
        const permissions = await this.repo.getPermissionsForRole(role);
        if (permissions.includes(permissionName))
            return true;
        // 3. Fallback to inheritance rules
        // Platform Admin inherits Moderator & Contest Manager rights
        if (role === client_1.Role.PLATFORM_ADMIN) {
            const inherits = ['contests:read', 'contests:clone', 'problems:read', 'problems:moderate', 'users:view'];
            if (inherits.includes(permissionName))
                return true;
        }
        // Moderator inherits Support Staff read details
        if (role === client_1.Role.MODERATOR) {
            const inherits = ['users:view', 'reports:view', 'submissions:view'];
            if (inherits.includes(permissionName))
                return true;
        }
        return false;
    }
    /**
     * Express middleware interceptor governing RBAC permission checks
     */
    requirePermission(permissionName) {
        return async (req, res, next) => {
            if (!req.user) {
                next(new errors_1.UnauthorizedError('Identity context not resolved.'));
                return;
            }
            const role = req.user.role;
            const authorized = await this.roleHasPermission(role, permissionName);
            if (!authorized) {
                next(new errors_1.ForbiddenError(`Access denied: Missing permission '${permissionName}'`));
                return;
            }
            next();
        };
    }
}
exports.RbacService = RbacService;
exports.default = RbacService;
