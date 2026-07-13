import { collection, getDocs } from 'firebase/firestore';
import db from '../firebase/firestore';

/**
 * Fetch all structural layout metadata for the roadmap.
 */
export const getRoadmapStructure = async () => {
  const semestersSnap = await getDocs(collection(db, 'semesters'));
  const subjectsSnap = await getDocs(collection(db, 'subjects'));
  const unitsSnap = await getDocs(collection(db, 'units'));
  const lessonsSnap = await getDocs(collection(db, 'lessons'));

  const semesters = semestersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const subjects = subjectsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const units = unitsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const lessons = lessonsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  return { semesters, subjects, units, lessons };
};
