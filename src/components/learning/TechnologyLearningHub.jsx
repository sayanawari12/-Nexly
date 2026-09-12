import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ArrowLeft, BookOpen, Map, Trophy, Lock, TrendingUp, ChevronRight, Play
} from 'lucide-react';

import OverviewTab from './OverviewTab';
import LessonsTab from './LessonsTab';
import RoadmapTab from './RoadmapTab';
import ProjectsTab from './ProjectsTab';

import { useProgress } from '../../context/ProgressContext';
import useAuth from '../../hooks/useAuth';

const TechnologyLearningHub = ({ techConfig }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { completedLessons } = useProgress();

  const [activeTab, setActiveTab] = useState('overview');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) setScrollProgress((window.scrollY / total) * 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/', { state: { scrollToSection: 'technologies' } });
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Home size={16} /> },
    { id: 'lessons', label: 'Lessons', icon: <BookOpen size={16} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={16} /> },
    { id: 'projects', label: 'Projects', icon: <Trophy size={16} /> },
  ];

  const lessonsList = techConfig?.lessons || [];
  const completedCount = lessonsList.filter(l => completedLessons.has(String(l.id)) || completedLessons.has(l.id)).length;
  const progressPercentage = lessonsList.length > 0 ? Math.round((completedCount / lessonsList.length) * 100) : 0;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab overview={techConfig.overview} setActiveTab={setActiveTab} />;
      case 'lessons':
        return <LessonsTab lessons={techConfig.lessons} programs={techConfig.programs} techName={techConfig.name} />;
      case 'roadmap':
        return <RoadmapTab lessons={techConfig.lessons} />;
      case 'projects':
        return <ProjectsTab projects={techConfig.projects} />;
      default:
        return <OverviewTab overview={techConfig.overview} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="py-hub-wrapper">
      {/* Reading Progress Top Bar */}
      <div className="py-reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Breadcrumb Navigation */}
      <div className="py-breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={handleBack}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: 0 }}
        >
          <ArrowLeft size={13} /> Back
        </button>
        <span className="sep" style={{ margin: '0 4px', opacity: 0.3, color: 'var(--text-secondary)' }}>|</span>
        <button
          onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: 0 }}
        >
          <Home size={13} /> Home
        </button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button
          onClick={() => navigate('/', { state: { scrollToSection: 'technologies' } })}
          style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: '500', padding: 0 }}
        >
          Tech Stack
        </button>
        <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
        <button
          onClick={() => setActiveTab('overview')}
          style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? 'var(--accent-glow)' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem', fontWeight: activeTab === 'overview' ? '600' : '500', padding: 0 }}
        >
          {techConfig.name}
        </button>
        {activeTab !== 'overview' && (
          <>
            <span className="sep" style={{ color: 'var(--text-secondary)', opacity: 0.3 }}>›</span>
            <span className="current" style={{ color: 'var(--accent-glow)', fontSize: '0.8rem', fontWeight: '600', textTransform: 'capitalize' }}>
              {activeTab}
            </span>
          </>
        )}
      </div>

      {/* Hero Banner */}
      <div className="py-hero-banner">
        <div className="py-hero-inner">
          <div className="py-hero-text">
            <span className="py-badge">{techConfig.badge || techConfig.name.toUpperCase()}</span>
            <h1 className="py-hero-title">{techConfig.title}</h1>
            <p className="py-hero-subtitle">{techConfig.subtitle}</p>
            <p className="py-hero-desc">{techConfig.desc}</p>
            <div className="py-hero-stats">
              {techConfig.stats?.map((s, i) => (
                <div key={i} className="py-stat-pill">
                  <strong>{s.val}</strong> {s.label}
                </div>
              ))}
            </div>
            <div className="py-hero-actions">
              <button className="py-btn-primary" onClick={() => setActiveTab('lessons')}>
                <Play size={15} /> Start Learning <ChevronRight size={14} />
              </button>
              <button className="py-btn-secondary" onClick={() => setActiveTab('roadmap')}>
                <Map size={15} /> View Roadmap
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="py-progress-card">
            <h4><TrendingUp size={15} /> Your Progress</h4>
            <div className="py-overall-progress">
              <div className="py-circle-progress">
                {progressPercentage}%<br />
                <span style={{ fontSize: '0.55rem' }}>Done</span>
              </div>
              <div className="py-progress-rows" style={{ flex: 1 }}>
                <div className="py-progress-row">
                  <span>Lessons Completed</span>
                  <span>{completedCount} / {lessonsList.length}</span>
                </div>
                <div className="py-progress-row">
                  <span>Problems Solved</span>
                  <span>0 / {techConfig.stats?.find(s => s.label === 'Problems')?.val || 36}</span>
                </div>
                <div className="py-progress-row">
                  <span>Projects Completed</span>
                  <span>0 / {techConfig.projects?.length || 9}</span>
                </div>
              </div>
            </div>
            {!user && (
              <button className="py-login-btn" onClick={() => navigate('/login')}>
                <Lock size={13} /> Login to Save Progress
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation Bar */}
      <div className="py-tab-nav">
        <div className="py-tab-nav-inner">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="py-tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content View with Animation */}
      <div className="py-content-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TechnologyLearningHub;
