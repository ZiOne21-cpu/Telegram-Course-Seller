# 🔧 Fix "Failed to Save" Error - Payment Setup

**Problem:** Backend can't verify your admin ID because environment variables aren't set.

---

## 🚨 Quick Fix (5 minutes):

### **Step 1: Set Railway Environment Variables**

Go to Railway → Your backend service → Variables tab

Add these **8 variables**:

```
BOT_TOKEN=8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI
TELEGRAM_ADMIN_IDS=387957921
PORT=8080
NODE_ENV=production
FRONTEND_URL=https://nilexis-frontend.vercel.app
ADMIN_URL=https://nilexis-admin.vercel.app
APP_URL=https://nilexis-frontend.vercel.app
DEV_BYPASS_AUTH=false
```

**IMPORTANT:** The key one for this error is `TELEGRAM_ADMIN_IDS=387957921`

Railway will auto-redeploy after you add variables (~1-2 minutes).

---

### **Step 2: Set Vercel Environment Variables (Admin)**

Go to Vercel → Your admin project → Settings → Environment Variables

Add this **1 variable**:

```
VITE_ADMIN_IDS=387957921
```

Select: **Production, Preview, Development**

Then click "Redeploy" on the latest deployment.

---

### **Step 3: Wait for Redeployment**

- Railway: ~1-2 minutes
- Vercel Admin: ~1 minute

---

### **Step 4: Test Again**

1. Go to: https://nilexis-admin.vercel.app
2. **Log out first** (if you're logged in)
3. Log in again with your Telegram ID: `387957921`
4. Go to Payment Setup
5. Enter payment details
6. Click "Save Settings"
7. **Should work!** ✅

---

## 🔍 Why This Happens:

**Backend Check:**
```typescript
// middleware.ts line 45
if (!ADMIN_IDS.includes(adminId.trim())) {
  res.status(403).json({ error: 'Admin access required' });
}
```

- Backend reads `TELEGRAM_ADMIN_IDS` from environment
- Your ID: `387957921` needs to be in that list
- Without it, backend rejects all admin requests

**Frontend Check:**
```typescript
// LoginPage.tsx line 5
const ADMIN_IDS = (import.meta.env.VITE_ADMIN_IDS || '').split(',')
```

- Frontend reads `VITE_ADMIN_IDS` from Vercel environment
- Without it, login page can't verify your ID
- You can still login, but backend will reject requests

---

## ✅ What Each Variable Does:

| Variable | Purpose | Required For |
|----------|---------|--------------|
| `BOT_TOKEN` | Telegram bot authentication | Bot to work |
| `TELEGRAM_ADMIN_IDS` | **Admin verification** | **Payment setup, orders, courses** |
| `PORT` | Server port | Railway deployment |
| `NODE_ENV` | Production mode | Security features |
| `FRONTEND_URL` | CORS configuration | Frontend requests |
| `ADMIN_URL` | CORS configuration | Admin panel requests |
| `APP_URL` | Bot webapp URL | Telegram integration |
| `DEV_BYPASS_AUTH` | Disable in production | Security |

---

## 🎯 Priority Order:

**Most Critical (do these first):**
1. ⭐ `TELEGRAM_ADMIN_IDS=387957921` on Railway
2. ⭐ `VITE_ADMIN_IDS=387957921` on Vercel Admin

**Important (do these next):**
3. `BOT_TOKEN` on Railway
4. `PORT=8080` on Railway
5. `NODE_ENV=production` on Railway

**Good to have:**
6. `FRONTEND_URL`, `ADMIN_URL`, `APP_URL` on Railway
7. `DEV_BYPASS_AUTH=false` on Railway

---

## 📸 Visual Guide:

### Railway Variables Tab:
```
┌─────────────────────────────┬──────────────────────────────────────────┐
│ Variable Name               │ Value                                    │
├─────────────────────────────┼──────────────────────────────────────────┤
│ TELEGRAM_ADMIN_IDS          │ 387957921                                │
│ BOT_TOKEN                   │ 8641996615:AAEk8cdPJ6_END28Q_6YaDIM... │
│ PORT                        │ 8080                                     │
│ NODE_ENV                    │ production                               │
└─────────────────────────────┴──────────────────────────────────────────┘
```

### Vercel Variables Tab (Admin):
```
┌─────────────────────────────┬──────────────────────────────────────────┐
│ Key                         │ Value                                    │
├─────────────────────────────┼──────────────────────────────────────────┤
│ VITE_ADMIN_IDS              │ 387957921                                │
└─────────────────────────────┴──────────────────────────────────────────┘
```

---

## ⚡ After Setting Variables:

**Railway will automatically:**
- Rebuild your backend
- Restart the service
- Apply new environment variables

**Vercel needs manual action:**
- Go to Deployments
- Click "..." on latest deployment
- Click "Redeploy"

---

## 🧪 How to Test It's Working:

### Test 1: Check Backend Health
Open: `https://telegram-course-seller-production-49a2.up.railway.app/health`
Should show: `{"ok":true}`

### Test 2: Check Admin Auth
1. Log out from admin panel
2. Log in with `387957921`
3. Should successfully login

### Test 3: Save Payment Settings
1. Go to Payment Setup
2. Fill in any field
3. Click "Save Settings"
4. Should show success message!

---

## 🚨 If Still Not Working:

**Check Railway Logs:**
1. Go to Railway → Your service
2. Click "Deployments"
3. Click latest deployment
4. Check logs for errors

**Check Browser Console:**
1. Press F12 in browser
2. Go to Console tab
3. Look for errors
4. Check Network tab for failed requests

**Common Issues:**
- ❌ Variable name typo (must be exact)
- ❌ Railway didn't finish redeploying
- ❌ Vercel still showing old deployment
- ❌ Browser cache (try incognito mode)

---

## 💡 Pro Tip:

After setting variables, clear your browser cache or use incognito mode to test. This ensures you're seeing the latest deployment, not cached version!

---

**Created:** June 19, 2026 at 9:40 PM
**Status:** Ready to fix - just need to add environment variables!
