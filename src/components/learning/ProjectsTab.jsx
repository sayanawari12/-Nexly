import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, CheckCircle } from 'lucide-react';

const ProjectsTab = ({ projects = [] }) => {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(p =>
    filter === 'All' ? true : p.diff?.toLowerCase() === filter.toLowerCase()
  );

  return (
    <div className="py-tab-content" style={{ textAlign: 'left' }}>
      <div className="c-subsection-title">🚀 Portfolio Projects</div>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginBottom: '20px' }}>
        Apply concepts learned in lessons to real-world software applications and portfolio projects.
      </p>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`search-empty-btn ${filter === f ? 'active' : ''}`}
            style={filter === f ? { background: 'var(--primary-purple)', color: '#fff' } : {}}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px solid rgba(255,255,255,0.04)',
              padding: '20px',
              borderRadius: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '1.5rem' }}>{proj.emoji || '🚀'}</span>
                <span style={{ fontSize: '0.72rem', fontWeight: '700', color: 'var(--accent-glow)', background: 'rgba(168,85,247,0.1)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(168,85,247,0.2)' }}>
                  {proj.diff}
                </span>
              </div>

              <h4 style={{ fontSize: '0.94rem', fontWeight: '700', marginBottom: '6px' }}>{proj.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: '1.5', marginBottom: '16px' }}>
                {proj.desc}
              </p>

              {/* Features list */}
              {proj.features && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.74rem', fontWeight: '600', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>Key Milestones:</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {proj.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle size={11} style={{ color: '#10b981' }} /> {feat}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '12px', marginTop: '12px' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={12} /> {proj.time}
              </span>
              <button
                className="search-empty-btn"
                style={{ fontSize: '0.74rem', padding: '6px 12px' }}
                onClick={() => alert(`Starting milestone tracking for ${proj.title}`)}
              >
                Start Project
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsTab;
