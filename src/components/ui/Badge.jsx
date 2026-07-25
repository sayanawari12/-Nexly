import React from 'react';

export const Badge = ({
  children,
  variant = 'purple', // 'purple' | 'green' | 'blue' | 'yellow' | 'red' | 'subtle'
  icon: Icon,
  className = '',
  style = {}
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'green':
        return {
          color: '#34d399',
          background: 'rgba(52, 211, 153, 0.12)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
        };
      case 'blue':
        return {
          color: '#60a5fa',
          background: 'rgba(96, 165, 250, 0.12)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
        };
      case 'yellow':
        return {
          color: '#f59e0b',
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
        };
      case 'red':
        return {
          color: '#ef4444',
          background: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        };
      case 'subtle':
        return {
          color: 'rgba(255, 255, 255, 0.7)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        };
      case 'purple':
      default:
        return {
          color: '#c084fc',
          background: 'rgba(168, 85, 247, 0.15)',
          border: '1px solid rgba(168, 85, 247, 0.35)',
        };
    }
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '0.74rem',
    fontWeight: 700,
    padding: '4px 10px',
    borderRadius: '6px',
    letterSpacing: '0.3px',
    boxSizing: 'border-box',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <span style={badgeStyle} className={`ui-badge ui-badge-${variant} ${className}`}>
      {Icon && <Icon size={12} />}
      <span>{children}</span>
    </span>
  );
};

export default Badge;
