# BCA Department Learning Platform Roadmap

This document outlines the development phases, completed milestones, and upcoming modules for the platform.

---

## 🏆 Completed Features (Stable Release)

1. **Phase 1: Dynamic Visual Progress System**
   - Winding SVG learning roadmap path flowing Top-to-Bottom.
   - Interactive milestones with category indicators.
   - Lock states completely unlocked.

2. **Phase 2: Automated Code Synchronization (Repo Sync)**
   - Local JSON C-code database generated directly from C repository scans.
   - Synchronized 54 codes spanning 8 distinct category folders.

3. **Phase 3: Interactive Learning Sandbox & Quizzes**
   - Lesson pages with sub-tab panels (Theory, Playground, Quizzes, Notes).
   - In-browser C playground terminal console executing simulations.
   - Multiple choice quizzes tracking scores.
   - Notes areas writing updates asynchronously to Firestore `/notes/` on input blur.

4. **Phase 4: Session Security & Authentication**
   - Firebase Auth context providers protecting paths `/profile`.
   - Form state glows on typing password.

5. **Phase 5: Global Spotlight Search Modal**
   - Centered spotlight modal activated via `Ctrl + K`.
   - Grouped categorized results (Lessons, Roadmaps, Programs).
   - local storage search history caching.

6. **Phase 6: Enterprise Clean Architecture Refactoring**
   - Isolated SDK layers under `src/firebase/`.
   - Single-responsibility services under `src/services/`.
   - Scalable future-ready context providers.

---

## 🔮 Future Expansion Modules

The refactored architecture is modularly prepared to ingest:

1. **Discussion Forum**:
   - Relies on `UserService` profile schemas (e.g. usernames `@sayanawari12`) to render comment threads, replies, and notifications.

2. **Coding leaderboards & Rankings**:
   - Queries `users` collection order bounds by `learningStats.xp` or quiz accuracy directly.

3. **Achievements & Badge Awards**:
   - Appends badges to `/users/{uid}.achievements` lists upon quiz successes.

4. **Administrative Panels**:
   - Configures `/users/{uid}.role === "admin"` to allow teachers to publish roadmap updates, evaluate student completions, and configure syllabus items.
