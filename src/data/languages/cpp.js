import { TECH_LOGOS } from '../../components/sections/TechLogos';

export const cppData = {
  id: 'cpp',
  name: 'C++',
  title: 'C++ Systems & OOP Architecture',
  tagline: 'High-performance object-oriented language for systems, game engines, and competitive programming.',
  difficulty: 'Intermediate',
  category: 'System & Core',
  estimatedTime: '25–30 Hours',
  prerequisites: 'C Programming Fundamentals',
  totalModules: 12,
  totalLessons: 34,
  totalPrograms: 60,
  svg: TECH_LOGOS.cpp,
  nextLanguage: 'java',
  nextLanguageName: 'Java',
  about: {
    what: 'C++ was developed by Bjarne Stroustrup in 1979 as an extension of C, introducing object-oriented programming (OOP), classes, templates, and the Standard Template Library (STL).',
    where: 'AAA Game Engines (Unreal Engine), Operating Systems, High-Frequency Trading Engines, Browser Engines (Chromium), and Competitive Programming (ICPC, LeetCode).',
    why: 'Provides maximum execution speed, zero-cost abstractions, RAII memory safety, and STL data structures essential for Data Structures & Algorithms.',
    career: 'High demand for Systems Engineers, Game Developers, Competitive Programmers, and Quantitative Developers.'
  },
  whyLearn: [
    'Object-Oriented Programming (Classes, Inheritance, Polymorphism).',
    'Standard Template Library (STL) vectors, maps, sets, and algorithms.',
    'AAA Game Development with Unreal Engine and DirectX/Vulkan.',
    'Primary language for Competitive Programming & Technical Interviews.'
  ],
  progress: {
    percentage: 40,
    completedModules: 5,
    remainingModules: 7,
    currentChapter: 'Step 12: Object-Oriented Classes & Methods'
  },
  roadmapNodes: [
    { id: 1, title: '01. C++ Intro & g++ Compiler', status: 'completed', desc: 'iostream, namespaces, std::cout, std::cin.' },
    { id: 2, title: '02. OOP Fundamentals & Classes', status: 'completed', desc: 'Constructors, destructors, access specifiers.' }
  ],
  resources: [
    { title: 'C++ STL Quick Reference Sheet', type: 'PDF', size: '3.1 MB', ext: 'PDF' },
    { title: 'OOP Design Patterns in C++', type: 'PDF', size: '2.8 MB', ext: 'PDF' }
  ],
  practice: [
    { id: 'p1', title: 'Implement Custom Vector Class in C++', difficulty: 'Medium', status: 'Unsolved' }
  ]
};

export default cppData;
