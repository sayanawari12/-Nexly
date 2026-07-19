import { FilterParams } from '../types';

export const FilterUtil = {
  /**
   * Parses and normalizes incoming sort and field filters.
   */
  parse(query: any): FilterParams {
    const search = typeof query.search === 'string' ? query.search.trim() : undefined;
    const sortBy = typeof query.sortBy === 'string' ? query.sortBy.trim() : undefined;
    
    let sortOrder: 'asc' | 'desc' = 'asc';
    if (typeof query.sortOrder === 'string') {
      const normalizedOrder = query.sortOrder.trim().toLowerCase();
      if (normalizedOrder === 'desc') {
        sortOrder = 'desc';
      }
    }

    let fields: string[] | undefined;
    if (typeof query.fields === 'string') {
      fields = query.fields
        .split(',')
        .map((f: string) => f.trim())
        .filter((f: string) => f.length > 0);
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
  buildOrderBy(sortBy?: string, sortOrder: 'asc' | 'desc' = 'asc'): any {
    if (!sortBy) return undefined;
    return {
      [sortBy]: sortOrder,
    };
  },

  /**
   * Helper that converts field array list to Prisma SELECT maps.
   */
  buildSelect(fields?: string[]): any {
    if (!fields || fields.length === 0) return undefined;
    const selectObj: Record<string, boolean> = {};
    fields.forEach((field) => {
      selectObj[field] = true;
    });
    return selectObj;
  },
};

export default FilterUtil;
