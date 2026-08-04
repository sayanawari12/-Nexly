/**
 * LiveCodeEditor.jsx
 * Premium interactive code editor hero element.
 * Features: live typing animation, syntax highlighting, status bar, console panel.
 * Self-contained — no external UI libraries beyond framer-motion.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../styles/LiveCodeEditor.css';

/* ─────────────────────────────────────────────
   TYPING SEQUENCE
   ───────────────────────────────────────────── */
const TECH_NAMES = [
  'Java',
  'Python',
  'React',
  'Node.js',
  'DBMS',
  'Operating System',
  'Data Structure',
];

// Static prefix lines (typed once at startup)
const PREFIX_LINES = [
  { text: 'package com.bca.department;', type: 'keyword-line' },
  { text: '', type: 'blank' },
  { text: 'public class Main {', type: 'keyword-line' },
  { text: '', type: 'blank' },
  { text: '    public static void main(String[] args) {', type: 'keyword-line' },
  { text: '        BCAPlatform platform = new BCAPlatform();', type: 'code-line' },
  { text: '', type: 'blank' },
];

const DYNAMIC_PREFIX = '        platform.learn("';
const DYNAMIC_SUFFIX = '");';

/* ─────────────────────────────────────────────
   SYNTAX HIGHLIGHTING TOKENS
   ───────────────────────────────────────────── */
const JAVA_KEYWORDS = new Set([
  'package', 'public', 'class', 'static', 'void', 'new', 'import',
  'private', 'protected', 'return', 'if', 'else', 'for', 'while',
  'true', 'false', 'null', 'this', 'super', 'extends', 'implements',
]);

const JAVA_TYPES = new Set([
  'String', 'int', 'double', 'float', 'boolean', 'char', 'long',
  'BCAPlatform', 'Main',
]);

/**
 * Tokenise a single line of Java-ish code into spans.
 * This is a simple regex-based highlighter — not a full parser.
 */
