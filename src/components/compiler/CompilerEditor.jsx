import React, { useEffect, useRef, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useCompiler } from '../../context/CompilerContext';
import { COMPILER_LANGUAGES } from '../../constants/compilerLanguages';

// Configure monaco-editor to use the locally imported instance, bypassing CDN loading
loader.config({ monaco });

const CompilerEditor = ({ splitRatio }) => {
  const { selectedLanguageId, codeByLanguage, theme, fontSize, changeCode, isRunning, runCode, saveDraft } = useCompiler();
  const [editorInstance, setEditorInstance] = useState(null);

  // Ref pointing directly at the container DOM node for ResizeObserver
  const containerRef = useRef(null);

  const activeLanguageObj = COMPILER_LANGUAGES.find((lang) => lang.id === selectedLanguageId);
  const monacoLanguage = activeLanguageObj ? activeLanguageObj.monacoLanguage : 'c';
  const currentCode = codeByLanguage[selectedLanguageId] || '';

  const handleEditorDidMount = (editor) => {
    setEditorInstance(editor);

    // Bind Editor shortcut commands
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      saveDraft();
    });

    // Trigger layout immediately after mounting using actual container dimensions
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      editor.layout({ width: offsetWidth, height: offsetHeight });
    } else {
      editor.layout();
    }
  };

  // Handle font size change dynamically via editor instance if mounted
  useEffect(() => {
    if (editorInstance) {
      editorInstance.updateOptions({ fontSize });
    }
  }, [fontSize, editorInstance]);

  // Attach ResizeObserver to containerRef and call editor.layout() with explicit
  // dimensions so Monaco always fills 100% of its container regardless of split pane
  // or window resize events.
  useEffect(() => {
    if (!editorInstance || !containerRef.current) return;

    const container = containerRef.current;

    const relayout = () => {
      window.requestAnimationFrame(() => {
        if (editorInstance && container) {
          const { offsetWidth, offsetHeight } = container;
          if (offsetWidth > 0 && offsetHeight > 0) {
            editorInstance.layout({ width: offsetWidth, height: offsetHeight });
          }
        }
      });
    };

    // Observe this container for any dimension change
    const resizeObserver = new ResizeObserver(relayout);
    resizeObserver.observe(container);

    // Also observe window resize
    window.addEventListener('resize', relayout);

    // Immediately sync after effect runs (e.g. split pane moved)
    relayout();

    return () => {
      window.removeEventListener('resize', relayout);
      resizeObserver.disconnect();
    };
  }, [editorInstance, splitRatio]);

  return (
    <div className="compiler-editor-container" ref={containerRef}>
      <Editor
        height="100%"
        width="100%"
        language={monacoLanguage}
        theme={theme}
        value={currentCode}
        onChange={(value) => changeCode(value || '')}
        onMount={handleEditorDidMount}
        options={{
          fontSize: fontSize,
          readOnly: isRunning,
          minimap: { enabled: true },
          wordWrap: 'on',
          lineNumbers: 'on',
          automaticLayout: true,
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorSmoothCaretAnimation: 'on',
          padding: { top: 12, bottom: 12 },
          fontFamily: 'Fira Code, Source Code Pro, Courier New, monospace',
        }}
        loading={<div className="editor-loading-placeholder">Loading Editor...</div>}
      />
    </div>
  );
};

export default CompilerEditor;
