# 🛡️ CyberArena

CyberArena is a full-stack cybersecurity learning platform for safe, educational exploration of web vulnerabilities. It combines a modern dark-themed interface, interactive labs, defensive explanations, progress tracking, and an AI-powered mentor to help learners understand security concepts without touching real systems.

## 📌 Project Summary

This project demonstrates a complete web application experience with:
- a React/Vite frontend,
- an Express backend,
- a FastAPI AI assistant,
- and a polished learning flow for cybersecurity topics.

## ✨ Features

- 🌑 Modern dark-theme experience with animated UI
- 🧪 Safe and isolated labs for SQL injection, XSS, CSRF, brute force, command injection, directory traversal, clickjacking, insecure file upload, broken authentication, weak passwords, and session hijacking
- 📊 Dashboard, leaderboard, achievements, certificates, AI assistant, and admin-style overview pages
- 🔐 Express.js backend with JWT authentication, secure demo endpoints, and Socket.IO telemetry
- 🤖 Python FastAPI AI service for beginner-friendly security explanations

## 🏗️ Architecture

- Frontend: React + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js + Express + JWT + Socket.IO
- AI Service: Python + FastAPI
- Database: MongoDB Atlas ready, with an in-memory fallback for local demos

## 📁 Folder Structure

- frontend/ – Vite application
- backend/ – Express API and demo data layer
- ai-service/ – FastAPI educational assistant
- docs/ – Supporting documentation

## ▶️ Installation

### Quick start

Run the project with one command from the root:

```powershell
powershell -ExecutionPolicy Bypass -File .\start-all.ps1
```

### Manual start

1. Frontend
   - cd frontend
   - npm install
   - npm run dev

2. Backend
   - cd backend
   - npm install
   - npm run dev

3. AI service
   - cd ai-service
   - python -m venv .venv
   - .venv\Scripts\activate
   - pip install -r requirements.txt
   - uvicorn app:app --reload --port 8000

## 🚀 Deployment Notes

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- AI Service: Render or Railway

## 📸 Screenshots Placeholder

Screenshots can be added under docs/screenshots once deployment is live.

## 🔮 Future Scope

- Persistent MongoDB-backed user profiles and lab records
- Full quiz engine and certificate generation pipeline
- Admin analytics dashboard with role-based access control
- Deployable multi-service production stack
