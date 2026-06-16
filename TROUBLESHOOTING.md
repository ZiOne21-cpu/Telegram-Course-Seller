# Troubleshooting Guide

Common issues and their solutions.

---

## 🔴 Backend Issues

### "Bot token is invalid"
**Symptoms:** Backend logs show bot startup failed
**Solution:**
1. Check `BOT_TOKEN` in Railway environment variables
2. Make sure there are no extra spaces or quotes
3. Generate a new token from @BotFather if needed

### "Cannot find module 'better-sqlite3'"
**Symptoms:** Build fails on Railway
**Solution:**
1. Make sure `better-sqlite3` is in `dependencies` (not `devDependencies`) in `backend/package.json`
2. Railway should auto-install native modules
3. Check Railway build logs for compilation errors

### "Database is locked" or "SQLITE_BUSY"
**Symptoms:** API calls timeout or fail
**Solution:**
- SQLite doesn't handle high concurrency well
- Add connection pooling or switch to PostgreSQL for high-traffic apps
- For now, this shouldn't happen with typical bot traffic

### Database Resets After Every Deploy
**Symptoms:** All courses/orders disappear after Railway redeploy
**Solution:**
1. Go to Railway → Settings → Volumes
2. Add a volume with mount path `/app/data`
3. Verify volume is attached in Deployments → Environment

### CORS Errors
**Symptoms:** Frontend can't reach backend API
**Solution:**
1. Check `FRONTEND_URL` and `ADMIN_URL` in Railway env vars
2. Make sure URLs match **exactly** (no trailing slash)
3. Check browser console for the exact origin being blocked
4. Update backend CORS config in `backend/src/index.ts`

---

## 🔵 Frontend Issues

### "Failed to fetch" or Network Error
**Symptoms:** Frontend can't load courses/orders
**Solution:**
1. Check `VITE_API_URL` in Vercel environment variables
2. Make sure it points to your Railway backend URL
3. Test the API directly: `https://your-backend.railway.app/health`
4. Check backend logs on Railway for errors

### Telegram WebApp Not Loading
**Symptoms:** Mini App shows blank screen in Telegram
**Solution:**
1. Check browser console (use Telegram Desktop or web.telegram.org for debugging)
2. Make sure BotFather Menu Button URL is set correctly
3. Test the URL directly in a browser: `https://your-frontend.vercel.app`
4. Check Vercel deployment logs for build errors

### "Telegram is not defined"
**Symptoms:** Error in browser console
**Solution:**
- Make sure you're opening the app via Telegram (not directly in browser)
- For testing outside Telegram, add `DEV_BYPASS_AUTH=true` to backend `.env`

### Admin Panel Showing for Regular Users
**Symptoms:** All users see admin tabs
**Solution:**
1. Check `VITE_ADMIN_IDS` in Vercel environment variables (Frontend)
2. Make sure it matches your Telegram user ID
3. User IDs are case-sensitive and comma-separated: `123456789,987654321`

### vercel.json Not Working
**Symptoms:** API routes return 404
**Solution:**
1. Make sure `vercel.json` exists in both `frontend/` and `admin/` directories
2. Update the backend URL in both files
3. Redeploy on Vercel

---

## 🟢 Bot Issues

### Bot Not Sending Messages
**Symptoms:** Approved orders don't get invite links
**Solution:**
1. Check backend logs for errors
2. Verify bot has permission to send messages to user
3. User must have started the bot at least once (send `/start`)
4. Check Telegram API limits (30 messages/second)

### Invite Links Not Working
**Symptoms:** Links say "expired" or "invalid"
**Solution:**
1. Make sure bot is admin in the private channel
2. Bot needs "Invite Users via Link" permission
3. Check `channel_id` in database courses table
4. Generate a test link manually: `https://t.me/+XXXXX`

### Bot Commands Not Responding
**Symptoms:** `/start` or `/help` does nothing
**Solution:**
1. Check if bot is running (Railway logs)
2. Make sure polling is active (not webhook mode)
3. Test with @BotFather → check if bot is enabled
4. Restart Railway deployment

---

## 🟡 File Upload Issues

