import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './routes/ProtectedRoute';
import PageLoader from './components/ui/PageLoader';
import { AuthProvider } from './context/AuthContext';
import { ContestProvider } from './context/ContestContext';
import { ProgressProvider } from './context/ProgressContext';
import { LearningProvider } from './context/LearningContext';
import { ProgramProvider } from './context/ProgramContext';
import { NotificationProvider } from './context/NotificationContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

// ─── Eagerly-loaded (above-the-fold / auth critical) ──────────────────────────
import Home from './pages/Home';
import Login from './pages/Login';

// ─── Route-split lazy chunks ──────────────────────────────────────────────────
// Each React.lazy() creates a separate chunk loaded only when the route is hit.

const Profile                  = lazy(() => import('./pages/Profile'));
const Dashboard                = lazy(() => import('./pages/Dashboard'));
const Roadmap                  = lazy(() => import('./pages/Roadmap'));
const Analytics                = lazy(() => import('./pages/Analytics'));
const ProgrammingHub           = lazy(() => import('./pages/ProgrammingHub'));
const ProgramViewerPage        = lazy(() => import('./pages/ProgramViewerPage'));
const LessonViewerPage         = lazy(() => import('./pages/LessonViewerPage'));
const SubjectSyllabus          = lazy(() => import('./pages/SubjectSyllabus'));

// Heavy learning hubs — largest individual chunks
const MasterLanguagePage       = lazy(() => import('./pages/MasterLanguagePage'));
const CppLearningHub           = lazy(() => import('./pages/CppLearningHub'));
const CppQuiz                  = lazy(() => import('./pages/CppQuiz'));
const CodingPractice           = lazy(() => import('./pages/CodingPractice'));
const DSQuiz                   = lazy(() => import('./pages/DSQuiz'));
const PythonLearningHub        = lazy(() => import('./pages/PythonLearningHub'));
const CLearningHub             = lazy(() => import('./pages/CLearningHub'));
const JavaLearningHub          = lazy(() => import('./pages/JavaLearningHub'));

// Curriculum pages
const SemesterCSubjectPage     = lazy(() => import('./pages/SemesterCSubjectPage'));
const SemesterCChapterPage     = lazy(() => import('./pages/SemesterCChapterPage'));
const GeneralEnglishSubjectPage = lazy(() => import('./pages/GeneralEnglishSubjectPage'));
const GeneralEnglishChapterPage = lazy(() => import('./pages/GeneralEnglishChapterPage'));
const DataStructureUnit1Page   = lazy(() => import('./pages/DataStructureUnit1Page'));
const DataStructureQuestionPage = lazy(() => import('./pages/DataStructureQuestionPage'));
const DSNotesPage               = lazy(() => import('./pages/curriculum/DSNotesPage'));

