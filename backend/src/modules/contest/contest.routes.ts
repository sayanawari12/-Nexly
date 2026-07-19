import { Router } from 'express';
import { ContestController } from './controllers/contest.controller';
import { requireAuth, optionalAuth } from '../auth/middleware/auth.middleware';
import { validateBody } from '../auth/middleware/validator.middleware';
import { CreateContestSchema, RegisterContestSchema, AskQuestionSchema, AnswerQuestionSchema, CreateAnnouncementSchema } from './validators/contest.validator';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const controller = new ContestController();

// Create & List Contests
router.post(
  '/',
  requireAuth,
  validateBody(CreateContestSchema),
  asyncHandler(controller.create)
);

router.get(
  '/',
  optionalAuth,
  asyncHandler(controller.list)
);

router.get(
  '/:id',
  optionalAuth,
  asyncHandler(controller.get)
);

// Register Participant
router.post(
  '/:id/register',
  requireAuth,
  validateBody(RegisterContestSchema),
  asyncHandler(controller.register)
);

// Standings
router.get(
  '/:id/leaderboard',
  optionalAuth,
  asyncHandler(controller.getLeaderboard)
);

// Manual Unfreeze (Admin only)
router.post(
  '/:id/unfreeze',
  requireAuth,
  asyncHandler(controller.unfreeze)
);

// Announcements
router.post(
  '/:id/announcements',
  requireAuth,
  validateBody(CreateAnnouncementSchema),
  asyncHandler(controller.createAnnouncement)
);

router.get(
  '/:id/announcements',
  asyncHandler(controller.listAnnouncements)
);

// Clarifications
router.post(
  '/:id/clarifications',
  requireAuth,
  validateBody(AskQuestionSchema),
  asyncHandler(controller.askQuestion)
);

router.get(
  '/:id/clarifications',
  requireAuth,
  asyncHandler(controller.listClarifications)
);

router.post(
  '/:id/clarifications/:clarificationId/answer',
  requireAuth,
  validateBody(AnswerQuestionSchema),
  asyncHandler(controller.answerQuestion)
);

export default router;
