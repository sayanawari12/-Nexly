"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errors_1 = require("../errors");
const logger_1 = require("../utils/logger");
const context_1 = require("../utils/context");
const http_status_1 = require("../constants/http-status");
const errors_2 = require("../constants/errors");
const errorHandlerMiddleware = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    const requestId = context_1.RequestContext.getRequestId() || 'unknown';
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
    if (err.cause) {
        console.error("err.cause:\n", err.cause);
    }
    console.error("Raw Error Object:", err);
    console.error("=================================================================");
    logger_1.logger.error({
        err,
        requestId,
        method: req.method,
        path: req.originalUrl,
        timestamp,
        exceptionClass: err.constructor ? err.constructor.name : 'UnknownClass',
        exceptionName: err.name,
        message: err.message,
        stack: err.stack,
        cause: err.cause || null,
    }, "UNHANDLED_HTTP_EXCEPTION");
    // 1. AppError operational exceptions
    if (err instanceof errors_1.AppError) {
        logger_1.logger.warn({
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
    logger_1.logger.error({
        message: err.message,
        stack: err.stack,
    });
    res.status(http_status_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        data: null,
        error: {
            code: errors_2.ERROR_CODES.INTERNAL_SERVER_ERROR,
            message: 'An unexpected internal server error occurred.',
            details: null,
        },
        meta: {
            requestId,
            timestamp,
        },
    });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
exports.default = exports.errorHandlerMiddleware;
