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
    { name: 'C Language', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.c }} />, color: '#A8B9CC', desc: 'Syntax Basics & Memory Control', path: '/technologies/c' },
    { name: 'C++', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.cpp }} />, color: '#00599C', desc: 'Object Oriented Systems & Structures', path: '/technologies/cpp' },
    { name: 'Python', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.python }} />, color: '#3776AB', desc: 'ML Modeling & Automation Scripts', path: '/technologies/python' },
    { name: 'Java Platform', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.java }} />, color: '#ED8B00', desc: 'JVM Apps & Enterprise Backend', path: '/technologies/java' },
    { name: 'HTML5', icon: <SiHtml5 size={60} />, color: '#E34F26', desc: 'Semantic Structure & DOM Layouts' },
    { name: 'CSS3', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.css }} />, color: '#1572B6', desc: 'Premium Styling & Graphic Matrix' },
    { name: 'JavaScript', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.javascript }} />, color: '#F7DF1E', desc: 'Asynchronous Scripts & Web Core' },
    { name: 'React.js', icon: <SiReact size={60} />, color: '#61DAFB', desc: 'SPA Views & State Declarations' },
    { name: 'Node.js', icon: <SiNodedotjs size={60} />, color: '#339933', desc: 'Scalable Socket & API Servers' },
    { name: 'SQL / DBMS', icon: <SiMysql size={60} />, color: '#4479A1', desc: 'Relational Schemas & Fast Queries' },
    { name: 'Git Controls', icon: <SiGit size={60} />, color: '#F05032', desc: 'Branching, Merges & CI/CD Pipelines' },
    { name: 'Linux OS', icon: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px' }} dangerouslySetInnerHTML={{ __html: TECH_LOGOS.linux }} />, color: '#FCC624', desc: 'Shell Scripting & Server Hosting' }
  ];

  return (
    <section id="technologies">
      <div className="section-header">
        <span className="section-tag">Tech Stack</span>
        <h2 className="section-title">Core Languages & Tools</h2>
        <p className="section-subtitle">
          Master the complete stack of programming languages, platforms, and utilities driving the global technology sector.
        </p>
      </div>

      <div className="tech-grid">
        {techs.map((tech, idx) => (
          <motion.div
            key={idx}
            className={`glass-card tech-card ${tech.path ? 'clickable-tech' : ''}`}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            onClick={() => tech.path && navigate(tech.path)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            style={{
              borderColor: hoveredIdx === idx ? `${tech.color}55` : 'var(--border-primary)',
              boxShadow: hoveredIdx === idx 
                ? `0 10px 30px ${tech.color}15, inset 0 0 15px ${tech.color}10` 
                : 'none'
            }}
          >
            <div 
              className="tech-icon"
              style={{ 
                color: tech.color,
                filter: hoveredIdx === idx ? `drop-shadow(0 0 10px ${tech.color}88)` : 'none'
              }}
            >
              {tech.icon}
            </div>
            <div className="tech-name" style={{ color: hoveredIdx === idx ? '#fff' : 'var(--text-secondary)' }}>
              {tech.name}
            </div>
            {hoveredIdx === idx && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '4px', lineHeight: 1.2 }}
              >
                {tech.desc}
                {tech.path && <div style={{ color: 'var(--accent-glow)', marginTop: '4px', fontWeight: 'bold' }}>Click to Learn →</div>}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Technologies;
