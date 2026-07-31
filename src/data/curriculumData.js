// Centralized Single Source of Truth for BCA Curriculum Semesters & Subjects

export const SEMESTER_SUBJECTS_DATA = [
  {
    semester: 'Semester 1',
    title: 'Programming Foundations',
    subjects: [
      { code: 'BCA-101', name: 'Problem Solving Using C', category: 'Programming', path: '/curriculum/semester-1/problem-solving-using-c', desc: 'Learn programming fundamentals, arrays, pointers, structures, and memory management using C.' },
      { code: 'BCA-102', name: 'Computer Architecture', category: 'Theory', path: '/curriculum/semester-2/computer-architecture', desc: 'Study CPU organization, memory hierarchy, instruction execution, and digital logic gates.' },
      { code: 'BCA-103', name: 'Mathematics Foundation', category: 'Theory', path: '/curriculum/semester-2/mathematics-foundation', desc: 'Build logic foundations through sets, matrices, relations, and graph theory.' },
      { code: 'BCA-104', name: 'General English', category: 'Practical', path: '/curriculum/semester-1/general-english', desc: 'Develop professional communication, technical writing, and business vocabulary.' },
      { code: 'BCA-105', name: 'Indian Knowledge System', category: 'Theory', path: '/curriculum/semester-2/indian-knowledge-system', desc: "Explore India's traditional scientific heritage and its modern applications." },
      { code: 'BCA-106', name: 'Environmental Science', category: 'Theory', path: '/curriculum/semester-2/environmental-science', desc: 'Understand sustainable development, ecological conservation, and climate policies.' }
    ]
  },
  {
    semester: 'Semester 2',
    title: 'Object Orientation & Structures',
    subjects: [
      { code: 'BCA-201', name: 'OOP using C++', category: 'Programming', path: '/curriculum/semester-2/cpp-oop', desc: 'Master classes, objects, inheritance, polymorphism, templates, and exception handling.' },
      { code: 'BCA-202', name: 'Data Structures', category: 'Programming', path: '/curriculum/semester-2/data-structures', desc: 'Study linked lists, stacks, queues, binary trees, sorting, searching, and complexity.' },
      { code: 'BCA-203', name: 'Operating Systems', category: 'Theory', path: '/curriculum/semester-2/operating-systems', desc: 'Understand threads, scheduling algorithms, paging systems, and mutual exclusions.' },
      { code: 'BCA-204', name: 'Web Technologies', category: 'Practical', path: '/curriculum/semester-2/web-technologies', desc: 'Build responsive web interfaces using HTML5, CSS3, DOM APIs, and JavaScript.' },
      { code: 'BCA-205', name: 'OOP using Java', category: 'Programming', path: '/curriculum/semester-2/java-oop', desc: 'Study Java platform core, memory compilation, exception safety, and packages.' },
      { code: 'BCA-206', name: 'Indian Constitution', category: 'Theory', path: '/curriculum/semester-2/indian-constitution', desc: 'Explore state structures, fundamental rights, and civil law guidelines.' }
    ]
  }
];

// Scalable PYQ Generator starting from 2025 onwards (No papers before 2025 as course started in 2025)
export const GENERATE_SUBJECT_PYQS = (subjectCode, subjectName, semester) => {
  const papersConfig = [
    { type: 'Mid Semester', year: 2025, size: '2.1 MB', ext: 'PDF', downloads: 1420 },
    { type: 'End Semester', year: 2025, size: '3.8 MB', ext: 'ZIP', downloads: 2850 },
    { type: 'Mid Semester', year: 2026, size: '1.9 MB', ext: 'PDF', downloads: 980 },
    { type: 'End Semester', year: 2026, size: '4.1 MB', ext: 'ZIP', downloads: 1640 }
  ];

  return papersConfig.map((paper) => ({
    id: `pyq-${subjectCode}-${paper.year}-${paper.type.toLowerCase().replace(/\s+/g, '-')}`,
    subjectCode,
    subjectName,
    semester,
    name: `${subjectName} (${subjectCode}) — ${paper.type} ${paper.year}`,
    desc: `Official university ${paper.type.toLowerCase()} examination paper for ${subjectName} (${paper.year}) with step-by-step solved answer key.`,
    category: 'Past Papers (PYQs)',
    examType: paper.type,
    examYear: paper.year,
    ext: paper.ext,
    size: paper.size,
    downloads: paper.downloads
  }));
};
