# 🚂 Railway Environment Variables Configuration

## Required Environment Variables

Go to Railway dashboard → Your project → Backend service → Variables tab

### Core Variables (Required)

```env
BOT_TOKEN=8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI
TELEGRAM_ADMIN_IDS=387957921
PORT=8080
NODE_ENV=production
```

### URL Variables (Optional but Recommended)

```env
FRONTEND_URL=https://nilexis-frontend-jku0t0fy5-zione-s-projects.vercel.app
ADMIN_URL=https://nilexis-admin.vercel.app
```

---

## Volume Configuration

Make sure your Railway service has a volume mounted:

- **Mount Path**: `/data`
- **Size**: At least 1GB

This is where:
- `app.db` (SQLite database) is stored
- `thumbnails/` folder for course images
- `uploads/` folder for order payment screenshots

---

## Important Notes

### 1. Bot Token Security
- ✅ Currently using bot token: `8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI`
- ⚠️ Make sure this is NOT exposed in frontend/admin code
- ⚠️ Only backend should have access to this token

### 2. Admin IDs
- Your admin ID: `387957921`
- Remove the placeholder `987654321` from the list
- Updated value: `TELEGRAM_ADMIN_IDS=387957921`

### 3. Port Configuration
- Railway automatically assigns a port via `$PORT` env variable
- Our backend uses `process.env.PORT || 3001`
- Railway typically uses port 8080, so set `PORT=8080`

### 4. Node Environment
- Always set `NODE_ENV=production` in Railway
- This disables dev-only features and improves performance

---

## How to Update Railway Environment Variables

### Method 1: Through Dashboard
1. Go to https://railway.app/
2. Login
3. Select your project
4. Click on backend service
5. Go to "Variables" tab
6. Click "+ New Variable"
7. Add each variable
8. Railway will automatically redeploy

### Method 2: Through Railway CLI (Advanced)
```bash
railway variables set BOT_TOKEN=8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI
railway variables set TELEGRAM_ADMIN_IDS=387957921
railway variables set PORT=8080
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL=https://nilexis-frontend-jku0t0fy5-zione-s-projects.vercel.app
railway variables set ADMIN_URL=https://nilexis-admin.vercel.app
```

---

## Verification

After setting variables, check Railway deployment logs for:

```
✅ Telegram bot started
🚀 Server running on http://localhost:8080
```

If you see:
```
⚠️ Bot skipped (no valid BOT_TOKEN) — running in dev mode
```
Then `BOT_TOKEN` is not set correctly.

---

## Current Configuration Summary

| Variable | Value | Status |
|----------|-------|--------|
| BOT_TOKEN | `8641996615:AAE...` | ✅ Set |
| TELEGRAM_ADMIN_IDS | `387957921` | ✅ Set |
| PORT | `8080` | ⚠️ Verify |
| NODE_ENV | `production` | ⚠️ Verify |
| FRONTEND_URL | `https://nilexis-frontend-...` | ⚠️ Optional |
| ADMIN_URL | `https://nilexis-admin.vercel.app` | ⚠️ Optional |

---

## Troubleshooting

### Issue: Bot not starting
**Symptom**: Logs show "Bot skipped"
**Solution**: Verify `BOT_TOKEN` is set correctly in Railway variables

### Issue: 409 Bot Conflict
**Symptom**: Logs show "409 Conflict: terminated by other getUpdates"
**Solution**: 
1. Kill all local node.exe processes
2. Wait 60 seconds
3. Redeploy Railway backend

### Issue: Unauthorized errors
**Symptom**: Admin panel shows 401/403 errors
**Solution**: Verify `TELEGRAM_ADMIN_IDS=387957921` is set in Railway

### Issue: File upload fails
**Symptom**: "Failed to upload image"
**Solution**: 
1. Check Railway volume is mounted at `/data`
2. Check Railway logs for file system errors
3. Verify `/data/thumbnails/` directory exists and is writable

---

## Next Steps After Configuration

1. ✅ Set all required environment variables in Railway
2. ⏳ Wait for automatic redeployment
3. ✅ Check deployment logs for success messages
4. ✅ Test health endpoint: `https://vibrant-intuition-production-c1e8.up.railway.app/health`
5. ✅ Test admin panel upload functionality

---

**Last Updated**: Now  
**Railway Backend URL**: `https://vibrant-intuition-production-c1e8.up.railway.app`
