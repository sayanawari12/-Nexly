import React from 'react';
import { useCompiler } from '../../context/CompilerContext';
import { Terminal } from 'lucide-react';

const InputPanel = () => {
  const { customInput, changeInput } = useCompiler();

  return (
    <div className="compiler-panel input-panel">
      <div className="compiler-panel-header">
        <Terminal size={14} className="panel-header-icon" />
        <span>Standard Input (stdin)</span>
      </div>
      <div className="compiler-panel-body">
        <textarea
          value={customInput}
          onChange={(e) => changeInput(e.target.value)}
          placeholder="Provide program inputs here (one per line)..."
          className="compiler-textarea"
          id="compiler-custom-input"
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default InputPanel;
