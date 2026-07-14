import React from 'react';
import ProgramCard from './ProgramCard';
import EmptyProgramsState from './EmptyProgramsState';

const ProgramList = ({ 
  programs, 
  bookmarkedIds, 
  completedIds, 
  onToggleBookmark, 
  onToggleCompletion,
  onResetFilters
}) => {
  return (
    <div className="programs-list">
      {programs.length > 0 ? (
        programs.map(program => (
          <ProgramCard
            key={program.id}
            program={program}
            isBookmarked={bookmarkedIds.has(program.id)}
            isCompleted={completedIds.has(program.id)}
            onToggleBookmark={onToggleBookmark}
            onToggleCompletion={onToggleCompletion}
          />
        ))
      ) : (
        <EmptyProgramsState onResetFilters={onResetFilters} />
      )}
    </div>
  );
};

export default ProgramList;
