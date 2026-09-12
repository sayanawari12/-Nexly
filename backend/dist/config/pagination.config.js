"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationConfig = void 0;
exports.paginationConfig = {
    defaultLimit: Number(process.env.PAGINATION_DEFAULT_LIMIT) || 20,
    maxLimit: Number(process.env.PAGINATION_MAX_LIMIT) || 100,
};
