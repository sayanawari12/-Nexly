import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Play, Sparkles, RefreshCw, Layers, ShieldCheck, Clock, Cpu } from 'lucide-react';
import { SUPPORTED_LANGUAGES, executeCode } from '../services/codeExecutionService';
import { executeSqlQuery, SEEDED_DATABASES } from '../services/sqlSandboxService';
import '../styles/global.css';

const CodeLabPage = () => {
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(SUPPORTED_LANGUAGES.python.defaultCode);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [sqlColumns, setSqlColumns] = useState([]);
  const [sqlRows, setSqlRows] = useState([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [execMeta, setExecMeta] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle language switch and load default snippet
  const handleLangChange = (langKey) => {
    setSelectedLang(langKey);
    setCode(SUPPORTED_LANGUAGES[langKey]?.defaultCode || '');
    setOutput('');
    setErrorMessage('');
    setSqlRows([]);
    setExecMeta(null);
  };

  // Run Code / Execute Query handler
  const handleRunCode = async () => {
    setIsExecuting(true);
    setErrorMessage('');
    setOutput('Compiling and executing program in isolated sandbox environment...');
    setSqlRows([]);

    try {
      if (selectedLang === 'sql') {
        const sqlRes = await executeSqlQuery(code, 'students');
        if (!sqlRes.success) {
          setErrorMessage(sqlRes.error || 'SQL Query Execution Failed.');
          setOutput('');
        } else {
          setSqlColumns(sqlRes.columns);
          setSqlRows(sqlRes.rows);
          setOutput(`Query executed successfully (${sqlRes.rows.length} rows returned).`);
          setExecMeta({ timeMs: sqlRes.executionTimeMs, memoryKb: 512 });
        }
      } else {
        const res = await executeCode(selectedLang, code, stdin);
        if (res.error) {
          setErrorMessage(res.error);
          setOutput('');
        } else {
          setOutput(res.output);
          setExecMeta({ timeMs: res.executionTimeMs, memoryKb: res.memoryKb });
        }
      }
    } catch (err) {
      setErrorMessage(`Execution Error: ${err.message}`);
      setOutput('');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '90vh', paddingLeft: '20px', paddingRight: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="premium-badge flex-center" style={{ width: 'fit-content', marginBottom: '8px' }}>
            <Sparkles size={14} style={{ marginRight: '6px' }} /> INSTANT CODE LAB
          </span>
          <h1 className="section-title text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
            NEXLY Code Execution Sandbox
          </h1>
        </div>

        {/* Language Selector Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', background: '#0B0B0B', padding: '6px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          {Object.keys(SUPPORTED_LANGUAGES).map((langKey) => {
            const isActive = selectedLang === langKey;
            return (
              <button
                key={langKey}
                onClick={() => handleLangChange(langKey)}
                style={{
                  background: isActive ? 'var(--primary-purple)' : 'transparent',
                  color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textTransform: 'capitalize'
                }}
              >
                {langKey === 'cpp' ? 'C++' : langKey}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor & Console Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '20px', marginBottom: '40px' }}>
        {/* Left Column: Code Editor */}
        <div style={{ background: '#0B0B0B', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.88rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={16} style={{ color: '#a855f7' }} />
              main.{selectedLang === 'python' ? 'py' : selectedLang === 'javascript' ? 'js' : selectedLang === 'sql' ? 'sql' : selectedLang}
            </span>
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="btn-premium flex-center"
              style={{ fontSize: '0.82rem', padding: '8px 18px', borderRadius: '8px' }}
            >
              <Play size={14} style={{ marginRight: '6px' }} />
              {isExecuting ? 'Executing...' : 'Run Code'}
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{
              width: '100%',
              minHeight: '380px',
              background: 'transparent',
              color: '#f8fafc',
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: '0.95rem',
              lineHeight: '1.6',
              padding: '20px',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />

          {/* Stdin Panel */}
          {selectedLang !== 'sql' && (
            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', padding: '12px 20px', background: 'rgba(0, 0, 0, 0.4)' }}>
              <label style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.78rem', display: 'block', marginBottom: '6px', fontWeight: '600' }}>
                STANDARD INPUT (STDIN)
              </label>
              <input
                type="text"
                value={stdin}
                onChange={(e) => setStdin(e.target.value)}
                placeholder="Enter input values for program execution..."
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  padding: '8px 12px',
                  fontSize: '0.85rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          )}
        </div>

        {/* Right Column: Execution Output Console */}
        <div style={{ background: '#0B0B0B', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.05rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} style={{ color: '#c084fc' }} />
              Output Console
            </h3>

            {execMeta && (
              <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {execMeta.timeMs}ms</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Cpu size={12} /> {execMeta.memoryKb}KB</span>
              </div>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', marginBottom: '16px' }}>
              {errorMessage}
            </div>
          )}

          {/* SQL Result Table Grid */}
          {selectedLang === 'sql' && sqlRows.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#ffffff', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(168, 85, 247, 0.15)', textTransform: 'uppercase' }}>
                    {sqlColumns.map((col, idx) => (
                      <th key={idx} style={{ padding: '10px', textAlign: 'left', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sqlRows.map((row, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      {sqlColumns.map((col, cIdx) => (
                        <td key={cIdx} style={{ padding: '10px', color: 'rgba(255, 255, 255, 0.85)' }}>{row[col]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <pre style={{
              flex: 1,
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '16px',
              color: output ? '#a7f3d0' : 'rgba(255, 255, 255, 0.4)',
              fontFamily: "'Fira Code', monospace",
              fontSize: '0.88rem',
              whiteSpace: 'pre-wrap',
              margin: 0,
              overflowY: 'auto'
            }}>
              {output || 'Click "Run Code" to execute code in the sandbox.'}
            </pre>
          )}

          {/* Security & Rate Limit Info */}
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: '#22c55e' }} /> Sandboxed Execution Engine
            </span>
            <span>Rate Limit: 10 runs/min</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeLabPage;
