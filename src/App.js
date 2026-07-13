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
import LessonViewerPage from './pages/LessonViewerPage';
import Roadmap from './pages/Roadmap';
import Analytics from './pages/Analytics';
import ProgrammingHub from './pages/ProgrammingHub';
import ProgramViewerPage from './pages/ProgramViewerPage';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import { LearningProvider } from './context/LearningContext';
import { ProgramProvider } from './context/ProgramContext';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LearningProvider>
          <ProgressProvider>
            <ProgramProvider>
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
                      <Route path="/roadmap" element={
                        <ProtectedRoute>
                          <Roadmap />
                        </ProtectedRoute>
                      } />
                      <Route path="/analytics" element={
                        <ProtectedRoute>
                          <Analytics />
                        </ProtectedRoute>
                      } />
                      <Route path="/practice" element={
                        <ProtectedRoute>
                          <ProgrammingHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/practice/programs/:programId" element={
                        <ProtectedRoute>
                          <ProgramViewerPage />
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
                          <LessonViewerPage />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </div>
                </Router>
              </SettingsProvider>
            </NotificationProvider>
          </ProgramProvider>
        </ProgressProvider>
      </LearningProvider>
    </AuthProvider>
  </ThemeProvider>
  );
}

export default App;

