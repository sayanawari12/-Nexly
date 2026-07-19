export interface RatingResult {
  rating: number;
  rd: number;
  volatility: number;
}

export interface RatingStrategy {
  calculate(
    currentRating: number,
    rd: number,
    volatility: number,
    opponentRatings: number[],
    opponentRDs: number[],
    outcomes: number[] // 1 for win, 0.5 for tie, 0 for loss
  ): RatingResult;
}

export interface SkillStats {
  level: number;
  solvedCount: number;
  attemptsCount: number;
  accuracy: number;
  growthRate: number;
  confidenceScore: number;
}

export interface ProfileSnapshotPayload {
  userId: string;
  username: string;
  rating: number;
  highestRating: number;
  contestsPlayed: number;
  rankName: string;
  totalSolves: number;
  acceptanceRate: number;
  streak: number;
  longestStreak: number;
  skills: Record<string, SkillStats>;
  achievements: Array<{
    key: string;
    name: string;
    description: string;
    unlockedAt: Date;
  }>;
}

// Event payload structures
export interface SubmissionAcceptedEvent {
  userId: string;
  problemId: string;
  submissionId: string;
  language: string;
  runtimeMs: number;
  memoryKb: number;
  category: string; // e.g. "Math", "Graphs"
  submittedAt: Date;
}

export interface RecommendationRequestEvent {
  userId: string;
  weakTopics: string[];
  currentRating: number;
  suggestedDifficulty: 'EASY' | 'MEDIUM' | 'HARD';
  requestedAt: Date;
}
