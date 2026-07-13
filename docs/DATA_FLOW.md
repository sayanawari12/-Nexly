# System Data Flow Specification

This document models the sequence of data transfers and state transitions inside the platform.

---

## 🔑 1. Authentication & Profile Synchronization Flow

```mermaid
sequenceDiagram
    participant UI as Login Page
    participant AS as AuthService
    participant AC as AuthContext
    participant US as UserService
    participant FS as Firestore (users/{uid})
    participant PC as ProgressContext
    participant NAV as Navbar & Router

    UI->>AS: Triggers login(email, password)
    AS->>AC: Updates Firebase Auth session token
    AC->>US: Calls createUserDocument(uid, details)
    US->>FS: Reads users/{uid} document
    alt If user does not exist
        US->>FS: Writes initialized default schema profile
    else If user exists
        US->>FS: Updates only lastLogin and updatedAt
    end
    FS-->>US: Returns user profile details
    US-->>AC: Resolves background synchronization
    AC-->>NAV: Propagates non-null 'user' object synchronously
    NAV->>NAV: Swaps GuestNavbar with Student AuthNavbar instantly
    PC->>FS: Subscribes to /users/{uid} onSnapshot listener
    PC->>NAV: Emits synced XP, levels, and streaks to Navbar & Profile views
```

---

## ⏱️ 2. Real-Time Lesson Progress Flow

```mermaid
sequenceDiagram
    participant LS as Lesson Component
    participant PS as ProgressService
    participant FS as Firestore (/progress)
    participant PC as ProgressContext
    participant UI as Profile & Dashboard views

    LS->>PS: Triggers saveUserProgress(uid, roadmapId, lessonId, 100, true)
    PS->>FS: Writes document { completed: true, percentage: 100 }
    FS-->>PC: Triggers real-time onSnapshot listener event
    PC->>PC: Re-evaluates completedLessons sets and levels
    PC->>UI: Propagates updated state to components
    UI->>UI: Recalculates stats cards & green calendars instantly without page reload
```
