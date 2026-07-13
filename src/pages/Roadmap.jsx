import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, CheckCircle2, Circle, Lock, Clock, BookOpen, 
  ChevronDown, ChevronRight, BarChart3, Award, Sparkles 
} from 'lucide-react';
import { useLearning } from '../context/LearningContext';
import { useProgress } from '../context/ProgressContext';
import StudentLayout from '../layouts/StudentLayout';
import '../styles/Roadmap.css';

const Roadmap = () => {
  const navigate = useNavigate();
  const { semesters, subjects, units, lessons, loadingLearning } = useLearning();
  const { 
    completedLessons, 
    inProgressLessons, 
    semesterProgress, 
    subjectProgress, 
    loadingProgress,
    resumeLearning
  } = useProgress();

  // Track expanded units (accordion map)
  const [expandedUnits, setExpandedUnits] = useState({});

  const toggleUnit = (unitId) => {
    setExpandedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  if (loadingLearning || loadingProgress) {
    return (
      <StudentLayout>
        <div className="roadmap-loading-container">
          <div className="roadmap-skeleton-header"></div>
          <div className="roadmap-skeleton-cards">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </StudentLayout>
    );
  }

  // Active semester: semester-2
  const activeSemester = semesters.find(s => s.id === 'semester-2') || semesters[0];
  const semesterSubjects = subjects.filter(s => s.semesterId === (activeSemester?.id || 'semester-2'));

  // Get first uncompleted lesson of a subject to resume
  const getSubjectResumeLessonId = (subjectId) => {
    const subjectUnits = units.filter(u => u.subjectId === subjectId);
    const subjectUnitIds = new Set(subjectUnits.map(u => u.id));
    const subjectLessons = lessons.filter(l => subjectUnitIds.has(l.unitId));

    const uncompleted = subjectLessons.find(l => !completedLessons.has(String(l.id)) && !completedLessons.has(Number(l.id)));
    return uncompleted ? uncompleted.id : (subjectLessons[0] ? subjectLessons[0].id : null);
  };

  const handleResumeSubject = (subjectId) => {
    const resumeId = getSubjectResumeLessonId(subjectId);
    if (resumeId) {
      navigate(`/lessons/${resumeId}`);
    }
  };

  return (
    <StudentLayout>
      <div className="roadmap-wrapper">
        <div className="roadmap-container">
          
          {/* Header */}
          <header className="roadmap-header slide-up-in">
            <div className="roadmap-title-row">
              <h1 className="roadmap-title">Syllabus Learning Roadmap</h1>
              <span className="roadmap-badge">{activeSemester?.title || 'Semester 2'}</span>
            </div>
            <p className="roadmap-desc">
              Track your conceptual milestones, view unit breakdowns, and monitor subject completion scores in real time.
            </p>
          </header>

          {/* Sticky Overall Semester Progress Bar */}
          <section className="sticky-progress-panel">
            <div className="progress-panel-details">
              <div className="panel-text-box">
                <span className="panel-title">Overall Semester Completion</span>
                <span className="panel-desc">All subjects and lesson checkmarks aggregated</span>
              </div>
              <span className="panel-percentage">{semesterProgress}%</span>
            </div>
            <div className="panel-bar-bg">
              <div 
                className="panel-bar-fill" 
                style={{ width: `${semesterProgress}%` }}
              ></div>
            </div>
          </section>

          {/* Subjects Grid */}
          <main className="roadmap-workspace">
            <h2 className="workspace-section-title">
              <BarChart3 size={18} style={{ color: 'var(--accent-glow)' }} /> Subjects Overview
            </h2>
            
            <div className="subjects-grid">
              {semesterSubjects.map(subject => {
                const stats = subjectProgress[subject.id] || { percentage: 0, completed: 0, total: 0, remaining: 0 };
                return (
                  <article key={subject.id} className="subject-progress-card">
                    <div className="subject-card-header">
                      <div className="subject-card-icon-box">
                        <BookOpen size={20} />
                      </div>
                      <div className="subject-card-meta">
                        <h3 className="subject-card-title">{subject.title}</h3>
                        <span className="subject-card-subtitle">{subject.code || 'BCA Core'}</span>
                      </div>
                    </div>

                    <div className="subject-card-progress-section">
                      <div className="progress-text-row">
                        <span>{stats.percentage}% Completed</span>
                        <span>{stats.completed} / {stats.total} Lessons</span>
                      </div>
                      <div className="subject-progress-bar-bg">
                        <div 
                          className="subject-progress-bar-fill"
                          style={{ width: `${stats.percentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="subject-card-footer">
                      <span className="remaining-lessons-tag">
                        {stats.remaining > 0 ? `${stats.remaining} lessons remaining` : 'Subject Completed! 🎉'}
                      </span>
                      <button 
                        className="subject-resume-action-btn"
                        onClick={() => handleResumeSubject(subject.id)}
                      >
                        <Play size={12} fill="currentColor" />
                        <span>Resume</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Syllabus Accoridons Breakdown */}
            <h2 className="workspace-section-title" style={{ marginTop: '32px' }}>
              <Sparkles size={18} style={{ color: '#10b981' }} /> Curricular Units & Lesson Checklist
            </h2>

            <div className="syllabus-tree-container">
              {semesterSubjects.map(subject => {
                const subjectUnits = units.filter(u => u.subjectId === subject.id);
                return (
                  <div key={subject.id} className="subject-tree-block">
                    <h3 className="subject-tree-block-title">{subject.title}</h3>
                    
                    <div className="units-list-stack">
                      {subjectUnits.map(unit => {
                        const unitLessons = lessons.filter(l => l.unitId === unit.id);
                        
                        // Calculate Unit statistics
                        const total = unitLessons.length;
                        const completed = unitLessons.filter(l => completedLessons.has(String(l.id)) || completedLessons.has(Number(l.id))).length;
                        const inProgress = unitLessons.filter(l => inProgressLessons.has(String(l.id)) || inProgressLessons.has(Number(l.id))).length;
                        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
                        const isExpanded = !!expandedUnits[unit.id];

                        return (
                          <div key={unit.id} className={`unit-accordion-item ${isExpanded ? 'active' : ''}`}>
                            <button 
                              className="unit-accordion-trigger"
                              onClick={() => toggleUnit(unit.id)}
                            >
                              <div className="trigger-left">
                                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                <div className="unit-trigger-titles">
                                  <span className="unit-trigger-code">{unit.code || 'Unit'}</span>
                                  <span className="unit-trigger-name">{unit.title}</span>
                                </div>
                              </div>

                              <div className="trigger-right">
                                <span className="unit-trigger-stats">
                                  {completed}/{total} Done ({percentage}%)
                                </span>
                                <div className="unit-trigger-mini-bar-bg">
                                  <div 
                                    className="unit-trigger-mini-bar-fill"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                              </div>
                            </button>

                            {isExpanded && (
                              <div className="unit-accordion-content">
                                <ul className="lessons-checklist-stack">
                                  {unitLessons.map(lesson => {
                                    const isComp = completedLessons.has(String(lesson.id)) || completedLessons.has(Number(lesson.id));
                                    const isInProg = inProgressLessons.has(String(lesson.id)) || inProgressLessons.has(Number(lesson.id));
                                    
                                    // Visual Status Determination
                                    let statusIcon = <Circle size={16} className="status-icon-unstarted" />;
                                    let statusLabel = 'Not Started';
                                    let statusClass = 'lesson-unstarted';

                                    if (isComp) {
                                      statusIcon = <CheckCircle2 size={16} className="status-icon-completed" />;
                                      statusLabel = 'Completed';
                                      statusClass = 'lesson-completed';
                                    } else if (isInProg) {
                                      statusIcon = <Circle size={16} className="status-icon-inprogress" fill="currentColor" />;
                                      statusLabel = 'In Progress';
                                      statusClass = 'lesson-inprogress';
                                    }

                                    return (
                                      <li 
                                        key={lesson.id}
                                        className={`lesson-checklist-item-row ${statusClass}`}
                                        onClick={() => navigate(`/lessons/${lesson.id}`)}
                                      >
                                        <div className="lesson-row-left">
                                          {statusIcon}
                                          <div className="lesson-row-info">
                                            <span className="lesson-row-title">{lesson.title}</span>
                                            <span className="lesson-row-est-time">
                                              <Clock size={10} /> {lesson.estimatedTime || '15 mins'}
                                            </span>
                                          </div>
                                        </div>

                                        <div className="lesson-row-right">
                                          <span className={`status-badge-text ${statusClass}`}>{statusLabel}</span>
                                          <ChevronRight size={14} className="lesson-row-arrow" />
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

          </main>
        </div>
      </div>
    </StudentLayout>
  );
};

export default Roadmap;
