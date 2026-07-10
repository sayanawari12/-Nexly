import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubjectSyllabus from './pages/SubjectSyllabus';
import CppLearningHub from './pages/CppLearningHub';
import CppQuiz from './pages/CppQuiz';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/curriculum/semester-2/:subjectId" element={<SubjectSyllabus />} />
          <Route path="/technologies/cpp" element={<CppLearningHub />} />
          <Route path="/technologies/cpp/quiz" element={<CppQuiz />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
