# Project Files Overview

Quick reference for what each file does.

---

## 📁 Root Directory

| File | Purpose |
|------|---------|
| `README.md` | Main project documentation |
| `DEPLOYMENT.md` | Step-by-step deployment guide |
| `QUICK-DEPLOY.md` | Fast deployment for experienced devs |
| `PRE-DEPLOYMENT-CHECKLIST.md` | What to prepare before deploying |
| `SECURITY.md` | Security best practices |
| `TROUBLESHOOTING.md` | Common issues and solutions |
| `VERIFICATION.md` | Post-deployment testing checklist |
| `FILES-OVERVIEW.md` | This file |
| `.env.example` | Backend environment variables template |
| `.gitignore` | Git ignore rules (secrets, node_modules, etc.) |
| `package.json` | Root package with convenience scripts |

---

## 📁 Backend (`backend/`)

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts, metadata |
| `tsconfig.json` | TypeScript compiler configuration |
| `.env` | Environment variables (LOCAL ONLY, not committed) |
| `.env.production.example` | Production env vars template |
| `.railway.toml` | Railway deployment configuration |
| `Procfile` | Process file for Heroku/Railway |
| `Dockerfile` | Optional Docker image definition |
| `.dockerignore` | Docker ignore rules |
| `README.md` | Backend API documentation |

### Source Files (`src/`)
| File | Purpose |
|------|---------|
| `index.ts` | Main server entry point, Express app setup |
| `db.ts` | SQLite database initialization & schema |
| `bot.ts` | Telegram bot initialization & singleton |
| `auth.ts` | Telegram WebApp authentication helpers |
| `middleware.ts` | Auth middleware for admin endpoints |

### Routes (`src/routes/`)
| File | Purpose |
|------|---------|
| `courses.ts` | CRUD operations for courses |
| `orders.ts` | Order management & approval |
| `settings.ts` | Payment account settings |
| `stats.ts` | Dashboard statistics |

### Build Output
- `dist/` - Compiled JavaScript (created by `npm run build`)

---

## 📁 Frontend (`frontend/`)

### Configuration Files
| File | Purpose |
|------|---------|
| `package.json` | Dependencies, scripts |
| `tsconfig.json` | TypeScript configuration |
| `vite.config.ts` | Vite build tool configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration for Tailwind |
| `vercel.json` | Vercel deployment & routing rules |
| `.env` | Environment variables (LOCAL ONLY) |
| `.env.example` | Env vars template |
| `.env.production.example` | Production env vars template |
| `index.html` | HTML entry point |

### Source Files (`src/`)
| File | Purpose |
|------|---------|
| `main.tsx` | React app entry point |
| `App.tsx` | Main app component with routing |
| `index.css` | Global styles & Tailwind imports |
| `api.ts` | API client functions (Axios) |
| `telegram.ts` | Telegram WebApp SDK helpers |
| `vite-env.d.ts` | TypeScript definitions for Vite |

### Components (`src/components/`)
| File | Purpose |
|------|---------|
| `CourseCard.tsx` | Course display card |
| `BottomNav.tsx` | Bottom navigation bar |

### Pages (`src/pages/`)
| File | Purpose |
|------|---------|
| `CoursesPage.tsx` | Browse all courses |
| `CheckoutPage.tsx` | Payment & order submission |
| `MyOrdersPage.tsx` | User's order history |

### Admin Pages (`src/pages/admin/`)
| File | Purpose |
|------|---------|
| `AdminDashboard.tsx` | Stats overview |
| `AdminCourses.tsx` | Course management |
| `AdminOrders.tsx` | Order approval/rejection |
| `AdminSetup.tsx` | Payment account setup |

### Build Output
- `dist/` - Production build (created by `npm run build`)

---

## 📁 Admin (`admin/`)

Same structure as `frontend/`, but:
- Runs on different port (5174 vs 5173)
- Admin-only interface
- No buyer features (checkout, my orders)

### Source Files (`src/`)
| File | Purpose |
|------|---------|
| `App.tsx` | Admin app with routing |
| `api.ts` | API client for admin endpoints |

### Components (`src/components/`)
| File | Purpose |
|------|---------|
| `Sidebar.tsx` | Admin sidebar navigation |

### Pages (`src/pages/`)
| File | Purpose |
|------|---------|
| `DashboardPage.tsx` | Admin dashboard |
| `CoursesPage.tsx` | Course management |
| `OrdersPage.tsx` | Order management |
| `SetupPage.tsx` | Payment setup |
| `LoginPage.tsx` | Admin login (Telegram auth) |

---

## 📁 Data (`data/`)

**⚠️ This folder is created automatically and NOT committed to Git**

| Item | Purpose |
|------|---------|
| `app.db` | SQLite database file |
| `uploads/` | Payment screenshot uploads |
| `thumbnails/` | Course thumbnail images |

**Production:** Must be on a persistent volume (`/app/data` on Railway)

---

## 📁 .vscode/

IDE settings (optional, not critical for deployment)

---

## 📁 .git/

Git version control (automatically managed)

---

## Key Configuration Files Explained

### `.env` (backend)
```env
BOT_TOKEN=xxx          # Your Telegram bot token
TELEGRAM_ADMIN_IDS=123 # Who can access admin features
FRONTEND_URL=https://  # For CORS
APP_URL=https://       # Mini App URL
```

### `vercel.json` (frontend/admin)
```json
{
  "rewrites": [
    // Proxy API requests to Railway backend
    { "source": "/api/:path*", "destination": "https://backend/api/:path*" }
  ]
}
```

### `.railway.toml` (backend)
```toml
[[volumes]]
mountPath = "/app/data"  # Persist database & uploads
```

---

## File Size Reference

| Category | Size |
|----------|------|
| Backend source | ~50 KB |
| Backend node_modules | ~50 MB |
| Frontend source | ~30 KB |
| Frontend node_modules | ~200 MB |
| Frontend build (dist) | ~500 KB |
| Database (empty) | ~8 KB |
| Database (100 orders) | ~1 MB |

---

## Important: What NOT to Commit

```
❌ .env files
❌ node_modules/
❌ dist/ (build outputs)
❌ data/ (database & uploads)
❌ *.log files
❌ OS files (.DS_Store, Thumbs.db)
```

All of these are in `.gitignore`.

---

## Development vs Production

### Development (localhost)
- Backend: `http://localhost:3001`
- Frontend: `http://localhost:5173`
- Admin: `http://localhost:5174`
- Uses `.env` files locally
- Database at `./data/app.db`

### Production
- Backend: `https://xxx.up.railway.app`
- Frontend: `https://yyy.vercel.app`
- Admin: `https://zzz.vercel.app`
- Environment variables set in Railway/Vercel dashboards
- Database at `/app/data/app.db` (Railway volume)

---

## Quick File Lookup

**Need to:**
- Change database schema? → `backend/src/db.ts`
- Add API endpoint? → `backend/src/routes/*.ts`
- Change UI? → `frontend/src/pages/*.tsx` or `admin/src/pages/*.tsx`
- Configure deployment? → `vercel.json`, `.railway.toml`
- Add environment variable? → `.env.example`, then set in Railway/Vercel
- Change bot behavior? → `backend/src/bot.ts`
- Fix CORS? → `backend/src/index.ts` (CORS config)
- Update styles? → `frontend/src/index.css` or Tailwind classes

---

**Next Steps:**
- For development: See `README.md`
- For deployment: See `DEPLOYMENT.md`
- For issues: See `TROUBLESHOOTING.md`
