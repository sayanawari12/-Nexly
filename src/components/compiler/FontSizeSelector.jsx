import React from 'react';
import { useCompiler } from '../../context/CompilerContext';
import { Type } from 'lucide-react';

const FontSizeSelector = () => {
  const { fontSize, changeFontSize, isRunning } = useCompiler();
  const sizes = [12, 13, 14, 15, 16, 17, 18, 20, 22, 24];

  return (
    <div className="compiler-selector-wrapper">
      <Type size={14} className="selector-icon" />
      <select
        value={fontSize}
        onChange={(e) => changeFontSize(e.target.value)}
        disabled={isRunning}
        className="compiler-select"
        id="compiler-fontsize-select"
      >
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}px
          </option>
        ))}
      </select>
    </div>
  );
};

export default FontSizeSelector;
