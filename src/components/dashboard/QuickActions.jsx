import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BookOpen, HelpCircle, Code2 } from 'lucide-react';
import './QuickActions.css';

const QuickActions = ({ actionsCustom, onActionClick }) => {
  const navigate = useNavigate();

  // Default 4 Quick Actions (Extensible for future items)
  const defaultActions = [
    {
      id: 'continue_learning',
      title: 'Continue',
      subtitle: 'Resume last lesson',
      icon: <Play size={20} className="qa-icon" />,
      badge: 'Resume',
      color: '#c084fc',
      bgGlow: 'rgba(168, 85, 247, 0.15)',
      onClick: () => navigate('/curriculum/semester-1/problem-solving-using-c/chapter/c-introduction')
    },
    {
      id: 'study_notes',
      title: 'Notes',
      subtitle: 'Subject study notes',
      icon: <BookOpen size={20} className="qa-icon" />,
      badge: 'Syllabus',
      color: '#38bdf8',
      bgGlow: 'rgba(56, 189, 248, 0.15)',
      onClick: () => navigate('/curriculum/semester-1/problem-solving-using-c')
    },
    {
      id: 'quiz_tests',
      title: 'Quiz',
      subtitle: 'Knowledge checks',
      icon: <HelpCircle size={20} className="qa-icon" />,
      badge: 'Test',
      color: '#f59e0b',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      onClick: () => navigate('/technologies/cpp')
    },
    {
      id: 'code_lab',
      title: 'Code Lab',
      subtitle: 'Compiler arena',
      icon: <Code2 size={20} className="qa-icon" />,
      badge: 'IDE',
      color: '#10b981',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      onClick: () => navigate('/code-lab')
    }
  ];

  const actionsList = actionsCustom || defaultActions;

  return (
    <section className="quick-actions-section" aria-label="Quick Actions">
      <div className="quick-actions-header">
        <h3 className="quick-actions-heading">Quick Actions</h3>
        <span className="quick-actions-tag font-mono">1-TAP ACCESS</span>
      </div>

      <div className="quick-actions-grid">
        {actionsList.map((action) => (
          <button
            key={action.id}
            className="quick-action-card glass-card"
            onClick={() => {
              if (onActionClick) onActionClick(action);
              if (action.onClick) action.onClick();
            }}
            aria-label={`${action.title} - ${action.subtitle}`}
          >
            <div 
              className="qa-icon-box"
              style={{ 
                color: action.color,
                background: action.bgGlow,
                borderColor: `${action.color}33`
              }}
            >
              {action.icon}
            </div>

            <div className="qa-text-content">
              <div className="qa-title-row">
                <span className="qa-title">{action.title}</span>
              </div>
              <span className="qa-subtitle">{action.subtitle}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;
