import { Contest, Submission, SubmissionStatus } from '@prisma/client';
import { ProblemScoreDetail } from '../types';

export class ScoringService {
  /**
   * Evaluates a user's standings under ICPC rules:
   * - Rank Criteria: Solved count descending, then total penalty ascending.
   * - Penalty: Time elapsed from contest start (in minutes) for first ACCEPTED run + 20 min per WRONG_ANSWER/TLE/MLE/RTE before first ACCEPTED.
   * - Compile errors do not count as wrong attempts.
   */
  public calculateIcpcScore(
    contest: Contest,
    submissions: (Submission & { problemId: string })[]
  ): { solvedCount: number; totalPenalty: number; problemDetails: Record<string, ProblemScoreDetail> } {
    const contestStartMs = new Date(contest.startTime).getTime();
    const contestEndMs = new Date(contest.endTime).getTime();
    
    // Group submissions by problem
    const subsByProblem: Record<string, (Submission & { problemId: string })[]> = {};
    for (const sub of submissions) {
      // Filter out submissions outside the active contest window
      const subTimeMs = new Date(sub.createdAt).getTime();
      if (subTimeMs < contestStartMs || subTimeMs > contestEndMs) {
        continue;
      }
      
      if (!subsByProblem[sub.problemId]) {
        subsByProblem[sub.problemId] = [];
      }
      subsByProblem[sub.problemId].push(sub);
    }

    const problemDetails: Record<string, ProblemScoreDetail> = {};
    let solvedCount = 0;
    let totalPenalty = 0;

    // Evaluate each problem
    for (const problemId of Object.keys(subsByProblem)) {
      const subs = subsByProblem[problemId].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      let solved = false;
      let attempts = 0;
      let penalty = 0;
      let firstSolvedAt: string | undefined;

      for (const sub of subs) {
        if (solved) {
          // Submissions after already solved do not affect penalty or solved status in standard ICPC
          continue;
        }

        if (sub.status === SubmissionStatus.ACCEPTED) {
          solved = true;
          const elapsedMinutes = Math.floor((new Date(sub.createdAt).getTime() - contestStartMs) / 60000);
          penalty = elapsedMinutes + attempts * 20;
          firstSolvedAt = new Date(sub.createdAt).toISOString();
          solvedCount++;
          totalPenalty += penalty;
        } else if (
          sub.status === SubmissionStatus.WRONG_ANSWER ||
          sub.status === SubmissionStatus.TIME_LIMIT_EXCEEDED ||
          sub.status === SubmissionStatus.MEMORY_LIMIT_EXCEEDED ||
          sub.status === SubmissionStatus.RUNTIME_ERROR
        ) {
          attempts++;
        }
      }

      problemDetails[problemId] = {
        problemId,
        solved,
        score: solved ? 100 : 0,
        attempts,
        penalty,
        firstSolvedAt,
      };
    }

    return {
      solvedCount,
      totalPenalty,
      problemDetails,
    };
  }

  /**
   * Evaluates a user's standings under IOI rules:
   * - Rank Criteria: Sum of maximum points across all problems descending, then last points-gaining submission timestamp ascending.
   * - Max points are computed as maximum score obtained on any attempt per problem.
   */
  public calculateIoiScore(
    contest: Contest,
    submissions: (Submission & { problemId: string })[],
    problemPointsWeights: Record<string, number>
  ): { totalPoints: number; problemDetails: Record<string, ProblemScoreDetail> } {
    const contestStartMs = new Date(contest.startTime).getTime();
    const contestEndMs = new Date(contest.endTime).getTime();

    // Group submissions by problem
    const subsByProblem: Record<string, (Submission & { problemId: string })[]> = {};
    for (const sub of submissions) {
      const subTimeMs = new Date(sub.createdAt).getTime();
      if (subTimeMs < contestStartMs || subTimeMs > contestEndMs) {
        continue;
      }
      
      if (!subsByProblem[sub.problemId]) {
        subsByProblem[sub.problemId] = [];
      }
      subsByProblem[sub.problemId].push(sub);
    }

    const problemDetails: Record<string, ProblemScoreDetail> = {};
    let totalPoints = 0;

    for (const problemId of Object.keys(subsByProblem)) {
      const subs = subsByProblem[problemId].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      let maxScore = 0;
      let attempts = 0;
      let firstSolvedAt: string | undefined;

      const baseWeight = problemPointsWeights[problemId] || 100;

      for (const sub of subs) {
        attempts++;
        if (sub.status === SubmissionStatus.ACCEPTED) {
          if (baseWeight > maxScore) {
            maxScore = baseWeight;
            firstSolvedAt = new Date(sub.createdAt).toISOString();
          }
        } else {
          // Non-ACCEPTED yields 0.
        }
      }

      problemDetails[problemId] = {
        problemId,
        solved: maxScore === baseWeight,
        score: maxScore,
        attempts,
        penalty: 0,
        firstSolvedAt,
      };

      totalPoints += maxScore;
    }

    return {
      totalPoints,
      problemDetails,
    };
  }
}
export default ScoringService;
