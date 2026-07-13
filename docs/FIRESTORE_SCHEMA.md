# Firestore Database Schema Specification

This document details the collections, documents, fields, and relationships inside the Cloud Firestore Database.

---

## 👤 1. Collection: `users`
- **Path**: `/users/{uid}`
- **Document ID**: Firebase Authentication UID
- **Fields**:
  - `uid` (string): Relational unique ID mapping to Firebase Auth.
  - `email` (string): Student registration email handle.
  - `displayName` (string): Public display name.
  - `username` (string): Globally unique user handle (e.g. `@sayanawari12`).
  - `photoURL` (string): Avatar asset URL.
  - `role` (string): Student role (`student` or `admin`).
  - `createdAt` (string/ISO-timestamp): Document creation date.
  - `updatedAt` (string/ISO-timestamp): Last profile save date.
  - `lastLogin` (string/ISO-timestamp): Timestamps recorded on login checks.
  - `profileCompleted` (boolean): Flag checking if required profile details exist.
  - `streak` (number): Daily active consecutive study streak counter.
  - `progress` (number): Unified course completion percentage bounds.
  - `bio` (string): Mini student description tagline.
  - `college` (string): Student's university name.
  - `course` (string): Selected program (e.g. BCA).
  - `semester` (string): Current semester.
  - `githubURL` (string): Stored personal GitHub project link.
  - `linkedinURL` (string): Stored professional LinkedIn credentials link.
  - `resumeURL` (string): Stored resume storage file link.
  - `bookmarks` (array of strings): Bookmark ids.
  - `certificates` (array of strings): Certificate ids.
  - `achievements` (array of strings): Unlock codes.

---

## ⏱️ 2. Collection: `progress`
- **Path**: `/progress/{progressId}`
- **Document ID**: `${uid}_${roadmapId}_${lessonId}`
- **Fields**:
  - `uid` (string): Relational ID mapping to user document.
  - `roadmapId` (string): Course track identification (e.g. `c-programming`).
  - `lessonId` (string): Lesson index code.
  - `completed` (boolean): Flag checking if step completion box is checked.
  - `percentage` (number): Lesson percentage complete (0 or 100).
  - `lastOpened` (string/ISO-timestamp): Last visited timestamp.
  - `updatedAt` (string/ISO-timestamp): Modified date.

---

## 🔖 3. Collection: `bookmarks`
- **Path**: `/bookmarks/{bookmarkId}`
- **Document ID**: `${uid}_${lessonId}_${programId}`
- **Fields**:
  - `uid` (string): Stored owner UID.
  - `lessonId` (string): Linked lesson card.
  - `programId` (string): Stored compiler sandbox source code file.
  - `roadmapId` (string): Parent track.
  - `createdAt` (string/ISO-timestamp): Save date.

---

## 📝 4. Collection: `quizHistory`
- **Path**: `/quizHistory/{historyId}`
- **Document ID**: `${uid}_${quizId}_${timestamp}`
- **Fields**:
  - `uid` (string): Relational student UID.
  - `quizId` (string): Attempted quiz.
  - `score` (number): Stored grading marks count.
  - `accuracy` (number): Stored percentile ratio.
  - `completedAt` (string/ISO-timestamp): Run date.

---

## 🏆 5. Collection: `certificates`
- **Path**: `/certificates/{certificateId}`
- **Document ID**: Unique hash
- **Fields**:
  - `uid` (string): Recipient UID.
  - `certificateId` (string): Relational identifier.
  - `course` (string): Course title.
  - `issuedAt` (string/ISO-timestamp): Credentials timestamp.
  - `pdfUrl` (string): Stored PDF storage resource path.
