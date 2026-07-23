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
import SemesterCSubjectPage from './pages/SemesterCSubjectPage';
import SemesterCChapterPage from './pages/SemesterCChapterPage';
import { AuthProvider } from './context/AuthContext';
import { ContestProvider } from './context/ContestContext';
import ContestList from './pages/ContestList';
import ContestDetails from './pages/ContestDetails';
import ContestProblemArena from './pages/ContestProblemArena';
import ContestLeaderboardPage from './pages/ContestLeaderboardPage';
import ContestResultsPage from './pages/ContestResultsPage';
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
        <ContestProvider>
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
                      <Route path="/curriculum/semester-1/problem-solving-using-c" element={
                        <ProtectedRoute>
                          <SemesterCSubjectPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/curriculum/semester-1/problem-solving-using-c/chapter/:chapterSlug" element={
                        <ProtectedRoute>
                          <SemesterCChapterPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/curriculum/semester-2/:subjectId" element={
                        <ProtectedRoute>
                          <SubjectSyllabus />
                        </ProtectedRoute>
                      } />
                      <Route path="/technologies/cpp" element={
                        <ProtectedRoute>
                          <CppLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/roadmaps/programming/cpp" element={
                        <ProtectedRoute>
                          <CppLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/technologies/cpp/quiz" element={
                        <ProtectedRoute>
                          <CppQuiz />
                        </ProtectedRoute>
                      } />
                      <Route path="/technologies/cpp/practice" element={
                        <ProtectedRoute>
                          <CodingPractice />
                        </ProtectedRoute>
                      } />
                      <Route path="/curriculum/semester-2/data-structures/quiz" element={
                        <ProtectedRoute>
                          <DSQuiz />
                        </ProtectedRoute>
                      } />
                      <Route path="/technologies/python" element={
                        <ProtectedRoute>
                          <PythonLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/roadmaps/programming/python" element={
                        <ProtectedRoute>
                          <PythonLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/technologies/c" element={
                        <ProtectedRoute>
                          <CLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/roadmaps/programming/c" element={
                        <ProtectedRoute>
                          <CLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/roadmaps/programming/javascript" element={
                        <ProtectedRoute>
                          <CLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/roadmaps/programming/typescript" element={
                        <ProtectedRoute>
                          <CLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/technologies/java" element={
                        <ProtectedRoute>
                          <JavaLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/roadmaps/programming/java" element={
                        <ProtectedRoute>
                          <JavaLearningHub />
                        </ProtectedRoute>
                      } />
                      <Route path="/settings" element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } />
                      <Route path="/lessons/:lessonId" element={
                        <ProtectedRoute>
                          <LessonViewerPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/contests" element={
                        <ProtectedRoute>
                          <ContestList />
                        </ProtectedRoute>
                      } />
                      <Route path="/contests/:contestId" element={
                        <ProtectedRoute>
                          <ContestDetails />
                        </ProtectedRoute>
                      } />
                      <Route path="/contests/:contestId/problems/:problemId" element={
                        <ProtectedRoute>
                          <ContestProblemArena />
                        </ProtectedRoute>
                      } />
                      <Route path="/contests/:contestId/leaderboard" element={
                        <ProtectedRoute>
                          <ContestLeaderboardPage />
                        </ProtectedRoute>
                      } />
                      <Route path="/contests/:contestId/results" element={
                        <ProtectedRoute>
                          <ContestResultsPage />
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
    </ContestProvider>
  </AuthProvider>
</ThemeProvider>
  );
}

export default App;

