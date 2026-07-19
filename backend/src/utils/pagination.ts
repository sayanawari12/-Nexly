import { config } from '../config';
import { PaginationMetadata, PaginationParams } from '../types';

export const PaginationUtil = {
  /**
   * Parses and normalizes page and limit parameters, clamping them to config limits.
   */
  parse(rawPage?: any, rawLimit?: any): PaginationParams {
    let page = parseInt(rawPage, 10);
    let limit = parseInt(rawLimit, 10);

    // Set fallbacks if invalid
    if (isNaN(page) || page <= 0) {
      page = 1;
    }

    if (isNaN(limit) || limit <= 0) {
      limit = config.pagination.defaultLimit;
    }

    // Clamp limit to maximum boundaries
    if (limit > config.pagination.maxLimit) {
      limit = config.pagination.maxLimit;
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
  buildMetadata(totalCount: number, page: number, limit: number): PaginationMetadata {
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

export default PaginationUtil;
