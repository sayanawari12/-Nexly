import React from 'react';
import { Snowflake, Info } from 'lucide-react';
import '../../styles/ContestComponents.css';

const FreezeBanner = ({ status }) => {
  if (status !== 'FROZEN') return null;

  return (
    <div className="contest-freeze-banner animate-fade-in">
      <div className="banner-content">
        <Snowflake size={18} className="freeze-icon animate-pulse" />
        <span className="banner-title">Scoreboard is Frozen!</span>
        <p className="banner-desc">
          Submissions are still being accepted and graded in real-time, but public standings will not update until the final results are published.
        </p>
      </div>
    </div>
  );
};

export default FreezeBanner;
