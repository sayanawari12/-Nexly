import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Invalid email address format.'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long.')
    .max(30, 'Username must be at most 30 characters long.')
    .regex(/^[a-zA-Z0-9_\-]+$/, 'Username can only contain alphanumeric characters, underscores, and hyphens.'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long.')
    .max(72, 'Password must be at most 72 characters long.')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number.')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character.'),
});

export const loginSchema = z.object({
  identifier: z.string().min(1, 'Email or username identifier is required.'),
  password: z.string().min(1, 'Password is required.'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
