import React, { useState } from 'react';
import { Play, Terminal, Sparkles, Check, Copy } from 'lucide-react';
import { executeCode } from '../../services/codeExecutionService';

const SAMPLE_SNIPPETS = {
  python: {
    label: 'Python 3',
    code: '# Try running Python directly on the homepage!\ndef calculate_skills(hours):\n    return f"Skills Mastered: {hours * 2.5}%"\n\nprint("✦ NEXLY Execution Engine")\nprint(calculate_skills(10))'
  },
  javascript: {
    label: 'JavaScript',
    code: '// Instant JavaScript Runner\nconst techStack = ["Python", "JS", "SQL", "C"];\nconsole.log("Welcome to NEXLY!");\nconsole.log("Supported Stacks:", techStack.join(" · "));'
  },
  c: {
    label: 'C',
    code: '#include <stdio.h>\n\nint main() {\n    printf("✦ NEXLY Sandbox: C Code Execution\\n");\n    printf("Turn Curiosity Into Skills!\\n");\n    return 0;\n}'
  }
};

const LiveCodeSnippet = () => {
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(SAMPLE_SNIPPETS.python.code);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectLang = (langKey) => {
    setSelectedLang(langKey);
    setCode(SAMPLE_SNIPPETS[langKey].code);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Running snippet in isolated sandbox...');
    try {
      const res = await executeCode(selectedLang, code);
      setOutput(res.output || res.error || 'Execution finished.');
    } catch (e) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="live-demo" style={{ padding: '60px 24px', maxWidth: '1150px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span className="premium-badge flex-center" style={{ width: 'fit-content', margin: '0 auto 12px' }}>
          <Sparkles size={14} style={{ marginRight: '6px' }} /> LIVE 5-SECOND TRIAL
        </span>
        <h2 className="section-title text-gradient" style={{ fontSize: '2.2rem', marginBottom: '10px' }}>
          Try Running Code Right Now
        </h2>
        <p className="section-subtitle" style={{ maxWidth: '550px', margin: '0 auto' }}>
          No signup needed. Pick a language and execute code instantly directly on our homepage.
        </p>
      </div>

      <div style={{
        background: '#0B0B0B',
        border: '1px solid rgba(139, 92, 246, 0.3)',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(139, 92, 246, 0.15)'
      }}>
        {/* Header bar */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.03)',
          padding: '12px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {Object.keys(SAMPLE_SNIPPETS).map((langKey) => (
              <button
                key={langKey}
                onClick={() => handleSelectLang(langKey)}
                style={{
                  background: selectedLang === langKey ? 'var(--primary-purple)' : 'rgba(255, 255, 255, 0.05)',
                  color: selectedLang === langKey ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.82rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {SAMPLE_SNIPPETS[langKey].label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleCopy}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '6px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              {copied ? <Check size={14} style={{ color: '#22c55e' }} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleRun}
              disabled={isRunning}
              className="btn-premium flex-center"
              style={{ fontSize: '0.82rem', padding: '6px 16px', borderRadius: '6px' }}
            >
              <Play size={14} style={{ marginRight: '4px' }} />
              {isRunning ? 'Executing...' : 'Run Snippet'}
            </button>
          </div>
        </div>

        {/* Code + Console Body */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)', minHeight: '260px' }}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{
              width: '100%',
              background: 'transparent',
              color: '#f8fafc',
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: '0.9rem',
              lineHeight: '1.6',
              padding: '20px',
              border: 'none',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box'
            }}
          />

          <div style={{ padding: '20px', background: 'rgba(0, 0, 0, 0.5)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.78rem', fontWeight: '600', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} /> OUTPUT CONSOLE
            </div>
            <pre style={{
              flex: 1,
              color: output ? '#a7f3d0' : 'rgba(255, 255, 255, 0.4)',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.85rem',
              margin: 0,
              whiteSpace: 'pre-wrap'
            }}>
              {output || 'Click "Run Snippet" to execute code.'}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveCodeSnippet;
