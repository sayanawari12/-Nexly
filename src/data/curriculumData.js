// Centralized Single Source of Truth for BCA Curriculum Semesters & Subjects

export const SEMESTER_SUBJECTS_DATA = [
  {
    semester: 'Semester 1',
    title: 'Programming Foundations',
    subjects: [
      { code: 'BCA-101', name: 'Problem Solving Using C', path: '/curriculum/semester-1/problem-solving-using-c' },
      { code: 'BCA-102', name: 'Computer Architecture', path: '/curriculum/semester-2/computer-architecture' },
      { code: 'BCA-103', name: 'Mathematics Foundation', path: '/curriculum/semester-2/mathematics-foundation' },
      { code: 'BCA-104', name: 'General English', path: '/curriculum/semester-1/general-english' },
      { code: 'BCA-105', name: 'Indian Knowledge System', path: '/curriculum/semester-2/indian-knowledge-system' },
      { code: 'BCA-106', name: 'Environmental Science', path: '/curriculum/semester-2/environmental-science' }
    ]
  },
  {
    semester: 'Semester 2',
    title: 'Object Orientation & Structures',
    subjects: [
      { code: 'BCA-201', name: 'OOP using C++', path: '/curriculum/semester-2/cpp-oop' },
      { code: 'BCA-202', name: 'Data Structures', path: '/curriculum/semester-2/data-structures' },
      { code: 'BCA-203', name: 'Operating Systems', path: '/curriculum/semester-2/operating-systems' },
      { code: 'BCA-204', name: 'Web Technologies', path: '/curriculum/semester-2/web-technologies' },
      { code: 'BCA-205', name: 'Object Oriented Programming Using Java', path: '/curriculum/semester-2/java-oop' },
      { code: 'BCA-206', name: 'Indian Constitution', path: '/curriculum/semester-2/indian-constitution' }
    ]
  }
];

export const EXAM_TYPES = [
  { id: 'summer', name: 'Summer Examination' },
  { id: 'winter', name: 'Winter Examination' }
];

// Course started in 2025 (No years before 2025)
export const EXAM_YEARS = [2025, 2026];

// Registered Past Paper PDFs Registry
export const REGISTERED_PYQ_PAPERS = {
  'BCA-205_winter_2025': {
    pdfPath: '/papers/semester2/OOP_Java_Winter_2025.pdf',
    title: 'Object Oriented Programming Using Java (BCA-205) — Winter 2025',
    size: '640 KB',
    downloads: 1420
  }
};

export const getPyqPdfPath = (subjectCode, examTypeId, year) => {
  const key = `${subjectCode}_${examTypeId}_${year}`;
  if (REGISTERED_PYQ_PAPERS[key]) {
    return REGISTERED_PYQ_PAPERS[key].pdfPath;
  }
  return '/notes/semester2/DS_Notes.pdf';
};
