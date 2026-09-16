import { Router } from 'express';
import { LearningController } from './learning.controller';
import { requireAuth, optionalAuth } from '../auth/middleware/auth.middleware';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const controller = new LearningController();

// 1. Public Learning Endpoints
router.get(
  '/technologies',
  asyncHandler(controller.listTechnologies)
);

router.get(
  '/tracks/:trackId/modules',
  optionalAuth,
  asyncHandler(controller.getTrackModules)
);

router.get(
  '/lessons/:lessonId/recommended-problems',
  asyncHandler(controller.getRecommendedProblems)
);

// 2. Authenticated Endpoints
router.post(
  '/lessons/:lessonId/complete',
  requireAuth,
  asyncHandler(controller.markLessonComplete)
);

export default router;
