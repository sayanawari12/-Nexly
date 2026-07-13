import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, CheckCircle, Clock, BookOpen, 
  Terminal, Copy, Check, ChevronLeft, ChevronRight,
  Code2, FileText, HelpCircle, Activity, Play, List
} from 'lucide-react';
import { useProgram } from '../context/ProgramContext';
import StudentLayout from '../layouts/StudentLayout';
import { getRelatedPrograms } from '../services/program/programService';
import '../styles/ProgramViewerPage.css';

const SUBJECT_MAP = {
  'c-programming': 'C Programming',
  'cpp': 'C++',
  'java': 'Java',
  'python': 'Python',
  'data-structures': 'Data Structures',
  'operating-system': 'Operating System',
  'dbms': 'DBMS',
  'computer-networks': 'Computer Networks'
};

const ProgramViewerPage = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const { 
    programs, 
    filteredPrograms, 
    bookmarkedIds, 
    completedIds, 
    selectProgram, 
    currentProgram, 
    toggleBookmark, 
    toggleCompletion,
    loading 
  } = useProgram();

  const [activeTab, setActiveTab] = useState('problem');
  const [copied, setCopied] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sync route param into context
  useEffect(() => {
    if (programId && programs.length > 0) {
      selectProgram(programId);
    }
  }, [programId, programs, selectProgram]);

  // Handle copy action
  const handleCopyCode = () => {
    if (currentProgram && currentProgram.code) {
      navigator.clipboard.writeText(currentProgram.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Compute pagination indexes in the current filtered subset
  const pagination = useMemo(() => {
    const list = filteredPrograms.length > 0 ? filteredPrograms : programs;
    const index = list.findIndex(p => p.id === programId);
    return {
      index,
      total: list.length,
      prev: index > 0 ? list[index - 1] : null,
      next: index < list.length - 1 ? list[index + 1] : null
    };
  }, [filteredPrograms, programs, programId]);

  // Related programs
  const relatedList = useMemo(() => {
    return getRelatedPrograms(currentProgram, programs);
  }, [currentProgram, programs]);

  if (loading || !currentProgram) {
    return (
      <StudentLayout>
        <div className="viewer-loading-container">
          <div className="skeleton-header"></div>
          <div className="skeleton-split">
            <div className="skeleton-left"></div>
            <div className="skeleton-right"></div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  const isBookmarked = bookmarkedIds.has(currentProgram.id);
  const isCompleted = completedIds.has(currentProgram.id);

  let diffClass = 'diff-easy';
  if (currentProgram.difficulty === 'Medium') diffClass = 'diff-medium';
  else if (currentProgram.difficulty === 'Hard') diffClass = 'diff-hard';

  return (
    <StudentLayout>
      <div className="viewer-wrapper">
        <div className={`viewer-container-split ${sidebarOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
          
          {/* Collapsible Left Programs list Sidebar */}
          <aside className="viewer-sidebar">
            <div className="sidebar-header">
              <span className="sidebar-heading">Programs List</span>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="btn-toggle-sidebar"
                title="Collapse sidebar"
              >
                <ChevronLeft size={16} />
              </button>
            </div>
            
            <div className="sidebar-list-scroll">
              {(filteredPrograms.length > 0 ? filteredPrograms : programs).map((p) => {
                const isSelected = p.id === programId;
                const isDone = completedIds.has(p.id);
                return (
                  <button
                    key={p.id}
                    onClick={() => navigate(`/practice/programs/${p.id}`)}
                    className={`sidebar-item-btn ${isSelected ? 'active' : ''}`}
                  >
                    <div className="item-title-col">
                      <span className="item-title">{p.title}</span>
                      <span className="item-meta">{SUBJECT_MAP[p.subject]}</span>
                    </div>
                    {isDone && <CheckCircle size={14} className="completion-checked-icon" />}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Main Viewer Body */}
          <div className="viewer-main-body">
            
            {/* Sidebar toggle button (if collapsed) */}
            {!sidebarOpen && (
              <button 
                onClick={() => setSidebarOpen(true)}
                className="btn-float-open-sidebar"
                title="Expand programs sidebar"
              >
                <List size={18} />
              </button>
            )}

            {/* Sticky Header Nav Bar */}
            <header className="viewer-sticky-header">
              <div className="header-left">
                <button 
                  onClick={() => navigate('/practice')}
                  className="btn-back-hub"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                
                <div className="header-program-info">
                  <div className="header-title-row">
                    <h2 className="header-program-title">{currentProgram.title}</h2>
                    <span className={`diff-badge ${diffClass}`}>{currentProgram.difficulty}</span>
                  </div>
                  <div className="header-meta-row">
                    <span className="header-meta"><Clock size={12} /> {currentProgram.estimatedTime}</span>
                    <span className="header-meta"><BookOpen size={12} /> {currentProgram.category}</span>
                  </div>
                </div>
              </div>

              {/* Actions toggle */}
              <div className="header-actions">
                <button 
                  onClick={() => toggleBookmark(currentProgram.id)}
                  className={`btn-action-outline btn-bookmark ${isBookmarked ? 'bookmarked' : ''}`}
                >
                  <Star size={16} fill={isBookmarked ? '#fbbf24' : 'none'} /> 
                  <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                </button>
                
                <button 
                  onClick={() => toggleCompletion(currentProgram.id)}
                  className={`btn-action-complete ${isCompleted ? 'completed' : ''}`}
                >
                  <CheckCircle size={16} fill={isCompleted ? '#fff' : 'none'} />
                  <span>{isCompleted ? 'Completed' : 'Mark Completed'}</span>
                </button>
              </div>
            </header>

            {/* Split content columns */}
            <div className="viewer-content-split">
              
              {/* Left Column: Problem details, Algorithm & explanation tabs */}
              <article className="viewer-left-panel">
                <nav className="tab-menu">
                  <button 
                    onClick={() => setActiveTab('problem')}
                    className={`tab-btn ${activeTab === 'problem' ? 'active' : ''}`}
                  >
                    <FileText size={14} /> Problem
                  </button>
                  <button 
                    onClick={() => setActiveTab('algorithm')}
                    className={`tab-btn ${activeTab === 'algorithm' ? 'active' : ''}`}
                  >
                    <Activity size={14} /> Algorithm
                  </button>
                  <button 
                    onClick={() => setActiveTab('explanation')}
                    className={`tab-btn ${activeTab === 'explanation' ? 'active' : ''}`}
                  >
                    <HelpCircle size={14} /> Explanation
                  </button>
                </nav>

                <div className="tab-content-area scroll-y">
                  {activeTab === 'problem' && (
                    <div className="tab-pane-content fade-in">
                      <section className="pane-section">
                        <h3 className="section-title">Description</h3>
                        <p className="description-text">{currentProgram.description}</p>
                      </section>

                      <section className="pane-section">
                        <h3 className="section-title">Problem Statement</h3>
                        <div className="problem-statement-box">
                          {currentProgram.problemStatement}
                        </div>
                      </section>

                      <section className="pane-section">
                        <h3 className="section-title">Complexity Analysis</h3>
                        <div className="complexity-grid">
                          <div className="complexity-item">
                            <span className="complexity-label">Time Complexity</span>
                            <span className="complexity-val">{currentProgram.timeComplexity || 'O(1)'}</span>
                          </div>
                          <div className="complexity-item">
                            <span className="complexity-label">Space Complexity</span>
                            <span className="complexity-val">{currentProgram.spaceComplexity || 'O(1)'}</span>
                          </div>
                        </div>
                      </section>

                      <section className="pane-section">
                        <h3 className="section-title">Related Programs</h3>
                        <div className="related-programs-list">
                          {relatedList.length > 0 ? (
                            relatedList.map(p => (
                              <button
                                key={p.id}
                                onClick={() => navigate(`/practice/programs/${p.id}`)}
                                className="related-item-btn"
                              >
                                <span className="related-title">{p.title}</span>
                                <span className="related-subject">{SUBJECT_MAP[p.subject]}</span>
                              </button>
                            ))
                          ) : (
                            <p className="no-related-text">No related programs found.</p>
                          )}
                        </div>
                      </section>
                    </div>
                  )}

                  {activeTab === 'algorithm' && (
                    <div className="tab-pane-content fade-in">
                      <h3 className="section-title">Step-by-Step Logic Flow</h3>
                      <div className="algorithm-steps-box">
                        {currentProgram.algorithm ? (
                          <pre className="algorithm-text">{currentProgram.algorithm}</pre>
                        ) : (
                          <p>No algorithm detail defined for this program.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'explanation' && (
                    <div className="tab-pane-content fade-in">
                      <h3 className="section-title">Logic and Outputs Interpretation</h3>
                      <div className="explanation-box">
                        <p className="explanation-text">{currentProgram.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {/* Right Column: Code Viewer and expected outputs */}
              <article className="viewer-right-panel">
                
                {/* Code Window Header */}
                <div className="panel-header-row">
                  <div className="panel-title-group">
                    <Code2 size={16} className="code-icon" />
                    <span>Source Code</span>
                  </div>
                  <button 
                    onClick={handleCopyCode}
                    className="btn-copy-code"
                    title="Copy code to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check size={14} style={{ color: '#10b981' }} />
                        <span style={{ color: '#10b981' }}>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Main Code block */}
                <div className="code-editor-area scroll-y">
                  <pre className="code-pre-box">
                    <code className="code-code-box">{currentProgram.code}</code>
                  </pre>
                </div>

                {/* Console Outputs area */}
                <div className="console-output-area">
                  <div className="console-header">
                    <Terminal size={14} />
                    <span>Expected Terminal Output</span>
                  </div>
                  <div className="console-screen">
                    <pre className="console-text">{currentProgram.output}</pre>
                  </div>
                </div>

              </article>

            </div>

            {/* Bottom sequential navigation bar */}
            <footer className="viewer-footer-nav">
              <div className="footer-nav-inner">
                {pagination.prev ? (
                  <button 
                    onClick={() => navigate(`/practice/programs/${pagination.prev.id}`)}
                    className="nav-page-btn"
                  >
                    <ChevronLeft size={16} /> Previous: {pagination.prev.title}
                  </button>
                ) : (
                  <div className="nav-page-btn disabled">
                    <ChevronLeft size={16} /> Start of list
                  </div>
                )}

                <span className="pagination-count">
                  {pagination.index + 1} of {pagination.total}
                </span>

                {pagination.next ? (
                  <button 
                    onClick={() => navigate(`/practice/programs/${pagination.next.id}`)}
                    className="nav-page-btn"
                  >
                    Next: {pagination.next.title} <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="nav-page-btn disabled">
                    End of list <ChevronRight size={16} />
                  </div>
                )}
              </div>
            </footer>

          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default ProgramViewerPage;