// Contest pages
const ContestList              = lazy(() => import('./pages/ContestList'));
const ContestDetails           = lazy(() => import('./pages/ContestDetails'));
const ContestProblemArena      = lazy(() => import('./pages/ContestProblemArena'));
const ContestLeaderboardPage   = lazy(() => import('./pages/ContestLeaderboardPage'));
const ContestResultsPage       = lazy(() => import('./pages/ContestResultsPage'));

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
                    {/* Suspense boundary wraps ALL lazy routes */}
                    <Suspense fallback={<PageLoader />}>
                      <Routes>
                        {/* ── Public routes (eagerly loaded) ── */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />

                        {/* ── Protected routes (lazy-loaded) ── */}
                        <Route path="/profile" element={
                          <ProtectedRoute><Profile /></ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                          <ProtectedRoute><Dashboard /></ProtectedRoute>
                        } />
                        <Route path="/roadmap" element={
                          <ProtectedRoute><Roadmap /></ProtectedRoute>
                        } />
                        <Route path="/analytics" element={
                          <ProtectedRoute><Analytics /></ProtectedRoute>
                        } />
                        <Route path="/settings" element={
                          <ProtectedRoute><Profile /></ProtectedRoute>
                        } />

                        {/* ── Practice / Programming hub ── */}
                        <Route path="/practice" element={
                          <ProtectedRoute><ProgrammingHub /></ProtectedRoute>
                        } />
                        <Route path="/practice/programs/:programId" element={
                          <ProtectedRoute><ProgramViewerPage /></ProtectedRoute>
                        } />

                        {/* ── Lessons ── */}
                        <Route path="/lessons/:lessonId" element={
                          <ProtectedRoute><LessonViewerPage /></ProtectedRoute>
                        } />

                        {/* ── Curriculum: Semester C ── */}
                        <Route path="/curriculum/semester-1/problem-solving-using-c" element={
                          <ProtectedRoute><SemesterCSubjectPage /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-1/problem-solving-using-c/chapter/:chapterSlug" element={
                          <ProtectedRoute><SemesterCChapterPage /></ProtectedRoute>
                        } />

                        {/* ── Curriculum: General English ── */}
                        <Route path="/curriculum/semester-1/general-english" element={
                          <ProtectedRoute><GeneralEnglishSubjectPage /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-1/general-english/chapter/:chapterSlug" element={
                          <ProtectedRoute><GeneralEnglishChapterPage /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-2/general-english" element={
                          <ProtectedRoute><GeneralEnglishSubjectPage /></ProtectedRoute>
                        } />

                        {/* ── Curriculum: Data Structures (Semester 2) ── */}
                        <Route path="/curriculum/semester-2/data-structures/notes" element={
                          <ProtectedRoute><DSNotesPage /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-2/data-structures" element={
                          <ProtectedRoute><DataStructureUnit1Page /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-2/data-structures/unit-1" element={
                          <ProtectedRoute><DataStructureUnit1Page /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-2/data-structures/unit-1/question/:questionSlug" element={
                          <ProtectedRoute><DataStructureQuestionPage /></ProtectedRoute>
                        } />

                        {/* ── Curriculum: Semester 2 ── */}
                        <Route path="/curriculum/semester-2/:subjectId" element={
                          <ProtectedRoute><SubjectSyllabus /></ProtectedRoute>
                        } />

                        {/* ── Technology learning hubs ── */}
                        <Route path="/technologies/cpp" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="cpp" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/cpp" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="cpp" /></ProtectedRoute>
                        } />
                        <Route path="/technologies/cpp/quiz" element={
                          <ProtectedRoute><CppQuiz /></ProtectedRoute>
                        } />
                        <Route path="/technologies/cpp/practice" element={
                          <ProtectedRoute><CodingPractice /></ProtectedRoute>
                        } />
                        <Route path="/curriculum/semester-2/data-structures/quiz" element={
                          <ProtectedRoute><DSQuiz /></ProtectedRoute>
                        } />
                        <Route path="/technologies/python" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="python" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/python" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="python" /></ProtectedRoute>
                        } />
                        <Route path="/technologies/c" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="c" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/c" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="c" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/javascript" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="javascript" /></ProtectedRoute>
                        } />
                        <Route path="/technologies/javascript" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="javascript" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/typescript" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="typescript" /></ProtectedRoute>
                        } />
                        <Route path="/technologies/typescript" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="typescript" /></ProtectedRoute>
                        } />
                        <Route path="/technologies/java" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="java" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/java" element={
                          <ProtectedRoute><MasterLanguagePage defaultLang="java" /></ProtectedRoute>
                        } />
                        <Route path="/roadmaps/programming/:langId" element={
                          <ProtectedRoute><MasterLanguagePage /></ProtectedRoute>
                        } />

                        {/* ── Contests ── */}
                        <Route path="/contests" element={
                          <ProtectedRoute><ContestList /></ProtectedRoute>
                        } />
                        <Route path="/contests/:contestId" element={
                          <ProtectedRoute><ContestDetails /></ProtectedRoute>
                        } />
                        <Route path="/contests/:contestId/problems/:problemId" element={
                          <ProtectedRoute><ContestProblemArena /></ProtectedRoute>
                        } />
                        <Route path="/contests/:contestId/leaderboard" element={
                          <ProtectedRoute><ContestLeaderboardPage /></ProtectedRoute>
                        } />
                        <Route path="/contests/:contestId/results" element={
                          <ProtectedRoute><ContestResultsPage /></ProtectedRoute>
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
