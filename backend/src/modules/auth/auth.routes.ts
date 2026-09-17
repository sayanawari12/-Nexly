import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validateBody } from './middleware/validator.middleware';
import { requireAuth } from './middleware/auth.middleware';
import { authRateLimiter } from './middleware/auth-rate-limit.middleware';
import { registerSchema, loginSchema } from './auth.validator';
import { asyncHandler } from '../../utils/async-handler';

const router = Router();
const controller = new AuthController();

// 1. Public Authentication Endpoints (Rate Limited)
router.post(
  '/register',
  authRateLimiter,
  validateBody(registerSchema),
  asyncHandler(controller.register)
);

router.post(
  '/login',
  authRateLimiter,
  validateBody(loginSchema),
  asyncHandler(controller.login)
);

router.post(
  '/refresh',
  authRateLimiter,
  asyncHandler(controller.refresh)
);

router.post(
  '/logout',
  asyncHandler(controller.logout)
);

router.post(
  '/firebase',
  authRateLimiter,
  asyncHandler(controller.firebaseExchange)
);

// 2. Authenticated Endpoints
router.get(
  '/me',
  requireAuth,
  asyncHandler(controller.getMe)
);

export default router;
