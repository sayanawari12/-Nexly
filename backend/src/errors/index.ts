import { ERROR_CODES, ErrorCode } from '../constants/errors';
import { HTTP_STATUS, HttpStatus } from '../constants/http-status';

export class AppError extends Error {
  public readonly statusCode: HttpStatus;
  public readonly code: ErrorCode;
  public readonly isOperational: boolean;
  public readonly details: any;

  constructor(
    message: string,
    statusCode: HttpStatus = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    code: ErrorCode = ERROR_CODES.INTERNAL_SERVER_ERROR,
    isOperational = true,
    details: any = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation failed', details: any = null) {
    super(message, HTTP_STATUS.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR, true, details);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED, true);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, HTTP_STATUS.NOT_FOUND, ERROR_CODES.NOT_FOUND, true);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource conflict error') {
    super(message, HTTP_STATUS.CONFLICT, ERROR_CODES.CONFLICT, true);
  }
}

export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed', details: any = null) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.DATABASE_ERROR, true, details);
  }
}

export class ExternalServiceError extends AppError {
  constructor(message = 'External gateway communication error', details: any = null) {
    super(message, HTTP_STATUS.BAD_GATEWAY, ERROR_CODES.EXTERNAL_SERVICE_ERROR, true, details);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR, ERROR_CODES.INTERNAL_SERVER_ERROR, false);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service temporarily unavailable') {
    super(message, HTTP_STATUS.SERVICE_UNAVAILABLE, ERROR_CODES.INTERNAL_SERVER_ERROR, true);
  }
}
