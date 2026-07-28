<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9333EA,06B6D4&height=200&section=header&text=bca-web&fontSize=52&fontAlignY=36&fontColor=ffffff" width="100%" alt="bca-web Header Banner"/>

<br/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&size=18&duration=3000&pause=1000&color=06B6D4&center=true&vCenter=true&width=700&height=40&lines=Full-Stack+BCA+Department+Learning+Platform;React+18+%2B+Framer+Motion+%2B+React+Router+v7;TypeScript+%2B+Express+5+%2B+Prisma+ORM+%2B+PostgreSQL;Real-Time+Socket.io+%2B+Redis+Adapter+%2B+BullMQ+Queues" alt="Typing SVG Animation" />
</a>

<br/>

**A full-stack learning and contest platform built for the BCA department featuring real-time web sockets, automated background queues, and code execution capabilities.**

<br/>

[![Version](https://img.shields.io/badge/version-1.0.0-9333EA?style=for-the-badge&logo=git&logoColor=white)](package.json)
[![License](https://img.shields.io/badge/license-MIT-06B6D4?style=for-the-badge)](LICENSE)
[![Status](https://img.shields.io/badge/status-active_development-10B981?style=for-the-badge)]()
[![React](https://img.shields.io/badge/React-18-06B6D4?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-9333EA?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Express](https://img.shields.io/badge/Express-5-06B6D4?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com)
[![Prisma](https://img.shields.io/badge/Prisma-7-9333EA?style=for-the-badge&logo=prisma)](https://www.prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-06B6D4?style=for-the-badge&logo=postgresql)](https://www.postgresql.org)
[![Redis](https://img.shields.io/badge/Redis-ioredis-10B981?style=for-the-badge&logo=redis)](https://redis.io)

<br/>

### 📷 Application Preview

![bca-web Overview](./public/screenshot.png)

</div>

---

## 💡 Quick Overview

`bca-web` is a full-stack platform engineered to serve the BCA department with interactive course material, live coding contests, and real-time updates.

- **Frontend**: Built with React 18, React Router v7, and **Framer Motion** for smooth visual transitions, styled with component utility icons from **Lucide React** and **React Icons**.
- **Backend API**: Powered by a robust **TypeScript + Express 5** server utilizing **Prisma ORM 7** over a **PostgreSQL** relational database.
- **Real-Time & Queue Infrastructure**: Real-time communication powered by **Socket.io 4** (configured with `@socket.io/redis-adapter` & `ioredis`) alongside asynchronous task processing using **BullMQ**.
- **DevOps & Execution**: Containerized setup via **Docker Compose** with Judge0 API integration for sandboxed code execution.

---

## 📷 Screenshots Gallery

<details>
<summary><b>View bca-web Modules & Dashboards</b></summary>

<br/>

| Module | Description | Preview |
| :--- | :--- | :--- |
| **Student Hub** | Course syllabus, notes, and topic roadmaps. | ![Student Hub](./public/student-hub.png) |
| **Live Contests** | Real-time WebSocket contests powered by Socket.io. | ![Live Contests](./public/contests.png) |
| **Code Executor** | In-browser code submission connected to Judge0 execution API. | ![Code Editor](./public/editor.png) |
| **Faculty Portal** | Course content & contest management interface. | ![Faculty Portal](./public/faculty.png) |

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
│   │   └── server.js              # Express entry point
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
DATABASE_URL=postgresql://user:password@localhost:5432/bca_db
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:3000
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

## 👨‍💻 About Me

Hi, I'm Sayan.

I enjoy learning by building real projects instead of only following tutorials. This project is helping me master full-stack software development, real-time WebSockets, job queues, and relational database architecture.

- **GitHub**: [github.com/sayanawari12](https://github.com/sayanawari12)
- **Email**: sayanawari9@gmail.com

<br/>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=9333EA,06B6D4&height=100&section=footer" width="100%" alt="Footer Banner"/>

*Designed with care · Built with React, TypeScript, Express, PostgreSQL & Redis*

</div>
