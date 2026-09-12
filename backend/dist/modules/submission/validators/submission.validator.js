"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubmissionSchema = void 0;
const zod_1 = require("zod");
exports.createSubmissionSchema = zod_1.z.object({
    problemId: zod_1.z.string().uuid('Invalid problem ID format.'),
    languageId: zod_1.z.string().uuid('Invalid language ID format.'),
    sourceCode: zod_1.z
        .string()
        .min(1, 'Source code cannot be empty.')
        .max(128 * 1024, 'Source code size exceeds maximum limit of 128KB.'),
    contestId: zod_1.z.string().uuid('Invalid contest ID format.').optional(),
});
