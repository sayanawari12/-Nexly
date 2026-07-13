import React, { useState } from 'react';
import { Play, Copy, Check, Info, AlertTriangle, Lightbulb, HelpCircle, FileText, Terminal } from 'lucide-react';

const LessonContent = ({ lesson }) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState(null);

  if (!lesson) return null;

  const {
    content,
    code,
    output,
    note,
    warning,
    tip,
    interviewTip,
    mistakes,
    summary
  } = lesson;

  const handleCopy = () => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setRunOutput('Compiling and executing...');
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput(output || 'Executed successfully with exit code 0.');
    }, 1500);
  };

  return (
    <div className="lesson-viewer-content-body">
      {/* 1. Core Lesson Text */}
      <section className="content-section theory-section">
        <p className="theory-paragraph">{content || 'No lesson content available.'}</p>
      </section>

      {/* 2. Interactive Code Example */}
      {code && (
        <section className="content-section code-playground-section">
          <h3 className="section-title">
            <Terminal size={18} className="title-icon" />
            Interactive Code Example
          </h3>
          <div className="editor-console-wrapper">
            <div className="editor-header">
              <span className="file-name">main.c</span>
              <div className="editor-actions">
                <button className="editor-btn copy-btn" onClick={handleCopy} title="Copy Code">
                  {copied ? <Check size={14} className="success-icon" /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="editor-btn run-btn" onClick={handleRun} disabled={isRunning}>
                  <Play size={14} />
                  {isRunning ? 'Running...' : 'Run Code'}
                </button>
              </div>
            </div>
            <pre className="editor-pre">
              <code>{code}</code>
            </pre>

            {/* Run Output Window */}
            {runOutput && (
              <div className="terminal-output-panel">
                <div className="terminal-header">Terminal Output</div>
                <pre className="terminal-body">{runOutput}</pre>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3. Callout keypoints */}
      {(note || warning || tip || interviewTip) && (
        <section className="content-section callouts-section">
          <h3 className="section-title">Key Points & Guides</h3>
          <div className="callouts-grid">
            {note && (
              <div className="callout-card callout-note">
                <div className="callout-icon-title">
                  <Info size={16} />
                  <span>Developer Note</span>
                </div>
                <p className="callout-text">{note}</p>
              </div>
            )}

            {warning && (
              <div className="callout-card callout-warning">
                <div className="callout-icon-title">
                  <AlertTriangle size={16} />
                  <span>Important Caution</span>
                </div>
                <p className="callout-text">{warning}</p>
              </div>
            )}

            {tip && (
              <div className="callout-card callout-tip">
                <div className="callout-icon-title">
                  <Lightbulb size={16} />
                  <span>Pro Tip</span>
                </div>
                <p className="callout-text">{tip}</p>
              </div>
            )}

            {interviewTip && (
              <div className="callout-card callout-interview">
                <div className="callout-icon-title">
                  <HelpCircle size={16} />
                  <span>Interview Insight</span>
                </div>
                <p className="callout-text">{interviewTip}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Common Mistakes */}
      {mistakes && mistakes.length > 0 && (
        <section className="content-section mistakes-section">
          <h3 className="section-title">Common Pitfalls to Avoid</h3>
          <ul className="mistakes-list">
            {mistakes.map((mistake, idx) => (
              <li key={idx} className="mistake-item">
                <span className="mistake-bullet">✕</span>
                <span className="mistake-text">{mistake}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5. Summary Section */}
      {summary && (
        <section className="content-section summary-section">
          <div className="summary-card">
            <h3 className="summary-title">
              <FileText size={18} style={{ marginRight: '8px' }} />
              Section Summary
            </h3>
            <p className="summary-text">{summary}</p>
          </div>
        </section>
      )}
    </div>
  );
};

export default LessonContent;
