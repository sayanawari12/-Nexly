"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = require("./controllers/profile.controller");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const router = (0, express_1.Router)();
const controller = new profile_controller_1.ProfileController();
// Profile Snapshot details
router.get('/me', auth_middleware_1.requireAuth, controller.getProfile);
router.get('/users/:userId', auth_middleware_1.requireAuth, controller.getProfile);
// Notifications Preferences
router.get('/preferences', auth_middleware_1.requireAuth, controller.getPreferences);
router.put('/preferences', auth_middleware_1.requireAuth, controller.updatePreferences);
// In-App Notifications
router.get('/notifications', auth_middleware_1.requireAuth, controller.getNotifications);
router.put('/notifications/:notificationId/read', auth_middleware_1.requireAuth, controller.markNotificationRead);
// Advanced Leaderboards
router.get('/leaderboard', auth_middleware_1.requireAuth, controller.getLeaderboard);
router.get('/leaderboard/seasonal', auth_middleware_1.requireAuth, controller.getSeasonalLeaderboard);
router.get('/leaderboard/around-me', auth_middleware_1.requireAuth, controller.getLeaderboardAroundMe);
// Admin Recovery Operations
router.post('/admin/rebuild-caches', auth_middleware_1.requireAuth, controller.rebuildCaches);
router.post('/admin/replay-ratings', auth_middleware_1.requireAuth, controller.triggerRatingsReplay);
exports.default = router;
