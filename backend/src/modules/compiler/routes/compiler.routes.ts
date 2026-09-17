import { Router } from 'express';
import { CompilerController } from '../controllers/compiler.controller';
import { optionalAuth } from '../../auth/middleware/auth.middleware';
import { compilerRateLimiter } from '../middleware/compiler-rate-limit.middleware';
import { asyncHandler } from '../../../utils/async-handler';

const router = Router();
const controller = new CompilerController();

router.post('/execute', optionalAuth, compilerRateLimiter, asyncHandler(controller.execute));
router.post('/', optionalAuth, compilerRateLimiter, asyncHandler(controller.execute));

export default router;
