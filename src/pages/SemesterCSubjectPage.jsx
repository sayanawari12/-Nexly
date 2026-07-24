import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, ChevronRight, Code2, CheckCircle,
  Clock, Award, Layers, User, Play, ArrowRight, Sparkles
} from 'lucide-react';
import StudentLayout from '../layouts/StudentLayout';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import '../styles/SemesterCPages.css';

// ─── Reusable Information-First Subject Hero Card ─────────────────────────────
export const SubjectHeroCard = ({
  title = "Problem Solving Using C",
  code = "BCA-101",
  semester = "Semester 1",
  difficulty = "Beginner",
  rating = "4.8",
  desc = "Master the fundamentals of C programming from scratch. Learn procedural programming, memory management, and algorithmic problem-solving skills.",
  logoSvg = TECH_LOGOS.c,
  chaptersCount = 20,
  duration = "~8 Hours",
  credits = "4 Credits",
  instructor = "Prof. S. R. Awari",
  progressPercent = 35,
  onContinue
}) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <motion.div 
      className="subject-hero-card-v2"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background Watermark Logo (Subtle 6-8% Opacity) */}
      <div 
        className="subject-hero-watermark"
        dangerouslySetInnerHTML={{ __html: logoSvg }}
        aria-hidden="true"
      />

      {/* Floating App-Icon Logo Badge (Top Right) */}
      <motion.div 
        className="subject-floating-logo-badge"
        whileHover={{ scale: 1.06, rotate: 3 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div 
          className="floating-logo-svg"
          dangerouslySetInnerHTML={{ __html: logoSvg }}
        />
        <div className="floating-logo-glow" />
      </motion.div>

      {/* Top Header Pill */}
      <div className="subject-hero-header-row">
        <span className="hero-sem-code-pill">{semester} • {code}</span>
      </div>

      {/* Title */}
      <h1 className="subject-hero-title-v2">{title}</h1>

      {/* Rating & Difficulty */}
      <div className="subject-rating-diff-row">
        <div className="star-rating-box">
          <span className="stars-icons">⭐⭐⭐⭐⭐</span>
          <span className="rating-num">{rating}</span>
        </div>
        <span className="rating-dot-sep">•</span>
        <span className="hero-diff-tag">{difficulty}</span>
      </div>

      {/* Description with Read More */}
      <div className="subject-hero-desc-box">
        <p className={`subject-hero-desc-v2 ${readMore ? 'expanded' : 'truncated'}`}>
          {desc}
        </p>
        {desc.length > 120 && (
          <button 
            className="btn-read-more-toggle"
            onClick={() => setReadMore(!readMore)}
          >
            {readMore ? 'Show Less' : 'Read More'}
          </button>
        )}
      </div>

      {/* Primary Action Button (Full Width on Mobile) */}
      <motion.button 
        className="btn-hero-continue-cta"
        onClick={onContinue}
        whileTap={{ scale: 0.98 }}
      >
        <Play size={16} fill="currentColor" />
        <span>Continue Learning</span>
        <ArrowRight size={16} />
      </motion.button>

      {/* Course Quick Stats 2x2 Grid */}
      <div className="subject-stats-2x2-grid">
        <div className="stat-chip-card">
          <BookOpen size={15} className="chip-icon" />
          <span><strong>{chaptersCount}</strong> Chapters</span>
        </div>
        <div className="stat-chip-card">
          <Clock size={15} className="chip-icon" style={{ color: '#60a5fa' }} />
          <span><strong>{duration}</strong></span>
        </div>
        <div className="stat-chip-card">
          <Award size={15} className="chip-icon" style={{ color: '#f59e0b' }} />
          <span><strong>{credits}</strong></span>
        </div>
        <div className="stat-chip-card">
          <User size={15} className="chip-icon" style={{ color: '#34d399' }} />
          <span><strong>{instructor}</strong></span>
        </div>
      </div>

      {/* Progress Bar Display */}
      <div className="subject-hero-progress-block">
        <div className="progress-label-row">
          <span className="progress-title-lbl">Course Progress</span>
          <span className="progress-percent-lbl">{progressPercent}% Completed</span>
        </div>
        <div className="hero-progress-track">
          <motion.div 
            className="hero-progress-fill" 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </div>
      </div>

    </motion.div>
  );
};

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

const difficultyColor = { Beginner: '#34d399', Intermediate: '#60a5fa', Advanced: '#ef4444' };
const difficultyBg = { Beginner: 'rgba(52,211,153,0.08)', Intermediate: 'rgba(96,165,250,0.08)', Advanced: 'rgba(239,68,68,0.08)' };

// ─── Main Subject Page Component ─────────────────────────────────────────────
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
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <StudentLayout>
      <div className="sc-page-wrapper">

        {/* Top Control Header */}
        <div className="sc-top-control-bar">
          <button className="sc-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> <span>Back</span>
          </button>
        </div>

        {/* Breadcrumb */}
        <div className="sc-breadcrumb">
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate(-1)}>
            Semester 1
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-active">Problem Solving Using C</span>
        </div>

        {/* ── Information-First Redesigned Subject Hero ── */}
        <SubjectHeroCard 
          title="Problem Solving Using C"
          code="BCA-101"
          semester="Semester 1"
          difficulty="Beginner"
          rating="4.8"
          desc="Master procedural programming, pointer arithmetic, memory management, and foundational problem-solving in C."
          logoSvg={TECH_LOGOS.c}
          chaptersCount={20}
          duration="~8 Hours"
          credits="4 Credits"
          instructor="Prof. S. R. Awari"
          progressPercent={35}
          onContinue={() => handleChapterClick(C_CHAPTERS[0])}
        />

        {/* Section Header */}
        <div className="sc-section-header">
          <BookOpen size={18} style={{ color: '#c084fc' }} />
          <h2 className="sc-section-title">All Chapters ({C_CHAPTERS.length})</h2>
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
