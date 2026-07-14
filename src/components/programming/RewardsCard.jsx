import React from 'react';
import { Sparkles, HelpCircle } from 'lucide-react';

const RewardsCard = () => {
  return (
    <div className="sidebar-card info-card">
      <div className="info-header">
        <Sparkles size={16} className="sparkle-icon" />
        <h3 className="sidebar-title">Gamified Rewards</h3>
      </div>
      <p className="info-desc">
        Every program solved grants you <strong>+100 XP</strong> and boosts your overall status. Complete subjects to unlock specialization certificates.
      </p>
      <div className="info-footer">
        <HelpCircle size={14} /> Future compiler support coming soon!
      </div>
    </div>
  );
};

export default RewardsCard;
