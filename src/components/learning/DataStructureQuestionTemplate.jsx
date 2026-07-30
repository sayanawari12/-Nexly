import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ChevronRight, BookOpen, Clock, 
  Award, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, 
  Layers, Bookmark, Share2, FileText, Code2
} from 'lucide-react';
import '../../styles/SemesterCPages.css';
import '../../styles/ProblemSolvingCChapter.css';

const DataStructureQuestionTemplate = ({
  isError = false,
  errorMessage = '',
  questionNumber = 'Question 01',
  questionTitle = '',
  difficulty = 'Beginner',
  readTime = '20 min read',
  subjectTitle = 'Data Structures',
  subjectCode = 'BCA-202',
  subjectPath = '/curriculum/semester-2/data-structures/unit-1',
  progressPercent = 40,
  theory = '',
  explanation = '',
  diagram = '',
  keyPoints = [],
  summary = '',
  prevQuestion,
  nextQuestion,
  onNavigateQuestion
}) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll reading progress indicator
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${questionTitle} - Data Structures`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderFormattedText = (rawText) => {
    if (!rawText) return null;
    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((paragraph, pIdx) => {
      const text = paragraph.trim();
      if (!text) return null;

      if (text.endsWith(':') && text.length < 60 && !text.includes('.')) {
        return (
          <h3 key={pIdx} className="c-theory-section-heading">
            <Sparkles size={16} className="c-heading-sparkle" />
            {text}
          </h3>
        );
      }

      if (/^\d+\.\s/.test(text) || /^\-\s/.test(text)) {
        const listItems = text.split('\n');
        return (
          <ul key={pIdx} className="c-theory-numbered-list" style={{ listStyleType: 'disc' }}>
            {listItems.map((item, iIdx) => (
              <li key={iIdx}>{item.replace(/^[\d+\.\-]\s*/, '')}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="c-theory-paragraph">
          {text}
        </p>
      );
    });
  };

  if (isError) {
    return (
      <div className="c-chapter-page-root">
        <div className="c-chapter-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h2>Question Not Found</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '16px 0' }}>{errorMessage || 'The requested question could not be located.'}</p>
          <button className="c-back-btn" onClick={() => navigate(subjectPath)} style={{ margin: '0 auto' }}>
            <ArrowLeft size={16} /> Return to Unit 1
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="c-chapter-page-root">
      {/* Ambient background glow & grid */}
      <div className="c-ambient-glow" />
      <div className="c-grid-pattern" />

      {/* Scroll Reading Progress Top Line */}
      <div 
        className="c-scroll-progress-line"
        style={{ transform: `scaleX(${readingProgress / 100})` }}
      />

      <div className="c-chapter-container">
        
        {/* ─── TOP CONTROL BAR & BREADCRUMB ─── */}
        <div className="c-top-bar">
          <button 
            className="c-back-btn" 
            onClick={() => navigate(subjectPath)}
            aria-label="Back to Unit 1"
          >
            <ArrowLeft size={16} />
            <span>Back to Unit 1</span>
          </button>

          <div className="c-top-actions">
            <button 
              className={`c-action-btn ${bookmarked ? 'active' : ''}`}
              onClick={() => setBookmarked(!bookmarked)}
              title={bookmarked ? "Bookmarked" : "Bookmark Question"}
            >
              <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <button 
              className="c-action-btn"
              onClick={handleShare}
              title="Share Question"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Breadcrumb Trail */}
        <nav className="c-breadcrumb" aria-label="Breadcrumb">
          <span className="c-crumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <ChevronRight size={12} className="c-crumb-sep" />
          <span className="c-crumb-link" onClick={() => navigate(subjectPath)}>Semester 2</span>
          <ChevronRight size={12} className="c-crumb-sep" />
          <span className="c-crumb-link" onClick={() => navigate(subjectPath)}>Data Structures</span>
          <ChevronRight size={12} className="c-crumb-sep" />
          <span className="c-crumb-active">{questionNumber}</span>
        </nav>

        {/* ─── COMPACT HERO CARD ─── */}
        <motion.div 
          className="c-compact-hero-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="c-hero-top-badges">
            <span className="c-badge-pill c-badge-purple">
              <BookOpen size={12} />
              {questionNumber}
            </span>
            <span className="c-badge-pill c-badge-code">{subjectCode}</span>
            <span className="c-badge-pill c-badge-diff">{difficulty}</span>
            <span className="c-badge-pill c-badge-time">
              <Clock size={12} /> {readTime}
            </span>
          </div>

          <h1 className="c-hero-title" style={{ fontSize: '1.4rem', lineHeight: '1.35' }}>
            {questionTitle}
          </h1>

          <div className="c-hero-progress-row">
            <div className="c-progress-info">
              <span className="c-progress-lbl">Unit Progress</span>
              <span className="c-progress-val">{progressPercent}%</span>
            </div>
            <div className="c-progress-track">
              <div className="c-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </motion.div>

        {/* ─── 2. THEORY (EXACT ACADEMIC DEFINITION) ─── */}
        <div className="c-glass-card">
          <div className="c-card-header">
            <div className="c-header-icon-box">
              <BookOpen size={18} />
            </div>
            <h2 className="c-card-title">1. Theory & Definitions</h2>
          </div>
          <div className="c-theory-body">
            {renderFormattedText(theory)}
          </div>
        </div>

        {/* ─── 3. EXPLANATION ─── */}
        {explanation && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box insight-icon-box">
                <Lightbulb size={18} />
              </div>
              <h2 className="c-card-title">2. Detailed Explanation</h2>
            </div>
            <div className="c-theory-body">
              <p className="c-theory-paragraph" style={{ fontSize: '0.94rem', lineHeight: '1.7' }}>
                {explanation}
              </p>
            </div>
          </div>
        )}

        {/* ─── 4. DIAGRAM / MEMORY MODEL ─── */}
        {diagram && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box breakdown-icon-box">
                <Code2 size={18} />
              </div>
              <h2 className="c-card-title">3. Diagram & Memory Representation</h2>
            </div>
            <div className="c-terminal-card" style={{ marginTop: 0 }}>
              <div className="c-terminal-header">
                <span className="c-terminal-title">Logical Layout & Diagram</span>
              </div>
              <div className="c-terminal-body">
                <pre className="c-terminal-output-text" style={{ color: '#c084fc' }}>{diagram}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ─── 5. KEY POINTS ─── */}
        {keyPoints && keyPoints.length > 0 && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box summary-icon-box">
                <CheckCircle2 size={18} />
              </div>
              <h2 className="c-card-title">4. Key Points</h2>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6' }}>
              {keyPoints.map((point, idx) => (
                <li key={idx}><strong>Point {idx + 1}:</strong> {point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ─── 6. SUMMARY ─── */}
        {summary && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <Award size={18} />
              </div>
              <h2 className="c-card-title">5. Summary</h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.65', color: 'rgba(255,255,255,0.85)' }}>
              {summary}
            </p>
          </div>
        )}

        {/* ─── COMPACT INLINE BOTTOM NAVIGATION ─── */}
        <div className="c-bottom-nav-strip">
          {prevQuestion ? (
            <button 
              className="c-nav-btn c-nav-prev"
              onClick={() => onNavigateQuestion(prevQuestion.slug)}
            >
              <ArrowLeft size={16} />
              <span className="nav-btn-text">
                <span className="btn-subtext">Previous</span>
                <span className="btn-maintext">{prevQuestion.questionNumber}</span>
              </span>
            </button>
          ) : (
            <div className="c-nav-btn disabled">
              <ArrowLeft size={16} />
              <span>First Question</span>
            </div>
          )}

          <button 
            className="c-nav-btn c-nav-center"
            onClick={() => navigate(subjectPath)}
          >
            <BookOpen size={16} />
            <span>All Questions</span>
          </button>

          {nextQuestion ? (
            <button 
              className="c-nav-btn c-nav-next"
              onClick={() => onNavigateQuestion(nextQuestion.slug)}
            >
              <span className="nav-btn-text">
                <span className="btn-subtext">Next Question</span>
                <span className="btn-maintext">{nextQuestion.questionNumber}</span>
              </span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              className="c-nav-btn c-nav-next"
              onClick={() => navigate(subjectPath)}
            >
              <span>Unit 1 Complete</span>
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default DataStructureQuestionTemplate;
