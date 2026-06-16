# 🚀 START HERE

Welcome! This guide will get you from zero to deployed in 30 minutes.

---

## What You're Deploying

A **Telegram Mini App** that lets you sell access to private Telegram channels:
- 💳 Accept payments via CBE/Telebirr (Ethiopian banks)
- 🤖 Telegram bot auto-sends invite links after approval
- 📊 Admin dashboard for managing courses & orders
- 🔒 Secure payment verification with screenshot uploads

---

## Pick Your Path

### 🏃 Fast Track (15 mins)
**For experienced developers:**
1. Read [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) (2 mins)
2. Follow [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) (10 mins)
3. Verify with [VERIFICATION.md](./VERIFICATION.md) (3 mins)

### 🚶 Guided Path (30 mins)
**For first-time deployers:**
1. Read [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) (5 mins)
2. Follow [DEPLOYMENT.md](./DEPLOYMENT.md) step-by-step (20 mins)
3. Verify with [VERIFICATION.md](./VERIFICATION.md) (5 mins)

### 🔧 Local Development First
**Want to test before deploying?**
1. Read `README.md` (5 mins)
2. Run locally (see below)
3. Then deploy using Guided Path

---

## Local Setup (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- Telegram bot token from [@BotFather](https://t.me/BotFather)
- Your Telegram user ID from [@userinfobot](https://t.me/userinfobot)

### Quick Start

```bash
# 1. Install all dependencies
npm run install:all

# 2. Configure backend
cd backend
cp ../.env.example .env
# Edit .env: Set BOT_TOKEN and TELEGRAM_ADMIN_IDS
cd ..

# 3. Configure frontend
cd frontend
cp .env.example .env
# Edit .env: Set VITE_ADMIN_IDS
cd ..

# 4. Configure admin
cd admin
cp .env.example .env
# Edit .env: Set VITE_ADMIN_IDS
cd ..

# 5. Start all services (in separate terminals)
# Terminal 1:
cd backend && npm run dev

# Terminal 2:
cd frontend && npm run dev

# Terminal 3:
cd admin && npm run dev
```

**Open:**
- Frontend: http://localhost:5173 (open in Telegram bot)
- Admin: http://localhost:5174 (open in browser)
- API: http://localhost:3001

---

## What You Need Before Deploying

- [ ] **GitHub account** (free) - For code hosting
- [ ] **Railway account** (free) - For backend hosting
- [ ] **Vercel account** (free) - For frontend hosting
- [ ] **Telegram bot token** - From @BotFather
- [ ] **Your Telegram user ID** - From @userinfobot
- [ ] **CBE/Telebirr accounts** - For receiving payments
- [ ] **Private Telegram channels** - Where you'll give access

**Cost:** $0/month for low traffic (Railway gives $5 free credit)

---

## Project Structure

```
telegram-course-seller/
├── backend/          Backend API + Telegram bot (Deploy to Railway)
├── frontend/         Telegram Mini App UI (Deploy to Vercel)
├── admin/            Admin dashboard (Deploy to Vercel)
├── data/             Database & uploads (Auto-created, not committed)
│
├── DEPLOYMENT.md             ← Step-by-step deployment guide
├── QUICK-DEPLOY.md           ← Fast deployment for pros
├── PRE-DEPLOYMENT-CHECKLIST.md ← What to prepare first
├── VERIFICATION.md           ← Post-deploy testing
├── TROUBLESHOOTING.md        ← Fix common issues
├── SECURITY.md               ← Security best practices
├── FILES-OVERVIEW.md         ← What each file does
└── README.md                 ← Main documentation
```

---

## Deployment Overview

### Step 1: Deploy Backend (Railway)
- Push code to GitHub
- Connect Railway to your repo
- Set environment variables
- Add persistent volume for database
- **Get your backend URL**

### Step 2: Deploy Frontend (Vercel)
- Update `vercel.json` with backend URL
- Connect Vercel to your repo
- Set environment variables
- **Get your frontend URL**

### Step 3: Deploy Admin (Vercel)
- Same as frontend, different URL
- **Get your admin URL**

### Step 4: Wire Everything Together
- Update backend env vars with frontend/admin URLs
- Configure bot Menu Button in BotFather
- Test everything

**Detailed instructions:** [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## Documentation Quick Reference

| Need to... | Read this |
|------------|-----------|
| Deploy for the first time | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| Deploy fast (experienced) | [QUICK-DEPLOY.md](./QUICK-DEPLOY.md) |
| Test after deployment | [VERIFICATION.md](./VERIFICATION.md) |
| Fix an error | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| Understand project structure | [FILES-OVERVIEW.md](./FILES-OVERVIEW.md) |
| Secure my app | [SECURITY.md](./SECURITY.md) |
| Develop locally | [README.md](./README.md) |
| Understand backend API | [backend/README.md](./backend/README.md) |

---

## Support

**Stuck?**
1. Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) first
2. Verify all environment variables are set
3. Check Railway/Vercel logs for errors
4. Review [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)

**Most common issues:**
- ❌ Missing environment variables
- ❌ CORS misconfiguration
- ❌ Database volume not mounted
- ❌ Wrong Telegram user ID

---

## Features

### For Buyers
- 📱 Browse courses in Telegram Mini App
- 💳 Pay via CBE or Telebirr
- 📸 Upload payment screenshot
- ✉️ Get instant invite link after approval
- 📜 View order history

### For Admins
- 📊 Dashboard with stats
- ➕ Add/remove courses with thumbnails
- ✅ Approve/reject orders
- 💬 Bot auto-sends invite links
- ⚙️ Configure payment accounts

### Security
- 🔐 Telegram WebApp signature verification
- 🛡️ Admin ID verification
- 🔒 One-time invite links
- 🚫 CORS protection
- 📁 File upload restrictions (5MB max, images only)

---

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + TypeScript + SQLite
- **Bot:** node-telegram-bot-api
- **Hosting:** Railway (backend) + Vercel (frontend/admin)
- **Database:** SQLite with better-sqlite3

---

## Next Steps

1. **Read:** [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)
2. **Deploy:** Follow [DEPLOYMENT.md](./DEPLOYMENT.md) or [QUICK-DEPLOY.md](./QUICK-DEPLOY.md)
3. **Verify:** Use [VERIFICATION.md](./VERIFICATION.md) to test
4. **Launch:** Share your bot with customers!

---

## Quick Commands

```bash
# Install everything
npm run install:all

# Build everything
npm run build

# Run locally (in separate terminals)
npm run dev:backend
npm run dev:frontend
npm run dev:admin

# Test local build
cd backend && npm run build && npm start
cd frontend && npm run build && npm run preview
cd admin && npm run build && npm run preview
```

---

## Timeline

- **Local setup:** 5 minutes
- **Testing locally:** 10 minutes
- **First deployment:** 20-30 minutes
- **Subsequent deploys:** <5 minutes (auto-deploy via Git push)

---

🎉 **Ready to deploy? Start with [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)!**
