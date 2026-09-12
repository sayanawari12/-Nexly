"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterUtil = void 0;
exports.FilterUtil = {
    /**
     * Parses and normalizes incoming sort and field filters.
     */
    parse(query) {
        const search = typeof query.search === 'string' ? query.search.trim() : undefined;
        const sortBy = typeof query.sortBy === 'string' ? query.sortBy.trim() : undefined;
        let sortOrder = 'asc';
        if (typeof query.sortOrder === 'string') {
            const normalizedOrder = query.sortOrder.trim().toLowerCase();
            if (normalizedOrder === 'desc') {
                sortOrder = 'desc';
            }
        }
        let fields;
        if (typeof query.fields === 'string') {
            fields = query.fields
                .split(',')
                .map((f) => f.trim())
                .filter((f) => f.length > 0);
        }
        return {
            search,
            sortBy,
            sortOrder,
            fields,
        };
    },
    /**
     * Helper that builds standard Prisma sorting configurations.
     */
    buildOrderBy(sortBy, sortOrder = 'asc') {
        if (!sortBy)
            return undefined;
        return {
            [sortBy]: sortOrder,
        };
    },
    /**
     * Helper that converts field array list to Prisma SELECT maps.
     */
    buildSelect(fields) {
        if (!fields || fields.length === 0)
            return undefined;
        const selectObj = {};
        fields.forEach((field) => {
            selectObj[field] = true;
        });
        return selectObj;
    },
};
exports.default = exports.FilterUtil;
