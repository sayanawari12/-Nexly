import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateBody } from './middleware/validator.middleware';
import { requireAuth } from './middleware/auth.middleware';
import { registerSchema, loginSchema } from './auth.validator';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const controller = new AuthController();

// 1. Public Authentication Endpoints
router.post(
  '/register',
  validateBody(registerSchema),
  asyncHandler(controller.register)
);

router.post(
  '/login',
  validateBody(loginSchema),
  asyncHandler(controller.login)
);

router.post(
  '/refresh',
  asyncHandler(controller.refresh)
);

router.post(
  '/logout',
  asyncHandler(controller.logout)
);

router.post(
  '/firebase',
  asyncHandler(controller.firebaseExchange)
);

// 2. Authenticated Endpoints
router.get(
  '/me',
  requireAuth,
  asyncHandler(controller.getMe)
);

export default router;
