/**
 * LiveCodeEditor.jsx
 * Premium interactive code editor hero element.
 * Hooks are written to be fully exhaustive-deps compliant (CI-safe).
 */

import React, { useState, useEffect, useRef } from 'react';
import '../styles/LiveCodeEditor.css';

/* ─────────────────────────────────────────────
   CONSTANTS  (module-level — not reactive)
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

const PREFIX_LINES = [
  'package com.bca.department;',
  '',
  'public class Main {',
  '',
  '    public static void main(String[] args) {',
  '        BCAPlatform platform = new BCAPlatform();',
  '',
];

const DYNAMIC_PREFIX = '        platform.learn("';

const CONSOLE_STEPS = [
  { text: '> Running BCA Platform...', accent: false },
  { text: '  Loading Courses...', accent: false },
  { text: '  Loading Notes...', accent: false },
  { text: '  Loading Quiz...', accent: false },
  { text: '  \u2713 Ready.', accent: true },
];

/* ─────────────────────────────────────────────
   SYNTAX HIGHLIGHTING
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

const PATTERNS = [
  { regex: /^(\/\/.*)/, type: 'comment' },
  { regex: /^("(?:[^"\\]|\\.)*")/, type: 'string' },
  { regex: /^('(?:[^'\\]|\\.)?')/, type: 'string' },
  { regex: /^(\d+(?:\.\d+)?[Lf]?)/, type: 'number' },
  { regex: /^([A-Za-z_$][A-Za-z0-9_$]*)/, type: 'word' },
  { regex: /^([^A-Za-z0-9_$"'\s]+)/, type: 'punctuation' },
  { regex: /^(\s+)/, type: 'whitespace' },
];

function tokeniseLine(line) {
  if (!line || line.trim() === '') return [{ type: 'blank', text: '\u00A0' }];
  const tokens = [];
  let remaining = line;
  while (remaining.length > 0) {
    let matched = false;
    for (const { regex, type } of PATTERNS) {
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
}

/* ─────────────────────────────────────────────
   HIGHLIGHTED LINE
   ───────────────────────────────────────────── */
