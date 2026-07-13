import { 
  saveBookmarkEntry, 
  deleteBookmarkEntry, 
  getBookmarkEntry 
} from '../../repositories/bookmarkRepository';

/**
 * Save bookmark.
 */
export const createBookmark = async (uid, lessonId, subjectId = 'c-programming', semesterId = 'semester-2') => {
  if (!uid || !lessonId) return;
  const data = {
    lessonId,
    subjectId,
    semesterId,
    createdAt: new Date().toISOString()
  };
  await saveBookmarkEntry(uid, lessonId, data);
};

/**
 * Delete bookmark.
 */
export const deleteBookmark = async (uid, lessonId) => {
  if (!uid || !lessonId) return;
  await deleteBookmarkEntry(uid, lessonId);
};

/**
 * Check if a bookmark exists.
 */
export const checkIsBookmarked = async (uid, lessonId) => {
  if (!uid || !lessonId) return false;
  const entry = await getBookmarkEntry(uid, lessonId);
  return entry !== null;
};
