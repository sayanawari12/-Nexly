import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, BookOpen, Code2, Award, ArrowRight, Check, 
  Calendar, Clock, Bookmark, Play, CheckCircle2, ChevronRight,
  Map, FileText, User, Bell, Sparkles, TrendingUp, Layers, HelpCircle
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useProgress } from '../context/ProgressContext';
import { useLearning } from '../context/LearningContext';
import StudentLayout from '../layouts/StudentLayout';
import QuickActions from '../components/dashboard/QuickActions';
import { C_LESSONS } from './CLearningHub';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profileData, completedLessons, learningState, resumeLearning } = useProgress();
  const { semesters, subjects, units, lessons } = useLearning();

  const [greeting, setGreeting] = useState('Welcome back');
  const [motivation, setMotivation] = useState('Ready to build something amazing today?');
  
  // Daily goals state
  const [goals, setGoals] = useState([
    { id: 'goal_lesson', text: 'Study 1 C programming lesson', completed: false },
    { id: 'goal_program', text: 'Solve 1 compilation playground program', completed: false },
    { id: 'goal_quiz', text: 'Pass 1 Multiple Choice Quiz', completed: false }
  ]);

  // Announcements mock state
  const announcements = [
    {
      id: 1,
      title: 'BCA CodeCraft Hackathon 2026 Registration Open',
      date: '2 Hours Ago',
      category: 'Event',
      badgeColor: '#a855f7'
    },
    {
      id: 2,
      title: 'Mid-Semester Theory & Practical Exam Timetable Released',
      date: 'Yesterday',
      category: 'Exams',
      badgeColor: '#3b82f6'
    },
    {
      id: 3,
      title: 'Submission Deadline: Advanced C Lab Manual (Exp 1-10)',
      date: '3 Days Ago',
      category: 'Submissions',
      badgeColor: '#f59e0b'
    }
  ];

  // Load goals from local storage on render
  useEffect(() => {
    const saved = localStorage.getItem(`daily_goals_${user?.uid}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGoals(Array.isArray(parsed) ? parsed : []);
      } catch (e) {
        console.error("Failed to parse goals", e);
        setGoals([]);
      }
    }
  }, [user?.uid]);

  // Save goals state
  const toggleGoal = (id) => {
    const updated = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
    setGoals(updated);
    localStorage.setItem(`daily_goals_${user?.uid}`, JSON.stringify(updated));
  };

  const completedGoalsCount = goals.filter(g => g.completed).length;
  const goalProgressPercentage = Math.round((completedGoalsCount / goals.length) * 100);

  // Set greeting and motivation based on local hour
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Good Morning');
      setMotivation('Start your day with a clear mind and clean code.');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
      setMotivation('Keep up the momentum. Consistency leads to mastery.');
    } else {
      setGreeting('Good Evening');
      setMotivation('Review your day and consolidate what you learned.');
    }
  }, []);

  // Fetch stats & progress
  const streakCount = profileData?.learningStats?.currentStreak || profileData?.streak || 0;
  const lessonsCompletedCount = completedLessons.size || profileData?.learningStats?.lessonsCompleted || 0;
  const totalLessons = C_LESSONS.length;
  const remainingLessons = Math.max(0, totalLessons - lessonsCompletedCount);
  const overallProgressPercent = Math.round((lessonsCompletedCount / totalLessons) * 100);

  const programsSolvedCount = profileData?.learningStats?.programsSolved || 0;
  const certificatesCount = profileData?.certificates?.length || profileData?.learningStats?.certificates || 0;

  // Recommended next lesson
  const recommendedLesson = C_LESSONS.find(l => !completedLessons.has(l.id)) || C_LESSONS[C_LESSONS.length - 1];

  // Contribution Calendar
  const generateContributionCalendar = () => {
    const days = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 83);
    const startDayOffset = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOffset);

    for (let i = 0; i < 84; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const dateString = currentDate.toDateString();
      let hash = 0;
      const uid = user?.uid || '';
      for (let j = 0; j < dateString.length; j++) {
        hash = dateString.charCodeAt(j) + ((hash << 5) - hash);
      }
      for (let j = 0; j < uid.length; j++) {
        hash = uid.charCodeAt(j) + ((hash << 5) - hash);
      }
      const intensity = Math.abs(hash) % 5;
      days.push({
        date: currentDate,
        intensity: intensity,
        contributions: intensity === 0 ? 0 : intensity * 2 - 1
      });
    }

    const weeks = [];
    for (let i = 0; i < 12; i++) {
      weeks.push(days.slice(i * 7, (i + 1) * 7));
    }
    return weeks;
  };

  const weeks = generateContributionCalendar();

  // Smart continue learning payload resolution
  const cardData = React.useMemo(() => {
    if (!learningState) return null;
    const { getDashboardCardData } = require('../services/learningState/learningStateService');
    return getDashboardCardData(learningState, subjects, units, lessons);
  }, [learningState, semesters, subjects, units, lessons]);

  const handleResume = () => {
    resumeLearning(navigate);
  };

  const handleResumeLesson = (lessonId) => {
    navigate(`/lessons/c-lesson-${lessonId || 1}`);
  };

  return (
    <StudentLayout>
      <div className="dashboard-wrapper">
        <div className="dashboard-container">
          
          {/* 1. SECTION: Welcome Section */}
          <header className="greeting-section slide-up-in">
            <div className="greeting-content-box">
              {streakCount > 0 && (
                <div className="greeting-badge-row">
                  <span className="greeting-streak-badge">
                    <Flame size={13} fill="#ef4444" color="#ef4444" /> {streakCount} Day Streak
                  </span>
                </div>
              )}
              <h1 className="greeting-title">
                {greeting}, {profileData?.displayName || user?.displayName || 'Student'}!
              </h1>
              <p className="greeting-message">
                {motivation}
              </p>
            </div>
            
            <div className="greeting-user-avatar-card">
              <div className="avatar-circle">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User Avatar" />
                ) : (
                  <span>{(profileData?.displayName || user?.displayName || user?.email || 'S')[0].toUpperCase()}</span>
                )}
              </div>
              <div className="avatar-meta">
                <span className="avatar-name">{profileData?.displayName || user?.displayName || 'Student'}</span>
                <span className="avatar-role">BCA Scholar</span>
              </div>
            </div>
          </header>

          {/* 1.5. BONUS SECTION: Quick Actions 1-Tap Access Grid */}
          <QuickActions />

          {/* 2. SECTION: Overall Learning Progress Summary */}
          <section className="progress-summary-banner">
            <div className="progress-banner-col">
              <div className="banner-icon-bg" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                <TrendingUp size={22} />
              </div>
              <div className="banner-info">
                <span className="banner-val">{overallProgressPercent}%</span>
                <span className="banner-lbl">Overall Syllabus Progress</span>
              </div>
            </div>

            <div className="banner-divider" />

            <div className="progress-banner-col">
              <div className="banner-icon-bg" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <CheckCircle2 size={22} />
              </div>
              <div className="banner-info">
                <span className="banner-val">{lessonsCompletedCount} Topics</span>
                <span className="banner-lbl">Completed Lessons</span>
              </div>
            </div>

            <div className="banner-divider" />

            <div className="progress-banner-col">
              <div className="banner-icon-bg" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
                <Layers size={22} />
              </div>
              <div className="banner-info">
                <span className="banner-val">{remainingLessons} Topics</span>
                <span className="banner-lbl">Remaining Lessons</span>
              </div>
            </div>

            <div className="banner-divider" />

            <div className="progress-banner-col">
              <div className="banner-icon-bg" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}>
                <Award size={22} />
              </div>
              <div className="banner-info">
                <span className="banner-val">{certificatesCount} Earned</span>
                <span className="banner-lbl">Skill Badges & Certs</span>
              </div>
            </div>
          </section>

          {/* Main Workspace Grid Split */}
          <div className="dashboard-workspace-grid">
            
            {/* Left Workspace Column */}
            <div className="workspace-left">
              
              {/* 3. SECTION: Continue Learning Card */}
              <article className="section-card continue-learning-card">
                <div className="card-header-flex">
                  <h2 className="section-title">
                    <Play size={18} style={{ color: 'var(--accent-glow)' }} /> Continue Learning
                  </h2>
                  <span className="live-status-pill">Active Track</span>
                </div>

                {cardData ? (
                  <div className="continue-card-content">
                    <div className="continue-info">
                      <span className="continue-tag">
                        {cardData.subjectTitle} • {cardData.unitTitle}
                      </span>
                      <h3 className="continue-title">{cardData.lessonTitle}</h3>
                      
                      <div className="continue-progress-wrapper">
                        <div className="continue-progress-bar">
                          <div 
                            className="continue-progress-fill" 
                            style={{ width: `${cardData.progressPercentage}%` }} 
                          />
                        </div>
                        <div className="continue-progress-labels">
                          <span>{cardData.progressPercentage}% Completed</span>
                          <span>Est. remaining: {cardData.estimatedRemainingTime}</span>
                        </div>
                      </div>

                      <div className="continue-meta">
                        <span className="continue-meta-item">
                          <Clock size={13} /> {cardData.lastStudiedStr ? `Last studied: ${cardData.lastStudiedStr}` : 'Recently active'}
                        </span>
                        <span className="continue-meta-item">
                          • {cardData.difficulty}
                        </span>
                      </div>
                    </div>

                    <button 
                      className="continue-btn-action"
                      onClick={handleResume}
                    >
                      <Play size={16} fill="currentColor" /> Continue Learning <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="continue-card-content">
                    <div className="continue-info">
                      <span className="continue-tag">C Programming Track</span>
                      <h3 className="continue-title">Lesson 1: Introduction to C Language</h3>
                      <p className="continue-desc">
                        Master variables, data types, compilers, and memory organization in low-level programming.
                      </p>
                    </div>

                    <button 
                      className="continue-btn-action"
                      onClick={() => navigate('/lessons/c-lesson-1')}
                    >
                      <Play size={16} fill="currentColor" /> Start Lesson 1 <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </article>

              {/* 4. SECTION: Quick Access Workspace Cards */}
              <article className="section-card">
                <h2 className="section-title">
                  <Sparkles size={18} style={{ color: '#c084fc' }} /> Quick Access Hub
                </h2>

                <div className="quick-access-grid">
                  
                  {/* Roadmap Card */}
                  <div className="quick-access-card" onClick={() => navigate('/roadmap')}>
                    <div className="qa-icon-box" style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#c084fc' }}>
                      <Map size={22} />
                    </div>
                    <div className="qa-details">
                      <h4>Learning Roadmaps</h4>
                      <p>C, Web Dev & DSA career pathways</p>
                    </div>
                    <ChevronRight size={16} className="qa-arrow" />
                  </div>

                  {/* Resources Card */}
                  <div className="quick-access-card" onClick={() => navigate('/#resources')}>
                    <div className="qa-icon-box" style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa' }}>
                      <BookOpen size={22} />
                    </div>
                    <div className="qa-details">
                      <h4>Study Resources</h4>
                      <p>Syllabus, manuals & lecture notes</p>
                    </div>
                    <ChevronRight size={16} className="qa-arrow" />
                  </div>

                  {/* Notes & Syllabus Card */}
                  <div className="quick-access-card" onClick={() => navigate('/syllabus')}>
                    <div className="qa-icon-box" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#34d399' }}>
                      <FileText size={22} />
                    </div>
                    <div className="qa-details">
                      <h4>Syllabus & Notes</h4>
                      <p>Official university curriculum</p>
                    </div>
                    <ChevronRight size={16} className="qa-arrow" />
                  </div>

                  {/* Profile Card */}
                  <div className="quick-access-card" onClick={() => navigate('/profile')}>
                    <div className="qa-icon-box" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#fbbf24' }}>
                      <User size={22} />
                    </div>
                    <div className="qa-details">
                      <h4>My Profile</h4>
                      <p>Account preferences & achievements</p>
                    </div>
                    <ChevronRight size={16} className="qa-arrow" />
                  </div>

                </div>
              </article>

              {/* 5. SECTION: Study Activity Calendar Graph */}
              <article className="section-card">
                <h2 className="section-title">
                  <Calendar size={18} style={{ color: '#10b981' }} /> Study Activity Calendar
                </h2>
                <div className="calendar-wrapper">
                  <div className="calendar-grid">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="calendar-week-col">
                        {week.map((day, dIdx) => {
                          let bg = '#18181b';
                          if (day.intensity === 1) bg = '#2e1065';
                          else if (day.intensity === 2) bg = '#4c1d95';
                          else if (day.intensity === 3) bg = '#6d28d9';
                          else if (day.intensity === 4) bg = '#8b5cf6';
                          
                          return (
                            <div 
                              key={dIdx} 
                              className="calendar-day-cell"
                              style={{ backgroundColor: bg }}
                            >
                              <div className="cell-tooltip">
                                {day.contributions} contributions on {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="calendar-legend">
                  <span>Less</span>
                  <div className="legend-box" style={{ backgroundColor: '#18181b' }} />
                  <div className="legend-box" style={{ backgroundColor: '#2e1065' }} />
                  <div className="legend-box" style={{ backgroundColor: '#4c1d95' }} />
                  <div className="legend-box" style={{ backgroundColor: '#6d28d9' }} />
                  <div className="legend-box" style={{ backgroundColor: '#8b5cf6' }} />
                  <span>More</span>
                </div>
              </article>

            </div>

            {/* Right Workspace Column */}
            <div className="workspace-right">
              
              {/* 6. SECTION: Today's Goal Checklist */}
              <article className="section-card">
                <h2 className="section-title">
                  <CheckCircle2 size={18} style={{ color: '#ef4444' }} /> Daily Study Targets
                </h2>
                
                <div className="goal-status-header">
                  <span>{completedGoalsCount} of {goals.length} completed</span>
                  <span>{goalProgressPercentage}%</span>
                </div>
                
                <div className="goal-progress-bar-wrapper">
                  <div className="goal-progress-fill" style={{ width: `${goalProgressPercentage}%` }} />
                </div>

                <div className="goal-items-list">
                  {goals.map((g) => (
                    <div 
                      key={g.id} 
                      className={`goal-item-row ${g.completed ? 'completed' : ''}`}
                      onClick={() => toggleGoal(g.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggleGoal(g.id);
                        }
                      }}
                      role="checkbox"
                      aria-checked={g.completed}
                      tabIndex={0}
                    >
                      <div className={`goal-checkbox ${g.completed ? 'checked' : ''}`}>
                        {g.completed && <Check size={12} />}
                      </div>
                      <span className="goal-item-text">{g.text}</span>
                    </div>
                  ))}
                </div>
              </article>

              {/* 7. SECTION: Department Announcements */}
              <article className="section-card">
                <h2 className="section-title">
                  <Bell size={18} style={{ color: '#3b82f6' }} /> Department Announcements
                </h2>

                <div className="announcements-list">
                  {announcements.map((item) => (
                    <div key={item.id} className="announcement-item">
                      <div className="announcement-header">
                        <span className="announcement-badge" style={{ background: `${item.badgeColor}15`, color: item.badgeColor, borderColor: `${item.badgeColor}30` }}>
                          {item.category}
                        </span>
                        <span className="announcement-date">{item.date}</span>
                      </div>
                      <h4 className="announcement-title">{item.title}</h4>
                    </div>
                  ))}
                </div>
              </article>

              {/* 8. SECTION: Recommended Next Lesson */}
              <article className="section-card recommend-card">
                <div className="recommend-header">
                  <span className="recommend-tag-badge">Recommended Next</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>C Program Hub</span>
                </div>
                <h3 className="recommend-title">{recommendedLesson.title}</h3>
                <p className="recommend-desc">{recommendedLesson.desc}</p>
                <div className="recommend-footer">
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    ⏱️ {recommendedLesson.time} • {recommendedLesson.diff}
                  </span>
                  <button 
                    className="continue-btn-action"
                    style={{ padding: '8px 16px', fontSize: '0.8rem', minHeight: '44px' }}
                    onClick={() => handleResumeLesson(recommendedLesson.id)}
                  >
                    Start <ChevronRight size={14} />
                  </button>
                </div>
              </article>

              {/* 9. SECTION: Recent Activity Feed */}
              <article className="section-card">
                <h2 className="section-title">
                  <Bookmark size={18} style={{ color: '#f59e0b' }} /> Recent Activity
                </h2>
                <div className="activity-feed-list">
                  <div className="activity-feed-item">
                    <div className="activity-dot-icon">
                      <CheckCircle2 size={14} style={{ color: '#10b981' }} />
                    </div>
                    <div className="activity-details">
                      <span className="activity-action">Completed introduction tutorial</span>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>

                  <div className="activity-feed-item">
                    <div className="activity-dot-icon">
                      <Code2 size={14} style={{ color: '#a78bfa' }} />
                    </div>
                    <div className="activity-details">
                      <span className="activity-action">Ran code compilation in playground</span>
                      <span className="activity-time">Yesterday</span>
                    </div>
                  </div>

                  <div className="activity-feed-item">
                    <div className="activity-dot-icon">
                      <Award size={14} style={{ color: '#f59e0b' }} />
                    </div>
                    <div className="activity-details">
                      <span className="activity-action">Unlocked student database user profile</span>
                      <span className="activity-time">3 days ago</span>
                    </div>
                  </div>
                </div>
              </article>

            </div>

          </div>

        </div>
      </div>
    </StudentLayout>
  );
};

export default Dashboard;
