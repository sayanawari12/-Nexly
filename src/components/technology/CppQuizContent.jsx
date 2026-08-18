import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock, Play, RotateCcw, ChevronRight, ArrowRight, Code2 } from 'lucide-react';
import { CPP_QUIZ_DATA } from '../../data/cppQuizData';

// Syntax highlighting helper for C++ code blocks
const highlightCode = (codeText) => {
  if (!codeText) return '';
  const escaped = codeText
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const tokenRegex = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(".*?")|('.*?')|(#\w+\s*&lt;.*&gt;|#\w+)|(\b(?:int|double|float|char|bool|void|class|struct|if|else|cout|cin|return|for|while|do|using|namespace|std)\b)|(\b\d+\b)/g;

  return escaped.replace(tokenRegex, (match, p1, p2, p3, p4, p5, p6, p7) => {
    if (p1 || p2) return `<span style="color: #6b7280; font-style: italic;">${match}</span>`;
    if (p3 || p4) return `<span style="color: #a78bfa;">${match}</span>`;
    if (p5) return `<span style="color: #f472b6; font-weight: 600;">${match}</span>`;
    if (p6) return `<span style="color: #38bdf8; font-weight: 600;">${match}</span>`;
    if (p7) return `<span style="color: #fbbf24;">${match}</span>`;
    return match;
  });
};

const CppQuizContent = ({ onComplete }) => {
  const [level, setLevel] = useState('beginner');
  const [quizStarted, setQuizStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);

  const questions = CPP_QUIZ_DATA[level] || CPP_QUIZ_DATA.beginner;

  useEffect(() => {
    if (quizStarted && !revealed && !finished) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleReveal();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [quizStarted, current, revealed, finished, selected]); // eslint-disable-line

  const handleSelect = (idx) => {
    if (!revealed) {
      setSelected(idx);
    }
  };

  const handleReveal = () => {
    clearInterval(timerRef.current);
    setRevealed(true);
    const correct = selected === questions[current].answer;
    if (correct) {
      setScore((s) => s + 1);
    }
    setAnswers((prev) => [
      ...prev,
      {
        q: questions[current].q,
        code: questions[current].code,
        selected,
        correct,
        answer: questions[current].answer,
        explanation: questions[current].explanation
      }
    ]);
  };

  const handleNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
      if (onComplete) onComplete(score, questions.length);
      return;
    }
    setCurrent((c) => c + 1);
    setSelected(null);
    setRevealed(false);
    setTimeLeft(30);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimeLeft(30);
    clearInterval(timerRef.current);
  };

  const startLevelQuiz = (lvl) => {
    setLevel(lvl);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimeLeft(30);
    setQuizStarted(true);
    clearInterval(timerRef.current);
  };

  const pct = Math.round((score / questions.length) * 100);
  const optionLetters = ['A', 'B', 'C', 'D'];

  const levelsList = [
    { key: 'beginner', label: 'Beginner', icon: '🟢', count: CPP_QUIZ_DATA.beginner.length },
    { key: 'intermediate', label: 'Intermediate', icon: '🟡', count: CPP_QUIZ_DATA.intermediate.length },
    { key: 'advanced', label: 'Advanced', icon: '🔴', count: CPP_QUIZ_DATA.advanced.length }
  ];

  if (!quizStarted) {
    return (
      <div className="c-tab-content">
        <div className="c-quiz-level-selector">
          {levelsList.map((l) => (
            <div
              key={l.key}
              className={`c-quiz-level-btn ${level === l.key ? 'active' : ''}`}
              onClick={() => setLevel(l.key)}
            >
              <div className="c-quiz-level-icon">{l.icon}</div>
              <div className="c-quiz-level-name">{l.label}</div>
              <div className="c-quiz-level-count">{l.count} Questions</div>
            </div>
          ))}
        </div>

        <div className="c-quiz-container">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🧠</div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.4rem', marginBottom: '8px' }}>
              C++ {level.charAt(0).toUpperCase() + level.slice(1)} Quiz
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              {questions.length} questions · 30 seconds per question · Instant explanations
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                marginBottom: '28px',
                flexWrap: 'wrap'
              }}
            >
              {[
                ['Questions', questions.length],
                ['Time/Q', '30s'],
                ['Explanation', 'Yes'],
                ['Scoring', '+1 correct']
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    textAlign: 'center',
                    padding: '12px 20px',
                    background: 'rgba(255,255,255,0.04)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-primary)'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--accent-glow)' }}>
                    {v}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{k}</div>
                </div>
              ))}
            </div>
            <button
              className="c-btn-primary"
              onClick={() => setQuizStarted(true)}
              style={{ padding: '13px 36px', fontSize: '1rem', margin: '0 auto' }}
            >
              <Play size={18} /> Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="c-tab-content">
        <div className="c-quiz-container">
          <div className="c-quiz-score-screen">
            <div className="c-score-circle" style={{ '--score-pct': `${pct * 3.6}deg` }}>
              <div className="c-score-inner">
                <span className="c-score-pct">{pct}%</span>
                <span className="c-score-label">Score</span>
              </div>
            </div>
            <h2 className="c-score-title">
              {pct >= 80 ? '🎉 Excellent!' : pct >= 60 ? '👍 Good Job!' : '📚 Keep Practicing!'}
            </h2>
            <p className="c-score-subtitle">
              {pct >= 80
                ? 'Outstanding understanding of C++ concepts!'
                : pct >= 60
                ? 'Good work! Review the explanations for missed questions.'
                : 'Review the lessons and try again!'}
            </p>
            <div className="c-score-breakdown">
              <div className="c-score-stat">
                <strong style={{ color: '#4ade80' }}>{score}</strong>
                <span>Correct</span>
              </div>
              <div className="c-score-stat">
                <strong style={{ color: '#f87171' }}>{questions.length - score}</strong>
                <span>Wrong</span>
              </div>
              <div className="c-score-stat">
                <strong>{questions.length}</strong>
                <span>Total</span>
              </div>
            </div>

            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              {answers.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: a.correct ? 'rgba(34,197,94,0.07)' : 'rgba(239,68,68,0.07)',
                    border: `1px solid ${a.correct ? 'rgba(34,197,94,0.2)' : 'rgba(239,68,68,0.2)'}`,
                    marginBottom: '10px'
                  }}
                >
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <span style={{ flexShrink: 0, marginTop: '1px' }}>{a.correct ? '✅' : '❌'}</span>
                    <span style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: '500' }}>
                      Q{i + 1}: {a.q}
                    </span>
                  </div>

                  {a.code && (
                    <div
                      style={{
                        background: '#09070f',
                        border: '1px solid rgba(139, 92, 246, 0.15)',
                        borderRadius: '8px',
                        padding: '10px 14px',
                        margin: '4px 0 6px 26px',
                        overflowX: 'auto',
                        fontSize: '0.8rem',
                        fontFamily: '"JetBrains Mono", Consolas, monospace'
                      }}
                    >
                      <pre style={{ margin: 0 }}>
                        <code dangerouslySetInnerHTML={{ __html: highlightCode(a.code) }} />
                      </pre>
                    </div>
                  )}

                  {a.explanation && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '26px' }}>
                      <strong style={{ color: 'var(--accent-glow)' }}>Explanation:</strong> {a.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="c-btn-primary" onClick={resetQuiz}>
                <RotateCcw size={15} /> Retry Quiz
              </button>
              <button
                className="c-btn-secondary"
                onClick={() => {
                  const nextLevel = level === 'beginner' ? 'intermediate' : level === 'intermediate' ? 'advanced' : 'beginner';
                  startLevelQuiz(nextLevel);
                }}
              >
                <ArrowRight size={15} /> Next Level ({level === 'beginner' ? 'Intermediate' : level === 'intermediate' ? 'Advanced' : 'Beginner'})
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="c-tab-content">
      <div className="c-quiz-container">
        <div className="c-quiz-top-bar">
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
            {current + 1} / {questions.length}
          </span>
          <div className="c-quiz-progress-track">
            <div
              className="c-quiz-progress-fill"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className={`c-quiz-timer ${timeLeft <= 10 ? 'warning' : ''}`}>
            <Clock size={13} />
            {timeLeft}s
          </div>
        </div>

        <div className="c-quiz-body">
          <div className="c-quiz-q-num">
            Question {current + 1} of {questions.length} • {level.toUpperCase()}
          </div>
          <div className="c-quiz-question">{q.q}</div>

          {/* Code Snippet for Guess the Output questions */}
          {q.code && (
            <div
              style={{
                background: '#09070f',
                border: '1px solid rgba(139, 92, 246, 0.22)',
                borderRadius: '10px',
                padding: '14px 18px',
                margin: '0 0 24px',
                overflowX: 'auto',
                fontSize: '0.88rem',
                fontFamily: '"JetBrains Mono", Consolas, "Fira Code", monospace',
                lineHeight: '1.5',
                boxShadow: '0 4px 16px rgba(0,0,0,0.4)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  color: 'var(--accent-glow)',
                  fontWeight: '600',
                  marginBottom: '10px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                  paddingBottom: '6px'
                }}
              >
                <Code2 size={13} /> C++ Code Snippet
              </div>
              <pre style={{ margin: 0 }}>
                <code dangerouslySetInnerHTML={{ __html: highlightCode(q.code) }} />
              </pre>
            </div>
          )}

          <div className="c-quiz-options">
            {q.options.map((opt, idx) => {
              let cls = '';
              if (revealed) {
                if (idx === q.answer) cls = 'correct';
                else if (idx === selected) cls = 'incorrect';
              } else if (idx === selected) {
                cls = 'selected';
              }
              return (
                <button
                  key={idx}
                  className={`c-quiz-option ${cls}`}
                  onClick={() => handleSelect(idx)}
                  disabled={revealed}
                >
                  <span className="c-quiz-option-letter">{optionLetters[idx]}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="c-quiz-explanation"
            >
              <strong>Explanation: </strong>
              {q.explanation}
            </motion.div>
          )}

          <div className="c-quiz-footer">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Score: <strong style={{ color: 'var(--accent-glow)' }}>{score}</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {!revealed && (
                <button
                  className="c-btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                  onClick={handleReveal}
                  disabled={selected === null}
                >
                  Submit
                </button>
              )}
              {revealed && (
                <button
                  className="c-btn-primary"
                  style={{ fontSize: '0.85rem', padding: '9px 18px' }}
                  onClick={handleNext}
                >
                  {current + 1 >= questions.length ? 'See Results' : 'Next'} <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CppQuizContent;
