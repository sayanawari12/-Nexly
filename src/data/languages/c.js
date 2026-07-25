import { TECH_LOGOS } from '../../components/sections/TechLogos';

export const cData = {
  id: 'c',
  name: 'C',
  title: 'C Programming Masterclass',
  tagline: 'The mother of modern programming languages. Master foundational memory management, pointers, and compiler mechanics.',
  difficulty: 'Beginner',
  category: 'System & Core',
  estimatedTime: '15–20 Hours',
  prerequisites: 'None (Basic Computer Logic & High School Math)',
  totalModules: 10,
  totalLessons: 26,
  totalPrograms: 45,
  svg: TECH_LOGOS.c,
  nextLanguage: 'cpp',
  nextLanguageName: 'C++',
  about: {
    what: 'C is a procedural programming language developed in 1972 by Dennis Ritchie at Bell Labs. It serves as the foundation for modern operating systems, compilers, database engines, and embedded microcontrollers.',
    where: 'Operating System Kernels (Linux, Windows, macOS), Database Engines (MySQL, SQLite), Embedded Systems, Microcontrollers, Game Engines, and Low-Latency Financial Systems.',
    why: 'Provides direct hardware memory access, manual pointer arithmetic, high execution speed, and essential computer science fundamentals required for all BCA coursework.',
    career: 'Essential foundation for Systems Software Engineers, Kernel Developers, Embedded Engineers, and Computer Science Academics.'
  },
  whyLearn: [
    'Low-level memory management and direct pointer manipulation.',
    'Core foundation behind Operating System kernels (Linux, Windows, macOS).',
    'Ultra-high execution speed and minimal runtime memory overhead.',
    'Primary mandatory prerequisite for BCA academic curriculum success.'
  ],
  progress: {
    percentage: 70,
    completedModules: 7,
    remainingModules: 3,
    currentChapter: 'Step 14: Pointers & Address Operators'
  },
  roadmapNodes: [
    { id: 1, title: '01. Introduction & Overview', status: 'completed', desc: 'Understanding machine instructions, compilers, and C architecture.' },
    { id: 2, title: '02. History & Evolution of C', status: 'completed', desc: 'Dennis Ritchie, Bell Labs, ANSI C, C99, C11, C17 standards.' },
    { id: 3, title: '03. Compiler Setup & Toolchain', status: 'completed', desc: 'GCC, Clang, VS Code, linking binaries and header files.' },
    { id: 4, title: '04. First C Program (Hello World)', status: 'completed', desc: 'Main function, stdio.h header, compilation phases.' },
    { id: 5, title: '05. Input & Output Streams', status: 'completed', desc: 'Format specifiers (%d, %f, %c, %s), printf() and scanf().' },
    { id: 6, title: '06. Variables & Constants', status: 'completed', desc: 'Identifiers, const qualifier, variable scoping, storage classes.' },
    { id: 7, title: '07. Data Types & Typecasting', status: 'completed', desc: 'Primitive types (int, float, double, char), implicit/explicit casting.' },
    { id: 8, title: '08. Operators & Expressions', status: 'completed', desc: 'Arithmetic, relational, logical, bitwise, and assignment operators.' },
    { id: 9, title: '09. Decision Making Structures', status: 'completed', desc: 'if, if-else, nested condition statements, switch-case blocks.' },
    { id: 10, title: '10. Loops & Iterations', status: 'completed', desc: 'for loops, while loops, do-while loops, break & continue.' },
    { id: 11, title: '11. Modular Functions', status: 'completed', desc: 'Function prototypes, pass-by-value, pass-by-reference, recursion.' },
    { id: 12, title: '12. Arrays & Grid Matrices', status: 'completed', desc: '1D arrays, 2D matrix operations, array boundary safety.' },
    { id: 13, title: '13. Strings & Character Arrays', status: 'completed', desc: 'Null terminator \\0, string.h library (strcpy, strcmp, strlen, strcat).' },
    { id: 14, title: '14. Pointers & Address Operators', status: 'current', desc: 'Address-of (&), dereference (*), pointer arithmetic, void pointers.' },
    { id: 15, title: '15. Structures & typedef Types', status: 'unlocked', desc: 'struct definitions, member access (.), arrow operator (->), typedef.' },
    { id: 16, title: '16. Unions & Bit-Fields', status: 'locked', desc: 'Shared memory unions, memory-efficient bit-field structs.' },
    { id: 17, title: '17. Dynamic Memory Management', status: 'locked', desc: 'Heap allocation with malloc(), calloc(), realloc(), free().' },
    { id: 18, title: '18. File Handling Operations', status: 'locked', desc: 'FILE pointer, fopen(), fclose(), fprintf(), fscanf(), binary I/O.' },
    { id: 19, title: '19. Mini Capstone Project', status: 'locked', desc: 'Building Student Management System CLI app.' },
    { id: 20, title: '20. Final Assessment & Certificate', status: 'locked', desc: 'Comprehensive exam & practical lab evaluation.' }
  ],
  modules: [
    { id: 'm1', name: 'Module 1: Syntax & Environment Setup', status: 'completed', lessons: 4, time: '2 hrs', icon: 'FileText' },
    { id: 'm2', name: 'Module 2: Variables & Data Types', status: 'completed', lessons: 3, time: '2 hrs', icon: 'Code' },
    { id: 'm3', name: 'Module 3: Control Flow & Loops', status: 'completed', lessons: 4, time: '2.5 hrs', icon: 'Layers' },
    { id: 'm4', name: 'Module 4: Modular Functions & Recursion', status: 'completed', lessons: 3, time: '2 hrs', icon: 'Binary' },
    { id: 'm5', name: 'Module 5: Arrays & Matrix Operations', status: 'completed', lessons: 4, time: '3 hrs', icon: 'Target' },
    { id: 'm6', name: 'Module 6: String Manipulation', status: 'completed', lessons: 3, time: '2.5 hrs', icon: 'Shield' },
    { id: 'm7', name: 'Module 7: Pointers & Memory Addresses', status: 'in_progress', lessons: 4, time: '3.5 hrs', icon: 'Target' },
    { id: 'm8', name: 'Module 8: Structures & Custom Types', status: 'unlocked', lessons: 3, time: '2.5 hrs', icon: 'Shield' },
    { id: 'm9', name: 'Module 9: Dynamic Heap Allocation', status: 'locked', lessons: 3, time: '3 hrs', icon: 'Binary' },
    { id: 'm10', name: 'Module 10: File I/O & Capstone Project', status: 'locked', lessons: 3, time: '3.5 hrs', icon: 'BookOpen' }
  ],
  resources: [
    { title: 'C Memory Allocation Cheat Sheet', type: 'PDF', size: '2.4 MB', ext: 'PDF' },
    { title: 'BCA Pointer Operations Lab Manual', type: 'PDF', size: '1.8 MB', ext: 'PDF' },
    { title: 'C End-Sem Exam PYQs (2020–2025)', type: 'ZIP', size: '4.2 MB', ext: 'ZIP' },
    { title: 'The C Programming Language (K&R Reference)', type: 'Book', size: 'Reference', ext: 'PDF' },
    { title: 'Interactive C Memory Simulator', type: 'Tool', size: 'Web App', ext: 'LINK' }
  ],
  practice: [
    { id: 'p1', title: 'Swap Two Variables using Pointers', difficulty: 'Easy', status: 'Solved' },
    { id: 'p2', title: 'Factorial Calculation using Recursion', difficulty: 'Easy', status: 'Solved' },
    { id: 'p3', title: 'Check Matrix Symmetry & Transpose', difficulty: 'Medium', status: 'Solved' },
    { id: 'p4', title: 'Dynamic Array Allocation with realloc()', difficulty: 'Medium', status: 'Solved' },
    { id: 'p5', title: 'Reverse a Singly Linked List in C', difficulty: 'Hard', status: 'Unsolved' },
    { id: 'p6', title: 'Implement Custom Malloc Memory Allocator', difficulty: 'Hard', status: 'Unsolved' }
  ],
  miniProjects: [
    { id: 'proj1', title: 'Console Calculator CLI', difficulty: 'Easy', desc: 'Build an interactive multi-operation mathematical CLI tool.', status: 'Completed' },
    { id: 'proj2', title: 'Number Guessing Game', difficulty: 'Easy', desc: 'Random number generator with feedback loop and score logging.', status: 'Completed' },
    { id: 'proj3', title: 'Student Record Management System', difficulty: 'Medium', desc: 'CRUD operations on student records saved to file storage.', status: 'In Progress' },
    { id: 'proj4', title: 'Bank Account Management System', difficulty: 'Medium', desc: 'Account creation, deposit, withdrawal, and transaction logging.', status: 'Unlocked' },
    { id: 'proj5', title: 'Library Book Catalog System', difficulty: 'Hard', desc: 'Book cataloging with binary search and struct storage.', status: 'Locked' }
  ]
};

export default cData;
