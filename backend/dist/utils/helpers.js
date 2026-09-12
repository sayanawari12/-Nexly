"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helpers = void 0;
const uuid_1 = require("uuid");
exports.Helpers = {
    /**
     * Validates if a string is a valid v4 UUID.
     */
    isValidUuid(id) {
        return (0, uuid_1.validate)(id) && (0, uuid_1.version)(id) === 4;
    },
    /**
     * Safely parses a number with fallback support.
     */
    parseNumber(value, fallback) {
        if (value === undefined || value === null)
            return fallback;
        const parsed = Number(value);
        return isNaN(parsed) ? fallback : parsed;
    },
    /**
     * Safely parses a boolean from string inputs (e.g. "true", "1", true).
     */
    parseBoolean(value, fallback = false) {
        if (value === undefined || value === null)
            return fallback;
        if (typeof value === 'boolean')
            return value;
        const stringVal = String(value).trim().toLowerCase();
        if (stringVal === 'true' || stringVal === '1' || stringVal === 'yes') {
            return true;
        }
        if (stringVal === 'false' || stringVal === '0' || stringVal === 'no') {
            return false;
        }
        return fallback;
    },
    /**
     * Generates URL-safe slugs from raw strings.
     */
    slugify(text) {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start
            .replace(/-+$/, ''); // Trim - from end
    },
    /**
     * Validates if a value is a valid ISO DateTime string.
     */
    isValidIsoDate(dateStr) {
        if (!dateStr)
            return false;
        const date = new Date(dateStr);
        return !isNaN(date.getTime()) && date.toISOString() === dateStr;
    },
};
exports.default = exports.Helpers;
