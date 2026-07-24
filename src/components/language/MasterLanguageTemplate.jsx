import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { SiTypescript } from 'react-icons/si';
import { 
  Play, BookOpen, Clock, Target, CheckCircle2, Lock, Unlock, 
  Download, ArrowRight, Sparkles, Code, FileText, Binary, 
  Shield, Layers, ChevronRight, Check, Bot, Award, FileCode2, ExternalLink
} from 'lucide-react';
import StudentLayout from '../../layouts/StudentLayout';
import '../../styles/MasterLanguageTemplate.css';

const MasterLanguageTemplate = ({ data }) => {
  const navigate = useNavigate();
  const [downloadToast, setDownloadToast] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  if (!data) return null;

  const {
    id,
    name,
    title,
    tagline,
    difficulty,
    category,
    estimatedTime,
    totalModules,
    totalLessons,
    totalPrograms,
    svg,
    isIcon,
    nextLanguage,
    nextLanguageName,
    whyLearn = [],
    progress = {},
    roadmapNodes = [],
    modules = [],
    resources = [],
    practice = []
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
                    <Code size={16} /> Open Playground
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. LEARNING PROGRESS SECTION */}
          <div className="master-section-card progress-overview-card">
            <div className="progress-card-top">
              <div className="progress-title-box">
                <Target size={20} style={{ color: '#c084fc' }} />
                <div>
                  <h2 className="progress-card-heading">Your Learning Progress</h2>
                  <span className="progress-chapter-subtitle">{progress.currentChapter || 'Active Module'}</span>
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

          {/* 3. INTERACTIVE ROADMAP TIMELINE */}
          <div className="master-section-card">
            <div className="section-card-header">
              <h2 className="section-card-title">
                <Sparkles size={20} style={{ color: '#c084fc' }} /> Visual Learning Roadmap
              </h2>
              <span className="section-card-subtitle">Follow step-by-step milestones to master {name}.</span>
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
                      <span className="node-step-tag">Step 0{node.id}</span>
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
            
            {/* Left Column: Learning Modules & Practice */}
            <div className="master-main-col">
              
              {/* 4. LEARNING MODULES GRID CARDS */}
              <div className="master-section-card">
                <div className="section-card-header">
                  <h2 className="section-card-title">
                    <Layers size={20} style={{ color: '#60a5fa' }} /> Curriculum Modules
                  </h2>
                  <span className="section-card-subtitle">Structured modules for in-depth understanding.</span>
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

              {/* 6. PRACTICE SECTION */}
              <div className="master-section-card">
                <div className="section-card-header">
                  <h2 className="section-card-title">
                    <Code size={20} style={{ color: '#34d399' }} /> Practice & Playground Arena
                  </h2>
                  <span className="section-card-subtitle">Solve hands-on programming problems.</span>
                </div>

                <div className="practice-list">
                  {practice.length > 0 ? (
                    practice.map((p) => (
                      <div key={p.id} className="practice-item-row">
                        <div className="practice-item-left">
                          <FileCode2 size={18} className="practice-icon" />
                          <div>
                            <h4 className="practice-title">{p.title}</h4>
                            <span className={`practice-diff ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
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
                      <p>Multiple practice challenges available in the interactive playground.</p>
                      <button className="btn-master-primary" onClick={() => navigate('/code-editor')}>
                        Launch Playground
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Right Column: Why Learn, Resources, Related Languages & AI Tutor Slot */}
            <div className="master-side-col">

              {/* WHY LEARN THIS LANGUAGE */}
              {whyLearn.length > 0 && (
                <div className="master-section-card">
                  <h2 className="section-card-title" style={{ fontSize: '1.1rem' }}>
                    💡 Why Learn {name}?
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

              {/* 5. LEARNING RESOURCES */}
              <div className="master-section-card">
                <h2 className="section-card-title" style={{ fontSize: '1.1rem' }}>
                  <Download size={18} style={{ color: '#60a5fa' }} /> Study Resources & PDFs
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

              {/* 7. RELATED LANGUAGES & PATHWAYS */}
              <div className="master-section-card">
                <h2 className="section-card-title" style={{ fontSize: '1.1rem' }}>
                  🗺️ Suggested Learning Pathway
                </h2>
                <p className="pathway-desc">After mastering {name}, continue your engineering journey with:</p>

                <div 
                  className="related-lang-card"
                  onClick={() => navigate(`/roadmaps/programming/${nextLanguage || 'cpp'}`)}
                >
                  <div className="related-card-left">
                    <Sparkles size={20} style={{ color: '#c084fc' }} />
                    <div>
                      <h4 className="related-title">Next Language: {nextLanguageName || 'C++'}</h4>
                      <span className="related-sub">Expand your systems & OOP architecture</span>
                    </div>
                  </div>
                  <ChevronRight size={18} style={{ color: '#c084fc' }} />
                </div>
              </div>

              {/* FUTURE-READY SLOT: AI TUTOR ASSISTANT */}
              <div className="master-section-card ai-tutor-slot">
                <div className="ai-tutor-header">
                  <Bot size={22} style={{ color: '#c084fc' }} />
                  <div>
                    <h3 className="ai-tutor-title">BCA AI Code Tutor</h3>
                    <span className="ai-tutor-sub">Instant answers & code debugging</span>
                  </div>
                </div>
                <p className="ai-tutor-text">Stuck on a pointer or syntax error? Ask our AI assistant for step-by-step explanations.</p>
                <button className="btn-ai-tutor" onClick={() => alert("AI Code Assistant is ready! Ask your coding question.")}>
                  Ask AI Tutor <Sparkles size={14} />
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
