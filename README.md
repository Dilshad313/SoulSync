# SoulSync (MERN + Tailwind + Gemini + WebRTC)

A starter monorepo for an AI-powered mental health and wellness platform.

## Stack
- Client: React (Vite) + Tailwind CSS + React Router
- Server: Node.js + Express + MongoDB (Mongoose) + JWT

## Quick Start

1) Prereqs
- Node 18+
- PNPM or NPM
- MongoDB Atlas URI

2) Environment
- Copy `server/.env.example` to `server/.env` and fill values.

3) Install
```bash
# From repo root
pnpm install --recursive
# or run install separately in client/ and server/
```

4) Run Dev
```bash
# Terminal A
cd server && pnpm dev
# Terminal B
cd client && pnpm dev
```

- Client: http://localhost:5173
- Server: http://localhost:4000/api/health

## Structure
```
client/          # React + Tailwind app
server/          # Express API
```

## Next Steps
- Hook up real Gemini API, video provider, and implement modules (Admin/User/Doctor/Hospital).
- Add CI/CD and full testing.
