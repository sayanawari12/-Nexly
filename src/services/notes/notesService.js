import { 
  saveNoteEntry, 
  deleteNoteEntry, 
  getNoteEntry 
} from '../../repositories/notesRepository';

/**
 * Save or update a note.
 */
export const updateNotes = async (uid, lessonId, content) => {
  if (!uid || !lessonId) return;
  
  // Fetch existing to preserve createdAt
  const existing = await getNoteEntry(uid, lessonId);
  const now = new Date().toISOString();
  
  const data = {
    lessonId,
    content,
    updatedAt: now,
    createdAt: existing ? (existing.createdAt || now) : now
  };
  await saveNoteEntry(uid, lessonId, data);
};

/**
 * Delete a note.
 */
export const deleteNotes = async (uid, lessonId) => {
  if (!uid || !lessonId) return;
  await deleteNoteEntry(uid, lessonId);
};

/**
 * Fetch a single note.
 */
export const getUserNote = async (uid, lessonId) => {
  if (!uid || !lessonId) return '';
  const note = await getNoteEntry(uid, lessonId);
  return note ? note.content : '';
};
