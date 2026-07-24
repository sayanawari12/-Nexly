import { TECH_LOGOS } from '../components/sections/TechLogos';

export const LANGUAGE_HUB_DATA = {
  c: {
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
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    title: 'C++ Systems & OOP Architecture',
    tagline: 'High-performance object-oriented language for systems, game engines, and competitive programming.',
    difficulty: 'Intermediate',
    category: 'System & Core',
    estimatedTime: '20–30 Hours',
    prerequisites: 'C Programming Fundamentals',
    totalModules: 8,
    totalLessons: 30,
    totalPrograms: 50,
    svg: TECH_LOGOS.cpp,
    nextLanguage: 'java',
    nextLanguageName: 'Java',
    about: {
      what: 'C++ is an extension of C developed by Bjarne Stroustrup in 1979. It adds Object-Oriented Programming (OOP), templates, exception handling, and the Standard Template Library (STL).',
      where: 'Game Engines (Unreal Engine), Desktop Applications (Adobe Photoshop), Operating System Components, High-Frequency Financial Trading, and Competitive Programming.',
      why: 'Combines low-level C memory performance with zero-cost high-level object-oriented abstractions.',
      career: 'High-demand for Game Developers, Systems Software Engineers, HFT Quant Developers, and Competitive Programmers.'
    },
    whyLearn: [
      'Industry standard for game development (Unreal Engine).',
      'Standard Template Library (STL) for competitive coding.',
      'Object-Oriented Programming (OOP) design patterns.',
      'High-frequency trading and low-latency system development.'
    ],
    progress: {
      percentage: 35,
      completedModules: 3,
      remainingModules: 5,
      currentChapter: 'Module 04: STL Vectors & Maps'
    },
    roadmapNodes: [
      { id: 1, title: 'C++ Fundamentals & I/O Streams', status: 'completed', desc: 'std::cin, std::cout, namespaces, references.' },
      { id: 2, title: 'Classes & Objects', status: 'completed', desc: 'Encapsulation, constructors, destructors, access specifiers.' },
      { id: 3, title: 'Inheritance & Polymorphism', status: 'completed', desc: 'Virtual functions, method overriding, abstract classes.' },
      { id: 4, title: 'STL Containers (Vector, Map, Set)', status: 'current', desc: 'std::vector, std::map, iterators, algorithm header.' },
      { id: 5, title: 'Template Metaprogramming', status: 'unlocked', desc: 'Function templates, class templates, generic types.' },
      { id: 6, title: 'Smart Pointers & RAII', status: 'locked', desc: 'std::unique_ptr, std::shared_ptr, memory safety.' },
      { id: 7, title: 'Exception Handling & Move Semantics', status: 'locked', desc: 'try-catch, rvalue references, std::move.' },
      { id: 8, title: 'Modern C++20/C++23 Concepts', status: 'locked', desc: 'Concepts, ranges, coroutines, modules.' }
    ],
    modules: [
      { id: 'm1', name: 'Module 1: C++ Basics & I/O Streams', status: 'completed', lessons: 4, time: '2 hrs', icon: 'FileText' },
      { id: 'm2', name: 'Module 2: OOP & Class Design', status: 'completed', lessons: 4, time: '3 hrs', icon: 'Layers' },
      { id: 'm3', name: 'Module 3: Polymorphism & Virtual Functions', status: 'completed', lessons: 4, time: '3 hrs', icon: 'Shield' },
      { id: 'm4', name: 'Module 4: Standard Template Library (STL)', status: 'in_progress', lessons: 5, time: '4 hrs', icon: 'Target' },
      { id: 'm5', name: 'Module 5: Templates & Generics', status: 'unlocked', lessons: 4, time: '3 hrs', icon: 'Code' },
      { id: 'm6', name: 'Module 6: Smart Pointers & RAII', status: 'locked', lessons: 3, time: '2.5 hrs', icon: 'Binary' },
      { id: 'm7', name: 'Module 7: Exceptions & Rvalues', status: 'locked', lessons: 3, time: '2 hrs', icon: 'FileText' },
      { id: 'm8', name: 'Module 8: Modern C++ Features', status: 'locked', lessons: 3, time: '2.5 hrs', icon: 'BookOpen' }
    ],
    resources: [
      { title: 'C++ STL Quick Reference Guide', type: 'PDF', size: '2.8 MB', ext: 'PDF' },
      { title: 'Object-Oriented Design Patterns in C++', type: 'PDF', size: '3.5 MB', ext: 'PDF' },
      { title: 'C++ Placement Exam Past Papers', type: 'ZIP', size: '5.1 MB', ext: 'ZIP' }
    ],
    practice: [
      { id: 'p1', title: 'Implement Custom Vector Class', difficulty: 'Medium', status: 'Solved' },
      { id: 'p2', title: 'LRU Cache using STL Map & List', difficulty: 'Hard', status: 'Unsolved' }
    ],
    miniProjects: [
      { id: 'proj1', title: 'Bank Account Management System', difficulty: 'Medium', desc: 'OOP bank system with persistence.', status: 'Completed' }
    ]
  },
  java: {
    id: 'java',
    name: 'Java',
    title: 'Java Enterprise & Android Hub',
    tagline: 'Write Once, Run Anywhere. Enterprise backend systems, Spring Boot framework, and Android app development.',
    difficulty: 'Intermediate',
    category: 'Enterprise & OOP',
    estimatedTime: '25–35 Hours',
    prerequisites: 'Basic Programming Concepts',
    totalModules: 8,
    totalLessons: 28,
    totalPrograms: 40,
    svg: TECH_LOGOS.java,
    nextLanguage: 'python',
    nextLanguageName: 'Python',
    about: {
      what: 'Java is a class-based, object-oriented programming language designed by James Gosling at Sun Microsystems in 1995. Its "Write Once, Run Anywhere" (WORA) philosophy relies on the Java Virtual Machine (JVM).',
      where: 'Enterprise Web Backends (Spring Boot), Mobile Applications (Android SDK), Financial Banking Systems, and Big Data Processing (Apache Hadoop, Spark).',
      why: 'Robust memory safety, automatic garbage collection, platform independence, and massive enterprise adoption.',
      career: 'High demand for Java Backend Engineers, Android Developers, and Enterprise Solutions Architects.'
    },
    whyLearn: [
      'Dominant language for enterprise cloud backends.',
      'Official language for Android mobile app engineering.',
      'Automatic Garbage Collection and JVM platform independence.',
      'Core subject in BCA university curriculum.'
    ],
    progress: {
      percentage: 20,
      completedModules: 2,
      remainingModules: 6,
      currentChapter: 'Module 03: Java Collections Framework'
    },
    roadmapNodes: [
      { id: 1, title: 'Java Syntax & JVM Architecture', status: 'completed', desc: 'JDK, JRE, JVM, bytecode, main method.' },
      { id: 2, title: 'OOP in Java (Inheritance & Interfaces)', status: 'completed', desc: 'Classes, interfaces, abstract classes, packages.' },
      { id: 3, title: 'Java Collections Framework', status: 'current', desc: 'ArrayList, HashMap, HashSet, LinkedList, Iterators.' },
      { id: 4, title: 'Exception Handling & Try-With-Resources', status: 'unlocked', desc: 'Checked/unchecked exceptions, custom exceptions.' },
      { id: 5, title: 'Multithreading & Concurrency', status: 'locked', desc: 'Thread class, Runnable, synchronized, Executors.' },
      { id: 6, title: 'Java I/O & NIO Streams', status: 'locked', desc: 'FileReader, BufferedReader, Serialization.' },
      { id: 7, title: 'Java 8+ Streams & Lambdas', status: 'locked', desc: 'Stream API, filter, map, reduce, Optional.' },
      { id: 8, title: 'Spring Boot Backend Foundations', status: 'locked', desc: 'REST APIs, Dependency Injection, JPA/Hibernate.' }
    ],
    modules: [
      { id: 'm1', name: 'Module 1: Java Core & JVM', status: 'completed', lessons: 4, time: '2.5 hrs', icon: 'FileText' },
      { id: 'm2', name: 'Module 2: OOP & Interfaces', status: 'completed', lessons: 4, time: '3 hrs', icon: 'Layers' },
      { id: 'm3', name: 'Module 3: Collections API', status: 'in_progress', lessons: 4, time: '3.5 hrs', icon: 'Target' },
      { id: 'm4', name: 'Module 4: Exception Handling', status: 'unlocked', lessons: 3, time: '2 hrs', icon: 'Shield' },
      { id: 'm5', name: 'Module 5: Multithreading', status: 'locked', lessons: 4, time: '3.5 hrs', icon: 'Code' },
      { id: 'm6', name: 'Module 6: File Streams & NIO', status: 'locked', lessons: 3, time: '2.5 hrs', icon: 'Binary' },
      { id: 'm7', name: 'Module 7: Lambdas & Streams', status: 'locked', lessons: 3, time: '2.5 hrs', icon: 'FileText' },
      { id: 'm8', name: 'Module 8: Intro to Spring Boot', status: 'locked', lessons: 3, time: '3 hrs', icon: 'BookOpen' }
    ],
    resources: [
      { title: 'Java Collections Framework Cheat Sheet', type: 'PDF', size: '2.1 MB', ext: 'PDF' },
      { title: 'BCA Java Lab Programs & Solutions', type: 'PDF', size: '3.2 MB', ext: 'PDF' }
    ],
    practice: [
      { id: 'p1', title: 'Multithreaded Producer-Consumer Queue', difficulty: 'Hard', status: 'Unsolved' }
    ],
    miniProjects: [
      { id: 'proj1', title: 'Library Catalog System', difficulty: 'Medium', desc: 'Java OOP library management application.', status: 'Completed' }
    ]
  },
  python: {
    id: 'python',
    name: 'Python',
    title: 'Python & Artificial Intelligence Hub',
    tagline: 'Readable, versatile, and powered by massive scientific and AI libraries (NumPy, Pandas, PyTorch, Django).',
    difficulty: 'Beginner',
    category: 'Data & AI',
    estimatedTime: '15–25 Hours',
    prerequisites: 'Basic Algebra & Computer Literacy',
    totalModules: 8,
    totalLessons: 24,
    totalPrograms: 35,
    svg: TECH_LOGOS.python,
    nextLanguage: 'javascript',
    nextLanguageName: 'JavaScript',
    about: {
      what: 'Python is a high-level, interpreted programming language created by Guido van Rossum in 1991. It emphasizes code readability and clean syntax.',
      where: 'Artificial Intelligence, Machine Learning, Data Science, Web Backends (Django, FastAPI), Automation Scripts, and Cyber Security.',
      why: 'Clean syntax, dynamic typing, fast development velocity, and unmatched machine learning ecosystems.',
      career: 'Top choice for Data Scientists, AI/ML Engineers, Backend Developers, and DevOps Automation Engineers.'
    },
    whyLearn: [
      '#1 language for Artificial Intelligence, ML, and Data Science.',
      'Clean syntax with fast prototyping capabilities.',
      'Popular for web scraping, automation scripts, and Django/FastAPI.',
      'High industry demand and beginner-friendly learning curve.'
    ],
    progress: {
      percentage: 10,
      completedModules: 1,
      remainingModules: 7,
      currentChapter: 'Module 02: Python Data Structures'
    },
    roadmapNodes: [
      { id: 1, title: 'Python Syntax & Dynamic Typing', status: 'completed', desc: 'Indentation, print(), input(), variables, operators.' },
      { id: 2, title: 'Data Structures (Lists, Dicts, Sets)', status: 'current', desc: 'List comprehensions, dictionary methods, tuples.' },
      { id: 3, title: 'Functions & Decorators', status: 'unlocked', desc: '*args, **kwargs, lambda functions, wrapper decorators.' },
      { id: 4, title: 'OOP in Python', status: 'locked', desc: 'Classes, dunder methods (__init__, __str__), inheritance.' },
      { id: 5, title: 'File Handling & Modules', status: 'locked', desc: 'open(), context managers (with), pip packages.' },
      { id: 6, title: 'NumPy & Pandas Foundations', status: 'locked', desc: 'N-dimensional arrays, DataFrames, data cleaning.' },
      { id: 7, title: 'FastAPI / Flask Web Services', status: 'locked', desc: 'Building REST endpoints, JSON responses.' },
      { id: 8, title: 'Intro to Machine Learning', status: 'locked', desc: 'Scikit-learn, regression, classification models.' }
    ],
    modules: [
      { id: 'm1', name: 'Module 1: Python Basics & Syntax', status: 'completed', lessons: 3, time: '1.5 hrs', icon: 'FileText' },
      { id: 'm2', name: 'Module 2: Lists, Dicts & Sets', status: 'in_progress', lessons: 3, time: '2 hrs', icon: 'Target' },
      { id: 'm3', name: 'Module 3: Functions & Decorators', status: 'unlocked', lessons: 3, time: '2.5 hrs', icon: 'Layers' },
      { id: 'm4', name: 'Module 4: Classes & Dunder Methods', status: 'locked', lessons: 3, time: '2.5 hrs', icon: 'Shield' },
      { id: 'm5', name: 'Module 5: File I/O & Modules', status: 'locked', lessons: 3, time: '2 hrs', icon: 'Code' },
      { id: 'm6', name: 'Module 6: NumPy & Pandas', status: 'locked', lessons: 3, time: '3 hrs', icon: 'Binary' },
      { id: 'm7', name: 'Module 7: Web APIs with FastAPI', status: 'locked', lessons: 3, time: '3 hrs', icon: 'FileText' },
      { id: 'm8', name: 'Module 8: Intro to ML with Scikit-learn', status: 'locked', lessons: 3, time: '3.5 hrs', icon: 'BookOpen' }
    ],
    resources: [
      { title: 'Python 3 Complete Cheat Sheet', type: 'PDF', size: '1.9 MB', ext: 'PDF' },
      { title: 'NumPy & Data Wrangling Handbook', type: 'PDF', size: '2.5 MB', ext: 'PDF' }
    ],
    practice: [
      { id: 'p1', title: 'Build a Web Scraper in Python', difficulty: 'Easy', status: 'Solved' }
    ],
    miniProjects: [
      { id: 'proj1', title: 'Weather Forecast CLI App', difficulty: 'Easy', desc: 'Fetch live weather data via REST API.', status: 'Completed' }
    ]
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    title: 'Modern JavaScript (ES6+) Hub',
    tagline: 'The language of the web. Power interactive frontends (React) and scalable backends (Node.js).',
    difficulty: 'Beginner-Intermediate',
    category: 'Web & Fullstack',
    estimatedTime: '20–30 Hours',
    prerequisites: 'Basic HTML & Web Concepts',
    totalModules: 8,
    totalLessons: 25,
    totalPrograms: 40,
    svg: TECH_LOGOS.javascript,
    nextLanguage: 'typescript',
    nextLanguageName: 'TypeScript',
    about: {
      what: 'JavaScript is a dynamic programming language created by Brendan Eich in 1995. It is the cornerstone of modern interactive web development.',
      where: 'Frontend Web Apps (React, Vue, Next.js), Backend Web Servers (Node.js, Express), Desktop Apps (Electron), and Mobile Apps (React Native).',
      why: 'Runs in every browser, massive npm package ecosystem, and non-blocking asynchronous event loop.',
      career: 'Essential for Frontend, Backend, and Full-Stack Web Engineers.'
    },
    whyLearn: [
      'Runs natively in every web browser worldwide.',
      'Full-stack flexibility with Node.js on backend.',
      'Event loop architecture for non-blocking I/O operations.',
      'Required skill for frontend frameworks (React, Vue, Next.js).'
    ],
    progress: {
      percentage: 50,
      completedModules: 4,
      remainingModules: 4,
      currentChapter: 'Module 05: Asynchronous Promises & Async/Await'
    },
    roadmapNodes: [
      { id: 1, title: 'JS Syntax & ES6 Variables', status: 'completed', desc: 'let, const, arrow functions, template literals.' },
      { id: 2, title: 'DOM Manipulation & Events', status: 'completed', desc: 'querySelector, addEventListener, event bubbling.' },
      { id: 3, title: 'Array Methods (map, filter, reduce)', status: 'completed', desc: 'Functional programming techniques, immutability.' },
      { id: 4, title: 'Objects & Destructuring', status: 'completed', desc: 'Object methods, spread operator, rest parameters.' },
      { id: 5, title: 'Promises & Async / Await', status: 'current', desc: 'Fetch API, async functions, event loop queues.' },
      { id: 6, title: 'Prototypes & ES6 Classes', status: 'unlocked', desc: 'Prototypal inheritance, class syntax, static methods.' },
      { id: 7, title: 'Node.js & Express Basics', status: 'locked', desc: 'CommonJS, ES Modules, HTTP server creation.' },
      { id: 8, title: 'Full Stack SPA Architecture', status: 'locked', desc: 'State management, REST APIs, JSON Web Tokens.' }
    ],
    modules: [
      { id: 'm1', name: 'Module 1: ES6 Syntax Basics', status: 'completed', lessons: 3, time: '2 hrs', icon: 'FileText' },
      { id: 'm2', name: 'Module 2: DOM & Event Handling', status: 'completed', lessons: 3, time: '2.5 hrs', icon: 'Layers' },
      { id: 'm3', name: 'Module 3: Array Methods Masterclass', status: 'completed', lessons: 3, time: '2 hrs', icon: 'Binary' },
      { id: 'm4', name: 'Module 4: Objects & Destructuring', status: 'completed', lessons: 3, time: '2 hrs', icon: 'Shield' },
      { id: 'm5', name: 'Module 5: Async / Await & Fetch API', status: 'in_progress', lessons: 4, time: '3.5 hrs', icon: 'Target' },
      { id: 'm6', name: 'Module 6: OOP & ES6 Classes', status: 'unlocked', lessons: 3, time: '2.5 hrs', icon: 'Code' },
      { id: 'm7', name: 'Module 7: Node.js Server Setup', status: 'locked', lessons: 3, time: '3 hrs', icon: 'FileText' },
      { id: 'm8', name: 'Module 8: Full-Stack Web Projects', status: 'locked', lessons: 3, time: '3.5 hrs', icon: 'BookOpen' }
    ],
    resources: [
      { title: 'Modern JavaScript ES6+ Cheat Sheet', type: 'PDF', size: '2.2 MB', ext: 'PDF' },
      { title: 'JS Event Loop Visual Guide', type: 'PDF', size: '1.5 MB', ext: 'PDF' }
    ],
    practice: [
      { id: 'p1', title: 'Build a Custom Promise Implementation', difficulty: 'Hard', status: 'Unsolved' }
    ],
    miniProjects: [
      { id: 'proj1', title: 'Interactive Task Manager Web App', difficulty: 'Medium', desc: 'DOM CRUD app with localStorage persistence.', status: 'Completed' }
    ]
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    title: 'TypeScript Enterprise Hub',
    tagline: 'JavaScript with syntax for types. Catch errors early in your editor and build bulletproof applications.',
    difficulty: 'Intermediate',
    category: 'Web & Fullstack',
    estimatedTime: '15–25 Hours',
    prerequisites: 'JavaScript (ES6+) Knowledge',
    totalModules: 6,
    totalLessons: 20,
    totalPrograms: 30,
    isIcon: true,
    nextLanguage: 'c',
    nextLanguageName: 'C',
    about: {
      what: 'TypeScript is a strongly typed programming language developed by Microsoft in 2012 that builds on JavaScript.',
      where: 'Large scale web applications, React / Next.js enterprise frontends, Node.js microservices, and open-source libraries.',
      why: 'Eliminates entire classes of runtime type errors, improves developer velocity, and provides superior IDE autocomplete.',
      career: 'Standard requirement for Senior Web Developers, React Engineers, and Tech Lead roles.'
    },
    whyLearn: [
      'Eliminates runtime type errors during build compile time.',
      'Industry standard for React, Next.js, and enterprise codebases.',
      'Rich IDE autocomplete and refactoring intelligence.',
      'Generics and strict interfaces for large team codebases.'
    ],
    progress: {
      percentage: 15,
      completedModules: 1,
      remainingModules: 5,
      currentChapter: 'Module 02: Interfaces & Type Aliases'
    },
    roadmapNodes: [
      { id: 1, title: 'TypeScript Basics & Primitive Types', status: 'completed', desc: 'tsc compiler, type annotations, inference.' },
      { id: 2, title: 'Interfaces & Type Aliases', status: 'current', desc: 'Interface extension, union types, intersection types.' },
      { id: 3, title: 'Generics & Type Constraints', status: 'unlocked', desc: 'Generic functions, generic interfaces, keyof operator.' },
      { id: 4, title: 'Utility Types (Partial, Pick, Omit)', status: 'locked', desc: 'Readonly, Record, ReturnType, Parameters.' },
      { id: 5, title: 'TypeScript with React & Hooks', status: 'locked', desc: 'Typed props, useState generics, Event handlers.' },
      { id: 6, title: 'Strict Compiler Configurations', status: 'locked', desc: 'tsconfig.json tuning, strictNullChecks, noImplicitAny.' }
    ],
    modules: [
      { id: 'm1', name: 'Module 1: TS Compiler & Basic Types', status: 'completed', lessons: 3, time: '2 hrs', icon: 'FileText' },
      { id: 'm2', name: 'Module 2: Interfaces & Unions', status: 'in_progress', lessons: 3, time: '2.5 hrs', icon: 'Target' },
      { id: 'm3', name: 'Module 3: Generics & Utility Types', status: 'unlocked', lessons: 4, time: '3.5 hrs', icon: 'Layers' },
      { id: 'm4', name: 'Module 4: React & TS Integration', status: 'locked', lessons: 3, time: '2.5 hrs', icon: 'Shield' },
      { id: 'm5', name: 'Module 5: Advanced Mapped Types', status: 'locked', lessons: 3, time: '3 hrs', icon: 'Code' },
      { id: 'm6', name: 'Module 6: tsconfig & Production Builds', status: 'locked', lessons: 4, time: '3 hrs', icon: 'BookOpen' }
    ],
    resources: [
      { title: 'TypeScript Utility Types Cheat Sheet', type: 'PDF', size: '1.7 MB', ext: 'PDF' }
    ],
    practice: [
      { id: 'p1', title: 'Implement Strongly Typed Event Emitter', difficulty: 'Hard', status: 'Unsolved' }
    ],
    miniProjects: [
      { id: 'proj1', title: 'Type-Safe E-Commerce Cart Engine', difficulty: 'Hard', desc: 'Strict interface state store for shopping items.', status: 'Completed' }
    ]
  }
};
