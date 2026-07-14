import React from 'react';

const EmptyProgramsState = ({ onResetFilters }) => {
  return (
    <div className="empty-programs-state">
      <h3>No Programs Found</h3>
      <p>Try modifying your search or filter inputs to locate programs.</p>
      <button 
        onClick={onResetFilters}
        className="btn-reset-filters"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default EmptyProgramsState;
