"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationUtil = void 0;
const config_1 = require("../config");
exports.PaginationUtil = {
    /**
     * Parses and normalizes page and limit parameters, clamping them to config limits.
     */
    parse(rawPage, rawLimit) {
        let page = parseInt(rawPage, 10);
        let limit = parseInt(rawLimit, 10);
        // Set fallbacks if invalid
        if (isNaN(page) || page <= 0) {
            page = 1;
        }
        if (isNaN(limit) || limit <= 0) {
            limit = config_1.config.pagination.defaultLimit;
        }
        // Clamp limit to maximum boundaries
        if (limit > config_1.config.pagination.maxLimit) {
            limit = config_1.config.pagination.maxLimit;
        }
        const offset = (page - 1) * limit;
        return {
            page,
            limit,
            offset,
        };
    },
    /**
     * Constructs the structured metadata object for paginated collections.
     */
    buildMetadata(totalCount, page, limit) {
        const totalPages = Math.max(1, Math.ceil(totalCount / limit));
        const hasNextPage = page < totalPages;
        const hasPreviousPage = page > 1;
        return {
            page,
            limit,
            totalCount,
            totalPages,
            hasNextPage,
            hasPreviousPage,
        };
    },
};
exports.default = exports.PaginationUtil;
