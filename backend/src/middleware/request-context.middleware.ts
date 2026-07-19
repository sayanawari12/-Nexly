import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { contextStore } from '../utils/context';
import { RequestStore } from '../types';

export const requestContextMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Use existing correlation ID or generate a new UUID
  const correlationId = (req.headers['x-correlation-id'] as string) || uuidv4();
  
  // Set headers
  req.headers['x-correlation-id'] = correlationId;
  res.setHeader('x-correlation-id', correlationId);

  const store: RequestStore = {
    requestId: correlationId,
  };

  // Run the next middlewares/handlers within this async storage scope
  contextStore.run(store, () => {
    next();
  });
};
