import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen, Code2, Terminal, Info, Star, AlertTriangle, Zap, CheckCircle,
  Play, Copy, Check, ChevronDown, ChevronUp, Target, Search, ChevronRight, ChevronLeft
} from 'lucide-react';
import { getRecommendedProblemsForTopic } from '../../services/recommendationEngine';
import ProblemCard from './ProblemCard';

const LessonsTab = ({ lessons, programs, techName = 'Technology' }) => {
  const [activeLessonId, setActiveLessonId] = useState(lessons?.[0]?.id || 1);
  const [activeTabSub, setActiveTabSub] = useState('theory');
  const [searchQuery, setSearchQuery] = useState('');
  const [browseAllOpen, setBrowseAllOpen] = useState(false);
  const [refOpen, setRefOpen] = useState(false);

  const activeLesson = lessons.find(l => l.id === activeLessonId) || lessons[0];
  const activeIdx = lessons.findIndex(l => l.id === activeLessonId);

  const prevLesson = activeIdx > 0 ? lessons[activeIdx - 1] : null;
  const nextLesson = activeIdx < lessons.length - 1 ? lessons[activeIdx + 1] : null;

  // Playground state
  const [playgroundCode, setPlaygroundCode] = useState(activeLesson?.code || '');
  const [playgroundOutput, setPlaygroundOutput] = useState(activeLesson?.output || '');

  useEffect(() => {
    if (activeLesson) {
      setPlaygroundCode(activeLesson.code || '');
      setPlaygroundOutput(activeLesson.output || '');
    }
  }, [activeLessonId]);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);

  const filteredLessons = lessons.filter(l =>
    l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    l.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyCode = () => {
    if (activeLesson?.code) {
      navigator.clipboard.writeText(activeLesson.code);
    }
  };

  const handleResetPlayground = () => {
    if (activeLesson) {
      setPlaygroundCode(activeLesson.code || '');
      setPlaygroundOutput(activeLesson.output || '');
    }
  };

  const handleRunPlayground = () => {
    setPlaygroundOutput('Compiling & Executing...\n\n' + (activeLesson?.output || 'Program executed successfully (Exit Code 0).'));
  };

  // Mock quiz questions for lesson
  const quizQuestions = [
    {
      q: `What is the primary concept covered in ${activeLesson?.title}?`,
      options: [activeLesson?.summary || 'Core concept', 'Unrelated feature', 'Syntax error handling', 'Memory allocation cap'],
      correct: 0,
      exp: activeLesson?.note || 'Refer to lesson theory notes.'
    },
    {
      q: 'Which of the following best describes best practice for this topic?',
      options: ['Ignore compiler warnings', activeLesson?.tip || 'Follow standard conventions', 'Hardcode magic numbers', 'Skip bounds checking'],
      correct: 1,
      exp: activeLesson?.tip || 'Always follow recommended best practices.'
    }
  ];

  const handleQuizAnswer = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correct) correctCount++;
    });
    setQuizScore(Math.round((correctCount / quizQuestions.length) * 100));
    setQuizSubmitted(true);
  };

  return (
    <div className="py-tab-content" style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {/* Sidebar Lesson Navigator */}
      <div className="c-lesson-sidebar" style={{ width: '280px', flexShrink: 0 }}>
        <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 10px 8px 30px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '6px',
                color: '#fff',
                fontSize: '0.78rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ maxHeight: '650px', overflowY: 'auto', padding: '8px' }}>
          {filteredLessons.map((l) => (
            <div
              key={l.id}
              onClick={() => { setActiveLessonId(l.id); setActiveTabSub('theory'); }}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                marginBottom: '4px',
                cursor: 'pointer',
                background: l.id === activeLessonId ? 'rgba(168,85,247,0.12)' : 'transparent',
                border: l.id === activeLessonId ? '1px solid rgba(168,85,247,0.3)' : '1px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: l.id === activeLessonId ? '700' : '500', color: l.id === activeLessonId ? '#fff' : 'var(--text-secondary)' }}>
                {l.id}. {l.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', marginTop: '2px', display: 'flex', gap: '8px' }}>
                <span>{l.time}</span>
                <span>•</span>
                <span style={{ textTransform: 'capitalize' }}>{l.diff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Lesson Content Area */}
      <div className="c-lesson-content" style={{ flex: 1, minWidth: 0 }}>
        {/* Lesson Sub-Nav Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTabSub('theory')}
            className={`search-empty-btn ${activeTabSub === 'theory' ? 'active' : ''}`}
            style={activeTabSub === 'theory' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
          >
            📚 Theory & Examples
          </button>
          <button
            onClick={() => setActiveTabSub('playground')}
            className={`search-empty-btn ${activeTabSub === 'playground' ? 'active' : ''}`}
            style={activeTabSub === 'playground' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
          >
            💻 Code Playground
          </button>
          <button
            onClick={() => setActiveTabSub('quiz')}
            className={`search-empty-btn ${activeTabSub === 'quiz' ? 'active' : ''}`}
            style={activeTabSub === 'quiz' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
          >
            📝 Lesson Quiz
          </button>
          <button
            onClick={() => setActiveTabSub('practice')}
            className={`search-empty-btn ${activeTabSub === 'practice' ? 'active' : ''}`}
            style={activeTabSub === 'practice' ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
          >
            🎯 Practice Problems
          </button>
        </div>

        {/* Tab 1: Theory */}
        {activeTabSub === 'theory' && activeLesson && (
          <div style={{ textAlign: 'left' }}>
            <div className="c-subsection-title"><BookOpen size={14} /> Theory</div>
            <div className="c-theory-text">
              {activeLesson.theory?.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="c-subsection-title" style={{ marginTop: '20px' }}><Code2 size={14} /> Code Example</div>
            <div style={{ background: '#09090d', padding: '16px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'Space Mono, monospace', fontSize: '0.84rem', color: '#818cf8', whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
              {activeLesson.code}
            </div>

            {activeLesson.output && (
              <>
                <div className="c-subsection-title"><Terminal size={14} /> Output</div>
                <pre style={{ background: '#030303', padding: '12px 16px', borderRadius: '8px', color: '#10b981', fontFamily: 'Space Mono, monospace', fontSize: '0.8rem', whiteSpace: 'pre-wrap', marginBottom: '16px' }}>
                  {activeLesson.output}
                </pre>
              </>
            )}

            {activeLesson.note && (
              <div className="c-note-box" style={{ marginTop: '16px' }}>
                <strong>📘 Note: </strong>{activeLesson.note}
              </div>
            )}

            {activeLesson.warning && (
              <div className="c-warning-box" style={{ marginTop: '12px' }}>
                <strong>⚠️ Warning: </strong>{activeLesson.warning}
              </div>
            )}

            {activeLesson.tip && (
              <div className="c-tip-box" style={{ marginTop: '12px' }}>
                <strong>✅ Best Practice: </strong>{activeLesson.tip}
              </div>
            )}

            {activeLesson.interviewTip && (
              <div className="c-interview-tip" style={{ marginTop: '16px' }}>
                <div className="c-interview-tip-label"><Zap size={13} /> Interview Tip</div>
                <p>{activeLesson.interviewTip}</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Playground */}
        {activeTabSub === 'playground' && (
          <div style={{ textAlign: 'left' }}>
            <div className="c-subsection-title"><Terminal size={14} /> Live Code Playground</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '16px' }}>
              Edit the example code below and compile it in the browser sandbox.
            </p>

            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', background: '#09090d', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>main</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={handleCopyCode} className="search-recent-clear-btn" style={{ fontSize: '0.72rem' }}>Copy</button>
                  <button onClick={handleResetPlayground} className="search-recent-clear-btn" style={{ fontSize: '0.72rem' }}>Reset</button>
                </div>
              </div>
              <textarea
                value={playgroundCode}
                onChange={(e) => setPlaygroundCode(e.target.value)}
                style={{ width: '100%', minHeight: '240px', background: 'none', border: 'none', outline: 'none', color: '#818cf8', fontFamily: 'Space Mono, monospace', fontSize: '0.84rem', padding: '16px', resize: 'vertical', lineHeight: '1.5' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <button
                onClick={handleRunPlayground}
                className="btn-premium-purple"
                style={{ padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Play size={14} /> Run Code
              </button>
            </div>

            <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', background: '#030303', overflow: 'hidden' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 16px', fontSize: '0.74rem', color: 'rgba(255,255,255,0.4)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                Execution Output Terminal
              </div>
              <pre style={{ margin: 0, padding: '16px', color: '#10b981', background: '#050505', fontSize: '0.82rem', fontFamily: 'Space Mono, monospace', minHeight: '100px', whiteSpace: 'pre-wrap' }}>
                {playgroundOutput}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Quiz */}
        {activeTabSub === 'quiz' && (
          <div style={{ textAlign: 'left' }}>
            <div className="c-subsection-title"><CheckCircle size={14} /> Lesson Quiz Evaluation</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
              Complete these conceptual MCQs to verify your comprehension of the lesson topics.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: '20px', borderRadius: '14px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '12px' }}>
                    Question {qIdx + 1}: {q.q}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrectOpt = q.correct === optIdx;
                      let btnStyle = { background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' };

                      if (isSelected) {
                        btnStyle = { background: 'rgba(168,85,247,0.1)', borderColor: 'var(--primary-purple)', color: '#fff' };
                      }
                      if (quizSubmitted) {
                        if (isCorrectOpt) {
                          btnStyle = { background: 'rgba(16,185,129,0.15)', borderColor: '#10B981', color: '#10B981' };
                        } else if (isSelected && !isCorrectOpt) {
                          btnStyle = { background: 'rgba(239,68,68,0.15)', borderColor: '#EF4444', color: '#EF4444' };
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizAnswer(qIdx, optIdx)}
                          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid', textAlign: 'left', fontSize: '0.82rem', cursor: quizSubmitted ? 'default' : 'pointer', transition: 'all 0.2s', ...btnStyle }}
                          disabled={quizSubmitted}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div style={{ marginTop: '12px', background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--primary-purple)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                      <strong>Explanation:</strong> {q.exp}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '24px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              {!quizSubmitted ? (
                <button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="btn-premium-purple"
                  style={{ padding: '10px 24px', borderRadius: '8px', cursor: 'pointer', opacity: Object.keys(quizAnswers).length < quizQuestions.length ? 0.5 : 1 }}
                >
                  Submit Answers
                </button>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--accent-glow)' }}>
                    Your Score: {quizScore}%
                  </span>
                  <button
                    onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizScore(0); }}
                    className="search-empty-btn"
                  >
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Practice Problems — PRESERVED LOGIC */}
        {activeTabSub === 'practice' && (
          <div style={{ textAlign: 'left' }}>
            <div className="c-subsection-title"><Target size={14} /> Practice Problems</div>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
              3 problems auto-matched to <strong style={{ color: 'rgba(255,255,255,0.75)' }}>{activeLesson?.title}</strong> by NEXLY Recommendation Engine.
            </p>

            {/* Derive recommendations — hasMatchingProblems driven strictly by recs.easy || recs.medium || recs.hard */}
            {(() => {
              const recs = getRecommendedProblemsForTopic(activeLesson?.tags || []);
              const hasMatchingProblems = !!(recs.easy || recs.medium || recs.hard);

              return hasMatchingProblems ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[recs.easy, recs.medium, recs.hard].filter(Boolean).map((prob, idx) => (
                    <ProblemCard key={idx} problem={prob} />
                  ))}
                </div>
              ) : (
                <div style={{ padding: '36px 24px', textAlign: 'center', border: '1px dashed rgba(255,255,255,0.08)', borderRadius: '12px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🚧</div>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.85rem', margin: 0 }}>
                    Practice problems coming soon for this topic.
                  </p>
                </div>
              );
            })()}

            {/* Browse All Programs — collapsed accordion by default */}
            <div style={{ marginTop: '28px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
              <button
                onClick={() => setBrowseAllOpen(o => !o)}
                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
              >
                {browseAllOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                Browse All {techName} Programs ({programs ? Object.values(programs).flat().length : 0})
              </button>
              {browseAllOpen && (
                <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.015)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)' }}>
                  {programs ? (
                    Object.entries(programs).map(([cat, list]) => (
                      <div key={cat} style={{ marginBottom: '16px' }}>
                        <h4 style={{ fontSize: '0.84rem', color: 'var(--accent-glow)', marginBottom: '8px' }}>{cat} ({list.length})</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
                          {list.slice(0, 4).map((p, pIdx) => (
                            <div key={pIdx} style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)' }}>
                              {p.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>No catalog items available.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Quick Reference Collapsible */}
        {activeTabSub === 'theory' && (activeLesson?.note || activeLesson?.tip || activeLesson?.summary) && (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '28px', paddingTop: '16px' }}>
            <button
              onClick={() => setRefOpen(o => !o)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', padding: 0, transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
            >
              {refOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              📌 Quick Reference
            </button>
            {refOpen && (
              <div style={{ marginTop: '12px', padding: '16px', background: 'rgba(255,255,255,0.02)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.04)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', lineHeight: '1.8' }}>
                {activeLesson.note && <p style={{ margin: '0 0 8px 0' }}><strong style={{ color: 'rgba(255,255,255,0.7)' }}>📝 Note:</strong> {activeLesson.note}</p>}
                {activeLesson.tip && <p style={{ margin: '0 0 8px 0' }}><strong style={{ color: 'rgba(255,255,255,0.7)' }}>💡 Tip:</strong> {activeLesson.tip}</p>}
                {activeLesson.summary && <p style={{ margin: 0 }}><strong style={{ color: 'rgba(255,255,255,0.7)' }}>📖 Summary:</strong> {activeLesson.summary}</p>}
              </div>
            )}
          </div>
        )}

        {/* Navigation Next / Prev */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
          {prevLesson ? (
            <button
              onClick={() => { setActiveLessonId(prevLesson.id); setActiveTabSub('theory'); }}
              className="search-empty-btn"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ChevronLeft size={14} /> {prevLesson.id}. {prevLesson.title}
            </button>
          ) : <div />}

          {nextLesson && (
            <button
              onClick={() => { setActiveLessonId(nextLesson.id); setActiveTabSub('theory'); }}
              className="btn-premium-purple"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
            >
              {nextLesson.id}. {nextLesson.title} <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonsTab;
