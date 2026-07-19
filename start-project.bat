@echo off
title Project APEX Launcher
color 0A

echo =====================================
echo         PROJECT APEX LAUNCHER
echo =====================================
echo.

echo [1/6] Checking Docker...

docker info >nul 2>&1

if %errorlevel% neq 0 (
    echo Docker is not running.
    echo Starting Docker Desktop...

    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"

    echo Waiting for Docker Engine...

:waitdocker
    timeout /t 5 >nul
    docker info >nul 2>&1
    if %errorlevel% neq 0 goto waitdocker
)

echo.
echo Docker Ready.
echo.

echo [2/6] Starting PostgreSQL...
docker start apex-postgres >nul 2>&1

echo [3/6] Starting Redis...
docker start apex-redis >nul 2>&1

echo.

echo [4/6] Starting Backend...
start "Backend" cmd /k "cd /d backend && npm run dev"

timeout /t 8 >nul

echo [5/6] Starting Frontend...
start "Frontend" cmd /k "npm start"

echo.

echo =====================================
echo Project APEX Started Successfully
echo =====================================

pause