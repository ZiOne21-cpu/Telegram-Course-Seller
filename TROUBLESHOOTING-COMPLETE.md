# 🔧 Complete Troubleshooting Guide

## ✅ Issues Resolved

### 1. Local Node Process Killed ✅
- **Issue**: PID 15904 was running and causing 409 Telegram bot conflicts
- **Solution**: Process terminated successfully
- **Status**: No node.exe processes running locally

### 2. Bot Conflict Resolution ✅
The 409 error happens when multiple bot instances try to use `getUpdates` polling simultaneously. With local process killed, Railway backend should now work properly.

---

## 🚀 Current Deployment Status

### Backend (Railway)
- **URL**: `https://vibrant-intuition-production-c1e8.up.railway.app`
- **Status**: ✅ Deployed
- **Database**: SQLite with persistent volume at `/data`
- **CORS**: Configured to allow all origins (`origin: '*'`)
- **Auth**: Using `simpleAdminAuth` with `x-admin-id` header

### Frontend (Vercel)
- **URL**: `https://nilexis-frontend-jku0t0fy5-zione-s-projects.vercel.app/`
- **Status**: ✅ Deployed
- **Build**: Using Vite

### Admin Panel (Vercel)
- **URL**: `https://nilexis-admin.vercel.app/`
- **Status**: ✅ Deployed
- **API Connection**: Direct to Railway backend via `directApi`
- **Required Env Vars**:
  - `VITE_BACKEND_URL=https://vibrant-intuition-production-c1e8.up.railway.app`
  - `VITE_ADMIN_IDS=387957921`

---

## 🔍 Diagnosing Upload Issues

### Check 1: Verify Railway Backend is Running
```bash
curl https://vibrant-intuition-production-c1e8.up.railway.app/health
```
Expected: `{"ok":true}`

### Check 2: Check Railway Logs
1. Go to Railway dashboard
2. Select your project
3. Click "Deployments"
4. Check latest deployment logs
5. Look for:
   - ✅ "✅ Telegram bot started" (good)
   - ⚠️ "409 Conflict" errors (bad - bot conflict still exists)
   - ⚠️ File system errors (bad - volume mount issue)

### Check 3: Test Upload Endpoint Directly
```bash
curl -X POST \
  https://vibrant-intuition-production-c1e8.up.railway.app/api/courses/upload-thumbnail \
  -H "x-admin-id: 387957921" \
  -F "thumbnail=@/path/to/image.jpg"
```
Expected: `{"url":"/thumbnails/thumb-1234567890.jpg"}`

### Check 4: Verify Admin Panel Environment Variables
In Vercel admin dashboard:
1. Go to Settings → Environment Variables
2. Verify these exist for **Production**:
   - `VITE_BACKEND_URL` = `https://vibrant-intuition-production-c1e8.up.railway.app`
   - `VITE_ADMIN_IDS` = `387957921`
3. If you changed them, **redeploy** the admin panel

---

## 🐛 Common Issues & Solutions

### Issue 1: "Failed to upload image"
**Possible Causes**:
1. Backend not responding
2. CORS error
3. Authentication failed (wrong admin ID)
4. File size too large (>5MB limit)
5. Thumbnails directory not writable

**Solutions**:
1. Check Railway logs for errors
2. Open browser console (F12) and check Network tab for actual error
3. Verify `x-admin-id` header is being sent (check Network → Headers)
4. Try smaller image (<1MB)
5. Check Railway volume mount: `/data/thumbnails` must be writable

### Issue 2: 409 Bot Conflict
**Causes**:
- Multiple bot instances running (local + Railway)
- Another service using same bot token
- Railway restarting too quickly

**Solutions**:
1. ✅ Kill all local node.exe processes: `taskkill /F /IM node.exe`
2. Check if any VS Code terminals are running `npm run dev`
3. Wait 60 seconds after killing processes for Telegram to release the connection
4. Check Railway logs - only ONE "✅ Telegram bot started" should appear

### Issue 3: CORS Errors
**Symptoms**: Console shows "blocked by CORS policy"

**Solutions**:
1. Backend CORS is set to `origin: '*'` - should work for all domains
2. If still failing, check Railway environment variables:
   - `FRONTEND_URL` (optional)
   - `ADMIN_URL` (optional)
