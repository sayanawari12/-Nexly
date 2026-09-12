"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submission_controller_1 = require("../controllers/submission.controller");
const auth_middleware_1 = require("../../auth/middleware/auth.middleware");
const validator_middleware_1 = require("../../auth/middleware/validator.middleware");
const submission_validator_1 = require("../validators/submission.validator");
const async_handler_1 = require("../../../utils/async-handler");
const router = (0, express_1.Router)();
const controller = new submission_controller_1.SubmissionController();
// All routes require user authentication context
router.post('/', auth_middleware_1.requireAuth, (0, validator_middleware_1.validateBody)(submission_validator_1.createSubmissionSchema), (0, async_handler_1.asyncHandler)(controller.create));
router.get('/languages', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.listLanguages));
router.get('/:id', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.get));
router.get('/', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.list));
router.get('/:id/status', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.status));
exports.default = router;
