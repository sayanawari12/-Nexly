import { 
  collection, doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, query, orderBy 
} from 'firebase/firestore';
import db from '../firebase/firestore';

const COLLECTION_NAME = 'semesters';

/**
 * Fetch a single semester by ID.
 */
export const getSemester = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

/**
 * Fetch all semesters ordered by their custom order parameter.
 */
export const getAllSemesters = async () => {
  const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  const semesters = [];
  querySnapshot.forEach((doc) => {
    semesters.push({ id: doc.id, ...doc.data() });
  });
  return semesters;
};

/**
 * Create or overwrite a semester document.
 */
export const createSemester = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await setDoc(docRef, data);
};

/**
 * Update dynamic fields in a semester document.
 */
export const updateSemester = async (id, data) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await updateDoc(docRef, data);
};

/**
 * Delete a semester document.
 */
export const deleteSemester = async (id) => {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
};
