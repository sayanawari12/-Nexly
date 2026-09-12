"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validator_middleware_1 = require("./middleware/validator.middleware");
const auth_middleware_1 = require("./middleware/auth.middleware");
const auth_validator_1 = require("./auth.validator");
const async_handler_1 = require("../../utils/async-handler");
const router = (0, express_1.Router)();
const controller = new auth_controller_1.AuthController();
// 1. Public Authentication Endpoints
router.post('/register', (0, validator_middleware_1.validateBody)(auth_validator_1.registerSchema), (0, async_handler_1.asyncHandler)(controller.register));
router.post('/login', (0, validator_middleware_1.validateBody)(auth_validator_1.loginSchema), (0, async_handler_1.asyncHandler)(controller.login));
router.post('/refresh', (0, async_handler_1.asyncHandler)(controller.refresh));
router.post('/logout', (0, async_handler_1.asyncHandler)(controller.logout));
router.post('/firebase', (0, async_handler_1.asyncHandler)(controller.firebaseExchange));
// 2. Authenticated Endpoints
router.get('/me', auth_middleware_1.requireAuth, (0, async_handler_1.asyncHandler)(controller.getMe));
exports.default = router;
