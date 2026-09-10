import React from 'react';
import { Terminal, Code2, Play, Sparkles } from 'lucide-react';
import '../styles/global.css';

const CodeLabPage = () => {
  return (
    <div style={{ paddingTop: '100px', minHeight: '80vh', paddingLeft: '24px', paddingRight: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="premium-badge flex-center" style={{ width: 'fit-content', margin: '0 auto 16px' }}>
          <Sparkles size={14} style={{ marginRight: '6px' }} /> INTERACTIVE SANDBOX
        </span>
        <h1 className="section-title text-gradient" style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
          NEXLY Code Lab
        </h1>
        <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Run Python, JavaScript, C, C++, and SQL instantly in an isolated, secure execution environment.
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
          <Code2 size={32} />
        </div>
        <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '8px' }}>Standalone Code Execution Sandbox</h3>
        <p style={{ color: 'rgba(255, 255, 255, 0.65)', maxWidth: '500px', margin: '0 auto 24px', fontSize: '0.95rem' }}>
          The Code Lab execution engine is currently being provisioned with multi-language execution and isolated SQL sandboxing in Phase 4.
        </p>
      </div>
    </div>
  );
};

export default CodeLabPage;
