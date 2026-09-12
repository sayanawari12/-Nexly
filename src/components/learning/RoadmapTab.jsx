import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

const RoadmapTab = ({ lessons = [] }) => {
  const phases = [
    { key: 'beginner', title: 'Phase 1: Beginner Fundamentals', color: '#22c55e' },
    { key: 'intermediate', title: 'Phase 2: Intermediate Core', color: '#3b82f6' },
    { key: 'advanced', title: 'Phase 3: Advanced Concepts & Algorithms', color: '#a855f7' }
  ];

  return (
    <div className="py-tab-content" style={{ textAlign: 'left' }}>
      <div className="c-subsection-title">🗺️ Structured Learning Roadmap</div>
      <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.4)', marginBottom: '24px' }}>
        Progress step-by-step through foundational modules, core topics, and advanced algorithms.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {phases.map(phase => {
          const phaseLessons = lessons.filter(l => l.phase === phase.key || l.diff === phase.key);
          if (phaseLessons.length === 0) return null;

          return (
            <div
              key={phase.key}
              style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.04)',
                padding: '20px 24px',
                borderRadius: '14px'
              }}
            >
              <h3 style={{ fontSize: '0.96rem', fontWeight: '700', color: phase.color, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: phase.color, display: 'inline-block' }} />
                {phase.title} ({phaseLessons.length} lessons)
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '12px' }}>
                {phaseLessons.map((l) => (
                  <div
                    key={l.id}
                    style={{
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.02)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.03)'
                    }}
                  >
                    <div style={{ fontSize: '0.82rem', fontWeight: '600', color: '#fff' }}>
                      {l.id}. {l.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={11} /> {l.time}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoadmapTab;
