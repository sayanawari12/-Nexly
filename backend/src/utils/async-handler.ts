import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Higher-order Express wrapper utility that catches any promise rejection or 
 * throw and forwards it safely to the global error handling middleware.
 */
export const asyncHandler = (fn: RequestHandler): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
