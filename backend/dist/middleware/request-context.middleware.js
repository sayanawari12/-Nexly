"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContextMiddleware = void 0;
const uuid_1 = require("uuid");
const context_1 = require("../utils/context");
const requestContextMiddleware = (req, res, next) => {
    // Use existing correlation ID or generate a new UUID
    const correlationId = req.headers['x-correlation-id'] || (0, uuid_1.v4)();
    // Set headers
    req.headers['x-correlation-id'] = correlationId;
    res.setHeader('x-correlation-id', correlationId);
    const store = {
        requestId: correlationId,
    };
    // Run the next middlewares/handlers within this async storage scope
    context_1.contextStore.run(store, () => {
        next();
    });
};
exports.requestContextMiddleware = requestContextMiddleware;
