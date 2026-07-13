/**
 * Calculate progress for a specific subject.
 */
export const calculateSubjectProgress = (subjectId, units = [], lessons = [], completedSet = new Set(), inProgressSet = new Set()) => {
  const subjectUnits = units.filter(u => u.subjectId === subjectId);
  const subjectUnitIds = new Set(subjectUnits.map(u => u.id));
  const subjectLessons = lessons.filter(l => subjectUnitIds.has(l.unitId));

  const total = subjectLessons.length;
  if (total === 0) return { total: 0, completed: 0, inProgress: 0, percentage: 0, remaining: 0 };

  const completed = subjectLessons.filter(l => completedSet.has(String(l.id)) || completedSet.has(Number(l.id))).length;
  const inProgress = subjectLessons.filter(l => inProgressSet.has(String(l.id)) || inProgressSet.has(Number(l.id))).length;
  const percentage = Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    percentage,
    remaining: Math.max(0, total - completed)
  };
};

/**
 * Calculate progress for a specific unit.
 */
export const calculateUnitProgress = (unitId, lessons = [], completedSet = new Set(), inProgressSet = new Set()) => {
  const unitLessons = lessons.filter(l => l.unitId === unitId);
  const total = unitLessons.length;
  if (total === 0) return { total: 0, completed: 0, inProgress: 0, percentage: 0, remaining: 0 };

  const completed = unitLessons.filter(l => completedSet.has(String(l.id)) || completedSet.has(Number(l.id))).length;
  const inProgress = unitLessons.filter(l => inProgressSet.has(String(l.id)) || inProgressSet.has(Number(l.id))).length;
  const percentage = Math.round((completed / total) * 100);

  return {
    total,
    completed,
    inProgress,
    percentage,
    remaining: Math.max(0, total - completed)
  };
};

/**
 * Calculate progress for a semester.
 */
export const calculateSemesterProgress = (semesterId, subjects = [], units = [], lessons = [], completedSet = new Set()) => {
  const semesterSubjects = subjects.filter(s => s.semesterId === semesterId);
  const semesterSubjectIds = new Set(semesterSubjects.map(s => s.id));
  const semesterUnits = units.filter(u => semesterSubjectIds.has(u.subjectId));
  const semesterUnitIds = new Set(semesterUnits.map(u => u.id));
  const semesterLessons = lessons.filter(l => semesterUnitIds.has(l.unitId));

  const total = semesterLessons.length;
  if (total === 0) return 0;

  const completed = semesterLessons.filter(l => completedSet.has(String(l.id)) || completedSet.has(Number(l.id))).length;
  return Math.round((completed / total) * 100);
};

/**
 * Calculate overall curriculum progress.
 */
export const calculateOverallProgress = (lessons = [], completedSet = new Set()) => {
  const total = lessons.length;
  if (total === 0) return 0;
  const completed = lessons.filter(l => completedSet.has(String(l.id)) || completedSet.has(Number(l.id))).length;
  return Math.round((completed / total) * 100);
};

/**
 * Return general roadmap stats.
 */
export const getRoadmapStatistics = (subjects = [], units = [], lessons = [], completedSet = new Set(), inProgressSet = new Set()) => {
  const stats = {};
  
  subjects.forEach(subject => {
    stats[subject.id] = calculateSubjectProgress(subject.id, units, lessons, completedSet, inProgressSet);
  });

  return stats;
};
