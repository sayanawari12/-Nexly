import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { COMPILER_LANGUAGES } from '../constants/compilerLanguages';
import { COMPILER_CONFIG } from '../constants/compilerConfig';
import { runCode as executeCode } from '../services/compiler/compilerService';
import {
  runStorageMigration,
  loadPreferences,
  savePreferences,
  loadDrafts,
  saveDrafts,
  loadHistory,
  saveHistory
} from '../services/compiler/workspaceStorageService';

const CompilerContext = createContext();

export const CompilerProvider = ({ children }) => {
  // Execute migrations first
  runStorageMigration();

  const defaultLanguages = COMPILER_LANGUAGES;
  
  // Load initial states from storage service
  const savedPrefs = loadPreferences() || {};
  const savedDrafts = loadDrafts();
  const savedHistory = loadHistory();

  // Populate code maps from drafts or fallbacks
  const initialCodeMap = {};
  defaultLanguages.forEach((lang) => {
    initialCodeMap[lang.id] = savedDrafts[lang.id] !== undefined ? savedDrafts[lang.id] : lang.defaultCode;
  });

  const [selectedLanguageId, setSelectedLanguageId] = useState(savedPrefs.selectedLanguageId || defaultLanguages[0]?.id || 'c');
  const [codeByLanguage, setCodeByLanguage] = useState(initialCodeMap);
  const [theme, setTheme] = useState(savedPrefs.theme || 'vs-dark');
  const [fontSize, setFontSize] = useState(savedPrefs.fontSize || 14);
  const [customInput, setCustomInput] = useState(savedPrefs.customInput || '');
  const [executionHistory, setExecutionHistory] = useState(savedHistory);
  const [saveStatus, setSaveStatus] = useState('Saved');
  
  // Refs for tracking async executions and save debounces
  const activeExecutionIdRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  // Structured executionState
  const [executionState, setExecutionState] = useState({
    isRunning: false,
    executionId: null,
    result: null,
    error: null,
    startedAt: null,
    finishedAt: null
  });

  // Helper to persist current preference configurations
  const updatePreferences = (updatedFields) => {
    const currentPrefs = loadPreferences() || {};
    const newPrefs = {
      selectedLanguageId,
      theme,
      fontSize,
      customInput,
      ...currentPrefs,
      ...updatedFields
    };
    savePreferences(newPrefs);
  };

  const cancelExecution = () => {
    activeExecutionIdRef.current = null;
    setExecutionState({
      isRunning: false,
      executionId: null,
      result: null,
      error: null,
      startedAt: null,
      finishedAt: null
    });
  };

  const changeLanguage = (langId) => {
    cancelExecution();
    setSelectedLanguageId(langId);
    updatePreferences({ selectedLanguageId: langId });
  };

  // Change code with unsaved status trigger and auto-save debouncer
  const changeCode = (newCode) => {
    setCodeByLanguage((prev) => {
      const nextMap = { ...prev, [selectedLanguageId]: newCode };
      
      setSaveStatus('Unsaved Changes');

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        setSaveStatus('Saving...');
        saveDrafts(nextMap);
        setSaveStatus('Saved');
      }, COMPILER_CONFIG.AUTO_SAVE_DELAY);

      return nextMap;
    });
  };

  const changeTheme = (themeName) => {
    setTheme(themeName);
    updatePreferences({ theme: themeName });
  };

  const changeFontSize = (size) => {
    const s = Number(size);
    setFontSize(s);
    updatePreferences({ fontSize: s });
  };

  const changeInput = (input) => {
    setCustomInput(input);
    updatePreferences({ customInput: input });
  };

  const resetEditor = () => {
    cancelExecution();
    const originalLangObj = defaultLanguages.find((lang) => lang.id === selectedLanguageId);
    if (originalLangObj) {
      const originalCode = originalLangObj.defaultCode;
      setCodeByLanguage((prev) => {
        const nextMap = { ...prev, [selectedLanguageId]: originalCode };
        setSaveStatus('Saving...');
        saveDrafts(nextMap);
        setSaveStatus('Saved');
        return nextMap;
      });
    }
  };

  const clearOutput = () => {
    setExecutionState({
      isRunning: false,
      executionId: null,
      result: null,
      error: null,
      startedAt: null,
      finishedAt: null
    });
  };

  // Manual save draft trigger
  const saveDraft = () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    setSaveStatus('Saving...');
    saveDrafts(codeByLanguage);
    setSaveStatus('Saved');
  };

  // Force synchronous write of code drafts on page closing/unloading
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveDrafts(codeByLanguage);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [codeByLanguage]);

  // Run code action
  const runCode = async () => {
    if (executionState.isRunning) return;

    const newExecutionId = Date.now().toString();
    activeExecutionIdRef.current = newExecutionId;

    const activeLanguageObj = COMPILER_LANGUAGES.find((lang) => lang.id === selectedLanguageId);
    const judge0Id = activeLanguageObj?.judge0Id;
    const currentCode = codeByLanguage[selectedLanguageId] || '';

    setExecutionState({
      isRunning: true,
      executionId: newExecutionId,
      result: {
        status: 'processing',
        statusMessage: 'Preparing execution...',
        stdout: null,
        stderr: null,
        compileOutput: null,
        time: null,
        memory: null
      },
      error: null,
      startedAt: new Date().toISOString(),
      finishedAt: null
    });

    try {
      const response = await executeCode(
        currentCode,
        judge0Id,
        customInput,
        // onProgress status update
        (progress) => {
          if (activeExecutionIdRef.current === newExecutionId) {
            setExecutionState((prev) => ({
              ...prev,
              result: {
                ...prev.result,
                statusMessage: progress.message
              }
            }));
          }
        },
        // isExecutionActive validation check
        () => activeExecutionIdRef.current === newExecutionId
      );

      if (activeExecutionIdRef.current === newExecutionId) {
        if (response) {
          setExecutionState((prev) => ({
            ...prev,
            isRunning: false,
            result: response,
            error: null,
            finishedAt: new Date().toISOString()
          }));

          // Log execution into history list (limited to MAX_HISTORY)
          const runLog = {
            id: newExecutionId,
            languageId: selectedLanguageId,
            status: response.status,
            statusMessage: response.statusMessage,
            time: response.time,
            timestamp: new Date().toISOString()
          };

          setExecutionHistory((prev) => {
            const nextHistory = [runLog, ...prev].slice(0, COMPILER_CONFIG.MAX_HISTORY);
            saveHistory(nextHistory);
            return nextHistory;
          });
        }
      }
    } catch (err) {
      if (activeExecutionIdRef.current === newExecutionId) {
        setExecutionState((prev) => ({
          ...prev,
          isRunning: false,
          result: null,
          error: err.message || 'Execution failed unexpectedly.',
          finishedAt: new Date().toISOString()
        }));
      }
    }
  };

  // Derive compiler output message for Console UI
  let outputMessage = "Click 'Run' to execute code in the workspace.";
  if (executionState.isRunning) {
    outputMessage = executionState.result?.statusMessage || "Running code...";
  } else if (executionState.result) {
    const { status, stdout, stderr, compileOutput, statusMessage } = executionState.result;
    if (status === 'compile_error') {
      outputMessage = `[Compilation Error]\n${compileOutput || stderr || 'No detail log.'}`;
    } else if (status === 'runtime_error') {
      outputMessage = `[Runtime Error]\n${stderr || 'Program crashed.'}`;
    } else if (status === 'accepted') {
      outputMessage = stdout || 'Program executed successfully (no stdout).';
    } else {
      outputMessage = stderr || compileOutput || statusMessage || 'Execution finished.';
    }
  } else if (executionState.error) {
    outputMessage = `[Error]\n${executionState.error}`;
  }

  return (
    <CompilerContext.Provider
      value={{
        selectedLanguageId,
        codeByLanguage,
        theme,
        fontSize,
        customInput,
        outputMessage,
        isRunning: executionState.isRunning,
        executionState,
        executionHistory,
        saveStatus,
        changeLanguage,
        changeCode,
        changeTheme,
        changeFontSize,
        changeInput,
        resetEditor,
        clearOutput,
        saveDraft,
        runCode
      }}
    >
      {children}
    </CompilerContext.Provider>
  );
};

export const useCompiler = () => {
  const context = useContext(CompilerContext);
  if (!context) {
    throw new Error('useCompiler must be used within a CompilerProvider');
  }
  return context;
};
