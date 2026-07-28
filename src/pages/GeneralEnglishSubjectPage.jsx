import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, ChevronRight, CheckCircle,
  Clock, Award, Layers, User, Play, ArrowRight, Sparkles, MessageSquare
} from 'lucide-react';
import StudentLayout from '../layouts/StudentLayout';
import { ENGLISH_CHAPTERS } from '../data/general_english_chapters';
import '../styles/SemesterCPages.css';

const GeneralEnglishSubjectPage = () => {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const handleChapterClick = (chapter) => {
    navigate(`/curriculum/semester-1/general-english/chapter/${chapter.slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <StudentLayout>
      <div className="sc-page-wrapper eng-subject-wrapper">
        
        {/* Top Control Navigation Bar */}
        <div className="sc-top-control-bar">
          <button 
            className="sc-back-btn" 
            onClick={() => navigate('/dashboard')}
            aria-label="Back to Dashboard"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Breadcrumbs */}
        <div className="sc-breadcrumb">
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>
            Semester 1
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-active">General English</span>
        </div>

        {/* Information-First Subject Hero Card */}
        <motion.div 
          className="subject-hero-card-v2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Floating Icon Badge (Top Right) */}
          <motion.div 
            className="subject-floating-logo-badge"
            whileHover={{ scale: 1.06, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          >
            <div className="floating-logo-svg" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📖
            </div>
            <div className="floating-logo-glow" />
          </motion.div>

          <div className="subject-hero-header-row">
            <span className="hero-sem-code-pill">Semester 1 • BCA-104</span>
          </div>

          <h1 className="subject-hero-title-v2">General English</h1>

          <div className="subject-rating-diff-row">
            <div className="star-rating-box">
              <span className="stars-icons">⭐⭐⭐⭐⭐</span>
              <span className="rating-num">4.9</span>
            </div>
            <span className="rating-dot-sep">•</span>
            <span className="hero-diff-tag">Beginner</span>
          </div>

          <div className="subject-hero-desc-box">
            <p className="subject-hero-desc-v2">
              Master professional communication, grammar, technical writing, resume building, and presentation skills essential for academics and tech industry interviews.
            </p>
          </div>

          <motion.button 
            className="btn-hero-continue-cta"
            onClick={() => handleChapterClick(ENGLISH_CHAPTERS[0])}
            whileTap={{ scale: 0.98 }}
          >
            <Play size={16} fill="currentColor" />
            <span>Start Learning</span>
            <ArrowRight size={16} />
          </motion.button>

          {/* Quick Stats 2x2 Grid */}
          <div className="subject-stats-2x2-grid">
            <div className="stat-chip-card">
              <BookOpen size={15} className="chip-icon" />
              <span><strong>12</strong> Chapters</span>
            </div>
            <div className="stat-chip-card">
              <Clock size={15} className="chip-icon" style={{ color: '#60a5fa' }} />
              <span><strong>~6 Hours</strong></span>
            </div>
            <div className="stat-chip-card">
              <Award size={15} className="chip-icon" style={{ color: '#f59e0b' }} />
              <span><strong>3 Credits</strong></span>
            </div>
            <div className="stat-chip-card">
              <User size={15} className="chip-icon" style={{ color: '#34d399' }} />
              <span><strong>Prof. S. R. Awari</strong></span>
            </div>
          </div>

          {/* Course Progress */}
          <div className="subject-hero-progress-block">
            <div className="progress-label-row">
              <span className="progress-title-lbl">Course Progress</span>
              <span className="progress-percent-lbl">25% Completed</span>
            </div>
            <div className="hero-progress-track">
              <motion.div 
                className="hero-progress-fill" 
                initial={{ width: 0 }}
                animate={{ width: '25%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="sc-section-header">
          <BookOpen size={18} style={{ color: '#c084fc' }} />
          <h2 className="sc-section-title">All Chapters ({ENGLISH_CHAPTERS.length})</h2>
        </div>

        {/* Chapter Grid */}
        <motion.div
          className="sc-chapters-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ENGLISH_CHAPTERS.map((chapter) => (
            <motion.div
              key={chapter.id}
              variants={itemVariants}
              className={`sc-chapter-card eng-chapter-card ${hoveredId === chapter.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(chapter.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleChapterClick(chapter)}
            >
              {/* Number & Icon */}
              <div className="sc-card-top">
                <span className="sc-chapter-number">CHAPTER {String(chapter.id).padStart(2, '0')}</span>
                <span className="sc-chapter-icon-emoji">{chapter.icon}</span>
              </div>

              {/* Title & Desc */}
              <h3 className="sc-chapter-title">{chapter.title}</h3>
              <p className="sc-chapter-desc">{chapter.desc}</p>

              {/* Footer Meta */}
              <div className="sc-card-bottom">
                <div className="sc-card-meta">
                  <span className="sc-meta-tag">{chapter.difficulty}</span>
                  <span className="sc-meta-tag"><Clock size={12} /> {chapter.duration}</span>
                </div>
                <div className="sc-read-btn">
                  <span>Read</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* Subtle hover glow */}
              <div className="sc-card-hover-glow" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </StudentLayout>
  );
};

export default GeneralEnglishSubjectPage;
