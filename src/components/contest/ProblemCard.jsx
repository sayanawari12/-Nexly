import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2, ArrowRight, Award } from 'lucide-react';
import '../../styles/ContestComponents.css';

const ProblemCard = ({ problem, index, contestId }) => {
  const navigate = useNavigate();
  const { id, title, difficulty, maxScore } = problem;

  // Render difficulty badge
  const getDiffClass = () => {
    switch (difficulty) {
      case 'EASY':
        return 'diff-easy';
      case 'MEDIUM':
        return 'diff-medium';
      case 'HARD':
      default:
        return 'diff-hard';
    }
  };

  const alphabetIndex = String.fromCharCode(65 + index); // 0 -> A, 1 -> B ...

  const handleSolve = () => {
    navigate(`/contests/${contestId}/problems/${id}`);
  };

  return (
    <div className="contest-problem-card glass-card animate-scale-in" onClick={handleSolve}>
      <div className="problem-index-circle">
        <span>{alphabetIndex}</span>
      </div>

      <div className="problem-card-body">
        <h4 className="problem-title">{title}</h4>
        <div className="problem-meta-row">
          <span className={`difficulty-badge ${getDiffClass()}`}>{difficulty}</span>
          <div className="score-badge">
            <Award size={12} style={{ marginRight: '4px' }} />
            <span>{maxScore} Points</span>
          </div>
        </div>
      </div>

      <button className="btn-solve-problem" onClick={(e) => { e.stopPropagation(); handleSolve(); }}>
        Solve <ArrowRight size={14} style={{ marginLeft: '4px' }} />
      </button>
    </div>
  );
};

export default ProblemCard;
