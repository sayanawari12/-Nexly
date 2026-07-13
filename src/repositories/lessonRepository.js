import { 
  doc, getDoc, setDoc, updateDoc, deleteDoc, collection, query, where, orderBy, getDocs 
} from 'firebase/firestore';
import db from '../firebase/firestore';

const COLLECTION_NAME = 'lessons';

/**
 * Save user private note.
 */
export const saveNoteEntry = async (noteId, data) => {
  const docRef = doc(db, 'notes', noteId);
  await setDoc(docRef, data);
};

/**
 * Fetch user private note.
 */
export const getNoteEntry = async (noteId) => {
  const docRef = doc(db, 'notes', noteId);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};

/**
 * Create user bookmark.
 */
export const saveBookmarkEntry = async (bookmarkId, data) => {
  const docRef = doc(db, 'bookmarks', bookmarkId);
  await setDoc(docRef, data);
};

/**
 * Fetch a single lesson by ID.
 */
export const getLesson = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Fetch lessons filtered by unitId, ordered by order.
 */
export const getLessonsByUnit = async (unitId) => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    where('unitId', '==', unitId),
    orderBy('order', 'asc')
  );
  const querySnapshot = await getDocs(q);
  const lessons = [];
  querySnapshot.forEach((doc) => {
    lessons.push({ id: doc.id, ...doc.data() });
  });
  return lessons;
};

/**
 * Fetch all lessons.
 */
export const getAllLessons = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  const lessons = [];
  querySnapshot.forEach((doc) => {
    lessons.push({ id: doc.id, ...doc.data() });
  });
  return lessons;
};

/**
 * Create or overwrite a lesson document.
 */
export const createLesson = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await setDoc(docRef, data);
};

/**
 * Update dynamic fields in a lesson document.
 */
export const updateLesson = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

/**
 * Delete a lesson document.
 */
export const deleteLesson = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
