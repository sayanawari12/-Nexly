"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const errors_1 = require("../../../errors");
/**
 * Express middleware that parses the request body against a Zod schema.
 * Triggers a ValidationError if schemas reject the inputs.
 *
 * @param schema Zod validation schema
 */
const validateBody = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const issueDetails = result.error.issues.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            next(new errors_1.ValidationError('Request body validation failed', issueDetails));
            return;
        }
        // Assign parsed data back to body
        req.body = result.data;
        next();
    };
};
exports.validateBody = validateBody;
