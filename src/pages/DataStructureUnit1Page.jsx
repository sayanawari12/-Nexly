import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, ChevronRight, CheckCircle,
  Clock, Award, Layers, User, Play, ArrowRight, Sparkles
} from 'lucide-react';
import StudentLayout from '../layouts/StudentLayout';
import { DS_UNIT1_QUESTIONS } from '../data/ds_unit1_questions';
import '../styles/SemesterCPages.css';

const DataStructureUnit1Page = () => {
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

  const handleQuestionClick = (question) => {
    navigate(`/curriculum/semester-2/data-structures/unit-1/question/${question.slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <StudentLayout>
      <div className="sc-page-wrapper eng-subject-wrapper">
        
        {/* Top Control Bar */}
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

        {/* Breadcrumb Trail */}
        <div className="sc-breadcrumb">
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>
            Dashboard
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>
            Semester 2
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>
            Data Structures
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-active">Unit 1</span>
        </div>

        {/* Unit 1 Hero Card */}
        <motion.div 
          className="subject-hero-card-v2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Floating Logo Badge (Top Right) */}
          <motion.div 
            className="subject-floating-logo-badge"
            whileHover={{ scale: 1.06, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          >
            <div className="floating-logo-svg" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              📊
            </div>
            <div className="floating-logo-glow" />
          </motion.div>

          <div className="subject-hero-header-row">
            <span className="hero-sem-code-pill">Semester 2 • BCA-202</span>
          </div>

          <h1 className="subject-hero-title-v2">Unit 1: Fundamentals of Data Structures & Arrays</h1>

          <div className="subject-rating-diff-row">
            <div className="star-rating-box">
              <span className="stars-icons">⭐⭐⭐⭐⭐</span>
              <span className="rating-num">4.9</span>
            </div>
            <span className="rating-dot-sep">•</span>
            <span className="hero-diff-tag">Core Module</span>
          </div>

          <div className="subject-hero-desc-box">
            <p className="subject-hero-desc-v2">
              Master fundamental data structures, Big-O complexity analysis, linear vs non-linear classifications, 1D/2D array memory representations, searching, sorting algorithms, and sparse matrices.
            </p>
          </div>

          <motion.button 
            className="btn-hero-continue-cta"
            onClick={() => handleQuestionClick(DS_UNIT1_QUESTIONS[0])}
            whileTap={{ scale: 0.98 }}
          >
            <Play size={16} fill="currentColor" />
            <span>Start Reading Unit 1</span>
            <ArrowRight size={16} />
          </motion.button>

          {/* Secondary CTAs — Notes & Questions */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
            <motion.button
              onClick={() => navigate('/curriculum/semester-2/data-structures/notes')}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#c084fc', fontSize: '0.88rem', fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              <span>📄</span>
              <span>DS Notes</span>
            </motion.button>

            <motion.button
              onClick={() => navigate('/curriculum/semester-2/data-structures/questions')}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '10px 18px', borderRadius: '10px', cursor: 'pointer',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                color: '#c084fc', fontSize: '0.88rem', fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
            >
              <span>📋</span>
              <span>Questions (55)</span>
            </motion.button>
          </div>

          {/* Quick Stats 2x2 Grid */}
          <div className="subject-stats-2x2-grid">
            <div className="stat-chip-card">
              <BookOpen size={15} className="chip-icon" />
              <span><strong>12</strong> Questions</span>
            </div>
            <div className="stat-chip-card">
              <Clock size={15} className="chip-icon" style={{ color: '#60a5fa' }} />
              <span><strong>~5 Hours</strong></span>
            </div>
            <div className="stat-chip-card">
              <Award size={15} className="chip-icon" style={{ color: '#f59e0b' }} />
              <span><strong>4 Credits</strong></span>
            </div>
            <div className="stat-chip-card">
              <User size={15} className="chip-icon" style={{ color: '#34d399' }} />
              <span><strong>Prof. S. R. Awari</strong></span>
            </div>
          </div>

          {/* Course Progress */}
          <div className="subject-hero-progress-block">
            <div className="progress-label-row">
              <span className="progress-title-lbl">Unit Progress</span>
              <span className="progress-percent-lbl">40% Completed</span>
            </div>
            <div className="hero-progress-track">
              <motion.div 
                className="hero-progress-fill" 
                initial={{ width: 0 }}
                animate={{ width: '40%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <div className="sc-section-header">
          <BookOpen size={18} style={{ color: '#c084fc' }} />
          <h2 className="sc-section-title">Unit 1 Questions ({DS_UNIT1_QUESTIONS.length})</h2>
        </div>

        {/* Question Cards Grid */}
        <motion.div
          className="sc-chapters-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {DS_UNIT1_QUESTIONS.map((question) => (
            <motion.div
              key={question.id}
              variants={itemVariants}
              className={`sc-chapter-card eng-chapter-card ${hoveredId === question.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(question.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleQuestionClick(question)}
            >
              {/* Number & Icon */}
              <div className="sc-card-top">
                <span className="sc-chapter-number">{question.questionNumber}</span>
                <span className="sc-chapter-icon-emoji">{question.icon}</span>
              </div>

              {/* Title & Desc */}
              <h3 className="sc-chapter-title">{question.title}</h3>
              <p className="sc-chapter-desc">{question.desc}</p>

              {/* Footer Meta */}
              <div className="sc-card-bottom">
                <div className="sc-card-meta">
                  <span className="sc-meta-tag">{question.difficulty}</span>
                  <span className="sc-meta-tag"><Clock size={12} /> {question.duration}</span>
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

export default DataStructureUnit1Page;
