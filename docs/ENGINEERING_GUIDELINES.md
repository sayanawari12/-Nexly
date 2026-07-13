# engineering guidelines

This document establishes coding standards, directory guidelines, styling rules, and architectural principles for developers on the BCA Department Learning Platform.

---

## 🏛️ 1. Core Architecture Principles
- **Separation of Concerns (SoC)**: Separate presentation templates (UI components) from state providers, domain rules, and data access layers.
- **Single Responsibility Principle (SRP)**: Each file must have exactly one reason to change.
- **Repository Pattern**: No component or service should query Firestore collections directly. Database reads and writes are isolated to `src/repositories/`.
- **Dependency Flow Direction**: Dependency arrows must strictly point inwards. UI layer depends on Contexts/Hooks, which depend on Services, which depend on Repositories, which depend on SDK instances.

---

## 📂 2. Directory Structure & Rules

- `src/firebase/`: Houses configuration setups. React UI files must never import this directory, except to check SDK instances under context provider roots.
- `src/repositories/`: Responsible only for Firestore database read/write/update/delete operations. No state tracking or validation logic here.
- `src/services/`: Isolated domains containing pure business logic (like XP validation, streaks math, username generator validation checks). Absolutely no React code or UI files.
- `src/context/`: Globally accessible states. Keep contexts thin by outsourcing database tasks to services.
- `src/layouts/`: Frame layout wrappers for Guest, Student, Admin, and Authentication routing views.
- `src/utils/`: Global standalone helper methods.
- `src/constants/`: Consolidated magic strings, collections names, and routing mappings.

---

## 🏷️ 3. Naming Conventions

- **React Components**: Use PascalCase (e.g. `FloatingUI.js`, `GuestLayout.jsx`).
- **Hooks**: Prefix with `use` in camelCase (e.g. `useAuth.js`).
- **Services & Repositories**: CamelCase ending in domain naming (e.g. `userService.js`, `progressRepository.js`).
- **Constants**: UPPER_CASE snake_case (e.g. `COLLECTIONS.USERS`, `ROUTES.PROFILE`).

---

## 💻 4. Component Rules
- Keep components small and focused.
- Pass parameters via standard parameters (props) where possible.
- Avoid nesting business logic directly in component render loops. Delegate state transformations to hooks or context providers.

---

## 🔗 5. Git Workflow
- Perform updates inside feature branches.
- Run complete production compilation checks (`npx react-scripts build`) locally before merging commits into the main branch.
- Commit messages should be clear and descriptive (e.g. `Refactor project architecture to enterprise-grade`).
