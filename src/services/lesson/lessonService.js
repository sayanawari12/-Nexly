import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../../firebase/firestore';

/**
 * Save user private note for a lesson.
 * @param {string} uid
 * @param {string} lessonId
 * @param {string} content
 */
export const saveUserNote = async (uid, lessonId, content) => {
  try {
    const docRef = doc(db, 'notes', `${uid}_${lessonId}`);
    await setDoc(docRef, {
      uid,
      lessonId,
      content,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving user note:", error);
    throw error;
  }
};

/**
 * Read user private note for a lesson.
 * @param {string} uid
 * @param {string} lessonId
 */
export const getUserNote = async (uid, lessonId) => {
  try {
    const docRef = doc(db, 'notes', `${uid}_${lessonId}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().content;
    }
    return '';
  } catch (error) {
    console.error("Error reading user note:", error);
    return '';
  }
};

/**
 * Add a learning resource bookmark.
 * @param {string} uid 
 * @param {string} lessonId 
 * @param {string} programId 
 * @param {string} roadmapId 
 */
export const addUserBookmark = async (uid, lessonId = '', programId = '', roadmapId = '') => {
  try {
    const bookmarkId = `${uid}_${lessonId || 'null'}_${programId || 'null'}`;
    const docRef = doc(db, 'bookmarks', bookmarkId);
    await setDoc(docRef, {
      uid,
      lessonId,
      programId,
      roadmapId,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error saving user bookmark document:", error);
    throw error;
  }
};
