import { Response } from 'express';
import { ContestService } from '../services/contest.service';
import { LeaderboardService } from '../services/leaderboard.service';
import { ApiResponse } from '../../../utils/response';
import { AuthenticatedRequest } from '../../auth/middleware/auth.middleware';
import { UnauthorizedError, ForbiddenError, NotFoundError } from '../../../errors';
import { ContestStatus } from '@prisma/client';
import { prisma } from '../../../config/database';

export class ContestController {
  private readonly contestService: ContestService;
  private readonly leaderboardService: LeaderboardService;

  constructor(
    contestService = new ContestService(),
    leaderboardService = new LeaderboardService()
  ) {
    this.contestService = contestService;
    this.leaderboardService = leaderboardService;
  }

  /**
   * Creates a new contest (Admin/Creator only)
   */
  public create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new ForbiddenError('Only admins can create contests.');
    }

    const { title, description, startTime, endTime, freezeTime, unfreezeTime, type, scoringType, inviteCode, maxParticipants, config, problems } = req.body;

    const contest = await this.contestService.createContest({
      title,
      description,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      freezeTime: freezeTime ? new Date(freezeTime) : undefined,
      unfreezeTime: unfreezeTime ? new Date(unfreezeTime) : undefined,
      type,
      scoringType,
      inviteCode,
      maxParticipants,
      config,
      creatorId: req.user.id,
    }, problems);

    res.status(201).json(ApiResponse.success(contest));
  };

  /**
   * Retrieves full details of a contest (verifying draft visibility limits)
   */
  public get = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const contest = await prisma.contest.findUnique({
      where: { id },
      include: {
        problems: {
          include: {
            problem: {
              select: { id: true, title: true, difficulty: true },
            },
          },
          orderBy: { orderIndex: 'asc' },
        },
      },
    });

    if (!contest) {
      throw new NotFoundError('Contest not found.');
    }

    // Block draft visibility for non-admin/creators
    if (contest.status === ContestStatus.DRAFT) {
      const isAuthorized = req.user && (req.user.role === 'ADMIN' || contest.creatorId === req.user.id);
      if (!isAuthorized) {
        throw new ForbiddenError('Access to draft contest details is restricted.');
      }
    }

    res.status(200).json(ApiResponse.success(contest));
  };

  /**
   * Lists all contests (filtering draft visibility limits)
   */
  public list = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const isUserAdmin = req.user?.role === 'ADMIN';
    const contests = await prisma.contest.findMany({
      where: isUserAdmin ? {} : {
        NOT: { status: ContestStatus.DRAFT },
      },
      orderBy: { startTime: 'desc' },
    });

    res.status(200).json(ApiResponse.success(contests));
  };

  /**
   * Registers a participant to a contest
   */
  public register = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const id = req.params.id as string;
    const { inviteCode } = req.body;

    const participant = await this.contestService.registerUser(id, req.user.id, inviteCode);
    res.status(200).json(ApiResponse.success(participant));
  };

  /**
   * Retrieves the current standings / leaderboard ranks
   */
  public getLeaderboard = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const contest = await prisma.contest.findUnique({ where: { id } });
    if (!contest) {
      throw new NotFoundError('Contest not found.');
    }

    const isAdmin = req.user && (req.user.role === 'ADMIN' || contest.creatorId === req.user.id);
    const standings = await this.leaderboardService.getLeaderboard(id, contest.status, isAdmin);

    res.status(200).json(ApiResponse.success(standings));
  };

  /**
   * Submits a clarification question
   */
  public askQuestion = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const id = req.params.id as string;
    const { question } = req.body;

    const clarification = await this.contestService.askQuestion(id, req.user.id, question);
    res.status(201).json(ApiResponse.success(clarification));
  };

  /**
   * Answers a clarification question (Admin only)
   */
  public answerQuestion = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new ForbiddenError('Only admins can answer clarification questions.');
    }
    const id = req.params.id as string;
    const clarificationId = req.params.clarificationId as string;
    const { answer, isPublic } = req.body;

    const clarification = await this.contestService.answerQuestion(id, clarificationId, answer, req.user.id, isPublic);
    res.status(200).json(ApiResponse.success(clarification));
  };

  /**
   * Lists clarifications for a contest
   */
  public listClarifications = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user) {
      throw new UnauthorizedError('Identity context not resolved.');
    }
    const id = req.params.id as string;
    
    const isUserAdmin = req.user.role === 'ADMIN';
    const clarifications = await this.contestService.listClarifications(id, isUserAdmin ? undefined : req.user.id);

    res.status(200).json(ApiResponse.success(clarifications));
  };

  /**
   * Creates an Announcement (Admin only)
   */
  public createAnnouncement = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new ForbiddenError('Only admins can create announcements.');
    }
    const id = req.params.id as string;
    const { title, content } = req.body;

    const announcement = await this.contestService.createAnnouncement(id, title, content, req.user.id);
    res.status(201).json(ApiResponse.success(announcement));
  };

  /**
   * Lists announcements for a contest
   */
  public listAnnouncements = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const announcements = await prisma.contestAnnouncement.findMany({
      where: { contestId: id },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json(ApiResponse.success(announcements));
  };

  /**
   * Manually unfreezes a leaderboard, setting status to ENDED/unfrozen
   */
  public unfreeze = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== 'ADMIN') {
      throw new ForbiddenError('Only admins can manually unfreeze a contest.');
    }
    const id = req.params.id as string;

    const contest = await prisma.contest.findUnique({ where: { id } });
    if (!contest) {
      throw new NotFoundError('Contest not found.');
    }

    if (contest.status !== ContestStatus.FROZEN && contest.status !== ContestStatus.ENDED) {
      throw new ForbiddenError('Contest leaderboard is not frozen.');
    }

    // Use transaction/Compare-And-Swap to update
    const updated = await prisma.contest.updateMany({
      where: {
        id,
        version: contest.version,
      },
      data: {
        status: ContestStatus.ENDED, // Unfreeze ends the contest standings freeze
        unfreezeTime: new Date(),
        version: { increment: 1 },
      },
    });

    if (updated.count === 0) {
      throw new ForbiddenError('Contest was modified concurrently.');
    }

    // Save public un-frozen snapshot
    await this.leaderboardService.saveSnapshot(id, false);

    // Re-evaluate and broadcast live un-frozen ranking
    const { ContestGateway } = require('../gateways/contest.gateway');
    const gateway = new ContestGateway();
    await gateway.broadcastStateChange(id, ContestStatus.ENDED, 'contest:unfrozen');
    await gateway.broadcastLeaderboardUpdate(id, ContestStatus.ENDED);

    res.status(200).json(ApiResponse.success({ message: 'Leaderboard successfully unfrozen.' }));
  };
}
export default ContestController;
