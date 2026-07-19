import { z } from 'zod';
import { ContestType, ScoringType } from '@prisma/client';

export const ContestConfigSchema = z.object({
  allowPractice: z.boolean().default(true),
  allowClarifications: z.boolean().default(true),
  showLeaderboard: z.boolean().default(true),
  showSubmissions: z.boolean().default(true),
  freezeLeaderboard: z.boolean().default(true),
  enableVirtualParticipation: z.boolean().default(false),
  allowUpsolve: z.boolean().default(true),
  submissionCooldown: z.number().nonnegative().default(15),
  maxAttempts: z.number().positive().optional(),
  lateRegistration: z.boolean().default(false),
});

export const CreateContestSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  freezeTime: z.string().datetime().optional(),
  unfreezeTime: z.string().datetime().optional(),
  type: z.nativeEnum(ContestType).default(ContestType.PUBLIC),
  scoringType: z.nativeEnum(ScoringType).default(ScoringType.ICPC),
  inviteCode: z.string().max(50).optional(),
  maxParticipants: z.number().int().positive().optional(),
  config: ContestConfigSchema.default({
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
  problems: z.array(z.object({
    problemId: z.string().uuid(),
    points: z.number().int().positive().default(100),
    orderIndex: z.number().int().nonnegative().default(0),
  })).default([]),
}).refine((data) => {
  const start = new Date(data.startTime).getTime();
  const end = new Date(data.endTime).getTime();
  return start < end;
}, {
  message: "End time must be after start time.",
  path: ["endTime"],
});

export const RegisterContestSchema = z.object({
  inviteCode: z.string().max(50).optional(),
});

export const AskQuestionSchema = z.object({
  question: z.string().min(5).max(1000),
});

export const AnswerQuestionSchema = z.object({
  answer: z.string().min(1).max(2000),
  isPublic: z.boolean().default(false),
});

export const CreateAnnouncementSchema = z.object({
  title: z.string().min(3).max(255),
  content: z.string().min(5).max(5000),
});
