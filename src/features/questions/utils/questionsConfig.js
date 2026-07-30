/**
 * questionsConfig.js — Central registry for Questions feature.
 * One entry per subject. Just add a new subject here to enable
 * the Questions page for it — no other component needs to change.
 */

export const QUESTIONS_REGISTRY = {
  'semester-2': {
    'data-structures': {
      title: 'Data Structures',
      code: 'BCA-202',
      icon: '🌳',
      color: '#a855f7',
      /** URL of the PDF (must be in /public so it can be fetched via HTTP) */
      pdfUrl: '/notes/semester2/DS_Notes.pdf',
      /** Total number of pages = total number of questions */
      totalQuestions: 55,
      /** Route base for linking individual questions */
      basePath: '/curriculum/semester-2/data-structures/questions',
    },
    // Add more subjects here:
    // 'operating-systems': { ... }
  },
};

/**
 * Resolve config for a given semester + subject.
 * Returns null if not found.
 */
export const resolveQuestionsConfig = (semesterId, subjectId) =>
  QUESTIONS_REGISTRY?.[semesterId]?.[subjectId] ?? null;

/**
 * Build a zero-padded question label, e.g. 1 → "Q.01"
 */
export const formatQuestionLabel = (n, total) => {
  const digits = String(total).length;
  return `Q.${String(n).padStart(digits, '0')}`;
};
