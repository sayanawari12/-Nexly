import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Layers } from 'lucide-react';
import LessonList from './LessonList';

const UnitAccordion = ({ 
  units, 
  lessons, 
  completedLessons, 
  activeLessonId, 
  onLessonSelect 
}) => {
  const [expandedUnitId, setExpandedUnitId] = useState(null);

  const toggleUnit = (unitId) => {
    setExpandedUnitId(prev => (prev === unitId ? null : unitId));
  };

  if (!units || units.length === 0) {
    return <div className="no-units-text">No learning units available.</div>;
  }

  return (
    <div className="unit-accordion-wrapper">
      {units.map((unit, index) => {
        const isExpanded = expandedUnitId === unit.id || (expandedUnitId === null && index === 0);
        // Filter lessons for this unit
        const unitLessons = lessons.filter(l => l.unitId === unit.id);
        
        return (
          <div key={unit.id} className={`unit-accordion-item ${isExpanded ? 'expanded' : ''}`}>
            <button 
              className="unit-accordion-header"
              onClick={() => toggleUnit(unit.id)}
              aria-expanded={isExpanded}
            >
              <div className="unit-header-title-group">
                <Layers className="unit-icon" size={16} />
                <span className="unit-title">{unit.title}</span>
              </div>
              <div className="unit-header-toggle">
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </button>
            
            {isExpanded && (
              <div className="unit-accordion-content">
                <LessonList 
                  lessons={unitLessons}
                  completedLessons={completedLessons}
                  activeLessonId={activeLessonId}
                  onLessonSelect={onLessonSelect}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default UnitAccordion;
