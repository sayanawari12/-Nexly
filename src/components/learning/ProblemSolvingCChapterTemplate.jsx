import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRight, ChevronRight, BookOpen, Clock, 
  Award, Sparkles, Copy, Check, Terminal, Code2, 
  CheckCircle2, AlertTriangle, Lightbulb, Layers, Bookmark, 
  Share2, ChevronDown, ChevronUp
} from 'lucide-react';
import '../../styles/SemesterCPages.css';
import '../../styles/ProblemSolvingCChapter.css';

const ProblemSolvingCChapterTemplate = ({
  isError = false,
  errorMessage = '',
  chapterId,
  chapterTitle = 'Introduction to C',
  chapterDesc,
  difficulty = 'Beginner',
  readTime = '12 min read',
  subjectTitle = 'Problem Solving Using C',
  subjectCode = 'BCA-101',
  subjectPath = '/curriculum/semester-1/problem-solving-using-c',
  progressPercent = 35,
  theory = '',
  code = '',
  output = '',
  explanation = [],
  prevChapter,
  nextChapter,
  onNavigateChapter
}) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);

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

  const handleCopyCode = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${chapterTitle} - Problem Solving Using C`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Helper to format theory paragraphs & highlight code keywords
  const renderFormattedTheory = (rawText) => {
    if (!rawText) return null;

    const paragraphs = rawText.split('\n\n');
    return paragraphs.map((paragraph, pIdx) => {
      const text = paragraph.trim();
      if (!text) return null;

      // Check if paragraph is a section heading
      if (text.endsWith(':') && text.length < 50 && !text.includes('.')) {
        return (
          <h3 key={pIdx} className="c-theory-section-heading">
            <Sparkles size={16} className="c-heading-sparkle" />
            {text}
          </h3>
        );
      }

      // Check if numbered list
      if (/^\d+\.\s/.test(text)) {
        const listItems = text.split('\n');
        return (
          <ol key={pIdx} className="c-theory-numbered-list">
            {listItems.map((item, iIdx) => (
              <li key={iIdx}>{item.replace(/^\d+\.\s*/, '')}</li>
            ))}
          </ol>
        );
      }

      // Format keywords inside code brackets or backticks
      const parts = text.split(/(`[^`]+`|\b(?:int|main|printf|scanf|return|#include|void|char|float|double|if|else|for|while|struct|typedef|pointer|sizeof|stdio\.h)\b)/g);

      return (
        <p key={pIdx} className="c-theory-paragraph">
          {parts.map((part, idx) => {
            if (part.startsWith('`') && part.endsWith('`')) {
              return <code key={idx} className="c-inline-keyword">{part.slice(1, -1)}</code>;
            }
            if (['int', 'main', 'printf', 'scanf', 'return', '#include', 'void', 'char', 'float', 'double', 'if', 'else', 'for', 'while', 'struct', 'typedef', 'stdio.h'].includes(part)) {
              return <code key={idx} className="c-inline-keyword">{part}</code>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  // Extract C keywords from theory for Key Insight card
  const cKeywords = ['#include <stdio.h>', 'int main()', 'printf()', 'return 0;', 'semicolon (;)'];

  return (
    <div className="c-chapter-page-root">
      {/* Home-inspired ambient glow & grid pattern */}
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
            aria-label="Back to Problem Solving Using C"
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

        {/* ─── THEORY & KEY INSIGHT SECTION (2-COLUMN GRID ON DESKTOP) ─── */}
        <div className="c-section-grid c-theory-grid">
          
          {/* Main Theory Reading Card */}
          <div className="c-glass-card c-theory-card">
            <div className="c-card-header">
              <div className="c-header-icon-box">
                <BookOpen size={18} />
              </div>
              <h2 className="c-card-title">Concept & Theory</h2>
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
                  "C compiles directly to raw machine code giving developers fine-grained control over memory & execution speed."
                </p>
              </div>

              <div className="c-insight-block">
                <h4 className="c-block-title">
                  <Sparkles size={14} /> Core Keywords
                </h4>
                <div className="c-keyword-tags-cloud">
                  {cKeywords.map((kw, kIdx) => (
                    <span key={kIdx} className="c-kw-tag">{kw}</span>
                  ))}
                </div>
              </div>

              <div className="c-insight-block warning-block">
                <h4 className="c-block-title warning-title">
                  <AlertTriangle size={14} /> Common Pitfall
                </h4>
                <p className="c-block-desc">
                  Forgetting the ending semicolon <code className="c-inline-keyword">;</code> or case-sensitivity errors in C statements are the #1 cause of compilation errors for beginners.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ─── PRACTICAL CODE & TERMINAL OUTPUT ─── */}
        {code && (
          <div className="c-section-grid c-code-grid">
            
            {/* VS Code Inspired Editor */}
            <div className="c-code-editor-card">
              <div className="c-editor-top-bar">
                <div className="c-window-controls">
                  <span className="control-dot red-dot" />
                  <span className="control-dot yellow-dot" />
                  <span className="control-dot green-dot" />
                  <span className="c-tab-filename">
                    <Code2 size={14} className="c-tab-icon" /> main.c
                  </span>
                </div>

                <div className="c-editor-actions">
                  <span className="c-lang-badge">C Language</span>
                  <button 
                    className="c-copy-btn" 
                    onClick={handleCopyCode}
                    title="Copy code"
                  >
                    {copied ? (
                      <>
                        <Check size={14} className="copied-icon" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Code Viewer Container with Line Numbers */}
              <div className="c-code-viewer-container">
                <div className="c-line-numbers">
                  {code.split('\n').map((_, idx) => (
                    <span key={idx}>{idx + 1}</span>
                  ))}
                </div>
                <pre className="c-code-content">
                  <code>{code}</code>
                </pre>
              </div>
            </div>

            {/* Terminal Output Window */}
            {output && (
              <div className="c-terminal-card">
                <div className="c-terminal-header">
                  <div className="c-terminal-title">
                    <Terminal size={15} />
                    <span>gcc main.c -o main && ./main</span>
                  </div>
                  <span className="c-terminal-status">Exit Code 0</span>
                </div>

                <div className="c-terminal-body">
                  <pre className="c-terminal-output-text">{output}</pre>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ─── CODE BREAKDOWN ACCORDION ─── */}
        {explanation && explanation.length > 0 && (
          <div className="c-glass-card c-breakdown-card">
            <div className="c-card-header">
              <div className="c-header-icon-box breakdown-icon-box">
                <Layers size={18} />
              </div>
              <h2 className="c-card-title">Code Logic Breakdown</h2>
            </div>

            <div className="c-accordion-list">
              {explanation.map((item, idx) => {
                const isExpanded = activeAccordion === idx;
                return (
                  <div key={idx} className={`c-accordion-item ${isExpanded ? 'open' : ''}`}>
                    <button 
                      className="c-accordion-trigger"
                      onClick={() => setActiveAccordion(isExpanded ? null : idx)}
                    >
                      <div className="trigger-left">
                        <code className="item-snippet">{item.line}</code>
                      </div>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div 
                          className="c-accordion-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <p>{item.text}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─── CHAPTER SUMMARY & NEXT RECOMMENDATION ─── */}
        <div className="c-glass-card c-summary-card">
          <div className="c-card-header">
            <div className="c-header-icon-box summary-icon-box">
              <Award size={18} />
            </div>
            <h2 className="c-card-title">Chapter Summary</h2>
          </div>

          <div className="c-summary-grid">
            <div className="c-summary-box">
              <h4>🎯 Today's Learning</h4>
              <p>Understood procedural language concepts, preprocessor directives, and standard I/O functions in C.</p>
            </div>
            <div className="c-summary-box">
              <h4>💡 Key Takeaways</h4>
              <p>Every C program begins at <code className="c-inline-keyword">main()</code> and returns 0 to signal clean execution.</p>
            </div>
            <div className="c-summary-box">
              <h4>⚠️ Important Notes</h4>
              <p>Always include <code className="c-inline-keyword">&lt;stdio.h&gt;</code> before using I/O functions like <code className="c-inline-keyword">printf()</code>.</p>
            </div>
            <div className="c-summary-box next-box">
              <h4>🚀 Next Recommended Step</h4>
              <p>{nextChapter ? `Proceed to ${nextChapter.title}` : 'Complete end-of-subject practice problems & quizzes.'}</p>
            </div>
          </div>
        </div>

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

export default ProblemSolvingCChapterTemplate;
