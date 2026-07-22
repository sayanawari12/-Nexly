import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ContestContext } from '../context/ContestContext';
import { 
  ArrowLeft, Play, Send, History, HelpCircle, Maximize2, Minimize2, 
  Settings, Clock, Sparkles, Terminal, BookOpen, AlertCircle 
} from 'lucide-react';
import SubmissionTable from '../components/contest/SubmissionTable';
import * as contestService from '../services/contestService';
import '../styles/ContestComponents.css';
import '../styles/ContestArena.css';

const ContestProblemArena = () => {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();

  const {
    activeContest,
    selectContest,
    contestProblems,
    submissions,
    fetchSubmissionHistory,
    submitCode,
    askClarification,
  } = useContext(ContestContext);

  // States
  const [problem, setProblem] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [code, setCode] = useState('');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [stdin, setStdin] = useState('');
  
  // Execution Outputs
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [activeConsoleTab, setActiveConsoleTab] = useState('input'); // 'input' | 'output' | 'history'
  const [consoleOutput, setConsoleOutput] = useState(null);

  // Resizing split view state
  const [leftWidth, setLeftWidth] = useState(40); // in percentage
  const isResizing = useRef(false);
  const containerRef = useRef(null);

  // Load contest details and compiler list
  useEffect(() => {
    selectContest(contestId);
    
    // Fetch active compilers
    const loadCompilers = async () => {
      try {
        const activeLangs = await contestService.getLanguages();
        setLanguages(activeLangs);
        
        // Auto-select Python or C++ as fallback
        if (activeLangs.length > 0) {
          const defaultLang = activeLangs.find(l => l.fileExtension === 'py' || l.displayName.toLowerCase().includes('python')) || activeLangs[0];
          setSelectedLanguage(defaultLang);
        }
      } catch (err) {
        console.error('Failed to load active compilers list:', err);
      }
    };
    
    loadCompilers();
    return () => selectContest(null);
  }, [contestId, selectContest]);

  // Set the specific problem details
  useEffect(() => {
    if (contestProblems.length > 0) {
      const targetProb = contestProblems.find(p => p.id === problemId);
      setProblem(targetProb || null);
      if (targetProb) {
        fetchSubmissionHistory(problemId);
      }
    }
  }, [contestProblems, problemId, fetchSubmissionHistory]);

  // Draft recovery & auto-save
  useEffect(() => {
    if (!problem || !selectedLanguage) return;
    
    const draftKey = `apex_draft:${contestId}:${problemId}:${selectedLanguage.id}`;
    const savedDraft = localStorage.getItem(draftKey);
    
    if (savedDraft) {
      setCode(savedDraft);
    } else {
      // Set boilerplate logic
      const monacoName = selectedLanguage.fileExtension;
      if (monacoName === 'py') {
        setCode('print("Hello, World!")');
      } else if (monacoName === 'cpp') {
        setCode('#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}');
      } else if (monacoName === 'c') {
        setCode('#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}');
      } else if (monacoName === 'java') {
        setCode('public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}');
      } else {
        setCode('// Write your solution code here');
      }
    }
  }, [problem, selectedLanguage, contestId, problemId]);

  // Auto-save loop (every 3 seconds)
  useEffect(() => {
    if (!problem || !selectedLanguage || !code) return;
    
    const draftKey = `apex_draft:${contestId}:${problemId}:${selectedLanguage.id}`;
    const interval = setInterval(() => {
      localStorage.setItem(draftKey, code);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [code, selectedLanguage, problem, contestId, problemId]);

  // Keyboard Shortcuts (Ctrl+Enter / Ctrl+Alt+S)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+Enter or Cmd+Enter -> Run Code
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleRunCode();
      }
      // Ctrl+Alt+S -> Submit solution
      if ((e.ctrlKey || e.metaKey) && e.altKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSubmitCode();
      }
      // Ctrl+S -> Save Draft
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (selectedLanguage) {
          const draftKey = `apex_draft:${contestId}:${problemId}:${selectedLanguage.id}`;
          localStorage.setItem(draftKey, code);
          alert('Draft Saved Successfully.');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [code, selectedLanguage, contestId, problemId]);

  // Split View Resizing logic
  const handleMouseDown = () => {
    isResizing.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isResizing.current || !containerRef.current) return;
    const containerWidth = containerRef.current.getBoundingClientRect().width;
    const clientX = e.clientX;
    const newLeftWidth = (clientX / containerWidth) * 100;
    
    if (newLeftWidth > 20 && newLeftWidth < 70) {
      setLeftWidth(newLeftWidth);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Run Code logic (compile and test offline)
  const handleRunCode = async () => {
    if (!selectedLanguage) return;
    setRunning(true);
    setActiveConsoleTab('output');
    setConsoleOutput({ status: 'PENDING', stdout: 'Enqueuing execution job...' });

    try {
      const submission = await contestService.runCode(problem.id, code, selectedLanguage.id, stdin);
      if (submission) {
        pollStatus(submission.id);
      }
    } catch (err) {
      setConsoleOutput({
        status: 'FAILED',
        stderr: err.response?.data?.message || err.message || 'Compilation execution enqueuing failed.'
      });
      setRunning(false);
    }
  };

  // Submit Code logic
  const handleSubmitCode = async () => {
    if (!selectedLanguage) return;
    setSubmitting(true);
    setActiveConsoleTab('output');
    setConsoleOutput({ status: 'PENDING', stdout: 'Submitting solution code...' });

    try {
      const submission = await submitCode(problem.id, code, selectedLanguage.id);
      if (submission) {
        pollStatus(submission.id, true);
      }
    } catch (err) {
      setConsoleOutput({
        status: 'FAILED',
        stderr: err.response?.data?.message || err.message || 'Submission failed.'
      });
      setSubmitting(false);
    }
  };

  // Polling helper
  const pollStatus = (subId, isSubmission = false) => {
    let attempts = 0;
    const maxAttempts = 30;
    
    const interval = setInterval(async () => {
      attempts++;
      try {
        const result = await contestService.getSubmissionStatus(subId);
        
        if (result && result.status !== 'PENDING' && result.status !== 'PROCESSING') {
          clearInterval(interval);
          setConsoleOutput({
            status: result.status,
            stdout: result.runtimeOutput || '',
            stderr: result.compileOutput || '',
            executionTime: result.executionTime,
            memoryUsage: result.memoryUsage
          });
          
          if (isSubmission) {
            setSubmitting(false);
            // Refresh submissions tab
            fetchSubmissionHistory(problem.id);
          } else {
            setRunning(false);
          }
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
      
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        setConsoleOutput({ status: 'TIMEOUT', stderr: 'Execution monitoring timed out.' });
        if (isSubmission) setSubmitting(false);
        else setRunning(false);
      }
    }, 1500);
  };

  const handleBackToContest = () => {
    navigate(`/contests/${contestId}`);
  };

  if (!problem) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', color: 'var(--accent-glow)' }}>
        Loading Problem Arena...
      </div>
    );
  }

  const alphabetIndex = String.fromCharCode(65 + (contestProblems.findIndex(p => p.id === problemId) || 0));

  return (
    <div className={`arena-page-wrapper ${isFullscreen ? 'fullscreen-mode' : ''}`} ref={containerRef}>
      {/* 1. Header Toolbar */}
      <div className="arena-toolbar">
        <button onClick={handleBackToContest} className="btn-back">
          <ArrowLeft size={14} /> <span>Contest Dashboard</span>
        </button>

        <div className="toolbar-center">
          <Sparkles size={16} className="text-gradient-purple" />
          <span className="problem-title-display">
            Problem {alphabetIndex}: {problem.title}
          </span>
        </div>

        <div className="toolbar-controls">
          {/* Language Selector */}
          <div className="control-group">
            <Settings size={14} className="control-icon" />
            <select
              value={selectedLanguage?.id || ''}
              onChange={(e) => {
                const selected = languages.find(l => l.id === e.target.value);
                setSelectedLanguage(selected);
              }}
              className="arena-select"
            >
              {languages.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* FontSize controls */}
          <div className="control-group">
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="arena-select font-size-select"
            >
              <option value={12}>12px</option>
              <option value={14}>14px</option>
              <option value={16}>16px</option>
              <option value={18}>18px</option>
            </select>
          </div>

          {/* Theme Selector */}
          <div className="control-group">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="arena-select theme-select"
            >
              <option value="vs-dark">Dark Mode</option>
              <option value="light">Light Mode</option>
            </select>
          </div>

          <button onClick={() => setIsFullscreen(!isFullscreen)} className="btn-icon-action" title="Toggle Fullscreen">
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      {/* 2. Core Workspace Splits */}
      <div className="arena-split-container">
        {/* Left Pane - Problem Description */}
        <div className="arena-left-pane" style={{ width: `${leftWidth}%` }}>
          <div className="panel-inner-container">
            <div className="pane-header">
              <BookOpen size={16} />
              <h4>Problem Description</h4>
            </div>

            <div className="pane-scroll-content markdown-body" style={{ padding: '20px' }}>
              <div className="problem-description-text" style={{ fontSize: '14px', lineHeight: '1.7', whiteSpace: 'pre-wrap', color: 'rgba(255,255,255,0.9)' }}>
                {problem.description}
              </div>

              {/* Examples block */}
              {problem.examples && (
                <div className="problem-examples-section" style={{ marginTop: '24px' }}>
                  <h5 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', color: 'var(--accent-glow)', marginBottom: '12px' }}>Examples</h5>
                  <pre style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)', padding: '12px', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
                    {problem.examples}
                  </pre>
                </div>
              )}

              {/* Constraints block */}
              {problem.constraints && (
                <div className="problem-constraints-section" style={{ marginTop: '24px' }}>
                  <h5 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', color: 'var(--accent-glow)', marginBottom: '12px' }}>Constraints</h5>
                  <pre style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-primary)', padding: '12px', borderRadius: '8px', fontSize: '13px', fontFamily: 'monospace' }}>
                    {problem.constraints}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resizing Gutter slider */}
        <div className="arena-resize-gutter" onMouseDown={handleMouseDown} />

        {/* Right Pane - IDE and Console logs splits */}
        <div className="arena-right-pane" style={{ width: `${100 - leftWidth}%` }}>
          {/* Code Editor Wrapper */}
          <div className="arena-editor-wrapper">
            <textarea
              className="arena-code-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Write your solution here..."
              style={{
                width: '100%',
                height: '100%',
                background: '#0d0d15',
                color: '#f4f4f5',
                fontFamily: 'Fira Code, monospace',
                fontSize: `${fontSize}px`,
                padding: '16px',
                border: 'none',
                outline: 'none',
                resize: 'none',
                lineHeight: '1.6'
              }}
            />
          </div>

          {/* Bottom Pane - Interactive Console Console Logs */}
          <div className="arena-console-wrapper">
            <div className="console-header-tabs">
              <button 
                onClick={() => setActiveConsoleTab('input')} 
                className={`console-tab ${activeConsoleTab === 'input' ? 'active' : ''}`}
              >
                Custom Input (stdin)
              </button>
              <button 
                onClick={() => setActiveConsoleTab('output')} 
                className={`console-tab ${activeConsoleTab === 'output' ? 'active' : ''}`}
              >
                Execution Result
              </button>
              <button 
                onClick={() => setActiveConsoleTab('history')} 
                className={`console-tab ${activeConsoleTab === 'history' ? 'active' : ''}`}
              >
                Submissions ({submissions.length})
              </button>

              <div className="console-actions-row">
                <button onClick={handleRunCode} className="btn-run" disabled={running || submitting}>
                  <Play size={12} style={{ marginRight: '6px' }} /> {running ? 'Running...' : 'Run Code'}
                </button>
                <button onClick={handleSubmitCode} className="btn-submit" disabled={running || submitting}>
                  <Send size={12} style={{ marginRight: '6px' }} /> {submitting ? 'Submitting...' : 'Submit Code'}
                </button>
              </div>
            </div>

            <div className="console-content-body">
              {activeConsoleTab === 'input' && (
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Provide input arguments to inject into stdin parameters..."
                  className="console-stdin-textarea"
                />
              )}

              {activeConsoleTab === 'output' && (
                <div className="console-output-scroll">
                  {!consoleOutput ? (
                    <div className="empty-console-state">
                      <Terminal size={24} style={{ opacity: 0.15, marginBottom: '6px' }} />
                      <p>Run or Submit code to see output results here.</p>
                    </div>
                  ) : (
                    <div className="output-body">
                      <div className="output-status-header">
                        <span className="status-label">Verdict: </span>
                        <span className={`verdict-badge verdict-${consoleOutput.status.toLowerCase()}`}>
                          {consoleOutput.status}
                        </span>
                      </div>
                      
                      {consoleOutput.executionTime !== undefined && (
                        <div className="stats-row" style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '8px 0' }}>
                          <span>Time: {consoleOutput.executionTime} ms</span>
                          <span style={{ margin: '0 10px' }}>|</span>
                          <span>Memory: {consoleOutput.memoryUsage} KB</span>
                        </div>
                      )}

                      {consoleOutput.stderr && (
                        <div className="log-block err-log">
                          <h6>Compilation/Runtime Log:</h6>
                          <pre>{consoleOutput.stderr}</pre>
                        </div>
                      )}

                      {consoleOutput.stdout && (
                        <div className="log-block standard-log">
                          <h6>Standard Output (stdout):</h6>
                          <pre>{consoleOutput.stdout}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeConsoleTab === 'history' && (
                <div className="console-output-scroll">
                  <SubmissionTable submissions={submissions} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestProblemArena;
