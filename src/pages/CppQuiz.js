import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, HelpCircle, CheckCircle2, Sparkles, Clock, Zap } from 'lucide-react';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import TechnologyLogo from '../components/ui/TechnologyLogo';
import CppQuizContent from '../components/technology/CppQuizContent';
import '../styles/CLearningHub.css';
import '../styles/CppQuiz.css';

const CppQuiz = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/technologies/cpp');
    }
  };

  return (
    <div className="c-hub-wrapper cpp-quiz-standalone-wrapper">
      {/* Breadcrumb Navigation */}
      <div
        className="c-breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          padding: '16px 8%'
        }}
      >
        <button
          onClick={handleBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            padding: '0'
          }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>
          |
        </span>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            padding: '0'
          }}
        >
          <Home size={13} /> Home
        </button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>
          ›
        </span>
        <button
          onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            padding: '0'
          }}
        >
          Tech Stack
        </button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>
          ›
        </span>
        <button
          onClick={() => navigate('/technologies/cpp')}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: '500',
            padding: '0'
          }}
        >
          C++ Language
        </button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>
          ›
        </span>
        <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600' }}>
          Quiz
        </span>
      </div>

      {/* Hero Header */}
      <div className="c-hero-banner" style={{ marginBottom: '20px' }}>
        <div className="c-hero-inner">
          <TechnologyLogo svg={TECH_LOGOS.cpp} name="C++" />
          <div className="c-hero-text">
            <span className="c-badge">C++ ASSESSMENT</span>
            <h1 className="c-hero-title">C++ Knowledge Verification Quiz</h1>
            <p className="c-hero-subtitle">Interactive Assessment & Concept Validation</p>
            <p className="c-hero-desc">
              Test your understanding of C++ fundamentals, OOP, STL, memory management, and modern C++ concepts.
            </p>
            <div className="c-hero-stats">
              {[
                { val: '30', label: 'Questions Total' },
                { val: '10', label: 'Per Difficulty' },
                { val: '3', label: 'Levels (Beg, Int, Adv)' },
                { val: '30s', label: 'Per Question' },
                { val: '100%', label: 'Instant Feedback' }
              ].map((s, i) => (
                <div key={i} className="c-stat-pill">
                  <strong>{s.val}</strong> {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Quiz Area */}
      <div className="c-content-area" style={{ padding: '0 8% 60px' }}>
        <CppQuizContent />
      </div>
    </div>
  );
};

export default CppQuiz;
