/**
 * GLOBAL DESIGN TOKEN SYSTEM
 * Centralized Visual Standards for Antigravity & BCA Platform
 */

export const DESIGN_TOKENS = {
  // Color Palette
  colors: {
    bgPrimary: '#050505',
    bgSecondary: '#0b0b10',
    bgTertiary: '#11111a',
    bgElevated: 'rgba(255, 255, 255, 0.015)',
    
    // Purple Accents
    accentPrimary: '#A855F7',
    accentSecondary: '#8B5CF6',
    accentLight: '#c084fc',
    accentGlow: 'rgba(168, 85, 247, 0.22)',
    
    // Semantic Colors
    success: '#34d399',
    successGlow: 'rgba(52, 211, 153, 0.15)',
    warning: '#f59e0b',
    warningGlow: 'rgba(245, 158, 11, 0.15)',
    error: '#ef4444',
    errorGlow: 'rgba(239, 68, 68, 0.15)',
    info: '#60a5fa',
    infoGlow: 'rgba(96, 165, 250, 0.15)',
    
    // Text Hierarchy
    textPrimary: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.7)',
    textMuted: 'rgba(255, 255, 255, 0.45)',
    
    // Borders
    borderSubtle: 'rgba(255, 255, 255, 0.08)',
    borderPrimary: 'rgba(168, 85, 247, 0.25)',
    borderActive: '#a855f7',
  },

  // Gradients
  gradients: {
    heroBg: 'linear-gradient(135deg, #050505 0%, #0B0B10 50%, #11111A 100%)',
    primaryBtn: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)',
    accentText: 'linear-gradient(135deg, #A855F7 0%, #c084fc 100%)',
    progressFill: 'linear-gradient(90deg, #8B5CF6 0%, #c084fc 100%)',
    cardGlow: 'radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 65%)',
  },

  // Typography
  typography: {
    fontFamilyHeadings: "'Space Grotesk', -apple-system, sans-serif",
    fontFamilyBody: "-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, sans-serif",
    fontFamilyCode: "'Fira Code', 'Cascadia Code', monospace",
    
    sizes: {
      xs: '0.72rem',
      sm: '0.82rem',
      base: '0.92rem',
      md: '1.05rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2.2rem',
      hero: '2.8rem',
    },
    
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  // Spacing Scale
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
    section: '48px',
    huge: '64px',
  },

  // Border Radius
  borderRadius: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    xl: '20px',
    xxl: '24px',
    pill: '100px',
  },

  // Glassmorphism & Shadows
  glass: {
    cardBackground: 'rgba(255, 255, 255, 0.015)',
    cardBorder: '1px solid rgba(168, 85, 247, 0.22)',
    backdropBlur: 'blur(16px)',
    shadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(168, 85, 247, 0.05)',
  },

  // Responsive Breakpoints
  breakpoints: {
    mobileMax: '767px',
    tabletMin: '768px',
    tabletMax: '1023px',
    desktopMin: '1024px',
    containerMax: '1400px',
  },

  // Z-Index Stack
  zIndex: {
    dropdown: 10,
    sticky: 100,
    modal: 1000,
    toast: 9999,
  },

  // Animations
  transitions: {
    fast: 'all 0.15s ease',
    normal: 'all 0.25s ease',
    slow: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
  },
};

export default DESIGN_TOKENS;
