import { 
  getSemester, 
  getAllSemesters, 
  createSemester, 
  updateSemester, 
  deleteSemester 
} from '../../repositories/semesterRepository';

/**
 * Fetch details of a semester.
 */
export const fetchSemesterDetails = async (id) => {
  return await getSemester(id);
};

/**
 * Fetch all semesters.
 */
export const fetchAllSemesters = async () => {
  return await getAllSemesters();
};

/**
 * Save or update semester data.
 */
export const saveSemester = async (id, data) => {
  const semesterData = {
    title: data.title || '',
    order: Number(data.order) || 0,
    updatedAt: new Date().toISOString()
  };
  await createSemester(id, semesterData);
};

/**
 * Delete a semester.
 */
export const removeSemester = async (id) => {
  await deleteSemester(id);
};
