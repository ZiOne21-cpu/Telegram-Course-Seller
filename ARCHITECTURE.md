# 🏗️ Nilexis.Et Architecture Overview

## System Components

```
┌─────────────────────────────────────────────────────────────┐
│                         TELEGRAM BOT                         │
│                  (users interact via bot)                    │
└─────────────────────────┬───────────────────────────────────┘
                          │
                          │ Webhooks / Polling
                          │
┌─────────────────────────▼───────────────────────────────────┐
│                    RAILWAY BACKEND                           │
│         https://vibrant-intuition-production-...             │
│                                                              │
│  • Express.js API                                            │
│  • SQLite Database (persisted in volume)                     │
│  • Telegram Bot Logic                                        │
│  • File Upload Handler                                       │
│  • Authentication (simpleAdminAuth)                          │
│                                                              │
│  Volume: /data                                               │
│    ├── app.db (database)                                     │
│    ├── thumbnails/ (course images)                           │
│    └── uploads/ (payment screenshots)                        │
└──────────────┬───────────────────────┬──────────────────────┘
               │                       │
               │ API Calls             │ API Calls
               │ (directApi)           │ (directApi)
               │                       │
┌──────────────▼──────────┐  ┌─────────▼──────────────────────┐
│   VERCEL FRONTEND       │  │   VERCEL ADMIN PANEL           │
│   (User-facing)         │  │   (Admin management)           │
│                         │  │                                │
│  • Course catalog       │  │  • Login (Telegram ID)         │
│  • View courses         │  │  • Manage courses              │
│  • Place orders         │  │  • Upload thumbnails           │
│  • Payment info         │  │  • Approve/reject orders       │
│                         │  │  • View statistics             │
└─────────────────────────┘  └────────────────────────────────┘
```

---

## Data Flow

### 1. Admin Creates a Course

```
Admin Panel (Vercel)
    │
    │ 1. Upload thumbnail
    │    POST /api/courses/upload-thumbnail
    │    Header: x-admin-id: 387957921
    │    Body: FormData with image file
    │
    ▼
Railway Backend
    │
    │ 2. Validate admin ID
    │ 3. Save file to /data/thumbnails/
    │ 4. Return thumbnail URL
    │
    ▼
Admin Panel
    │
    │ 5. Fill in course details
    │    POST /api/courses
    │    Body: {title, description, price, thumbnail_url, channel_id}
    │
    ▼
Railway Backend
    │
    │ 6. Insert into SQLite database
    │ 7. Return success
    │
    ▼
Admin Panel displays course in list
```

### 2. User Orders a Course

```
Telegram Bot (User)
    │
    │ 1. User clicks "Browse Courses"
    │
    ▼
Bot queries Railway Backend
    │
    │ GET /api/courses
    │ Returns list of active courses
    │
    ▼
Bot shows courses to user
    │
    │ 2. User clicks "Order" on a course
    │
    ▼
Bot shows payment info
    │
    │ 3. User uploads payment screenshot
    │    POST /api/orders
    │    Body: {course_id, full_name, phone, screenshot}
    │
    ▼
Railway Backend
    │
    │ 4. Save screenshot to /data/uploads/
    │ 5. Create order in database (status: pending)
    │
    ▼
Admin Panel
    │
    │ 6. Admin sees new pending order
    │ 7. Admin approves order
    │    POST /api/orders/:id/approve
    │
    ▼
Railway Backend
    │
    │ 8. Generate channel invite link
    │ 9. Update order status to approved
    │ 10. Send invite link to user via bot
    │
    ▼
User receives invite link in Telegram
```

---

## Authentication Flow

### Admin Panel Authentication

```
1. Admin opens admin panel
2. Sees login screen
3. Enters Telegram ID: 387957921
4. Clicks "Login"

   ▼
   
5. Admin panel stores ID in localStorage
   localStorage.setItem('admin_telegram_id', '387957921')

   ▼
   
6. All API requests include header:
   x-admin-id: 387957921

   ▼
   
7. Backend middleware (simpleAdminAuth) validates:
   - Header exists?
   - ID matches TELEGRAM_ADMIN_IDS env var?

   ▼
   
8. If valid: Allow request
   If invalid: Return 403 Forbidden
```

### Bot User Authentication

```
1. User opens bot in Telegram
2. Bot automatically knows user's Telegram ID
3. Bot sends requests with Telegram WebApp init data
4. Backend validates using telegramAuth middleware
5. User-specific data is returned
```

---

## File Storage Architecture

### Railway Volume: `/data`

```
/data
├── app.db                          # SQLite database
├── thumbnails/                     # Course thumbnail images
│   ├── thumb-1781532010013.jpg
│   ├── thumb-1781532212669.jpg
│   └── thumb-1781543747588.jpg
└── uploads/                        # Payment screenshot uploads
    ├── 1781530802185-photo.jpg
    └── 1781532291830-photo.jpg
```

**Why use a volume?**
- Railway containers are ephemeral (restart = data loss)
- Volume provides persistent storage
- Database and files survive restarts/redeployments

**Important**: The `/data` mount path is configured in Railway dashboard under "Volumes"

---

## Environment Variables

### Railway Backend

