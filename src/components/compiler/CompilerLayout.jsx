import React, { useState, useEffect, useRef } from 'react';
import CompilerToolbar from './CompilerToolbar';
import CompilerEditor from './CompilerEditor';
import InputPanel from './InputPanel';
import OutputPanel from './OutputPanel';
import { useCompiler } from '../../context/CompilerContext';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { COMPILER_CONFIG } from '../../constants/compilerConfig';
import { loadSplitRatio, saveSplitRatio } from '../../services/compiler/workspaceStorageService';

// Layout metrics configuration constants
const WORKSPACE_LAYOUT = {
  GAP: 8,       // px
  DIVIDER: 6,   // px
};

const CompilerLayout = () => {
  const { runCode, saveDraft } = useCompiler();
  
  // Register global Ctrl+Enter and Ctrl+S hooks
  useKeyboardShortcuts({ onRun: runCode, onSave: saveDraft });

  // Load persisted layout sizing or use config default
  const [splitRatio, setSplitRatio] = useState(() => 
    loadSplitRatio(COMPILER_CONFIG.DEFAULT_SPLIT_RATIO)
  );
  
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  // Calculate precise layout offsets based on split ratio and config metrics
  const totalSpacing = (WORKSPACE_LAYOUT.GAP * 2) + WORKSPACE_LAYOUT.DIVIDER;
  const leftOffset = splitRatio * totalSpacing;
  const rightOffset = (1 - splitRatio) * totalSpacing;

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newRatio = (e.clientX - rect.left) / rect.width;
      
      // Bound the resize limits between 30% and 80%
      if (newRatio >= 0.3 && newRatio <= 0.8) {
        setSplitRatio(newRatio);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      saveSplitRatio(splitRatio);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, splitRatio]);

  return (
    <div className="compiler-layout">
      {/* 1. Toolbar */}
      <CompilerToolbar />

      {/* 2. Workspace Split Grid */}
      <div 
        className="compiler-workspace-grid" 
        ref={containerRef}
        style={{ 
          display: 'flex', 
          gap: `${WORKSPACE_LAYOUT.GAP}px`, 
          cursor: isDragging ? 'col-resize' : 'default', 
          flex: 1,
          minHeight: 0,
          minWidth: 0,
          position: 'relative' 
        }}
      >
        {/* Left Side: Monaco Editor */}
        <div 
          className="compiler-editor-wrapper-outer glass-card"
          style={{ 
            flex: `0 0 calc(${splitRatio * 100}% - ${leftOffset}px)`, 
            minWidth: 0,
            minHeight: 0,
            transition: isDragging ? 'none' : 'width 0.1s ease-out'
          }}
        >
          <CompilerEditor splitRatio={splitRatio} />
        </div>

        {/* Resizable Divider bar */}
        <div
          className="compiler-drag-divider"
          onMouseDown={handleMouseDown}
          style={{
            width: `${WORKSPACE_LAYOUT.DIVIDER}px`,
            cursor: 'col-resize',
            background: isDragging ? 'var(--accent-glow)' : 'rgba(255, 255, 255, 0.05)',
            borderRadius: '3px',
            transition: 'background 0.2s',
            zIndex: 10
          }}
        />

        {/* Right Side: Inputs & Outputs Panel Stack */}
        <div 
          className="compiler-sidebar-stack"
          style={{ 
            flex: `0 0 calc(${(1 - splitRatio) * 100}% - ${rightOffset}px)`, 
            minWidth: 0,
            minHeight: 0,
            display: 'flex', 
            flexDirection: 'column', 
            gap: `${WORKSPACE_LAYOUT.GAP}px`,
            transition: isDragging ? 'none' : 'width 0.1s ease-out'
          }}
        >
          <div className="compiler-panel-container input-container glass-card" style={{ flex: 1, minHeight: 0 }}>
            <InputPanel />
          </div>
          <div className="compiler-panel-container output-container glass-card" style={{ flex: 1, minHeight: 0 }}>
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerLayout;
