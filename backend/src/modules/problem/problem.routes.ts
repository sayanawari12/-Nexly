import { Router } from 'express';
import { ProblemController } from './problem.controller';
import { TestCaseController } from './testcase.controller';
import { requireAuth, requireRole, optionalAuth } from '../auth/middleware/auth.middleware';
import { validateBody } from '../auth/middleware/validator.middleware';
import {
  createProblemSchema,
  updateProblemSchema,
  createTestCaseSchema,
  updateTestCaseSchema,
  batchTestCasesSchema,
} from './problem.validator';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const problemCtrl = new ProblemController();
const testCaseCtrl = new TestCaseController();

// ----------------------------------------------------
// 1. Problem Core Routes
// ----------------------------------------------------
router.post(
  '/',
  requireAuth,
  requireRole('ADMIN'),
  validateBody(createProblemSchema),
  asyncHandler(problemCtrl.create)
);

router.get(
  '/',
  optionalAuth,
  asyncHandler(problemCtrl.list)
);

router.get(
  '/:slug',
  optionalAuth,
  asyncHandler(problemCtrl.get)
);

router.patch(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  validateBody(updateProblemSchema),
  asyncHandler(problemCtrl.update)
);

router.delete(
  '/:id',
  requireAuth,
  requireRole('ADMIN'),
  asyncHandler(problemCtrl.delete)
);

router.post(
  '/:id/publish',
  requireAuth,
  requireRole('ADMIN'),
  asyncHandler(problemCtrl.publish)
);

router.post(
  '/:id/archive',
  requireAuth,
  requireRole('ADMIN'),
  asyncHandler(problemCtrl.archive)
);

router.post(
  '/:id/restore',
  requireAuth,
  requireRole('ADMIN'),
  asyncHandler(problemCtrl.restore)
);

// ----------------------------------------------------
// 2. TestCase Related Routes
// ----------------------------------------------------
router.post(
  '/:problemId/testcases',
  requireAuth,
  requireRole('ADMIN'),
  validateBody(createTestCaseSchema),
  asyncHandler(testCaseCtrl.create)
);

router.post(
  '/:problemId/testcases/batch',
  requireAuth,
  requireRole('ADMIN'),
  validateBody(batchTestCasesSchema),
  asyncHandler(testCaseCtrl.batchImport)
);

router.get(
  '/:problemId/testcases',
  optionalAuth,
  asyncHandler(testCaseCtrl.list)
);

router.patch(
  '/testcases/:id',
  requireAuth,
  requireRole('ADMIN'),
  validateBody(updateTestCaseSchema),
  asyncHandler(testCaseCtrl.update)
);

router.delete(
  '/testcases/:id',
  requireAuth,
  requireRole('ADMIN'),
  asyncHandler(testCaseCtrl.delete)
);

export default router;
