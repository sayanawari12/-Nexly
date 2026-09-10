import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Copy, Check, Info, AlertTriangle, Lightbulb, HelpCircle, FileText, Terminal, Target, ArrowRight, Sparkles, CheckCircle2, XCircle } from 'lucide-react';
import { getRecommendedProblemsForTopic } from '../../services/recommendationEngine';

const LessonContent = ({ lesson }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [runOutput, setRunOutput] = useState(null);

  // Micro-check state
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

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
    summary,
    tags,
    title,
    microCheck
  } = lesson;

  // Derive topic tags for Recommendation Engine
  const topicTags = useMemo(() => {
    if (tags && Array.isArray(tags)) return tags;
    const derived = ['programming'];
    const titleLower = (title || '').toLowerCase();
    if (titleLower.includes('loop') || titleLower.includes('for') || titleLower.includes('while')) derived.push('loops');
    if (titleLower.includes('array') || titleLower.includes('list')) derived.push('arrays');
    if (titleLower.includes('sql') || titleLower.includes('select')) derived.push('sql');
    if (titleLower.includes('python')) derived.push('python');
    if (titleLower.includes('javascript') || titleLower.includes('js')) derived.push('javascript');
    return derived;
  }, [tags, title]);

  // Fetch 3 auto-recommended practice problems from recommendationEngine service
  const recommendedProblems = useMemo(() => {
    return getRecommendedProblemsForTopic(topicTags);
  }, [topicTags]);

  // Default fallback micro-check if not defined on lesson object
  const activeMicroCheck = microCheck || {
    question: "What is the key takeaway from this concept?",
    options: [
      "Syntax rules must be memorized without practicing",
      "Hands-on execution and problem-solving reinforce long-term mastery",
      "Only advanced algorithms matter for beginners",
      "Writing tests is optional for production code"
    ],
    correctIndex: 1,
    explanation: "Executing real code and solving concept-matched problems immediately after learning builds real engineering skills."
  };

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
    }, 1200);
  };

  const handleOptionSelect = (idx) => {
    setSelectedOption(idx);
    setShowExplanation(true);
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
              <span className="file-name">example_runner</span>
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

      {/* 3. Inline Micro-Check (Check Yourself) */}
      <section className="content-section micro-check-section" style={{
        background: '#0B0B0B',
        border: '1px solid rgba(139, 92, 246, 0.25)',
        borderRadius: '16px',
        padding: '24px',
        margin: '32px 0'
      }}>
        <h3 className="section-title" style={{ color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
          <Sparkles size={18} style={{ color: '#a855f7' }} />
          Concept Micro-Check
        </h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', marginBottom: '16px' }}>
          {activeMicroCheck.question}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {activeMicroCheck.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === activeMicroCheck.correctIndex;
            let btnStyle = {
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '12px 16px',
              textAlign: 'left',
              color: '#ffffff',
              fontSize: '0.9rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s ease'
            };

            if (showExplanation) {
              if (isCorrect) {
                btnStyle.background = 'rgba(34, 197, 94, 0.12)';
                btnStyle.borderColor = 'rgba(34, 197, 94, 0.4)';
                btnStyle.color = '#4ade80';
              } else if (isSelected && !isCorrect) {
                btnStyle.background = 'rgba(239, 68, 68, 0.12)';
                btnStyle.borderColor = 'rgba(239, 68, 68, 0.4)';
                btnStyle.color = '#f87171';
              }
            }

            return (
              <button key={idx} style={btnStyle} onClick={() => handleOptionSelect(idx)}>
                <span>{opt}</span>
                {showExplanation && isCorrect && <CheckCircle2 size={16} />}
                {showExplanation && isSelected && !isCorrect && <XCircle size={16} />}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: 'rgba(168, 85, 247, 0.08)',
            borderLeft: '3px solid #a855f7',
            borderRadius: '6px',
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '0.88rem',
            lineHeight: '1.5'
          }}>
            <strong>Explanation:</strong> {activeMicroCheck.explanation}
          </div>
        )}
      </section>

      {/* 4. AUTO-RECOMMENDED PRACTICE PROBLEMS (Core Differentiator Widget) */}
      <section className="content-section recommended-practice-section" style={{
        background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.05) 0%, rgba(0, 0, 0, 0.4) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        margin: '32px 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="premium-badge" style={{ fontSize: '0.72rem', padding: '4px 10px' }}>
              ✦ NEXLY RECOMMENDED PRACTICE
            </span>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginTop: '6px', margin: 0 }}>
              Apply What You Just Learned
            </h3>
          </div>
          <button 
            onClick={() => navigate('/practice')} 
            className="btn-premium flex-center"
            style={{ fontSize: '0.82rem', padding: '8px 16px', borderRadius: '8px' }}
          >
            All Practice Arena <ArrowRight size={14} style={{ marginLeft: '6px' }} />
          </button>
        </div>

        <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Recommended problems auto-matched to this topic by NEXLY Recommendation Engine:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {[recommendedProblems.easy, recommendedProblems.medium, recommendedProblems.hard].map((prob, idx) => {
            if (!prob) return null;
            const diffColor = prob.difficulty === 'Easy' ? '#22c55e' : prob.difficulty === 'Medium' ? '#eab308' : '#ef4444';
            return (
              <div key={idx} style={{
                background: '#0B0B0B',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: diffColor, background: `${diffColor}15`, padding: '2px 8px', borderRadius: '4px' }}>
                      {prob.difficulty}
                    </span>
                    <Target size={14} style={{ color: 'rgba(255, 255, 255, 0.4)' }} />
                  </div>
                  <h4 style={{ color: '#ffffff', fontSize: '1.05rem', margin: '0 0 8px 0' }}>{prob.title}</h4>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.85rem', margin: '0 0 16px 0', lineHeight: '1.4' }}>
                    {prob.statement}
                  </p>
                </div>
                <button 
                  onClick={() => navigate('/practice')} 
                  style={{
                    background: 'rgba(168, 85, 247, 0.1)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                    color: '#c084fc',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    fontSize: '0.82rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    width: '100%'
                  }}
                >
                  Practice Problem <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Callouts & Key Points */}
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

      {/* 6. Summary Section */}
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

