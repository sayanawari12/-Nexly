import { Router } from 'express';
import { ProfileController } from './controllers/profile.controller';
import { requireAuth } from '../auth/middleware/auth.middleware';

const router = Router();
const controller = new ProfileController();

// Profile Snapshot details
router.get('/me', requireAuth, controller.getProfile);
router.get('/users/:userId', requireAuth, controller.getProfile);

// Notifications Preferences
router.get('/preferences', requireAuth, controller.getPreferences);
router.put('/preferences', requireAuth, controller.updatePreferences);

// In-App Notifications
router.get('/notifications', requireAuth, controller.getNotifications);
router.put('/notifications/:notificationId/read', requireAuth, controller.markNotificationRead);

// Advanced Leaderboards
router.get('/leaderboard', requireAuth, controller.getLeaderboard);
router.get('/leaderboard/seasonal', requireAuth, controller.getSeasonalLeaderboard);
router.get('/leaderboard/around-me', requireAuth, controller.getLeaderboardAroundMe);

// Admin Recovery Operations
router.post('/admin/rebuild-caches', requireAuth, controller.rebuildCaches);
router.post('/admin/replay-ratings', requireAuth, controller.triggerRatingsReplay);

export default router;
