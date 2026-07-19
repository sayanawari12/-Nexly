import dotenv from 'dotenv';
import { z } from 'zod';

// 1. Pre-load env before validation checks
dotenv.config();

const envSchema = z.object({
  PORT: z.coerce.number().default(5000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
  JWT_ACCESS_EXPIRY: z.string().default('15m'),
  JWT_REFRESH_EXPIRY: z.string().default('7d'),
  JUDGE0_API_URL: z.string().url(),
  JUDGE0_CALLBACK_URL: z.string().url(),
  LOG_LEVEL: z.string().default('info'),
  PAGINATION_DEFAULT_LIMIT: z.coerce.number().default(20),
  PAGINATION_MAX_LIMIT: z.coerce.number().default(100),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Configuration validation failed! Aborting startup:');
  parsedEnv.error.issues.forEach((issue) => {
    console.error(`   - [${issue.path.join('.')}] : ${issue.message}`);
  });
  process.exit(1);
}

// 2. Export validated environment-driven configs
export const config = {
  app: {
    port: parsedEnv.data.PORT,
    env: parsedEnv.data.NODE_ENV,
  },
  auth: {
    jwtAccessSecret: parsedEnv.data.JWT_ACCESS_SECRET,
    jwtRefreshSecret: parsedEnv.data.JWT_REFRESH_SECRET,
    jwtAccessExpiry: parsedEnv.data.JWT_ACCESS_EXPIRY,
    jwtRefreshExpiry: parsedEnv.data.JWT_REFRESH_EXPIRY,
  },
  pagination: {
    defaultLimit: parsedEnv.data.PAGINATION_DEFAULT_LIMIT,
    maxLimit: parsedEnv.data.PAGINATION_MAX_LIMIT,
  },
  queue: {
    redisUrl: parsedEnv.data.REDIS_URL,
  },
  judge0: {
    apiUrl: parsedEnv.data.JUDGE0_API_URL,
    callbackUrl: parsedEnv.data.JUDGE0_CALLBACK_URL,
  },
  logger: {
    level: parsedEnv.data.LOG_LEVEL,
  },
  dbUrl: parsedEnv.data.DATABASE_URL, // needed directly for pool bindings
};
export default config;
