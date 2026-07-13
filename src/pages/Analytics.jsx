import React from 'react';
import { 
  BarChart3, Clock, Flame, Award, BookOpen, Layers, 
  Sparkles, TrendingUp, AlertTriangle, Calendar, Play
} from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import StudentLayout from '../layouts/StudentLayout';
import '../styles/Analytics.css';

const Analytics = () => {
  const { 
    studyAnalytics, 
    weeklyAnalytics, 
    subjectAnalytics, 
    learningInsights,
    loadingProgress
  } = useProgress();

  if (loadingProgress) {
    return (
      <StudentLayout>
        <div className="analytics-loading-container">
          <div className="skeleton-graph"></div>
          <div className="skeleton-grid">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  // Calculate highest study day
  const maxWeeklyMinutes = Math.max(...weeklyAnalytics.map(d => d.minutes), 1);

  return (
    <StudentLayout>
      <div className="analytics-wrapper">
        <div className="analytics-container">
          
          {/* Header */}
          <header className="analytics-header slide-up-in">
            <div className="analytics-title-row">
              <h1 className="analytics-title">Study Insights & Performance</h1>
              <span className="analytics-badge">Real-Time Audits</span>
            </div>
            <p className="analytics-desc">
              Monitor your temporal study allocation, examine subject-wise mastery ratios, and view customized productivity suggestions.
            </p>
          </header>

          {/* Quick Metrics Grid */}
          <section className="analytics-metrics-grid">
            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(139, 92, 246, 0.08)', color: '#c084fc' }}>
                <Clock size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Today's Study</span>
                <span className="metric-value">{studyAnalytics.todayTimeMinutes} mins</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(16, 185, 129, 0.08)', color: '#34d399' }}>
                <TrendingUp size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Weekly Study</span>
                <span className="metric-value">{studyAnalytics.weeklyTimeMinutes} mins</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(245, 158, 11, 0.08)', color: '#fbbf24' }}>
                <Flame size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Streak Stats</span>
                <span className="metric-value">{studyAnalytics.streakCount} / {studyAnalytics.longestStreak} days</span>
              </div>
            </div>

            <div className="metric-card">
              <div className="metric-icon-box" style={{ background: 'rgba(59, 130, 246, 0.08)', color: '#60a5fa' }}>
                <Layers size={20} />
              </div>
              <div className="metric-info">
                <span className="metric-label">Total Study Time</span>
                <span className="metric-value">{studyAnalytics.totalTimeHours} hrs</span>
              </div>
            </div>
          </section>

          {/* Graph & Insights section split */}
          <div className="analytics-split-layout">
            
            {/* Left Panel: 7-Day Activity Graph */}
            <article className="analytics-graph-card">
              <h2 className="card-heading">
                <Calendar size={16} /> 7-Day Learning Activity
              </h2>
              <p className="card-subheading">Daily minutes committed and checkmarks logged</p>
              
              <div className="graph-bars-area">
                {weeklyAnalytics.map(dayData => {
                  const barHeight = Math.round((dayData.minutes / maxWeeklyMinutes) * 100);
                  return (
                    <div key={dayData.day} className="graph-col">
                      <div className="graph-bar-wrapper">
                        {dayData.minutes > 0 && (
                          <div className="bar-tooltip">
                            {dayData.minutes} mins<br />
                            {dayData.completed} lessons
                          </div>
                        )}
                        <div 
                          className="graph-bar-fill"
                          style={{ height: `${Math.max(barHeight, 4)}%` }}
                        ></div>
                      </div>
                      <span className="graph-day-label">{dayData.day}</span>
                    </div>
                  );
                })}
              </div>

              <div className="graph-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ background: 'var(--accent-glow)' }}></div>
                  <span>Study Time (Minutes)</span>
                </div>
              </div>
            </article>

            {/* Right Panel: Smart AI Learning Insights */}
            <article className="analytics-insights-card">
              <h2 className="card-heading">
                <Sparkles size={16} style={{ color: '#fbbf24' }} /> Smart Study Insights
              </h2>
              <p className="card-subheading">Dynamic audits generated by analyzing your patterns</p>

              {learningInsights.length > 0 ? (
                <ul className="insights-list">
                  {learningInsights.map((insight, idx) => {
                    const isNeglect = insight.includes("haven't opened");
                    return (
                      <li key={idx} className={`insight-item ${isNeglect ? 'neglect-alert' : ''}`}>
                        <div className="insight-icon-box">
                          {isNeglect ? <AlertTriangle size={14} /> : <Sparkles size={14} />}
                        </div>
                        <span className="insight-text">{insight}</span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="insights-empty">
                  <span>No insights available yet. Study more lessons to build your profile trends!</span>
                </div>
              )}
            </article>
          </div>

          {/* Productivity Metrics Panel */}
          <section className="productivity-metrics-panel">
            <h2 className="card-heading">Productivity Metrics</h2>
            <div className="productivity-grid">
              <div className="prod-metric">
                <span className="prod-metric-label">Average Session Length</span>
                <span className="prod-metric-value">{studyAnalytics.averageSessionLengthMinutes} mins</span>
              </div>
              <div className="prod-metric">
                <span className="prod-metric-label">Longest Study Session</span>
                <span className="prod-metric-value">{studyAnalytics.longestStudySessionMinutes} mins</span>
              </div>
              <div className="prod-metric">
                <span className="prod-metric-label">Most Active Day</span>
                <span className="prod-metric-value">{studyAnalytics.mostActiveDay}</span>
              </div>
              <div className="prod-metric">
                <span className="prod-metric-label">Least Active Day</span>
                <span className="prod-metric-value">{studyAnalytics.leastActiveDay}</span>
              </div>
            </div>
          </section>

          {/* Subject-Wise Analytics Cards */}
          <section className="subject-analytics-section">
            <h2 className="workspace-section-title">
              <BookOpen size={18} style={{ color: 'var(--accent-glow)' }} /> Subject Performance Reports
            </h2>
            
            <div className="subject-analytics-grid">
              {subjectAnalytics.map(subject => {
                let statusClass = 'status-unstarted';
                if (subject.status === 'Completed') statusClass = 'status-completed';
                else if (subject.status === 'In Progress') statusClass = 'status-inprogress';

                return (
                  <article key={subject.id} className="subject-performance-card">
                    <div className="subject-performance-header">
                      <div>
                        <h3 className="subject-perf-name">{subject.name}</h3>
                        <span className="subject-perf-code">{subject.code}</span>
                      </div>
                      <span className={`status-badge ${statusClass}`}>{subject.status}</span>
                    </div>

                    <div className="subject-perf-stats-grid">
                      <div className="perf-stat">
                        <span className="perf-label">Lessons Done</span>
                        <span className="perf-val">{subject.lessonsCompleted} / {subject.totalLessons}</span>
                      </div>

                      <div className="perf-stat">
                        <span className="perf-label">Units Completed</span>
                        <span className="perf-val">{subject.unitsCompleted} / {subject.totalUnits}</span>
                      </div>

                      <div className="perf-stat">
                        <span className="perf-label">Time Spent</span>
                        <span className="perf-val">{subject.studyTimeMinutes} mins</span>
                      </div>

                      <div className="perf-stat">
                        <span className="perf-label">Last Studied</span>
                        <span className="perf-val">{subject.lastStudied}</span>
                      </div>
                    </div>

                    <div className="subject-perf-progress">
                      <div className="progress-bar-details">
                        <span>Completion Rate</span>
                        <span>{subject.completionPercentage}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div 
                          className="progress-bar-fill"
                          style={{ width: `${subject.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </StudentLayout>
  );
};

export default Analytics;
