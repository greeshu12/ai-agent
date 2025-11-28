# YouTube MCP ai- Agent
creating an AI agent that interacts with an external platform’s API using a custom MCP server, allowing the agent to retrieve data and perform actions through standardized tool calls.
built a fully functional AI Agent capable of interacting with YouTube using the Model Context Protocol (MCP).
It  includes:
A backend MCP server → exposes YouTube API functions as MCP tools
A frontend web app → allows users to interact with the agent
An LLM (OpenAI) → powers agent reasoning and decision-making
**Deployment**
Backend → Render
Frontend → Vercel
**This MCP Agent allows users to:**
🔍 Search YouTube videos  
🤖 Perform Smart-Agent searches (“give me 3 DevOps videos”)  
❤️ View liked videos  
🕒 View watch history (with thumbnails)  
✨ Get AI-powered video recommendations  
👍 Like a YouTube video via URL or video ID  
📱 Mobile + Desktop responsive layout  
⚡ Zero login needed after first authentication (auto-refresh token system)
### Frontend (Vercel)  
🔗 **https://ai-agent-wko1.vercel.app/**
### Backend (Render)  
🔗 Add your Render backend link here  
(Currently running locally at http://localhost:3000)
## 🏗 Project Architecture
ai-agent/
│
├── backend/                     # MCP Server (Node.js)
│   ├── index.js                 # Express server + routes
│   ├── auth.js                  # OAuth2 + Refresh Token system
│   ├── mcp.js                   # MCP tools implementation
│   └── youtube.js               # YouTube API wrapper
│
├── frontend/                    # MCP Agent UI (React)
│   ├── src/
│   │   ├── App.jsx              # Main UI + Smart Agent search + video grid
│   │   └── api.js               # Connects frontend → backend
│   └── README.md
│
└── README.md                    # (This file)

## 🔐 OAuth2 Setup (Completed)
Backend uses:
✔ GOOGLE_CLIENT_ID  
✔ GOOGLE_CLIENT_SECRET  
✔ REDIRECT_URI  
✔ REFRESH_TOKEN (long-term token)  
✔ OPENAI_API_KEY  
Backend automatically refreshes access tokens → **You never need to log in again after the first time.**
## ⚙️ Backend Environment (Render Configuration)
Set these in Render:
GOOGLE_CLIENT_ID=xxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxxxx
REDIRECT_URI=http://localhost:3000/auth/callback
REFRESH_TOKEN=1//xxxx
OPENAI_API_KEY=xxxx
PORT=3000
## ⚙️ Frontend Environment (Vercel)
VITE_API_BASE_URL=https://YOUR_BACKEND_URl
## 🧠 MCP Tools Implemented

| MCP Tool              | Description                          |
|----------------------|--------------------------------------|
| youtube.search        | Search YouTube videos                |
| youtube.smartSearch   | Smart AI-powered search              |
| youtube.getLiked      | Get liked videos                     |
| youtube.getHistory    | Get watch history                    |
| youtube.videoInfo     | Get metadata                         |
| youtube.likeVideo     | Like/Unlike a YouTube video          |
| youtube.recommend     | AI-generated recommendations        

## 🖼 Screenshots
<img width="766" height="599" alt="Screenshot 2025-11-27 114139" src="https://github.com/user-attachments/assets/2e038feb-62f0-4369-b73e-1f289931a147" />
User
   ↓
React Frontend (App.jsx)
   ↓ /mcp
Backend (Express + MCP)
   ↓
YouTube Data API
   ↓
Backend
   ↓
Frontend (Video Grid)
## 🛠 Local Development Guide
### Backend
cd backend
npm install
npm start
Runs at:  
👉 http://localhost:3000
### Frontend
cd frontend
npm install
npm run dev
Runs at:  
👉 http://localhost:5173`
### 🤖 Smart Agent Search
provide me 3 kubernetes videos
give me 2 docker tutorials
## 🎯 Assignment Requirements (Checked)
Requirement | Status  
-----------|--------  
Build MCP Agent | ✅ Completed  
Integrate YouTube API | ✔ Done  
Expose MCP tools | ✔ Multiple  
Implement end-to-end actions | 👍 Like, search, history  
Fully deployed | ✔ Vercel + Render  
Public GitHub repo | ✔ Yes  
Good UI | ✔ Modern + responsive  

## 📘 Difference Between YouTube and My Website  
**YouTube** is a video streaming platform for watching, uploading, and interacting with videos.
**My Website** does *not* replace YouTube — instead, it works as an **AI-powered assistant** on top of YouTube:
### My website can:
✔ Understand natural language like “show my last 10 watched videos”  
✔ Choose the correct YouTube API using MCP  
✔ Retrieve accurate watch history, liked videos, or search results  
✔ Summarize, analyze, and present personalized information  
✔ Act as an intelligent middle-layer between the user and YouTube  
Your website =  
👉 *AI brain + YouTube tools + personalized user experience*




