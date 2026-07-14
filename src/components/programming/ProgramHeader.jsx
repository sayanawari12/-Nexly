import React from 'react';
import { Code2 } from 'lucide-react';
import ProgrammingStatsCard from './ProgrammingStatsCard';

const ProgramHeader = ({ completedCount, totalCount, completionPercentage }) => {
  return (
    <header className="hub-header slide-up-in">
      <div className="header-info-col">
        <div className="title-row">
          <Code2 className="header-icon" size={32} />
          <h1 className="hub-title">Interactive Programming Hub</h1>
        </div>
        <p className="hub-desc">
          Compile your understanding across multiple subjects. Select concepts, solve curated syntax structures, and track compiler execution outputs.
        </p>
      </div>
      <ProgrammingStatsCard 
        completedCount={completedCount}
        totalCount={totalCount}
        completionPercentage={completionPercentage}
      />
    </header>
  );
};

export default ProgramHeader;
