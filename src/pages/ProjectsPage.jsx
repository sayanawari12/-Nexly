import React from 'react';
import { FolderGit2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import '../styles/global.css';

const ProjectsPage = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '80vh', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="premium-badge flex-center" style={{ width: 'fit-content', margin: '0 auto 16px' }}>
          <Sparkles size={14} style={{ marginRight: '6px' }} /> HANDS-ON BUILDS
        </span>
        <h1 className="section-title text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          NEXLY Guided Projects
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Turn your theoretical knowledge into portfolio-ready applications with specs, milestone checklists, and starter repositories.
        </p>
      </div>

      <div style={{ 
        background: '#0B0B0B', 
        border: '1px solid rgba(139, 92, 246, 0.2)', 
        borderRadius: '16px', 
        padding: '40px', 
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(139, 92, 246, 0.1)'
      }}>
        <div style={{ 
          width: '64px', 
          height: '64px', 
          borderRadius: '16px', 
          background: 'rgba(139, 92, 246, 0.1)', 
          border: '1px solid rgba(139, 92, 246, 0.3)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 20px',
          color: '#c084fc' 
        }}>
          <FolderGit2 size={32} />
        </div>
        <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '8px' }}>Portfolio Project Engine</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.65)', maxWidth: '500px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
          Guided project specs and self-reported milestone completion tracking are being integrated in Phase 5.
        </p>
      </div>
    </div>
  );
};

export default ProjectsPage;
