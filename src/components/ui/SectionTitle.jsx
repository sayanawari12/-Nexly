import React from 'react';

export const SectionTitle = ({
  title,
  subtitle,
  icon: Icon,
  badgeText,
  align = 'left',
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`ui-section-title-box ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        textAlign: align,
        marginBottom: '20px',
        ...style
      }}
    >
      {badgeText && (
        <span 
          style={{
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#A855F7',
            background: 'rgba(168, 85, 247, 0.08)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            padding: '4px 12px',
            borderRadius: '100px',
            marginBottom: '8px'
          }}
        >
          {badgeText}
        </span>
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {Icon && <Icon size={22} style={{ color: '#c084fc' }} />}
        <h2 
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.4rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: 0
          }}
        >
          {title}
        </h2>
      </div>

      {subtitle && (
        <p 
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.65)',
            margin: '4px 0 0 0',
            lineHeight: 1.5
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
