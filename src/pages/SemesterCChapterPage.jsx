import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, BookOpen, Code2, Terminal, ChevronRight,
  Info, Copy, CheckCircle, ChevronLeft, ChevronDown, ChevronUp
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

  // Very simple keyword highlighter for C
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
        <span className="sc-code-lang">C Language</span>
        <button className="sc-copy-btn" onClick={handleCopy}>
          {copied ? <CheckCircle size={13} /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
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
  );
};

// ─── Output block ─────────────────────────────────────────────────────────────
const OutputBlock = ({ output }) => (
  <div className="sc-output-block">
    <div className="sc-output-header">
      <Terminal size={13} />
      <span>Program Output</span>
    </div>
    <pre className="sc-output-pre">{output}</pre>
  </div>
);

// ─── Theory renderer (smart paragraph/list/heading detection) ────────────────
const TheoryRenderer = ({ text }) => {
  const paragraphs = text.split('\n\n').filter(p => p.trim());

  return (
    <div className="sc-theory-body">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();

        // Section heading: short, no period, not starting lowercase, not a code line
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
          return <h3 key={i} className="sc-theory-heading">{trimmed}</h3>;
        }

        // Bullet list
        if (trimmed.startsWith('- ') || trimmed.includes('\n- ')) {
          const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
          return (
            <ul key={i} className="sc-theory-list">
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^- /, '')}</li>
              ))}
            </ul>
          );
        }

        // Numbered list
        if (trimmed.match(/^\d+\./)) {
          const items = trimmed.split('\n').filter(l => l.trim().match(/^\d+\./));
          return (
            <ol key={i} className="sc-theory-list">
              {items.map((item, j) => (
                <li key={j}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          );
        }

        // Inline code block (lines starting with C keywords/syntax)
        if (
          trimmed.startsWith('#include') ||
          trimmed.startsWith('#define') ||
          trimmed.startsWith('int main') ||
          trimmed.startsWith('void ') ||
          trimmed.startsWith('int ') ||
          trimmed.startsWith('float ') ||
          trimmed.startsWith('char ') ||
          trimmed.startsWith('struct ') ||
          trimmed.startsWith('typedef ') ||
          trimmed.startsWith('while ') ||
          trimmed.startsWith('for ') ||
          trimmed.startsWith('if (') ||
          (trimmed.includes('{') && trimmed.includes('}') && trimmed.length < 80)
        ) {
          return <pre key={i} className="sc-theory-code">{trimmed}</pre>;
        }

        return <p key={i}>{trimmed}</p>;
      })}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const SemesterCChapterPage = () => {
  const navigate = useNavigate();
  const { chapterSlug } = useParams();
  const [explanationOpen, setExplanationOpen] = useState(true);

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

  // Fallback if chapter not found
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

  const difficultyColor = { Beginner: '#4ade80', Intermediate: '#f59e0b', Advanced: '#f87171' };

  return (
    <StudentLayout>
      <div className="sc-page-wrapper">

        {/* ── Back Button (row 1) ── */}
        <button
          className="sc-back-btn"
          onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}
        >
          <ArrowLeft size={16} /> Back to Chapters
        </button>

        {/* ── Breadcrumb (row 2) ── */}
        <div className="sc-breadcrumb">
          <span className="sc-breadcrumb-link" onClick={() => navigate('/dashboard')}>Dashboard</span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-link" onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}>
            Problem Solving Using C
          </span>
          <ChevronRight size={12} className="sc-breadcrumb-sep" />
          <span className="sc-breadcrumb-active">{chapter.title}</span>
        </div>

        {/* Chapter Header */}
        <motion.div
          className="sc-chapter-hero"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="sc-chapter-hero-left">
            <div className="sc-chapter-num-large">
              {String(chapter.id).padStart(2, '0')}
            </div>
            <div className="sc-chapter-hero-info">
              <div className="sc-chapter-hero-badges">
                <span className="sc-badge-sem">CHAPTER {chapter.id}</span>
                <span
                  className="sc-diff-badge"
                  style={{ color: difficultyColor[chapter.difficulty] }}
                >
                  {chapter.difficulty}
                </span>
              </div>
              <h1 className="sc-chapter-hero-title">{chapter.title}</h1>
              <p className="sc-chapter-hero-desc">{chapter.desc}</p>
            </div>
          </div>
          <div className="sc-chapter-hero-icon">{chapter.icon}</div>
        </motion.div>

        {/* Content Area */}
        <div className="sc-content-area">

          {/* Theory Section */}
          <section className="sc-content-section">
            <div className="sc-section-hdr">
              <BookOpen size={17} style={{ color: 'var(--accent-glow)' }} />
              <h2 className="sc-section-h2">Theory</h2>
            </div>
            <TheoryRenderer text={content.theory} />
          </section>

          {/* Divider */}
          <div className="sc-divider" />

          {/* Example Program */}
          <section className="sc-content-section">
            <div className="sc-section-hdr">
              <Code2 size={17} style={{ color: '#c084fc' }} />
              <h2 className="sc-section-h2">Example Program</h2>
            </div>
            <CodeBlock code={content.code} />
          </section>

          {/* Output */}
          <section className="sc-content-section">
            <div className="sc-section-hdr">
              <Terminal size={17} style={{ color: '#4ade80' }} />
              <h2 className="sc-section-h2">Expected Output</h2>
            </div>
            <OutputBlock output={content.output} />
          </section>

          {/* Divider */}
          <div className="sc-divider" />

          {/* Explanation */}
          <section className="sc-content-section">
            <button
              className="sc-explain-toggle"
              onClick={() => setExplanationOpen(o => !o)}
            >
              <div className="sc-section-hdr" style={{ marginBottom: 0 }}>
                <Info size={17} style={{ color: '#f59e0b' }} />
                <h2 className="sc-section-h2" style={{ margin: 0 }}>Line-by-Line Explanation</h2>
              </div>
              {explanationOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {explanationOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
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

        {/* Chapter Navigation */}
        <div className="sc-chapter-nav">
          {prevChapter ? (
            <button className="sc-nav-btn sc-nav-prev" onClick={() => goToChapter(prevChapter.slug)}>
              <ChevronLeft size={16} />
              <div>
                <span className="sc-nav-label">Previous</span>
                <span className="sc-nav-title">{prevChapter.title}</span>
              </div>
            </button>
          ) : <div />}

          <button
            className="sc-nav-btn sc-nav-home"
            onClick={() => navigate('/curriculum/semester-1/problem-solving-using-c')}
          >
            All Chapters
          </button>

          {nextChapter ? (
            <button className="sc-nav-btn sc-nav-next" onClick={() => goToChapter(nextChapter.slug)}>
              <div>
                <span className="sc-nav-label">Next</span>
                <span className="sc-nav-title">{nextChapter.title}</span>
              </div>
              <ChevronRight size={16} />
            </button>
          ) : <div />}
        </div>

      </div>
    </StudentLayout>
  );
};

export default SemesterCChapterPage;
