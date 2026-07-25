import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({
  progress = 0,
  label = 'Progress',
  showPercentage = true,
  height = 6,
  className = '',
  style = {}
}) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div style={{ width: '100%', ...style }} className={`ui-progress-box ${className}`}>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          {label && <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.6)' }}>{label}</span>}
          {showPercentage && <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.82rem', fontWeight: 700, color: '#c084fc' }}>{safeProgress}%</span>}
        </div>
      )}
      <div style={{ width: '100%', height: `${height}px`, background: 'rgba(255, 255, 255, 0.06)', borderRadius: '100px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${safeProgress}%` }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ height: '100%', background: 'linear-gradient(90deg, #8B5CF6 0%, #c084fc 100%)', borderRadius: '100px' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
