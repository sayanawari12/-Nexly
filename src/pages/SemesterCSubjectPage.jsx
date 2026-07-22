import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, ChevronRight, Code2, CheckCircle,
  Clock, Award, Layers, User, Terminal
} from 'lucide-react';
import StudentLayout from '../layouts/StudentLayout';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import '../styles/SemesterCPages.css';

// ─── Chapter list for Problem Solving Using C ───────────────────────────────
export const C_CHAPTERS = [
  {
    id: 1,
    slug: 'introduction-to-c',
    title: 'Introduction to C',
    desc: 'History of C, its features, applications, and why it is called the mother of all programming languages.',
    icon: '🚀',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    slug: 'structure-of-c-program',
    title: 'Structure of C Program',
    desc: 'Understand the anatomy of a C program — preprocessor, main function, statements, and comments.',
    icon: '🏗️',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    slug: 'variables',
    title: 'Variables',
    desc: 'Learn how to declare, initialize, and use variables to store data in memory.',
    icon: '📦',
    duration: '15 min',
    difficulty: 'Beginner'
  },
  {
    id: 4,
    slug: 'data-types',
    title: 'Data Types',
    desc: 'Explore int, float, double, char, and void — how each type stores data and how much memory it uses.',
    icon: '🔢',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 5,
    slug: 'operators',
    title: 'Operators',
    desc: 'Arithmetic, relational, logical, bitwise, and assignment operators with precedence rules.',
    icon: '⚙️',
    duration: '25 min',
    difficulty: 'Beginner'
  },
  {
    id: 6,
    slug: 'input-and-output',
    title: 'Input & Output',
    desc: 'Using printf() and scanf() for formatted output and input. Format specifiers and escape sequences.',
    icon: '🖥️',
    duration: '20 min',
    difficulty: 'Beginner'
  },
  {
    id: 7,
    slug: 'conditional-statements',
    title: 'Conditional Statements',
    desc: 'Making decisions using if, if-else, else-if ladder, nested if, and switch-case.',
    icon: '🔀',
    duration: '25 min',
    difficulty: 'Beginner'
  },
  {
    id: 8,
    slug: 'loops',
    title: 'Loops',
    desc: 'Repeating code using for, while, and do-while loops. Break and continue statements.',
    icon: '🔁',
    duration: '30 min',
    difficulty: 'Beginner'
  },
  {
    id: 9,
    slug: 'functions',
    title: 'Functions',
    desc: 'Defining, declaring, and calling functions. Return types, parameters, and call by value.',
    icon: '🧩',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  {
    id: 10,
    slug: 'arrays',
    title: 'Arrays',
    desc: '1D and 2D arrays — declaration, initialization, indexing, and traversal with loops.',
    icon: '📊',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  {
    id: 11,
    slug: 'strings',
    title: 'Strings',
    desc: 'Character arrays, string functions (strlen, strcpy, strcmp, strcat) from string.h.',
    icon: '🔤',
    duration: '25 min',
    difficulty: 'Intermediate'
  },
  {
    id: 12,
    slug: 'pointers',
    title: 'Pointers',
    desc: 'Memory addresses, pointer declarations, dereferencing, pointer arithmetic, and NULL pointer.',
    icon: '📍',
    duration: '35 min',
    difficulty: 'Intermediate'
  },
  {
    id: 13,
    slug: 'structures',
    title: 'Structures',
    desc: 'Grouping related variables using struct, typedef, arrays of structures, and nested structs.',
    icon: '🗂️',
    duration: '30 min',
    difficulty: 'Intermediate'
  },
  {
    id: 14,
    slug: 'union',
    title: 'Union',
    desc: 'Shared memory concept — declaring unions, accessing members, difference between struct and union.',
    icon: '🔗',
    duration: '20 min',
    difficulty: 'Intermediate'
  },
  {
    id: 15,
    slug: 'enum',
    title: 'Enum',
    desc: 'Enumerations for named constants — declaring, using, and combining enums with switch.',
    icon: '🏷️',
    duration: '15 min',
    difficulty: 'Intermediate'
  },
  {
    id: 16,
    slug: 'file-handling',
    title: 'File Handling',
    desc: 'Reading and writing files using fopen, fclose, fprintf, fscanf, fgets, fread, fwrite.',
    icon: '📁',
    duration: '35 min',
    difficulty: 'Intermediate'
  },
  {
    id: 17,
    slug: 'dynamic-memory-allocation',
    title: 'Dynamic Memory Allocation',
    desc: 'Heap memory management using malloc, calloc, realloc, and free. Avoiding memory leaks.',
    icon: '🧠',
    duration: '30 min',
    difficulty: 'Advanced'
  },
  {
    id: 18,
    slug: 'preprocessor-directives',
    title: 'Preprocessor Directives',
    desc: '#include, #define, #ifdef, #ifndef, macros, and conditional compilation.',
    icon: '⚡',
    duration: '25 min',
    difficulty: 'Advanced'
  },
  {
    id: 19,
    slug: 'command-line-arguments',
    title: 'Command Line Arguments',
    desc: 'Using argc and argv[] to pass arguments to main() from the command line.',
    icon: '💻',
    duration: '20 min',
    difficulty: 'Advanced'
  },
  {
    id: 20,
    slug: 'mini-projects',
    title: 'Mini Projects',
    desc: 'Apply everything learned — Calculator, Student Record System, Simple Bank, and Number Games.',
    icon: '🏆',
    duration: '60 min',
    difficulty: 'Advanced'
  }
];

const difficultyColor = { Beginner: '#4ade80', Intermediate: '#f59e0b', Advanced: '#f87171' };
const difficultyBg = { Beginner: 'rgba(74,222,128,0.08)', Intermediate: 'rgba(245,158,11,0.08)', Advanced: 'rgba(248,113,113,0.08)' };

// ─── Component ───────────────────────────────────────────────────────────────
const SemesterCSubjectPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const handleChapterClick = (chapter) => {
    navigate(`/curriculum/semester-1/problem-solving-using-c/chapter/${chapter.slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.04 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } }
  };

  return (
    <StudentLayout>
      <div className="sc-page-wrapper">

        {/* ── Back Button (row 1) ── */}
        <button className="sc-back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* ── Breadcrumb (row 2) ── */}
        <div className="sc-breadcrumb">
          <span
            className="sc-breadcrumb-link"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate(-1)}>
            Semester 1
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-active">Problem Solving Using C</span>
        </div>

        {/* Hero Card */}
        <div className="sc-hero-card">
          {/* Layered background effects */}
          <div className="sc-hero-glow-tl" />
          <div className="sc-hero-glow-br" />
          <div className="sc-hero-shimmer" />

          {/* Left: Content */}
          <div className="sc-hero-content">
            <div className="sc-hero-badges">
              <span className="sc-badge-sem">SEMESTER 1</span>
              <span className="sc-badge-dot">•</span>
              <span className="sc-badge-code">BCA-101</span>
            </div>
            <h1 className="sc-hero-title">Problem Solving Using C</h1>
            <p className="sc-hero-desc">
              Master the fundamentals of C programming from scratch. This subject builds your
              foundation in procedural programming, memory management, and problem-solving
              skills essential for every higher-level course in BCA.
            </p>
            <div className="sc-hero-meta">
              <div className="sc-meta-item">
                <Award size={15} /> <span>4 Credits</span>
              </div>
              <div className="sc-meta-item">
                <User size={15} /> <span>Prof. S. R. Awari</span>
              </div>
              <div className="sc-meta-item">
                <Clock size={15} /> <span>~8 Hours</span>
              </div>
              <div className="sc-meta-item">
                <Layers size={15} /> <span>20 Chapters</span>
              </div>
            </div>
          </div>

          {/* Right: Official C Language Logo Illustration */}
          <div className="sc-hero-illustration" aria-hidden="true">
            {/* Ambient soft glow background */}
            <div className="sc-illus-glow" />
            {/* Subtle geometric backing rings */}
            <div className="sc-illus-ring sc-illus-ring-outer" />
            <div className="sc-illus-ring sc-illus-ring-inner" />
            
            {/* Official C Logo from Tech Stack */}
            <div 
              className="sc-illus-logo-wrapper"
              dangerouslySetInnerHTML={{ __html: TECH_LOGOS.c }}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className="sc-stats-row">
          <div className="sc-stat-box">
            <span className="sc-stat-num">20</span>
            <span className="sc-stat-lbl">Chapters</span>
          </div>
          <div className="sc-stat-box">
            <span className="sc-stat-num">12</span>
            <span className="sc-stat-lbl">Beginner &amp; Intermediate</span>
          </div>
          <div className="sc-stat-box">
            <span className="sc-stat-num">8</span>
            <span className="sc-stat-lbl">Hours of Content</span>
          </div>
          <div className="sc-stat-box">
            <span className="sc-stat-num">20</span>
            <span className="sc-stat-lbl">Example Programs</span>
          </div>
        </div>

        {/* Section Title */}
        <div className="sc-section-header">
          <BookOpen size={18} style={{ color: 'var(--accent-glow)' }} />
          <h2 className="sc-section-title">All Chapters</h2>
        </div>

        {/* Chapter Grid */}
        <motion.div
          className="sc-chapters-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {C_CHAPTERS.map((chapter) => (
            <motion.div
              key={chapter.id}
              variants={itemVariants}
              className={`sc-chapter-card ${hoveredId === chapter.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(chapter.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleChapterClick(chapter)}
            >
              {/* Number & Icon */}
              <div className="sc-chapter-top">
                <div className="sc-chapter-num">{String(chapter.id).padStart(2, '0')}</div>
                <div className="sc-chapter-icon">{chapter.icon}</div>
              </div>

              {/* Content */}
              <div className="sc-chapter-body">
                <h3 className="sc-chapter-title">{chapter.title}</h3>
                <p className="sc-chapter-desc">{chapter.desc}</p>
              </div>

              {/* Footer */}
              <div className="sc-chapter-footer">
                <span
                  className="sc-diff-badge"
                  style={{
                    color: difficultyColor[chapter.difficulty],
                    background: difficultyBg[chapter.difficulty]
                  }}
                >
                  {chapter.difficulty}
                </span>
                <span className="sc-duration">
                  <Clock size={11} /> {chapter.duration}
                </span>
                <span className="sc-chapter-arrow">
                  <ChevronRight size={16} />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </StudentLayout>
  );
};

export default SemesterCSubjectPage;
