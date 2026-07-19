import { z } from 'zod';

export const createSubmissionSchema = z.object({
  problemId: z.string().uuid('Invalid problem ID format.'),
  languageId: z.string().uuid('Invalid language ID format.'),
  sourceCode: z
    .string()
    .min(1, 'Source code cannot be empty.')
    .max(128 * 1024, 'Source code size exceeds maximum limit of 128KB.'),
  contestId: z.string().uuid('Invalid contest ID format.').optional(),
});

export type CreateSubmissionInput = z.infer<typeof createSubmissionSchema>;
