/**
 * GLOBAL INTELLIGENT SEARCH ENGINE SERVICE
 * Comprehensive Indexed Search Database across Technologies, Subjects, Chapters, Programs, PDFs & Navigation
 */

export const SEARCH_INDEX_DATABASE = [
  // ── 🏠 PLATFORM NAVIGATION ──
  { id: 'nav-home', title: 'Home Overview', desc: 'Return to BCA Department platform main landing page.', category: '🏠 Navigation', type: 'navigation', path: '/', keywords: ['home', 'landing', 'main', 'bca', 'department'] },
  { id: 'nav-dashboard', title: 'Student Dashboard', desc: 'View overall study metrics, progress trackers, and recent activity.', category: '🏠 Navigation', type: 'navigation', path: '/dashboard', keywords: ['dashboard', 'stats', 'progress', 'tracker', 'metrics', 'analytics'] },
  { id: 'nav-roadmap', title: 'Curriculum Roadmaps', desc: 'Interactive visual step-by-step roadmap from Semester 1 to Semester 6.', category: '🏠 Navigation', type: 'navigation', path: '/roadmap', keywords: ['roadmap', 'curriculum', 'path', 'semester', 'steps'] },
  { id: 'nav-resources', title: 'Study Resources & Downloads', desc: 'Access lab manuals, syllabus, PYQ question papers, and cheat sheets.', category: '🏠 Navigation', type: 'navigation', path: '/resources', keywords: ['resources', 'downloads', 'notes', 'pdf', 'pyq', 'lab', 'manual'] },

  // ── 💻 TECHNOLOGIES & PROGRAMMING LANGUAGES ──
  { id: 'tech-c', title: 'C Programming Masterclass', desc: 'Mother of modern languages — memory management, pointers, and compiler mechanics.', category: '💻 Technologies', type: 'technology', path: '/technologies/c', keywords: ['c', 'c lang', 'c programming', 'pointers', 'memory', 'dennis ritchie', 'gcc'] },
  { id: 'tech-cpp', title: 'C++ Systems & OOP Architecture', desc: 'High-performance OOP, STL containers, virtual functions, and memory optimization.', category: '💻 Technologies', type: 'technology', path: '/technologies/cpp', keywords: ['cpp', 'c++', 'cplusplus', 'oop', 'stl', 'templates', 'unreal', 'game dev'] },
  { id: 'tech-java', title: 'Java Enterprise & Android', desc: 'JVM architecture, Spring Boot microservices, multithreading, and OOP.', category: '💻 Technologies', type: 'technology', path: '/technologies/java', keywords: ['java', 'jvm', 'spring boot', 'android', 'oop', 'enterprise', 'garbage collection'] },
  { id: 'tech-python', title: 'Python Data Science & AI', desc: 'Versatile language for Machine Learning, Pandas data analysis, and Django backends.', category: '💻 Technologies', type: 'technology', path: '/technologies/python', keywords: ['python', 'py', 'ai', 'machine learning', 'data science', 'pandas', 'numpy', 'django'] },
  { id: 'tech-js', title: 'JavaScript ES6+ Full-Stack', desc: 'Core language of the web — DOM manipulation, React, Node.js, and Async/Await.', category: '💻 Technologies', type: 'technology', path: '/technologies/javascript', keywords: ['javascript', 'js', 'es6', 'react', 'node', 'frontend', 'backend', 'web'] },
  { id: 'tech-ts', title: 'TypeScript Type-Safe Systems', desc: 'Typed JavaScript superset for enterprise scalable web applications.', category: '💻 Technologies', type: 'technology', path: '/technologies/typescript', keywords: ['typescript', 'ts', 'types', 'type safety', 'interfaces', 'react'] },
  { id: 'tech-go', title: 'Go (Golang) Cloud Native', desc: 'Google cloud-native concurrency language with goroutines and ultra-fast compilation.', category: '💻 Technologies', type: 'technology', path: '/technologies/go', keywords: ['go', 'golang', 'goroutines', 'cloud', 'docker', 'kubernetes', 'backend'] },
  { id: 'tech-rust', title: 'Rust Systems Safety', desc: 'Zero-cost abstractions with compile-time borrow checker memory safety.', category: '💻 Technologies', type: 'technology', path: '/technologies/rust', keywords: ['rust', 'borrow checker', 'memory safety', 'cargo', 'webassembly', 'systems'] },
  { id: 'tech-php', title: 'PHP & Web Development', desc: 'Server-side web development powering CMS frameworks and Laravel backends.', category: '💻 Technologies', type: 'technology', path: '/technologies/php', keywords: ['php', 'laravel', 'wordpress', 'web backend', 'mysql', 'server'] },
  { id: 'tech-kotlin', title: 'Kotlin Native & Android', desc: 'Modern concise jetpack compose language for official Android development.', category: '💻 Technologies', type: 'technology', path: '/technologies/kotlin', keywords: ['kotlin', 'android', 'jetpack compose', 'mobile', 'jvm'] },
  { id: 'tech-cs', title: 'C# & .NET Enterprise', desc: 'Microsoft enterprise software, ASP.NET Web APIs, and Unity 3D game engines.', category: '💻 Technologies', type: 'technology', path: '/technologies/csharp', keywords: ['c#', 'csharp', 'dotnet', '.net', 'unity', 'game dev', 'asp.net'] },
  { id: 'tech-swift', title: 'Swift iOS & Apple Ecosystem', desc: 'Apple modern language for iOS, macOS, watchOS, and SwiftUI applications.', category: '💻 Technologies', type: 'technology', path: '/technologies/swift', keywords: ['swift', 'swiftui', 'ios', 'apple', 'mac', 'iphone', 'xcode'] },

  // ── 📚 SUBJECTS & CURRICULUM (SEMESTERS 1, 2 & 3) ──
  { id: 'subj-c-sem1', title: 'Problem Solving Using C (BCA-101)', desc: 'Semester 1 mandatory foundational programming course.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-1/problem-solving-using-c', keywords: ['bca-101', 'c subject', 'semester 1', 'problem solving', 'first semester'] },
  { id: 'subj-co-sem1', title: 'Computer Architecture & Assembly (BCA-102)', desc: 'CPU logic gates, ALU, memory hierarchy, and machine instruction sets.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/computer-architecture', keywords: ['bca-102', 'computer architecture', 'co', 'alu', 'cpu', 'registers', 'assembly'] },
  { id: 'subj-os-sem2', title: 'Operating Systems & Kernel (BCA-201)', desc: 'Process scheduling, deadlocks, paging virtual memory, and file systems.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/operating-systems', keywords: ['bca-201', 'os', 'operating system', 'kernel', 'deadlock', 'paging', 'virtual memory', 'processes'] },
  { id: 'subj-dbms-sem3', title: 'Database Management System (DBMS) (BCA-302)', desc: 'Relational database design, ER modeling, SQL queries, normalization, and ACID properties.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/dbms', keywords: ['bca-302', 'dbms', 'sql', 'database', 'queries', 'normalization', 'transactions', 'keys', 'semester 3'] },
  { id: 'subj-prob-sem3', title: 'Probability & Statistics (BCA-301)', desc: 'Descriptive statistics, probability distributions, hypothesis testing, and statistical inferences.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/probability-and-statistics', keywords: ['bca-301', 'probability', 'statistics', 'math', 'semester 3', 'stats', 'hypothesis'] },
  { id: 'subj-py-sem3', title: 'Python Programming (BCA-303)', desc: 'Python language fundamentals, OOP structures, data manipulation, file handling, and library ecosystem.', category: '📚 Subjects', type: 'subject', path: '/technologies/python', keywords: ['bca-303', 'python', 'python programming', 'py', 'semester 3', 'pandas', 'numpy'] },
  { id: 'subj-se-sem3', title: 'Software Engineering (BCA-304)', desc: 'Software development life cycle (SDLC), Agile methodologies, software testing, UML modeling, and architecture.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/software-engineering', keywords: ['bca-304', 'software engineering', 'sdlc', 'agile', 'scrum', 'uml', 'testing', 'semester 3'] },
  { id: 'subj-fe-sem3', title: 'Feature Engineering (BCA-305)', desc: 'Data preprocessing, feature selection, transformation, encoding, and dimensional reduction for ML models.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/feature-engineering', keywords: ['bca-305', 'feature engineering', 'ai', 'data science', 'machine learning', 'pca', 'one hot', 'semester 3'] },
  { id: 'subj-da-sem3', title: 'Basics of Data Analytics using Spreadsheets (BCA-306)', desc: 'Excel & spreadsheet data cleaning, pivot tables, VLOOKUP/XLOOKUP, formulas, data visualization, and reporting.', category: '📚 Subjects', type: 'subject', path: '/curriculum/semester-2/data-analytics-spreadsheets', keywords: ['bca-306', 'analytics', 'spreadsheet', 'excel', 'vlookup', 'pivot table', 'data analytics', 'semester 3'] },

  // ── 📖 CHAPTERS & TOPICS ──
  { id: 'chap-c-intro', title: 'Introduction to C & GCC Setup', desc: 'Understanding machine instructions, standard I/O, and compilation stages.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['intro', 'gcc', 'compilation', 'hello world', 'printf', 'scanf', 'stdio'] },
  { id: 'chap-c-vars', title: 'Variables, Constants & Data Types', desc: 'Primitive types (int, float, double, char) and storage classes.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['variables', 'data types', 'int', 'float', 'char', 'constants', 'storage class'] },
  { id: 'chap-c-loops', title: 'Control Flow & Loops', desc: 'if-else decision branching, switch-case, for, while, and do-while loops.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['loops', 'for loop', 'while loop', 'if else', 'switch case', 'break', 'continue'] },
  { id: 'chap-c-ptrs', title: 'Pointers & Address Arithmetic', desc: 'Address-of operator (&), dereferencing (*), pointer arithmetic, and void pointers.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['pointers', 'address', 'memory address', 'dereference', 'pointer arithmetic', 'void pointer'] },
  { id: 'chap-c-structs', title: 'Structures, Unions & typedef', desc: 'Creating custom composite types with struct, memory alignment, and bitfields.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['structures', 'struct', 'unions', 'typedef', 'arrow operator', 'composite type'] },
  { id: 'chap-c-alloc', title: 'Dynamic Memory Allocation (Heap)', desc: 'Allocating runtime memory with malloc(), calloc(), realloc(), and freeing memory.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['dynamic memory', 'malloc', 'calloc', 'realloc', 'free', 'heap', 'memory leak'] },
  { id: 'chap-c-files', title: 'File Handling & Binary I/O', desc: 'FILE pointers, fopen(), fclose(), fprintf(), fscanf(), and binary file read/write.', category: '📖 Chapters', type: 'chapter', path: '/technologies/c', keywords: ['files', 'file handling', 'fopen', 'fclose', 'fread', 'fwrite', 'binary io'] },
  { id: 'chap-cpp-oop', title: 'C++ Object-Oriented Programming (OOP)', desc: 'Encapsulation, inheritance, polymorphism, virtual functions, and abstract classes.', category: '📖 Chapters', type: 'chapter', path: '/technologies/cpp', keywords: ['cpp oop', 'encapsulation', 'inheritance', 'polymorphism', 'virtual functions', 'abstract class'] },
  { id: 'chap-cpp-stl', title: 'C++ Standard Template Library (STL)', desc: 'Vectors, maps, sets, queues, iterators, and std::sort algorithms.', category: '📖 Chapters', type: 'chapter', path: '/technologies/cpp', keywords: ['stl', 'vector', 'map', 'set', 'iterators', 'sort', 'containers'] },

  // ── 💻 PRACTICAL PROGRAMS & CODES ──
  { id: 'prog-hello', title: 'Hello World in C, C++, Java & Python', desc: 'Standard entry-point boilerplate programs across major languages.', category: '💻 Programs', type: 'program', path: '/technologies/c', keywords: ['hello world', 'boilerplate', 'entry point', 'main function'] },
  { id: 'prog-palindrome', title: 'Palindrome String & Number Checker', desc: 'Algorithm to check if string or integer reads the same backwards.', category: '💻 Programs', type: 'program', path: '/technologies/c', keywords: ['palindrome', 'string reverse', 'reverse number', 'algorithm'] },
  { id: 'prog-factorial', title: 'Factorial Calculation (Iterative & Recursive)', desc: 'Computing n! using loops and recursive function calls.', category: '💻 Programs', type: 'program', path: '/technologies/c', keywords: ['factorial', 'recursion', 'iterative', 'n!'] },
  { id: 'prog-swap-ptr', title: 'Swap Two Variables using Pointers', desc: 'Call-by-reference variable swapping with pointer dereferencing.', category: '💻 Programs', type: 'program', path: '/technologies/c', keywords: ['swap', 'pointers swap', 'call by reference', 'dereferencing'] },
  { id: 'prog-bubble-sort', title: 'Bubble Sort & Selection Sort', desc: 'Implementation of fundamental array sorting algorithms with complexity analysis.', category: '💻 Programs', type: 'program', path: '/technologies/c', keywords: ['bubble sort', 'sorting', 'selection sort', 'array sorting', 'time complexity'] },
  { id: 'prog-matrix-mult', title: '2D Matrix Multiplication & Transpose', desc: '2D array grid operations, row-column multiplication, and matrix symmetry check.', category: '💻 Programs', type: 'program', path: '/technologies/c', keywords: ['matrix', 'matrix multiplication', '2d array', 'transpose', 'symmetry'] },

  // ── 📥 DOWNLOADS & STUDY MATERIALS ──
  { id: 'dl-c-cheat', title: 'C Language Pointers Cheat Sheet (PDF)', desc: 'Quick 2-page visual PDF guide for memory layout & pointer rules.', category: '📥 Downloads', type: 'download', path: '/resources', keywords: ['cheat sheet', 'c cheat sheet', 'pdf notes', 'pointers cheat sheet'] },
  { id: 'dl-lab-manual', title: 'BCA Semester 1 & 2 Official Lab Manual', desc: 'Complete verified lab codes with output snapshots for end-sem exams.', category: '📥 Downloads', type: 'download', path: '/resources', keywords: ['lab manual', 'bca lab manual', 'practical codes', 'exam lab'] },
  { id: 'dl-pyq-archive', title: 'University PYQ Question Papers (2020–2025)', desc: 'Zip archive containing last 5 years solved university examination papers.', category: '📥 Downloads', type: 'download', path: '/resources', keywords: ['pyq', 'question papers', 'past papers', 'exam papers', 'solved pyq'] },
  { id: 'dl-knr-book', title: 'The C Programming Language (K&R PDF)', desc: 'Classic Dennis Ritchie & Brian Kernighan official reference textbook.', category: '📥 Downloads', type: 'download', path: '/resources', keywords: ['k&r', 'ritchie', 'c book', 'reference book', 'textbook pdf'] },

  // ── 🧰 INTERVIEW QUESTIONS & PREP ──
  { id: 'int-c-vs-cpp', title: 'Difference between C and C++', desc: 'Comparison of procedural vs object-oriented, pointers vs references, malloc vs new.', category: '🧰 Interview Qs', type: 'interview', path: '/technologies/c', keywords: ['c vs cpp', 'interview question', 'procedural vs oop', 'malloc vs new'] },
  { id: 'int-dangling-ptr', title: 'What is a Dangling Pointer & Wild Pointer?', desc: 'Memory safety hazards, uninitialized pointers, and freeing allocated blocks.', category: '🧰 Interview Qs', type: 'interview', path: '/technologies/c', keywords: ['dangling pointer', 'wild pointer', 'null pointer', 'memory safety'] },
  { id: 'int-stack-vs-heap', title: 'Stack vs Heap Memory Allocation', desc: 'Explaining execution call stack vs dynamic heap memory segment.', category: '🧰 Interview Qs', type: 'interview', path: '/technologies/c', keywords: ['stack vs heap', 'memory segments', 'call stack', 'heap memory'] }
];

/**
 * Intelligent Debounced Search Engine Function
 * Performs multi-keyword token matching, title ranking, and category grouping.
 */
export const searchPlatformIndex = (rawQuery) => {
  const query = rawQuery.trim().toLowerCase();
  if (!query) return [];

  const tokens = query.split(/\s+/).filter(Boolean);

  const scoredResults = SEARCH_INDEX_DATABASE.map((item) => {
    let score = 0;
    const titleLower = item.title.toLowerCase();
    const descLower = item.desc.toLowerCase();
    const categoryLower = item.category.toLowerCase();

    // Exact title match gets highest score
    if (titleLower === query) score += 100;
    else if (titleLower.startsWith(query)) score += 50;
    else if (titleLower.includes(query)) score += 30;

    // Token matching across keywords, desc, and category
    tokens.forEach((token) => {
      if (titleLower.includes(token)) score += 15;
      if (descLower.includes(token)) score += 8;
      if (categoryLower.includes(token)) score += 10;

      if (item.keywords && item.keywords.some((k) => k.toLowerCase().includes(token))) {
        score += 20;
      }
    });

    return { item, score };
  });

  // Filter items with score > 0 and sort by highest relevance score
  return scoredResults
    .filter((res) => res.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((res) => res.item);
};

export default SEARCH_INDEX_DATABASE;
