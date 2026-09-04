/**
 * LiveCodeEditor.jsx  — Premium animated IDE hero element
 * NEXLY-branded code editor with dynamic typing & terminal simulation
 */

import React, { useState, useEffect, useRef } from 'react';
import '../styles/LiveCodeEditor.css';

/* ─── module-level constants (non-reactive) ─── */
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
  'package com.nexly;',
  '',
  'public class Main {',
  '',
  '    public static void main(String[] args) {',
  '',
  '        Nexly platform = new Nexly();',
  '',
];

const DYNAMIC_PREFIX = '        platform.learn("';

const SUFFIX_LINES = [
  '        platform.practice();',
  '        platform.build();',
  '    }',
  '}',
];

const CONSOLE_STEPS = [
  { text: '> Starting NEXLY...', accent: false },
  { text: '> Loading learning environment...', accent: false },
  { text: '✓ Ready to code', accent: true },
];

const STEP_DELAYS = [0, 900, 1800];
const CYCLE_MS = 5000;

/* ─── syntax highlighter ─── */
const KW = new Set([
  'package','public','class','static','void','new','import',
  'private','protected','return','if','else','for','while',
  'true','false','null','this','super','extends','implements',
]);
const TYPES = new Set([
  'String','int','double','float','boolean','char','long',
  'Nexly','Main',
]);
const PATS = [
  { re: /^(\/\/.*)/, t: 'comment' },
  { re: /^("(?:[^"\\]|\\.)*")/, t: 'string' },
  { re: /^('(?:[^'\\]|\\.)?')/, t: 'string' },
  { re: /^(\d+(?:\.\d+)?[Lf]?)/, t: 'number' },
  { re: /^([A-Za-z_$][A-Za-z0-9_$]*)/, t: 'word' },
  { re: /^([^A-Za-z0-9_$"'\s]+)/, t: 'punctuation' },
  { re: /^(\s+)/, t: 'ws' },
];

function tokenise(line) {
  if (!line || !line.trim()) return [{ t: 'blank', v: '\u00A0' }];
  const out = [];
  let rem = line;
  while (rem.length) {
    let hit = false;
    for (const { re, t } of PATS) {
      const m = rem.match(re);
      if (m) {
        let type = t;
        if (t === 'word') {
          if (KW.has(m[1]))    type = 'kw';
          else if (TYPES.has(m[1])) type = 'type';
          else if (/^[A-Z]/.test(m[1])) type = 'cls';
          else type = 'id';
        }
        out.push({ t: type, v: m[1] });
        rem = rem.slice(m[1].length);
        hit = true;
        break;
      }
    }
    if (!hit) { out.push({ t: 'plain', v: rem[0] }); rem = rem.slice(1); }
  }
  return out;
}

function HLine({ text, ln }) {
  const toks = tokenise(text);
  return (
    <div className="lce-line">
      <span className="lce-ln">{ln}</span>
      <span className="lce-lc">
        {toks.map((tk, i) => (
          <span key={i} className={`lce-t lce-t-${tk.t}`}>{tk.v}</span>
        ))}
      </span>
    </div>
  );
}

/* ─── main component ─── */
export default function LiveCodeEditor() {
  const [typedLines, setTypedLines]   = useState([]);
  const [prefixDone, setPrefixDone]   = useState(false);
  const [dynText,    setDynText]      = useState('');
  const [techIdx,    setTechIdx]      = useState(0);
  const [deleting,   setDeleting]     = useState(false);
  const [buildOk,    setBuildOk]      = useState(true);
  const [conLines,   setConLines]     = useState([]);
  const [conKey,     setConKey]       = useState(0);
  const bodyRef = useRef(null);

  /* scroll to bottom */
  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [typedLines, dynText]);

  /* type prefix once */
  useEffect(() => {
    let li = 0, ci = 0, dead = false, tid;
    function tick() {
      if (dead) return;
      if (li >= PREFIX_LINES.length) { setPrefixDone(true); return; }
      const ln = PREFIX_LINES[li];
      if (ln === '') {
        setTypedLines(p => { const n=[...p]; n[li]=''; return n; });
        li++; ci = 0;
        tid = setTimeout(tick, 80);
        return;
      }
      if (ci < ln.length) {
        const s = ln.slice(0, ci + 1);
        setTypedLines(p => { const n=[...p]; n[li]=s; return n; });
        ci++;
        tid = setTimeout(tick, 25 + Math.random() * 30);
      } else { li++; ci=0; tid = setTimeout(tick, 110); }
    }
    tid = setTimeout(tick, 500);
    return () => { dead=true; clearTimeout(tid); };
  }, []);

  /* tech-name typing loop */
  useEffect(() => {
    if (!prefixDone) return;
    let dead=false, tid;
    const tech = TECH_NAMES[techIdx];

    if (!deleting) {
      let pos = dynText.length;
      function typeNext() {
        if (dead) return;
        if (pos < tech.length) {
          pos++;
          setDynText(tech.slice(0, pos));
          tid = setTimeout(typeNext, 50 + Math.random() * 45);
        } else {
          tid = setTimeout(() => { if (!dead) setDeleting(true); }, 1800);
        }
      }
      tid = setTimeout(typeNext, 180);
    } else {
      let rem = dynText;
      function delNext() {
        if (dead) return;
        if (rem.length > 0) {
          rem = rem.slice(0, -1);
          setDynText(rem);
          tid = setTimeout(delNext, 35 + Math.random() * 20);
        } else {
          setTechIdx((techIdx + 1) % TECH_NAMES.length);
          setDeleting(false);
        }
      }
      tid = setTimeout(delNext, 280);
    }
    return () => { dead=true; clearTimeout(tid); };
  }, [prefixDone, techIdx, deleting, dynText]);

  /* build status pulse */
  useEffect(() => {
    const iv = setInterval(() => {
      setBuildOk(false);
      const t = setTimeout(() => setBuildOk(true), 1800);
      return () => clearTimeout(t);
    }, 8000);
    return () => clearInterval(iv);
  }, []);

  /* console loop */
  useEffect(() => {
    const timers = [];
    function cycle() {
      setConLines([]);
      setConKey(k => k + 1);
      CONSOLE_STEPS.forEach((s, i) => {
        const t = setTimeout(() => setConLines(p => [...p, s]), STEP_DELAYS[i]);
        timers.push(t);
      });
    }
    const t0 = setTimeout(cycle, 1000);
    const iv = setInterval(cycle, CYCLE_MS);
    return () => { clearTimeout(t0); clearInterval(iv); timers.forEach(clearTimeout); };
  }, []);

  const lineCount = typedLines.length + (prefixDone ? 1 + SUFFIX_LINES.length : 0);

  return (
    <div className="lce-outer">
      <div className="lce-editor">

        {/* ── TITLE BAR ── */}
        <div className="lce-titlebar">
          <div className="lce-dots">
            <span className="lce-dot lce-dot-r" />
            <span className="lce-dot lce-dot-y" />
            <span className="lce-dot lce-dot-g" />
          </div>

          <div className="lce-tabs">
            <div className="lce-tab lce-tab-on">
              <span className="lce-ticon">☕</span>
              <span>Main.java</span>
              <span className="lce-tab-dot" />
            </div>
            <div className="lce-tab">
              <span className="lce-ticon lce-ticon-dim">📄</span>
              <span className="lce-tab-label">Nexly.java</span>
            </div>
          </div>

          <div className="lce-tools">
            <span className="lce-badge">Java 21</span>
            <button className="lce-run">▶&nbsp;Run</button>
            <span className="lce-icon" title="Git">⎇</span>
            <span className="lce-icon" title="Settings">⚙</span>
          </div>
        </div>

        {/* ── CODE BODY ── */}
        <div className="lce-body" ref={bodyRef}>
          <div className="lce-code">
            {typedLines.map((ln, i) => (
              <HLine key={i} text={ln} ln={i + 1} />
            ))}

            {prefixDone && (
              <>
                <div className="lce-line lce-line-active">
                  <span className="lce-ln">{typedLines.length + 1}</span>
                  <span className="lce-lc">
                    {tokenise(DYNAMIC_PREFIX).map((tk, i) => (
                      <span key={i} className={`lce-t lce-t-${tk.t}`}>{tk.v}</span>
                    ))}
                    <span className="lce-t lce-t-string">{dynText}</span>
                    <span className="lce-cursor" />
                    {dynText.length > 0 && (
                      <span className="lce-t lce-t-string">");</span>
                    )}
                  </span>
                </div>
                {SUFFIX_LINES.map((sln, idx) => (
                  <HLine key={idx} text={sln} ln={typedLines.length + 2 + idx} />
                ))}
              </>
            )}
          </div>
        </div>

        {/* ── TERMINAL ── */}
        <div className="lce-console">
          <div className="lce-con-bar">
            <div className="lce-con-tabs">
              <span className="lce-con-tab lce-con-tab-on">TERMINAL</span>
              <span className="lce-con-tab">PROBLEMS</span>
              <span className="lce-con-tab">OUTPUT</span>
            </div>
            <span className="lce-con-x">✕</span>
          </div>
          <div className="lce-con-body" key={conKey}>
            <span className="lce-con-prompt">~/nexly $&nbsp;</span>
            {conLines.map((cl, i) => (
              <div
                key={i}
                className={`lce-con-line${cl.accent ? ' lce-con-accent' : ''}`}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {cl.text}
              </div>
            ))}
          </div>
        </div>

        {/* ── STATUS BAR ── */}
        <div className="lce-status">
          <div className="lce-st-l">
            <span className="lce-branch">⎇&nbsp;main</span>
            <span className={`lce-build ${buildOk ? 'lce-build-ok' : 'lce-build-run'}`}>
              {buildOk
                ? <>✓&nbsp;Build Successful</>
                : <><span className="lce-spin" />&nbsp;Compiling...</>
              }
            </span>
          </div>
          <div className="lce-st-r">
            <span className="lce-st-item">Java 21</span>
            <span className="lce-st-item lce-st-sep">UTF-8</span>
            <span className="lce-st-item">Ln&nbsp;{lineCount}</span>
          </div>
        </div>

      </div>

      {/* ambient glow */}
      <div className="lce-blob" aria-hidden="true" />
    </div>
  );
}
