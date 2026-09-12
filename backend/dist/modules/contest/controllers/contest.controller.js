"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestController = void 0;
const contest_service_1 = require("../services/contest.service");
const leaderboard_service_1 = require("../services/leaderboard.service");
const response_1 = require("../../../utils/response");
const errors_1 = require("../../../errors");
const client_1 = require("@prisma/client");
const database_1 = require("../../../config/database");
class ContestController {
    contestService;
    leaderboardService;
    constructor(contestService = new contest_service_1.ContestService(), leaderboardService = new leaderboard_service_1.LeaderboardService()) {
        this.contestService = contestService;
        this.leaderboardService = leaderboardService;
    }
    /**
     * Creates a new contest (Admin/Creator only)
     */
    create = async (req, res) => {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new errors_1.ForbiddenError('Only admins can create contests.');
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
        res.status(201).json(response_1.ApiResponse.success(contest));
    };
    /**
     * Retrieves full details of a contest (verifying draft visibility limits)
     */
    get = async (req, res) => {
        const id = req.params.id;
        const contest = await database_1.prisma.contest.findUnique({
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
            throw new errors_1.NotFoundError('Contest not found.');
        }
        // Block draft visibility for non-admin/creators
        if (contest.status === client_1.ContestStatus.DRAFT) {
            const isAuthorized = req.user && (req.user.role === 'ADMIN' || contest.creatorId === req.user.id);
            if (!isAuthorized) {
                throw new errors_1.ForbiddenError('Access to draft contest details is restricted.');
            }
        }
        res.status(200).json(response_1.ApiResponse.success(contest));
    };
    /**
     * Lists all contests (filtering draft visibility limits)
     */
    list = async (req, res) => {
        const isUserAdmin = req.user?.role === 'ADMIN';
        const contests = await database_1.prisma.contest.findMany({
            where: isUserAdmin ? {} : {
                NOT: { status: client_1.ContestStatus.DRAFT },
            },
            orderBy: { startTime: 'desc' },
        });
        res.status(200).json(response_1.ApiResponse.success(contests));
    };
    /**
     * Registers a participant to a contest
     */
    register = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const id = req.params.id;
        const { inviteCode } = req.body;
        const participant = await this.contestService.registerUser(id, req.user.id, inviteCode);
        res.status(200).json(response_1.ApiResponse.success(participant));
    };
    /**
     * Retrieves the current standings / leaderboard ranks
     */
    getLeaderboard = async (req, res) => {
        const id = req.params.id;
        const contest = await database_1.prisma.contest.findUnique({ where: { id } });
        if (!contest) {
            throw new errors_1.NotFoundError('Contest not found.');
        }
        const isAdmin = req.user && (req.user.role === 'ADMIN' || contest.creatorId === req.user.id);
        const standings = await this.leaderboardService.getLeaderboard(id, contest.status, isAdmin);
        res.status(200).json(response_1.ApiResponse.success(standings));
    };
    /**
     * Submits a clarification question
     */
    askQuestion = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const id = req.params.id;
        const { question } = req.body;
        const clarification = await this.contestService.askQuestion(id, req.user.id, question);
        res.status(201).json(response_1.ApiResponse.success(clarification));
    };
    /**
     * Answers a clarification question (Admin only)
     */
    answerQuestion = async (req, res) => {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new errors_1.ForbiddenError('Only admins can answer clarification questions.');
        }
        const id = req.params.id;
        const clarificationId = req.params.clarificationId;
        const { answer, isPublic } = req.body;
        const clarification = await this.contestService.answerQuestion(id, clarificationId, answer, req.user.id, isPublic);
        res.status(200).json(response_1.ApiResponse.success(clarification));
    };
    /**
     * Lists clarifications for a contest
     */
    listClarifications = async (req, res) => {
        if (!req.user) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        const id = req.params.id;
        const isUserAdmin = req.user.role === 'ADMIN';
        const clarifications = await this.contestService.listClarifications(id, isUserAdmin ? undefined : req.user.id);
        res.status(200).json(response_1.ApiResponse.success(clarifications));
    };
    /**
     * Creates an Announcement (Admin only)
     */
    createAnnouncement = async (req, res) => {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new errors_1.ForbiddenError('Only admins can create announcements.');
        }
        const id = req.params.id;
        const { title, content } = req.body;
        const announcement = await this.contestService.createAnnouncement(id, title, content, req.user.id);
        res.status(201).json(response_1.ApiResponse.success(announcement));
    };
    /**
     * Lists announcements for a contest
     */
    listAnnouncements = async (req, res) => {
        const id = req.params.id;
        const announcements = await database_1.prisma.contestAnnouncement.findMany({
            where: { contestId: id },
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json(response_1.ApiResponse.success(announcements));
    };
    /**
     * Manually unfreezes a leaderboard, setting status to ENDED/unfrozen
     */
    unfreeze = async (req, res) => {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new errors_1.ForbiddenError('Only admins can manually unfreeze a contest.');
        }
        const id = req.params.id;
        const contest = await database_1.prisma.contest.findUnique({ where: { id } });
        if (!contest) {
            throw new errors_1.NotFoundError('Contest not found.');
        }
        if (contest.status !== client_1.ContestStatus.FROZEN && contest.status !== client_1.ContestStatus.ENDED) {
            throw new errors_1.ForbiddenError('Contest leaderboard is not frozen.');
        }
        // Use transaction/Compare-And-Swap to update
        const updated = await database_1.prisma.contest.updateMany({
            where: {
                id,
                version: contest.version,
            },
            data: {
                status: client_1.ContestStatus.ENDED, // Unfreeze ends the contest standings freeze
                unfreezeTime: new Date(),
                version: { increment: 1 },
            },
        });
        if (updated.count === 0) {
            throw new errors_1.ForbiddenError('Contest was modified concurrently.');
        }
        // Save public un-frozen snapshot
        await this.leaderboardService.saveSnapshot(id, false);
        // Re-evaluate and broadcast live un-frozen ranking
        const { ContestGateway } = require('../gateways/contest.gateway');
        const gateway = new ContestGateway();
        await gateway.broadcastStateChange(id, client_1.ContestStatus.ENDED, 'contest:unfrozen');
        await gateway.broadcastLeaderboardUpdate(id, client_1.ContestStatus.ENDED);
        res.status(200).json(response_1.ApiResponse.success({ message: 'Leaderboard successfully unfrozen.' }));
    };
}
exports.ContestController = ContestController;
exports.default = ContestController;
