import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/design-tokens.js';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'icon'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconRight: IconRight,
  onClick,
  disabled = false,
  fullWidth = false,
  className = '',
  style = {},
  ariaLabel
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          background: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
          color: '#ffffff',
          border: '1px solid rgba(168, 85, 247, 0.4)',
          boxShadow: '0 4px 18px rgba(139, 92, 246, 0.35)',
        };
      case 'secondary':
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        };
      case 'ghost':
        return {
          background: 'transparent',
          color: '#c084fc',
          border: 'none',
        };
      case 'icon':
        return {
          background: 'rgba(255, 255, 255, 0.03)',
          color: 'rgba(255, 255, 255, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '8px',
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { padding: '6px 12px', fontSize: '0.78rem', minHeight: '34px' };
      case 'lg':
        return { padding: '12px 28px', fontSize: '1rem', minHeight: '48px' };
      case 'md':
      default:
        return { padding: '9px 18px', fontSize: '0.86rem', minHeight: '40px' };
    }
  };

  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: variant === 'primary' || variant === 'secondary' ? '100px' : '10px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? '100%' : 'auto',
    transition: 'all 0.2s ease',
    outline: 'none',
    userSelect: 'none',
    ...getSizeStyles(),
    ...getVariantStyles(),
    ...style,
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      style={baseStyle}
      className={`ui-btn ui-btn-${variant} ${className}`}
      aria-label={ariaLabel}
    >
      {Icon && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
      <span>{children}</span>
      {IconRight && <IconRight size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} />}
    </motion.button>
  );
};

export default Button;
