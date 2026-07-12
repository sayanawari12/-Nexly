import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, Award, CheckCircle2, XCircle, RotateCcw,
  ChevronLeft, ChevronRight, Sparkles, BarChart3, HelpCircle,
  BookOpen, Target, Zap, Trophy, TrendingUp, Database,
  ChevronRight as BreadArrow, Lightbulb, Shield, Star, Home
} from 'lucide-react';
import questionsData from './DSQuizQuestions.json';
import '../styles/DSQuiz.css';

/* ── Helpers ── */
const shuffleArray = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};

/* ── Difficulty config ── */
const DIFF_CONFIGS = {
  beginner: {
    label: 'Beginner',
    emoji: '🟢',
    color: '#10b981',
    gradientFrom: 'rgba(16,185,129,0.15)',
    gradientTo: 'rgba(16,185,129,0.03)',
    borderColor: 'rgba(16,185,129,0.35)',
    time: 20,
    desc: 'Fundamental concepts — arrays, stacks, queues, and basic searching/sorting.',
    topics: ['Arrays & Sorting', 'Stacks & Queues', 'Searching Methods'],
  },
  intermediate: {
    label: 'Intermediate',
    emoji: '🟡',
    color: '#f59e0b',
    gradientFrom: 'rgba(245,158,11,0.15)',
    gradientTo: 'rgba(245,158,11,0.03)',
    borderColor: 'rgba(245,158,11,0.35)',
    time: 20,
    desc: 'Linked lists, trees, hashing, and algorithmic complexity analysis.',
    topics: ['Linked Lists', 'Binary Trees', 'Hashing'],
  },
  advanced: {
    label: 'Advanced',
    emoji: '🔴',
    color: '#ef4444',
    gradientFrom: 'rgba(239,68,68,0.15)',
    gradientTo: 'rgba(239,68,68,0.03)',
    borderColor: 'rgba(239,68,68,0.35)',
    time: 25,
    desc: 'Graphs, AVL trees, dynamic programming, and advanced problem solving.',
    topics: ['Graphs & BFS/DFS', 'AVL Trees', 'Dynamic Programming'],
  },
};

/* ── Quiz Tips ── */
const QUIZ_TIPS = [
  { icon: '⏱️', tip: 'Manage your time — don\'t spend too long on one question.' },
  { icon: '🔍', tip: 'Eliminate wrong answers first to narrow your choices.' },
  { icon: '📖', tip: 'Read each question carefully before selecting an option.' },
  { icon: '✅', tip: 'You can navigate between questions before submitting.' },
];

/* ── Achievements ── */
const ACHIEVEMENTS = [
  { icon: '🏆', label: 'Perfect Score', desc: '100% accuracy', threshold: 100 },
  { icon: '⭐', label: 'High Scorer', desc: '90%+ accuracy', threshold: 90 },
  { icon: '🎯', label: 'On Target', desc: '70%+ accuracy', threshold: 70 },
  { icon: '📈', label: 'Making Progress', desc: '50%+ accuracy', threshold: 50 },
];

/* ── Performance band ── */
const getPerformance = (pct) => {
  if (pct >= 90) return { level: 'excellent', title: '🏆 Excellent!', desc: 'Outstanding! You have mastered Data Structures concepts.' };
  if (pct >= 70) return { level: 'good',      title: '👏 Good Job!',  desc: 'Great work! You have solid knowledge of Data Structures.' };
  if (pct >= 40) return { level: 'average',   title: '📈 Average',    desc: 'Decent attempt. Review the explanations and retry.' };
  return             { level: 'poor',          title: '📘 Needs Improvement', desc: 'Keep studying. Re-read the syllabus and try again.' };
};

/* ════════════════════════════════
   Main Component
   ════════════════════════════════ */
