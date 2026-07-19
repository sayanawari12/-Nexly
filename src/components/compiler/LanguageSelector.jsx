import React from 'react';
import { useCompiler } from '../../context/CompilerContext';
import { COMPILER_LANGUAGES } from '../../constants/compilerLanguages';
import { Code2 } from 'lucide-react';

const LanguageSelector = () => {
  const { selectedLanguageId, changeLanguage, isRunning } = useCompiler();

  return (
    <div className="compiler-selector-wrapper">
      <Code2 size={14} className="selector-icon" />
      <select
        value={selectedLanguageId}
        onChange={(e) => changeLanguage(e.target.value)}
        disabled={isRunning}
        className="compiler-select"
        id="compiler-language-select"
      >
        {COMPILER_LANGUAGES.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.displayName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
