export interface RequestStore {
  requestId: string;
  userId?: string;
  role?: string;
  [key: string]: any;
}

export interface ApiResponseMetadata {
  requestId: string;
  timestamp: string;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  error: null;
  meta: ApiResponseMetadata;
}

export interface ApiErrorDetails {
  code: string;
  message: string;
  details: any;
}

export interface ApiErrorResponse {
  success: false;
  data: null;
  error: ApiErrorDetails;
  meta: ApiResponseMetadata;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginationMetadata {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  success: true;
  data: T[];
  error: null;
  meta: ApiResponseMetadata & {
    pagination: PaginationMetadata;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export interface FilterParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  fields?: string[];
}
