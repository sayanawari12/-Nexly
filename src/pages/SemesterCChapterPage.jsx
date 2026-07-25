import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Code2, Terminal, ChevronRight,
  Info, Copy, CheckCircle, ChevronLeft, ChevronDown, ChevronUp,
  Sparkles, Check, Bookmark, Share2
} from 'lucide-react';
import StudentLayout from '../layouts/StudentLayout';
import { C_CHAPTERS } from './SemesterCSubjectPage';
import { SC_CHAPTER_CONTENT } from '../data/sc_chapter_content';
import '../styles/SemesterCPages.css';

// ─── Syntax-highlighted code block ───────────────────────────────────────────
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // C Keyword highlighter
  const highlight = (line) => {
    const keywords = /\b(int|float|double|char|void|return|if|else|for|while|do|switch|case|break|continue|default|struct|typedef|union|enum|const|sizeof|NULL|include|define|ifdef|ifndef|endif|printf|scanf|main|static|extern)\b/g;
    const strings = /(\"[^\"]*\"|\'[^\']*\')/g;
    const comments = /(\/\/.*$)/;
    const numbers = /\b(\d+\.?\d*)\b/g;
    const preproc = /^(#\w+)/;

    return line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(preproc, '<span class="sc-kw-preproc">$1</span>')
      .replace(comments, '<span class="sc-kw-comment">$1</span>')
      .replace(strings, '<span class="sc-kw-string">$1</span>')
      .replace(keywords, '<span class="sc-kw-keyword">$1</span>')
      .replace(numbers, '<span class="sc-kw-number">$1</span>');
  };

  return (
    <div className="sc-code-block">
      <div className="sc-code-header">
        <div className="sc-code-dots">
          <span className="sc-dot dot-red" />
          <span className="sc-dot dot-yellow" />
          <span className="sc-dot dot-green" />
        </div>
        <span className="sc-code-lang">C Source Code</span>
        <button className="sc-copy-btn" onClick={handleCopy} aria-label="Copy code">
          {copied ? <CheckCircle size={13} style={{ color: '#34d399' }} /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="sc-code-scroll-wrapper">
        <pre className="sc-code-pre">
          <code>
            {code.split('\n').map((line, i) => (
              <div key={i} className="sc-code-line">
                <span className="sc-line-num">{String(i + 1).padStart(2, ' ')}</span>
                <span
                  className="sc-line-content"
                  dangerouslySetInnerHTML={{ __html: highlight(line) }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

// ─── Output block ─────────────────────────────────────────────────────────────
const OutputBlock = ({ output }) => (
  <div className="sc-output-block">
    <div className="sc-output-header">
      <Terminal size={13} />
      <span>Program Execution Output</span>
    </div>
    <div className="sc-output-scroll">
      <pre className="sc-output-pre">{output}</pre>
    </div>
  </div>
);

// ─── Theory renderer (Mobile-first Typography & Paragraph Chunking) ──────────
const TheoryRenderer = ({ text }) => {
  const rawParagraphs = text.split('\n\n').filter(p => p.trim());

  return (
    <div className="sc-theory-body">
      {rawParagraphs.map((para, i) => {
        const trimmed = para.trim();

        // Section heading
        const isHeading =
          trimmed.length < 70 &&
          !trimmed.endsWith('.') &&
          !trimmed.endsWith(':') &&
          !trimmed.includes('#include') &&
          !trimmed.startsWith('-') &&
          !trimmed.startsWith('//') &&
          !trimmed.match(/^[a-z]/) &&
          i > 0;

        if (isHeading && trimmed.length < 55) {
          return (
            <h3 key={i} className="sc-theory-heading">
              <span className="heading-accent-bar" />
              {trimmed}
            </h3>
          );
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="sc-theory-list">
              {items.map((item, j) => (
                <li key={j}>
                  <span className="list-bullet">•</span>
                  <span>{item.replace(/^- /, '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (trimmed.match(/^\d+\./)) {
          const items = trimmed.split('\n').filter(l => l.trim().match(/^\d+\./));
          return (
            <ol key={i} className="sc-theory-list numbered">
              {items.map((item, j) => (
                <li key={j}>
                  <span className="list-number-badge">{j + 1}</span>
                  <span>{item.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Inline code / directive
        if (
          trimmed.startsWith('#include') ||
          trimmed.startsWith('#define') ||
          trimmed.startsWith('int main') ||
          trimmed.startsWith('void ') ||
          trimmed.startsWith('int ') ||
          trimmed.startsWith('struct ') ||
          trimmed.startsWith('typedef ')
        ) {
          return (
            <div key={i} className="sc-inline-code-wrapper">
              <pre className="sc-theory-code">{trimmed}</pre>
            </div>
          );
        }

        // Callout box detection (Note: or Tip:)
        if (trimmed.startsWith('Note:') || trimmed.startsWith('Tip:') || trimmed.startsWith('Important:')) {
          return (
            <div key={i} className="sc-callout-box">
              <Info size={18} className="sc-callout-icon" />
              <p className="sc-callout-text">{trimmed}</p>
            </div>
          );
        }

        return <p key={i} className="sc-theory-paragraph">{trimmed}</p>;
      })}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const SemesterCChapterPage = () => {
  const navigate = useNavigate();
  const { chapterSlug } = useParams();
  const [explanationOpen, setExplanationOpen] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Find the chapter metadata and content
  const chapter = C_CHAPTERS.find(c => c.slug === chapterSlug);
  const content = SC_CHAPTER_CONTENT[chapterSlug];

  // Chapter navigation
  const currentIndex = C_CHAPTERS.findIndex(c => c.slug === chapterSlug);
  const prevChapter = currentIndex > 0 ? C_CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < C_CHAPTERS.length - 1 ? C_CHAPTERS[currentIndex + 1] : null;

  const goToChapter = (slug) => {
    navigate(`/curriculum/semester-1/problem-solving-using-c/chapter/${slug}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [chapterSlug]);

  if (!chapter || !content) {
    return (
      <StudentLayout>
        <div className="sc-page-wrapper">
          <div className="sc-not-found">
            <h2>Chapter not found</h2>
            <button
              className="sc-back-btn"
              onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}
            >
              <ArrowLeft size={16} /> Back to Chapters
            </button>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const difficultyColor = { Beginner: '#34d399', Intermediate: '#60a5fa', Advanced: '#ef4444' };

  return (
    <StudentLayout>
      {/* Scroll Progress Bar at very top */}
      <motion.div className="sc-reading-progress-bar" style={{ scaleX }} />

      <div className="sc-page-wrapper">

        {/* ── Top Bar with Sticky Back Button & Quick Actions ── */}
        <div className="sc-top-control-bar">
          <button
            className="sc-back-btn"
            onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}
            aria-label="Back to Chapters"
          >
            <ArrowLeft size={16} /> <span>Back to Chapters</span>
          </button>

          <div className="sc-top-actions">
            <button 
              className={`sc-icon-action-btn ${isBookmarked ? 'active' : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark Chapter"
            >
              <Bookmark size={16} fill={isBookmarked ? "#c084fc" : "none"} />
            </button>
          </div>
        </div>

        {/* ── Compact Mobile Breadcrumb ── */}
        <div className="sc-breadcrumb">
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}>
            C Programming
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-active">{chapter.title}</span>
        </div>

        {/* ── Compact Mobile Hero Card (25-30% height reduction) ── */}
        <motion.div
          className="sc-chapter-hero-compact"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="sc-hero-compact-top">
            <div className="sc-chapter-num-pill">
              {String(chapter.id).padStart(2, '0')}
            </div>
            <div className="sc-chapter-badges-row">
              <span className="sc-badge-sem">CHAPTER {chapter.id}</span>
              <span
                className="sc-diff-badge"
                style={{ color: difficultyColor[chapter.difficulty] || '#c084fc' }}
              >
                {chapter.difficulty}
              </span>
            </div>
          </div>

          <h1 className="sc-chapter-hero-title-compact">{chapter.title}</h1>
          <p className="sc-chapter-hero-desc-compact">{chapter.desc}</p>
        </motion.div>

        {/* ── Main Reading Content Container ── */}
        <div className="sc-reading-container">

          {/* Theory Section */}
          <section className="sc-reading-section">
            <div className="sc-section-hdr">
              <BookOpen size={18} style={{ color: '#c084fc' }} />
              <h2 className="sc-section-h2">1. Theory & Core Concepts</h2>
            </div>
            <TheoryRenderer text={content.theory} />
          </section>

          <div className="sc-reading-divider" />

          {/* Code Example Section */}
          <section className="sc-reading-section">
            <div className="sc-section-hdr">
              <Code2 size={18} style={{ color: '#60a5fa' }} />
              <h2 className="sc-section-h2">2. Practical Code Example</h2>
            </div>
            <CodeBlock code={content.code} />
          </section>

          {/* Output Section */}
          <section className="sc-reading-section">
            <div className="sc-section-hdr">
              <Terminal size={18} style={{ color: '#34d399' }} />
              <h2 className="sc-section-h2">3. Terminal Output</h2>
            </div>
            <OutputBlock output={content.output} />
          </section>

          <div className="sc-reading-divider" />

          {/* Line-by-Line Explanation */}
          <section className="sc-reading-section">
            <button
              className="sc-explain-toggle"
              onClick={() => setExplanationOpen(o => !o)}
            >
              <div className="sc-section-hdr" style={{ marginBottom: 0 }}>
                <Info size={18} style={{ color: '#f59e0b' }} />
                <h2 className="sc-section-h2" style={{ margin: 0 }}>4. Code Breakdown</h2>
              </div>
              {explanationOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {explanationOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="sc-explain-list"
              >
                {content.explanation.map((item, i) => (
                  <div key={i} className="sc-explain-row">
                    <div className="sc-explain-step">{i + 1}</div>
                    <div className="sc-explain-content">
                      <code className="sc-explain-code">{item.line}</code>
                      <p className="sc-explain-text">{item.text}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </section>

        </div>

        {/* ── Bottom Fixed / Sticky Chapter Navigation for Mobile ── */}
        <div className="sc-bottom-chapter-nav">
          {prevChapter ? (
            <button 
              className="sc-mobile-nav-btn prev"
              onClick={() => goToChapter(prevChapter.slug)}
              aria-label="Previous Chapter"
            >
              <ChevronLeft size={16} />
              <span className="nav-btn-text">Prev</span>
            </button>
          ) : (
            <div className="nav-btn-placeholder" />
          )}

          <button
            className="sc-mobile-nav-btn center"
            onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}
          >
            All Chapters
          </button>

          {nextChapter ? (
            <button 
              className="sc-mobile-nav-btn next"
              onClick={() => goToChapter(nextChapter.slug)}
              aria-label="Next Chapter"
            >
              <span className="nav-btn-text">Next</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <div className="nav-btn-placeholder" />
          )}
        </div>

      </div>
    </StudentLayout>
  );
};

export default SemesterCChapterPage;
