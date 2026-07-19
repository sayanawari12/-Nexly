import { PrismaClient, Role, PlatformAuditLog, PlatformAnnouncement, PlatformReport, FeatureFlag, PlatformIncident, PlatformSetting, Permission, RolePermission, AnnouncementType, ReportStatus, IncidentSeverity, IncidentStatus } from '@prisma/client';
import { prisma } from '../../../config/database';

export class OperationsRepository {
  private readonly db: PrismaClient = prisma;

  /**
   * RBAC Permissions queries
   */
  public async getPermissionsForRole(role: Role): Promise<string[]> {
    const mappings = await this.db.rolePermission.findMany({
      where: { role },
      include: { permission: true },
    });
    return mappings.map((m) => m.permission.name);
  }

  public async seedPermission(groupName: string, permissionName: string, targetRoles: Role[]): Promise<void> {
    await this.db.$transaction(async (tx) => {
      // 1. Get or create PermissionGroup
      let group = await tx.permissionGroup.findUnique({ where: { name: groupName } });
      if (!group) {
        group = await tx.permissionGroup.create({
          data: { name: groupName, description: `Management group for ${groupName}` },
        });
      }

      // 2. Get or create Permission
      let perm = await tx.permission.findUnique({ where: { name: permissionName } });
      if (!perm) {
        perm = await tx.permission.create({
          data: { name: permissionName, groupId: group.id },
        });
      }

      // 3. Map to roles
      for (const role of targetRoles) {
        const existing = await tx.rolePermission.findUnique({
          where: { role_permissionId: { role, permissionId: perm.id } },
        });
        if (!existing) {
          await tx.rolePermission.create({
            data: { role, permissionId: perm.id },
          });
        }
      }
    });
  }

  /**
   * Immutable Audit Integrity Logs queries
   */
  public async getLatestAuditLog(): Promise<PlatformAuditLog | null> {
    return this.db.platformAuditLog.findFirst({
      orderBy: { createdAt: 'desc' },
    });
  }

  public async writeAuditLog(data: any): Promise<PlatformAuditLog> {
    return this.db.platformAuditLog.create({ data });
  }

  public async getAuditLogs(): Promise<PlatformAuditLog[]> {
    return this.db.platformAuditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });
  }

  /**
   * Platform Announcements queries
   */
  public async createAnnouncement(data: {
    title: string;
    content: string;
    type: AnnouncementType;
    contestId?: string;
    startTime: Date;
    endTime?: Date;
    createdBy: string;
  }): Promise<PlatformAnnouncement> {
    return this.db.platformAnnouncement.create({
      data: {
        ...data,
        version: 0,
      },
    });
  }

  public async getAnnouncements(): Promise<PlatformAnnouncement[]> {
    return this.db.platformAnnouncement.findMany({
      where: { isDeleted: false },
      orderBy: { startTime: 'desc' },
    });
  }

  public async softDeleteAnnouncement(id: string, actorId: string): Promise<void> {
    const existing = await this.db.platformAnnouncement.findUnique({ where: { id } });
    if (!existing) return;

    await this.db.platformAnnouncement.updateMany({
      where: { id, version: existing.version },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: actorId,
        version: { increment: 1 },
      },
    });
  }

  /**
   * Incident Management queries
   */
  public async createIncident(data: {
    title: string;
    description: string;
    severity: IncidentSeverity;
  }): Promise<PlatformIncident> {
    return this.db.platformIncident.create({
      data: {
        ...data,
        status: IncidentStatus.OPEN,
        version: 0,
      },
    });
  }

  public async updateIncidentStatus(
    id: string,
    status: IncidentStatus,
    postmortem?: string,
    resolvedAt?: Date
  ): Promise<PlatformIncident> {
    const existing = await this.db.platformIncident.findUnique({ where: { id } });
    if (!existing) throw new Error('Incident not found');

    const result = await this.db.platformIncident.updateMany({
      where: { id, version: existing.version },
      data: {
        status,
        postmortem,
        resolvedAt,
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      throw new Error('Concurrent overwrite error on incident update');
    }

    return this.db.platformIncident.findUnique({ where: { id } }) as Promise<PlatformIncident>;
  }

  public async getIncidents(): Promise<PlatformIncident[]> {
    return this.db.platformIncident.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Moderation reports queue queries
   */
  public async createReport(data: {
    reporterId: string;
    targetType: string;
    targetId: string;
    reason: string;
  }): Promise<PlatformReport> {
    return this.db.platformReport.create({
      data: {
        ...data,
        status: ReportStatus.OPEN,
        version: 0,
      },
    });
  }

  public async updateReportStatus(id: string, status: ReportStatus, moderatorNotes: string): Promise<PlatformReport> {
    const existing = await this.db.platformReport.findUnique({ where: { id } });
    if (!existing) throw new Error('Report not found');

    const result = await this.db.platformReport.updateMany({
      where: { id, version: existing.version },
      data: {
        status,
        moderatorNotes,
        version: { increment: 1 },
      },
    });

    if (result.count === 0) {
      throw new Error('Concurrent overwrite error on report update');
    }

    return this.db.platformReport.findUnique({ where: { id } }) as Promise<PlatformReport>;
  }

  public async getReports(): Promise<PlatformReport[]> {
    return this.db.platformReport.findMany({
      where: { isDeleted: false },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Feature Flags queries
   */
  public async upsertFeatureFlag(key: string, enabled: boolean, rollout = 1.0): Promise<FeatureFlag> {
    return this.db.featureFlag.upsert({
      where: { key },
      create: { key, enabled, rollout, version: 0 },
      update: { enabled, rollout, version: { increment: 1 } },
    });
  }

  public async getFeatureFlag(key: string): Promise<FeatureFlag | null> {
    return this.db.featureFlag.findUnique({ where: { key } });
  }

  /**
   * Platform Settings queries
   */
  public async upsertSetting(key: string, value: string): Promise<PlatformSetting> {
    return this.db.platformSetting.upsert({
      where: { key },
      create: { key, value, version: 0 },
      update: { value, version: { increment: 1 } },
    });
  }

  public async getSetting(key: string): Promise<PlatformSetting | null> {
    return this.db.platformSetting.findUnique({ where: { key } });
  }
}
export default OperationsRepository;
