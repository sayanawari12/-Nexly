import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { logger } from './utils/logger';
import { requestContextMiddleware } from './middleware/request-context.middleware';
import { errorHandlerMiddleware } from './middleware/error-handler.middleware';
import { NotFoundError } from './errors';
import { RequestContext } from './utils/context';
import authRoutes from './modules/auth/auth.routes';
import problemRoutes from './modules/problem/problem.routes';
import submissionRoutes from './modules/submission/routes/submission.routes';
import contestRoutes from './modules/contest/contest.routes';
import profileRoutes from './modules/profile/profile.routes';
import operationsRoutes from './modules/operations/routes/operations.routes';
import { maintenanceModeGuard } from './middleware/maintenance.middleware';

const app: Express = express();

// 1. Logging Transport Setup
const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',
  {
    stream: {
      write: (message) => logger.info({ type: 'http', details: message.trim() }),
    },
  }
);

// 2. Global Security & Parsing Middlewares
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestContextMiddleware);
app.use(morganMiddleware);

// 3. Root & Health check routes
app.get('/', (req: Request, res: Response) => {
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

app.get('/api/v1/health', (req: Request, res: Response) => {
  const requestId = RequestContext.getRequestId() || 'unknown';
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
app.use(maintenanceModeGuard); // Catch system locks or read-only mode transitions

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/submissions', submissionRoutes);
app.use('/api/v1/contests', contestRoutes);
app.use('/api/v1/profiles', profileRoutes);
app.use('/api/v1/operations', operationsRoutes);

// 5. Catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Cannot ${req.method} ${req.originalUrl}`));
});

// 5. Global Exception Handler
app.use(errorHandlerMiddleware);

export default app;