3. Make sure Railway backend redeployed after CORS changes

### Issue 4: Authentication Errors (401/403)
**Symptoms**: "Missing admin ID" or "Admin access required"

**Solutions**:
1. Check `localStorage` in browser console:
   ```js
   localStorage.getItem('admin_telegram_id')
   ```
   Should return: `"387957921"`
2. If missing, login again through admin panel
3. Verify Railway has `TELEGRAM_ADMIN_IDS=387957921` environment variable

### Issue 5: Railway Backend Keeps Restarting
**Causes**:
- Bot conflict causing crashes
- Memory issues
- Missing dependencies

**Solutions**:
1. Check Railway "Metrics" tab for memory/CPU usage
2. Check "Deployments" logs for crash reasons
3. Ensure `nixpacks.toml` start command is: `node dist/index.js`
4. Ensure volume is mounted at `/data`

---

## 📋 Pre-Upload Checklist

Before testing uploads again:

- [ ] All local node.exe processes killed
- [ ] Wait 60 seconds for Telegram to release bot connection
- [ ] Railway backend shows no 409 errors in logs
- [ ] Railway backend health check returns `{"ok":true}`
- [ ] Admin panel logged in with ID 387957921
- [ ] Browser console shows no CORS errors
- [ ] Image file is <5MB

---

## 🧪 Testing Upload Flow

### Step 1: Test Health Endpoint
```bash
curl https://vibrant-intuition-production-c1e8.up.railway.app/health
```

### Step 2: Test Upload with cURL
```bash
curl -X POST \
  https://vibrant-intuition-production-c1e8.up.railway.app/api/courses/upload-thumbnail \
  -H "x-admin-id: 387957921" \
  -F "thumbnail=@test.jpg" \
  -v
```

### Step 3: Test in Admin Panel
1. Go to `https://nilexis-admin.vercel.app/`
2. Login with your Telegram ID: `387957921`
3. Go to Courses → Add New Course
4. Click "Upload Thumbnail"
5. Select an image
6. Open Browser DevTools (F12) → Network tab
7. Look for `upload-thumbnail` request
8. Check:
   - Status code (should be 200)
   - Request headers (`x-admin-id` present?)
   - Response body (should have `url` field)

---

## 🔄 What to Do If Upload Still Fails

### Get Detailed Error Information:
1. Open admin panel in Chrome/Edge
2. Press F12 to open DevTools
3. Go to Network tab
4. Try uploading an image
5. Find the `upload-thumbnail` request
6. Click on it
7. Share these details:
   - **Status Code**: (e.g., 404, 500, etc.)
   - **Request Headers**: Especially `x-admin-id`
   - **Response Body**: The actual error message
   - **Console Errors**: Any red errors in Console tab

### Check Railway Logs:
1. Go to Railway dashboard
2. Click on your backend service
3. Go to "Deployments"
4. Click on active deployment
5. Look for errors around the time you tried uploading
6. Share any error messages

---

## 🎯 Next Steps

1. **Wait 60 seconds** (for Telegram bot conflict to clear)
2. **Check Railway logs** for any 409 errors
3. **Test upload again** in admin panel
4. **If still failing**, provide:
   - Screenshot of browser Network tab error
   - Screenshot of Railway logs
   - Any console errors

---

## 📞 Quick Reference

### Railway Backend Health
```
https://vibrant-intuition-production-c1e8.up.railway.app/health
```

### Admin Panel
```
https://nilexis-admin.vercel.app/
```

### Your Admin ID
```
387957921
```

### Kill All Node Processes (if conflict happens again)
```bash
taskkill /F /IM node.exe
```

---

## ✨ Expected Working Flow

1. Admin logs into panel with Telegram ID
2. Goes to Courses → Add New Course
3. Clicks "Upload Thumbnail"
4. Selects image file
5. Image uploads to Railway `/data/thumbnails/`
6. Returns URL like `/thumbnails/thumb-1234567890.jpg`
7. Admin fills in course details
8. Saves course
9. Course appears in admin panel and frontend

---

**Last Updated**: Now  
**Status**: Local node processes cleared, waiting for bot conflict to resolve
