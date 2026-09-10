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
| `/` | **Blueprint §15 Homepage** | 5-second live runnable trial, tech grid, Learn $\rightarrow$ Practice $\rightarrow$ Build visual loop, founder note |
| `/learn` (`/technologies/cpp`) | **Structured Learning Paths** | Content schema hierarchy (`Technology → Module → Topic → Lesson`) with runnable code examples |
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

---

## 💡 Quick Overview

`bca-web` is a full-stack platform engineered to serve the BCA department with interactive course material, live coding contests, and real-time updates.

- **Frontend**: Built with React 18, React Router v7, and **Framer Motion** for smooth visual transitions, styled with component utility icons from **Lucide React** and **React Icons**.
- **Backend API**: Powered by a robust **TypeScript + Express 5** server utilizing **Prisma ORM 7** over a **PostgreSQL** relational database.
- **Real-Time & Queue Infrastructure**: Real-time communication powered by **Socket.io 4** (configured with `@socket.io/redis-adapter` & `ioredis`) alongside asynchronous task processing using **BullMQ**.
- **DevOps & Execution**: Containerized setup via **Docker Compose** with Judge0 API integration for sandboxed code execution.

---

## 💻 Modules & Capabilities Overview

<details open>
<summary><b>Explore bca-web Key Modules</b></summary>

<br/>

| Module | Description | Core Tech Stack |
| :--- | :--- | :--- |
| **Student Hub** | Comprehensive course syllabus, curated notes, subject roadmaps, and digital library. | `React 18`, `Framer Motion`, `react-pdf` |
| **Live Contests** | Real-time WebSocket coding contests with synchronized countdowns and instant leaderboards. | `Socket.io 4`, `@socket.io/redis-adapter`, `Redis` |
| **Code Arena & Executor** | In-browser multi-language code editor with live execution feedback and test evaluation. | `Judge0 API`, `Piston Sandbox`, `Axios` |
| **Admin & Operations** | Platform metrics, user moderation, role-based access control (RBAC), and audit logging. | `Express 5`, `Prisma ORM 7`, `PostgreSQL` |

</details>

---

## ✨ Features

| Feature Card | Description | Tech Stack | Status |
| :--- | :--- | :--- | :--- |
| **Relational Data Management** | Type-safe PostgreSQL schema management via Prisma ORM 7. | `Prisma 7` & `PostgreSQL` | ✅ Implemented |
| **Real-Time Contests** | Low-latency bi-directional WebSocket communication for live coding contests. | `Socket.io 4` & `ioredis` | ✅ Implemented |
| **Background Job Queues** | Asynchronous task and execution handling powered by BullMQ queues. | `BullMQ` & `Redis` | ✅ Implemented |
| **Fluid Animated UI** | Interactive motion timelines and responsive layout components. | `Framer Motion` & `React 18` | ✅ Implemented |
| **Sandboxed Code Execution** | External Judge0 API connection for evaluating user code submissions. | `Judge0 API` & `Axios` | ✅ Implemented |
| **JWT & Password Security** | Hashing with bcrypt, signed JWT session tokens, and Zod request validation. | `bcrypt`, `jsonwebtoken`, `Zod` | ✅ Implemented |
| **Containerized Deployment** | Pre-configured `docker-compose.yml` for multi-container development. | `Docker Compose` | ✅ Implemented |

---

## 🏗️ Architecture

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
        Express --> Auth[JWT & bcrypt Middleware]
        Express --> Zod[Zod Validation]
    end

    subgraph Infra ["Async & Infrastructure Layer"]
        SocketServer <--> RedisAdapter[@socket.io/redis-adapter]
        Express --> BullMQ[BullMQ Job Queues]
        RedisAdapter & BullMQ <--> Redis[(Redis Database)]
        Express --> Judge0[Judge0 API / Piston]
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
| **Frontend Framework** | `React` | `18.2.0` with `react-scripts` |
| **Routing** | `React Router` | `7.18.1` |
| **Animations & Icons** | `Framer Motion` & `Lucide` | `framer-motion 10.18`, `lucide-react`, `react-icons` |
| **Backend Language** | `TypeScript` & `Node.js` | `TypeScript 5.3.3` (ES CommonJS runtime) |
| **Web Server** | `Express` | `5.2.1` with `helmet`, `cors`, `morgan`, `cookie-parser` |
| **Database & ORM** | `PostgreSQL` & `Prisma` | `Prisma 7.8.0` with `@prisma/adapter-pg` & `pg 8` |
| **Caching & Real-Time** | `Redis` & `Socket.io` | `Socket.io 4.8.3`, `ioredis 5.11`, `@socket.io/redis-adapter` |
| **Background Queues** | `BullMQ` | `5.80.6` |
| **Validation & Auth** | `Zod`, `bcrypt`, `JWT` | `zod 4.4`, `bcrypt 6.0`, `jsonwebtoken 9.0` |
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
git clone https://github.com/sayanawari12/bca-department-website.git
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

