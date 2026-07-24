import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Code2, Terminal, ChevronRight,
  Info, Copy, CheckCircle, ChevronLeft, ChevronDown, ChevronUp,
  Sparkles, Check, Bookmark, Share2, HelpCircle, Layers,
  Cpu, Play, ArrowRight, Bot, Shield, Lightbulb, CheckSquare
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import '../../styles/MasterChapterTemplate.css';

// ─── 1. Syntax-Highlighted Code Editor Block ──────────────────────────────────
const CodeEditorBlock = ({ code, language = 'C', filename = 'main.c' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlight = (line) => {
    const keywords = /\b(int|float|double|char|void|return|if|else|for|while|do|switch|case|break|continue|default|struct|typedef|union|enum|const|sizeof|NULL|include|define|ifdef|ifndef|endif|printf|scanf|main|static|extern|class|public|private|protected|import|package|def|lambda|async|await|const|let|var|function)\b/g;
    const strings = /(\"[^\"]*\"|\'[^\']*\')/g;
    const comments = /(\/\/.*$|#.*$)/;
    const numbers = /\b(\d+\.?\d*)\b/g;
    const preproc = /^(#\w+|import .*|from .* import .*)/;

    return line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(preproc, '<span class="mc-kw-preproc">$1</span>')
      .replace(comments, '<span class="mc-kw-comment">$1</span>')
      .replace(strings, '<span class="mc-kw-string">$1</span>')
      .replace(keywords, '<span class="mc-kw-keyword">$1</span>')
      .replace(numbers, '<span class="mc-kw-number">$1</span>');
  };

  return (
    <div className="mc-code-editor-card">
      <div className="mc-code-editor-top">
        <div className="mc-window-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="mc-file-badge">
          <Code2 size={13} style={{ color: '#c084fc' }} />
          <span>{filename}</span>
        </div>

        <div className="mc-editor-right-tools">
          <span className="mc-lang-tag">{language}</span>
          <button className="mc-copy-btn" onClick={handleCopy} aria-label="Copy source code">
            {copied ? <CheckCircle size={13} style={{ color: '#34d399' }} /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>
      </div>

      <div className="mc-code-scroll-track">
        <pre className="mc-code-pre">
          <code>
            {code.split('\n').map((line, i) => (
              <div key={i} className="mc-code-line-row">
                <span className="mc-line-num">{String(i + 1).padStart(2, ' ')}</span>
                <span
                  className="mc-line-code"
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
const TerminalOutputBlock = ({ output, filename = 'main.c' }) => (
  <div className="mc-terminal-card">
    <div className="mc-terminal-header">
      <div className="terminal-header-left">
        <Terminal size={14} style={{ color: '#34d399' }} />
        <span>Terminal Execution Log</span>
      </div>
      <span className="terminal-status-tag">Status: 0 OK</span>
    </div>

    <div className="mc-terminal-body">
      <div className="terminal-command-line">
        <span className="prompt-symbol">$</span>
        <span className="command-text">gcc {filename} -o main &amp;&amp; ./main</span>
      </div>
      <pre className="terminal-output-text">{output}</pre>
      <div className="terminal-footer-line">
        <span className="success-dot" />
        <span>Process finished with exit code 0</span>
      </div>
    </div>
  </div>
);

// ─── 3. Theory Renderer (Paragraph Chunking & Callouts) ─────────────────────────
const TheoryContentRenderer = ({ text }) => {
  const rawParagraphs = text ? text.split('\n\n').filter(p => p.trim()) : [];

  return (
    <div className="mc-theory-flow">
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
            <h3 key={i} className="mc-theory-heading">
              <span className="heading-purple-bar" />
              {trimmed}
            </h3>
          );
        }

        // Bullet List
        if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="mc-theory-bullet-list">
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
            <ol key={i} className="mc-theory-numbered-list">
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
            <div key={i} className="mc-callout-glass-box">
              <Lightbulb size={18} className="callout-icon-purple" />
              <p className="callout-content-text">{trimmed}</p>
            </div>
          );
        }

        return <p key={i} className="mc-theory-paragraph">{trimmed}</p>;
      })}
    </div>
  );
};

// ─── 4. Visual Concept Workflow Diagram Card ────────────────────────────────────
const ConceptWorkflowCard = ({ conceptStages = [] }) => {
  const defaultStages = [
    { title: 'Source Code', desc: 'Written in high-level language (.c file)', icon: <Code2 size={16} /> },
    { title: 'Preprocessor & Compiler', desc: 'Translates syntax to machine byte instructions', icon: <Cpu size={16} /> },
    { title: 'Object & Executable', desc: 'Generates binary instructions (.exe)', icon: <Layers size={16} /> },
    { title: 'Program Output', desc: 'Runs in hardware RAM & prints results', icon: <Terminal size={16} /> }
  ];

  const stages = conceptStages.length > 0 ? conceptStages : defaultStages;

  return (
    <div className="mc-concept-card glass-card">
      <div className="mc-concept-header">
        <Lightbulb size={18} style={{ color: '#f59e0b' }} />
        <h3>Visual Concept Workflow</h3>
      </div>
      <p className="mc-concept-sub">Understand how data flows step-by-step in memory.</p>

      <div className="mc-concept-flow-grid">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className="mc-concept-stage-chip">
              <div className="stage-icon-circle">{stage.icon}</div>
              <div className="stage-info">
                <span className="stage-num">STAGE 0{idx + 1}</span>
                <h4 className="stage-title">{stage.title}</h4>
                <p className="stage-desc">{stage.desc}</p>
              </div>
            </div>
            {idx < stages.length - 1 && (
              <div className="mc-concept-arrow-connector">
                <ChevronRight size={18} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ─── 5. Code Breakdown Accordion ──────────────────────────────────────────────
const CodeBreakdownAccordion = ({ explanation = [] }) => {
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    // Open all by default for fast learning
    const initial = {};
    explanation.forEach((_, idx) => { initial[idx] = true; });
    setOpenItems(initial);
  }, [explanation]);

  const toggleItem = (idx) => {
    setOpenItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  if (!explanation || explanation.length === 0) return null;

  return (
    <div className="mc-breakdown-wrapper">
      <div className="mc-breakdown-header-row">
        <div className="section-title-box">
          <Sparkles size={18} style={{ color: '#c084fc' }} />
          <h3>Line-by-Line Code Breakdown</h3>
        </div>
        <button 
          className="btn-toggle-all"
          onClick={() => {
            const allOpen = Object.values(openItems).every(Boolean);
            const newState = {};
            explanation.forEach((_, idx) => { newState[idx] = !allOpen; });
            setOpenItems(newState);
          }}
        >
          {Object.values(openItems).every(Boolean) ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="mc-breakdown-accordion-list">
        {explanation.map((item, idx) => {
          const isOpen = !!openItems[idx];
          return (
            <div key={idx} className={`mc-accordion-item ${isOpen ? 'open' : ''}`}>
              <div 
                className="mc-accordion-header"
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
                    className="mc-accordion-body"
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

// ─── 6. Chapter Summary Checklist Card ─────────────────────────────────────────
const ChapterSummaryCard = ({ summaryItems = [] }) => {
  const defaultSummary = [
    'Understanding core syntax structure and header directives',
    'Main function entry point execution and return status codes',
    'Memory layout, format specifiers, and standard output streams',
    'Compilation stages from preprocessing to binary linking'
  ];

  const items = summaryItems.length > 0 ? summaryItems : defaultSummary;

  return (
    <div className="mc-summary-card glass-card">
      <div className="mc-summary-header">
        <CheckSquare size={18} style={{ color: '#34d399' }} />
        <h3>Today's Learning Highlights &amp; Key Takeaways</h3>
      </div>

      <div className="mc-summary-checklist">
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

// ─── GLOBAL REUSABLE MASTER CHAPTER TEMPLATE ───────────────────────────────────
export const MasterChapterTemplate = ({
  chapterId = 1,
  chapterTitle = "Introduction to C",
  chapterDesc = "Master the fundamentals of C programming from scratch.",
  difficulty = "Beginner",
  estimatedTime = "20 Min",
  subjectTitle = "Problem Solving Using C",
  subjectCode = "BCA-101",
  subjectPath = "/curriculum/semester-1/problem-solving-using-c",
  language = "C",
  filename = "main.c",
  theory = "",
  code = "",
  output = "",
  explanation = [],
  conceptStages = [],
  summaryItems = [],
  prevChapter = null,
  nextChapter = null,
  onNavigateChapter
}) => {
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const difficultyColors = { Beginner: '#34d399', Intermediate: '#60a5fa', Advanced: '#ef4444' };

  return (
    <StudentLayout>
      {/* Scroll Progress Bar at very top */}
      <motion.div className="mc-reading-progress-bar" style={{ scaleX }} />

      <div className="master-chapter-wrapper">

        {/* ── Top Bar with Sticky Back Button & Actions ── */}
        <div className="mc-top-control-bar">
          <button
            className="mc-back-btn"
            onClick={() => navigate(subjectPath)}
            aria-label={`Back to ${subjectTitle}`}
          >
            <ArrowLeft size={16} /> <span>Back to {subjectTitle}</span>
          </button>

          <div className="mc-top-actions">
            <button 
              className={`mc-action-icon-btn ${isBookmarked ? 'active' : ''}`}
              onClick={() => setIsBookmarked(!isBookmarked)}
              aria-label="Bookmark Chapter"
            >
              <Bookmark size={16} fill={isBookmarked ? "#c084fc" : "none"} />
            </button>
          </div>
        </div>

        {/* ── Compact Mobile Breadcrumb ── */}
        <div className="mc-breadcrumb">
          <span className="mc-breadcrumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <ChevronRight size={12} className="mc-breadcrumb-sep" />
          <span className="mc-breadcrumb-link" onClick={() => navigate(subjectPath)}>{subjectTitle}</span>
          <ChevronRight size={12} className="mc-breadcrumb-sep" />
          <span className="mc-breadcrumb-active">{chapterTitle}</span>
        </div>

        {/* ── 1. COMPACT HERO CARD (Max height 300-350px) ── */}
        <motion.div
          className="mc-chapter-hero-card"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="hero-floating-icon-badge">
            <BookOpen size={24} style={{ color: '#c084fc' }} />
          </div>

          <div className="hero-top-badges-row">
            <span className="hero-chapter-num-pill">CHAPTER 0{chapterId}</span>
            <span className="hero-code-pill">{subjectCode}</span>
            <span 
              className="hero-diff-pill"
              style={{ color: difficultyColors[difficulty] || '#c084fc' }}
            >
              {difficulty}
            </span>
            <span className="hero-time-pill"><Clock size={12} /> {estimatedTime}</span>
          </div>

          <h1 className="mc-hero-chapter-title">{chapterTitle}</h1>
          <p className="mc-hero-chapter-desc">{chapterDesc}</p>
        </motion.div>

        {/* ── MAIN LEARNING FLOW ── */}
        <div className="mc-learning-flow-container">

          {/* ── 2. THEORY READING CARD ── */}
          <div className="mc-flow-section">
            <div className="mc-section-header">
              <BookOpen size={18} style={{ color: '#c084fc' }} />
              <h2>1. Theory &amp; Concepts</h2>
            </div>
            <div className="mc-theory-reading-card glass-card">
              <TheoryContentRenderer text={theory} />
            </div>
          </div>

          {/* ── 3. VISUAL CONCEPT WORKFLOW CARD ── */}
          <div className="mc-flow-section">
            <ConceptWorkflowCard conceptStages={conceptStages} />
          </div>

          {/* ── 4. PRACTICAL CODE BLOCK ── */}
          <div className="mc-flow-section">
            <div className="mc-section-header">
              <Code2 size={18} style={{ color: '#60a5fa' }} />
              <h2>2. Practical Code Example</h2>
            </div>
            <CodeEditorBlock code={code} language={language} filename={filename} />
          </div>

          {/* ── 5. TERMINAL OUTPUT BLOCK ── */}
          <div className="mc-flow-section">
            <div className="mc-section-header">
              <Terminal size={18} style={{ color: '#34d399' }} />
              <h2>3. Terminal Output</h2>
            </div>
            <TerminalOutputBlock output={output} filename={filename} />
          </div>

          {/* ── 6. CODE BREAKDOWN ACCORDION ── */}
          <div className="mc-flow-section">
            <CodeBreakdownAccordion explanation={explanation} />
          </div>

          {/* ── 7. CHAPTER SUMMARY CHECKLIST ── */}
          <div className="mc-flow-section">
            <ChapterSummaryCard summaryItems={summaryItems} />
          </div>

        </div>

        {/* ── 8. STICKY BOTTOM NAVIGATION & PROGRESS ── */}
        <div className="mc-bottom-chapter-nav">
          {prevChapter ? (
            <button 
              className="mc-nav-btn prev"
              onClick={() => onNavigateChapter &amp;&amp; onNavigateChapter(prevChapter.slug)}
            >
              <ChevronLeft size={16} />
              <div className="nav-btn-meta">
                <span className="nav-label">Previous</span>
                <span className="nav-title">{prevChapter.title}</span>
              </div>
            </button>
          ) : (
            <div className="nav-btn-placeholder" />
          )}

          <button 
            className="mc-nav-btn home"
            onClick={() => navigate(subjectPath)}
          >
            All Chapters
          </button>

          {nextChapter ? (
            <button 
              className="mc-nav-btn next"
              onClick={() => onNavigateChapter &amp;&amp; onNavigateChapter(nextChapter.slug)}
            >
              <div className="nav-btn-meta text-right">
                <span className="nav-label">Next</span>
                <span className="nav-title">{nextChapter.title}</span>
              </div>
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

export default MasterChapterTemplate;
