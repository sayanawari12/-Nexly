import { z } from 'zod';

export const UpdatePreferenceSchema = z.object({
  enableEmail: z.boolean().optional(),
  enablePush: z.boolean().optional(),
  enableWebsocket: z.boolean().optional(),
  marketingOptOut: z.boolean().optional(),
});

export const GetLeaderboardSchema = z.object({
  type: z.enum(['rating', 'solves']).default('rating'),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const GetSeasonalLeaderboardSchema = z.object({
  seasonId: z.string().uuid(),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).default(0),
});

export const GetLeaderboardAroundUserSchema = z.object({
  type: z.enum(['rating', 'solves']).default('rating'),
  limitAroundUser: z.coerce.number().int().min(1).max(25).default(5),
});

export type UpdatePreferenceInput = z.infer<typeof UpdatePreferenceSchema>;
export type GetLeaderboardInput = z.infer<typeof GetLeaderboardSchema>;
export type GetSeasonalLeaderboardInput = z.infer<typeof GetSeasonalLeaderboardSchema>;
export type GetLeaderboardAroundUserInput = z.infer<typeof GetLeaderboardAroundUserSchema>;
