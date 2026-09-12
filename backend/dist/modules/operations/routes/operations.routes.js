"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const moderation_controller_1 = require("../controllers/moderation.controller");
const operations_controller_1 = require("../controllers/operations.controller");
const rbac_service_1 = require("../services/rbac.service");
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const router = (0, express_1.Router)();
const rbac = new rbac_service_1.RbacService();
const dashboard = new dashboard_controller_1.DashboardController();
const moderation = new moderation_controller_1.ModerationController();
const ops = new operations_controller_1.OperationsController();
// 1. Health Dashboard endpoints (Scrape endpoint metrics is public, health/summary are protected)
router.get('/dashboard/metrics', dashboard.getMetrics);
router.get('/dashboard/summary', auth_middleware_1.requireAuth, rbac.requirePermission('dashboard:view'), dashboard.getSummary);
router.get('/dashboard/health', auth_middleware_1.requireAuth, rbac.requirePermission('dashboard:view'), dashboard.getHealth);
// 2. User Moderation endpoints
router.post('/users/suspend', auth_middleware_1.requireAuth, rbac.requirePermission('users:suspend'), moderation.suspendUser);
router.post('/users/restore', auth_middleware_1.requireAuth, rbac.requirePermission('users:restore'), moderation.restoreUser);
router.post('/users/force-logout', auth_middleware_1.requireAuth, rbac.requirePermission('users:logout'), moderation.forceLogout);
// 3. Problem & Submission Moderation endpoints
router.post('/problems/moderate', auth_middleware_1.requireAuth, rbac.requirePermission('problems:moderate'), moderation.moderateProblem);
router.post('/submissions/rejudge', auth_middleware_1.requireAuth, rbac.requirePermission('submissions:rejudge'), moderation.rejudgeSubmission);
// 4. Reports Queue endpoints
router.get('/reports', auth_middleware_1.requireAuth, rbac.requirePermission('reports:view'), moderation.listReports);
router.put('/reports/:reportId', auth_middleware_1.requireAuth, rbac.requirePermission('reports:moderate'), moderation.updateReportStatus);
// 5. Operations Parameter & Incident endpoints
router.put('/settings', auth_middleware_1.requireAuth, rbac.requirePermission('settings:update'), ops.updateSetting);
router.put('/feature-flags', auth_middleware_1.requireAuth, rbac.requirePermission('settings:update'), ops.updateFeatureFlag);
router.post('/incidents', auth_middleware_1.requireAuth, rbac.requirePermission('incidents:create'), ops.createIncident);
router.put('/incidents/:incidentId/resolve', auth_middleware_1.requireAuth, rbac.requirePermission('incidents:resolve'), ops.resolveIncident);
router.post('/announcements', auth_middleware_1.requireAuth, rbac.requirePermission('announcements:create'), ops.createAnnouncement);
router.get('/timeline', auth_middleware_1.requireAuth, rbac.requirePermission('timeline:view'), ops.getTimeline);
exports.default = router;
