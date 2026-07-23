import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SiTypescript } from 'react-icons/si';
import { TECH_LOGOS } from '../components/sections/TechLogos';
import StudentLayout from '../layouts/StudentLayout';
import '../styles/RoadmapSection.css';

const Roadmap = () => {
  const navigate = useNavigate();

  const languagesRow1 = [
    { name: 'C', key: 'c', path: '/roadmaps/programming/c', svg: TECH_LOGOS.c },
    { name: 'C++', key: 'cpp', path: '/roadmaps/programming/cpp', svg: TECH_LOGOS.cpp },
    { name: 'Java', key: 'java', path: '/roadmaps/programming/java', svg: TECH_LOGOS.java }
  ];

  const languagesRow2 = [
    { name: 'Python', key: 'python', path: '/roadmaps/programming/python', svg: TECH_LOGOS.python },
    { name: 'JavaScript', key: 'javascript', path: '/roadmaps/programming/javascript', svg: TECH_LOGOS.javascript },
    { name: 'TypeScript', key: 'typescript', path: '/roadmaps/programming/typescript', isIcon: true }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <StudentLayout>
      <section className="roadmap-apple-section">
        {/* Section Header */}
        <motion.div 
          className="roadmap-apple-header"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="roadmap-apple-title">Learning Roadmaps</h1>
          <p className="roadmap-apple-subtitle">
            Choose your learning journey and master industry-ready skills through structured roadmaps.
          </p>
        </motion.div>

        {/* Layout: Exactly 3 Equal Cards */}
        <motion.div 
          className="roadmap-apple-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* 1. Programming Languages Card */}
          <motion.div 
            className="roadmap-apple-card" 
            variants={cardVariants}
            whileTap={{ scale: 0.99 }}
          >
            <div className="roadmap-card-header">
              <h2 className="roadmap-card-title">💻 Programming Languages</h2>
              <p className="roadmap-card-desc">
                Master the most popular programming languages through structured roadmaps and hands-on projects.
              </p>
            </div>

            <div className="roadmap-card-body">
              <div className="roadmap-logo-grid">
                {/* Row 1: C, C++, Java */}
                <div className="roadmap-logo-row">
                  {languagesRow1.map((lang) => (
                    <motion.button
                      key={lang.key}
                      className="roadmap-tech-btn"
                      onClick={() => navigate(lang.path)}
                      aria-label={`Learn ${lang.name}`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div 
                        className="roadmap-tech-icon"
                        dangerouslySetInnerHTML={{ __html: lang.svg }}
                      />
                      <span className="roadmap-tech-name">{lang.name}</span>
                    </motion.button>
                  ))}
                </div>

                {/* Row 2: Python, JavaScript, TypeScript */}
                <div className="roadmap-logo-row">
                  {languagesRow2.map((lang) => (
                    <motion.button
                      key={lang.key}
                      className="roadmap-tech-btn"
                      onClick={() => navigate(lang.path)}
                      aria-label={`Learn ${lang.name}`}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="roadmap-tech-icon">
                        {lang.isIcon ? (
                          <SiTypescript size={28} style={{ color: '#3178C6' }} />
                        ) : (
                          <div dangerouslySetInnerHTML={{ __html: lang.svg }} />
                        )}
                      </div>
                      <span className="roadmap-tech-name">{lang.name}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="roadmap-card-footer">
              <p className="roadmap-footer-text">Click any language to begin learning.</p>
            </div>
          </motion.div>

          {/* 2. Web Development Card */}
          <motion.div 
            className="roadmap-apple-card" 
            variants={cardVariants}
            whileTap={{ scale: 0.99 }}
          >
            <div className="roadmap-card-header">
              <h2 className="roadmap-card-title">🌐 Web Development</h2>
              <p className="roadmap-card-desc">
                Become a professional Full Stack Developer with modern web technologies.
              </p>
            </div>

            <div className="roadmap-card-body">
              <span className="coming-soon-badge">COMING SOON</span>
              <p className="coming-soon-subtext">This roadmap is currently under development.</p>
            </div>

            <div className="roadmap-card-footer">
              <p className="roadmap-footer-text">Stay tuned for upcoming tracks.</p>
            </div>
          </motion.div>

          {/* 3. Data Structures & Algorithms Card */}
          <motion.div 
            className="roadmap-apple-card" 
            variants={cardVariants}
            whileTap={{ scale: 0.99 }}
          >
            <div className="roadmap-card-header">
              <h2 className="roadmap-card-title">🧩 Data Structures & Algorithms</h2>
              <p className="roadmap-card-desc">
                Build strong problem-solving skills for interviews and placements.
              </p>
            </div>

            <div className="roadmap-card-body">
              <span className="coming-soon-badge">COMING SOON</span>
              <p className="coming-soon-subtext">This roadmap is currently under development.</p>
            </div>

            <div className="roadmap-card-footer">
              <p className="roadmap-footer-text">Stay tuned for upcoming tracks.</p>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </StudentLayout>
  );
};

export default Roadmap;
