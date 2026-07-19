import { ContestStatus, ContestType, ScoringType } from '@prisma/client';

export interface ContestConfig {
  allowPractice: boolean;
  allowClarifications: boolean;
  showLeaderboard: boolean;
  showSubmissions: boolean;
  freezeLeaderboard: boolean;
  enableVirtualParticipation: boolean;
  allowUpsolve: boolean;
  submissionCooldown: number; // in seconds
  maxAttempts?: number;
  lateRegistration: boolean;
}

export interface ProblemScoreDetail {
  problemId: string;
  solved: boolean;
  score: number;
  attempts: number;
  penalty: number; // in minutes from start
  firstSolvedAt?: string; // ISO timestamp
}

export interface LeaderboardRankEntry {
  userId: string;
  username: string;
  rank: number;
  solvedCount: number;
  totalPoints: number;
  totalPenalty: number;
  problemDetails: Record<string, ProblemScoreDetail>;
}

export interface ContestEventEnvelope<T> {
  eventId: string;
  correlationId: string;
  schemaVersion: number;
  timestamp: string;
  contestId: string;
  sequenceNumber: number;
  payload: T;
}
