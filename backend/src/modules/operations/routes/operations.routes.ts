import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller';
import { ModerationController } from '../controllers/moderation.controller';
import { OperationsController } from '../controllers/operations.controller';
import { RbacService } from '../services/rbac.service';
import { requireAuth } from '../../auth/middleware/auth.middleware';

const router = Router();
const rbac = new RbacService();

const dashboard = new DashboardController();
const moderation = new ModerationController();
const ops = new OperationsController();

// 1. Health Dashboard endpoints (Scrape endpoint metrics is public, health/summary are protected)
router.get('/dashboard/metrics', dashboard.getMetrics);
router.get('/dashboard/summary', requireAuth, rbac.requirePermission('dashboard:view'), dashboard.getSummary);
router.get('/dashboard/health', requireAuth, rbac.requirePermission('dashboard:view'), dashboard.getHealth);

// 2. User Moderation endpoints
router.post('/users/suspend', requireAuth, rbac.requirePermission('users:suspend'), moderation.suspendUser);
router.post('/users/restore', requireAuth, rbac.requirePermission('users:restore'), moderation.restoreUser);
router.post('/users/force-logout', requireAuth, rbac.requirePermission('users:logout'), moderation.forceLogout);

// 3. Problem & Submission Moderation endpoints
router.post('/problems/moderate', requireAuth, rbac.requirePermission('problems:moderate'), moderation.moderateProblem);
router.post('/submissions/rejudge', requireAuth, rbac.requirePermission('submissions:rejudge'), moderation.rejudgeSubmission);

// 4. Reports Queue endpoints
router.get('/reports', requireAuth, rbac.requirePermission('reports:view'), moderation.listReports);
router.put('/reports/:reportId', requireAuth, rbac.requirePermission('reports:moderate'), moderation.updateReportStatus);

// 5. Operations Parameter & Incident endpoints
router.put('/settings', requireAuth, rbac.requirePermission('settings:update'), ops.updateSetting);
router.put('/feature-flags', requireAuth, rbac.requirePermission('settings:update'), ops.updateFeatureFlag);
router.post('/incidents', requireAuth, rbac.requirePermission('incidents:create'), ops.createIncident);
router.put('/incidents/:incidentId/resolve', requireAuth, rbac.requirePermission('incidents:resolve'), ops.resolveIncident);
router.post('/announcements', requireAuth, rbac.requirePermission('announcements:create'), ops.createAnnouncement);
router.get('/timeline', requireAuth, rbac.requirePermission('timeline:view'), ops.getTimeline);

export default router;
