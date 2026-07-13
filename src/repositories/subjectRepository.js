import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, where, orderBy 
} from 'firebase/firestore';
import db from '../firebase/firestore';

const COLLECTION_NAME = 'subjects';

/**
 * Fetch a single subject by ID.
 */
export const getSubject = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Fetch subjects filtered by semesterId, ordered by order.
 */
export const getSubjectsBySemester = async (semesterId) => {
  const q = query(
    collection(db, COLLECTION_NAME), 
    where('semesterId', '==', semesterId),
    orderBy('order', 'asc')
  );
  const querySnapshot = await getDocs(q);
  const subjects = [];
  querySnapshot.forEach((doc) => {
    subjects.push({ id: doc.id, ...doc.data() });
  });
  return subjects;
};

/**
 * Fetch all subjects.
 */
export const getAllSubjects = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  const subjects = [];
  querySnapshot.forEach((doc) => {
    subjects.push({ id: doc.id, ...doc.data() });
  });
  return subjects;
};

/**
 * Create or overwrite a subject document.
 */
export const createSubject = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await setDoc(docRef, data);
};

/**
 * Update dynamic fields in a subject document.
 */
export const updateSubject = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

/**
 * Delete a subject document.
 */
export const deleteSubject = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
