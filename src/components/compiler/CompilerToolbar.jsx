import React from 'react';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import FontSizeSelector from './FontSizeSelector';
import { useCompiler } from '../../context/CompilerContext';
import { Play, RotateCcw, Maximize2 } from 'lucide-react';

const CompilerToolbar = () => {
  const { resetEditor, runCode, isRunning, saveStatus } = useCompiler();

  return (
    <div className="compiler-toolbar">
      <div className="compiler-toolbar-left">
        <LanguageSelector />
        <ThemeSelector />
        <FontSizeSelector />
        
        {/* Save Status Indicator */}
        <span 
          style={{ 
            fontSize: '0.74rem', 
            color: saveStatus === 'Saved' 
              ? 'rgba(16, 185, 129, 0.8)' 
              : saveStatus === 'Saving...' 
                ? 'rgba(245, 158, 11, 0.8)' 
                : 'rgba(239, 68, 68, 0.8)',
            marginLeft: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(255, 255, 255, 0.02)',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            userSelect: 'none'
          }}
          title="Draft auto-saves are written to local storage"
        >
          {saveStatus === 'Saved' && '● Saved'}
          {saveStatus === 'Saving...' && '○ Saving...'}
          {saveStatus === 'Unsaved Changes' && '● Unsaved'}
        </span>
      </div>
      <div className="compiler-toolbar-right">
        <button
          className="compiler-toolbar-btn run-btn"
          onClick={runCode}
          disabled={isRunning}
          title={isRunning ? "Running code..." : "Run Code (Ctrl+Enter)"}
        >
          <Play size={14} className={isRunning ? "icon-spin" : ""} />
          <span>{isRunning ? "Running..." : "Run"}</span>
        </button>
        
        <button
          className="compiler-toolbar-btn reset-btn"
          onClick={resetEditor}
          disabled={isRunning}
          title="Reset Code"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>

        <button
          className="compiler-toolbar-btn fullscreen-btn"
          disabled
          title="Fullscreen (Sprint 4.2)"
        >
          <Maximize2 size={14} />
          <span>Fullscreen</span>
        </button>
      </div>
    </div>
  );
};

export default CompilerToolbar;
