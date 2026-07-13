import { 
  getSubject, 
  getSubjectsBySemester, 
  getAllSubjects, 
  createSubject, 
  updateSubject, 
  deleteSubject 
} from '../../repositories/subjectRepository';

/**
 * Fetch subject details by ID.
 */
export const fetchSubjectDetails = async (id) => {
  return await getSubject(id);
};

/**
 * Fetch all subjects belonging to a semester.
 */
export const fetchSubjectsForSemester = async (semesterId) => {
  return await getSubjectsBySemester(semesterId);
};

/**
 * Fetch all subjects.
 */
export const fetchAllSubjects = async () => {
  return await getAllSubjects();
};

/**
 * Save or update subject details.
 */
export const saveSubject = async (id, data) => {
  const subjectData = {
    semesterId: data.semesterId,
    title: data.title || '',
    icon: data.icon || 'Book',
    order: Number(data.order) || 0,
    updatedAt: new Date().toISOString()
  };
  await createSubject(id, subjectData);
};

/**
 * Delete a subject.
 */
export const removeSubject = async (id) => {
  await deleteSubject(id);
};
