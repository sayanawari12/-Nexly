"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnnouncementSchema = exports.AnswerQuestionSchema = exports.AskQuestionSchema = exports.RegisterContestSchema = exports.CreateContestSchema = exports.ContestConfigSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.ContestConfigSchema = zod_1.z.object({
    allowPractice: zod_1.z.boolean().default(true),
    allowClarifications: zod_1.z.boolean().default(true),
    showLeaderboard: zod_1.z.boolean().default(true),
    showSubmissions: zod_1.z.boolean().default(true),
    freezeLeaderboard: zod_1.z.boolean().default(true),
    enableVirtualParticipation: zod_1.z.boolean().default(false),
    allowUpsolve: zod_1.z.boolean().default(true),
    submissionCooldown: zod_1.z.number().nonnegative().default(15),
    maxAttempts: zod_1.z.number().positive().optional(),
    lateRegistration: zod_1.z.boolean().default(false),
});
exports.CreateContestSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(255),
    description: zod_1.z.string().optional(),
    startTime: zod_1.z.string().datetime(),
    endTime: zod_1.z.string().datetime(),
    freezeTime: zod_1.z.string().datetime().optional(),
    unfreezeTime: zod_1.z.string().datetime().optional(),
    type: zod_1.z.nativeEnum(client_1.ContestType).default(client_1.ContestType.PUBLIC),
    scoringType: zod_1.z.nativeEnum(client_1.ScoringType).default(client_1.ScoringType.ICPC),
    inviteCode: zod_1.z.string().max(50).optional(),
    maxParticipants: zod_1.z.number().int().positive().optional(),
    config: exports.ContestConfigSchema.default({
        allowPractice: true,
        allowClarifications: true,
        showLeaderboard: true,
        showSubmissions: true,
        freezeLeaderboard: true,
        enableVirtualParticipation: false,
        allowUpsolve: true,
        submissionCooldown: 15,
        lateRegistration: false,
    }),
    problems: zod_1.z.array(zod_1.z.object({
        problemId: zod_1.z.string().uuid(),
        points: zod_1.z.number().int().positive().default(100),
        orderIndex: zod_1.z.number().int().nonnegative().default(0),
    })).default([]),
}).refine((data) => {
    const start = new Date(data.startTime).getTime();
    const end = new Date(data.endTime).getTime();
    return start < end;
}, {
    message: "End time must be after start time.",
    path: ["endTime"],
});
exports.RegisterContestSchema = zod_1.z.object({
    inviteCode: zod_1.z.string().max(50).optional(),
});
exports.AskQuestionSchema = zod_1.z.object({
    question: zod_1.z.string().min(5).max(1000),
});
exports.AnswerQuestionSchema = zod_1.z.object({
    answer: zod_1.z.string().min(1).max(2000),
    isPublic: zod_1.z.boolean().default(false),
});
exports.CreateAnnouncementSchema = zod_1.z.object({
    title: zod_1.z.string().min(3).max(255),
    content: zod_1.z.string().min(5).max(5000),
});
