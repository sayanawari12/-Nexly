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

  // Comprehensive diagnostic logging at the very start of the error handler
  console.error("==================== RUNTIME EXCEPTION TRACE ====================");
  console.error("Timestamp:      ", timestamp);
  console.error("HTTP Method:    ", req.method);
  console.error("Request Path:   ", req.originalUrl);
  console.error("Request ID:     ", requestId);
  console.error("Exception Class:", err.constructor ? err.constructor.name : 'UnknownClass');
  console.error("Exception Name: ", err.name);
  console.error("Error Message:  ", err.message);
  console.error("Full Stack:\n", err.stack);
  if ((err as any).cause) {
    console.error("err.cause:\n", (err as any).cause);
  }
  console.error("Raw Error Object:", err);
  console.error("=================================================================");

  logger.error(
    {
      err,
      requestId,
      method: req.method,
      path: req.originalUrl,
      timestamp,
      exceptionClass: err.constructor ? err.constructor.name : 'UnknownClass',
      exceptionName: err.name,
      message: err.message,
      stack: err.stack,
      cause: (err as any).cause || null,
    },
    "UNHANDLED_HTTP_EXCEPTION"
  );

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
