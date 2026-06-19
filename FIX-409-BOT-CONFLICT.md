# Fix: 409 Bot Conflict & Upload Issues

## Problem
Railway backend keeps crashing with:
```
error: [polling_error] {"code":"ETELEGRAM","message":"ETELEGRAM: 409 Conflict: terminated by other getUpdates request; make sure that only one bot instance is running"}
```

This causes:
- ❌ Backend constantly restarts
- ❌ 404 on `/api/courses/upload-thumbnail`
- ❌ CORS errors
- ❌ Admin panel cannot connect

## Root Cause
**Multiple Telegram bot instances are running simultaneously:**
- One on Railway (trying to start)
- Another instance somewhere else (already polling)

Telegram only allows **ONE** bot instance to poll at a time.

## Solution

### Option 1: Disable Bot on Railway (Recommended for API-only backend)

**Step 1: Go to Railway Dashboard**
1. Open https://railway.app
2. Navigate to your project: `vibrant-intuition-production-c1e8`
3. Click on the backend service

**Step 2: Set Bot Token to Placeholder**
1. Go to **Variables** tab
2. Find `BOT_TOKEN` variable
3. Change its value to: `disabled_on_railway`
4. Click **Save** or **Deploy**

This will skip bot initialization but keep the API working.

**Step 3: Verify**
Wait 1-2 minutes, then check the logs. You should see:
```
ℹ️  Bot skipped (no valid BOT_TOKEN) — running in dev mode
🚀 Server running on http://localhost:8080
```

---

### Option 2: Find and Stop Other Bot Instance

If you need the bot running on Railway, you must stop all other instances:

**Check these locations:**
1. **Other Railway deployments** - Check if you have multiple services running
2. **Local processes** - Run: `tasklist | findstr node.exe` (might be auto-restarting)
3. **Windows services** - Check Task Manager → Services tab
4. **Scheduled tasks** - Check Task Scheduler
5. **Docker containers** - Run: `docker ps`

**Stop the conflicting instance, then redeploy Railway with correct BOT_TOKEN.**

---

## After Fixing

Once Railway backend is stable:

### Test the endpoints:
```bash
# Health check
curl https://vibrant-intuition-production-c1e8.up.railway.app/health

# Test upload (should return 401, not 404)
curl https://vibrant-intuition-production-c1e8.up.railway.app/api/courses/upload-thumbnail
```

### Test admin panel:
1. Open https://nilexis-admin.vercel.app
2. Login with Telegram ID: `387957921`
3. Try uploading a course thumbnail
4. Should work without CORS errors

---

## Why This Happens

Railway automatically restarts your service when it crashes. The backend tries to start the bot → gets 409 → crashes → Railway restarts → tries again → infinite loop.

By disabling the bot on Railway, the API runs stable without the bot polling conflict.

---

## Bot Architecture Recommendation

For production, run bot and API separately:

- **Railway Service 1**: API only (no bot) ← current setup
- **Railway Service 2**: Bot only (separate deployment)

OR

- **Railway**: API only
- **Local/VPS**: Bot runs 24/7

This prevents conflicts and allows independent scaling.