function HighlightedLine({ text, lineNumber }) {
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
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
   ───────────────────────────────────────────── */
const LiveCodeEditor = () => {
  const [typedLines, setTypedLines] = useState([]);
  const [prefixDone, setPrefixDone] = useState(false);
  const [dynamicText, setDynamicText] = useState('');
  const [techIdx, setTechIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [buildStatus, setBuildStatus] = useState('success');
  const [consoleLines, setConsoleLines] = useState([]);
  const [consoleKey, setConsoleKey] = useState(0);
  const codeBodyRef = useRef(null);

  /* ── Scroll to bottom ── */
  useEffect(() => {
    if (codeBodyRef.current) {
      codeBodyRef.current.scrollTop = codeBodyRef.current.scrollHeight;
    }
  }, [typedLines, dynamicText]);

  /* ── Type prefix lines once on mount ── */
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;
    let timerId;

    function tick() {
      if (cancelled) return;
      if (lineIdx >= PREFIX_LINES.length) {
        setPrefixDone(true);
        return;
      }
      const line = PREFIX_LINES[lineIdx];
      if (line === '') {
        setTypedLines(prev => {
          const next = [...prev];
          next[lineIdx] = '';
          return next;
        });
        lineIdx++;
        charIdx = 0;
        timerId = setTimeout(tick, 80);
        return;
      }
      if (charIdx < line.length) {
        const partial = line.slice(0, charIdx + 1);
        setTypedLines(prev => {
          const next = [...prev];
          next[lineIdx] = partial;
          return next;
        });
        charIdx++;
        timerId = setTimeout(tick, 28 + Math.random() * 27);
      } else {
        lineIdx++;
        charIdx = 0;
        timerId = setTimeout(tick, 110);
      }
    }

    timerId = setTimeout(tick, 600);
    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, []); // runs once — PREFIX_LINES is a module-level constant

  /* ── Dynamic tech-name typing loop ── */
  useEffect(() => {
    if (!prefixDone) return;

    let cancelled = false;
    let timerId;
    const tech = TECH_NAMES[techIdx];

    if (!isDeleting) {
      // Type character by character
      let pos = dynamicText.length;
      function typeNext() {
        if (cancelled) return;
        if (pos < tech.length) {
          pos++;
          setDynamicText(tech.slice(0, pos));
          timerId = setTimeout(typeNext, 55 + Math.random() * 40);
        } else {
          // Fully typed — wait then start deleting
          timerId = setTimeout(() => {
            if (!cancelled) setIsDeleting(true);
          }, 1600);
        }
      }
      timerId = setTimeout(typeNext, 200);
    } else {
      // Delete character by character
      let remaining = dynamicText;
      function deleteNext() {
        if (cancelled) return;
        if (remaining.length > 0) {
          remaining = remaining.slice(0, -1);
          setDynamicText(remaining);
          timerId = setTimeout(deleteNext, 38 + Math.random() * 22);
        } else {
          // Move to next tech
          const next = (techIdx + 1) % TECH_NAMES.length;
          setTechIdx(next);
          setIsDeleting(false);
        }
      }
      timerId = setTimeout(deleteNext, 300);
    }

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [prefixDone, techIdx, isDeleting, dynamicText]);

  /* ── Build-status cycle ── */
  useEffect(() => {
    const interval = setInterval(() => {
      setBuildStatus('compiling');
      const t = setTimeout(() => setBuildStatus('success'), 1800);
      return () => clearTimeout(t);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  /* ── Console animation loop ── */
  useEffect(() => {
    const stepDelays = [0, 900, 1700, 2500, 3200];
    const cycleMs = 5600; // 3200 + 2200 wait after last step
    const pendingTimers = [];

    function runCycle() {
      setConsoleLines([]);
      setConsoleKey(k => k + 1);
      CONSOLE_STEPS.forEach((step, i) => {
        const t = setTimeout(() => {
          setConsoleLines(prev => [...prev, step]);
        }, stepDelays[i]);
        pendingTimers.push(t);
      });
    }

    const startDelay = setTimeout(runCycle, 1200);
    const interval = setInterval(runCycle, cycleMs);

    return () => {
      clearTimeout(startDelay);
      clearInterval(interval);
      pendingTimers.forEach(clearTimeout);
    };
  }, []); // CONSOLE_STEPS and stepDelays are module-level constants

  /* ── Render ── */
  return (
    <div className="lce-outer">
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
              <span className="lce-tab-icon">\u2615</span>
              <span>Main.java</span>
            </div>
            <div className="lce-tab">
              <span className="lce-tab-icon lce-tab-icon-dim">\uD83D\uDCC4</span>
              <span>BCAPlatform.java</span>
            </div>
          </div>
          <div className="lce-toolbar">
            <span className="lce-badge lce-badge-java">Java 21</span>
            <button className="lce-run-btn">
              <span className="lce-run-icon">\u25B6</span> Run
            </button>
            <span className="lce-toolbar-icon" title="Git">\u2387</span>
            <span className="lce-toolbar-icon" title="Settings">\u2699</span>
          </div>
        </div>

        {/* CODE BODY */}
        <div className="lce-body" ref={codeBodyRef}>
          <div className="lce-code-area">
            {typedLines.map((line, i) => (
              <HighlightedLine key={i} text={line} lineNumber={i + 1} />
            ))}

            {prefixDone && (
              <div className="lce-line">
                <span className="lce-line-num">{typedLines.length + 1}</span>
                <span className="lce-line-content">
                  {tokeniseLine(DYNAMIC_PREFIX).map((tok, i) => (
                    <span key={i} className={`lce-tok lce-tok-${tok.type}`}>{tok.text}</span>
                  ))}
                  <span className="lce-tok lce-tok-string">{dynamicText}</span>
                  <span className="lce-cursor" />
                  {dynamicText.length > 0 && (
                    <span className="lce-tok lce-tok-string">");</span>
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* CONSOLE */}
        <div className="lce-console">
          <div className="lce-console-bar">
            <span className="lce-console-title">TERMINAL</span>
            <span className="lce-console-close">\u00D7</span>
          </div>
          <div className="lce-console-body" key={consoleKey}>
            {consoleLines.map((cl, i) => (
              <div
                key={i}
                className={`lce-console-line${cl.accent ? ' lce-console-accent' : ''}`}
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
              {buildStatus === 'compiling'
                ? <><span className="lce-spinner" /> Compiling...</>
                : <>\u2713 Build Successful</>
              }
            </span>
          </div>
          <div className="lce-status-center">
            <span className="lce-status-item">Java 21</span>
          </div>
          <div className="lce-status-right">
            <span className="lce-status-item">UTF-8</span>
            <span className="lce-status-item">Ln {typedLines.length + (prefixDone ? 1 : 0)}</span>
          </div>
        </div>

      </div>

      <div className="lce-glow-blob" aria-hidden="true" />
    </div>
  );
};

export default LiveCodeEditor;
