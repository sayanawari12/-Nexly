import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SiTypescript } from 'react-icons/si';
import { 
  Play, BookOpen, Clock, Target, CheckCircle2, Lock, Unlock, 
  Download, ArrowRight, Sparkles, Code, FileText, Binary, 
  Shield, Layers, ChevronRight, Check, Bot, Award, FileCode2, ExternalLink,
  Briefcase, Cpu, HelpCircle, FolderGit2, Star, CheckCircle, Terminal
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import { TECH_LOGOS } from '../sections/TechLogos';
import '../../styles/MasterLanguageTemplate.css';

const MasterLanguageTemplate = ({ data }) => {
  const navigate = useNavigate();
  const [downloadToast, setDownloadToast] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [activePracticeDiff, setActivePracticeDiff] = useState('All');

  if (!data) return null;

  const {
    id,
    name,
    title,
    tagline,
    difficulty,
    category,
    estimatedTime,
    prerequisites = 'None (Basic Computer Logic)',
    totalModules,
    totalLessons,
    totalPrograms,
    svg,
    isIcon,
    about = {},
    nextLanguage = 'cpp',
    nextLanguageName = 'C++',
    whyLearn = [],
    progress = {},
    roadmapNodes = [],
    modules = [],
    resources = [],
    practice = [],
    miniProjects = []
  } = data;

  const handleDownload = (resTitle) => {
    setDownloadToast(resTitle);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const getModuleIcon = (iconName) => {
    switch(iconName) {
      case 'FileText': return <FileText size={18} />;
      case 'Code': return <Code size={18} />;
      case 'Layers': return <Layers size={18} />;
      case 'Binary': return <Binary size={18} />;
      case 'Target': return <Target size={18} />;
      case 'Shield': return <Shield size={18} />;
      default: return <BookOpen size={18} />;
    }
  };

  // Filter practice items by difficulty tab
  const filteredPractice = useMemo(() => {
    if (activePracticeDiff === 'All') return practice;
    return practice.filter(p => p.difficulty.toLowerCase() === activePracticeDiff.toLowerCase());
  }, [practice, activePracticeDiff]);

  return (
    <StudentLayout>
      <div className="master-lang-wrapper">
        
        {/* Download Toast Notification */}
        <AnimatePresence>
          {downloadToast && (
            <motion.div 
              className="master-download-toast"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20 }}
            >
              <Check size={18} style={{ color: '#34d399' }} />
              <span>Downloading <strong>{downloadToast}</strong>...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="master-lang-container">

          {/* 1. HERO SECTION */}
          <div className="master-hero-card">
            <div className="master-hero-left">
              <div className="master-logo-box">
                {isIcon ? (
                  <SiTypescript size={48} style={{ color: '#3178C6' }} />
                ) : (
                  <div 
                    className="master-svg-render"
                    dangerouslySetInnerHTML={{ __html: svg }}
                  />
                )}
              </div>

              <div className="master-hero-details">
                <div className="master-hero-badges">
                  <span className={`master-diff-badge ${difficulty.toLowerCase().replace(/[^a-z]/g, '')}`}>
                    {difficulty}
                  </span>
                  <span className="master-cat-badge">{category}</span>
                  <span className="master-time-badge"><Clock size={12} /> {estimatedTime}</span>
                  <span className="master-prereq-badge"><HelpCircle size={12} /> Prerequisite: {prerequisites}</span>
                </div>

                <h1 className="master-hero-title">{title}</h1>
                <p className="master-hero-desc">{tagline}</p>

                {/* Primary & Secondary Action CTAs */}
                <div className="master-hero-actions">
                  <button 
                    className="btn-master-primary"
                    onClick={() => navigate('/code-editor')}
                    aria-label={`Start learning ${name}`}
                  >
                    <Play size={16} fill="currentColor" /> Continue Learning Journey <ArrowRight size={16} />
                  </button>

                  <button 
                    className="btn-master-secondary"
                    onClick={() => navigate('/code-editor')}
                    aria-label="Open Code Playground"
                  >
                    <Terminal size={16} /> Open C Compiler Playground
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. ABOUT LANGUAGE & CAREER RELEVANCE SECTION */}
          {about.what && (
            <div className="master-section-card about-lang-card">
              <div className="section-card-header">
                <h2 className="section-card-title">
                  <BookOpen size={20} style={{ color: '#c084fc' }} /> About {name} & Industry Scope
                </h2>
                <span className="section-card-subtitle">Understand what {name} is, where it is deployed, and why it matters.</span>
              </div>

              <div className="about-lang-grid">
                <div className="about-item-box">
                  <div className="about-item-header">
                    <Sparkles size={16} className="about-icon" />
                    <h3>What is {name}?</h3>
                  </div>
                  <p>{about.what}</p>
                </div>

                <div className="about-item-box">
                  <div className="about-item-header">
                    <Cpu size={16} className="about-icon" style={{ color: '#60a5fa' }} />
                    <h3>Where is {name} Used?</h3>
                  </div>
                  <p>{about.where}</p>
                </div>

                <div className="about-item-box">
                  <div className="about-item-header">
                    <Shield size={16} className="about-icon" style={{ color: '#34d399' }} />
                    <h3>Why Learn {name}?</h3>
                  </div>
                  <p>{about.why}</p>
                </div>

                <div className="about-item-box">
                  <div className="about-item-header">
                    <Briefcase size={16} className="about-icon" style={{ color: '#f59e0b' }} />
                    <h3>Career Opportunities</h3>
                  </div>
                  <p>{about.career}</p>
                </div>
              </div>
            </div>
          )}

          {/* 3. LEARNING PROGRESS SECTION */}
          <div className="master-section-card progress-overview-card">
            <div className="progress-card-top">
              <div className="progress-title-box">
                <Target size={20} style={{ color: '#c084fc' }} />
                <div>
                  <h2 className="progress-card-heading">Your Learning Progress</h2>
                  <span className="progress-chapter-subtitle">{progress.currentChapter || 'Active Milestone'}</span>
                </div>
              </div>
              <div className="progress-percent-display">{progress.percentage || 0}%</div>
            </div>

            {/* Progress Bar */}
            <div className="master-progress-bar-bg">
              <div className="master-progress-bar-fill" style={{ width: `${progress.percentage || 0}%` }} />
            </div>

            {/* Progress Metrics Grid */}
            <div className="progress-metrics-row">
              <div className="metric-chip">
                <CheckCircle2 size={15} style={{ color: '#34d399' }} />
                <span>{progress.completedModules || 0} Modules Completed</span>
              </div>
              <div className="metric-chip">
                <Clock size={15} style={{ color: '#60a5fa' }} />
                <span>{progress.remainingModules || 0} Modules Remaining</span>
              </div>
              <div className="metric-chip">
                <BookOpen size={15} style={{ color: '#c084fc' }} />
                <span>{totalLessons} Total Lessons</span>
              </div>
              <div className="metric-chip">
                <Code size={15} style={{ color: '#f59e0b' }} />
                <span>{totalPrograms} Code Exercises</span>
              </div>
            </div>
          </div>

          {/* 4. INTERACTIVE ROADMAP TIMELINE */}
          <div className="master-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <Sparkles size={20} style={{ color: '#c084fc' }} /> Interactive Learning Roadmap (20 Steps)
              </h2>
              <span className="section-card-subtitle">Follow step-by-step structured milestones to master {name}.</span>
            </div>

            <div className="roadmap-timeline-container">
              {roadmapNodes.map((node, idx) => (
                <div 
                  key={node.id} 
                  className={`timeline-step-node ${node.status}`}
                  onClick={() => setSelectedNode(node)}
                >
                  <div className="node-indicator">
                    {node.status === 'completed' && <CheckCircle2 size={18} />}
                    {node.status === 'current' && <Play size={16} fill="currentColor" />}
                    {node.status === 'unlocked' && <Unlock size={16} />}
                    {node.status === 'locked' && <Lock size={16} />}
                  </div>

                  <div className="node-content">
                    <div className="node-top-row">
                      <span className="node-step-tag">Step {node.id < 10 ? `0${node.id}` : node.id}</span>
                      <span className={`node-status-pill ${node.status}`}>
                        {node.status.toUpperCase()}
                      </span>
                    </div>
                    <h3 className="node-title">{node.title}</h3>
                    <p className="node-desc">{node.desc}</p>
                  </div>

                  <div className="node-arrow">
                    <ChevronRight size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Split Layout: Modules & Side Panels */}
          <div className="master-split-grid">
            
            {/* Left Column: Learning Modules, Practice & Mini Projects */}
            <div className="master-main-col">
              
              {/* 5. LEARNING MODULES GRID CARDS */}
              <div className="master-section-card">
                <div className="section-card-header">
                  <h2 className="section-card-title">
                    <Layers size={20} style={{ color: '#60a5fa' }} /> Curriculum Modules Grid
                  </h2>
                  <span className="section-card-subtitle">Structured course modules covering core computer science topics.</span>
                </div>

                <div className="modules-grid-container">
                  {modules.map((mod) => (
                    <div key={mod.id} className={`module-card-item ${mod.status}`}>
                      <div className="module-card-top">
                        <div className="module-icon-wrapper">
                          {getModuleIcon(mod.icon)}
                        </div>
                        <span className={`module-status-badge ${mod.status}`}>
                          {mod.status === 'completed' ? 'Completed' : mod.status === 'in_progress' ? 'In Progress' : mod.status === 'unlocked' ? 'Unlocked' : 'Locked'}
                        </span>
                      </div>

                      <div className="module-card-body">
                        <h3 className="module-name">{mod.name}</h3>
                        <div className="module-meta-info">
                          <span><BookOpen size={12} /> {mod.lessons} Lessons</span>
                          <span><Clock size={12} /> {mod.time}</span>
                        </div>
                      </div>

                      <button 
                        className={`btn-module-action ${mod.status}`}
                        onClick={() => navigate('/code-editor')}
                        disabled={mod.status === 'locked'}
                      >
                        {mod.status === 'completed' ? 'Review Module' : mod.status === 'in_progress' ? 'Continue Module' : mod.status === 'unlocked' ? 'Start Module' : 'Locked'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 6. PRACTICE SECTION WITH DIFFICULTY FILTERS */}
              <div className="master-section-card">
                <div className="section-card-header-flex">
                  <div>
                    <h2 className="section-card-title">
                      <Code size={20} style={{ color: '#34d399' }} /> Coding Exercises & Practice Arena
                    </h2>
                    <span className="section-card-subtitle">Hands-on problem sets categorized by difficulty.</span>
                  </div>

                  {/* Difficulty Tabs */}
                  <div className="practice-diff-tabs">
                    {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
                      <button
                        key={diff}
                        className={`practice-tab-btn ${activePracticeDiff === diff ? 'active' : ''}`}
                        onClick={() => setActivePracticeDiff(diff)}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="practice-list">
                  {filteredPractice.length > 0 ? (
                    filteredPractice.map((p) => (
                      <div key={p.id} className="practice-item-row">
                        <div className="practice-item-left">
                          <FileCode2 size={18} className="practice-icon" />
                          <div>
                            <h4 className="practice-title">{p.title}</h4>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span className={`practice-diff ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                              <span className="practice-status-chip">{p.status}</span>
                            </div>
                          </div>
                        </div>

                        <button 
                          className="btn-practice-action"
                          onClick={() => navigate('/code-editor')}
                        >
                          Solve Challenge <ChevronRight size={14} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="practice-empty">
                      <p>No practice problems matching "{activePracticeDiff}" difficulty filter.</p>
                      <button className="btn-master-primary" onClick={() => setActivePracticeDiff('All')}>
                        Show All Exercises
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* 7. MINI PROJECTS SECTION */}
              {miniProjects.length > 0 && (
                <div className="master-section-card">
                  <div className="section-card-header">
                    <h2 className="section-card-title">
                      <FolderGit2 size={20} style={{ color: '#f59e0b' }} /> Real-World Mini Projects
                    </h2>
                    <span className="section-card-subtitle">Apply your {name} knowledge by building real portfolio software.</span>
                  </div>

                  <div className="mini-projects-grid">
                    {miniProjects.map((proj) => (
                      <div key={proj.id} className="mini-project-card">
                        <div className="project-card-top">
                          <span className="project-badge">{proj.difficulty}</span>
                          <span className={`project-status-pill ${proj.status.toLowerCase().replace(/[^a-z]/g, '')}`}>
                            {proj.status}
                          </span>
                        </div>

                        <h3 className="project-title">{proj.title}</h3>
                        <p className="project-desc">{proj.desc}</p>

                        <button 
                          className="btn-project-action"
                          onClick={() => navigate('/code-editor')}
                        >
                          Build Project <ArrowRight size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Why Learn, Resources, Related Languages & AI Tutor Slot */}
            <div className="master-side-col">

              {/* WHY LEARN THIS LANGUAGE */}
              {whyLearn.length > 0 && (
                <div className="master-section-card">
                  <h2 className="section-card-title" style={{ fontSize: '1.1rem' }}>
                    💡 Key Learning Highlights
                  </h2>
                  <ul className="why-learn-list">
                    {whyLearn.map((reason, rIdx) => (
                      <li key={rIdx}>
                        <CheckCircle2 size={15} style={{ color: '#c084fc', flexShrink: 0 }} />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 8. LEARNING RESOURCES & BOOKS */}
              <div className="master-section-card">
                <h2 className="section-card-title" style={{ fontSize: '1.1rem' }}>
                  <Download size={18} style={{ color: '#60a5fa' }} /> Notes, PDFs & Reference Books
                </h2>

                <div className="resources-list">
                  {resources.map((res, resIdx) => (
                    <div key={resIdx} className="resource-item-box">
                      <div className="resource-item-left">
                        <div className="res-type-icon">{res.ext}</div>
                        <div>
                          <h4 className="res-title">{res.title}</h4>
                          <span className="res-meta">{res.size} • {res.type}</span>
                        </div>
                      </div>
                      <button 
                        className="res-dl-btn"
                        onClick={() => handleDownload(res.title)}
                        aria-label={`Download ${res.title}`}
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. RELATED LANGUAGES & SUGGESTED PATHWAYS */}
              <div className="master-section-card">
                <h2 className="section-card-title" style={{ fontSize: '1.1rem' }}>
                  🗺️ Related Languages & Pathways
                </h2>
                <p className="pathway-desc">After mastering {name}, upgrade your skill matrix with:</p>

                <div className="related-languages-stack">
                  <div 
                    className="related-lang-card"
                    onClick={() => navigate('/roadmaps/programming/cpp')}
                  >
                    <div className="related-card-left">
                      <div dangerouslySetInnerHTML={{ __html: TECH_LOGOS.cpp }} style={{ width: 22, height: 22 }} />
                      <div>
                        <h4 className="related-title">C++ Systems & OOP</h4>
                        <span className="related-sub">Object-Oriented Architecture & STL</span>
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: '#c084fc' }} />
                  </div>

                  <div 
                    className="related-lang-card"
                    onClick={() => navigate('/roadmaps/programming/java')}
                  >
                    <div className="related-card-left">
                      <div dangerouslySetInnerHTML={{ __html: TECH_LOGOS.java }} style={{ width: 22, height: 22 }} />
                      <div>
                        <h4 className="related-title">Java Enterprise Tech</h4>
                        <span className="related-sub">JVM Architecture & Spring Backend</span>
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: '#c084fc' }} />
                  </div>

                  <div 
                    className="related-lang-card"
                    onClick={() => navigate('/roadmaps/programming/python')}
                  >
                    <div className="related-card-left">
                      <div dangerouslySetInnerHTML={{ __html: TECH_LOGOS.python }} style={{ width: 22, height: 22 }} />
                      <div>
                        <h4 className="related-title">Python & AI Hub</h4>
                        <span className="related-sub">Data Science, Automation & Machine Learning</span>
                      </div>
                    </div>
                    <ChevronRight size={18} style={{ color: '#c084fc' }} />
                  </div>
                </div>
              </div>

              {/* FUTURE-READY SLOT: AI TUTOR ASSISTANT */}
              <div className="master-section-card ai-tutor-slot">
                <div className="ai-tutor-header">
                  <Bot size={22} style={{ color: '#c084fc' }} />
                  <div>
                    <h3 className="ai-tutor-title">BCA AI C Assistant</h3>
                    <span className="ai-tutor-sub">Pointers, memory & syntax helper</span>
                  </div>
                </div>
                <p className="ai-tutor-text">Stuck on segmentation faults or pointer dereferencing? Ask our AI code tutor for instant step-by-step explanations.</p>
                <button className="btn-ai-tutor" onClick={() => alert("AI Code Assistant is ready! Ask your C programming question.")}>
                  Ask AI Code Tutor <Sparkles size={14} />
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default MasterLanguageTemplate;
