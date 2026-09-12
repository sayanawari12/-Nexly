"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contest_controller_1 = require("./controllers/contest.controller");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const validator_middleware_1 = require("../auth/middleware/validator.middleware");
const contest_validator_1 = require("./validators/contest.validator");
const async_handler_1 = require("../../utils/async-handler");
const router = (0, express_1.Router)();
const controller = new contest_controller_1.ContestController();
// Create & List Contests
router.post('/', auth_middleware_1.requireAuth, (0, validator_middleware_1.validateBody)(contest_validator_1.CreateContestSchema), (0, async_handler_1.asyncHandler)(controller.create));
router.get('/', auth_middleware_1.optionalAuth, (0, async_handler_1.asyncHandler)(controller.list));
router.get('/:id', auth_middleware_1.optionalAuth, (0, async_handler_1.asyncHandler)(controller.get));
// Register Participant
router.post('/:id/register', auth_middleware_1.requireAuth, (0, validator_middleware_1.validateBody)(contest_validator_1.RegisterContestSchema), (0, async_handler_1.asyncHandler)(controller.register));
// Standings
router.get('/:id/leaderboard', auth_middleware_1.optionalAuth, (0, async_handler_1.asyncHandler)(controller.getLeaderboard));
// Manual Unfreeze (Admin only)
router.post('/:id/unfreeze', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.unfreeze));
// Announcements
router.post('/:id/announcements', auth_middleware_1.requireAuth, (0, validator_middleware_1.validateBody)(contest_validator_1.CreateAnnouncementSchema), (0, async_handler_1.asyncHandler)(controller.createAnnouncement));
router.get('/:id/announcements', (0, async_handler_1.asyncHandler)(controller.listAnnouncements));
// Clarifications
router.post('/:id/clarifications', auth_middleware_1.requireAuth, (0, validator_middleware_1.validateBody)(contest_validator_1.AskQuestionSchema), (0, async_handler_1.asyncHandler)(controller.askQuestion));
router.get('/:id/clarifications', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.listClarifications));
router.post('/:id/clarifications/:clarificationId/answer', auth_middleware_1.requireAuth, (0, validator_middleware_1.validateBody)(contest_validator_1.AnswerQuestionSchema), (0, async_handler_1.asyncHandler)(controller.answerQuestion));
exports.default = router;
