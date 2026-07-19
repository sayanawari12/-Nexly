import React, { useEffect, useRef } from 'react';
import { useCompiler } from '../../context/CompilerContext';
import { Terminal, Copy, Trash2 } from 'lucide-react';

const OutputPanel = () => {
  const { outputMessage, executionState, clearOutput } = useCompiler();
  const result = executionState?.result;
  const preRef = useRef(null);

  // Auto scroll console container when logs change
  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [outputMessage]);

  const handleCopy = () => {
    if (outputMessage) {
      navigator.clipboard.writeText(outputMessage)
        .then(() => console.log('Console output copied to clipboard.'))
        .catch(err => console.error('Failed to copy console logs.', err));
    }
  };

  return (
    <div className="compiler-panel output-panel">
      <div className="compiler-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Terminal size={14} className="panel-header-icon" style={{ color: 'var(--accent-glow)' }} />
          <span>Terminal Output</span>
          
          {/* Status Badge Pill */}
          {result && (
            <span 
              className={`status-badge-pill status-${result.status}`}
              style={{
                fontSize: '0.66rem',
                padding: '2px 6px',
                borderRadius: '4px',
                marginLeft: '8px',
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '0.5px',
                background: result.status === 'accepted' 
                  ? 'rgba(16, 185, 129, 0.15)' 
                  : result.status === 'processing' 
                    ? 'rgba(245, 158, 11, 0.15)' 
                    : 'rgba(239, 68, 68, 0.15)',
                color: result.status === 'accepted' 
                  ? '#10b981' 
                  : result.status === 'processing' 
                    ? '#f59e0b' 
                    : '#ef4444',
                border: result.status === 'accepted'
                  ? '1px solid rgba(16, 185, 129, 0.3)'
                  : result.status === 'processing'
                    ? '1px solid rgba(245, 158, 11, 0.3)'
                    : '1px solid rgba(239, 68, 68, 0.3)',
                userSelect: 'none'
              }}
            >
              {result.status}
            </span>
          )}
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginRight: '4px' }}>
          <button 
            onClick={handleCopy} 
            title="Copy Console Output"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.2s'
            }}
          >
            <Copy size={13} />
          </button>
          <button 
            onClick={clearOutput} 
            title="Clear Console Logs"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
              borderRadius: '4px',
              transition: 'color 0.2s'
            }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
      <div className="compiler-panel-body" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 37px)' }}>
        <pre 
          ref={preRef}
          className="compiler-console-output" 
          id="compiler-output-pre" 
          style={{ flex: 1, overflowY: 'auto', margin: 0 }}
        >
          {outputMessage}
        </pre>
        {result && (result.time !== null || result.memory !== null) && (
          <div className="execution-stats" style={{ display: 'flex', gap: '16px', fontSize: '0.78rem', color: '#8a8a9d', marginTop: '12px', borderTop: '1px solid var(--border-primary)', paddingTop: '8px' }}>
            {result.time !== null && <span>⏱️ Time: {result.time}s</span>}
            {result.memory !== null && <span>💾 Memory: {result.memory} KB</span>}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
