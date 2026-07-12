import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SubjectSyllabus from './pages/SubjectSyllabus';
import CppLearningHub from './pages/CppLearningHub';
import CppQuiz from './pages/CppQuiz';
import CodingPractice from './pages/CodingPractice';
import DSQuiz from './pages/DSQuiz';
import PythonLearningHub from './pages/PythonLearningHub';
import CLearningHub from './pages/CLearningHub';
import JavaLearningHub from './pages/JavaLearningHub';
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
          <Route path="/technologies/cpp/practice" element={<CodingPractice />} />
          <Route path="/curriculum/semester-2/data-structures/quiz" element={<DSQuiz />} />
          <Route path="/technologies/python" element={<PythonLearningHub />} />
          <Route path="/technologies/c" element={<CLearningHub />} />
          <Route path="/technologies/java" element={<JavaLearningHub />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
