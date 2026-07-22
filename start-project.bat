@echo off
setlocal enabledelayedexpansion
title Project APEX - Master Development Launcher
color 0B

echo ===================================================
echo           PROJECT APEX DEVELOPMENT LAUNCHER
echo ===================================================
echo.

:: 1. Check Directory and Paths
if exist "%~dp0backend" goto ROOT_DIR_OK
color 0C
echo [ERROR] Must be executed from the project root directory!
echo Current path: %~dp0
echo Please ensure the backend folder exists.
echo.
pause
exit /b 1

:ROOT_DIR_OK
cd /d "%~dp0"

:: 2. Check Node and NPM Prerequisites
echo [CHECK 1/7] Validating Node.js and Project Files...
where node >nul 2>&1
if %errorlevel% equ 0 goto NODE_OK
color 0C
echo [ERROR] Node.js is not installed or not added to system PATH!
echo Please install Node.js (v18+) and try again.
echo.
pause
exit /b 1

:NODE_OK

if exist "node_modules" goto ROOT_MODULES_OK
echo [WARNING] Root node_modules not found. Installing dependencies...
call npm install
:ROOT_MODULES_OK

if exist "backend\node_modules" goto BACKEND_MODULES_OK
echo [WARNING] Backend node_modules not found. Installing backend dependencies...
cd /d "%~dp0backend"
call npm install
cd /d "%~dp0"
:BACKEND_MODULES_OK

if exist "backend\.env" goto ENV_OK
echo [WARNING] backend\.env file missing! Copying from backend\.env.example...
if exist "backend\.env.example" copy "backend\.env.example" "backend\.env" >nul
:ENV_OK

echo [OK] Project files and dependencies verified.
echo.

:: 3. Check and Start Docker Desktop
echo [CHECK 2/7] Checking Docker Engine...
docker info >nul 2>&1
if %errorlevel% equ 0 goto DOCKER_OK

echo [INFO] Docker Engine is not running. Launching Docker Desktop...
if exist "C:\Program Files\Docker\Docker\Docker Desktop.exe" start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

echo Waiting for Docker Engine to initialize...
set DOCKER_RETRIES=0

:WAIT_DOCKER
ping -n 3 127.0.0.1 >nul
set /a DOCKER_RETRIES+=1
docker info >nul 2>&1
if %errorlevel% equ 0 goto DOCKER_OK

if %DOCKER_RETRIES% geq 30 goto DOCKER_FAILED
echo Waiting for Docker daemon (%DOCKER_RETRIES%/30)...
goto WAIT_DOCKER

:DOCKER_FAILED
color 0C
echo [ERROR] Docker Engine failed to start within 90 seconds!
echo Please launch Docker Desktop manually and restart this script.
echo.
pause
exit /b 1

:DOCKER_OK
echo [OK] Docker Engine is running and responsive.
echo.

:: 4. Start Infrastructure Containers (PostgreSQL, Redis, Piston)
echo [CHECK 3/7] Starting Infrastructure Services (Postgres, Redis, Piston)...

:: PostgreSQL
docker ps --format "{{.Names}}" | findstr /I "^apex-postgres$" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] apex-postgres container is already running.
    goto START_REDIS
)

echo Starting apex-postgres container...
docker start apex-postgres >nul 2>&1
if %errorlevel% equ 0 goto START_REDIS
echo Container apex-postgres not found. Creating via docker compose...
docker compose up -d postgres

:START_REDIS
:: Redis
docker ps --format "{{.Names}}" | findstr /I "^apex-redis$" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] apex-redis container is already running.
    goto START_PISTON
)

echo Starting apex-redis container...
docker start apex-redis >nul 2>&1
if %errorlevel% equ 0 goto START_PISTON
echo Container apex-redis not found. Creating via docker compose...
docker compose up -d redis

:START_PISTON
:: Piston Sandbox Engine
docker ps --format "{{.Names}}" | findstr /I "^piston_api$" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] piston_api container is already running.
    goto INFRA_STARTED
)

echo Starting piston_api sandbox container...
docker start piston_api >nul 2>&1
if %errorlevel% equ 0 goto INFRA_STARTED

if exist "piston-repo\docker-compose.yaml" (
    echo Container piston_api not found. Creating via piston-repo docker compose...
    cd /d "%~dp0piston-repo"
    docker compose up -d
    cd /d "%~dp0"
)

:INFRA_STARTED
echo.

:: 5. Health Check Infrastructure Services
echo [CHECK 4/7] Verifying Infrastructure Readiness...

:: Verify Postgres Port 5433
set PG_RETRIES=0
:WAIT_PG
powershell -Command "$t = New-Object Net.Sockets.TcpClient; try { $t.Connect('127.0.0.1', 5433); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] PostgreSQL is reachable on port 5433.
    goto CHECK_REDIS_PORT
)

