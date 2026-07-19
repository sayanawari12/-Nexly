import { RequestContext } from './context';
import { ApiSuccessResponse, PaginatedResponse, PaginationMetadata } from '../types';

export const ApiResponse = {
  /**
   * Generates a standard success response envelope.
   */
  success<T>(data: T): ApiSuccessResponse<T> {
    return {
      success: true,
      data,
      error: null,
      meta: {
        requestId: RequestContext.getRequestId() || 'unknown',
        timestamp: new Date().toISOString(),
      },
    };
  },

  /**
   * Generates a standard paginated success response envelope containing list metadata.
   */
  paginated<T>(data: T[], pagination: PaginationMetadata): PaginatedResponse<T> {
    return {
      success: true,
      data,
      error: null,
      meta: {
        requestId: RequestContext.getRequestId() || 'unknown',
        timestamp: new Date().toISOString(),
        pagination,
      },
    };
  },
};

export default ApiResponse;
