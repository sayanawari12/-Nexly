# Contributing to BCA Department Learning Platform

Thank you for your interest in contributing to **bca-web**! We welcome bug fixes, UI enhancements, documentation improvements, and new learning modules.

---

## 🛠️ Development Workflow

### 1. Fork & Clone
1. Fork the repository on GitHub: https://github.com/sayanawari12/bca-department-website
2. Clone your fork locally:
   `ash
   git clone https://github.com/YOUR-USERNAME/bca-department-website.git
   cd bca-department-website
   `

### 2. Branch Naming Convention
Create a dedicated branch for your work:
* eat/your-feature-name (for new features or modules)
* ix/issue-description (for bug fixes)
* docs/improvement-area (for documentation updates)
* perf/optimization (for performance improvements)

`ash
git checkout -b feat/interactive-quiz-module
`

### 3. Local Environment Setup
`ash
# Install frontend and backend packages
npm install
npm --prefix backend install

# Set up local environment configs
cp .env.example .env
cp backend/.env.example backend/.env

# Run database migrations and generate types
npm --prefix backend run prisma:generate

# Start development servers
# Terminal 1:
npm --prefix backend run dev

# Terminal 2:
npm start
`

---

## 📝 Commit Guidelines

We adhere to [Conventional Commits](https://www.conventionalcommits.org/):
* eat: A new feature for users
* ix: A bug fix
* docs: Documentation only changes
* style: Code style changes (formatting, white-space)
* efactor: Code restructuring without changing behavior
* perf: Performance improvements
* 	est: Adding or refactoring tests

---

## 🚀 Submitting a Pull Request

1. Ensure builds pass locally before opening a PR:
   `ash
   npm run build
   npm --prefix backend run build
   `
2. Push your branch to your GitHub fork.
3. Open a Pull Request against the main branch.
4. Fill out the PR template with relevant context and testing notes.

Thank you for helping build an extraordinary educational platform! 🎓
