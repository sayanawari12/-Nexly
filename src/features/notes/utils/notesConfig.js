/**
 * notesConfig.js — Central registry of all Notes PDFs across semesters.
 * To add a new subject: simply add a new entry here.
 * No other component needs to be changed.
 */

export const NOTES_REGISTRY = {
  // ── Semester 2 ──────────────────────────────────────────────────────────────
  'semester-2': {
    label: 'Semester 2',
    subjects: {
      'data-structures': {
        title: 'Data Structures',
        code: 'BCA-202',
        icon: '🌳',
        color: '#a855f7',
        pdfPath: '/notes/semester2/DS_Notes.pdf',
        description: 'Complete handwritten notes covering all 9 units of Data Structures.',
        totalPages: 60,
      },
      'operating-systems': {
        title: 'Operating Systems',
        code: 'BCA-201',
        icon: '⚙️',
        color: '#3b82f6',
        pdfPath: '/notes/semester2/OS_Notes.pdf',
        description: 'Handwritten notes for Operating Systems — processes, scheduling, memory.',
        totalPages: null, // placeholder — add PDF later
      },
    },
  },

  // ── Semester 3 ──────────────────────────────────────────────────────────────
  'semester-3': {
    label: 'Semester 3',
    subjects: {
      'dbms': {
        title: 'Database Management System',
        code: 'BCA-302',
        icon: '🗄️',
        color: '#10b981',
        pdfPath: '/notes/semester3/DBMS_Notes.pdf',
        description: 'Complete DBMS notes — ER diagrams, normalization, SQL queries.',
        totalPages: null,
      },
    },
  },
};

/**
 * Resolve the PDF config for a given semester + subject pair.
 */
export const resolveNotes = (semesterId, subjectId) => {
  return NOTES_REGISTRY?.[semesterId]?.subjects?.[subjectId] ?? null;
};