const tokeniseLine = (line) => {
  if (line.trim() === '') return [{ type: 'blank', text: '\u00A0' }];

  const tokens = [];
  let remaining = line;

  const patterns = [
    // Line comment
    { regex: /^(\/\/.*)/, type: 'comment' },
    // String literal
    { regex: /^("(?:[^"\\]|\\.)*")/, type: 'string' },
    // Char literal
    { regex: /^('(?:[^'\\]|\\.)?')/, type: 'string' },
    // Number
    { regex: /^(\d+(?:\.\d+)?[Lf]?)/, type: 'number' },
    // Word (keyword, type, method, identifier)
    { regex: /^([A-Za-z_$][A-Za-z0-9_$]*)/, type: 'word' },
    // Punctuation / operators
    { regex: /^([^A-Za-z0-9_$"'\s]+)/, type: 'punctuation' },
    // Whitespace
    { regex: /^(\s+)/, type: 'whitespace' },
  ];

  while (remaining.length > 0) {
    let matched = false;
    for (const { regex, type } of patterns) {
      const m = remaining.match(regex);
      if (m) {
        let tokenType = type;
        if (type === 'word') {
          if (JAVA_KEYWORDS.has(m[1])) tokenType = 'keyword';
          else if (JAVA_TYPES.has(m[1])) tokenType = 'type';
          else if (/^[A-Z]/.test(m[1])) tokenType = 'class-name';
          else tokenType = 'identifier';
        }
        tokens.push({ type: tokenType, text: m[1] });
        remaining = remaining.slice(m[1].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ type: 'plain', text: remaining[0] });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

/* ─────────────────────────────────────────────
   HIGHLIGHTED LINE COMPONENT
   ───────────────────────────────────────────── */
const HighlightedLine = ({ text, lineNumber }) => {
  const tokens = tokeniseLine(text);
  return (
    <div className="lce-line">
      <span className="lce-line-num">{lineNumber}</span>
      <span className="lce-line-content">
        {tokens.map((tok, i) => (
          <span key={i} className={`lce-tok lce-tok-${tok.type}`}>{tok.text}</span>
        ))}
      </span>
    </div>
  );
};

/* ─────────────────────────────────────────────
   CONSOLE MESSAGES
   ───────────────────────────────────────────── */
const CONSOLE_STEPS = [
  { text: '> Running BCA Platform...', delay: 0 },
  { text: '  Loading Courses...', delay: 900 },
  { text: '  Loading Notes...', delay: 1700 },
  { text: '  Loading Quiz...', delay: 2500 },
  { text: '  ✓ Ready.', delay: 3200, accent: true },
];

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
const LiveCodeEditor = () => {
  /* ── state ── */
  const [prefixDone, setPrefixDone] = useState(false);
  const [typedLines, setTypedLines] = useState([]); // completed prefix lines
  const [dynamicText, setDynamicText] = useState(''); // the changing tech name portion
  const [techIdx, setTechIdx] = useState(0);
  const [phase, setPhase] = useState('type'); // 'type' | 'wait' | 'delete'
  const [buildStatus, setBuildStatus] = useState('success'); // 'success' | 'compiling'
  const [consoleLines, setConsoleLines] = useState([]);
  const [consoleKey, setConsoleKey] = useState(0);
  const codeBodyRef = useRef(null);
  const animRef = useRef(null);

  /* ── Scroll code body to bottom ── */
  useEffect(() => {
    if (codeBodyRef.current) {
      codeBodyRef.current.scrollTop = codeBodyRef.current.scrollHeight;
    }
  }, [typedLines, dynamicText]);

  /* ── Type prefix lines once on mount ── */
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let currentLine = '';

    const tick = () => {
      if (lineIdx >= PREFIX_LINES.length) {
        setPrefixDone(true);
        return;
      }

      const line = PREFIX_LINES[lineIdx];

      if (line.type === 'blank') {
        setTypedLines(prev => [...prev, '']);
        lineIdx++;
        charIdx = 0;
        currentLine = '';
        animRef.current = setTimeout(tick, 80);
        return;
      }

      if (charIdx < line.text.length) {
        currentLine = line.text.slice(0, charIdx + 1);
        setTypedLines(prev => {
          const updated = [...prev];
          updated[lineIdx] = currentLine;
          return updated;
        });
        charIdx++;
        // natural speed: 28-55ms
        animRef.current = setTimeout(tick, 28 + Math.random() * 27);
      } else {
        lineIdx++;
        charIdx = 0;
        currentLine = '';
        animRef.current = setTimeout(tick, 110);
      }
    };

    animRef.current = setTimeout(tick, 600);
    return () => clearTimeout(animRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Dynamic typing loop (tech names) ── */
  useEffect(() => {
    if (!prefixDone) return;

    const tech = TECH_NAMES[techIdx];
    let pos = 0;
    let timer;

    if (phase === 'type') {
      const typeChar = () => {
        if (pos < tech.length) {
          pos++;
          setDynamicText(tech.slice(0, pos));
          timer = setTimeout(typeChar, 55 + Math.random() * 40);
        } else {
          // wait before deleting
          timer = setTimeout(() => setPhase('delete'), 1600);
        }
      };
      timer = setTimeout(typeChar, phase === 'type' ? 200 : 0);
    }

    if (phase === 'delete') {
      let remaining = tech;
      const deleteChar = () => {
        if (remaining.length > 0) {
          remaining = remaining.slice(0, -1);
          setDynamicText(remaining);
          timer = setTimeout(deleteChar, 38 + Math.random() * 22);
        } else {
          // advance to next tech
          const next = (techIdx + 1) % TECH_NAMES.length;
          setTechIdx(next);
          setPhase('type');
        }
      };
      timer = setTimeout(deleteChar, 300);
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefixDone, phase, techIdx]);

  /* ── Build status cycle ── */
  useEffect(() => {
    const cycle = () => {
      setBuildStatus('compiling');
      const t = setTimeout(() => setBuildStatus('success'), 1800);
      return t;
    };

    const interval = setInterval(() => {
      const t = cycle();
      return () => clearTimeout(t);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  /* ── Console animation loop ── */
  const runConsole = useCallback(() => {
    setConsoleLines([]);
    setConsoleKey(k => k + 1);

    CONSOLE_STEPS.forEach(({ text, delay, accent }) => {
      setTimeout(() => {
        setConsoleLines(prev => [...prev, { text, accent }]);
      }, delay);
    });

    // loop
    setTimeout(runConsole, 3200 + 2200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const t = setTimeout(runConsole, 1200);
    return () => clearTimeout(t);
  }, [runConsole]);

  /* ── Compose code body lines ── */
  const allLines = [...typedLines];
  // dynamic line = DYNAMIC_PREFIX + dynamicText + cursor + DYNAMIC_SUFFIX (suffix only after tech)
  const dynamicLineText = prefixDone
    ? DYNAMIC_PREFIX + dynamicText
    : '';

  /* ── Render ── */
  return (
    <div className="lce-outer">
      {/* ── EDITOR SHELL ── */}
      <div className="lce-editor">

        {/* TITLE BAR */}
        <div className="lce-titlebar">
          <div className="lce-dots">
            <span className="lce-dot lce-dot-red" />
            <span className="lce-dot lce-dot-yellow" />
            <span className="lce-dot lce-dot-green" />
          </div>

          <div className="lce-tabs">
            <div className="lce-tab lce-tab-active">
              <span className="lce-tab-icon">☕</span>
              <span>Main.java</span>
            </div>
            <div className="lce-tab">
              <span className="lce-tab-icon lce-tab-icon-dim">📄</span>
              <span>BCAPlatform.java</span>
            </div>
          </div>

          <div className="lce-toolbar">
            <span className="lce-badge lce-badge-java">Java 21</span>
            <button className="lce-run-btn">
              <span className="lce-run-icon">▶</span> Run
            </button>
            <span className="lce-toolbar-icon" title="Git">⎇</span>
            <span className="lce-toolbar-icon" title="Settings">⚙</span>
          </div>
        </div>

        {/* EDITOR BODY: gutter + code */}
        <div className="lce-body" ref={codeBodyRef}>
          <div className="lce-code-area">
            {allLines.map((line, i) => (
              <HighlightedLine key={i} text={line} lineNumber={i + 1} />
            ))}

            {/* Dynamic line with cursor */}
            {prefixDone && (
              <div className="lce-line">
                <span className="lce-line-num">{allLines.length + 1}</span>
                <span className="lce-line-content">
                  {/* Prefix segment: tokenised */}
                  {tokeniseLine(DYNAMIC_PREFIX).map((tok, i) => (
                    <span key={i} className={`lce-tok lce-tok-${tok.type}`}>{tok.text}</span>
                  ))}
                  {/* Dynamic typed tech name */}
                  <span className="lce-tok lce-tok-string">{dynamicText}</span>
                  {/* Blinking cursor */}
                  <span className="lce-cursor" />
                  {/* Suffix only when tech name is being typed/shown */}
                  {dynamicText.length > 0 && (
                    <span className="lce-tok lce-tok-string">{DYNAMIC_SUFFIX}</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CONSOLE / TERMINAL PANEL */}
        <div className="lce-console">
          <div className="lce-console-bar">
            <span className="lce-console-title">TERMINAL</span>
            <span className="lce-console-close">×</span>
          </div>
          <div className="lce-console-body" key={consoleKey}>
            {consoleLines.map((cl, i) => (
              <div
                key={i}
                className={`lce-console-line ${cl.accent ? 'lce-console-accent' : ''}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {cl.text}
              </div>
            ))}
          </div>
        </div>

        {/* STATUS BAR */}
        <div className="lce-statusbar">
          <div className="lce-status-left">
            <span className={`lce-status-indicator ${buildStatus === 'compiling' ? 'lce-status-compiling' : 'lce-status-success'}`}>
              {buildStatus === 'compiling' ? (
                <><span className="lce-spinner" /> Compiling...</>
              ) : (
                <>✓ Build Successful</>
              )}
            </span>
          </div>
          <div className="lce-status-center">
            <span className="lce-status-item">Java 21</span>
          </div>
          <div className="lce-status-right">
            <span className="lce-status-item">UTF-8</span>
            <span className="lce-status-item">Ln {allLines.length + (prefixDone ? 1 : 0)}</span>
          </div>
        </div>

      </div>

      {/* Purple glow behind editor */}
      <div className="lce-glow-blob" aria-hidden="true" />
    </div>
  );
};

export default LiveCodeEditor;
