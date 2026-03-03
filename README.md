# Irfan Rashid — Full Stack Portfolio

A modern, single-page developer portfolio built with the MERN stack.

## 🚀 Tech Stack

**Frontend**: React, Vite, Tailwind CSS v3, Framer Motion, Axios  
**Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT, Helmet, express-rate-limit

---

## 📂 Project Structure

```
portfolio/
├── client/         # React frontend (Vite)
└── server/         # Express.js backend API
```

---

## 🛠️ Local Development

### 1. Backend Setup

```bash
cd server
cp .env.example .env   # Fill in your MongoDB URI and JWT secret
npm install
node server.js         # Runs on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd client
cp .env.example .env   # Set VITE_API_URL=http://localhost:5000/api
npm install
npm run dev            # Runs on http://localhost:5173
```

### Admin Panel

Visit `http://localhost:5173/admin/login`  
Default credentials (without DB): `admin@irfan.com` / `admin123`

---

## 🌐 Deployment

### Frontend → Vercel

1. Push `client/` to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set **Root Directory** to `client`
4. Set env var: `VITE_API_URL=https://your-api.onrender.com/api`
5. Deploy — `vercel.json` handles SPA routing automatically

### Backend → Render

1. Push `server/` to GitHub (or use a monorepo)
2. Create a new **Web Service** on [Render](https://render.com)
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server.js`
5. Add environment variables from `.env.example`
6. Deploy

---

## 🔑 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Admin login |
| GET | `/api/projects` | Get all projects |
| POST | `/api/projects` | Create project (admin) |
| GET | `/api/blog` | Get all blog posts |
| POST | `/api/messages` | Submit contact form |
| GET | `/api/messages` | Get all messages (admin) |