const DSQuiz = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/curriculum/semester-2/data-structures');
    }
  };

  /* UI State */
  const [screen, setScreen]       = useState('setup');
  const [difficulty, setDifficulty] = useState('beginner');

  /* Quiz State */
  const [questions, setQuestions]             = useState([]);
  const [currentIdx, setCurrentIdx]           = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedIdxs, setSubmittedIdxs]     = useState([]);
  const [timeElapsed, setTimeElapsed]         = useState(0);
  const [timeRemaining, setTimeRemaining]     = useState(0);

  const timerRef = useRef(null);

  /* Timer */
  useEffect(() => {
    if (screen === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); handleFinishQuiz(); return 0; }
          return prev - 1;
        });
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [screen]); // eslint-disable-line

  /* Derived */
  const totalQ      = questions.length;
  const activeQ     = questions[currentIdx];
  const isSubmitted = submittedIdxs.includes(currentIdx);
  const conf        = DIFF_CONFIGS[difficulty];

  const correctCount = submittedIdxs.filter(idx => {
    const q = questions[idx];
    return q && selectedAnswers[idx] === q.correctAnswer;
  }).length;

  const wrongCount = submittedIdxs.filter(idx => {
    const q = questions[idx];
    return q && selectedAnswers[idx] !== q.correctAnswer;
  }).length;

  const skippedCount = totalQ - submittedIdxs.length;
  const accuracy     = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
  const performance  = getPerformance(accuracy);

  /* Dot state */
  const dotState = useCallback((idx) => {
    if (idx === currentIdx) return 'current';
    if (submittedIdxs.includes(idx)) {
      const q = questions[idx];
      if (!q) return 'answered-pending';
      return selectedAnswers[idx] === q.correctAnswer ? 'answered-correct' : 'answered-wrong';
    }
    if (selectedAnswers[idx] !== undefined) return 'answered-pending';
    return '';
  }, [currentIdx, submittedIdxs, questions, selectedAnswers]);

  /* Actions */
  const handleStart = (diff) => {
    const rawList = questionsData[diff] || [];
    if (!rawList.length) return;
    const finalList = diff === 'beginner'
      ? shuffleArray(rawList).map(q => ({ ...q, options: shuffleArray(q.options) }))
      : [...rawList];
    setQuestions(finalList);
    setDifficulty(diff);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setSubmittedIdxs([]);
    setTimeElapsed(0);
    setTimeRemaining(DIFF_CONFIGS[diff].time * 60);
    setScreen('playing');
  };

  const handleSelectOption   = (opt) => { if (isSubmitted) return; setSelectedAnswers(prev => ({ ...prev, [currentIdx]: opt })); };
  const handleSubmitQuestion = ()    => { if (selectedAnswers[currentIdx] === undefined || submittedIdxs.includes(currentIdx)) return; setSubmittedIdxs(prev => [...prev, currentIdx]); };
  const handleFinishQuiz     = ()    => { clearInterval(timerRef.current); setScreen('results'); };
  const handleRetry          = ()    => { setScreen('setup'); setQuestions([]); };
  const handleQuit           = ()    => { if (window.confirm('Quit quiz? Progress will be lost.')) { clearInterval(timerRef.current); setScreen('setup'); } };

  const questionsForDiff = (diff) => (questionsData[diff] || []).length;
  const hasQuestions     = questionsForDiff(difficulty) > 0;
  const earnedAchievement = ACHIEVEMENTS.find(a => accuracy >= a.threshold);

  /* ════════════════════════════
     RENDER
     ════════════════════════════ */
  return (
    <div className="ds-quiz-wrapper">
      {/* Animated BG orbs */}
      <div className="ds-bg-orb ds-bg-orb-1" />
      <div className="ds-bg-orb ds-bg-orb-2" />
      <div className="ds-bg-orb ds-bg-orb-3" />

      <div className="ds-quiz-container">

        {/* ═══ SETUP SCREEN ═══ */}
        {screen === 'setup' && (
          <motion.div key="setup" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>

            {/* Breadcrumb */}
            <nav className="ds-breadcrumb">
              <Link to="/" className="ds-bread-link"><Home size={13} /> Home</Link>
              <BreadArrow size={11} className="ds-bread-sep" />
              <Link to="/#roadmap" className="ds-bread-link">Curriculum</Link>
              <BreadArrow size={11} className="ds-bread-sep" />
              <Link to="/#roadmap" className="ds-bread-link">Semester 2</Link>
              <BreadArrow size={11} className="ds-bread-sep" />
              <Link to="/curriculum/semester-2/data-structures" className="ds-bread-link">Data Structures</Link>
              <BreadArrow size={11} className="ds-bread-sep" />
              <span className="ds-bread-active">Quiz</span>
            </nav>

            {/* Back Button */}
            <button className="ds-back-btn" onClick={handleBack}>
              <ArrowLeft size={16} /> Back
            </button>

            {/* ── Hero Header Card ── */}
            <header className="ds-hero-card">
              <div className="ds-hero-glow" />
              <div className="ds-hero-left">
                <div className="ds-hero-tag-row">
                  <span className="ds-tag ds-tag-green">Data Structures</span>
                  <span className="ds-tag ds-tag-purple">MCQ Quiz</span>
                  <span className="ds-tag ds-tag-amber">Semester 2</span>
                </div>
                <h1 className="ds-hero-title text-gradient-purple">📚 Data Structures Quiz</h1>
                <p className="ds-hero-subtitle">
                  Test your understanding with interactive multiple-choice questions across
                  Beginner, Intermediate, and Advanced levels. Instant feedback after every answer.
                </p>
                <div className="ds-hero-meta">
                  <span className="ds-meta-chip"><HelpCircle size={14} /> 3 Difficulty Levels</span>
                  <span className="ds-meta-chip"><Clock size={14} /> 20–25 Minutes</span>
                  <span className="ds-meta-chip"><BarChart3 size={14} /> Instant Feedback</span>
                  <span className="ds-meta-chip"><BookOpen size={14} /> Exam-Focused</span>
                </div>
              </div>
              <div className="ds-hero-stats-col">
                <div className="ds-hero-stat-box">
                  <span className="ds-hero-stat-num">20+</span>
                  <span className="ds-hero-stat-lbl">Questions</span>
                </div>
                <div className="ds-hero-stat-box">
                  <span className="ds-hero-stat-num">3</span>
                  <span className="ds-hero-stat-lbl">Levels</span>
                </div>
                <div className="ds-hero-stat-box">
                  <span className="ds-hero-stat-num">4</span>
                  <span className="ds-hero-stat-lbl">Options</span>
                </div>
              </div>
            </header>

            {/* ── Content Grid ── */}
            <div className="ds-setup-grid">

              {/* Left column */}
              <div className="ds-setup-left">

                {/* Difficulty Cards */}
                <p className="ds-section-label">Select Difficulty Level</p>
                <div className="ds-diff-cards">
                  {Object.entries(DIFF_CONFIGS).map(([key, cfg]) => {
                    const qCount = questionsForDiff(key);
                    const isActive = difficulty === key;
                    return (
                      <button
                        key={key}
                        className={`ds-diff-card ${isActive ? 'active' : ''}`}
                        onClick={() => setDifficulty(key)}
                        style={isActive ? {
                          background: `linear-gradient(135deg, ${cfg.gradientFrom}, ${cfg.gradientTo})`,
                          borderColor: cfg.borderColor,
                          boxShadow: `0 8px 30px ${cfg.gradientFrom}`
                        } : {}}
                      >
                        <div className="ds-diff-card-top">
                          <div className="ds-diff-emoji-wrap" style={isActive ? { background: `${cfg.gradientFrom}`, borderColor: cfg.borderColor } : {}}>
                            <span className="ds-diff-emoji">{cfg.emoji}</span>
                          </div>
                          <div className="ds-diff-card-info">
                            <h3 className="ds-diff-card-title" style={isActive ? { color: cfg.color } : {}}>{cfg.label}</h3>
                            <p className="ds-diff-card-desc">{cfg.desc}</p>
                          </div>
                        </div>
                        <div className="ds-diff-card-topics">
                          {cfg.topics.map((t, i) => (
                            <span key={i} className="ds-topic-chip" style={isActive ? { color: cfg.color, borderColor: cfg.borderColor, background: cfg.gradientFrom } : {}}>{t}</span>
                          ))}
                        </div>
                        <div className="ds-diff-card-footer">
                          <span className="ds-diff-stat-pill" style={isActive ? { color: cfg.color } : {}}>
                            {qCount > 0 ? `${qCount} Questions` : 'Coming Soon'}
                          </span>
                          <span className="ds-diff-stat-pill" style={isActive ? { color: cfg.color } : {}}>
                            {cfg.time} mins
                          </span>
                          {qCount === 0 && <span className="ds-soon-chip">🔒 Locked</span>}
                          {isActive && qCount > 0 && <span className="ds-active-chip" style={{ color: cfg.color, borderColor: cfg.borderColor }}>✓ Selected</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Info / Empty Banner */}
                {hasQuestions ? (
                  <div className="ds-level-banner" style={{ borderColor: conf.borderColor, background: `linear-gradient(135deg, ${conf.gradientFrom}, transparent)` }}>
                    <div className="ds-level-banner-icon" style={{ background: conf.gradientFrom, borderColor: conf.borderColor }}>
                      <span style={{ fontSize: '1.4rem' }}>{conf.emoji}</span>
                    </div>
                    <div>
                      <h4 style={{ color: conf.color, marginBottom: 4 }}>{conf.label} Level Selected</h4>
                      <p className="ds-level-banner-desc">{conf.desc}</p>
                    </div>
                    <div className="ds-level-banner-stats">
                      <span style={{ color: conf.color }}><strong>{questionsForDiff(difficulty)}</strong> Qs</span>
                      <span style={{ color: conf.color }}><strong>{conf.time}</strong> min</span>
                      <span style={{ color: conf.color }}><strong>MCQ</strong></span>
                    </div>
                  </div>
                ) : (
                  <div className="ds-empty-card">
                    <div className="ds-empty-icon"><Database size={26} /></div>
                    <h4>Questions Coming Soon</h4>
                    <p>The <strong style={{ color: conf.color }}>{conf.label}</strong> question bank is being prepared. Select <strong>Beginner</strong> to start now.</p>
                  </div>
                )}

                {/* Start CTA */}
                <div className="ds-start-cta">
                  <button
                    className="ds-start-btn"
                    onClick={() => handleStart(difficulty)}
                    disabled={!hasQuestions}
                  >
                    <Sparkles size={18} />
                    {hasQuestions ? `Start ${conf.label} Quiz` : 'Select an Available Level'}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              {/* Right column */}
              <div className="ds-setup-right">

                {/* Quiz Stats Overview */}
                <div className="ds-side-card">
                  <div className="ds-side-card-header">
                    <BarChart3 size={16} />
                    <h4>Quiz Overview</h4>
                  </div>
                  <div className="ds-overview-grid">
                    <div className="ds-overview-item">
                      <div className="ds-ov-icon" style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}><CheckCircle2 size={18} /></div>
                      <span className="ds-ov-val">20</span>
                      <span className="ds-ov-lbl">Total Qs</span>
                    </div>
                    <div className="ds-overview-item">
                      <div className="ds-ov-icon" style={{ background: 'rgba(139,92,246,0.12)', color: 'var(--accent-glow)' }}><Trophy size={18} /></div>
                      <span className="ds-ov-val">3</span>
                      <span className="ds-ov-lbl">Levels</span>
                    </div>
                    <div className="ds-overview-item">
                      <div className="ds-ov-icon" style={{ background: 'rgba(245,158,11,0.12)', color: '#f59e0b' }}><Clock size={18} /></div>
                      <span className="ds-ov-val">25m</span>
                      <span className="ds-ov-lbl">Max Time</span>
                    </div>
                    <div className="ds-overview-item">
                      <div className="ds-ov-icon" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}><Zap size={18} /></div>
                      <span className="ds-ov-val">4</span>
                      <span className="ds-ov-lbl">Options</span>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div className="ds-side-card">
                  <div className="ds-side-card-header">
                    <Star size={16} />
                    <h4>Achievements</h4>
                  </div>
                  <div className="ds-achievements-list">
                    {ACHIEVEMENTS.map((ach, i) => (
                      <div key={i} className="ds-ach-row">
                        <span className="ds-ach-icon">{ach.icon}</span>
                        <div className="ds-ach-text">
                          <span className="ds-ach-label">{ach.label}</span>
                          <span className="ds-ach-desc">{ach.desc}</span>
                        </div>
                        <span className="ds-ach-threshold">{ach.threshold}%+</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quiz Tips */}
                <div className="ds-side-card">
                  <div className="ds-side-card-header">
                    <Lightbulb size={16} />
                    <h4>Quiz Tips</h4>
                  </div>
                  <div className="ds-tips-list">
                    {QUIZ_TIPS.map((t, i) => (
                      <div key={i} className="ds-tip-row">
                        <span className="ds-tip-icon">{t.icon}</span>
                        <span className="ds-tip-text">{t.tip}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shield / Fair Play */}
                <div className="ds-side-card ds-fairplay-card">
                  <Shield size={20} className="ds-fairplay-icon" />
                  <div>
                    <h5>Academic Integrity</h5>
                    <p>Attempt the quiz independently. This is for self-assessment and learning purposes.</p>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ PLAYING SCREEN ═══ */}
        {screen === 'playing' && activeQ && (
          <motion.div key="playing" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>

            {/* Top Toolbar */}
            <div className="ds-play-toolbar">
              <button className="ds-back-btn" onClick={handleQuit}>
                <ArrowLeft size={16} /> Quit Quiz
              </button>
              <div className="ds-top-right-badges">
                <div className="ds-score-badge">
                  <Trophy size={15} /> {correctCount} / {totalQ}
                </div>
                <div className={`ds-timer-badge ${timeRemaining < 60 ? 'warning' : ''}`}>
                  <Clock size={15} /> {formatTime(timeRemaining)}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="ds-progress-wrapper">
              <div className="ds-progress-labels">
                <span>Question {currentIdx + 1} of {totalQ}</span>
                <span>{submittedIdxs.length} Answered · {totalQ - submittedIdxs.length} Remaining · Score {accuracy}%</span>
              </div>
              <div className="ds-progress-track">
                <div className="ds-progress-fill" style={{ width: `${(currentIdx / totalQ) * 100}%` }} />
              </div>
            </div>

            {/* Question Navigator */}
            <div className="ds-q-navigator">
              <p className="ds-q-navigator-label">Question Navigator</p>
              <div className="ds-q-nav-dots">
                {questions.map((_, idx) => (
                  <button key={idx} className={`ds-q-dot ${dotState(idx)}`} onClick={() => setCurrentIdx(idx)} title={`Question ${idx + 1}`}>
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Card */}
            <div className="ds-question-card glass-card">
              <div className="ds-question-card-glow" />
              <div className="ds-question-top-row">
                <span className="ds-q-number-tag">Question #{currentIdx + 1}</span>
                <span className={`ds-difficulty-pill ${difficulty}`}>{conf.emoji} {conf.label}</span>
              </div>
              <p className="ds-question-text">{activeQ.text}</p>
              <div className="ds-options-list">
                {activeQ.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === opt;
                  const isCorrect  = opt === activeQ.correctAnswer;
                  let cls = 'ds-option-btn';
                  if (isSubmitted) {
                    if (isCorrect)       cls += ' opt-correct';
                    else if (isSelected) cls += ' opt-wrong';
                  } else if (isSelected) {
                    cls += ' selected';
                  }
                  return (
                    <button key={oIdx} className={cls} disabled={isSubmitted} onClick={() => handleSelectOption(opt)}>
                      <span className="ds-option-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="ds-option-text">{opt}</span>
                      {isSubmitted && isCorrect  && <span className="ds-opt-badge correct-badge">✓ Correct</span>}
                      {isSubmitted && isSelected && !isCorrect && <span className="ds-opt-badge wrong-badge">✗ Your Answer</span>}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div key="feedback" className="ds-feedback-box" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
                    {selectedAnswers[currentIdx] === activeQ.correctAnswer ? (
                      <div className="ds-feedback-header correct-header"><CheckCircle2 size={18} /> Correct Answer!</div>
                    ) : (
                      <>
                        <div className="ds-feedback-header wrong-header"><XCircle size={18} /> Incorrect Answer</div>
                        <p className="ds-correct-answer-note">Correct answer: <strong>{activeQ.correctAnswer}</strong></p>
                      </>
                    )}
                    {activeQ.explanation
                      ? <p style={{ marginTop: '10px' }}><strong style={{ color: 'var(--text-primary)' }}>Explanation: </strong>{activeQ.explanation}</p>
                      : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="ds-nav-footer">
              <div className="ds-nav-left">
                <button className="ds-btn-nav" disabled={currentIdx === 0} onClick={() => setCurrentIdx(i => i - 1)}>
                  <ChevronLeft size={16} /> Previous
                </button>
                <button className="ds-btn-nav" disabled={currentIdx === totalQ - 1} onClick={() => setCurrentIdx(i => i + 1)}>
                  Next <ChevronRight size={16} />
                </button>
              </div>
              <div className="ds-nav-right">
                {!isSubmitted ? (
                  <button className="ds-btn-submit-ans" disabled={selectedAnswers[currentIdx] === undefined} onClick={handleSubmitQuestion}>
                    <CheckCircle2 size={16} /> Submit Answer
                  </button>
                ) : (
                  currentIdx === totalQ - 1 ? (
                    <button className="ds-btn-finish" onClick={handleFinishQuiz}>Finish Quiz <Trophy size={16} /></button>
                  ) : (
                    <button className="ds-btn-submit-ans" onClick={() => setCurrentIdx(i => i + 1)}>Next Question <ChevronRight size={16} /></button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ═══ RESULTS SCREEN ═══ */}
        {screen === 'results' && (
          <motion.div key="results" className="ds-results-panel" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>

            {/* Back */}
            <button className="ds-back-btn" onClick={handleBack}>
              <ArrowLeft size={16} /> Back
            </button>

            {/* Results Hero */}
            <header className="ds-results-hero glass-card">
              <div className="ds-medal-ring"><Award size={52} /></div>
              <p className="ds-result-congratulations">🎉 Quiz Completed!</p>
              <h1 className="ds-result-title text-gradient-purple">{performance.title}</h1>
              <p className="ds-result-subtitle">{performance.desc}</p>
              <div className="ds-result-time-row">
                <span><Clock size={14} /> Time Taken: {formatTime(timeElapsed)}</span>
                <span><Target size={14} /> {skippedCount} Unanswered</span>
                <span className={`ds-difficulty-pill ${difficulty}`}>{conf.emoji} {conf.label} Level</span>
              </div>
            </header>

            {/* Metrics */}
            <div className="ds-results-grid">
              <div className="ds-result-metric-card glass-card">
                <div className="ds-metric-icon purple"><Target size={22} /></div>
                <span className="ds-metric-value">{totalQ}</span>
                <span className="ds-metric-label">Total Questions</span>
              </div>
              <div className="ds-result-metric-card glass-card">
                <div className="ds-metric-icon green"><CheckCircle2 size={22} /></div>
                <span className="ds-metric-value" style={{ color: '#10b981' }}>{correctCount}</span>
                <span className="ds-metric-label">Correct</span>
              </div>
              <div className="ds-result-metric-card glass-card">
                <div className="ds-metric-icon red"><XCircle size={22} /></div>
                <span className="ds-metric-value" style={{ color: '#ef4444' }}>{wrongCount}</span>
                <span className="ds-metric-label">Wrong</span>
              </div>
              <div className="ds-result-metric-card glass-card">
                <div className="ds-metric-icon amber"><Zap size={22} /></div>
                <span className="ds-metric-value" style={{ color: '#f59e0b' }}>{accuracy}%</span>
                <span className="ds-metric-label">Accuracy</span>
              </div>
            </div>

            {/* Performance + Progress */}
            <div className="ds-performance-band glass-card">
              <div className={`ds-perf-icon-box ${performance.level}`}><TrendingUp size={26} /></div>
              <div className="ds-perf-content">
                <h3>Performance: {performance.title}</h3>
                <p>{performance.desc}</p>
                <div className="ds-result-progress-bar-wrap">
                  <div className="ds-result-progress-track">
                    <div className="ds-result-progress-fill" style={{
                      width: `${accuracy}%`,
                      background: accuracy >= 90 ? 'linear-gradient(90deg,#8b5cf6,#c084fc)' :
                                  accuracy >= 70 ? 'linear-gradient(90deg,#10b981,#34d399)' :
                                  accuracy >= 40 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' :
                                                   'linear-gradient(90deg,#ef4444,#f87171)'
                    }} />
                  </div>
                  <span className="ds-progress-pct">{accuracy}%</span>
                </div>
                <p style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Time: {formatTime(timeElapsed)} · {skippedCount} Skipped / Unanswered
                </p>
              </div>
              {earnedAchievement && (
                <div className="ds-earned-badge">
                  <span className="ds-earned-icon">{earnedAchievement.icon}</span>
                  <span className="ds-earned-label">{earnedAchievement.label}</span>
                </div>
              )}
            </div>

            {/* Review */}
            <div className="ds-review-section">
              <h2 className="ds-review-title">📋 Review Quiz Answers</h2>
              {questions.map((q, qIdx) => {
                const userAns   = selectedAnswers[qIdx];
                const submitted = submittedIdxs.includes(qIdx);
                return (
                  <div key={q.id} className="ds-review-card glass-card">
                    <div className="ds-review-top">
                      <span className="ds-review-q-num">Question {qIdx + 1}</span>
                      <span className={`ds-difficulty-pill ${difficulty}`}>{conf.emoji} {conf.label}</span>
                    </div>
                    <p className="ds-review-q-text">{q.text}</p>
                    <div className="ds-review-options">
                      {q.options.map((opt, oIdx) => {
                        const isCorrect  = opt === q.correctAnswer;
                        const isSelected = userAns === opt;
                        let cls = 'ds-review-opt-row';
                        if (isCorrect)             cls += ' review-correct';
                        else if (isSelected)       cls += ' review-wrong';
                        return (
                          <div key={oIdx} className={cls}>
                            <span className="ds-review-bullet">{String.fromCharCode(65 + oIdx)}</span>
                            <span style={{ flex: 1 }}>{opt}</span>
                            {isCorrect  && <span className="ds-opt-badge correct-badge">✓ Correct</span>}
                            {isSelected && !isCorrect && <span className="ds-opt-badge wrong-badge">✗ Your Answer</span>}
                          </div>
                        );
                      })}
                    </div>
                    {!submitted && <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)' }}>— Not submitted</p>}
                    {q.explanation && (
                      <div className="ds-review-explanation">
                        <strong style={{ color: 'var(--text-primary)' }}>Explanation: </strong>{q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="ds-results-actions">
              <button className="btn-premium" onClick={handleBack}>
                <ArrowLeft size={16} /> Back
              </button>
              <button className="btn-premium-purple" onClick={handleRetry}>
                <RotateCcw size={16} /> Retry Quiz
              </button>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
};

export default DSQuiz;
