"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = void 0;
const context_1 = require("./context");
exports.ApiResponse = {
    /**
     * Generates a standard success response envelope.
     */
    success(data) {
        return {
            success: true,
            data,
            error: null,
            meta: {
                requestId: context_1.RequestContext.getRequestId() || 'unknown',
                timestamp: new Date().toISOString(),
            },
        };
    },
    /**
     * Generates a standard paginated success response envelope containing list metadata.
     */
    paginated(data, pagination) {
        return {
            success: true,
            data,
            error: null,
            meta: {
                requestId: context_1.RequestContext.getRequestId() || 'unknown',
                timestamp: new Date().toISOString(),
                pagination,
            },
        };
    },
};
exports.default = exports.ApiResponse;
