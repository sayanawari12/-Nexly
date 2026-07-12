import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Clock, 
  Award, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Zap,
  BarChart3,
  Code2,
  AlertCircle,
  Home
} from 'lucide-react';
import questionsData from './CppQuizQuestions.json';
import '../styles/CppQuiz.css';

// Shuffle Helper
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const CppQuiz = () => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState('setup'); // 'setup' | 'playing' | 'results'
  const [difficulty, setDifficulty] = useState('beginner'); // 'beginner' | 'intermediate' | 'advanced'
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIdx: selectedOptionText }
  const [submittedQuestions, setSubmittedQuestions] = useState([]); // Array of question indexes
  const [timeRemaining, setTimeRemaining] = useState(900);

  const timerRef = useRef(null);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/technologies/cpp');
    }
  };

  // Difficulty configurations mapping
  const diffConfigs = {
    beginner: { name: 'Beginner', questions: 20, time: 15, badge: 'Level 1', desc: 'Syntax basics, variables, operators, and basic logic.' },
    intermediate: { name: 'Intermediate', questions: 10, time: 15, badge: 'Level 2', desc: 'Pointers, arrays, functions, classes, and loops.' },
    advanced: { name: 'Advanced', questions: 10, time: 20, badge: 'Level 3', desc: 'Exception handling, memory, templates, and STL.' }
  };

  // Timer countdown handler
  useEffect(() => {
    if (quizState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [quizState]);

  // Start quiz execution
  const handleStartQuiz = (selectedDiff) => {
    setDifficulty(selectedDiff);
    const questionsList = questionsData[selectedDiff] || questionsData.beginner;

    let finalizedQuestions;
    if (selectedDiff === 'beginner') {
      // 1. Shuffle questions for beginner
      const shuffled = shuffleArray(questionsList);
      // 2. Shuffle options for beginner
      finalizedQuestions = shuffled.map(q => ({
        ...q,
        options: shuffleArray(q.options)
      }));
    } else {
      // Intermediate and Advanced remain exactly as declared (unshuffled)
      finalizedQuestions = [...questionsList];
    }

    setShuffledQuestions(finalizedQuestions);
    setTimeRemaining(diffConfigs[selectedDiff].time * 60);
    setSelectedAnswers({});
    setSubmittedQuestions([]);
    setCurrentIdx(0);
    setQuizState('playing');
  };

  // Select option handler
  const handleSelectOption = (optionText) => {
    const isSubmitted = submittedQuestions.includes(currentIdx);
    if (isSubmitted) return; // Locked
    
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIdx]: optionText
    });
  };

  // Question Submission (locks answer, reveals feedback)
  const handleSubmitQuestion = () => {
    if (selectedAnswers[currentIdx] === undefined) return;
    setSubmittedQuestions([...submittedQuestions, currentIdx]);
  };

  // Skip current question
  const handleSkipQuestion = () => {
    if (currentIdx < shuffledQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  // Submit whole quiz
  const handleSubmitQuiz = () => {
    setQuizState('results');
  };

  // Restart quiz logic
  const handleRestartQuiz = () => {
    setQuizState('setup');
  };

  // Calculate results metrics
  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  
  // Calculate correct answers
  const correctCount = Object.keys(selectedAnswers).reduce((acc, qIdx) => {
    const question = shuffledQuestions[qIdx];
    if (question && selectedAnswers[qIdx] === question.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);
  
  const wrongCount = submittedQuestions.reduce((acc, qIdx) => {
    const question = shuffledQuestions[qIdx];
    if (question && selectedAnswers[qIdx] !== question.correctAnswer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  // Format timer text
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Performance message
  const getPerformanceMessage = (scoreAcc) => {
    if (scoreAcc >= 90) return { title: 'Elite Programmer', desc: 'Outstanding! You have mastered these C++ concepts.' };
    if (scoreAcc >= 70) return { title: 'Competent Coder', desc: 'Great job! You have solid foundational knowledge.' };
    if (scoreAcc >= 40) return { title: 'Rising Learner', desc: 'Good attempt. Review the explanations and try again.' };
    return { title: 'Beginner Builder', desc: 'Keep practicing. Re-studying the C++ learning modules will help.' };
  };

  const performance = getPerformanceMessage(accuracy);

  // Syntax highlighting for code questions using single-pass tokenizer
  const highlightCode = (codeText) => {
    if (!codeText) return '';
    let escaped = codeText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const tokenRegex = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(".*?")|('.*?')|(#\w+\s*&lt;.*&gt;|#\w+)|(\b(?:int|double|float|char|bool|void|class|struct|if|else|cout|cin|return|for|while|do)\b)|(\b\d+\b)/g;

    return escaped.replace(tokenRegex, (match, p1, p2, p3, p4, p5, p6, p7) => {
      if (p1 || p2) return `<span class="token-comment">${match}</span>`;
      if (p3 || p4) return `<span class="token-string">${match}</span>`;
      if (p5) return `<span class="token-directive">${match}</span>`;
      if (p6) return `<span class="token-keyword">${match}</span>`;
      if (p7) return `<span class="token-number">${match}</span>`;
      return match;
    });
  };

  const activeQuestion = shuffledQuestions[currentIdx];
  const isCurrentSubmitted = submittedQuestions.includes(currentIdx);

  return (
    <div className="cpp-quiz-wrapper">
      {/* Breadcrumb Navigation */}
      <div className="cpp-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', padding: '0 20px' }}>
        <button onClick={handleBack} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}><Home size={13} /> Home</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>Tech Stack</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button onClick={() => navigate('/technologies/cpp')} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: '0' }}>C++ Language</button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600' }}>Quiz</span>
      </div>

      <div className="cpp-quiz-container">
        
        {/* SETUP SCREEN */}
        {quizState === 'setup' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="quiz-setup-panel"
          >
            <button className="back-btn" onClick={handleBack}>
              <ArrowLeft size={16} /> Back
            </button>

            <header className="quiz-header glass-card">
              <span className="section-tag">Assessment</span>
              <h1 className="quiz-page-title text-gradient-purple">C++ Coding Quiz</h1>
              <p className="quiz-page-subtitle">Test your C++ knowledge from Beginner to Advanced.</p>
              
              <div className="quiz-header-meta">
                <div className="meta-item">
                  <HelpCircle size={16} />
                  <span>Interactive Levels</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>Time Limit: 15 - 20 mins</span>
                </div>
                <div className="meta-item">
                  <BarChart3 size={16} />
                  <span>Immediate Feedback</span>
                </div>
              </div>
            </header>

            {/* Difficulty Cards */}
            <h2 className="setup-section-title">Select Difficulty Level</h2>
            <div className="difficulty-grid">
              {Object.keys(diffConfigs).map((key) => {
                const conf = diffConfigs[key];
                return (
                  <button 
                    key={key} 
                    className={`difficulty-card glass-card ${difficulty === key ? 'active' : ''}`}
                    onClick={() => setDifficulty(key)}
                  >
                    <div className="diff-card-header">
                      <span className="diff-badge">{conf.badge}</span>
                      <Zap size={20} className="diff-icon" />
                    </div>
                    <h3 className="diff-title">{conf.name}</h3>
                    <p className="diff-desc">{conf.desc}</p>
                    
                    <div className="diff-metrics">
                      <span>{conf.questions} Questions</span>
                      <span className="dot-sep">•</span>
                      <span>{conf.time} Mins</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="start-quiz-cta">
              <button 
                className="btn-premium-purple start-quiz-btn"
                onClick={() => handleStartQuiz(difficulty)}
              >
                Start C++ Quiz <Sparkles size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* QUIZ SCREEN */}
        {quizState === 'playing' && activeQuestion && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="quiz-play-panel"
          >
            <div className="quiz-top-toolbar">
              <button 
                className="back-btn" 
                onClick={() => {
                  if (window.confirm("Are you sure you want to exit the quiz? Your progress will be lost.")) {
                    setQuizState('setup');
                  }
                }}
              >
                <ArrowLeft size={16} /> Quit Quiz
              </button>

              <div className="quiz-top-stats">
                <div className="timer-badge">
                  <Clock size={16} />
                  <span className="timer-text">{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="quiz-progress-wrapper">
              <div className="progress-labels">
                <span>Question {currentIdx + 1} of {totalQuestions}</span>
                <span>{Math.round(((currentIdx) / totalQuestions) * 100)}% Complete</span>
              </div>
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill"
                  style={{ width: `${((currentIdx) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="question-content-container glass-card">
              <div className="question-card-header">
                <span className="question-number-tag">Question #{currentIdx + 1}</span>
                <span className="question-type-tag">{activeQuestion.type === 'program' ? 'Program Output' : 'Theory MCQ'}</span>
              </div>

              <h3 className="quiz-question-text">
                {activeQuestion.type === 'program' 
                  ? "What will be the output of the following C++ program?" 
                  : activeQuestion.text}
              </h3>

              {/* Show Code Block if it exists */}
              {activeQuestion.code && (
                <div className="code-editor-block" style={{ margin: '-10px 0 30px', background: '#09070f' }}>
                  <div className="code-header">
                    <span className="code-lang-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Code2 size={12} /> C++ Snippet
                    </span>
                  </div>
                  <div className="code-body" style={{ padding: '14px 18px' }}>
                    <pre className="code-content-pre" style={{ margin: 0 }}>
                      <code dangerouslySetInnerHTML={{ __html: highlightCode(activeQuestion.code) }} />
                    </pre>
                  </div>
                </div>
              )}

              {/* Options Grid */}
              <div className="quiz-options-grid">
                {activeQuestion.options.map((option, oIdx) => {
                  const isSelected = selectedAnswers[currentIdx] === option;
                  const isCorrect = option === activeQuestion.correctAnswer;
                  
                  let cardClass = "option-card glass-card";
                  if (isSelected) cardClass += " selected";
                  
                  // Color highlights after Submit
                  if (isCurrentSubmitted) {
                    if (isCorrect) {
                      cardClass += " correct";
                    } else if (isSelected) {
                      cardClass += " incorrect";
                    }
                  }
                  
                  return (
                    <button
                      key={oIdx}
                      className={cardClass}
                      disabled={isCurrentSubmitted}
                      onClick={() => handleSelectOption(option)}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + oIdx)}</span>
                      <span className="option-text">{option}</span>
                      
                      {isCurrentSubmitted && isCorrect && <span className="badge-tag-correct">Correct</span>}
                      {isCurrentSubmitted && isSelected && !isCorrect && <span className="badge-tag-incorrect">Your Selection</span>}
                    </button>
                  );
                })}
              </div>

              {/* Question Feedback Explanation */}
              {isCurrentSubmitted && activeQuestion.explanation && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="review-explanation-box" 
                  style={{ 
                    marginTop: '30px', 
                    padding: '16px 20px', 
                    background: 'rgba(139, 92, 246, 0.03)', 
                    borderLeft: '3px solid var(--primary-purple)', 
                    borderRadius: '0 12px 12px 0', 
                    fontSize: '0.9rem', 
                    lineHeight: '1.5',
                    color: 'var(--text-secondary)' 
                  }}
                >
                  <strong style={{ color: 'var(--text-primary)' }}>Explanation:</strong> {activeQuestion.explanation}
                </motion.div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="quiz-navigation-footer">
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  className="btn-nav-prev"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                >
                  <ChevronLeft size={16} /> Prev
                </button>

                <button 
                  className="btn-nav-next"
                  disabled={currentIdx === totalQuestions - 1}
                  onClick={() => setCurrentIdx(currentIdx + 1)}
                >
                  Next <ChevronRight size={16} />
                </button>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                {/* Skip Button */}
                {!isCurrentSubmitted && (
                  <button 
                    className="btn-nav-prev"
                    onClick={handleSkipQuestion}
                  >
                    Skip
                  </button>
                )}

                {/* Question Submit / Final Quiz Submit */}
                {!isCurrentSubmitted ? (
                  <button 
                    className="btn-premium-purple"
                    disabled={selectedAnswers[currentIdx] === undefined}
                    onClick={handleSubmitQuestion}
                  >
                    Submit Answer
                  </button>
                ) : (
                  currentIdx === totalQuestions - 1 && (
                    <button 
                      className="btn-premium-purple submit-quiz-btn"
                      onClick={handleSubmitQuiz}
                    >
                      Finish Quiz <CheckCircle2 size={16} />
                    </button>
                  )
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* RESULTS SCREEN */}
        {quizState === 'results' && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="quiz-results-panel"
          >
            <header className="results-header glass-card">
              <div className="performance-glow-box">
                <Award size={48} className="medal-icon" />
              </div>
              <h1 className="performance-title text-gradient-purple">{performance.title}</h1>
              <p className="performance-desc">{performance.desc}</p>
            </header>

            <div className="results-metrics-grid">
              <div className="metric-card glass-card">
                <span className="metric-label">Score</span>
                <span className="metric-value">{correctCount} / {totalQuestions}</span>
                <span className="metric-subtext">Questions Correct</span>
              </div>

              <div className="metric-card glass-card">
                <span className="metric-label">Accuracy</span>
                <span className="metric-value">{accuracy}%</span>
                <span className="metric-subtext">Performance Rate</span>
              </div>

              <div className="metric-card glass-card split-metric">
                <div className="split-row">
                  <div className="split-item text-green">
                    <CheckCircle2 size={16} />
                    <span>Correct: {correctCount}</span>
                  </div>
                  <div className="split-item text-red">
                    <XCircle size={16} />
                    <span>Wrong: {wrongCount}</span>
                  </div>
                  <div className="split-item text-muted">
                    <AlertCircle size={16} />
                    <span>Skipped/Unsubmitted: {totalQuestions - submittedQuestions.length}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Answer review list */}
            <div className="review-questions-list">
              <h2 className="review-title">Review Quiz Answers</h2>
              {shuffledQuestions.map((q, qIndex) => {
                const userAnswer = selectedAnswers[qIndex];
                const correctAnswer = q.correctAnswer;
                const isSubmitted = submittedQuestions.includes(qIndex);
                
                return (
                  <div key={q.id} className="review-question-card glass-card" style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 className="review-question-num">Question {qIndex + 1}</h4>
                      <span className="question-type-tag" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>
                        {q.type === 'program' ? 'Program Output' : 'Theory MCQ'}
                      </span>
                    </div>
                    
                    <p className="review-question-txt">
                      {q.type === 'program' 
                        ? "What will be the output of the following C++ program?" 
                        : q.text}
                    </p>
                    
                    {q.code && (
                      <div className="code-editor-block" style={{ margin: '-10px 0 20px', background: '#09070f' }}>
                        <div className="code-body" style={{ padding: '10px 14px' }}>
                          <pre className="code-content-pre" style={{ margin: 0 }}>
                            <code dangerouslySetInnerHTML={{ __html: highlightCode(q.code) }} />
                          </pre>
                        </div>
                      </div>
                    )}

                    <div className="review-options">
                      {q.options.map((opt, oIndex) => {
                        let optionClass = "review-option-item";
                        const isSelected = userAnswer === opt;
                        const isCorrect = opt === correctAnswer;
                        
                        if (isCorrect) optionClass += " correct";
                        else if (isSelected) optionClass += " incorrect";
                        
                        return (
                          <div key={oIndex} className={optionClass}>
                            <span className="review-bullet">{String.fromCharCode(65 + oIndex)}</span>
                            <span>{opt}</span>
                            {isCorrect && <span className="badge-tag-correct">Correct</span>}
                            {isSelected && !isCorrect && <span className="badge-tag-incorrect">Your Answer</span>}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation box */}
                    {q.explanation && (
                      <div className="review-explanation-box" style={{ 
                        marginTop: '20px', 
                        padding: '16px 20px', 
                        background: 'rgba(139, 92, 246, 0.03)', 
                        borderLeft: '3px solid var(--primary-purple)', 
                        borderRadius: '0 12px 12px 0', 
                        fontSize: '0.9rem', 
                        lineHeight: '1.5',
                        color: 'var(--text-secondary)' 
                      }}>
                        <strong style={{ color: 'var(--text-primary)' }}>Explanation:</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="results-actions-row" style={{ marginTop: '30px' }}>
              <button 
                className="btn-premium"
                onClick={handleBack}
              >
                <ArrowLeft size={16} /> Back
              </button>
              
              <button 
                className="btn-premium-purple"
                onClick={handleRestartQuiz}
              >
                Restart Quiz <RotateCcw size={16} />
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default CppQuiz;
