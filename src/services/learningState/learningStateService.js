import { saveLearningStateEntry, getLearningStateEntry } from '../../repositories/learningStateRepository';

/**
 * Save or update continue learning state in Firestore.
 */
export const updateLastOpenedLesson = async (
  uid, 
  lessonId, 
  subjectId, 
  unitId, 
  semesterId, 
  progressPercentage = 0,
  estimatedRemainingTime = '15 mins',
  isCompleted = false
) => {
  if (!uid || !lessonId) return;

  const data = {
    currentSemesterId: semesterId,
    currentSubjectId: subjectId,
    currentUnitId: unitId,
    currentLessonId: lessonId,
    lastOpened: new Date().toISOString(),
    progressPercentage,
    estimatedRemainingTime,
    isCompleted,
    updatedAt: new Date().toISOString()
  };

  await saveLearningStateEntry(uid, data);
};

/**
 * Load the current continue learning state from repository.
 */
export const loadLearningState = async (uid) => {
  if (!uid) return null;
  return await getLearningStateEntry(uid);
};

/**
 * Formats learningState into a payload ready for Continue Learning Dashboard Card.
 */
export const getDashboardCardData = (learningState, subjects = [], units = [], lessons = []) => {
  if (!learningState || !learningState.currentLessonId) {
    return null; // Triggers empty state encouraging students to begin
  }

  const {
    currentSemesterId,
    currentSubjectId,
    currentUnitId,
    currentLessonId,
    lastOpened,
    progressPercentage,
    estimatedRemainingTime,
    isCompleted
  } = learningState;

  const subject = subjects.find(s => s.id === currentSubjectId);
  const unit = units.find(u => u.id === currentUnitId);
  const lesson = lessons.find(l => l.id === currentLessonId);

  return {
    lessonId: currentLessonId,
    lessonTitle: lesson ? lesson.title : 'Loading Lesson...',
    subjectTitle: subject ? subject.title : 'Subject',
    unitTitle: unit ? unit.title : 'Unit',
    difficulty: lesson ? lesson.difficulty : 'Medium',
    estimatedRemainingTime: estimatedRemainingTime || '15 mins',
    progressPercentage: progressPercentage || 0,
    isCompleted: isCompleted || false,
    lastStudiedStr: lastOpened 
      ? new Date(lastOpened).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
      : 'Recently'
  };
};
