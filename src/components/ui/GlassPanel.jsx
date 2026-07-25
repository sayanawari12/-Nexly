import React from 'react';
import { motion } from 'framer-motion';

export const GlassPanel = ({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(168, 85, 247, 0.22)',
  borderColor = 'rgba(168, 85, 247, 0.22)',
  radius = '24px',
  padding = '24px',
  hoverEffect = false,
  onClick
}) => {
  const panelStyle = {
    background: 'rgba(255, 255, 255, 0.015)',
    border: `1px solid ${borderColor}`,
    borderRadius: radius,
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    boxShadow: `0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px ${glowColor}`,
    padding: padding,
    boxSizing: 'border-box',
    width: '100%',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.25s ease',
    ...style,
  };

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, borderColor: '#a855f7' } : {}}
      onClick={onClick}
      style={panelStyle}
      className={`glass-panel ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;
