import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, BookOpen, ChevronRight, Clock, Award, 
  User, Play, ArrowRight, Layers, Search, Filter
} from 'lucide-react';
import StudentLayout from '../layouts/StudentLayout';
import { DS_UNITS, DS_FULL_QUESTIONS } from '../data/ds_full_curriculum';
import '../styles/SemesterCPages.css';

const DataStructureSubjectPage = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  const handleQuestionClick = (question) => {
    navigate(`/curriculum/semester-2/data-structures/unit-${question.unitId}/question/${question.slug}`);
    window.scrollTo(0, 0);
  };

  const filteredQuestions = DS_FULL_QUESTIONS.filter(q => {
    const matchesUnit = selectedUnit === 'all' || q.unitId === Number(selectedUnit);
    const matchesQuery = !searchQuery.trim() || 
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.questionNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.theory.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesUnit && matchesQuery;
  });

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
          <span className="sc-breadcrumb-active">Data Structures</span>
        </div>

        {/* Subject Hero Card */}
        <motion.div 
          className="subject-hero-card-v2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div 
            className="subject-floating-logo-badge"
            whileHover={{ scale: 1.06, rotate: 3 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ background: 'rgba(168, 85, 247, 0.15)', border: '1px solid rgba(168, 85, 247, 0.3)' }}
          >
            <div className="floating-logo-svg" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🌳
            </div>
            <div className="floating-logo-glow" />
          </motion.div>

          <div className="subject-hero-header-row">
            <span className="hero-sem-code-pill">Semester 2 • BCA-202</span>
          </div>

          <h1 className="subject-hero-title-v2">Data Structures</h1>

          <div className="subject-rating-diff-row">
            <div className="star-rating-box">
              <span className="stars-icons">⭐⭐⭐⭐⭐</span>
              <span className="rating-num">4.9</span>
            </div>
            <span className="rating-dot-sep">•</span>
            <span className="hero-diff-tag">Core Architecture</span>
          </div>

          <div className="subject-hero-desc-box">
            <p className="subject-hero-desc-v2">
              Complete digital notebook reconstructed 100% faithfully from handwritten notes covering 9 Units, 56 academic questions, memory representations, time-space complexities, and core algorithms.
            </p>
          </div>

          <motion.button 
            className="btn-hero-continue-cta"
            onClick={() => handleQuestionClick(DS_FULL_QUESTIONS[0])}
            whileTap={{ scale: 0.98 }}
          >
            <Play size={16} fill="currentColor" />
            <span>Start Reading (Q1)</span>
            <ArrowRight size={16} />
          </motion.button>

          {/* Quick Stats Grid */}
          <div className="subject-stats-2x2-grid">
            <div className="stat-chip-card">
              <Layers size={15} className="chip-icon" />
              <span><strong>9</strong> Units</span>
            </div>
            <div className="stat-chip-card">
              <BookOpen size={15} className="chip-icon" style={{ color: '#c084fc' }} />
              <span><strong>56</strong> Questions</span>
            </div>
            <div className="stat-chip-card">
              <Clock size={15} className="chip-icon" style={{ color: '#60a5fa' }} />
              <span><strong>~45 Hours</strong></span>
            </div>
            <div className="stat-chip-card">
              <Award size={15} className="chip-icon" style={{ color: '#f59e0b' }} />
              <span><strong>4 Credits</strong></span>
            </div>
          </div>

          {/* Course Progress */}
          <div className="subject-hero-progress-block">
            <div className="progress-label-row">
              <span className="progress-title-lbl">Module Progress</span>
              <span className="progress-percent-lbl">45% Completed</span>
            </div>
            <div className="hero-progress-track">
              <motion.div 
                className="hero-progress-fill" 
                initial={{ width: 0 }}
                animate={{ width: '45%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', justifyContent: 'space-between', margin: '28px 0 18px 0' }}>
          <div className="sc-section-header" style={{ margin: 0 }}>
            <BookOpen size={18} style={{ color: '#c084fc' }} />
            <h2 className="sc-section-title">
              {selectedUnit === 'all' ? 'All Units & Questions' : `Unit ${selectedUnit}`} ({filteredQuestions.length})
            </h2>
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
            <input 
              type="text"
              placeholder="Search questions or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                background: '#111114',
                border: '1px solid rgba(168, 85, 247, 0.2)',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Unit Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px', scrollbarWidth: 'none' }}>
          <button
            onClick={() => setSelectedUnit('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: selectedUnit === 'all' ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)',
              background: selectedUnit === 'all' ? 'rgba(168, 85, 247, 0.2)' : '#111114',
              color: selectedUnit === 'all' ? '#c084fc' : 'rgba(255,255,255,0.7)',
              fontSize: '0.82rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            All Units (56)
          </button>
          {DS_UNITS.map(unit => (
            <button
              key={unit.id}
              onClick={() => setSelectedUnit(String(unit.id))}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: selectedUnit === String(unit.id) ? '1px solid #a855f7' : '1px solid rgba(255,255,255,0.08)',
                background: selectedUnit === String(unit.id) ? 'rgba(168, 85, 247, 0.2)' : '#111114',
                color: selectedUnit === String(unit.id) ? '#c084fc' : 'rgba(255,255,255,0.7)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              Unit {unit.id} ({unit.questionsCount})
            </button>
          ))}
        </div>

        {/* Question Cards Grid */}
        <motion.div
          className="sc-chapters-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredQuestions.map((question) => (
            <motion.div
              key={question.id}
              variants={itemVariants}
              className={`sc-chapter-card eng-chapter-card ${hoveredId === question.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredId(question.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleQuestionClick(question)}
            >
              {/* Top Number & Icon */}
              <div className="sc-card-top">
                <span className="sc-chapter-number">{question.questionNumber}</span>
                <span className="sc-chapter-icon-emoji">{question.icon}</span>
              </div>

              {/* Title & Short Description */}
              <h3 className="sc-chapter-title">{question.title}</h3>
              <p className="sc-chapter-desc">
                {question.theory.length > 120 ? question.theory.slice(0, 120) + '...' : question.theory}
              </p>

              {/* Footer Meta */}
              <div className="sc-card-bottom">
                <div className="sc-card-meta">
                  <span className="sc-meta-tag">Unit {question.unitId}</span>
                  <span className="sc-meta-tag"><Clock size={12} /> {question.duration}</span>
                </div>
                <div className="sc-read-btn">
                  <span>Read</span>
                  <ChevronRight size={14} />
                </div>
              </div>

              {/* Hover glow */}
              <div className="sc-card-hover-glow" />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </StudentLayout>
  );
};

export default DataStructureSubjectPage;
