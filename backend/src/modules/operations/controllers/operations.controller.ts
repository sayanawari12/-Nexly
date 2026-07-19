import { Response } from 'express';
import { prisma } from '../../../config/database';
import { OperationsRepository } from '../repositories/operations.repository';
import { AuditService } from '../services/audit.service';
import { ApiResponse } from '../../../utils/response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';
import { NotFoundError } from '../../../errors';
import { AnnouncementType, IncidentSeverity, IncidentStatus, MaintenanceMode } from '@prisma/client';

export class OperationsController {
  private readonly repo: OperationsRepository;
  private readonly audit: AuditService;

  constructor() {
    this.repo = new OperationsRepository();
    this.audit = new AuditService();
  }

  /**
   * Platform Settings configuration endpoint (e.g. MAINTENANCE_MODE setting)
   */
  public updateSetting = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

    res.status(200).json(ApiResponse.success(setting));
  };

  /**
   * Feature Flags configuration endpoint
   */
  public updateFeatureFlag = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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

    res.status(200).json(ApiResponse.success(flag));
  };

  /**
   * Incidents creation and resolution endpoints
   */
  public createIncident = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { title, description, severity } = req.body;

    const incident = await this.repo.createIncident({
      title,
      description,
      severity: severity as IncidentSeverity,
    });

    await this.audit.logAction({
      actorId: req.user?.id,
      action: 'INCIDENT_CREATED',
      resource: `Incident:${incident.id}`,
      afterState: { title, severity },
      req,
    });

    res.status(201).json(ApiResponse.success(incident));
  };

  public resolveIncident = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const id = req.params.incidentId as string;
    const { postmortem } = req.body;

    const incident = await this.repo.updateIncidentStatus(
      id,
      IncidentStatus.RESOLVED,
      postmortem,
      new Date()
    );

    await this.audit.logAction({
      actorId: req.user?.id,
      action: 'INCIDENT_RESOLVED',
      resource: `Incident:${id}`,
      afterState: { status: IncidentStatus.RESOLVED, postmortem },
      req,
    });

    res.status(200).json(ApiResponse.success(incident));
  };

  /**
   * Platform Announcements creation endpoint
   */
  public createAnnouncement = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) throw new NotFoundError('User context missing');
    const { title, content, type, startTime, endTime } = req.body;

    const announcement = await this.repo.createAnnouncement({
      title,
      content,
      type: type as AnnouncementType,
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

    res.status(201).json(ApiResponse.success(announcement));
  };

  /**
   * Unified Operations Timeline API
   */
  public getTimeline = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    // Queries incidents, audits, announcements, and combines them chronologically
    const [incidents, announcements, audits] = await Promise.all([
      prisma.platformIncident.findMany({ where: { isDeleted: false }, take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.platformAnnouncement.findMany({ where: { isDeleted: false }, take: 10, orderBy: { createdAt: 'desc' } }),
      prisma.platformAuditLog.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
    ]);

    const timeline: any[] = [];

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

    res.status(200).json(ApiResponse.success(timeline));
  };
}
export default OperationsController;
