"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.batchTestCasesSchema = exports.updateTestCaseSchema = exports.createTestCaseSchema = exports.updateProblemSchema = exports.createProblemSchema = void 0;
const zod_1 = require("zod");
exports.createProblemSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(3, 'Title must be at least 3 characters long.')
        .max(100, 'Title must be at most 100 characters long.'),
    description: zod_1.z.string().min(10, 'Description must contain at least 10 characters.'),
    explanation: zod_1.z.string().optional(),
    examples: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.coerce.number(),
        input: zod_1.z.string(),
        output: zod_1.z.string(),
        explanation: zod_1.z.string().optional(),
    })).optional(),
    constraints: zod_1.z.string().min(1, 'Constraints are required.'),
    inputFormat: zod_1.z.string().optional(),
    outputFormat: zod_1.z.string().optional(),
    hints: zod_1.z.array(zod_1.z.string()).optional(),
    notes: zod_1.z.string().optional(),
    difficulty: zod_1.z.enum(['EASY', 'MEDIUM', 'HARD']).default('EASY'),
    visibility: zod_1.z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
    tags: zod_1.z.array(zod_1.z.string()).default([]),
    timeLimit: zod_1.z.number().positive('Time limit must be positive.').default(5.0),
    memoryLimit: zod_1.z.number().int().positive('Memory limit must be positive.').default(128000),
});
exports.updateProblemSchema = exports.createProblemSchema.partial();
exports.createTestCaseSchema = zod_1.z.object({
    input: zod_1.z.string().min(1, 'Input is required.'),
    expectedOutput: zod_1.z.string().min(1, 'Expected output is required.'),
    isSample: zod_1.z.boolean().default(false),
    orderIndex: zod_1.z.number().int().default(0),
});
exports.updateTestCaseSchema = exports.createTestCaseSchema.partial();
exports.batchTestCasesSchema = zod_1.z.object({
    testCases: zod_1.z.array(exports.createTestCaseSchema).min(1, 'Must submit at least 1 test case.'),
});
