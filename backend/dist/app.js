"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = require("./utils/logger");
const request_context_middleware_1 = require("./middleware/request-context.middleware");
const error_handler_middleware_1 = require("./middleware/error-handler.middleware");
const errors_1 = require("./errors");
const context_1 = require("./utils/context");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const problem_routes_1 = __importDefault(require("./modules/problem/problem.routes"));
const submission_routes_1 = __importDefault(require("./modules/submission/routes/submission.routes"));
const contest_routes_1 = __importDefault(require("./modules/contest/contest.routes"));
const profile_routes_1 = __importDefault(require("./modules/profile/profile.routes"));
const operations_routes_1 = __importDefault(require("./modules/operations/routes/operations.routes"));
const compiler_routes_1 = __importDefault(require("./modules/compiler/routes/compiler.routes"));
const maintenance_middleware_1 = require("./middleware/maintenance.middleware");
const app = (0, express_1.default)();
// 1. Logging Transport Setup
const morganMiddleware = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', {
    stream: {
        write: (message) => logger_1.logger.info({ type: 'http', details: message.trim() }),
    },
});
// 2. Global Security & Parsing Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Collect allowed origins from environment and hardcoded safe project defaults
        const envOrigins = (process.env.ALLOWED_ORIGINS || process.env.FRONTEND_URL || '')
            .split(',')
            .map((url) => url.trim().replace(/\/$/, ''))
            .filter(Boolean);
        const safeOrigins = [
            // Local development origins
            'http://localhost:3000',
            'http://localhost:5173',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            // Production frontend domain (Nexly — primary)
            'https://nexly-labs.vercel.app',
            // Legacy production frontend domains (kept for transition period)
            'https://bca-department-website.vercel.app',
            'https://bca-web.vercel.app',
            // Firebase Hosting domains (project-specific — do not change)
            'https://bca-department-website.firebaseapp.com',
            'https://bca-department-website.web.app',
            ...envOrigins,
        ];
        // Allow requests with no origin (e.g. mobile apps, curl, Postman, internal health checks)
        if (!origin || safeOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error(`CORS: Origin '${origin}' is not allowed.`));
        }
    },
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(request_context_middleware_1.requestContextMiddleware);
app.use(morganMiddleware);
// 3. Root & Health check routes
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        service: 'BCA Department Backend API',
        version: '1.0.0',
        environment: process.env.NODE_ENV,
        status: 'Running',
        health: '/api/v1/health',
        timestamp: new Date().toISOString(),
    });
});
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.get('/api/v1/health', (req, res) => {
    const requestId = context_1.RequestContext.getRequestId() || 'unknown';
    res.status(200).json({
        success: true,
        data: {
            status: 'UP',
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
        },
        error: null,
        meta: {
            requestId,
            timestamp: new Date().toISOString(),
        },
    });
});
// 4. API Domain Routers Mounting
app.use(maintenance_middleware_1.maintenanceModeGuard); // Catch system locks or read-only mode transitions
app.use('/api/v1/auth', auth_routes_1.default);
app.use('/api/v1/problems', problem_routes_1.default);
app.use('/api/v1/submissions', submission_routes_1.default);
app.use('/api/v1/contests', contest_routes_1.default);
app.use('/api/v1/profiles', profile_routes_1.default);
app.use('/api/v1/operations', operations_routes_1.default);
app.use('/api/v1/compiler', compiler_routes_1.default);
app.use('/compiler', compiler_routes_1.default);
app.use('/api/compiler', compiler_routes_1.default);
// 5. Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(new errors_1.NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});
// 5. Global Exception Handler
app.use(error_handler_middleware_1.errorHandlerMiddleware);
exports.default = app;
