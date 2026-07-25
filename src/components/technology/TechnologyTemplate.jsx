import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Map, BookOpen, Code2, Terminal, HelpCircle, Trophy,
  Briefcase, Download, Lock, ChevronDown, ChevronUp, Clock,
  CheckCircle, Copy, Bookmark, BarChart2, Zap, Star, Users,
  Lightbulb, Target, Layers, Globe, Database, Award, AlertTriangle,
  Info, TrendingUp, FileText, FolderOpen, RotateCcw, ArrowRight,
  Check, X, Eye, EyeOff, Search, Compass, Braces, GitFork, Sliders
} from 'lucide-react';

import Button from '../ui/Button';
import GlassPanel from '../ui/GlassPanel';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import StickyTabs from '../ui/StickyTabs';
import SectionTitle from '../ui/SectionTitle';
import Breadcrumb from '../ui/Breadcrumb';
import { DESIGN_TOKENS } from '../../styles/design-tokens';
import '../../styles/TechnologyTemplate.css';

export const TechnologyTemplate = ({
  languageId = 'c',
  languageName = 'C',
  title = 'C Programming',
  subtitle = 'Beginner to Advanced',
  description = 'Learn C from scratch to advanced — pointers, memory management, data structures, algorithms, and system-level programming.',
  badgeText = 'C LANGUAGE',
  logoSvg,
  logoComponent: LogoComponent,
  stats = [
    { val: '45+', label: 'Lessons' },
    { val: '120+', label: 'Programs' },
    { val: '9+', label: 'Projects' },
    { val: '30+', label: 'Quizzes' },
    { val: '60+', label: 'Interview Qs' }
  ],
  aboutData = {
    title: 'About C Programming',
    description: 'C is a general-purpose, procedural programming language developed by Dennis Ritchie at Bell Labs in 1972. It was designed to develop the UNIX operating system and remains one of the most influential languages ever created.',
    subDescription: 'Often called the "mother of all programming languages," C influenced C++, Java, Python, Go, and Rust. It provides direct low-level memory access and extreme execution performance.',
    topics: [
      { id: 1, name: 'Pointers & Memory' },
      { id: 2, name: 'Structures & Unions' },
      { id: 3, name: 'Dynamic Allocation' },
      { id: 4, name: 'File Handling & I/O' }
    ]
  },
  lessonsData = [],
  programsData = [],
  quizzesData = {},
  interviewData = [],
  downloadsData = [],
  projectsData = [],
  roadmapNodesData = [],
  customTabRenderers = {}
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [downloadToast, setDownloadToast] = useState(null);

  // Viewport Reading Scroll Progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownload = (fileTitle) => {
    setDownloadToast(fileTitle);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const TABS = [
    { id: 'overview', label: 'Overview', icon: <BookOpen size={15} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={15} /> },
    { id: 'lessons', label: 'Lessons', icon: <BookOpen size={15} /> },
    { id: 'programs', label: 'Programs', icon: <Code2 size={15} /> },
    { id: 'practice', label: 'Coding Practice', icon: <Terminal size={15} /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle size={15} /> },
    { id: 'projects', label: 'Projects', icon: <Trophy size={15} /> },
    { id: 'interview', label: 'Interview Qs', icon: <Briefcase size={15} /> },
    { id: 'downloads', label: 'Downloads', icon: <Download size={15} /> },
  ];

  return (
    <div className="tech-template-wrapper">
      {/* Top Viewport Reading Progress Bar */}
      <div 
        className="tech-template-progress-bar"
        style={{ width: `${scrollProgress}%` }} 
      />

      {/* Download Toast Notification */}
      <AnimatePresence>
        {downloadToast && (
          <motion.div 
            className="tech-download-toast"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <Check size={18} style={{ color: '#34d399' }} />
            <span>Downloading <strong>{downloadToast}</strong>...</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="tech-template-container">
        
        {/* Breadcrumbs Navigation */}
        <Breadcrumb 
          items={[
            { label: 'Tech Stack', onClick: () => navigate('/#technologies') },
            { label: `${languageName} Language`, active: true }
          ]}
        />

        {/* ── 3-COLUMN HERO BANNER ── */}
        <div className="tech-hero-card glass-card">
          <div className="tech-hero-inner">
            
            {/* Left: Large Technology Logo */}
            <div className="tech-logo-box">
              {LogoComponent ? (
                <LogoComponent />
              ) : logoSvg ? (
                <div dangerouslySetInnerHTML={{ __html: logoSvg }} className="tech-svg-render" />
              ) : (
                <div className="tech-default-logo">{languageName.substring(0, 2)}</div>
              )}
            </div>

            {/* Center: Hero Details */}
            <div className="tech-hero-details">
              <Badge variant="purple">{badgeText}</Badge>
              <h1 className="tech-hero-title">{title}</h1>
              <span className="tech-hero-subtitle">{subtitle}</span>
              <p className="tech-hero-desc">{description}</p>

              {/* Stats Row */}
              <div className="tech-hero-stats">
                {stats.map((s, idx) => (
                  <div key={idx} className="tech-stat-pill">
                    <strong>{s.val}</strong> <span>{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Primary & Secondary Action CTAs */}
              <div className="tech-hero-actions">
                <Button 
                  variant="primary" 
                  iconRight={ChevronRight}
                  icon={Play}
                  onClick={() => setActiveTab('lessons')}
                >
                  Start Learning
                </Button>
                
                <Button 
                  variant="secondary" 
                  icon={Map}
                  onClick={() => setActiveTab('roadmap')}
                >
                  View Roadmap
                </Button>
              </div>
            </div>

            {/* Right: Glass Progress Card */}
            <div className="tech-progress-card">
              <div className="progress-card-hdr">
                <TrendingUp size={16} style={{ color: '#c084fc' }} />
                <h4>Your Progress</h4>
              </div>
              
              <div className="progress-card-body">
                <div className="circle-progress-badge">
                  <span>0%</span>
                  <small>Done</small>
                </div>
                
                <div className="progress-rows">
                  <div className="p-row"><span>Lessons Completed</span> <strong>0 / 45</strong></div>
                  <div className="p-row"><span>Quizzes Completed</span> <strong>0 / 10</strong></div>
                  <div className="p-row"><span>Programs Solved</span> <strong>0 / 120</strong></div>
                  <div className="p-row"><span>Projects Completed</span> <strong>0 / 9</strong></div>
                </div>
              </div>

              <button className="tech-login-save-btn">
                <Lock size={13} /> Login to Save Progress
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ── STICKY NAVIGATION TABS ── */}
      <StickyTabs 
        tabs={TABS} 
        activeTab={activeTab} 
        onTabChange={(tabId) => {
          setActiveTab(tabId);
          window.scrollTo({ top: 320, behavior: 'smooth' });
        }} 
      />

      {/* ── MAIN CONTENT TAB AREA ── */}
      <div className="tech-content-area">
        <div className="tech-content-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}
            >
              {customTabRenderers[activeTab] ? (
                customTabRenderers[activeTab]()
              ) : (
                /* Default Tab Renderers Fallback */
                <DefaultTabContent 
                  activeTab={activeTab}
                  aboutData={aboutData}
                  languageName={languageName}
                  setActiveTab={setActiveTab}
                  handleDownload={handleDownload}
                  lessonsData={lessonsData}
                  programsData={programsData}
                  interviewData={interviewData}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

// ─── Default Tab Content Fallback Renderer ─────────────────────────────────────
const DefaultTabContent = ({
  activeTab,
  aboutData,
  languageName,
  setActiveTab,
  handleDownload,
  lessonsData = [],
  programsData = [],
  interviewData = []
}) => {
  if (activeTab === 'overview') {
    return (
      <div className="tech-tab-grid">
        <div className="tech-main-col">
          <GlassPanel className="about-card">
            <SectionTitle 
              title={aboutData.title || `About ${languageName} Programming`}
              icon={BookOpen}
            />
            <p className="about-text">{aboutData.description}</p>
            {aboutData.subDescription && (
              <p className="about-text sub">{aboutData.subDescription}</p>
            )}
            <Button 
              variant="primary" 
              onClick={() => setActiveTab('lessons')}
              style={{ marginTop: '16px' }}
            >
              Explore {languageName} Curriculum →
            </Button>
          </GlassPanel>
        </div>

        <div className="tech-side-col">
          <GlassPanel className="popular-topics-card">
            <SectionTitle 
              title="Popular Topics"
              icon={Zap}
            />
            <div className="popular-topics-list">
              {(aboutData.topics || [
                { id: 1, name: 'Pointers & Memory' },
                { id: 2, name: 'Structures & Unions' }
              ]).map((topic) => (
                <div 
                  key={topic.id} 
                  className="popular-topic-row"
                  onClick={() => setActiveTab('lessons')}
                >
                  <span className="topic-num">{topic.id}</span>
                  <span className="topic-name">{topic.name}</span>
                  <ChevronRight size={14} className="topic-arrow" />
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    );
  }

  if (activeTab === 'lessons') {
    return (
      <GlassPanel>
        <SectionTitle title={`${languageName} Lessons`} icon={BookOpen} />
        <div className="lessons-simple-list">
          {lessonsData.length > 0 ? (
            lessonsData.map((l) => (
              <div key={l.id} className="lesson-item-row">
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#fff' }}>{l.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{l.desc || l.time}</span>
                </div>
                <Button variant="secondary" size="sm">Start Lesson</Button>
              </div>
            ))
          ) : (
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Comprehensive interactive lessons loaded from database curriculum.</p>
          )}
        </div>
      </GlassPanel>
    );
  }

  return (
    <GlassPanel>
      <SectionTitle title={`${languageName} ${activeTab.toUpperCase()}`} icon={Code2} />
      <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
        Interactive {activeTab} workspace for {languageName} Programming is ready. Select a lesson or program to begin learning.
      </p>
    </GlassPanel>
  );
};

export default TechnologyTemplate;
