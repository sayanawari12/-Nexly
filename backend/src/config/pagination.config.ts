export interface PaginationConfig {
  defaultLimit: number;
  maxLimit: number;
}

export const paginationConfig: PaginationConfig = {
  defaultLimit: Number(process.env.PAGINATION_DEFAULT_LIMIT) || 20,
  maxLimit: Number(process.env.PAGINATION_MAX_LIMIT) || 100,
};
