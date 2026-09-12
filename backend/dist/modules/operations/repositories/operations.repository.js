"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsRepository = void 0;
const client_1 = require("@prisma/client");
const database_1 = require("../../../config/database");
class OperationsRepository {
    db = database_1.prisma;
    /**
     * RBAC Permissions queries
     */
    async getPermissionsForRole(role) {
        const mappings = await this.db.rolePermission.findMany({
            where: { role },
            include: { permission: true },
        });
        return mappings.map((m) => m.permission.name);
    }
    async seedPermission(groupName, permissionName, targetRoles) {
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
    async getLatestAuditLog() {
        return this.db.platformAuditLog.findFirst({
            orderBy: { createdAt: 'desc' },
        });
    }
    async writeAuditLog(data) {
        return this.db.platformAuditLog.create({ data });
    }
    async getAuditLogs() {
        return this.db.platformAuditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 100,
        });
    }
    /**
     * Platform Announcements queries
     */
    async createAnnouncement(data) {
        return this.db.platformAnnouncement.create({
            data: {
                ...data,
                version: 0,
            },
        });
    }
    async getAnnouncements() {
        return this.db.platformAnnouncement.findMany({
            where: { isDeleted: false },
            orderBy: { startTime: 'desc' },
        });
    }
    async softDeleteAnnouncement(id, actorId) {
        const existing = await this.db.platformAnnouncement.findUnique({ where: { id } });
        if (!existing)
            return;
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
    async createIncident(data) {
        return this.db.platformIncident.create({
            data: {
                ...data,
                status: client_1.IncidentStatus.OPEN,
                version: 0,
            },
        });
    }
    async updateIncidentStatus(id, status, postmortem, resolvedAt) {
        const existing = await this.db.platformIncident.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Incident not found');
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
        return this.db.platformIncident.findUnique({ where: { id } });
    }
    async getIncidents() {
        return this.db.platformIncident.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Moderation reports queue queries
     */
    async createReport(data) {
        return this.db.platformReport.create({
            data: {
                ...data,
                status: client_1.ReportStatus.OPEN,
                version: 0,
            },
        });
    }
    async updateReportStatus(id, status, moderatorNotes) {
        const existing = await this.db.platformReport.findUnique({ where: { id } });
        if (!existing)
            throw new Error('Report not found');
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
        return this.db.platformReport.findUnique({ where: { id } });
    }
    async getReports() {
        return this.db.platformReport.findMany({
            where: { isDeleted: false },
            orderBy: { createdAt: 'desc' },
        });
    }
    /**
     * Feature Flags queries
     */
    async upsertFeatureFlag(key, enabled, rollout = 1.0) {
        return this.db.featureFlag.upsert({
            where: { key },
            create: { key, enabled, rollout, version: 0 },
            update: { enabled, rollout, version: { increment: 1 } },
        });
    }
    async getFeatureFlag(key) {
        return this.db.featureFlag.findUnique({ where: { key } });
    }
    /**
     * Platform Settings queries
     */
    async upsertSetting(key, value) {
        return this.db.platformSetting.upsert({
            where: { key },
            create: { key, value, version: 0 },
            update: { value, version: { increment: 1 } },
        });
    }
    async getSetting(key) {
        return this.db.platformSetting.findUnique({ where: { key } });
    }
}
exports.OperationsRepository = OperationsRepository;
exports.default = OperationsRepository;
