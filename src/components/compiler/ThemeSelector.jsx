import React from 'react';
import { useCompiler } from '../../context/CompilerContext';
import { COMPILER_THEMES } from '../../constants/compilerThemes';
import { Palette } from 'lucide-react';

const ThemeSelector = () => {
  const { theme, changeTheme, isRunning } = useCompiler();

  return (
    <div className="compiler-selector-wrapper">
      <Palette size={14} className="selector-icon" />
      <select
        value={theme}
        onChange={(e) => changeTheme(e.target.value)}
        disabled={isRunning}
        className="compiler-select"
        id="compiler-theme-select"
      >
        {COMPILER_THEMES.map((t) => (
          <option key={t.id} value={t.id}>
            {t.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
