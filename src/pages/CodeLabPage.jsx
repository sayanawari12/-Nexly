import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Code2, Play, Sparkles, ShieldCheck, Clock, Cpu, Square, AlertCircle, CheckCircle2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../services/codeExecutionService';
import { executeSqlQuery } from '../services/sqlSandboxService';
import {
  startInteractiveSession,
  sendInteractiveStdin,
  stopInteractiveSession
} from '../services/interactiveExecutionService';
import '../styles/global.css';

const formatErrorText = (err) => {
  if (!err) return 'Code execution failed.';
  if (typeof err === 'string') return err;
  if (typeof err.message === 'string') return err.message;
  if (typeof err.error === 'string') return err.error;
  if (typeof err.error?.message === 'string') return err.error.message;
  try {
    return JSON.stringify(err);
  } catch {
    return 'Code execution failed.';
  }
};

const CodeLabPage = () => {
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(SUPPORTED_LANGUAGES.python.defaultCode);
  
  // Interactive Terminal state
  const [terminalOutput, setTerminalOutput] = useState('');
  const [terminalInput, setTerminalInput] = useState('');
  const [execStatus, setExecStatus] = useState('IDLE'); // IDLE, CONNECTING, RUNNING, COMPLETED, TERMINATED, TIMED_OUT, ERROR
  const [execMeta, setExecMeta] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // SQL State
  const [sqlColumns, setSqlColumns] = useState([]);
  const [sqlRows, setSqlRows] = useState([]);

  const terminalEndRef = useRef(null);
  const terminalInputRef = useRef(null);

  // Auto-scroll terminal log to bottom on output change
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput, execStatus]);

  // Focus terminal input prompt when execution starts running
  useEffect(() => {
    if (execStatus === 'RUNNING' && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [execStatus]);

  // Clean up socket connection when unmounting component
  useEffect(() => {
    return () => {
      stopInteractiveSession();
    };
  }, []);

  // Handle language switch
  const handleLangChange = (langKey) => {
    stopInteractiveSession();
    setSelectedLang(langKey);
    setCode(SUPPORTED_LANGUAGES[langKey]?.defaultCode || '');
    setTerminalOutput('');
    setErrorMessage('');
    setSqlRows([]);
    setExecMeta(null);
    setExecStatus('IDLE');
  };

  // Run Code Handler
  const handleRunCode = async () => {
    setErrorMessage('');
    setSqlRows([]);
    setExecMeta(null);

    if (selectedLang === 'sql') {
      setExecStatus('RUNNING');
      try {
        const sqlRes = await executeSqlQuery(code, 'students');
        if (!sqlRes.success) {
          setErrorMessage(formatErrorText(sqlRes.error || 'SQL Query Execution Failed.'));
          setExecStatus('ERROR');
        } else {
          setSqlColumns(sqlRes.columns || []);
          setSqlRows(sqlRes.rows || []);
          setTerminalOutput(`Query executed successfully (${(sqlRes.rows || []).length} rows returned).`);
          setExecMeta({ timeMs: sqlRes.executionTimeMs || 0, memoryKb: 512 });
          setExecStatus('COMPLETED');
        }
      } catch (err) {
        setErrorMessage(`Execution Error: ${formatErrorText(err)}`);
        setExecStatus('ERROR');
      }
      return;
    }

    // Interactive Code Execution via Socket.IO
    setTerminalOutput('');
    setExecStatus('CONNECTING');

    startInteractiveSession({
      language: selectedLang,
      code,
      onStdout: (chunk) => {
        setTerminalOutput((prev) => prev + chunk);
      },
      onStderr: (chunk) => {
        setTerminalOutput((prev) => prev + chunk);
      },
      onExit: (result) => {
        const statusStr = result.status || (result.exitCode === 0 ? 'COMPLETED' : 'RUNTIME_ERROR');
        setExecStatus(statusStr);
        setExecMeta({
          timeMs: result.executionTimeMs || 0,
          memoryKb: result.memoryKb || 0,
        });
      },
      onError: (err) => {
        setErrorMessage(formatErrorText(err));
        setExecStatus('ERROR');
      },
      onStatusChange: (status) => {
        setExecStatus(status);
      },
    });
  };

  // Stop Execution Handler
  const handleStopExecution = () => {
    stopInteractiveSession();
    setExecStatus('TERMINATED');
    setTerminalOutput((prev) => prev + '\n[Process terminated by user]\n');
  };

  // Handle Terminal Input Submission (Enter key)
  const handleTerminalInputSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const inputVal = terminalInput;
      sendInteractiveStdin(inputVal);
      // Echo user input line visually into terminal
      setTerminalOutput((prev) => prev + inputVal + '\n');
      setTerminalInput('');
    }
  };

  const isRunning = execStatus === 'CONNECTING' || execStatus === 'RUNNING';

  const getStatusBadge = () => {
    switch (execStatus) {
      case 'CONNECTING':
        return <span style={{ color: '#fba518', fontSize: '0.78rem', fontWeight: '600' }}>● Connecting...</span>;
      case 'RUNNING':
        return <span style={{ color: '#22c55e', fontSize: '0.78rem', fontWeight: '600' }}>● Process Running</span>;
      case 'COMPLETED':
        return <span style={{ color: '#38bdf8', fontSize: '0.78rem', fontWeight: '600' }}><CheckCircle2 size={12} style={{ display: 'inline', marginRight: '4px' }} />Exited (0)</span>;
      case 'TERMINATED':
        return <span style={{ color: '#f87171', fontSize: '0.78rem', fontWeight: '600' }}>■ Terminated</span>;
      case 'TIMED_OUT':
        return <span style={{ color: '#fb923c', fontSize: '0.78rem', fontWeight: '600' }}>⏱ Timed Out (15s)</span>;
      case 'ERROR':
      case 'RUNTIME_ERROR':
      case 'COMPILE_ERROR':
        return <span style={{ color: '#ef4444', fontSize: '0.78rem', fontWeight: '600' }}><AlertCircle size={12} style={{ display: 'inline', marginRight: '4px' }} />Error</span>;
      default:
        return <span style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '0.78rem' }}>Idle</span>;
    }
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '90vh', paddingLeft: '20px', paddingRight: '20px', maxWidth: '1300px', margin: '0 auto' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="premium-badge flex-center" style={{ width: 'fit-content', marginBottom: '8px' }}>
            <Sparkles size={14} style={{ marginRight: '6px' }} /> INSTANT INTERACTIVE CODE LAB
          </span>
          <h1 className="section-title text-gradient" style={{ fontSize: '2rem', margin: 0 }}>
            NEXLY Interactive Terminal Sandbox
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

      {/* Editor & Terminal Console Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '20px', marginBottom: '40px' }}>
        
        {/* Left Column: Code Editor */}
        <div style={{ background: '#0B0B0B', border: '1px solid rgba(139, 92, 246, 0.25)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.88rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Code2 size={16} style={{ color: '#a855f7' }} />
              main.{selectedLang === 'python' ? 'py' : selectedLang === 'javascript' ? 'js' : selectedLang === 'sql' ? 'sql' : selectedLang === 'java' ? 'java' : selectedLang}
            </span>
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="btn-premium flex-center"
              style={{ fontSize: '0.82rem', padding: '8px 18px', borderRadius: '8px', opacity: isRunning ? 0.7 : 1 }}
            >
              <Play size={14} style={{ marginRight: '6px' }} />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{
              width: '100%',
              minHeight: '440px',
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
        </div>

        {/* Right Column: Interactive Terminal Output Console */}
        <div style={{ background: '#0B0B0B', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Terminal Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.05rem', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} style={{ color: '#c084fc' }} />
              Interactive Output Console
            </h3>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {getStatusBadge()}

              {isRunning && (
                <button
                  onClick={handleStopExecution}
                  style={{
                    background: 'rgba(239, 68, 68, 0.2)',
                    border: '1px solid rgba(239, 68, 68, 0.5)',
                    color: '#f87171',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Square size={12} fill="#f87171" /> Stop
                </button>
              )}

              {execMeta && (
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {execMeta.timeMs}ms</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Cpu size={12} /> {execMeta.memoryKb}KB</span>
                </div>
              )}
            </div>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#f87171', fontSize: '0.85rem', marginBottom: '16px' }}>
              {errorMessage}
            </div>
          )}

          {/* SQL Table Output */}
          {selectedLang === 'sql' && sqlRows.length > 0 ? (
            <div style={{ overflowX: 'auto', flex: 1 }}>
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
            /* Interactive Monospace Terminal Screen */
            <div style={{
              flex: 1,
              background: '#050505',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: "'Fira Code', 'Courier New', monospace",
              fontSize: '0.88rem',
              color: '#a7f3d0',
              overflowY: 'auto',
              minHeight: '340px',
              maxHeight: '460px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* Accumulated Terminal Output Stream */}
              <pre style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontFamily: 'inherit',
                color: terminalOutput ? '#a7f3d0' : 'rgba(255, 255, 255, 0.35)'
              }}>
                {terminalOutput || (execStatus === 'IDLE' ? 'Click "Run Code" to start an interactive terminal session.' : '')}
              </pre>

              {/* Active Terminal Stdin Prompt Line */}
              {execStatus === 'RUNNING' && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                  <span style={{ color: '#c084fc', marginRight: '6px', fontWeight: 'bold' }}>&gt;</span>
                  <input
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleTerminalInputSubmit}
                    placeholder="Type input and press Enter..."
                    style={{
                      flex: 1,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: '#ffffff',
                      fontFamily: "'Fira Code', 'Courier New', monospace",
                      fontSize: '0.88rem',
                      padding: 0
                    }}
                  />
                </div>
              )}

              <div ref={terminalEndRef} />
            </div>
          )}

          {/* Security & Isolation Status Info */}
          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} style={{ color: '#22c55e' }} /> Process Isolated Execution (Non-Root, 15s Cap)
            </span>
            <span>Batch API: Judge0 CE</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CodeLabPage;
