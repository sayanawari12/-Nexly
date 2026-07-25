import React from 'react';
import './TechnologyLogo.css';

export const TechnologyLogo = ({
  svg,
  src,
  component: Component,
  name = 'Tech',
  className = '',
  style = {}
}) => {
  return (
    <div className={`tech-logo-container ${className}`} style={style}>
      {Component ? (
        <Component />
      ) : svg ? (
        <div 
          className="tech-logo-svg-wrapper"
          dangerouslySetInnerHTML={{ __html: svg }} 
        />
      ) : src ? (
        <img 
          src={src} 
          alt={`${name} Logo`} 
          className="tech-logo-img" 
        />
      ) : (
        <div className="tech-logo-fallback">
          {name.substring(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

export default TechnologyLogo;
