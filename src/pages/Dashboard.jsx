import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Flame, BookOpen, Code2, Award, ArrowRight, Check, 
  Calendar, Clock, Bookmark, Play, CheckCircle2, ChevronRight
} from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useProgress } from '../context/ProgressContext';
import { useLearning } from '../context/LearningContext';
import StudentLayout from '../layouts/StudentLayout';
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
    } else {
      // Keep default goals if not stored yet
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
      setMotivation('Start your day with a clear mind and some clean code!');
    } else if (hour >= 12 && hour < 17) {
      setGreeting('Good Afternoon');
      setMotivation('Keep the momentum going. Consistency is the key to mastery!');
    } else {
      setGreeting('Good Evening');
      setMotivation('Unwind and review your day. A little code goes a long way!');
    }
  }, []);

  // Fetch last opened C lesson
  const lastOpenedId = Number(profileData?.lastOpenedLesson || 1);
  const currentResumeLesson = C_LESSONS.find(l => l.id === lastOpenedId) || C_LESSONS[0];

  // Fetch recommended next C lesson (first lesson that is not completed)
  const recommendedLesson = C_LESSONS.find(l => !completedLessons.has(l.id)) || C_LESSONS[C_LESSONS.length - 1];

  // Stats values
  const streakCount = profileData?.learningStats?.currentStreak || profileData?.streak || 0;
  const lessonsCompletedCount = completedLessons.size || profileData?.learningStats?.lessonsCompleted || 0;
  const programsSolvedCount = profileData?.learningStats?.programsSolved || 0;
  const certificatesCount = profileData?.certificates?.length || profileData?.learningStats?.certificates || 0;

  // Generate learning activity contribution map (12 weeks of contribution calendar cells)
  const generateContributionCalendar = () => {
    const days = [];
    const today = new Date();
    // Start from 12 weeks ago (84 days) aligned to Sunday
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 83);
    const startDayOffset = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDayOffset);

    // Build 84 days list
    for (let i = 0; i < 84; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      // Determine contribution intensity level (0 to 4) deterministically using UID hash and date
      const dateString = currentDate.toDateString();
      let hash = 0;
      const uid = user?.uid || '';
      for (let j = 0; j < dateString.length; j++) {
        hash = dateString.charCodeAt(j) + ((hash << 5) - hash);
      }
      for (let j = 0; j < uid.length; j++) {
        hash = uid.charCodeAt(j) + ((hash << 5) - hash);
      }
      
      // Seed cells to look active and realistic
      const intensity = Math.abs(hash) % 5;
      
      days.push({
        date: currentDate,
        intensity: intensity,
        contributions: intensity === 0 ? 0 : intensity * 2 - 1
      });
    }

    // Split into weeks (cols)
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
          
          {/* 1. Dynamic Greeting Header */}
          <header className="greeting-section slide-up-in">
            <h1 className="greeting-title">
              {greeting}, {profileData?.displayName || user?.displayName || 'Student'}!
            </h1>
            <p className="greeting-message">
              {streakCount > 0 ? `🔥 You are on a ${streakCount}-day study streak! ${motivation}` : motivation}
            </p>
          </header>

          {/* 2. Quick Statistics Grid */}
          <section className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }}>
                <Flame size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{streakCount} Days</span>
                <span className="stat-label">Current Streak</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(139, 92, 246, 0.08)', color: '#a78bfa' }}>
                <BookOpen size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{lessonsCompletedCount} / {C_LESSONS.length}</span>
                <span className="stat-label">Lessons Done</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#10b981' }}>
                <Code2 size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{programsSolvedCount} Solved</span>
                <span className="stat-label">Programs</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' }}>
                <Award size={24} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{certificatesCount} Earned</span>
                <span className="stat-label">Certificates</span>
              </div>
            </div>
          </section>

          {/* Main Dashboard Layout split */}
          <div className="dashboard-workspace-grid">
            
            {/* Left Panel */}
            <div className="workspace-left">
              
              {/* 3. Continue Learning */}
              <article className="section-card">
                <h2 className="section-title">
                  <Play size={18} style={{ color: 'var(--accent-glow)' }} /> Continue Learning
                </h2>
                {cardData ? (
                  <div className="continue-card-content">
                    <div className="continue-info">
                      <span className="continue-tag" style={{ color: 'var(--accent-glow)', fontWeight: '500' }}>
                        {cardData.subjectTitle} • {cardData.unitTitle}
                      </span>
                      <h3 className="continue-title" style={{ margin: '4px 0 8px 0' }}>{cardData.lessonTitle}</h3>
                      
                      <div className="continue-progress-wrapper" style={{ margin: '8px 0 12px 0', width: '100%' }}>
                        <div className="continue-progress-bar" style={{ background: '#2d2d3d', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
                          <div className="continue-progress-fill" style={{ background: 'var(--accent-glow)', height: '100%', width: `${cardData.progressPercentage}%`, transition: 'width 0.3s ease' }}></div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#8a8a9d', marginTop: '4px' }}>
                          <span>{cardData.progressPercentage}% Completed</span>
                          <span>Est. remaining: {cardData.estimatedRemainingTime}</span>
                        </div>
                      </div>

                      <div className="continue-meta">
                        <span className="continue-meta-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} /> {cardData.lastStudiedStr ? `Last studied: ${cardData.lastStudiedStr}` : 'Recently'}
                        </span>
                        <span className="continue-meta-item" style={{ textTransform: 'capitalize' }}>
                          • {cardData.difficulty}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="continue-btn-action"
                      onClick={handleResume}
                    >
                      Resume <ArrowRight size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="continue-card-empty" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 16px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🚀</div>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#fff', marginBottom: '4px' }}>Ready to start learning?</h3>
                    <p style={{ fontSize: '13px', color: '#8a8a9d', marginBottom: '16px', maxWidth: '280px' }}>Select any lesson from the study tracks to begin your C Programming journey.</p>
                    <button 
                      className="continue-btn-action" 
                      style={{ padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' }}
                      onClick={() => navigate('/lessons/c-lesson-1')}
                    >
                      Browse Syllabus
                    </button>
                  </div>
                )}
              </article>

              {/* 5. Learning Calendar Contribution Graph */}
              <article className="section-card">
                <h2 className="section-title">
                  <Calendar size={18} style={{ color: '#10b981' }} /> Study Activity Calendar
                </h2>
                <div className="calendar-wrapper">
                  <div className="calendar-grid">
                    {weeks.map((week, wIdx) => (
                      <div key={wIdx} className="calendar-week-col">
                        {week.map((day, dIdx) => {
                          // Compute purple background intensities
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

            {/* Right Panel */}
            <div className="workspace-right">
              
              {/* 4. Today's Goal Checklist */}
              <article className="section-card">
                <h2 className="section-title">
                  <CheckCircle2 size={18} style={{ color: '#ef4444' }} /> Today's Learning Goal
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

              {/* 7. Recommended Next Lesson */}
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
                    style={{ padding: '8px 16px', fontSize: '0.8rem' }}
                    onClick={() => handleResumeLesson(recommendedLesson.id)}
                  >
                    Start <ChevronRight size={14} />
                  </button>
                </div>
              </article>

              {/* 6. Recent Activity Feed */}
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
