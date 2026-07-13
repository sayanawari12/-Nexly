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
import Login from './pages/Login';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LearningProvider } from './context/LearningContext';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

const LessonViewerPlaceholder = () => (
  <div style={{ 
    padding: '100px 20px', 
    color: '#ffffff', 
    textAlign: 'center', 
    background: '#0a051b', 
    minHeight: '80vh', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    gap: '15px'
  }}>
    <h2 style={{ fontSize: '2rem', color: '#A855F7' }}>BCA Learning Engine</h2>
    <p style={{ color: '#b3b3b3', maxWidth: '500px' }}>
      This route is prepared and registered under dynamic routing. The Lesson Page will render content dynamically from the Learning Data Engine here.
    </p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <LearningProvider>
            <NotificationProvider>
              <SettingsProvider>
                <Router>
                  <div className="app-container">
                    <Navbar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/profile" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <Dashboard />
                        </ProtectedRoute>
                      } />
                      <Route path="/curriculum/semester-2/:subjectId" element={<SubjectSyllabus />} />
                      <Route path="/technologies/cpp" element={<CppLearningHub />} />
                      <Route path="/technologies/cpp/quiz" element={<CppQuiz />} />
                      <Route path="/technologies/cpp/practice" element={<CodingPractice />} />
                      <Route path="/curriculum/semester-2/data-structures/quiz" element={<DSQuiz />} />
                      <Route path="/technologies/python" element={<PythonLearningHub />} />
                      <Route path="/technologies/c" element={<CLearningHub />} />
                      <Route path="/technologies/java" element={<JavaLearningHub />} />
                      <Route path="/lessons/:lessonId" element={
                        <ProtectedRoute>
                          <LessonViewerPlaceholder />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </div>
                </Router>
              </SettingsProvider>
            </NotificationProvider>
          </LearningProvider>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