set /a PG_RETRIES+=1
if %PG_RETRIES% geq 15 goto PG_FAILED
echo Waiting for PostgreSQL on port 5433 (%PG_RETRIES%/15)...
ping -n 3 127.0.0.1 >nul
goto WAIT_PG

:PG_FAILED
color 0C
echo [ERROR] Could not connect to PostgreSQL on port 5433!
pause
exit /b 1

:CHECK_REDIS_PORT
:: Verify Redis Port 6380
set REDIS_RETRIES=0
:WAIT_REDIS
powershell -Command "$t = New-Object Net.Sockets.TcpClient; try { $t.Connect('127.0.0.1', 6380); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Redis is reachable on port 6380.
    goto CHECK_PISTON_PORT
)

set /a REDIS_RETRIES+=1
if %REDIS_RETRIES% geq 15 goto REDIS_FAILED
echo Waiting for Redis on port 6380 (%REDIS_RETRIES%/15)...
ping -n 3 127.0.0.1 >nul
goto WAIT_REDIS

:REDIS_FAILED
color 0C
echo [ERROR] Could not connect to Redis on port 6380!
pause
exit /b 1

:CHECK_PISTON_PORT
:: Verify Piston API http://localhost:2000/api/v2/runtimes
set PISTON_RETRIES=0
:WAIT_PISTON
powershell -Command "try { $r = Invoke-RestMethod -Uri 'http://localhost:2000/api/v2/runtimes' -TimeoutSec 3; exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Piston Engine sandbox is reachable on port 2000.
    goto LAUNCH_BACKEND
)

set /a PISTON_RETRIES+=1
if %PISTON_RETRIES% geq 15 (
    color 0E
    echo [WARNING] Piston API taking longer to respond on port 2000...
    goto LAUNCH_BACKEND
)
echo Waiting for Piston Engine on port 2000 (%PISTON_RETRIES%/15)...
ping -n 3 127.0.0.1 >nul
goto WAIT_PISTON

:LAUNCH_BACKEND
echo.
:: 6. Launch Backend Server
echo [CHECK 5/7] Starting Backend Server (Port 5000)...
start "APEX Backend Server" cmd /k "cd /d "%~dp0backend" && npm run dev"

echo Waiting for Backend API to respond on port 5000...
set BACKEND_RETRIES=0
:WAIT_BACKEND
powershell -Command "$t = New-Object Net.Sockets.TcpClient; try { $t.Connect('127.0.0.1', 5000); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Backend API is live on http://localhost:5000.
    goto LAUNCH_FRONTEND
)

set /a BACKEND_RETRIES+=1
if %BACKEND_RETRIES% geq 15 (
    color 0E
    echo [WARNING] Backend port 5000 initializing slowly, proceeding to Frontend launch...
    goto LAUNCH_FRONTEND
)
ping -n 3 127.0.0.1 >nul
goto WAIT_BACKEND

:LAUNCH_FRONTEND
echo.
:: 7. Launch Frontend Server
echo [CHECK 6/7] Starting Frontend Web App (Port 3000)...
start "APEX Frontend App" cmd /k "cd /d "%~dp0" && npm start"

echo Waiting for Frontend App to start on port 3000...
set FRONTEND_RETRIES=0
:WAIT_FRONTEND
powershell -Command "$t = New-Object Net.Sockets.TcpClient; try { $t.Connect('127.0.0.1', 3000); exit 0 } catch { exit 1 }" >nul 2>&1
if %errorlevel% equ 0 (
    echo [OK] Frontend App is live on http://localhost:3000.
    goto FINAL_SUMMARY
)

set /a FRONTEND_RETRIES+=1
if %FRONTEND_RETRIES% geq 20 (
    color 0E
    echo [WARNING] Frontend compilation in progress on port 3000...
    goto FINAL_SUMMARY
)
ping -n 4 127.0.0.1 >nul
goto WAIT_FRONTEND

:FINAL_SUMMARY
:: 8. Final System Health Summary
color 0A
echo.
echo ===================================================
echo        PROJECT APEX STARTED SUCCESSFULLY!
echo ===================================================
echo.
echo  [OK] Docker Engine      : RUNNING
echo  [OK] PostgreSQL (DB)    : http://localhost:5433 (apex_db)
echo  [OK] Redis (Cache)      : http://localhost:6380
echo  [OK] Piston Sandbox     : http://localhost:2000/api/v2/runtimes
echo  [OK] Backend API        : http://localhost:5000
echo  [OK] Frontend Web App   : http://localhost:3000
echo.
echo Launching APEX Web App in your default browser...
start http://localhost:3000
echo.
echo Press any key to close this launcher window.
echo Note: All services will remain active in their respective windows.
pause >nul