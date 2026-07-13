import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers, CheckCircle2, BookOpen, Lock, Menu, X, Book, Cpu, Database } from 'lucide-react';

const iconMap = {
  Code: Book,
  Cpu: Cpu,
  Database: Database
};

const LessonSidebar = ({ 
  semesters,
  subjects,
  units,
  lessons,
  activeSemesterId,
  setActiveSemesterId,
  activeSubjectId,
  setActiveSubjectId,
  activeLessonId,
  onLessonSelect,
  completedLessons,
  isOpen,
  onClose
}) => {
  const [expandedUnitId, setExpandedUnitId] = useState(null);

  const toggleUnit = (unitId) => {
    setExpandedUnitId(prev => (prev === unitId ? null : unitId));
  };

  // Filter subjects for the active semester
  const semesterSubjects = subjects.filter(s => s.semesterId === activeSemesterId);

  // Group lessons by unitId
  const getUnitLessons = (unitId) => {
    return lessons.filter(l => l.unitId === unitId);
  };

  return (
    <aside className={`lesson-viewer-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h3 className="sidebar-heading">Course Syllabus</h3>
        {onClose && (
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close Sidebar">
            <X size={20} />
          </button>
        )}
      </div>

      <div className="sidebar-selectors">
        {/* Semester Selector */}
        <div className="selector-group">
          <label className="selector-label">Semester</label>
          <select 
            value={activeSemesterId || ''} 
            onChange={(e) => {
              setActiveSemesterId(e.target.value);
              // Auto-select first subject in new semester
              const firstSub = subjects.find(s => s.semesterId === e.target.value);
              if (firstSub) setActiveSubjectId(firstSub.id);
            }}
            className="sidebar-select"
          >
            {semesters.map(sem => (
              <option key={sem.id} value={sem.id}>{sem.title}</option>
            ))}
          </select>
        </div>

        {/* Subject Selector */}
        <div className="selector-group">
          <label className="selector-label">Subject</label>
          <select 
            value={activeSubjectId || ''} 
            onChange={(e) => setActiveSubjectId(e.target.value)}
            className="sidebar-select"
          >
            {semesterSubjects.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Collapsible Syllabus Accordions */}
      <div className="sidebar-syllabus-accordion">
        {units.length === 0 ? (
          <div className="sidebar-empty">No units loaded.</div>
        ) : (
          units.map((unit, index) => {
            const isExpanded = expandedUnitId === unit.id || (expandedUnitId === null && index === 0);
            const unitLessons = getUnitLessons(unit.id);
            
            return (
              <div key={unit.id} className={`sidebar-unit-accordion ${isExpanded ? 'expanded' : ''}`}>
                <button 
                  className="sidebar-unit-header"
                  onClick={() => toggleUnit(unit.id)}
                  aria-expanded={isExpanded}
                >
                  <Layers size={14} className="unit-icon" />
                  <span className="unit-title">{unit.title}</span>
                  {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {isExpanded && (
                  <div className="sidebar-unit-lessons-list">
                    {unitLessons.length === 0 ? (
                      <div className="sidebar-no-lessons">No lessons in this unit.</div>
                    ) : (
                      unitLessons.map((lesson) => {
                        const isCompleted = completedLessons?.has(lesson.id) || false;
                        const isActive = activeLessonId === lesson.id;
                        
                        return (
                          <button
                            key={lesson.id}
                            className={`sidebar-lesson-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                            onClick={() => {
                              onLessonSelect(lesson.id);
                              if (onClose) onClose(); // Auto close on mobile
                            }}
                          >
                            <div className="lesson-item-status-icon">
                              {isCompleted ? (
                                <CheckCircle2 size={14} className="status-completed" />
                              ) : (
                                <BookOpen size={14} className="status-unread" />
                              )}
                            </div>
                            <span className="lesson-item-title">{lesson.title}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};

export default LessonSidebar;
