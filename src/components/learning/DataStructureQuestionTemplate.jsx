import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ChevronRight, BookOpen, Clock, 
  Award, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, 
  Layers, Bookmark, Share2, FileText, Code2, Table
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import '../../styles/SemesterCPages.css';
import '../../styles/ProblemSolvingCChapter.css';

const DataStructureQuestionTemplate = ({
  isError = false,
  errorMessage = '',
  unitId = 1,
  questionNumber = 'Q1',
  questionTitle = '',
  difficulty = 'Beginner',
  readTime = '15 min read',
  subjectTitle = 'Data Structures',
  subjectCode = 'BCA-202',
  subjectPath = '/curriculum/semester-2/data-structures',
  progressPercent = 10,
  theory = '',
  explanation = '',
  diagram = '',
  table = null,
  notes = '',
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

      if (/^\d+\.\s/.test(text) || /^\•\s/.test(text) || /^\-\s/.test(text)) {
        const listItems = text.split('\n');
        return (
          <ul key={pIdx} className="c-theory-numbered-list" style={{ listStyleType: 'disc' }}>
            {listItems.map((item, iIdx) => (
              <li key={iIdx}>{item.replace(/^[\d+\.\•\-]\s*/, '')}</li>
            ))}
          </ul>
        );
      }

      return (
        <p key={pIdx} className="c-theory-paragraph" style={{ whiteSpace: 'pre-line' }}>
          {text}
        </p>
      );
    });
  };

  if (isError) {
    return (
      <StudentLayout>
        <div className="c-chapter-page-root">
          <div className="c-chapter-container" style={{ textAlign: 'center', paddingTop: '100px' }}>
            <h2>Question Not Found</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', margin: '16px 0' }}>{errorMessage || 'The requested question could not be located.'}</p>
            <button className="c-back-btn" onClick={() => navigate(subjectPath)} style={{ margin: '0 auto' }}>
              <ArrowLeft size={16} /> Return to Data Structures
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="c-chapter-page-root">
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
            aria-label="Back to Subject"
          >
            <ArrowLeft size={16} />
            <span>Back to Data Structures</span>
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
          <span className="c-crumb-link" onClick={() => navigate(subjectPath)}>Unit {unitId}</span>
          <ChevronRight size={12} className="c-crumb-sep" />
          <span className="c-crumb-active">{questionNumber}</span>
        </nav>

        {/* ─── HERO CARD ─── */}
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
            <span className="c-badge-pill c-badge-code">Unit {unitId} • {subjectCode}</span>
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
              <span className="c-progress-lbl">Course Progress</span>
              <span className="c-progress-val">{progressPercent}%</span>
            </div>
            <div className="c-progress-track">
              <div className="c-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </motion.div>

        {/* ─── 1. ORIGINAL THEORY ─── */}
        {theory && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <BookOpen size={18} />
              </div>
              <h2 className="c-card-title">1. Original Theory</h2>
            </div>
            <div className="c-theory-body">
              {renderFormattedText(theory)}
            </div>
          </div>
        )}

        {/* ─── 2. ORIGINAL EXPLANATION ─── */}
        {explanation && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box insight-icon-box">
                <Lightbulb size={18} />
              </div>
              <h2 className="c-card-title">2. Original Explanation</h2>
            </div>
            <div className="c-theory-body">
              {renderFormattedText(explanation)}
            </div>
          </div>
        )}

        {/* ─── 3. DIAGRAM ─── */}
        {diagram && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box breakdown-icon-box">
                <Code2 size={18} />
              </div>
              <h2 className="c-card-title">3. Diagram & Memory Model</h2>
            </div>
            <div className="c-terminal-card" style={{ marginTop: 0 }}>
              <div className="c-terminal-header">
                <span className="c-terminal-title">Logical ASCII Diagram</span>
              </div>
              <div className="c-terminal-body">
                <pre className="c-terminal-output-text" style={{ color: '#c084fc', fontSize: '0.88rem', lineHeight: '1.45' }}>{diagram}</pre>
              </div>
            </div>
          </div>
        )}

        {/* ─── 4. TABLE ─── */}
        {table && table.headers && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <Table size={18} />
              </div>
              <h2 className="c-card-title">4. Comparison / Data Table</h2>
            </div>
            <div style={{ overflowX: 'auto', marginTop: '12px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '10px', overflow: 'hidden', background: '#111114', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                <thead>
                  <tr style={{ background: 'rgba(168, 85, 247, 0.15)', borderBottom: '1px solid rgba(168, 85, 247, 0.3)' }}>
                    {table.headers.map((hdr, hIdx) => (
                      <th key={hIdx} style={{ padding: '12px 14px', color: '#c084fc', textAlign: 'left', fontSize: '0.86rem', fontWeight: 700 }}>
                        {hdr}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: rIdx === table.rows.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.06)', background: rIdx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.02)' }}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} style={{ padding: '10px 14px', color: 'rgba(255, 255, 255, 0.88)', fontSize: '0.85rem', lineHeight: '1.5', whiteSpace: 'pre-line' }}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ─── 5. IMPORTANT NOTES ─── */}
        {notes && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box insight-icon-box">
                <AlertTriangle size={18} />
              </div>
              <h2 className="c-card-title">5. Important Notes</h2>
            </div>
            <div className="c-theory-body">
              {renderFormattedText(notes)}
            </div>
          </div>
        )}

        {/* ─── 6. KEY POINTS ─── */}
        {keyPoints && keyPoints.length > 0 && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box summary-icon-box">
                <CheckCircle2 size={18} />
              </div>
              <h2 className="c-card-title">6. Key Points</h2>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6' }}>
              {keyPoints.map((point, idx) => (
                <li key={idx}><strong>Point {idx + 1}:</strong> {point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ─── 7. SUMMARY ─── */}
        {summary && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <Award size={18} />
              </div>
              <h2 className="c-card-title">7. Summary</h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.65', color: 'rgba(255,255,255,0.85)' }}>
              {summary}
            </p>
          </div>
        )}

        {/* ─── INLINE BOTTOM NAVIGATION ─── */}
        <div className="c-bottom-nav-strip">
          {prevQuestion ? (
            <button 
              className="c-nav-btn c-nav-prev"
              onClick={() => onNavigateQuestion(prevQuestion)}
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
            <span>All Units ({DS_FULL_QUESTIONS.length})</span>
          </button>

          {nextQuestion ? (
            <button 
              className="c-nav-btn c-nav-next"
              onClick={() => onNavigateQuestion(nextQuestion)}
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
              <span>Module Complete</span>
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  </StudentLayout>
  );
};

export default DataStructureQuestionTemplate;
