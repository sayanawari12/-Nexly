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
    totalModules: 8,
    totalLessons: 26,
    totalPrograms: 45,
    svg: TECH_LOGOS.c,
    nextLanguage: 'cpp',
    nextLanguageName: 'C++',
    whyLearn: [
      'Low-level memory management and pointer arithmetic.',
      'Foundation for OS kernels (Linux, Windows, macOS).',
      'High execution speed and lightweight system binary footprints.',
      'Essential core prerequisite for BCA academic success.'
    ],
    progress: {
      percentage: 75,
      completedModules: 6,
      remainingModules: 2,
      currentChapter: 'Module 05: Pointers & Memory Swapping'
    },
    roadmapNodes: [
      { id: 1, title: 'C Syntax & Fundamentals', status: 'completed', desc: 'Variables, printf/scanf, operators, basic data types.' },
      { id: 2, title: 'Control Flow & Decision Making', status: 'completed', desc: 'If-else statements, switch-case, for/while loops.' },
      { id: 3, title: 'Functions & Modular Code', status: 'completed', desc: 'Function prototypes, pass-by-value vs pass-by-reference.' },
      { id: 4, title: 'Arrays & String Manipulation', status: 'completed', desc: '1D/2D arrays, string functions (strcpy, strcmp, strlen).' },
      { id: 5, title: 'Pointers & Dynamic Memory', status: 'current', desc: 'Pointer arithmetic, malloc(), calloc(), realloc(), free().' },
      { id: 6, title: 'Structures & Unions', status: 'unlocked', desc: 'Custom types, typedef, nested structs, memory alignment.' },
      { id: 7, title: 'File Handling & Streams', status: 'locked', desc: 'fopen(), fclose(), fread(), fwrite(), binary file I/O.' },
      { id: 8, title: 'Preprocessor Directives & Macros', status: 'locked', desc: '#define, #include, conditional compilation guards.' }
    ],
    modules: [
      { id: 'm1', name: 'Module 1: Syntax & Data Types', status: 'completed', lessons: 4, time: '2 hrs', icon: 'FileText' },
      { id: 'm2', name: 'Module 2: Control Flow & Loops', status: 'completed', lessons: 4, time: '2.5 hrs', icon: 'Code' },
      { id: 'm3', name: 'Module 3: Functions & Recursion', status: 'completed', lessons: 3, time: '2 hrs', icon: 'Layers' },
      { id: 'm4', name: 'Module 4: Arrays & Strings', status: 'completed', lessons: 4, time: '3 hrs', icon: 'Binary' },
      { id: 'm5', name: 'Module 5: Pointers & Memory', status: 'in_progress', lessons: 4, time: '3.5 hrs', icon: 'Target' },
      { id: 'm6', name: 'Module 6: Structures & Custom Types', status: 'unlocked', lessons: 3, time: '2.5 hrs', icon: 'Shield' },
      { id: 'm7', name: 'Module 7: File I/O Operations', status: 'locked', lessons: 2, time: '2 hrs', icon: 'FileText' },
      { id: 'm8', name: 'Module 8: Preprocessor & Macros', status: 'locked', lessons: 2, time: '1.5 hrs', icon: 'BookOpen' }
    ],
    resources: [
      { title: 'C Memory Allocation Cheat Sheet', type: 'PDF', size: '2.4 MB', ext: 'PDF' },
      { title: 'BCA Pointer Operations Lab Manual', type: 'PDF', size: '1.8 MB', ext: 'PDF' },
      { title: 'C End-Sem Exam PYQs (2020–2025)', type: 'ZIP', size: '4.2 MB', ext: 'ZIP' },
      { title: 'Interactive C Memory Simulator', type: 'Tool', size: 'Web App', ext: 'LINK' }
    ],
    practice: [
      { id: 'p1', title: 'Swap Two Variables using Pointers', difficulty: 'Easy', status: 'Solved' },
      { id: 'p2', title: 'Dynamic Array Allocation with realloc()', difficulty: 'Medium', status: 'Solved' },
      { id: 'p3', title: 'Reverse a Linked List in C', difficulty: 'Hard', status: 'Unsolved' }
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
    totalModules: 8,
    totalLessons: 30,
    totalPrograms: 50,
    svg: TECH_LOGOS.cpp,
    nextLanguage: 'java',
    nextLanguageName: 'Java',
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
    totalModules: 8,
    totalLessons: 28,
    totalPrograms: 40,
    svg: TECH_LOGOS.java,
    nextLanguage: 'python',
    nextLanguageName: 'Python',
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
    totalModules: 8,
    totalLessons: 24,
    totalPrograms: 35,
    svg: TECH_LOGOS.python,
    nextLanguage: 'javascript',
    nextLanguageName: 'JavaScript',
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
    totalModules: 8,
    totalLessons: 25,
    totalPrograms: 40,
    svg: TECH_LOGOS.javascript,
    nextLanguage: 'typescript',
    nextLanguageName: 'TypeScript',
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
    totalModules: 6,
    totalLessons: 20,
    totalPrograms: 30,
    isIcon: true,
    nextLanguage: 'c',
    nextLanguageName: 'C',
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
    ]
  }
};
