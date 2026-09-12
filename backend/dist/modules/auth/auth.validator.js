"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address format.'),
    username: zod_1.z
        .string()
        .min(3, 'Username must be at least 3 characters long.')
        .max(30, 'Username must be at most 30 characters long.')
        .regex(/^[a-zA-Z0-9_\-]+$/, 'Username can only contain alphanumeric characters, underscores, and hyphens.'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .max(72, 'Password must be at most 72 characters long.')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
        .regex(/[0-9]/, 'Password must contain at least one number.')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.'),
});
exports.loginSchema = zod_1.z.object({
    identifier: zod_1.z.string().min(1, 'Email or username identifier is required.'),
    password: zod_1.z.string().min(1, 'Password is required.'),
});
