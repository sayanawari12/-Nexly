import cData from './c';
import cppData from './cpp';
import { TECH_LOGOS } from '../../components/sections/TechLogos';

export const LANGUAGE_HUB_DATA = {
  c: cData,
  cpp: cppData,
  java: {
    id: 'java',
    name: 'Java',
    title: 'Java Enterprise & Android Architecture',
    tagline: 'Platform-independent object-oriented language for enterprise applications, Spring Boot backends, and Android development.',
    difficulty: 'Intermediate',
    category: 'Enterprise & Mobile',
    estimatedTime: '30–35 Hours',
    prerequisites: 'Basic OOP Concepts',
    totalModules: 14,
    totalLessons: 40,
    totalPrograms: 75,
    svg: TECH_LOGOS.java,
    nextLanguage: 'python',
    nextLanguageName: 'Python',
    about: {
      what: 'Java is a write-once-run-anywhere (WORA) language compiled to bytecode and executed on the Java Virtual Machine (JVM).',
      where: 'Enterprise Web Applications, Spring Boot Microservices, Android Native Apps, Big Data (Hadoop, Spark).',
      why: 'Strong type system, garbage collection memory safety, massive enterprise ecosystem, and core BCA subject.',
      career: 'High industry demand for Java Full Stack Developers, Backend Engineers, and Android Developers.'
    },
    whyLearn: [
      'Write Once, Run Anywhere (JVM Architecture).',
      'Spring Boot Microservices & Enterprise Backend Architecture.',
      'Android Mobile App Development.',
      'Mandatory Core Subject in BCA Curriculum.'
    ]
  },
  python: {
    id: 'python',
    name: 'Python',
    title: 'Python Data Science, AI & Automation',
    tagline: 'Versatile high-level language powering Data Science, Machine Learning, Web Backend, and Automation scripts.',
    difficulty: 'Beginner',
    category: 'AI & Data Science',
    estimatedTime: '20–25 Hours',
    prerequisites: 'None',
    totalModules: 12,
    totalLessons: 32,
    totalPrograms: 50,
    svg: TECH_LOGOS.python,
    nextLanguage: 'javascript',
    nextLanguageName: 'JavaScript',
    about: {
      what: 'Python is an interpreted, high-level, general-purpose language emphasized on code readability and rapid application development.',
      where: 'Artificial Intelligence, Machine Learning (TensorFlow, PyTorch), Data Analysis (Pandas, NumPy), Web Backend (Django, FastAPI).',
      why: 'Extremely clean syntax, huge ecosystem of libraries, fastest language for AI prototyping and data analysis.',
      career: 'Top career choice for AI/ML Engineers, Data Scientists, Backend Developers, and Automation Engineers.'
    },
    whyLearn: [
      'Simple, readable syntax ideal for quick prototyping.',
      'Industry standard for Artificial Intelligence & Machine Learning.',
      'Extensive library ecosystem (Pandas, NumPy, Scikit-Learn, PyTorch).',
      'High growth career field in Data Engineering & AI.'
    ]
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    title: 'Modern Full-Stack JavaScript (ES6+)',
    tagline: 'The programming language of the Web. Build interactive client UIs with React and scalable server backends with Node.js.',
    difficulty: 'Beginner to Intermediate',
    category: 'Full-Stack Web',
    estimatedTime: '25 Hours',
    totalLessons: 35,
    totalPrograms: 60,
    svg: TECH_LOGOS.javascript
  },
  typescript: {
    id: 'typescript',
    name: 'TypeScript',
    title: 'TypeScript Type-Safe Architecture',
    tagline: 'Strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.',
    difficulty: 'Intermediate',
    category: 'Full-Stack Web',
    estimatedTime: '15 Hours',
    totalLessons: 20,
    totalPrograms: 30,
    isIcon: true
  }
};

export default LANGUAGE_HUB_DATA;
