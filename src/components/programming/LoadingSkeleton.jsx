import React from 'react';

const LoadingSkeleton = () => (
  <div className="hub-loading-container">
    <div className="skeleton-title"></div>
    <div className="skeleton-tabs"></div>
    <div className="skeleton-grid">
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
      <div className="skeleton-card"></div>
    </div>
  </div>
);

export default LoadingSkeleton;
