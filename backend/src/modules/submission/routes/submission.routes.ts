import { Router } from 'express';
import { SubmissionController } from '../controllers/submission.controller';
import { requireAuth } from '../../auth/middleware/auth.middleware';
import { validateBody } from '../../auth/middleware/validator.middleware';
import { createSubmissionSchema } from '../validators/submission.validator';
import { asyncHandler } from '../../../utils/async-handler';

import { CompilerController } from '../../compiler/controllers/compiler.controller';

const router = Router();
const controller = new SubmissionController();
const compilerController = new CompilerController();

router.post(
  '/execute',
  asyncHandler(compilerController.execute)
);

router.post(
  '/compiler/execute',
  asyncHandler(compilerController.execute)
);

// All routes require user authentication context
router.post(
  '/',
  requireAuth,
  validateBody(createSubmissionSchema),
  asyncHandler(controller.create)
);

router.get(
  '/languages',
  requireAuth,
  asyncHandler(controller.listLanguages)
);

router.get(
  '/:id',
  requireAuth,
  asyncHandler(controller.get)
);

router.get(
  '/',
  requireAuth,
  asyncHandler(controller.list)
);

router.get(
  '/:id/status',
  requireAuth,
  asyncHandler(controller.status)
);

export default router;
