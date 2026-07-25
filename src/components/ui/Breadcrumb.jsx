import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export const Breadcrumb = ({
  items = [],
  onBack,
  className = '',
  style = {}
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`c-breadcrumb ${className}`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
        fontSize: '0.8rem',
        color: 'rgba(255, 255, 255, 0.5)',
        marginBottom: '16px',
        ...style
      }}
    >
      <button 
        onClick={onBack || (() => navigate(-1))} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: 0
        }}
      >
        <ArrowLeft size={13} /> Back
      </button>
      
      <span style={{ opacity: 0.3 }}>|</span>
      
      <button 
        onClick={() => navigate('/')} 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          fontSize: '0.8rem',
          fontWeight: '500',
          padding: 0
        }}
      >
        <Home size={13} /> Home
      </button>

      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <span style={{ opacity: 0.3 }}>›</span>
          {item.onClick ? (
            <button
              onClick={item.onClick}
              style={{
                background: 'none',
                border: 'none',
                color: item.active ? '#c084fc' : 'rgba(255, 255, 255, 0.7)',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: item.active ? '600' : '500',
                padding: 0
              }}
            >
              {item.label}
            </button>
          ) : (
            <span style={{ color: item.active ? '#c084fc' : 'rgba(255, 255, 255, 0.7)', fontWeight: item.active ? '600' : '500' }}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
