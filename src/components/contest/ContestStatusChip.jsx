import React from 'react';
import '../../styles/ContestComponents.css';

const ContestStatusChip = ({ status }) => {
  const getStatusClass = () => {
    switch (status) {
      case 'LIVE':
        return 'status-live';
      case 'FROZEN':
        return 'status-frozen';
      case 'UPCOMING':
        return 'status-upcoming';
      case 'ENDED':
      default:
        return 'status-ended';
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'LIVE':
        return 'LIVE';
      case 'FROZEN':
        return 'FROZEN ❄️';
      case 'UPCOMING':
        return 'UPCOMING';
      case 'ENDED':
      default:
        return 'ARCHIVED';
    }
  };

  return (
    <div className={`contest-status-chip ${getStatusClass()}`}>
      {status === 'LIVE' && <span className="pulse-indicator" />}
      {getStatusLabel()}
    </div>
  );
};

export default ContestStatusChip;