### Docker Compose (Alternative)

```bash
docker-compose up --build
```

---

<details>
<summary><b>📁 Project Folder Structure</b></summary>

<br/>

```
bca-web/
├── src/                           # React 18 Frontend Source
│   ├── components/                # Reusable UI components
│   ├── pages/                     # Top-level application pages
│   ├── hooks/                     # Custom React hooks
│   └── styles/                    # Application styling
│
├── backend/                       # Express 5 + TypeScript Backend
│   ├── src/
│   │   ├── config/                # Database & Redis config
│   │   ├── controllers/           # API controllers
│   │   ├── middleware/            # JWT, Auth, Rate limit middleware
│   │   ├── models/                # Data types & schemas
│   │   ├── routes/                # REST API routers
│   │   ├── services/              # Business logic & queues
│   │   ├── socket/                # Socket.io handlers
│   │   └── server.ts              # Express TypeScript entry point
│   ├── prisma/
│   │   ├── schema.prisma          # PostgreSQL relational schema
│   │   └── seed.ts                # Database seeder script
│   └── package.json
│
├── docs/                          # API & architecture docs
├── docker-compose.yml             # Docker services orchestration
├── vercel.json                    # Vercel deployment config
├── package.json                   # Client dependencies & scripts
└── README.md
```

</details>

---

<details>
<summary><b>🔐 Environment Variables</b></summary>

<br/>

### Client `.env`
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api/v1
REACT_APP_SOCKET_URL=http://localhost:5000/contests
REACT_APP_JUDGE0_API_HOST=judge0-ce.p.rapidapi.com
REACT_APP_JUDGE0_API_KEY=your_rapidapi_key_here
```

### Server `backend/.env`
```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://apex_user:apex_password@localhost:5433/apex_db?schema=public
REDIS_URL=redis://localhost:6380
JWT_ACCESS_SECRET=your_32_characters_long_jwt_access_secret_key
JWT_REFRESH_SECRET=your_32_characters_long_jwt_refresh_secret_key
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

</details>

---

<details>
<summary><b>📡 REST API & Socket Endpoints</b></summary>

<br/>

| Type | Endpoint / Namespace | Description |
| :--- | :--- | :--- |
| `HTTP GET` | `/api/v1/health` | Backend API health check |
| `HTTP POST` | `/api/v1/auth/login` | User authentication & JWT issuance |
| `HTTP POST` | `/api/v1/submissions` | Submit code for Judge0 execution |
| `WebSocket` | `/contests` | Real-time contest leaderboards & events |

</details>

---

## 🗺️ What's Next

- [ ] **AI Code Assistant**: Integrate LLM assistance for debugging student code.
- [ ] **Advanced Contest Analytics**: Real-time performance metrics per problem.
- [ ] **Automated Plagiarism Detection**: Token-based similarity checks on submissions.

---

## 👨‍💻 Author & Connect

**Sayan Awari** — Full-Stack Developer & Software Engineering Enthusiast.

I focus on building production-grade web systems featuring real-time bi-directional streaming, asynchronous job queues, and robust relational architectures.

<br/>

<div align="center">

[![GitHub Profile](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sayanawari12)
[![Email Sayan](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:sayanawari9@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com)

</div>

<br/>

---

## 📜 Community & Governance

* 🛡️ **Security Policy:** [SECURITY.md](SECURITY.md)
* 🤝 **Contributing Guidelines:** [CONTRIBUTING.md](CONTRIBUTING.md)
* ⚖️ **Code of Conduct:** [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)
* 📄 **License:** [Custom / All Rights Reserved](LICENSE)

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9333EA,06B6D4&height=100&section=footer" width="100%" alt="Footer Banner"/>

**BCA Department Website & Learning Platform**  
*Engineered with React 18 · TypeScript 5 · Express 5 · PostgreSQL 16 · Prisma 7 · Redis 7*

</div>
