import { ContestRepository } from '../repositories/contest.repository';
import { ScoringService } from './scoring.service';
import { LeaderboardService } from './leaderboard.service';
import { Contest, ContestStatus, ContestType, ContestParticipant, ContestScore, ContestClarification, ContestAnnouncement, Submission } from '@prisma/client';
import { prisma } from '../../../config/database';
import { ContestConfig } from '../types';
import { logger } from '../../../utils/logger';

export class ContestService {
  private readonly contestRepo = new ContestRepository();
  private readonly scoringService = new ScoringService();
  private readonly leaderboardService = new LeaderboardService();

  /**
   * Creates a new Contest
   */
  public async createContest(
    data: {
      title: string;
      description?: string;
      startTime: Date;
      endTime: Date;
      freezeTime?: Date;
      unfreezeTime?: Date;
      type: ContestType;
      scoringType: any;
      inviteCode?: string;
      maxParticipants?: number;
      config: ContestConfig;
      creatorId: string;
    },
    problemIds: { problemId: string; points: number; orderIndex: number }[]
  ): Promise<Contest> {
    const contest = await this.contestRepo.createContest({
      title: data.title,
      description: data.description || null,
      startTime: data.startTime,
      endTime: data.endTime,
      freezeTime: data.freezeTime || null,
      unfreezeTime: data.unfreezeTime || null,
      status: ContestStatus.DRAFT,
      type: data.type,
      scoringType: data.scoringType,
      inviteCode: data.inviteCode || null,
      maxParticipants: data.maxParticipants || null,
      config: data.config as any,
      creatorId: data.creatorId,
    }, problemIds);

    await this.contestRepo.logAudit(contest.id, data.creatorId, 'CREATED', { title: contest.title });

    return contest;
  }

  /**
   * Registers a user to a contest, checking constraints (invite code, max participants)
   */
  public async registerUser(
    contestId: string,
    userId: string,
    inviteCode?: string
  ): Promise<ContestParticipant> {
    const contest = await this.contestRepo.getContestById(contestId);
    if (!contest) {
      throw new Error('Contest not found');
    }

    if (contest.status === ContestStatus.ARCHIVED || contest.status === ContestStatus.ENDED) {
      throw new Error('Contest has ended');
    }

    // Check configuration late registration limits
    const config = contest.config as unknown as ContestConfig;
    if (new Date().getTime() > new Date(contest.startTime).getTime() && !config.lateRegistration) {
      throw new Error('Registration closed after contest started');
    }

    // Check private contest checks
    if (contest.type === ContestType.PRIVATE || contest.type === ContestType.INVITE_ONLY) {
      if (contest.inviteCode && contest.inviteCode !== inviteCode) {
        throw new Error('Invalid registration invite code');
      }
    }

    // Execute duplicate check, max capacity check, insertion, and audit logging inside an interactive transaction
    return prisma.$transaction(async (tx) => {
      const existing = await tx.contestParticipant.findUnique({
        where: {
          contestId_userId: { contestId, userId },
        },
      });
      if (existing) {
        return existing;
      }

      if (contest.maxParticipants) {
        const currentParticipants = await tx.contestParticipant.count({
          where: { contestId },
        });
        if (currentParticipants >= contest.maxParticipants) {
          throw new Error('Contest has reached maximum participant capacity');
        }
      }

      const participant = await tx.contestParticipant.create({
        data: {
          contestId,
          userId,
          approved: true,
        },
      });

      await tx.contestAuditLog.create({
        data: {
          contestId,
          userId,
          action: 'REGISTERED',
          metadata: {},
        },
      });

      return participant;
    });
  }

  /**
   * Submits code to a contest problem, checking participant eligibility and cooldowns
   */
  public async validateContestSubmission(
    contestId: string,
    userId: string,
    problemId: string
  ): Promise<void> {
    const contest = await this.contestRepo.getContestById(contestId);
    if (!contest) {
      throw new Error('Contest not found');
    }

    // Ensure contest is live
    if (contest.status !== ContestStatus.LIVE && contest.status !== ContestStatus.FROZEN) {
      throw new Error('Contest is not active');
    }

    // Ensure user is registered
    const participant = await this.contestRepo.getParticipant(contestId, userId);
    if (!participant) {
      throw new Error('User is not registered for this contest');
    }

    // Check submission cooldown frequency
    const config = contest.config as unknown as ContestConfig;
    if (config.submissionCooldown > 0) {
      const lastSub = await prisma.contestSubmission.findFirst({
        where: { contestId, userId },
        orderBy: { createdAt: 'desc' },
      });

      if (lastSub) {
        const diffSeconds = (new Date().getTime() - new Date(lastSub.createdAt).getTime()) / 1000;
        if (diffSeconds < config.submissionCooldown) {
          throw new Error(`Submission cooldown active. Wait ${Math.ceil(config.submissionCooldown - diffSeconds)}s.`);
        }
      }
    }

    // Check max attempts
    if (config.maxAttempts) {
      const attemptsCount = await prisma.contestSubmission.count({
        where: { contestId, userId, problemId },
      });
      if (attemptsCount >= config.maxAttempts) {
        throw new Error(`Maximum submission attempts of ${config.maxAttempts} exceeded for this problem.`);
      }
    }
  }

