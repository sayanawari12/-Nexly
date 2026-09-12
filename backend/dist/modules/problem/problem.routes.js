"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const problem_controller_1 = require("./problem.controller");
const testcase_controller_1 = require("./testcase.controller");
const auth_middleware_1 = require("../auth/middleware/auth.middleware");
const validator_middleware_1 = require("../auth/middleware/validator.middleware");
const problem_validator_1 = require("./problem.validator");
const async_handler_1 = require("../../utils/async-handler");
const router = (0, express_1.Router)();
const problemCtrl = new problem_controller_1.ProblemController();
const testCaseCtrl = new testcase_controller_1.TestCaseController();
// ----------------------------------------------------
// 1. Problem Core Routes
// ----------------------------------------------------
router.post('/', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, validator_middleware_1.validateBody)(problem_validator_1.createProblemSchema), (0, async_handler_1.asyncHandler)(problemCtrl.create));
router.get('/', auth_middleware_1.optionalAuth, (0, async_handler_1.asyncHandler)(problemCtrl.list));
router.get('/:slug', auth_middleware_1.optionalAuth, (0, async_handler_1.asyncHandler)(problemCtrl.get));
router.patch('/:id', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, validator_middleware_1.validateBody)(problem_validator_1.updateProblemSchema), (0, async_handler_1.asyncHandler)(problemCtrl.update));
router.delete('/:id', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, async_handler_1.asyncHandler)(problemCtrl.delete));
router.post('/:id/publish', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, async_handler_1.asyncHandler)(problemCtrl.publish));
router.post('/:id/archive', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, async_handler_1.asyncHandler)(problemCtrl.archive));
router.post('/:id/restore', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, async_handler_1.asyncHandler)(problemCtrl.restore));
// ----------------------------------------------------
// 2. TestCase Related Routes
// ----------------------------------------------------
router.post('/:problemId/testcases', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, validator_middleware_1.validateBody)(problem_validator_1.createTestCaseSchema), (0, async_handler_1.asyncHandler)(testCaseCtrl.create));
router.post('/:problemId/testcases/batch', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, validator_middleware_1.validateBody)(problem_validator_1.batchTestCasesSchema), (0, async_handler_1.asyncHandler)(testCaseCtrl.batchImport));
router.get('/:problemId/testcases', auth_middleware_1.optionalAuth, (0, async_handler_1.asyncHandler)(testCaseCtrl.list));
router.patch('/testcases/:id', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, validator_middleware_1.validateBody)(problem_validator_1.updateTestCaseSchema), (0, async_handler_1.asyncHandler)(testCaseCtrl.update));
router.delete('/testcases/:id', auth_middleware_1.requireAuth, (0, auth_middleware_1.requireRole)('ADMIN'), (0, async_handler_1.asyncHandler)(testCaseCtrl.delete));
exports.default = router;
