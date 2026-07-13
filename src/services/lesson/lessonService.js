import { 
  getLesson, 
  getLessonsByUnit, 
  getAllLessons, 
  createLesson, 
  updateLesson, 
  deleteLesson,
  saveNoteEntry, 
  getNoteEntry, 
  saveBookmarkEntry,
  getBookmarkEntry,
  removeBookmarkEntry
} from '../../repositories/lessonRepository';

/**
 * Save user private note for a lesson.
 * @param {string} uid
 * @param {string} lessonId
 * @param {string} content
 */
export const saveUserNote = async (uid, lessonId, content) => {
  const noteId = `${uid}_${lessonId}`;
  const data = {
    uid,
    lessonId,
    content,
    updatedAt: new Date().toISOString()
  };
  await saveNoteEntry(noteId, data);
};

/**
 * Read user private note for a lesson.
 * @param {string} uid
 * @param {string} lessonId
 */
export const getUserNote = async (uid, lessonId) => {
  const noteId = `${uid}_${lessonId}`;
  const note = await getNoteEntry(noteId);
  return note ? note.content : '';
};

/**
 * Add a learning resource bookmark.
 * @param {string} uid 
 * @param {string} lessonId 
 * @param {string} programId 
 * @param {string} roadmapId 
 */
export const addUserBookmark = async (uid, lessonId = '', programId = '', roadmapId = '') => {
  const bookmarkId = `${uid}_${lessonId || 'null'}_${programId || 'null'}`;
  const data = {
    uid,
    lessonId,
    programId,
    roadmapId,
    createdAt: new Date().toISOString()
  };
  await saveBookmarkEntry(bookmarkId, data);
};

/**
 * Fetch a single lesson details by ID.
 */
export const fetchLessonDetails = async (id) => {
  return await getLesson(id);
};

/**
 * Fetch lessons belonging to a specific unit.
 */
export const fetchLessonsForUnit = async (unitId) => {
  return await getLessonsByUnit(unitId);
};

/**
 * Fetch all lessons.
 */
export const fetchAllLessons = async () => {
  return await getAllLessons();
};

/**
 * Save or update a lesson.
 */
export const saveLesson = async (id, data) => {
  const lessonData = {
    unitId: data.unitId,
    title: data.title || '',
    difficulty: data.difficulty || 'Easy',
    estimatedTime: data.estimatedTime || '10 mins',
    xp: Number(data.xp) || 100,
    order: Number(data.order) || 0,
    isPublished: data.isPublished !== undefined ? data.isPublished : true,
    updatedAt: new Date().toISOString(),
    content: data.content || ''
  };
  await createLesson(id, lessonData);
};

/**
 * Delete a lesson.
 */
export const removeLesson = async (id) => {
  await deleteLesson(id);
};

/**
 * Calculate previous and next lesson dynamically.
 * @param {string} currentLessonId 
 * @param {Array} sortedLessons - flat list of lessons, pre-sorted by unit & lesson order
 */
export const getPrevAndNextLesson = (currentLessonId, sortedLessons) => {
  if (!Array.isArray(sortedLessons)) {
    return { prevLesson: null, nextLesson: null };
  }
  const index = sortedLessons.findIndex(lesson => lesson.id === currentLessonId);
  if (index === -1) {
    return { prevLesson: null, nextLesson: null };
  }
  const prevLesson = index > 0 ? sortedLessons[index - 1] : null;
  const nextLesson = index < sortedLessons.length - 1 ? sortedLessons[index + 1] : null;
  return { prevLesson, nextLesson };
};

/**
 * Check if a lesson is bookmarked by a user.
 */
export const checkIsBookmarked = async (uid, lessonId) => {
  const bookmarkId = `${uid}_${lessonId}_null`;
  return await getBookmarkEntry(bookmarkId);
};

/**
 * Remove a learning resource bookmark.
 */
export const removeUserBookmark = async (uid, lessonId) => {
  const bookmarkId = `${uid}_${lessonId}_null`;
  await removeBookmarkEntry(bookmarkId);
};

