"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.InternalServerError = exports.ExternalServiceError = exports.DatabaseError = exports.ConflictError = exports.NotFoundError = exports.ForbiddenError = exports.UnauthorizedError = exports.ValidationError = exports.AppError = void 0;
const errors_1 = require("../constants/errors");
const http_status_1 = require("../constants/http-status");
class AppError extends Error {
    statusCode;
    code;
    isOperational;
    details;
    constructor(message, statusCode = http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, code = errors_1.ERROR_CODES.INTERNAL_SERVER_ERROR, isOperational = true, details = null) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.isOperational = isOperational;
        this.details = details;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
class ValidationError extends AppError {
    constructor(message = 'Validation failed', details = null) {
        super(message, http_status_1.HTTP_STATUS.BAD_REQUEST, errors_1.ERROR_CODES.VALIDATION_ERROR, true, details);
    }
}
exports.ValidationError = ValidationError;
class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized access') {
        super(message, http_status_1.HTTP_STATUS.UNAUTHORIZED, errors_1.ERROR_CODES.UNAUTHORIZED, true);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ForbiddenError extends AppError {
    constructor(message = 'Access forbidden') {
        super(message, http_status_1.HTTP_STATUS.FORBIDDEN, errors_1.ERROR_CODES.FORBIDDEN, true);
    }
}
exports.ForbiddenError = ForbiddenError;
class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, http_status_1.HTTP_STATUS.NOT_FOUND, errors_1.ERROR_CODES.NOT_FOUND, true);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends AppError {
    constructor(message = 'Resource conflict error') {
        super(message, http_status_1.HTTP_STATUS.CONFLICT, errors_1.ERROR_CODES.CONFLICT, true);
    }
}
exports.ConflictError = ConflictError;
class DatabaseError extends AppError {
    constructor(message = 'Database operation failed', details = null) {
        super(message, http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, errors_1.ERROR_CODES.DATABASE_ERROR, true, details);
    }
}
exports.DatabaseError = DatabaseError;
class ExternalServiceError extends AppError {
    constructor(message = 'External gateway communication error', details = null) {
        super(message, http_status_1.HTTP_STATUS.BAD_GATEWAY, errors_1.ERROR_CODES.EXTERNAL_SERVICE_ERROR, true, details);
    }
}
exports.ExternalServiceError = ExternalServiceError;
class InternalServerError extends AppError {
    constructor(message = 'Internal server error') {
        super(message, http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR, errors_1.ERROR_CODES.INTERNAL_SERVER_ERROR, false);
    }
}
exports.InternalServerError = InternalServerError;
class ServiceUnavailableError extends AppError {
    constructor(message = 'Service temporarily unavailable') {
        super(message, http_status_1.HTTP_STATUS.SERVICE_UNAVAILABLE, errors_1.ERROR_CODES.INTERNAL_SERVER_ERROR, true);
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
