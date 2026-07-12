import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, BookOpen, Award, ArrowRight } from 'lucide-react';
import '../../styles/TechnologyLearningHub.css';

const TechnologyLearningHub = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    navigate('/technologies/cpp');
  };

  // Custom premium purple-accented C++ Logo
  const CppLogo = () => (
    <svg viewBox="0 0 128 128" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="cppPurpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <circle cx="64" cy="64" r="58" fill="url(#cppPurpleGrad)" opacity="0.1" />
      <path 
        fill="url(#cppPurpleGrad)" 
        d="M64 14C36.4 14 14 36.4 14 64s22.4 50 50 50 50-22.4 50-50S91.6 14 64 14zm29.3 58.6H82.7v11.6H74.3V72.6H62.7v-8.4h11.6V52.6h8.4v11.6h10.6v8.4zm16.8 0H99.5v11.6H91.1V72.6H79.5v-8.4H91.1V52.6h8.4v11.6h10.6v8.4zM47.7 88.2c-15.1 0-23.7-9.4-23.7-23.2 0-13.9 8.6-23.2 23.7-23.2 9.1 0 15.6 4.3 19.3 10.4l-7.7 4.5c-2.3-3.6-6.1-5.7-11.4-5.7-8.3 0-13.6 5.8-13.6 14 0 8.1 5.3 14 13.6 14 5.3 0 9.1-2.1 11.4-5.7l7.7 4.5c-3.7 6.1-10.2 10.4-19.3 10.4z"
      />
    </svg>
  );

  return (
    <section id="learning-hub" className="tech-learning-hub-section" aria-label="Technology Learning Hub">
      <div className="tech-learning-hub-container">
        
        {/* Section Header */}
        <div className="section-header">
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            TECHNOLOGY LEARNING HUB
          </motion.span>
          
          <motion.h2 
            className="section-title text-gradient"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Learn C++ from Basics to Advanced
          </motion.h2>
          
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Master C++ step by step with structured lessons, examples, coding practice, quizzes, interview questions, and projects.
          </motion.p>
        </div>

        {/* Learning Cards Grid */}
        <div className="tech-learning-hub-grid">
          <motion.div 
            className="tech-learning-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="card-content-wrapper">
              
              {/* Card Title & Logo Row */}
              <div className="card-logo-row">
                <div className="card-logo-container">
                  <CppLogo />
                </div>
                <div className="card-title-meta">
                  <h3 className="card-lang-name">C++</h3>
                  <div className="card-meta-badges">
                    <span className="card-badge difficulty">
                      <Award size={12} />
                      Beginner to Advanced
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Description */}
              <p className="card-desc">
                Master high-performance systems development, memory control, standard template library (STL), object-oriented programming (OOP) paradigms, and modern C++ engineering best practices.
              </p>

              {/* Card Metrics Row */}
              <div className="card-stats-row">
                <div className="stat-item">
                  <span className="stat-label">Estimated Time</span>
                  <span className="stat-val">
                    <Clock size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    15 Hours
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Lessons</span>
                  <span className="stat-val">
                    <BookOpen size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
                    36 Lessons
                  </span>
                </div>
              </div>

              {/* Learning Progress UI (0% Preview) */}
              <div className="card-progress-container" aria-label="Learning Progress Preview">
                <div className="progress-header">
                  <span>Your Learning Progress</span>
                  <span className="progress-header-percentage">0%</span>
                </div>
                <div className="progress-bar-track">
                  <div className="progress-bar-fill" />
                </div>
              </div>

              {/* Start Learning CTA Button */}
              <button 
                className="btn-card-action"
                onClick={handleStartLearning}
                aria-label="Start Learning C++"
              >
                <span>Start Learning</span>
                <ArrowRight size={16} />
              </button>

            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TechnologyLearningHub;
