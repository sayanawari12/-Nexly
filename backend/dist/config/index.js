"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const zod_1 = require("zod");
// 1. Pre-load env before validation checks
dotenv_1.default.config();
const envSchema = zod_1.z.object({
    PORT: zod_1.z.coerce.number().default(5000),
    NODE_ENV: zod_1.z.enum(['development', 'production', 'test']).default('development'),
    DATABASE_URL: zod_1.z.string().url(),
    REDIS_URL: zod_1.z.string().url(),
    JWT_ACCESS_SECRET: zod_1.z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters'),
    JWT_REFRESH_SECRET: zod_1.z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_ACCESS_EXPIRY: zod_1.z.string().default('15m'),
    JWT_REFRESH_EXPIRY: zod_1.z.string().default('7d'),
    LOG_LEVEL: zod_1.z.string().default('info'),
    PAGINATION_DEFAULT_LIMIT: zod_1.z.coerce.number().default(20),
    PAGINATION_MAX_LIMIT: zod_1.z.coerce.number().default(100),
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
exports.config = {
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
    logger: {
        level: parsedEnv.data.LOG_LEVEL,
    },
    dbUrl: parsedEnv.data.DATABASE_URL, // needed directly for pool bindings
};
exports.default = exports.config;
