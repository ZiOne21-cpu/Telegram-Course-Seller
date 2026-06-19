# ✅ Railway Setup Checklist

**Current URL:** `https://telegram-course-seller-production-49a2.up.railway.app`

---

## 📋 MUST DO NOW (Takes 3 minutes):

### ☐ Step 1: Add Volume (1 minute)

**Why:** Database needs persistent storage, otherwise it gets deleted on each deploy!

1. Go to: https://railway.app
2. Click your backend service: `telegram-course-seller-production-49a2`
3. Click "**Volumes**" tab (left sidebar)
4. Click "+ **New Volume**"
5. Enter:
   - **Mount Path:** `/app/data`
   - **Size:** 1 GB
6. Click "**Add**"
7. **Wait 1-2 minutes** for redeploy

---

### ☐ Step 2: Add Environment Variables (2 minutes)

**Why:** Backend can't verify you're admin without `TELEGRAM_ADMIN_IDS`!

1. Still on Railway, click "**Variables**" tab
2. Click "+ **New Variable**" for each:

```
TELEGRAM_ADMIN_IDS    →    387957921
BOT_TOKEN             →    8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI
PORT                  →    8080
NODE_ENV              →    production
FRONTEND_URL          →    https://nilexis-frontend.vercel.app
ADMIN_URL             →    https://nilexis-admin.vercel.app
APP_URL               →    https://nilexis-frontend.vercel.app
DEV_BYPASS_AUTH       →    false
```

3. Railway will **auto-redeploy** after you add variables
4. **Wait 1-2 minutes** for redeploy

---

### ☐ Step 3: Verify Deployment (30 seconds)

1. Go to "**Deployments**" tab
2. Check latest deployment shows "**Active**" (green)
3. Click on the deployment
4. Check logs - should see:
   ```
   ✅ Telegram bot started
   🚀 Server running on http://localhost:8080
   ```

---

### ☐ Step 4: Test Backend (30 seconds)

Open this URL in browser:
```
https://telegram-course-seller-production-49a2.up.railway.app/health
```

**Should show:**
```json
{"ok":true}
```

**If you see this, backend is working!** ✅

---

## 🎯 Why This Fixes "Failed to Save":

**Current Problem:**
```
Your Admin Panel → Sends request → Railway Backend
                                   ↓
                            "Who are you?" 
                            (checks TELEGRAM_ADMIN_IDS)
                                   ↓
                            NOT SET! ❌
                                   ↓
                            Returns 403 Forbidden
```

**After Fix:**
```
Your Admin Panel → Sends request → Railway Backend
                                   ↓
                            "Who are you?"
                            (checks TELEGRAM_ADMIN_IDS)
                                   ↓
                            Found: 387957921 ✅
                                   ↓
                            Saves settings to database
                                   ↓
                            Returns success!
```

---

## 🔍 How to Check If Variables Are Set:

### Method 1: Variables Tab
1. Click "**Variables**" tab in Railway
2. You should see **8 variables** listed
3. If you see 0 variables → **NOT SET YET!**

### Method 2: Deployment Logs
1. Click "**Deployments**" → Latest deployment
2. Look for this line in logs:
   ```
   ✅ Telegram bot started
   ```
3. If you see: `ℹ️ Bot skipped (no valid BOT_TOKEN)` → **Variables not set!**

---

## ⚠️ Common Mistakes:

❌ **Mistake 1:** Adding variables but not waiting for redeploy
   ✅ **Fix:** Wait 1-2 minutes after adding variables

❌ **Mistake 2:** Typo in variable name
   ✅ **Fix:** Copy-paste exact names from checklist above

❌ **Mistake 3:** No volume = database deleted on each deploy
   ✅ **Fix:** Add volume FIRST before testing

❌ **Mistake 4:** Testing before deployment finishes
   ✅ **Fix:** Check "Deployments" tab shows "Active" (green)

---

## 🧪 Complete Test After Setup:

### Test 1: Health Check
URL: `https://telegram-course-seller-production-49a2.up.railway.app/health`
Expected: `{"ok":true}`

### Test 2: Admin Login
1. Go to: `https://nilexis-admin.vercel.app`
2. Enter Telegram ID: `387957921`
3. Click "Sign In"
4. Should login successfully ✅

### Test 3: Payment Setup
1. Go to "Payment Setup" page
2. Fill in any field (e.g., CBE Account: `1234567890`)
3. Click "Save Settings"
4. Should show success! ✅

### Test 4: Upload Course Thumbnail
1. Go to "Courses" page
2. Click "Add New Course"
3. Upload a thumbnail image
4. Should upload successfully! ✅

---

## 📊 Visual Guide:

### Railway Sidebar:
```
┌─────────────────────┐
│ ⚙️ Settings         │
│ 📦 Deployments      │ ← Check deployment status here
│ 📊 Metrics          │
│ 💾 Volumes          │ ← ADD VOLUME HERE (Step 1)
│ 🔐 Variables        │ ← ADD VARIABLES HERE (Step 2)
│ 📝 Logs             │
└─────────────────────┘
```

### Variables Should Look Like:
```
┌───────────────────────────┬────────────────────────────────┐
│ TELEGRAM_ADMIN_IDS        │ 387957921                      │
│ BOT_TOKEN                 │ 8641996615:AAEk8cdPJ6_END... │
│ PORT                      │ 8080                           │
│ NODE_ENV                  │ production                     │
│ FRONTEND_URL              │ https://nilexis-frontend...    │
│ ADMIN_URL                 │ https://nilexis-admin...       │
│ APP_URL                   │ https://nilexis-frontend...    │
│ DEV_BYPASS_AUTH           │ false                          │
└───────────────────────────┴────────────────────────────────┘
```

---

## 🎉 After Completing This Checklist:

✅ Backend will be fully configured
✅ Database will persist across deploys
✅ Admin authentication will work
✅ "Failed to save" error will be GONE!
✅ Image uploads will work
✅ Everything will be operational!

---

## 🆘 If Still Not Working After This:

**Share with me:**
1. Screenshot of Railway "Variables" tab
2. Screenshot of Railway "Volumes" tab
3. Screenshot of Railway "Deployments" tab (latest deployment logs)
4. Screenshot of browser Network tab (F12 → Network) showing the failed request

This will help me pinpoint exactly what's wrong!

---

**Created:** June 19, 2026 at 9:50 PM
**Priority:** 🔥 URGENT - Do this NOW to fix the error!