| Variable | Purpose | Example |
|----------|---------|---------|
| `BOT_TOKEN` | Telegram bot token | `8641996615:AAE...` |
| `TELEGRAM_ADMIN_IDS` | Admin Telegram IDs | `387957921` |
| `PORT` | Server port | `8080` |
| `NODE_ENV` | Environment | `production` |
| `FRONTEND_URL` | Frontend URL (optional) | `https://nilexis-frontend...` |
| `ADMIN_URL` | Admin URL (optional) | `https://nilexis-admin...` |

### Vercel Admin Panel

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_BACKEND_URL` | Railway backend URL | `https://vibrant-intuition...` |
| `VITE_ADMIN_IDS` | Admin IDs (for UI only) | `387957921` |

### Vercel Frontend

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_BACKEND_URL` | Railway backend URL | `https://vibrant-intuition...` |

---

## API Endpoints

### Public (Telegram Bot Users)

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/courses` | telegramAuth | List active courses |
| POST | `/api/orders` | telegramAuth | Create order |

### Admin Only

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/courses/all` | simpleAdminAuth | List all courses |
| POST | `/api/courses` | simpleAdminAuth | Create course |
| PUT | `/api/courses/:id` | simpleAdminAuth | Update course |
| DELETE | `/api/courses/:id` | simpleAdminAuth | Delete course |
| POST | `/api/courses/upload-thumbnail` | simpleAdminAuth | Upload image |
| GET | `/api/orders/all` | simpleAdminAuth | List all orders |
| POST | `/api/orders/:id/approve` | simpleAdminAuth | Approve order |
| POST | `/api/orders/:id/reject` | simpleAdminAuth | Reject order |
| GET | `/api/settings/payment` | simpleAdminAuth | Get payment settings |
| PUT | `/api/settings` | simpleAdminAuth | Update settings |
| GET | `/api/stats` | simpleAdminAuth | Get statistics |

### Health Check

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/health` | None | Check if backend is running |

---

## Technology Stack

### Backend (Railway)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3 (better-sqlite3)
- **File Upload**: Multer
- **Bot**: node-telegram-bot-api
- **Auth**: Custom middleware
- **CORS**: cors package

### Frontend (Vercel)
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Routing**: React Router

### Admin Panel (Vercel)
- **Framework**: React + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Charts**: Recharts (for statistics)

---

## Security Considerations

### Current Security
✅ Admin authentication via Telegram ID  
✅ CORS configured  
✅ File upload size limits (5MB)  
✅ Bot token stored in environment variables  
✅ SQLite prepared statements (SQL injection protection)  

### Recommended Improvements (Future)
⚠️ Tighten CORS from `*` to specific domains  
⚠️ Add rate limiting to prevent abuse  
⚠️ Add request logging  
⚠️ Implement session tokens instead of localStorage ID  
⚠️ Add file type validation for uploads  
⚠️ Implement webhook mode instead of polling (more efficient)  

---

## Deployment Platforms

### Why Railway for Backend?
- ✅ Easy deployment (Git push = deploy)
- ✅ Persistent volumes for database
- ✅ Environment variable management
- ✅ Auto-restart on crash
- ✅ Free tier available ($5/month credit)
- ✅ Works well with Node.js + SQLite

### Why Vercel for Frontend/Admin?
- ✅ Optimized for React/Vite apps
- ✅ Global CDN (fast loading)
- ✅ Automatic HTTPS
- ✅ Environment variables per environment
- ✅ Free tier (generous limits)
- ✅ Easy custom domains

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 409 Bot Conflict | Multiple bot instances | Kill local processes, wait 60s |
| Upload fails | Auth header missing | Check localStorage has admin_telegram_id |
| CORS error | Backend not allowing origin | Verify CORS config in index.ts |
| Database locked | SQLite concurrent writes | Use WAL mode (already configured) |
| Files lost after restart | No volume mounted | Ensure Railway volume at /data |

---

## Monitoring & Debugging

### Railway Backend
- **Logs**: Railway dashboard → Deployments → Logs
- **Metrics**: Railway dashboard → Metrics (CPU, memory, network)
- **Health Check**: GET /health endpoint

### Vercel Frontend/Admin
- **Logs**: Vercel dashboard → Deployments → Function Logs
- **Analytics**: Vercel dashboard → Analytics
- **Build Logs**: Vercel dashboard → Deployments → Build Logs

### Browser Debugging
- **Console**: F12 → Console tab (JavaScript errors)
- **Network**: F12 → Network tab (API requests)
- **Application**: F12 → Application → Local Storage (auth tokens)

---

## Data Model

### Courses Table
```sql
CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  title TEXT,
  description TEXT,
  price REAL,
  thumbnail_url TEXT,
  channel_id TEXT,
  active INTEGER DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  course_id INTEGER,
  telegram_id TEXT,
  telegram_username TEXT,
  full_name TEXT,
  phone TEXT,
  screenshot_path TEXT,
  status TEXT, -- 'pending', 'approved', 'rejected'
  reject_note TEXT,
  invite_link TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Settings Table
```sql
CREATE TABLE settings (
  key TEXT PRIMARY KEY,
  value TEXT
)
```

Keys:
- `cbe_account`: CBE bank account number
- `cbe_name`: CBE account holder name
- `telebirr_account`: Telebirr account number
- `telebirr_name`: Telebirr account holder name
- `payment_instructions`: Additional payment instructions

---

**Last Updated**: Now  
**Status**: Architecture documented, ready for testing
