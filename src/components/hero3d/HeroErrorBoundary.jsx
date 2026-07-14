/**
 * HeroErrorBoundary.jsx
 * Class-based React Error Boundary wrapping the entire 3D canvas.
 * On any WebGL or Three.js error, renders a polished CSS fallback card
 * that preserves the Hero's visual identity without crashing the page.
 */
import React from 'react';

class HeroErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || 'Unknown error' };
  }

  componentDidCatch(error, info) {
    // Silent in production — log only in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('[HeroErrorBoundary] 3D scene failed:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return <FallbackCard />;
    }
    return this.props.children;
  }
}

/** Polished CSS fallback rendered when WebGL is unavailable or crashes */
function FallbackCard() {
  return (
    <div className="hero-3d-fallback" role="img" aria-label="BCA Department laptop preview">
      <div className="fallback-screen">
        <div className="fallback-dots">
          <span /><span /><span />
        </div>
        <div className="fallback-content">
          <div className="fallback-bar" style={{ width: '60%' }} />
          <div className="fallback-bar" style={{ width: '80%' }} />
          <div className="fallback-bar" style={{ width: '45%' }} />
          <div className="fallback-bar" style={{ width: '70%', marginTop: 16 }} />
        </div>
      </div>
      <div className="fallback-base" />
      <div className="fallback-foot" />
    </div>
  );
}

export default HeroErrorBoundary;
