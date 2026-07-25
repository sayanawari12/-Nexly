import React from 'react';
import { motion } from 'framer-motion';

export const StickyTabs = ({
  tabs = [],
  activeTab,
  onTabChange,
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={`c-tab-nav ${className}`}
      style={{
        position: 'sticky',
        top: '70px',
        zIndex: 100,
        background: 'rgba(5, 5, 5, 0.95)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
        width: '100%',
        ...style
      }}
    >
      <div 
        className="c-tab-nav-inner"
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          gap: '8px',
          padding: '0 24px',
          overflowX: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`c-tab-btn ${isActive ? 'active' : ''}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 18px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '2px solid #A855F7' : '2px solid transparent',
                color: isActive ? '#A855F7' : 'rgba(255, 255, 255, 0.65)',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.88rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StickyTabs;
