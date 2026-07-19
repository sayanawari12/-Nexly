import { z } from 'zod';

export const createProblemSchema = z.object({
  title: z
    .string()
    .min(3, 'Title must be at least 3 characters long.')
    .max(100, 'Title must be at most 100 characters long.'),
  description: z.string().min(10, 'Description must contain at least 10 characters.'),
  explanation: z.string().optional(),
  examples: z.array(
    z.object({
      id: z.coerce.number(),
      input: z.string(),
      output: z.string(),
      explanation: z.string().optional(),
    })
  ).optional(),
  constraints: z.string().min(1, 'Constraints are required.'),
  inputFormat: z.string().optional(),
  outputFormat: z.string().optional(),
  hints: z.array(z.string()).optional(),
  notes: z.string().optional(),
  difficulty: z.enum(['EASY', 'MEDIUM', 'HARD']).default('EASY'),
  visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC'),
  tags: z.array(z.string()).default([]),
  timeLimit: z.number().positive('Time limit must be positive.').default(5.0),
  memoryLimit: z.number().int().positive('Memory limit must be positive.').default(128000),
});

export const updateProblemSchema = createProblemSchema.partial();

export const createTestCaseSchema = z.object({
  input: z.string().min(1, 'Input is required.'),
  expectedOutput: z.string().min(1, 'Expected output is required.'),
  isSample: z.boolean().default(false),
  orderIndex: z.number().int().default(0),
});

export const updateTestCaseSchema = createTestCaseSchema.partial();

export const batchTestCasesSchema = z.object({
  testCases: z.array(createTestCaseSchema).min(1, 'Must submit at least 1 test case.'),
});

export type CreateProblemInput = z.infer<typeof createProblemSchema>;
export type UpdateProblemInput = z.infer<typeof updateProblemSchema>;
export type CreateTestCaseInput = z.infer<typeof createTestCaseSchema>;
export type UpdateTestCaseInput = z.infer<typeof updateTestCaseSchema>;
export type BatchTestCasesInput = z.infer<typeof batchTestCasesSchema>;
