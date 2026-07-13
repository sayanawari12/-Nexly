import { saveNoteEntry, getNoteEntry, saveBookmarkEntry } from '../../repositories/lessonRepository';

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
