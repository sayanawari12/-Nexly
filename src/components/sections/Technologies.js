import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SiHtml5,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiMysql
} from 'react-icons/si';
import { TECH_LOGOS } from './TechLogos';
import '../../styles/sections.css';

const Technologies = () => {
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const techs = [
    { id: 'c', name: 'C Language', svg: TECH_LOGOS.c, color: '#A8B9CC', desc: 'Syntax Basics & Memory Control', path: '/technologies/c' },
    { id: 'cpp', name: 'C++', svg: TECH_LOGOS.cpp, color: '#00599C', desc: 'OOP Concepts & STL Programming', path: '/technologies/cpp' },
    { id: 'python', name: 'Python', svg: TECH_LOGOS.python, color: '#3776AB', desc: 'Automation & Data Science', path: '/technologies/python' },
    { id: 'java', name: 'Java Platform', svg: TECH_LOGOS.java, color: '#ED8B00', desc: 'Object-Oriented & Enterprise Apps', path: '/technologies/java' },
    { id: 'html5', name: 'HTML5', component: SiHtml5, color: '#E34F26', desc: 'Page Structure & Web Content' },
    { id: 'css3', name: 'CSS3', svg: TECH_LOGOS.css, color: '#1572B6', desc: 'Styling & Responsive Design' },
    { id: 'javascript', name: 'JavaScript', svg: TECH_LOGOS.javascript, color: '#F7DF1E', desc: 'Interactive UI & DOM Manipulation' },
    { id: 'react', name: 'React.js', component: SiReact, color: '#61DAFB', desc: 'Component-Based & Modern UI' },
    { id: 'nodejs', name: 'Node.js', component: SiNodedotjs, color: '#339933', desc: 'Backend APIs & Server Runtime' },
    { id: 'sql', name: 'SQL / DBMS', component: SiMysql, color: '#4479A1', desc: 'Database Design & SQL Queries' },
    { id: 'git', name: 'Git Controls', component: SiGit, color: '#F05032', desc: 'Version Control & Team Collaboration' },
    { id: 'linux', name: 'Linux OS', svg: TECH_LOGOS.linux, color: '#FCC624', desc: 'Command Line & System Administration' }
  ];

  return (
    <section id="technologies" className="tech-section">
      <div className="section-header">
        <span className="section-tag">Tech Stack</span>
        <h2 className="section-title">Core Languages & Tools</h2>
        <p className="section-subtitle">
          Master the complete stack of programming languages, platforms, and utilities driving the global technology sector.
        </p>
      </div>

      <div className="tech-grid">
        {techs.map((tech, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <motion.div
              key={tech.id || idx}
              className={`tech-card ${tech.path ? 'clickable-tech' : ''}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => tech.path && navigate(tech.path)}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: (idx % 6) * 0.04 }}
              whileTap={{ scale: 0.97 }}
              style={{
                borderColor: isHovered ? `${tech.color}66` : 'rgba(255, 255, 255, 0.08)',
                boxShadow: isHovered 
                  ? `0 12px 35px ${tech.color}22, inset 0 0 20px ${tech.color}12` 
                  : 'none'
              }}
            >
              <div 
                className="tech-icon-box"
                style={{ 
                  color: tech.color,
                  filter: isHovered ? `drop-shadow(0 0 12px ${tech.color}99)` : 'none'
                }}
              >
                {tech.component ? (
                  <tech.component className="tech-icon-svg" />
                ) : (
                  <div className="tech-icon-svg" dangerouslySetInnerHTML={{ __html: tech.svg }} />
                )}
              </div>

              <span 
                className="tech-name"
                style={{ color: isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.85)' }}
              >
                {tech.name}
              </span>

              {isHovered && tech.desc && (
                <motion.div 
                  className="tech-hover-desc"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>{tech.desc}</span>
                  {tech.path && <span className="tech-learn-link">Click to Learn →</span>}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Technologies;
