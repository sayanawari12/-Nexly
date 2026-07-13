import { 
  getUnit, 
  getUnitsBySubject, 
  getAllUnits, 
  createUnit, 
  updateUnit, 
  deleteUnit 
} from '../../repositories/unitRepository';

/**
 * Fetch unit details by ID.
 */
export const fetchUnitDetails = async (id) => {
  return await getUnit(id);
};

/**
 * Fetch all units for a specific subject.
 */
export const fetchUnitsForSubject = async (subjectId) => {
  return await getUnitsBySubject(subjectId);
};

/**
 * Fetch all units.
 */
export const fetchAllUnits = async () => {
  return await getAllUnits();
};

/**
 * Save or update a unit.
 */
export const saveUnit = async (id, data) => {
  const unitData = {
    subjectId: data.subjectId,
    title: data.title || '',
    order: Number(data.order) || 0,
    updatedAt: new Date().toISOString()
  };
  await createUnit(id, unitData);
};

/**
 * Delete a unit.
 */
export const removeUnit = async (id) => {
  await deleteUnit(id);
};
