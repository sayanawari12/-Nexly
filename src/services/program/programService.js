import { 
  getAllPrograms, 
  saveProgramBookmark, 
  saveProgramCompletion 
} from '../../repositories/programRepository';

/**
 * Load all program records from the repository.
 */
export const loadPrograms = async () => {
  return await getAllPrograms();
};

/**
 * Filter program items based on active subjects, difficulties, categories, bookmark states, completion states, and sorting preferences.
 */
export const filterPrograms = (
  programs = [],
  filters = {},
  bookmarkedIds = new Set(),
  completedIds = new Set()
) => {
  let result = [...programs];

  // 1. Subject Filter
  if (filters.subject && filters.subject !== 'all') {
    result = result.filter(p => p.subject === filters.subject);
  }

  // 2. Difficulty Filter
  if (filters.difficulty && filters.difficulty !== 'all') {
    result = result.filter(p => p.difficulty === filters.difficulty);
  }

  // 3. Category Filter
  if (filters.category && filters.category !== 'all') {
    result = result.filter(p => p.category === filters.category);
  }

  // 4. Completed Filter
  if (filters.completed === 'completed') {
    result = result.filter(p => completedIds.has(p.id));
  } else if (filters.completed === 'uncompleted') {
    result = result.filter(p => !completedIds.has(p.id));
  }

  // 5. Bookmarked Filter
  if (filters.bookmarked === 'bookmarked') {
    result = result.filter(p => bookmarkedIds.has(p.id));
  }

  // 6. Search Query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase().trim();
    result = result.filter(p => {
      const matchTitle = p.title?.toLowerCase().includes(query);
      const matchCategory = p.category?.toLowerCase().includes(query);
      const matchDifficulty = p.difficulty?.toLowerCase().includes(query);
      const matchSubject = p.subject?.toLowerCase().includes(query);
      const matchTags = p.tags?.some(tag => tag.toLowerCase().includes(query));
      return matchTitle || matchCategory || matchDifficulty || matchSubject || matchTags;
    });
  }

  // 7. Sorting
  if (filters.sortBy === 'Alphabetical') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sortBy === 'Newest') {
    // Newest: assume custom subjects or later entries are newest, or reverse ID order
    result.sort((a, b) => b.id.localeCompare(a.id));
  }

  return result;
};

/**
 * Return related programs for a given program.
 */
export const getRelatedPrograms = (program, allPrograms = []) => {
  if (!program) return [];
  
  // If program specifically lists related program IDs
  if (program.relatedPrograms && program.relatedPrograms.length > 0) {
    const directMatches = allPrograms.filter(p => program.relatedPrograms.includes(p.id));
    if (directMatches.length > 0) return directMatches;
  }

  // Fallback: match by subject/category/tags
  return allPrograms
    .filter(p => p.id !== program.id && p.subject === program.subject)
    .slice(0, 3);
};

/**
 * Bookmark or unbookmark a program.
 */
export const toggleProgramBookmark = async (uid, programId, bookmarked) => {
  await saveProgramBookmark(uid, programId, bookmarked);
};

/**
 * Mark a program completed or uncompleted.
 */
export const toggleProgramCompletion = async (uid, programId, completed) => {
  await saveProgramCompletion(uid, programId, completed);
};
