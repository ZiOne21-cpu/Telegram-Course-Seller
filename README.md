# Telegram Course Shop Mini App

A Telegram Mini App for selling private channel courses to Ethiopian customers via CBE/Telebirr payments.

---

## 🚀 **New to This Project? Start Here: [START-HERE.md](./START-HERE.md)**

---

> **Ready to deploy?** Follow [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions.

## Project Structure

```
├── frontend/    # React + Vite + Tailwind (Telegram Mini App UI)
├── admin/       # React + Vite + Tailwind (Admin Dashboard)
├── backend/     # Express API + Telegram Bot + SQLite DB
├── data/        # Auto-created: SQLite DB + uploaded screenshots
```

---

## Quick Start (Local Development)

### 1. Backend Setup

```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env with your BOT_TOKEN and TELEGRAM_ADMIN_IDS
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your admin IDs
npm run dev
```

### 3. Admin Panel Setup

```bash
cd admin
npm install
cp .env.example .env
# Edit .env with your admin IDs
npm run dev
```

### 4. Configure Your Bot

1. Create a bot with [@BotFather](https://t.me/BotFather)
2. Add the bot as admin to each private channel (with "Invite Users via Link" permission)
3. Set the Mini App URL in BotFather → Bot Settings → Menu Button → URL to `http://localhost:5173`

### 5. First-Time Setup

1. Open the Mini App in Telegram (Menu Button)
2. Open `http://localhost:5174` in browser (Admin Panel)
3. Go to **Payment Setup** tab
4. Enter your Telebirr and CBE account details
5. Go to **Courses** tab → Add your first course

---

## 🚀 Production Deployment

We've prepared everything for production deployment:

### Files Created
- ✅ `DEPLOYMENT.md` - Complete step-by-step deployment guide
- ✅ `PRE-DEPLOYMENT-CHECKLIST.md` - What you need before deploying
- ✅ `SECURITY.md` - Security best practices
- ✅ `.railway.toml` - Railway configuration
- ✅ `vercel.json` (updated) - Frontend/Admin routing
- ✅ `.gitignore` - Prevent committing secrets
- ✅ Production environment examples

### Recommended Stack
| Component | Platform | Cost |
|-----------|----------|------|
| Backend | [Railway](https://railway.app) | $5/month credit (free tier) |
| Frontend | [Vercel](https://vercel.com) | Free |
| Admin | [Vercel](https://vercel.com) | Free |

**Follow the [DEPLOYMENT.md](./DEPLOYMENT.md) guide to deploy in ~15 minutes.**

---

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|---|---|
| `BOT_TOKEN` | From @BotFather |
| `TELEGRAM_ADMIN_IDS` | Comma-separated Telegram user IDs with admin access |
| `APP_URL` | Your deployed Mini App URL |
| `FRONTEND_URL` | Frontend URL for CORS |
| `ADMIN_URL` | Admin panel URL for CORS |

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_ADMIN_IDS` | Same admin IDs (for showing admin UI) |
| `VITE_API_URL` | Backend API URL (e.g., Railway URL) |

### Admin (`.env`)

| Variable | Description |
|---|---|
| `VITE_ADMIN_IDS` | Same admin IDs |
| `VITE_API_URL` | Backend API URL |

---

## Features

### Buyer Flow
1. Browse courses in Telegram Mini App
2. Tap "Buy Now" → See payment details (CBE/Telebirr)
3. Transfer money → Fill in name, phone → Upload screenshot
4. Submit → Wait for admin approval
5. Receive invite link in-app + via bot message

### Admin Flow
1. Open Admin Panel → **Orders** → filter by "Pending"
2. View buyer details + payment screenshot
3. Tap "Approve" → Bot auto-sends invite link
4. Or "Reject" with a note

### Security Features
- Telegram WebApp HMAC signature validation
- Admin ID verification for all admin actions
- One-time invite links (member_limit=1, 7-day expiry)
- File uploads limited to 5MB images only
- CORS protection

---

## Tech Stack

### Frontend & Admin
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js + Express
- TypeScript
- SQLite (better-sqlite3)
- node-telegram-bot-api
- Multer (file uploads)

---

## API Endpoints

### Public
- `GET /health` - Health check
- `GET /api/courses` - List active courses
- `POST /api/orders` - Create new order

### Admin (requires auth)
- `GET /api/orders` - List all orders
- `PATCH /api/orders/:id` - Approve/reject order
- `POST /api/courses` - Create course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/settings` - Get payment settings
- `POST /api/settings` - Update payment settings
- `GET /api/stats` - Get dashboard stats

---

## Database Schema

### courses
- id, title, description, price, thumbnail_url, channel_id, active, created_at

### orders
- id, course_id, telegram_id, telegram_username, full_name, phone, screenshot_path, status, reject_note, invite_link, created_at, updated_at

### settings
- key (primary), value (stores payment account details)

---

## Scripts

### Backend
```bash
npm run dev      # Development with auto-reload
npm run build    # Compile TypeScript to dist/
npm start        # Run production build
```

### Frontend & Admin
```bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

---

## Support

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Production deployment guide
- [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) - Pre-deployment checklist
- [SECURITY.md](./SECURITY.md) - Security best practices
- [backend/README.md](./backend/README.md) - Backend API documentation

---

## License

MIT
