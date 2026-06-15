# Telegram Course Shop Mini App

A Telegram Mini App for selling private channel courses to Ethiopian customers via CBE/Telebirr payments.

## Project Structure

```
├── frontend/    # React + Vite + Tailwind (Telegram Mini App UI)
├── backend/     # Express API + Telegram Bot + SQLite DB
├── data/        # Auto-created: SQLite DB + uploaded screenshots
```

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp ../.env.example .env
# Edit .env with your values
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

### 3. Configure Your Bot

1. Create a bot with [@BotFather](https://t.me/BotFather)
2. Add the bot as admin to each private channel (with "Invite Users via Link" permission)
3. Set the Mini App URL in BotFather → Bot Settings → Menu Button → URL

### 4. First-Time Setup

1. Open the Mini App in Telegram
2. Go to **Admin → Payment Setup**
3. Enter your Telebirr and CBE account details
4. Add your first course

## Environment Variables

### Backend (`.env`)

| Variable | Description |
|---|---|
| `BOT_TOKEN` | From @BotFather |
| `TELEGRAM_ADMIN_IDS` | Comma-separated Telegram user IDs with admin access |
| `APP_URL` | Your deployed Mini App URL |
| `FRONTEND_URL` | Frontend URL for CORS (dev: http://localhost:5173) |

### Frontend (`.env`)

| Variable | Description |
|---|---|
| `VITE_ADMIN_IDS` | Same admin IDs (for showing admin UI) |

## Deployment

### Option A: Railway / Render (Backend)
- Deploy `backend/` as Node.js service
- Set all environment variables
- Update `FRONTEND_URL` to your Vercel URL

### Option B: Vercel (Frontend)
- Deploy `frontend/`
- Set `VITE_ADMIN_IDS` environment variable
- Update Vite proxy config or `VITE_API_URL` to point to backend

## Buyer Flow

1. Open Mini App → Browse courses
2. Tap "Buy Now" → See payment details (CBE/Telebirr)
3. Transfer money → Fill in name, phone → Upload screenshot
4. Submit → Wait for admin approval
5. Receive invite link in-app + via bot message

## Admin Flow

1. Go to Admin tab → Orders → filter by "Pending"
2. View buyer details + screenshot
3. Tap "Approve" → Bot auto-sends invite link to buyer
4. Or "Reject" with a note

## Security

- All API requests validate Telegram WebApp HMAC signature
- Admin actions also verify user ID against `TELEGRAM_ADMIN_IDS`
- One-time invite links (member_limit=1, 7-day expiry)
- File uploads limited to 5MB images only
