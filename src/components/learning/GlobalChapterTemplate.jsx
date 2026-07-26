import React, { useState, useEffect, Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Code2, Terminal, ChevronRight,
  Info, Copy, CheckCircle, ChevronLeft, ChevronDown, ChevronUp,
  Sparkles, Check, Bookmark, Share2, Lightbulb, CheckSquare,
  AlertTriangle, Clock, Layers, Shield, Play, ArrowRight, Tag
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import '../../styles/GlobalChapterTemplate.css';

// ─── Local Error Boundary ─────────────────────────────────────────────────────
class LocalChapterErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("GlobalChapterTemplate Error Caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="gct-error-card glass-card">
          <AlertTriangle size={36} style={{ color: '#f59e0b', marginBottom: 12 }} />
          <h3>Unable to display chapter section</h3>
          <p>{this.state.error?.message || 'An unexpected rendering error occurred.'}</p>
          <button 
            className="btn-gct-primary" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ─── 1. Practical Code Editor (VS Code / GitHub Style) ─────────────────────────
const CodeEditorBlock = ({ code = '', language = 'C', filename = 'main.c' }) => {
  const [copied, setCopied] = useState(false);
  const safeCode = code || '// No code sample available for this chapter.';

  // Copy raw source code — never HTML markup
  const handleCopy = () => {
    navigator.clipboard.writeText(safeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Segment-based tokenizer ───────────────────────────────────────────────
  // Instead of chaining .replace() calls on already-HTML strings (which
  // causes the regex to match inside injected <span class="..."> attributes),
  // we tokenize the raw source line into segments first, then emit HTML once.
  const escapeHtml = (str) =>
    str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

  const highlight = (line) => {
    if (!line) return '';

    // Token patterns — order matters: strings & comments come first so they
    // capture their inner content before keyword/number rules can match inside them.
    const TOKEN_PATTERNS = [
      // Single-line comment  (// ...  or  # ...)
      { type: 'comment',  rx: /(\/\/[^\n]*|#[^\n]*)/ },
      // Double-quoted string
      { type: 'string',   rx: /("[^"\\]*(?:\\.[^"\\]*)*")/ },
      // Single-quoted string / char literal
      { type: 'string',   rx: /('[^'\\]*(?:\\.[^'\\]*)*')/ },
      // Preprocessor directive at start of trimmed line (handled via keyword rule below)
      // Keywords
      { type: 'keyword',  rx: /\b(int|float|double|char|void|return|if|else|for|while|do|switch|case|break|continue|default|struct|typedef|union|enum|const|sizeof|NULL|include|define|ifdef|ifndef|endif|printf|scanf|main|static|extern|class|public|private|protected|import|package|def|lambda|async|await|let|var|function)\b/ },
      // Numbers
      { type: 'number',   rx: /\b(\d+\.?\d*)\b/ },
    ];

    const TYPE_CLASS = {
      comment: 'gct-kw-comment',
      string:  'gct-kw-string',
      keyword: 'gct-kw-keyword',
      number:  'gct-kw-number',
      preproc: 'gct-kw-preproc',
    };

    // Build a combined regex that captures all token types in order
    const combined = new RegExp(
      TOKEN_PATTERNS.map(p => p.rx.source).join('|'),
      'g'
    );

    // Tokenize: alternate between plain-text segments and matched tokens
    const parts = [];
    let lastIndex = 0;
    let m;
    combined.lastIndex = 0;

    while ((m = combined.exec(line)) !== null) {
      // Plain text before this match
      if (m.index > lastIndex) {
        parts.push({ type: 'text', value: line.slice(lastIndex, m.index) });
      }
      // Determine which pattern matched
      let matchedType = 'text';
      for (const pat of TOKEN_PATTERNS) {
        if (pat.rx.test(m[0])) { matchedType = pat.type; break; }
      }
      parts.push({ type: matchedType, value: m[0] });
      lastIndex = m.index + m[0].length;

      // If this was a comment, stop tokenizing the rest of the line
      if (matchedType === 'comment') break;
    }

    // Remaining plain text after last match
    if (lastIndex < line.length) {
      parts.push({ type: 'text', value: line.slice(lastIndex) });
    }

    // Emit HTML — escape plain text, wrap tokens in <span>
    // Check if line starts with a preprocessor directive (#include, #define, etc.)
    const trimmed = line.trimStart();
    const isPreprocLine = /^#\w+/.test(trimmed);

    if (isPreprocLine && parts.length > 0 && parts[0].type === 'text') {
      // Wrap the whole line as preproc
      return `<span class="gct-kw-preproc">${escapeHtml(line)}</span>`;
    }

    return parts
      .map(({ type, value }) =>
        type === 'text'
          ? escapeHtml(value)
          : `<span class="${TYPE_CLASS[type] || ''}">${escapeHtml(value)}</span>`
      )
      .join('');
  };

  return (
    <div className="gct-code-editor-card glass-card">
      <div className="gct-code-editor-top">
        <div className="gct-window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="gct-file-badge">
          <Code2 size={14} style={{ color: '#c084fc' }} />
          <span>{filename}</span>
        </div>

        <div className="gct-editor-tools">
          <span className="gct-lang-tag">{language}</span>
          <button className="gct-copy-btn" onClick={handleCopy} aria-label="Copy source code">
            {copied ? <CheckCircle size={13} style={{ color: '#34d399' }} /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      <div className="gct-code-scroll-track">
        <pre className="gct-code-pre">
          <code>
            {safeCode.split('\n').map((line, i) => (
              <div key={i} className="gct-code-line-row">
                <span className="gct-line-num">{String(i + 1).padStart(2, ' ')}</span>
                <span
                  className="gct-line-code"
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

// ─── 2. Realistic Terminal Execution Output ────────────────────────────────────
const TerminalOutputBlock = ({ output = '', filename = 'main.c' }) => {
  const safeOutput = output || 'Hello World\nProgram finished successfully.';

  return (
    <div className="gct-terminal-card glass-card">
      <div className="gct-terminal-header">
        <div className="terminal-header-left">
          <Terminal size={14} style={{ color: '#34d399' }} />
          <span>Terminal Execution Output</span>
        </div>
        <span className="terminal-status-pill">Status: 0 OK</span>
      </div>

      <div className="gct-terminal-body">
        <div className="terminal-command-line">
          <span className="prompt-symbol">&gt;</span>
          <span className="command-text">gcc {filename} -o main</span>
        </div>
        <div className="terminal-command-line">
          <span className="prompt-symbol">&gt;</span>
          <span className="command-text">./main</span>
        </div>
        <pre className="terminal-output-text">{safeOutput}</pre>
        <div className="terminal-footer-line">
          <span className="success-dot" />
          <span>Program finished successfully.</span>
        </div>
      </div>
    </div>
  );
};

// ─── 3. Theory Renderer ───────────────────────────────────────────────────────
const TheoryContentRenderer = ({ text = '' }) => {
  const safeText = text || 'No theory explanation text available for this chapter.';
  const rawParagraphs = safeText.split('\n\n').filter(p => p.trim());

  return (
    <div className="gct-theory-flow">
      {rawParagraphs.map((para, i) => {
        const trimmed = para.trim();

        // Heading
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
            <h3 key={i} className="gct-theory-heading">
              <span className="heading-purple-bar" />
              {trimmed}
            </h3>
          );
        }

        // Bullet List
        if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="gct-theory-bullet-list">
              {items.map((item, j) => (
                <li key={j}>
                  <span className="bullet-glow-dot">•</span>
                  <span>{item.replace(/^- /, '')}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Numbered List
        if (trimmed.match(/^\d+\./)) {
          const items = trimmed.split('\n').filter(l => l.trim().match(/^\d+\./));
          return (
            <ol key={i} className="gct-theory-numbered-list">
              {items.map((item, j) => (
                <li key={j}>
                  <span className="num-step-chip">{j + 1}</span>
                  <span>{item.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ol>
          );
        }

        // Callout Box
        if (trimmed.startsWith('Note:') || trimmed.startsWith('Tip:') || trimmed.startsWith('Why')) {
          return (
            <div key={i} className="gct-callout-glass-box">
              <Lightbulb size={18} className="callout-icon-purple" />
              <p className="callout-content-text">{trimmed}</p>
            </div>
          );
        }

        return <p key={i} className="gct-theory-paragraph">{trimmed}</p>;
      })}
    </div>
  );
};

// ─── 4. Key Takeaway Card ─────────────────────────────────────────────────────
const KeyTakeawayCard = ({ takeaway = '' }) => {
  const defaultTakeaway = "C is called the Mother of Programming Languages because many modern languages like C++, Java, Python, and JavaScript borrow its syntax and core memory concepts.";
  const textToDisplay = takeaway || defaultTakeaway;

  return (
    <motion.div 
      className="gct-takeaway-card glass-card"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="takeaway-header">
        <Lightbulb size={20} style={{ color: '#c084fc' }} />
        <h3>Key Takeaway</h3>
      </div>
      <blockquote className="takeaway-quote">
        "{textToDisplay}"
      </blockquote>
    </motion.div>
  );
};

// ─── 5. Code Breakdown Accordion ──────────────────────────────────────────────
const CodeBreakdownAccordion = ({ explanation = [] }) => {
  const [openItems, setOpenItems] = useState({});
  const safeExplanation = explanation || [];

  useEffect(() => {
    const initial = {};
    safeExplanation.forEach((_, idx) => { initial[idx] = true; });
    setOpenItems(initial);
  }, [explanation]);

  const toggleItem = (idx) => {
    setOpenItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (safeExplanation.length === 0) return null;

  return (
    <div className="gct-breakdown-wrapper">
      <div className="gct-breakdown-header-row">
        <div className="section-title-box">
          <Sparkles size={18} style={{ color: '#c084fc' }} />
          <h3>Step-by-Step Code Breakdown</h3>
        </div>
        <button 
          className="btn-toggle-all"
          onClick={() => {
            const allOpen = Object.values(openItems).every(Boolean);
            const newState = {};
            safeExplanation.forEach((_, idx) => { newState[idx] = !allOpen; });
            setOpenItems(newState);
          }}
        >
          {Object.values(openItems).every(Boolean) ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="gct-breakdown-accordion-list">
        {safeExplanation.map((item, idx) => {
          const isOpen = !!openItems[idx];
          return (
            <div key={idx} className={`gct-accordion-item glass-card ${isOpen ? 'open' : ''}`}>
              <div 
                className="gct-accordion-header"
                onClick={() => toggleItem(idx)}
              >
                <div className="accordion-header-left">
                  <span className="accordion-step-num">0{idx + 1}</span>
                  <code className="accordion-code-snippet">{item.line}</code>
                </div>
                <div className="accordion-chevron">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    className="gct-accordion-body"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
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
  );
};

// ─── 6. Chapter Summary Checklist ─────────────────────────────────────────────
const ChapterSummaryCard = ({ summaryItems = [] }) => {
  const defaultSummary = [
    'What is C and its historical significance in software engineering',
    'Main function entry point, header files, and statement terminators',
    'Understanding the C Compilation Process (Preprocessing to Linking)',
    'Writing, compiling, and running your first C program safely'
  ];

  const items = (summaryItems && summaryItems.length > 0) ? summaryItems : defaultSummary;

  return (
    <div className="gct-summary-card glass-card">
      <div className="gct-summary-header">
        <CheckSquare size={20} style={{ color: '#34d399' }} />
        <h3>Today's Learning Summary</h3>
      </div>

      <div className="gct-summary-checklist">
        {items.map((item, idx) => (
          <div key={idx} className="summary-check-row">
            <div className="check-badge-green">
              <Check size={14} />
            </div>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── GLOBAL REUSABLE CHAPTER READING TEMPLATE ─────────────────────────────────
export const GlobalChapterTemplate = ({
  chapterId = 1,
  chapterTitle = "Introduction to C",
  chapterDesc = "Master procedural programming, memory management, and algorithmic problem-solving in C.",
  difficulty = "Beginner",
  readTime = "10 min read",
  category = "Programming Fundamentals",
  subjectTitle = "Problem Solving Using C",
  subjectCode = "BCA-101",
  subjectPath = "/curriculum/semester-1/problem-solving-using-c",
  progressPercent = 35,
  language = "C",
  filename = "main.c",
  theory = "",
  takeaway = "",
  code = "",
  output = "",
  explanation = [],
  summaryItems = [],
  prevChapter = null,
  nextChapter = null,
  onNavigateChapter,
  isError = false,
  errorMessage = null
}) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Error State fallback
  if (isError || !chapterTitle) {
    return (
      <StudentLayout>
        <div className="gct-page-bg">
          <div className="gct-wrapper">
            <div className="gct-top-bar">
              <button className="gct-back-btn" onClick={() => navigate(subjectPath)}>
                <ArrowLeft size={16} /> <span>Back to {subjectTitle}</span>
              </button>
            </div>

            <div className="gct-error-card glass-card">
              <AlertTriangle size={42} style={{ color: '#f59e0b', marginBottom: 16 }} />
              <h3>Chapter Content Not Found</h3>
              <p>{errorMessage || `The requested chapter could not be loaded. Return to the subject index.`}</p>
              <button 
                className="btn-gct-primary"
                onClick={() => navigate(subjectPath)}
              >
                Back to {subjectTitle}
              </button>
            </div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  return (
    <LocalChapterErrorBoundary>
      <StudentLayout>
        {/* Scroll Progress Bar at very top of viewport */}
        <motion.div className="gct-reading-progress-bar" style={{ scaleX }} />

        {/* Global Dark Gradient & Purple Ambient Glow Container */}
        <div className="gct-page-bg">

          <div className="gct-wrapper">

            {/* Top Control Bar */}
            <div className="gct-top-bar">
              <button
                className="gct-back-btn"
                onClick={() => navigate(subjectPath)}
                aria-label={`Back to ${subjectTitle}`}
              >
                <ArrowLeft size={16} /> <span>Back to {subjectTitle}</span>
              </button>

              <div className="gct-top-actions">
                <button 
                  className={`gct-icon-btn ${isBookmarked ? 'active' : ''}`}
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  aria-label="Bookmark Chapter"
                >
                  <Bookmark size={16} fill={isBookmarked ? "#c084fc" : "none"} />
                </button>
              </div>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="gct-breadcrumb">
              <span className="gct-bc-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
              <ChevronRight size={12} className="gct-bc-sep" />
              <span className="gct-bc-link" onClick={() => navigate(subjectPath)}>{subjectTitle}</span>
              <ChevronRight size={12} className="gct-bc-sep" />
              <span className="gct-bc-active">{chapterTitle}</span>
            </div>

            {/* ── SECTION 1: COMPACT HERO GLASS CARD ── */}
            <motion.div
              className="gct-hero-card glass-card"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <div className="hero-radial-glow" />

              <div className="hero-meta-badges">
                <span className="hero-chapter-pill">CHAPTER 0{chapterId}</span>
                <span className="hero-diff-pill">🟢 {difficulty}</span>
                <span className="hero-readtime-pill">⏱ {readTime}</span>
                <span className="hero-category-pill">📚 {category}</span>
                <span className="hero-code-pill">{subjectCode}</span>
              </div>

              <h1 className="gct-hero-title">{chapterTitle}</h1>
              <p className="gct-hero-desc">{chapterDesc}</p>

              {/* Progress Bar inside Hero */}
              <div className="hero-progress-box">
                <div className="progress-info-row">
                  <span className="progress-title-text">Course Progress</span>
                  <span className="progress-percent-text">{progressPercent}% Completed</span>
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

            {/* ── MAIN LEARNING SEQUENCE (Adaptive Grid Containers) ── */}
            <div className="gct-sequence-container">

              {/* ── 2-COLUMN GRID ON DESKTOP: THEORY (Left) & KEY TAKEAWAY (Right) ── */}
              <div className="gct-theory-takeaway-grid">
                {/* SECTION 2: THEORY READING CARD */}
                <section className="gct-section gct-section-theory">
                  <div className="gct-section-hdr">
                    <BookOpen size={18} style={{ color: '#c084fc' }} />
                    <h2>1. Theory</h2>
                  </div>
                  <div className="gct-theory-card glass-card">
                    <TheoryContentRenderer text={theory} />
                  </div>
                </section>

                {/* SECTION 3: KEY TAKEAWAY CARD */}
                <section className="gct-section gct-section-takeaway">
                  <div className="gct-section-hdr desktop-only">
                    <Lightbulb size={18} style={{ color: '#c084fc' }} />
                    <h2>Key Insight</h2>
                  </div>
                  <KeyTakeawayCard takeaway={takeaway} />
                </section>
              </div>

              {/* ── SECTION 4: PRACTICAL CODE EDITOR (FULL WIDTH) ── */}
              <section className="gct-section">
                <div className="gct-section-hdr">
                  <Code2 size={18} style={{ color: '#60a5fa' }} />
                  <h2>2. Practical Code Example</h2>
                </div>
                <CodeEditorBlock code={code} language={language} filename={filename} />
              </section>

              {/* ── 2-COLUMN GRID ON DESKTOP: TERMINAL OUTPUT (Left) & CODE BREAKDOWN (Right) ── */}
              <div className="gct-output-breakdown-grid">
                {/* SECTION 5: REALISTIC TERMINAL OUTPUT */}
                <section className="gct-section gct-section-terminal">
                  <div className="gct-section-hdr">
                    <Terminal size={18} style={{ color: '#34d399' }} />
                    <h2>3. Terminal Output</h2>
                  </div>
                  <TerminalOutputBlock output={output} filename={filename} />
                </section>

                {/* SECTION 6: CODE BREAKDOWN ACCORDION */}
                <section className="gct-section gct-section-breakdown">
                  <CodeBreakdownAccordion explanation={explanation} />
                </section>
              </div>

              {/* ── SECTION 7: CHAPTER SUMMARY CHECKLIST (FULL WIDTH) ── */}
              <section className="gct-section">
                <ChapterSummaryCard summaryItems={summaryItems} />
              </section>

            </div>

            {/* ── SECTION 8: CHAPTER BOTTOM NAVIGATION ── */}
            <div className={`gct-sticky-bottom-nav${!prevChapter ? ' gct-nav-first-chapter' : ''}`}>

              {/* Previous button — hidden on first chapter */}
              {prevChapter ? (
                <button 
                  className="gct-nav-btn prev"
                  onClick={() => onNavigateChapter && onNavigateChapter(prevChapter.slug)}
                  aria-label={`Go to previous chapter: ${prevChapter.title}`}
                >
                  <ChevronLeft size={16} className="gct-nav-icon" />
                  <div className="nav-meta">
                    <span className="nav-sub">Previous</span>
                    <span className="nav-title">{prevChapter.title}</span>
                  </div>
                </button>
              ) : null}

              {/* Center — All Chapters */}
              <button 
                className="gct-nav-btn home"
                onClick={() => navigate(subjectPath)}
                aria-label="View all chapters"
              >
                All Chapters
              </button>

              {/* Next button — hidden on last chapter */}
              {nextChapter ? (
                <button 
                  className="gct-nav-btn next"
                  onClick={() => onNavigateChapter && onNavigateChapter(nextChapter.slug)}
                  aria-label={`Go to next chapter: ${nextChapter.title}`}
                >
                  <div className="nav-meta text-right">
                    <span className="nav-sub">Next</span>
                    <span className="nav-title">{nextChapter.title}</span>
                  </div>
                  <ChevronRight size={16} className="gct-nav-icon" />
                </button>
              ) : null}

            </div>

          </div>

        </div>
      </StudentLayout>
    </LocalChapterErrorBoundary>
  );
};

export default GlobalChapterTemplate;
