import React from 'react';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FounderNoteCTA = () => {
  const navigate = useNavigate();

  return (
    <section id="founder-note" style={{ padding: '60px 24px 80px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{
        background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.08) 0%, rgba(11, 11, 11, 0.9) 100%)',
        border: '1px solid rgba(168, 85, 247, 0.25)',
        borderRadius: '24px',
        padding: '48px 32px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
      }}>
        <span className="premium-badge flex-center" style={{ width: 'fit-content', margin: '0 auto 16px' }}>
          <Sparkles size={14} style={{ marginRight: '6px' }} /> FOUNDER NOTE
        </span>

        <h2 className="section-title text-gradient" style={{ fontSize: '2rem', marginBottom: '16px' }}>
          Built for Builders, Not Memorizers
        </h2>

        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', lineHeight: '1.7', maxWidth: '700px', margin: '0 auto 24px' }}>
          "NEXLY was built on a simple premise: learning to code shouldn't mean stitching together five disconnected platforms. What you learn in a lesson should immediately tell you what problem to solve next."
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/technologies/cpp')}
            className="btn-premium-purple flex-center"
            style={{ fontSize: '0.95rem', padding: '14px 28px', borderRadius: '10px' }}
          >
            Start Learning Now <ArrowRight size={16} style={{ marginLeft: '8px' }} />
          </button>
          <button
            onClick={() => navigate('/code-lab')}
            className="btn-premium flex-center"
            style={{ fontSize: '0.95rem', padding: '14px 28px', borderRadius: '10px' }}
          >
            Open Code Lab
          </button>
        </div>
      </div>
    </section>
  );
};

export default FounderNoteCTA;
