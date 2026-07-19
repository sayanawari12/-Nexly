import { Response, NextFunction } from 'express';
import { Role } from '@prisma/client';
import { OperationsRepository } from '../repositories/operations.repository';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';
import { ForbiddenError, UnauthorizedError } from '../../../errors';

export class RbacService {
  private readonly repo: OperationsRepository;

  constructor(repo = new OperationsRepository()) {
    this.repo = repo;
  }

  /**
   * Resolves if a role has the target permission, factoring in role inheritance trees
   */
  public async roleHasPermission(role: Role, permissionName: string): Promise<boolean> {
    // 1. Super Admin possesses absolute platform clearance
    if (role === Role.SUPER_ADMIN) return true;

    // 2. Fetch specific database-mapped permissions for role
    const permissions = await this.repo.getPermissionsForRole(role);
    if (permissions.includes(permissionName)) return true;

    // 3. Fallback to inheritance rules
    // Platform Admin inherits Moderator & Contest Manager rights
    if (role === Role.PLATFORM_ADMIN) {
      const inherits = ['contests:read', 'contests:clone', 'problems:read', 'problems:moderate', 'users:view'];
      if (inherits.includes(permissionName)) return true;
    }

    // Moderator inherits Support Staff read details
    if (role === Role.MODERATOR) {
      const inherits = ['users:view', 'reports:view', 'submissions:view'];
      if (inherits.includes(permissionName)) return true;
    }

    return false;
  }

  /**
   * Express middleware interceptor governing RBAC permission checks
   */
  public requirePermission(permissionName: string) {
    return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
      if (!req.user) {
        next(new UnauthorizedError('Identity context not resolved.'));
        return;
      }

      const role = req.user.role as Role;
      const authorized = await this.roleHasPermission(role, permissionName);

      if (!authorized) {
        next(new ForbiddenError(`Access denied: Missing permission '${permissionName}'`));
        return;
      }

      next();
    };
  }
}
export default RbacService;
