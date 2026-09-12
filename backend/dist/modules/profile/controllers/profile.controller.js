"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const profile_repository_1 = require("../repositories/profile.repository");
const leaderboard_service_1 = require("../services/leaderboard.service");
const rating_service_1 = require("../services/rating.service");
const analytics_service_1 = require("../services/analytics.service");
const response_1 = require("../../../utils/response");
const errors_1 = require("../../../errors");
const profile_validator_1 = require("../validators/profile.validator");
class ProfileController {
    repo;
    leaderboardService;
    ratingService;
    analyticsService;
    constructor() {
        this.repo = new profile_repository_1.ProfileRepository();
        this.leaderboardService = new leaderboard_service_1.LeaderboardService();
        this.ratingService = new rating_service_1.RatingService();
        this.analyticsService = new analytics_service_1.AnalyticsService();
    }
    /**
     * Fetches user dashboard profile (optimized via cached projections snapshots)
     */
    getProfile = async (req, res) => {
        const userId = req.params.userId || req.user?.id;
        if (!userId) {
            throw new errors_1.UnauthorizedError('Identity context not resolved.');
        }
        let snapshot = await this.repo.getProfileSnapshot(userId);
        if (!snapshot) {
            // Rebuild on cache-miss fallback
            await this.analyticsService.generateProfileSnapshot(userId);
            snapshot = await this.repo.getProfileSnapshot(userId);
        }
        if (!snapshot) {
            throw new errors_1.NotFoundError('Profile details not found.');
        }
        res.status(200).json(response_1.ApiResponse.success(snapshot.snapshotData));
    };
    /**
     * Preferences controller methods
     */
    getPreferences = async (req, res) => {
        if (!req.user)
            throw new errors_1.UnauthorizedError();
        const pref = await this.repo.getOrCreatePreferences(req.user.id);
        res.status(200).json(response_1.ApiResponse.success(pref));
    };
    updatePreferences = async (req, res) => {
        if (!req.user)
            throw new errors_1.UnauthorizedError();
        const validated = profile_validator_1.UpdatePreferenceSchema.parse(req.body);
        const pref = await this.repo.updatePreferences(req.user.id, validated);
        res.status(200).json(response_1.ApiResponse.success(pref));
    };
    /**
     * Notifications controller methods
     */
    getNotifications = async (req, res) => {
        if (!req.user)
            throw new errors_1.UnauthorizedError();
        const notifications = await this.repo.getNotifications(req.user.id);
        res.status(200).json(response_1.ApiResponse.success(notifications));
    };
    markNotificationRead = async (req, res) => {
        if (!req.user)
            throw new errors_1.UnauthorizedError();
        const id = req.params.notificationId;
        await this.repo.markNotificationRead(req.user.id, id);
        res.status(200).json(response_1.ApiResponse.success({ message: 'Notification marked as read.' }));
    };
    /**
     * Leaderboard controller methods
     */
    getLeaderboard = async (req, res) => {
        const validated = profile_validator_1.GetLeaderboardSchema.parse(req.query);
        const standings = await this.leaderboardService.getLeaderboard(validated.type, validated.limit, validated.offset);
        res.status(200).json(response_1.ApiResponse.success(standings));
    };
    getSeasonalLeaderboard = async (req, res) => {
        const validated = profile_validator_1.GetSeasonalLeaderboardSchema.parse(req.query);
        const standings = await this.leaderboardService.getSeasonalLeaderboard(validated.seasonId, validated.limit, validated.offset);
        res.status(200).json(response_1.ApiResponse.success(standings));
    };
    getLeaderboardAroundMe = async (req, res) => {
        if (!req.user)
            throw new errors_1.UnauthorizedError();
        const validated = profile_validator_1.GetLeaderboardAroundUserSchema.parse(req.query);
        const standings = await this.leaderboardService.getLeaderboardAroundUser(req.user.id, validated.type, validated.limitAroundUser);
        res.status(200).json(response_1.ApiResponse.success(standings));
    };
    /**
     * Cache Rebuilder (Admin only, idempotent recovery)
     */
    rebuildCaches = async (req, res) => {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new errors_1.ForbiddenError('Only admins can trigger leaderboard cache rebuilds.');
        }
        await this.leaderboardService.rebuildAllCaches();
        res.status(200).json(response_1.ApiResponse.success({ message: 'Leaderboard caches successfully rebuilt from Postgres.' }));
    };
    /**
     * Ratings Replay Engine (Admin only, idempotent recalculations)
     */
    triggerRatingsReplay = async (req, res) => {
        if (!req.user || req.user.role !== 'ADMIN') {
            throw new errors_1.ForbiddenError('Only admins can trigger rating history replays.');
        }
        // Fire-and-forget background execution or synchronous confirmation depending on call logic
        // We execute synchronously here for test validations
        await this.ratingService.replayAllRatings();
        res.status(200).json(response_1.ApiResponse.success({ message: 'Ratings replay recalculation successfully completed.' }));
    };
}
exports.ProfileController = ProfileController;
exports.default = ProfileController;