  /**
   * Recalculates scoring standings and updates Redis Sorted Set leaderboard cache.
   * Invoked automatically by worker pipelines on terminal submission updates.
   */
  public async processContestSubmissionUpdate(contestId: string, userId: string): Promise<void> {
    const contest = await this.contestRepo.getContestById(contestId);
    if (!contest) return;

    // Fetch all submissions of this user in this contest context
    const contestSubs = await prisma.contestSubmission.findMany({
      where: { contestId, userId },
      include: {
        submission: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { username: true },
    });
    const username = user?.username || 'Unknown';

    const submissions = contestSubs.map((cs) => cs.submission);

    let solvedCount = 0;
    let totalPoints = 0;
    let totalPenalty = 0;
    let problemDetails: any = {};
    let lastSubmissionTimeMs = 0;

    if (contest.scoringType === 'ICPC') {
      const res = this.scoringService.calculateIcpcScore(contest, submissions);
      solvedCount = res.solvedCount;
      totalPenalty = res.totalPenalty;
      problemDetails = res.problemDetails;

      Object.values(res.problemDetails).forEach((p) => {
        if (p.firstSolvedAt) {
          const time = new Date(p.firstSolvedAt).getTime();
          if (time > lastSubmissionTimeMs) {
            lastSubmissionTimeMs = time;
          }
        }
      });
    } else {
      // Fetch points weight mapping from ContestProblems
      const problemWeights: Record<string, number> = {};
      contest.problems.forEach((p) => {
        problemWeights[p.problemId] = p.points;
      });

      const res = this.scoringService.calculateIoiScore(contest, submissions, problemWeights);
      totalPoints = res.totalPoints;
      problemDetails = res.problemDetails;

      Object.values(res.problemDetails).forEach((p) => {
        if (p.firstSolvedAt) {
          const time = new Date(p.firstSolvedAt).getTime();
          if (time > lastSubmissionTimeMs) {
            lastSubmissionTimeMs = time;
          }
        }
      });
    }

    // Save final calculated score fields to DB
    await this.contestRepo.upsertScore(contestId, userId, solvedCount, totalPoints, totalPenalty, problemDetails);

    // Update Sorted Set cache inside Redis
    await this.leaderboardService.updateScore(
      contestId,
      userId,
      username,
      solvedCount,
      totalPoints,
      totalPenalty,
      problemDetails,
      contest.scoringType,
      lastSubmissionTimeMs
    );

    // Trigger realtime leaderboard broadcast
    const { ContestGateway } = require('../gateways/contest.gateway');
    const gateway = new ContestGateway();
    await gateway.broadcastLeaderboardUpdate(contestId, contest.status);
  }

  /**
   * Submits a clarification question
   */
  public async askQuestion(contestId: string, userId: string, question: string): Promise<ContestClarification> {
    const contest = await this.contestRepo.getContestById(contestId);
    if (!contest) {
      throw new Error('Contest not found');
    }

    const participant = await this.contestRepo.getParticipant(contestId, userId);
    if (!participant) {
      throw new Error('User is not registered for this contest');
    }

    return this.contestRepo.createClarification(contestId, userId, question);
  }

  /**
   * Responds to a clarification question (Admin only)
   */
  public async answerQuestion(
    contestId: string,
    clarificationId: string,
    answer: string,
    adminId: string,
    isPublic: boolean
  ): Promise<ContestClarification> {
    const res = await this.contestRepo.answerClarification(clarificationId, answer, adminId, isPublic);

    // Notify clients of the answered clarification
    const { ContestGateway } = require('../gateways/contest.gateway');
    const gateway = new ContestGateway();
    await gateway.broadcastClarificationResponse(contestId, res);

    return res;
  }

  /**
   * Creates an Announcement (Admin only)
   */
  public async createAnnouncement(contestId: string, title: string, content: string, adminId: string): Promise<ContestAnnouncement> {
    const announcement = await this.contestRepo.createAnnouncement(contestId, title, content);
    await this.contestRepo.logAudit(contestId, adminId, 'ANNOUNCEMENT_CREATED', { title });

    // Broadcast to websocket clients
    const { ContestGateway } = require('../gateways/contest.gateway');
    const gateway = new ContestGateway();
    await gateway.broadcastAnnouncement(contestId, announcement);

    return announcement;
  }
  /**
   * Lists clarifications for a contest
   */
  public async listClarifications(contestId: string, userId?: string): Promise<ContestClarification[]> {
    return this.contestRepo.listClarifications(contestId, userId);
  }
}
export default ContestService;
