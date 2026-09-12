import React from 'react';

const ProblemCard = ({ problem }) => {
  if (!problem) return null;

  const diffColor =
    problem.difficulty === 'Easy'
      ? '#22c55e'
      : problem.difficulty === 'Medium'
      ? '#eab308'
      : '#ef4444';

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.015)',
        border: '1px solid rgba(255,255,255,0.04)',
        padding: '16px 20px',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: '0.88rem',
            fontWeight: '700',
            marginBottom: '4px',
            margin: '0 0 4px 0',
          }}
        >
          {problem.title}
        </h4>
        <p
          style={{
            fontSize: '0.74rem',
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}
        >
          {problem.statement}
        </p>
      </div>
      <span
        style={{
          fontSize: '0.72rem',
          fontWeight: '700',
          color: diffColor,
          background: `${diffColor}15`,
          padding: '3px 10px',
          borderRadius: '6px',
          flexShrink: 0,
          border: `1px solid ${diffColor}30`,
        }}
      >
        {problem.difficulty}
      </span>
    </div>
  );
};

export default ProblemCard;
