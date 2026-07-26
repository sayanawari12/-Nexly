import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ContestProvider } from './context/ContestContext';
import { ProgressProvider } from './context/ProgressContext';
import { LearningProvider } from './context/LearningContext';
import { ProgramProvider } from './context/ProgramContext';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

/* ─── Lazy Loaded Page Components ─── */
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Roadmap = lazy(() => import('./pages/Roadmap'));
const Analytics = lazy(() => import('./pages/Analytics'));
const ProgrammingHub = lazy(() => import('./pages/ProgrammingHub'));
const ProgramViewerPage = lazy(() => import('./pages/ProgramViewerPage'));
const SemesterCSubjectPage = lazy(() => import('./pages/SemesterCSubjectPage'));
const SemesterCChapterPage = lazy(() => import('./pages/SemesterCChapterPage'));
const SubjectSyllabus = lazy(() => import('./pages/SubjectSyllabus'));
const MasterLanguagePage = lazy(() => import('./pages/MasterLanguagePage'));
const CppQuiz = lazy(() => import('./pages/CppQuiz'));
const CodingPractice = lazy(() => import('./pages/CodingPractice'));
const DSQuiz = lazy(() => import('./pages/DSQuiz'));
const LessonViewerPage = lazy(() => import('./pages/LessonViewerPage'));
const ContestList = lazy(() => import('./pages/ContestList'));
const ContestDetails = lazy(() => import('./pages/ContestDetails'));
const ContestProblemArena = lazy(() => import('./pages/ContestProblemArena'));
const ContestLeaderboardPage = lazy(() => import('./pages/ContestLeaderboardPage'));
const ContestResultsPage = lazy(() => import('./pages/ContestResultsPage'));

/* ─── Minimal Fallback Loader ─── */
const PageFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#050505'
  }}>
    <div style={{
      width: '32px',
      height: '32px',
      border: '3px solid rgba(168, 85, 247, 0.2)',
      borderTopColor: '#a855f7',
      borderRadius: '50%'
    }} />
  </div>
);

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
                        <Suspense fallback={<PageFallback />}>
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
                                <MasterLanguagePage defaultLang="cpp" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/cpp" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="cpp" />
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
                                <MasterLanguagePage defaultLang="python" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/python" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="python" />
                              </ProtectedRoute>
                            } />
                            <Route path="/technologies/c" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="c" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/c" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="c" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/javascript" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="javascript" />
                              </ProtectedRoute>
                            } />
                            <Route path="/technologies/javascript" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="javascript" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/typescript" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="typescript" />
                              </ProtectedRoute>
                            } />
                            <Route path="/technologies/typescript" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="typescript" />
                              </ProtectedRoute>
                            } />
                            <Route path="/technologies/java" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="java" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/java" element={
                              <ProtectedRoute>
                                <MasterLanguagePage defaultLang="java" />
                              </ProtectedRoute>
                            } />
                            <Route path="/roadmaps/programming/:langId" element={
                              <ProtectedRoute>
                                <MasterLanguagePage />
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
                        </Suspense>
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
