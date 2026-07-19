import { PrismaClient, Contest, ContestProblem, ContestParticipant, ContestSubmission, ContestScore, ContestLeaderboardSnapshot, ContestClarification, ContestAnnouncement, ContestAuditLog, ContestStatus } from '@prisma/client';
import { prisma } from '../../../config/database';

export class ContestRepository {
  private readonly db: PrismaClient = prisma;

  /**
   * Creates a new Contest with transactional problem mapping
   */
  public async createContest(
    data: any,
    problemIds: { problemId: string; points: number; orderIndex: number }[]
  ): Promise<Contest> {
    return this.db.$transaction(async (tx) => {
      const contest = await tx.contest.create({
        data: {
          ...data,
          version: 0,
        },
      });

      if (problemIds.length > 0) {
        await tx.contestProblem.createMany({
          data: problemIds.map((p) => ({
            contestId: contest.id,
            problemId: p.problemId,
            points: p.points,
            orderIndex: p.orderIndex,
          })),
        });
      }

      return contest;
    });
  }

  /**
   * Retrieves a Contest by ID, including its associated problems
   */
  public async getContestById(id: string): Promise<(Contest & { problems: ContestProblem[] }) | null> {
    return this.db.contest.findUnique({
      where: { id },
      include: {
        problems: {
          orderBy: { orderIndex: 'asc' },
        },
      },
    }) as any;
  }

  /**
   * Retrieves all contests matching optional visibility or status criteria
   */
  public async listContests(filters: { status?: ContestStatus }): Promise<Contest[]> {
    return this.db.contest.findMany({
      where: filters,
      orderBy: { startTime: 'desc' },
    });
  }

  /**
   * Safe state transition utilizing Optimistic Concurrency Control (Compare-And-Swap)
   */
  public async transitionContestStatus(
    id: string,
    expectedStatus: ContestStatus,
    targetStatus: ContestStatus,
    currentVersion: number
  ): Promise<boolean> {
    const result = await this.db.contest.updateMany({
      where: {
        id,
        status: expectedStatus,
        version: currentVersion,
      },
      data: {
        status: targetStatus,
        version: { increment: 1 },
      },
    });

    return result.count > 0;
  }

  /**
   * Registers a participant to a contest
   */
  public async registerParticipant(contestId: string, userId: string, approved = true): Promise<ContestParticipant> {
    return this.db.contestParticipant.create({
      data: {
        contestId,
        userId,
        approved,
      },
    });
  }

  /**
   * Retrieves registration for a participant
   */
  public async getParticipant(contestId: string, userId: string): Promise<ContestParticipant | null> {
    return this.db.contestParticipant.findUnique({
      where: {
        contestId_userId: { contestId, userId },
      },
    });
  }

  /**
   * Links a standard submission to a contest context
   */
  public async linkSubmission(contestId: string, userId: string, problemId: string, submissionId: string): Promise<ContestSubmission> {
    return this.db.contestSubmission.create({
      data: {
        contestId,
        userId,
        problemId,
        submissionId,
      },
    });
  }

  /**
   * Upsert score for a contest participant (thread-safe transaction)
   */
  public async upsertScore(
    contestId: string,
    userId: string,
    solvedCount: number,
    totalPoints: number,
    totalPenalty: number,
    problemDetails: any
  ): Promise<ContestScore> {
    return this.db.contestScore.upsert({
      where: {
        contestId_userId: { contestId, userId },
      },
      create: {
        contestId,
        userId,
        solvedCount,
        totalPoints,
        totalPenalty,
        problemDetails,
      },
      update: {
        solvedCount,
        totalPoints,
        totalPenalty,
        problemDetails,
      },
    });
  }

  /**
   * Fetches active score entries for a contest
   */
  public async getScoresByContest(contestId: string): Promise<ContestScore[]> {
    return this.db.contestScore.findMany({
      where: { contestId },
      include: {
        user: {
          select: { username: true },
        },
      },
    });
  }

  /**
   * Saves a permanent historical snapshot of the leaderboard standings
   */
  public async createLeaderboardSnapshot(contestId: string, rankings: any[], isFrozen: boolean): Promise<ContestLeaderboardSnapshot> {
    return this.db.contestLeaderboardSnapshot.create({
      data: {
        contestId,
        snapshotAt: new Date(),
        rankings,
        isFrozen,
      },
    });
  }

  /**
   * Retrieves the latest snapshot for a contest (e.g. latest frozen view)
   */
  public async getLatestSnapshot(contestId: string, isFrozen?: boolean): Promise<ContestLeaderboardSnapshot | null> {
    const whereClause: any = { contestId };
    if (isFrozen !== undefined) {
      whereClause.isFrozen = isFrozen;
    }

    return this.db.contestLeaderboardSnapshot.findFirst({
      where: whereClause,
      orderBy: { snapshotAt: 'desc' },
    });
  }

  /**
   * Creates a clarification request
   */
  public async createClarification(contestId: string, userId: string, question: string): Promise<ContestClarification> {
    return this.db.contestClarification.create({
      data: {
        contestId,
        userId,
        question,
      },
    });
  }

  /**
   * Answers a clarification request (Admin operation)
   */
  public async answerClarification(
    id: string,
    answer: string,
    answeredBy: string,
    isPublic: boolean
  ): Promise<ContestClarification> {
    return this.db.contestClarification.update({
      where: { id },
      data: {
        answer,
        answeredBy,
        isPublic,
      },
    });
  }

  /**
   * Lists clarifications for a contest (with filtering for public/private logic)
   */
  public async listClarifications(contestId: string, userId?: string): Promise<ContestClarification[]> {
    if (userId) {
      // User sees all public clarifications + their own private ones
      return this.db.contestClarification.findMany({
        where: {
          contestId,
          OR: [
            { isPublic: true },
            { userId },
          ],
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    // Admins see everything
    return this.db.contestClarification.findMany({
      where: { contestId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Creates a contest announcement
   */
  public async createAnnouncement(contestId: string, title: string, content: string): Promise<ContestAnnouncement> {
    return this.db.contestAnnouncement.create({
      data: {
        contestId,
        title,
        content,
      },
    });
  }

  /**
   * Lists announcements for a contest
   */
  public async listAnnouncements(contestId: string): Promise<ContestAnnouncement[]> {
    return this.db.contestAnnouncement.findMany({
      where: { contestId },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Logs a security or workflow action for auditing
   */
  public async logAudit(contestId: string, userId: string | null, action: string, metadata?: any): Promise<ContestAuditLog> {
    return this.db.contestAuditLog.create({
      data: {
        contestId,
        userId,
        action,
        metadata,
      },
    });
  }
}
