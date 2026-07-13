# Software Architecture Specification

This document details the production-ready React / Firebase Clean Architecture implemented for the BCA Department Learning Platform.

---

## 🏗️ 1. Project Layers

To achieve clean decoupling, the project is divided into the following single-responsibility layers:

1. **Firebase SDK Layer (`src/firebase/`)**:
   - Isolates direct Firebase SDK imports.
   - Prevents UI components from importing Firebase modules directly.
   
2. **Service Layer (`src/services/`)**:
   - Owns the business logic.
   - Orchestrates CRUD operations and API dispatches.
   - Segmented by domain boundaries (Auth, User, Progress, Lesson, Quiz, Notification, Storage).

3. **State Management & Context Layer (`src/context/`)**:
   - Manages global state trees (Session, Progress, Notifications, User Settings, Themes).
   
4. **Custom Hooks Layer (`src/hooks/`)**:
   - Provides simplified interfaces to UI components to consume Context state variables.

5. **Routing & Guards Layer (`src/routes/` & `src/components/auth/`)**:
   - Enforces authentication rules and role-based permissions (Student vs Admin).

6. **UI Components & Pages Layer (`src/components/` & `src/pages/`)**:
   - Renders views. Strictly presentation-only (dumb components); communicates solely via custom hooks and contexts.

---

## 📂 2. Folder Structure

```text
src/
├── firebase/
│   ├── config.js         # Firebase App configuration initialization
│   ├── auth.js           # Auth instance locator
│   ├── firestore.js      # Firestore instance locator
│   └── storage.js        # Storage instance locator
│
├── services/
│   ├── auth/
│   │   └── authService.js         # Authentication helpers
│   ├── user/
│   │   └── userService.js         # Profile database helpers
│   ├── progress/
│   │   └── progressService.js     # Step completion database helpers
│   ├── lesson/
│   │   └── lessonService.js       # Notes and bookmarks helpers
│   ├── quiz/
│   │   └── quizService.js         # Quiz attempts trackers
│   ├── notification/
│   │   └── notificationService.js # Notification dispatcher
│   └── storage/
│       └── storageService.js      # Resume / certificate file uploads
│
├── context/
│   ├── AuthContext.jsx            # User authentication state provider
│   ├── ProgressContext.jsx        # Real-time learning progress state provider
│   ├── NotificationContext.jsx    # Notification dispatcher context provider
│   ├── SettingsContext.jsx        # Profile configuration context provider
│   └── ThemeContext.jsx           # Style theme selector context provider
│
├── hooks/
│   └── useAuth.js                 # Unified hook for auth credentials
│
├── routes/
│   └── ProtectedRoute.jsx         # Session guard coordinator
│
└── components/
    └── auth/
        ├── AuthGuard.jsx          # Route session gatekeeper
        └── RoleGuard.jsx          # Route role privilege checker
```

---

## 🛡️ 3. Authentication & Authorization

Authentication states auto-swap navigation hierarchies instantly without requiring page refreshes:
- **Guest**: Access to syllabus outlines and Sign In portals.
- **Student**: Access to learning sandboxes, profile settings, and bookmarks.
- **Admin (Future Module)**: Access to analytics dashboards and students editor panels.
