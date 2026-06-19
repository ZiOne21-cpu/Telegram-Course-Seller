# 🔍 Quick Status Check Commands

## Check Backend Health
Open browser and visit:
```
https://vibrant-intuition-production-c1e8.up.railway.app/health
```
Should return: `{"ok":true}`

## Check if Local Node is Running
```bash
tasklist | findstr "node.exe"
```
Should return: **Nothing** (no processes)

If it shows processes, kill them:
```bash
taskkill /F /IM node.exe
```

## Check Railway Deployment
1. Go to: https://railway.app/
2. Login
3. Select your project
4. Click on backend service
5. Check "Deployments" tab
6. Look for:
   - ✅ "✅ Telegram bot started" (good)
   - ❌ "409 Conflict" (bad - wait 60 seconds)

## Test Upload Endpoint (Optional - Advanced)
Only if you have curl installed:
```bash
curl -X POST ^
  https://vibrant-intuition-production-c1e8.up.railway.app/api/courses/upload-thumbnail ^
  -H "x-admin-id: 387957921" ^
  -F "thumbnail=@image.jpg"
```

## Test Admin Panel
1. Go to: https://nilexis-admin.vercel.app/
2. Login with ID: `387957921`
3. Go to Courses
4. Try adding a new course with thumbnail

## Browser Console Debug (If Upload Fails)
1. Open admin panel
2. Press **F12**
3. Go to **Network** tab
4. Try uploading an image
5. Look for `upload-thumbnail` request
6. Click on it
7. Check:
   - Status code
   - Request headers
   - Response

---

## Current Status Summary

✅ **Local Processes**: Killed (PID 15904)  
✅ **Backend**: Deployed on Railway  
✅ **Frontend**: Deployed on Vercel  
✅ **Admin**: Deployed on Vercel  
✅ **CORS**: Configured  
✅ **Auth**: simpleAdminAuth working  

⏳ **Next**: Wait 60 seconds for Telegram bot conflict to clear, then test upload

---

## If Upload Still Fails

Provide these details:
1. **Browser Network Tab**: Screenshot of failed request
2. **Railway Logs**: Screenshot of errors
3. **Console Errors**: Any red errors in browser console
4. **Status Code**: The HTTP status code (404, 500, etc.)
