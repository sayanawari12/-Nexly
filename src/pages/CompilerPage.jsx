import React from 'react';
import StudentLayout from '../layouts/StudentLayout';
import { CompilerProvider } from '../context/CompilerContext';
import CompilerLayout from '../components/compiler/CompilerLayout';
import '../styles/Compiler.css';

const CompilerPage = () => {
  React.useEffect(() => {
    document.title = "💻 Coding Workspace | Project APEX";
  }, []);

  return (
    <StudentLayout>
      <CompilerProvider>
        <section className="compiler-page-section">
          <div className="section-header" style={{ marginBottom: '30px' }}>
            <span className="section-tag">Coding Workspace</span>
            <h1 className="section-title text-gradient">Coding Workspace</h1>
            <p className="section-subtitle">
              Write, edit, and compile code in your browser. Supported languages include C, C++, Java, Python, and JavaScript.
            </p>
          </div>
          <CompilerLayout />
        </section>
      </CompilerProvider>
    </StudentLayout>
  );
};

export default CompilerPage;
