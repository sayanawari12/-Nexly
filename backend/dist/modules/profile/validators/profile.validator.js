"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLeaderboardAroundUserSchema = exports.GetSeasonalLeaderboardSchema = exports.GetLeaderboardSchema = exports.UpdatePreferenceSchema = void 0;
const zod_1 = require("zod");
exports.UpdatePreferenceSchema = zod_1.z.object({
    enableEmail: zod_1.z.boolean().optional(),
    enablePush: zod_1.z.boolean().optional(),
    enableWebsocket: zod_1.z.boolean().optional(),
    marketingOptOut: zod_1.z.boolean().optional(),
});
exports.GetLeaderboardSchema = zod_1.z.object({
    type: zod_1.z.enum(['rating', 'solves']).default('rating'),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(50),
    offset: zod_1.z.coerce.number().int().min(0).default(0),
});
exports.GetSeasonalLeaderboardSchema = zod_1.z.object({
    seasonId: zod_1.z.string().uuid(),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(50),
    offset: zod_1.z.coerce.number().int().min(0).default(0),
});
exports.GetLeaderboardAroundUserSchema = zod_1.z.object({
    type: zod_1.z.enum(['rating', 'solves']).default('rating'),
    limitAroundUser: zod_1.z.coerce.number().int().min(1).max(25).default(5),
});
