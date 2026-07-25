import React from 'react';
import GlassPanel from './GlassPanel';
import Badge from './Badge';
import Button from './Button';

export const ContentCard = ({
  icon: Icon,
  title,
  subtitle,
  description,
  badgeText,
  badgeVariant = 'purple',
  actionLabel,
  onAction,
  actionVariant = 'secondary',
  extraMeta = [],
  variant = 'default', // 'default' | 'compact' | 'bordered'
  className = '',
  style = {}
}) => {
  return (
    <GlassPanel 
      className={`ui-content-card ui-content-card-${variant} ${className}`}
      hoverEffect={true}
      style={{ padding: '20px', ...style }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {Icon && (
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#c084fc', flexShrink: 0 }}>
              <Icon size={18} />
            </div>
          )}
          <div>
            <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
              {title}
            </h4>
            {subtitle && <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>{subtitle}</span>}
          </div>
        </div>

        {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
      </div>

      {description && (
        <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.55, margin: '0 0 14px 0' }}>
          {description}
        </p>
      )}

      {extraMeta.length > 0 && (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '14px' }}>
          {extraMeta.map((meta, idx) => (
            <span key={idx} style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.55)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {meta}
            </span>
          ))}
        </div>
      )}

      {actionLabel && (
        <Button 
          variant={actionVariant} 
          size="sm" 
          onClick={onAction}
          fullWidth={variant === 'compact'}
        >
          {actionLabel}
        </Button>
      )}
    </GlassPanel>
  );
};

export default ContentCard;
