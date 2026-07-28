import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ChevronRight, BookOpen, Clock, 
  Award, Sparkles, CheckCircle2, AlertTriangle, Lightbulb, 
  Layers, Bookmark, Share2, HelpCircle, FileText
} from 'lucide-react';
import '../../styles/SemesterCPages.css';
import '../../styles/ProblemSolvingCChapter.css';

const GeneralEnglishChapterTemplate = ({
  isError = false,
  errorMessage = '',
  chapterId,
  chapterTitle = 'Introduction to Communication',
  chapterDesc,
  difficulty = 'Beginner',
  readTime = '20 min read',
  subjectTitle = 'General English',
  subjectCode = 'BCA-104',
  subjectPath = '/curriculum/semester-1/general-english',
  progressPercent = 25,
  intro = '',
  theory = '',
  examples = [],
  exercises = [],
  mistakes = [],
  tips = [],
  summary = '',
  quiz = [],
  prevChapter,
  nextChapter,
  onNavigateChapter
}) => {
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
        title: `${chapterTitle} - General English`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const renderFormattedTheory = (rawText) => {
    if (!rawText) return null;
    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((paragraph, pIdx) => {
      const text = paragraph.trim();
      if (!text) return null;

      if (text.endsWith(':') && text.length < 50 && !text.includes('.')) {
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
          <h2>Chapter Not Found</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', margin: '16px 0' }}>{errorMessage || 'The requested chapter could not be located.'}</p>
          <button className="c-back-btn" onClick={() => navigate(subjectPath)} style={{ margin: '0 auto' }}>
            <ArrowLeft size={16} /> Return to {subjectTitle}
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
            aria-label="Back to General English"
          >
            <ArrowLeft size={16} />
            <span>Back to Subject</span>
          </button>

          <div className="c-top-actions">
            <button 
              className={`c-action-btn ${bookmarked ? 'active' : ''}`}
              onClick={() => setBookmarked(!bookmarked)}
              title={bookmarked ? "Bookmarked" : "Bookmark Chapter"}
            >
              <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <button 
              className="c-action-btn"
              onClick={handleShare}
              title="Share Chapter"
            >
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Breadcrumb Trail */}
        <nav className="c-breadcrumb" aria-label="Breadcrumb">
          <span className="c-crumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <ChevronRight size={12} className="c-crumb-sep" />
          <span className="c-crumb-link" onClick={() => navigate(subjectPath)}>{subjectTitle}</span>
          <ChevronRight size={12} className="c-crumb-sep" />
          <span className="c-crumb-active">{chapterTitle}</span>
        </nav>

        {/* ─── COMPACT HERO CARD (35% REDUCED HEIGHT) ─── */}
        <motion.div 
          className="c-compact-hero-card"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="c-hero-top-badges">
            <span className="c-badge-pill c-badge-purple">
              <BookOpen size={12} />
              Chapter {chapterId ? String(chapterId).padStart(2, '0') : '01'}
            </span>
            <span className="c-badge-pill c-badge-code">{subjectCode}</span>
            <span className="c-badge-pill c-badge-diff">{difficulty}</span>
            <span className="c-badge-pill c-badge-time">
              <Clock size={12} /> {readTime}
            </span>
          </div>

          <h1 className="c-hero-title">{chapterTitle}</h1>
          {chapterDesc && <p className="c-hero-desc">{chapterDesc}</p>}

          <div className="c-hero-progress-row">
            <div className="c-progress-info">
              <span className="c-progress-lbl">Course Completion</span>
              <span className="c-progress-val">{progressPercent}%</span>
            </div>
            <div className="c-progress-track">
              <div className="c-progress-fill" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>
        </motion.div>

        {/* ─── 1. INTRODUCTION ─── */}
        {intro && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <FileText size={18} />
              </div>
              <h2 className="c-card-title">1. Introduction</h2>
            </div>
            <div className="c-theory-body">
              <p className="c-theory-paragraph" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
                {intro}
              </p>
            </div>
          </div>
        )}

        {/* ─── 2. THEORY & KEY INSIGHT ─── */}
        <div className="c-section-grid c-theory-grid">
          
          {/* Main Theory Reading Card */}
          <div className="c-glass-card c-theory-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <BookOpen size={18} />
              </div>
              <h2 className="c-card-title">2. Main Theory</h2>
            </div>
            <div className="c-theory-body">
              {renderFormattedTheory(theory)}
            </div>
          </div>

          {/* Key Insight Card */}
          <div className="c-glass-card c-key-insight-card">
            <div className="c-card-header">
              <div className="c-header-icon-box insight-icon-box">
                <Lightbulb size={18} />
              </div>
              <h3 className="c-card-title">Key Insight</h3>
            </div>

            <div className="c-insight-content">
              <div className="c-insight-highlight-box">
                <p className="c-insight-text">
                  "Clear, professional communication creates immediate credibility in both academic presentations and technical job interviews."
                </p>
              </div>

              {tips && tips.length > 0 && (
                <div className="c-insight-block">
                  <h4 className="c-block-title">
                    <Sparkles size={14} /> Quick Rule
                  </h4>
                  <p className="c-block-desc">{tips[0]}</p>
                </div>
              )}

              {mistakes && mistakes.length > 0 && (
                <div className="c-insight-block warning-block">
                  <h4 className="c-block-title warning-title">
                    <AlertTriangle size={14} /> Common Mistake
                  </h4>
                  <p className="c-block-desc">{mistakes[0]}</p>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* ─── 3. WORKED EXAMPLES ─── */}
        {examples && examples.length > 0 && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box breakdown-icon-box">
                <Layers size={18} />
              </div>
              <h2 className="c-card-title">3. Worked Examples</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {examples.map((ex, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    background: 'rgba(255,255,255,0.03)', 
                    border: '1px solid rgba(255,255,255,0.08)', 
                    borderRadius: '14px', 
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#c084fc' }}>
                    Scenario: {ex.scenario}
                  </span>
                  <div style={{ background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '10px 14px' }}>
                    <span style={{ color: '#f87171', fontWeight: '700', fontSize: '0.78rem' }}>❌ Suboptimal / Incorrect:</span>
                    <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem' }}>{ex.bad}</p>
                  </div>
                  <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '10px', padding: '10px 14px' }}>
                    <span style={{ color: '#4ade80', fontWeight: '700', fontSize: '0.78rem' }}>✅ Professional / Correct:</span>
                    <p style={{ margin: '4px 0 0', color: '#ffffff', fontSize: '0.88rem', fontWeight: '500' }}>{ex.good}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── 4. PRACTICE EXERCISES ─── */}
        {exercises && exercises.length > 0 && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box summary-icon-box">
                <CheckCircle2 size={18} />
              </div>
              <h2 className="c-card-title">4. Practical Exercises</h2>
            </div>

            <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', color: 'rgba(255,255,255,0.88)', fontSize: '0.94rem', lineHeight: '1.6' }}>
              {exercises.map((ex, idx) => (
                <li key={idx}><strong>Exercise {idx + 1}:</strong> {ex}</li>
              ))}
            </ul>
          </div>
        )}

        {/* ─── 5. QUICK TIPS & COMMON MISTAKES ─── */}
        <div className="c-summary-grid">
          <div className="c-summary-box">
            <h4>💡 Quick Tips</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.75)', lineHeight: '1.5' }}>
              {tips.map((t, idx) => <li key={idx}>{t}</li>)}
            </ul>
          </div>
          <div className="c-summary-box warning-block">
            <h4 style={{ color: '#f87171' }}>⚠️ Common Mistakes</h4>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5' }}>
              {mistakes.map((m, idx) => <li key={idx}>{m}</li>)}
            </ul>
          </div>
        </div>

        {/* ─── 6. SUMMARY ─── */}
        {summary && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <Award size={18} />
              </div>
              <h2 className="c-card-title">6. Chapter Summary</h2>
            </div>
            <p style={{ margin: 0, fontSize: '0.94rem', lineHeight: '1.65', color: 'rgba(255,255,255,0.85)' }}>
              {summary}
            </p>
          </div>
        )}

        {/* ─── 7. PRACTICE QUIZ ─── */}
        {quiz && quiz.length > 0 && (
          <div className="c-glass-card">
            <div className="c-card-header">
              <div className="c-header-icon-box insight-icon-box">
                <HelpCircle size={18} />
              </div>
              <h2 className="c-card-title">7. Practice Questions & Quiz</h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {quiz.map((q, idx) => {
                const showAns = selectedAnswers[idx];
                return (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: '600', color: '#ffffff' }}>
                      Q{idx + 1}: {q.q}
                    </p>
                    <button 
                      onClick={() => setSelectedAnswers(prev => ({ ...prev, [idx]: !prev[idx] }))}
                      style={{
                        marginTop: '10px',
                        background: 'rgba(168, 85, 247, 0.15)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                        color: '#c084fc',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '0.78rem',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >
                      {showAns ? 'Hide Answer' : 'Show Answer'}
                    </button>
                    {showAns && (
                      <p style={{ marginTop: '8px', fontSize: '0.86rem', color: '#4ade80', fontWeight: '500' }}>
                        Answer: {q.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── COMPACT INLINE BOTTOM NAVIGATION ─── */}
        <div className="c-bottom-nav-strip">
          {prevChapter ? (
            <button 
              className="c-nav-btn c-nav-prev"
              onClick={() => onNavigateChapter(prevChapter.slug)}
            >
              <ArrowLeft size={16} />
              <span className="nav-btn-text">
                <span className="btn-subtext">Previous</span>
                <span className="btn-maintext">{prevChapter.title}</span>
              </span>
            </button>
          ) : (
            <div className="c-nav-btn disabled">
              <ArrowLeft size={16} />
              <span>First Chapter</span>
            </div>
          )}

          <button 
            className="c-nav-btn c-nav-center"
            onClick={() => navigate(subjectPath)}
          >
            <BookOpen size={16} />
            <span>All Chapters</span>
          </button>

          {nextChapter ? (
            <button 
              className="c-nav-btn c-nav-next"
              onClick={() => onNavigateChapter(nextChapter.slug)}
            >
              <span className="nav-btn-text">
                <span className="btn-subtext">Next Chapter</span>
                <span className="btn-maintext">{nextChapter.title}</span>
              </span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              className="c-nav-btn c-nav-next"
              onClick={() => navigate(subjectPath)}
            >
              <span>Back to Subject</span>
              <CheckCircle2 size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default GeneralEnglishChapterTemplate;
