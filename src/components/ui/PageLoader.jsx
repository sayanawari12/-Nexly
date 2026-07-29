import React from 'react';

const PageLoader = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-primary, #0a0a0f)',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Spinner ring */}
      <div
        style={{
          width: '44px',
          height: '44px',
          border: '3px solid rgba(139, 92, 246, 0.15)',
          borderTopColor: '#8b5cf6',
          borderRadius: '50%',
          animation: 'page-loader-spin 0.7s linear infinite',
        }}
      />
      <span
        style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: '0.82rem',
          letterSpacing: '0.06em',
          fontFamily: 'inherit',
        }}
      >
        Loading…
      </span>

      {/* Inline keyframes — avoids external CSS dependency */}
      <style>{`
        @keyframes page-loader-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;