### "File too large"
**Symptoms:** Upload fails with error
**Solution:**
- Max file size is 5MB (see `backend/src/routes/orders.ts` and `courses.ts`)
- Compress images before uploading
- Use JPEG instead of PNG for smaller sizes

### "Only images allowed"
**Symptoms:** Upload rejected
**Solution:**
- Only image files are accepted (JPEG, PNG, GIF, WebP)
- Make sure file extension matches content type

### Uploaded Images Not Showing
**Symptoms:** Thumbnails or screenshots show broken image icon
**Solution:**
1. Check if files exist in Railway: `/app/data/uploads/` and `/app/data/thumbnails/`
2. Make sure Railway volume is mounted
3. Check file permissions (should be readable)
4. Test direct URL: `https://your-backend.railway.app/uploads/filename.jpg`

---

## 🟠 Payment Issues

### Payment Details Not Showing
**Symptoms:** Checkout page is empty
**Solution:**
1. Open Admin Panel → Payment Setup
2. Fill in CBE and Telebirr account details
3. Click Save
4. Check backend logs for errors

### Orders Stuck in "Pending"
**Symptoms:** Admin approved but status not updating
**Solution:**
1. Check backend logs for errors
2. Verify database is writable (not read-only)
3. Check `TELEGRAM_ADMIN_IDS` matches the user approving
4. Test API endpoint: `PATCH /api/orders/:id` with Postman

---

## 📊 Deployment Issues

### Railway: "No Procfile detected"
**Solution:**
- Railway auto-detects Node.js (doesn't need Procfile)
- Make sure `package.json` has `"start": "node dist/index.js"`
- Set Root Directory to `backend` in Railway settings

### Vercel: "Build failed"
**Solution:**
1. Check Vercel build logs for specific error
2. Make sure Root Directory is set (`frontend` or `admin`)
3. Verify `npm run build` works locally
4. Check for TypeScript errors: `npm run build` in terminal

### Railway: Build Succeeds But App Crashes
**Solution:**
1. Check Railway logs: Deployments → View Logs
2. Common causes:
   - Missing environment variables
   - Port binding issue (use `process.env.PORT`)
   - Database initialization failed
3. Test locally with production build: `npm run build && npm start`

---

## 🛠️ Development Issues

### "Cannot connect to backend" in Local Dev
**Solution:**
1. Make sure backend is running: `cd backend && npm run dev`
2. Check backend is on port 3001: `http://localhost:3001/health`
3. Update `VITE_API_URL` in frontend/admin `.env` to `http://localhost:3001`

### Changes Not Reflecting
**Solution:**
- Frontend/Admin: Vite hot-reload should work automatically
- Backend: Make sure `ts-node-dev` is restarting (check console)
- Hard refresh browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### TypeScript Errors
**Solution:**
1. Run `npm install` in the affected folder
2. Check `tsconfig.json` is present
3. Restart VS Code TypeScript server: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

---

## 🔍 Debugging Tools

### Backend Logs (Railway)
1. Go to Railway dashboard
2. Click your project → **Deployments**
3. Click latest deployment → **View Logs**

### Frontend Logs (Vercel)
1. Go to Vercel dashboard
2. Click your project → **Deployments**
3. Click latest deployment → **View Function Logs**

### Browser Console (Telegram Mini App)
- **Desktop:** Right-click → Inspect → Console
- **Web:** Open web.telegram.org → Open Mini App → F12 → Console

### Test API Endpoints
Use cURL or Postman:
```bash
# Health check
curl https://your-backend.railway.app/health

# List courses
curl https://your-backend.railway.app/api/courses

# Test with Telegram auth (copy from browser DevTools)
curl -H "Authorization: tma YOUR_INIT_DATA" \
     https://your-backend.railway.app/api/orders
```

---

## 📞 Still Stuck?

1. Check all environment variables are set correctly
2. Compare your setup with `.env.example` files
3. Test locally first before blaming deployment
4. Check Railway/Vercel status pages for outages
5. Review recent code changes (use `git diff`)

**Most issues are caused by:**
- ❌ Missing or incorrect environment variables
- ❌ CORS misconfiguration
- ❌ Database volume not mounted
- ❌ Outdated dependencies

Run through the [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) again!
