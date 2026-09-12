import React from 'react';
import { motion } from 'framer-motion';

const OverviewTab = ({ overview, setActiveTab }) => {
  if (!overview) return null;

  return (
    <div className="py-tab-content py-overview-grid">
      <div className="py-overview-left">
        {/* About Card */}
        <div className="py-about-card">
          <h3>About Language</h3>
          <p>{overview.about}</p>

          <div className="py-why-grid" style={{ marginTop: '16px' }}>
            {overview.features?.map((f, i) => (
              <div key={i} className="py-why-item">
                <div
                  className="py-why-icon"
                  style={{ background: 'rgba(139,92,246,0.12)' }}
                >
                  {f.icon}
                </div>
                <div>
                  <h5>{f.title}</h5>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Focus */}
        <div className="py-about-card">
          <h3>⭐ Key Focus Areas</h3>
          <div className="py-why-grid">
            {overview.topics?.map((topic, i) => (
              <div key={i} className="py-why-item">
                <div
                  className="py-why-icon"
                  style={{ background: 'rgba(6,182,212,0.12)', fontSize: '1.1rem' }}
                >
                  📌
                </div>
                <div>
                  <h5>{topic}</h5>
                  <p>Core topic in curriculum</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Career & Actions */}
      <div className="py-overview-right">
        <div className="py-about-card">
          <h3>💼 Career Opportunities</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {overview.opportunities?.map((op, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.02)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>
                  {op.role}
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--accent-glow)',
                    marginTop: '2px',
                  }}
                >
                  {op.salary}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="py-about-card" style={{ textAlign: 'center' }}>
          <h3>🚀 Ready to Start?</h3>
          <p
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-secondary)',
              marginBottom: '16px',
            }}
          >
            Begin your learning journey with interactive lessons and practical coding exercises.
          </p>
          <button
            className="py-btn-primary"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => setActiveTab('lessons')}
          >
            Start Lessons
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
