import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors';
import { logger } from '../utils/logger';
import { RequestContext } from '../utils/context';
import { HTTP_STATUS } from '../constants/http-status';
import { ERROR_CODES } from '../constants/errors';

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void => {
  const requestId = RequestContext.getRequestId() || 'unknown';
  const timestamp = new Date().toISOString();

  // 1. AppError operational exceptions
  if (err instanceof AppError) {
    logger.warn({
      message: err.message,
      code: err.code,
      statusCode: err.statusCode,
      details: err.details,
    });

    res.status(err.statusCode).json({
      success: false,
      data: null,
      error: {
        code: err.code,
        message: err.message,
        details: err.details,
      },
      meta: {
        requestId,
        timestamp,
      },
    });
    return;
  }

  // 2. Unhandled runtime/system errors (non-operational)
  logger.error({
    message: err.message,
    stack: err.stack,
  });

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    data: null,
    error: {
      code: ERROR_CODES.INTERNAL_SERVER_ERROR,
      message: 'An unexpected internal server error occurred.',
      details: null,
    },
    meta: {
      requestId,
      timestamp,
    },
  });
};

export default errorHandlerMiddleware;
