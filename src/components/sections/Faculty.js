import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Award } from 'lucide-react';
import '../../styles/sections.css';

const Faculty = () => {
  const members = [
    {
      initials: 'RK',
      name: 'Dr. Rajesh Kumar',
      role: 'Professor & Department Head',
      qualification: 'Ph.D. in Distributed Architectures',
      experience: '18+ Years of Academic Research',
      domain: 'Cloud Systems, Advanced Net Cryptography'
    },
    {
      initials: 'AS',
      name: 'Prof. Anita Sharma',
      role: 'Associate Professor',
      qualification: 'M.Tech in Information Technology',
      experience: '12+ Years in Software Design',
      domain: 'Database Engineering, Data Structures'
    },
    {
      initials: 'VS',
      name: 'Dr. Vikram Singh',
      role: 'Assistant Professor',
      qualification: 'Ph.D. in Machine Learning Models',
      experience: '9+ Years in Active Research',
      domain: 'Artificial Neural Nodes, Tensor Math'
    },
    {
      initials: 'SV',
      name: 'Prof. Sanjay Verma',
      role: 'Senior Lecturer',
      qualification: 'MCA, UGC-NET Certified',
      experience: '14+ Years in Technical Training',
      domain: 'Object Orientation, Web Engines & JS'
    }
  ];

  return (
    <section id="faculty">
      <div className="section-header">
        <span className="section-tag">Faculty Crew</span>
        <h2 className="section-title">Eminent Technical Mentors</h2>
        <p className="section-subtitle">
          Learn directly from research scholars, textbook authors, and expert code architects committed to launching your career.
        </p>
      </div>

      <div className="faculty-grid">
        {members.map((fac, idx) => (
          <motion.div
            key={idx}
            className="glass-card faculty-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {/* Custom high-tech placeholder photo */}
            <div className="faculty-img-wrapper">
              <div className="faculty-placeholder">
                <div style={{
                  fontSize: '4.5rem',
                  fontWeight: 'bold',
                  fontFamily: 'Space Grotesk',
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.15), rgba(139,92,246,0.2))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 0 10px rgba(139,92,246,0.3))'
                }}>
                  {fac.initials}
                </div>
              </div>
            </div>

            <div className="faculty-info">
              <h3 className="faculty-name">{fac.name}</h3>
              <p className="faculty-designation">{fac.role}</p>
              
              <div className="faculty-details">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <GraduationCap size={14} color="var(--accent-glow)" />
                  <span>{fac.qualification}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <Award size={14} color="var(--accent-glow)" />
                  <span>{fac.experience}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <BookOpen size={14} color="var(--accent-glow)" />
                  <span>Focus: {fac.domain}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Faculty;
