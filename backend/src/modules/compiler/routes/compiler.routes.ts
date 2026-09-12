import { Router } from 'express';
import { CompilerController } from '../controllers/compiler.controller';
import { asyncHandler } from '../../../utils/async-handler';

const router = Router();
const controller = new CompilerController();

router.post('/execute', asyncHandler(controller.execute));
router.post('/', asyncHandler(controller.execute));

export default router;
