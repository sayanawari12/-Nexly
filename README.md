<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9333EA,06B6D4&height=200&section=header&text=NEXLY&fontSize=52&fontAlignY=36&fontColor=ffffff" width="100%" alt="NEXLY Header Banner"/>

<br/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&size=18&duration=3000&pause=1000&color=06B6D4&center=true&vCenter=true&width=700&height=40&lines=NEXLY+%E2%80%94+Turn+Curiosity+Into+Skills;The+Unified+Technology+Learning+Platform;Learn+Concept+%E2%86%92+Practice+Problems+%E2%86%92+Build+Projects" alt="Typing SVG Animation" />
</a>

<br/>

**NEXLY removes the gap between learning a concept and proving you can use it. The unified platform integrating interactive lessons, auto-recommended practice problems, multi-language code sandboxing, and portfolio project builds.**

<br/>

[![Version](https://img.shields.io/badge/version-2.0.0--nexly-9333EA?style=for-the-badge&logo=git&logoColor=white)](package.json)
[![Security Policy](https://img.shields.io/badge/security-audited-10B981?style=for-the-badge&logo=shield&logoColor=white)](SECURITY.md)
[![React](https://img.shields.io/badge/React-18-06B6D4?style=for-the-badge&logo=react)](https://react.dev)

</div>

---

## 🚀 Core Platform Navigation & Routes

| Route | Destination | Purpose |
| :--- | :--- | :--- |
| `/` | **Homepage** | 5-second live runnable trial, tech grid, Learn $\rightarrow$ Practice $\rightarrow$ Build visual loop, founder note |
| `/learn` (`/technologies/cpp`, `/technologies/c`, `/technologies/python`) | **Structured Learning Paths** | Content schema hierarchy (`Technology → Module → Topic → Lesson`) with runnable code examples, embedded quizzes, and practice problems |
| `/practice` | **Practice Catalog** | Auto-recommended problem challenges linked directly to lesson topics |
| `/code-lab` | **Multi-Language Code Sandbox** | Rate-limited multi-language execution engine (5000ms CPU cap, 128MB memory cap) & read-only SQL sandbox |
| `/projects` | **Guided Portfolio Projects** | Step-by-step milestone checklists with self-reported completion tracking |
| `/dashboard` | **Qualitative Dashboard** | Qualitative skill snapshot (*Novice / Developing / Solid / Strong*), weak topics focus, continue learning widget & activity graph |

---

## 🛠️ Engine Architecture

1. **Recommendation Engine (`recommendationEngine.js`)**:
   - Matches lesson topic IDs directly to targeted practice problems.
   - Calculates qualitative skill bands without fake percentage precision.
   - Auto-detects user weak topics for targeted practice.

2. **Code Execution & Security (`codeExecutionService.js` & `sqlSandboxService.js`)**:
   - Enforces 10 executions/min rate limit per user bucket.
   - 5000ms CPU wall-time limit & 128MB memory ceiling.
   - Strict SQL sandbox with SELECT-only whitelist, comment & multi-statement blocking, 2000ms query timeout cap, and row-set matrix evaluation.

3. **Single Authentication Source of Truth (`AuthContext.jsx`)**:
   - PostgreSQL `User.id` and signed `apex_token` JWT form the single canonical application auth state.
   - Firebase Auth serves strictly as the Google Social Login Identity Provider, exchanging tokens via `POST /api/v1/auth/firebase`.

---

## 💡 Quick Overview

`NEXLY` is a production-grade full-stack tech learning platform engineered for seamless progression from theoretical concepts to runnable practice problems and portfolio projects.

- **Frontend**: Built with React 18, React Router v7, and **Framer Motion** for fluid UI transitions, styled with component utility icons from **Lucide React**.
- **Backend API**: Powered by a robust **TypeScript + Express 5** server utilizing **Prisma ORM 7** over a **PostgreSQL** relational database.
- **Real-Time & Queue Infrastructure**: Real-time updates via **Socket.io 4** (configured with `@socket.io/redis-adapter` & `ioredis`) alongside asynchronous task queues using **BullMQ**.
- **Execution Engine**: Sandboxed Judge0 API & Piston integration for safe code execution.

---

## 💻 Core Modules Overview

<details open>
<summary><b>Explore NEXLY Core Modules</b></summary>

<br/>

| Module | Description | Core Tech Stack |
| :--- | :--- | :--- |
| **Learn Hub** | Structured technology paths (C, Python, C++), interactive lesson navigator, embedded micro-quizzes, and quick reference cards. | `React 18`, `Framer Motion`, `Monaco Editor` |
| **Practice Catalog** | Topic-matched practice problems with difficulty filters (Easy/Medium/Hard) and automated code evaluation. | `React 18`, `recommendationEngine`, `Axios` |
| **Code Lab** | In-browser multi-language playground & interactive SQL sandbox with execution rate-limiting. | `Judge0 API`, `Piston Sandbox`, `Monaco Editor` |
| **Projects Showcase** | Step-by-step guided portfolio projects with milestone tracking and architectural blueprints. | `React 18`, `Framer Motion` |
| **User Dashboard** | Qualitative skill band visualization, weak topic remediation, and real-time study analytics. | `React 18`, `Lucide React`, `Prisma 7` |

</details>

---

## ✨ Key Features

| Feature | Description | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| **Relational Data Management** | Type-safe PostgreSQL schema management via Prisma ORM 7. | `Prisma 7` & `PostgreSQL` | ✅ Implemented |
| **Topic Recommendation Engine** | Auto-matches practice problems to current lesson tags with zero-score filtering. | `recommendationEngine.js` | ✅ Implemented |
| **Sandboxed Code Execution** | Multi-language code evaluation with strict timeout and memory limits. | `Judge0 API` & `Piston` | ✅ Implemented |
| **Single Source JWT Auth** | Consolidated identity state backed by PostgreSQL `User.id` and JWT tokens. | `jsonwebtoken`, `bcrypt`, `Firebase IDP` | ✅ Implemented |
| **Modular Technology Hubs** | Reusable `TechnologyLearningHub` shell powering C, Python, and upcoming hubs. | `React 18`, `Framer Motion` | ✅ Implemented |
| **Containerized Setup** | Pre-configured `docker-compose.yml` for database, Redis, and API services. | `Docker Compose` | ✅ Implemented |

---

## 🏗️ System Architecture

```mermaid
%%{init: {'theme': 'dark', 'themeVariables': { 'darkMode': true, 'background': '#050816', 'primaryColor': '#111827', 'primaryTextColor': '#FFFFFF', 'primaryBorderColor': '#9333EA', 'lineColor': '#06B6D4', 'tertiaryColor': '#1F2937' }}}%%
graph TD
    subgraph Client ["Frontend Layer (React 18 + Framer Motion)"]
        UI[React UI Components] --> Router[React Router v7]
        UI --> SocketClient[Socket.io Client]
        UI --> AxiosClient[Axios HTTP Client]
    end

    subgraph API ["Backend API Gateway (Express 5 + TypeScript)"]
        AxiosClient -->|REST HTTP| Express[Express 5 Server]
        SocketClient <-->|WebSockets| SocketServer[Socket.io Server]
        Express --> Auth[Postgres JWT Auth Middleware]
        Express --> Zod[Zod Request Validation]
    end

    subgraph Infra ["Async & Execution Layer"]
        SocketServer <--> RedisAdapter[@socket.io/redis-adapter]
        Express --> BullMQ[BullMQ Job Queues]
        RedisAdapter & BullMQ <--> Redis[(Redis Cache)]
        Express --> Judge0[Judge0 API Sandbox]
    end

    subgraph DB ["Primary Relational Database"]
        Express --> Prisma[Prisma ORM 7]
        Prisma <--> Postgres[(PostgreSQL Database)]
    end
```

---

## 🛠️ Tech Stack

| Domain | Technology | Version / Package |
| :--- | :--- | :--- |
| **Frontend Framework** | `React` | `18.2.0` |
| **Routing** | `React Router` | `7.18.1` |
| **Animations & Icons** | `Framer Motion` & `Lucide` | `framer-motion 10.18`, `lucide-react` |
| **Backend Language** | `TypeScript` & `Node.js` | `TypeScript 5.3.3` |
| **Web Server** | `Express` | `5.2.1` with `helmet`, `cors`, `morgan` |
| **Database & ORM** | `PostgreSQL` & `Prisma` | `Prisma 7.8.0` with `@prisma/adapter-pg` |
| **Caching & Queues** | `Redis` & `BullMQ` | `ioredis 5.11`, `BullMQ 5.80.6` |
| **Authentication** | `JWT` & `PostgreSQL` | Single auth state with Google IDP support |
| **Containerization** | `Docker` | `docker-compose.yml` pre-configured |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **PostgreSQL**: Local instance or cloud database
- **Redis**: Running instance for WebSockets and queues
- **Docker** *(optional)*: For containerized startup

### Setup Guide

```bash
# 1. Clone the repository
git clone https://github.com/sayanawari12/-Nexly.git
cd bca-web

# 2. Install frontend and backend dependencies
npm install
npm --prefix backend install

# 3. Set up environment variables
cp .env.example .env
cp backend/.env.example backend/.env

# 4. Generate Prisma Client & Run Database Migrations
npm --prefix backend run prisma:generate

# 5. Start Development Servers
# Terminal 1 (Backend Express Server):
npm --prefix backend run dev

# Terminal 2 (React Frontend App):
npm start
```

---

## 🗺️ What's Next

- [ ] **JavaScript Content Hub**: Interactive JS engine, DOM manipulation playground, and ES6+ modules.
- [ ] **HTML/CSS Visual Hub**: Live visual layout designer, Flexbox/Grid interactive sandbox, and responsive CSS challenges.
- [ ] **SQL Content Hub**: Interactive SQL schema builder, relational query sandbox, and data modeling challenges.
- [ ] **Git CLI Simulator**: In-browser terminal simulating branch creation, merging, rebasing, and commit tree visualization.

---

## 👨‍💻 Author & Connect

**Sayan Awari** — Full-Stack Software Engineer.

<br/>

<div align="center">

[![GitHub Profile](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sayanawari12)
[![Email Sayan](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sayanawari9@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9333EA,06B6D4&height=100&section=footer" width="100%" alt="Footer Banner"/>

**NEXLY Technology Learning Platform**  
*Engineered with React 18 · TypeScript 5 · Express 5 · PostgreSQL 16 · Prisma 7*

</div>
