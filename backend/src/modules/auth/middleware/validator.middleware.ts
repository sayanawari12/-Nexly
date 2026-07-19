import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ValidationError } from '../../../errors';

/**
 * Express middleware that parses the request body against a Zod schema.
 * Triggers a ValidationError if schemas reject the inputs.
 * 
 * @param schema Zod validation schema
 */
export const validateBody = (schema: ZodSchema): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const issueDetails = result.error.issues.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }));
      
      next(new ValidationError('Request body validation failed', issueDetails));
      return;
    }

    // Assign parsed data back to body
    req.body = result.data;
    next();
  };
};
