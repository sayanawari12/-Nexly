"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationsController = void 0;
const database_1 = require("../../../config/database");
const operations_repository_1 = require("../repositories/operations.repository");
const audit_service_1 = require("../services/audit.service");
const response_1 = require("../../../utils/response");
const errors_1 = require("../../../errors");
const client_1 = require("@prisma/client");
class OperationsController {
    repo;
    audit;
    constructor() {
        this.repo = new operations_repository_1.OperationsRepository();
        this.audit = new audit_service_1.AuditService();
    }
    /**
     * Platform Settings configuration endpoint (e.g. MAINTENANCE_MODE setting)
     */
    updateSetting = async (req, res) => {
        const { key, value } = req.body;
        const existing = await this.repo.getSetting(key);
        const beforeState = existing ? { value: existing.value } : null;
        const setting = await this.repo.upsertSetting(key, value);
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'SETTING_UPDATED',
            resource: `Setting:${key}`,
            beforeState,
            afterState: { value },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success(setting));
    };
    /**
     * Feature Flags configuration endpoint
     */
    updateFeatureFlag = async (req, res) => {
        const { key, enabled, rollout } = req.body;
        const existing = await this.repo.getFeatureFlag(key);
        const beforeState = existing ? { enabled: existing.enabled, rollout: existing.rollout } : null;
        const flag = await this.repo.upsertFeatureFlag(key, enabled, rollout);
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'FEATURE_FLAG_UPDATED',
            resource: `FeatureFlag:${key}`,
            beforeState,
            afterState: { enabled, rollout },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success(flag));
    };
    /**
     * Incidents creation and resolution endpoints
     */
    createIncident = async (req, res) => {
        const { title, description, severity } = req.body;
        const incident = await this.repo.createIncident({
            title,
            description,
            severity: severity,
        });
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'INCIDENT_CREATED',
            resource: `Incident:${incident.id}`,
            afterState: { title, severity },
            req,
        });
        res.status(201).json(response_1.ApiResponse.success(incident));
    };
    resolveIncident = async (req, res) => {
        const id = req.params.incidentId;
        const { postmortem } = req.body;
        const incident = await this.repo.updateIncidentStatus(id, client_1.IncidentStatus.RESOLVED, postmortem, new Date());
        await this.audit.logAction({
            actorId: req.user?.id,
            action: 'INCIDENT_RESOLVED',
            resource: `Incident:${id}`,
            afterState: { status: client_1.IncidentStatus.RESOLVED, postmortem },
            req,
        });
        res.status(200).json(response_1.ApiResponse.success(incident));
    };
    /**
     * Platform Announcements creation endpoint
     */
    createAnnouncement = async (req, res) => {
        if (!req.user)
            throw new errors_1.NotFoundError('User context missing');
        const { title, content, type, startTime, endTime } = req.body;
        const announcement = await this.repo.createAnnouncement({
            title,
            content,
            type: type,
            startTime: new Date(startTime),
            endTime: endTime ? new Date(endTime) : undefined,
            createdBy: req.user.id,
        });
        await this.audit.logAction({
            actorId: req.user.id,
            action: 'ANNOUNCEMENT_CREATED',
            resource: `Announcement:${announcement.id}`,
            afterState: { title, type },
            req,
        });
        res.status(201).json(response_1.ApiResponse.success(announcement));
    };
    /**
     * Unified Operations Timeline API
     */
    getTimeline = async (req, res) => {
        // Queries incidents, audits, announcements, and combines them chronologically
        const [incidents, announcements, audits] = await Promise.all([
            database_1.prisma.platformIncident.findMany({ where: { isDeleted: false }, take: 10, orderBy: { createdAt: 'desc' } }),
            database_1.prisma.platformAnnouncement.findMany({ where: { isDeleted: false }, take: 10, orderBy: { createdAt: 'desc' } }),
            database_1.prisma.platformAuditLog.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
        ]);
        const timeline = [];
        // Map Incidents
        incidents.forEach((inc) => {
            timeline.push({
                id: inc.id,
                type: 'INCIDENT',
                title: `🔥 [Incident] ${inc.title}`,
                content: inc.description,
                timestamp: inc.createdAt,
                metadata: { severity: inc.severity, status: inc.status },
            });
        });
        // Map Announcements
        announcements.forEach((ann) => {
            timeline.push({
                id: ann.id,
                type: 'ANNOUNCEMENT',
                title: `📢 [Announcement] ${ann.title}`,
                content: ann.content,
                timestamp: ann.createdAt,
                metadata: { type: ann.type },
            });
        });
        // Map Audits
        audits.forEach((aud) => {
            timeline.push({
                id: aud.id,
                type: 'AUDIT_ACTION',
                title: `🛠️ [Audit] Action ${aud.action}`,
                content: `Modified resource: ${aud.resource}`,
                timestamp: aud.createdAt,
                metadata: { action: aud.action },
            });
        });
        // Sort descending by timestamp
        timeline.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        res.status(200).json(response_1.ApiResponse.success(timeline));
    };
}
exports.OperationsController = OperationsController;
exports.default = OperationsController;
