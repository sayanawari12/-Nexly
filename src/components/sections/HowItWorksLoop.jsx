import React from 'react';
import { BookOpen, Target, FolderGit2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const STEPS = [
  {
    step: '01',
    title: 'Learn a Concept',
    description: 'Bite-sized structured lessons with runnable code examples and zero fluff.',
    icon: <BookOpen size={24} style={{ color: '#a855f7' }} />,
    actionText: 'Explore Learn',
    path: '/technologies/cpp'
  },
  {
    step: '02',
    title: 'Auto-Matched Practice',
    description: 'What you just learned tells you exactly what problems to solve next.',
    icon: <Target size={24} style={{ color: '#22c55e' }} />,
    actionText: 'Practice Arena',
    path: '/practice'
  },
  {
    step: '03',
    title: 'Build Portfolio Projects',
    description: 'Assemble complete applications with guided milestone specifications.',
    icon: <FolderGit2 size={24} style={{ color: '#60a5fa' }} />,
    actionText: 'View Projects',
    path: '/projects'
  }
];

const HowItWorksLoop = () => {
  const navigate = useNavigate();

  return (
    <section id="how-it-works" style={{ padding: '60px 24px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="premium-badge flex-center" style={{ width: 'fit-content', margin: '0 auto 12px' }}>
          <Sparkles size={14} style={{ marginRight: '6px' }} /> THE CORE LEARNING LOOP
        </span>
        <h2 className="section-title text-gradient" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>
          How NEXLY Works
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '550px', margin: '0 auto' }}>
          A seamless, unified path from curiosity to portfolio-proven engineering skills.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {STEPS.map((s, idx) => (
          <div
            key={idx}
            style={{
              background: '#0B0B0B',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '16px',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(168, 85, 247, 0.1)',
                  border: '1px solid rgba(168, 85, 247, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {s.icon}
                </div>
                <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'rgba(255, 255, 255, 0.15)' }}>{s.step}</span>
              </div>

              <h3 style={{ color: '#ffffff', fontSize: '1.25rem', marginBottom: '8px' }}>{s.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.65)', fontSize: '0.9rem', marginBottom: '24px', lineHeight: '1.5' }}>
                {s.description}
              </p>
            </div>

            <button
              onClick={() => navigate(s.path)}
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.82rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>{s.actionText}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksLoop;
