# 🎯 Add Environment Variable to Vercel (Step-by-Step)

## The Problem
Your admin panel returns **401 Unauthorized** because Vercel doesn't have the `VITE_ADMIN_IDS` environment variable.

---

## The Fix (5 Minutes)

### Step 1: Open Vercel Dashboard
```
Go to: https://vercel.com/dashboard
```

### Step 2: Select Your Project
- Look for: **nilexis-admin** or **telegram-course-seller-admin**
- Click on it

### Step 3: Go to Settings
- Click the **Settings** tab (top navigation)

### Step 4: Open Environment Variables
- In the left sidebar, click **Environment Variables**

### Step 5: Add New Variable
Click the **Add New** button (or **Add Variable**)

Fill in:
```
Key:         VITE_ADMIN_IDS
Value:       387957921
Environments: ✅ Production
              ✅ Preview  
              ✅ Development
```

Click **Save**

### Step 6: Redeploy
Two options:

**Option A: Redeploy from Dashboard**
1. Click **Deployments** tab
2. Find the latest deployment
3. Click the **three dots (...)** menu
4. Click **Redeploy**
5. Confirm

**Option B: Git Push**
```bash
cd "z:\MY FILES\AI House\Telegram Course Seller"
git add admin/.env.production admin/src/api.ts admin/src/pages/*.tsx
git commit -m "fix: Add admin IDs env var"
git push origin main
```

### Step 7: Wait for Deployment
- Watch the **Deployments** page
- Wait for status to change to **Ready** (1-2 minutes)

### Step 8: Test
1. Go to: https://nilexis-admin.vercel.app
2. Press: `Ctrl + Shift + R` (hard refresh)
3. Log in with ID: `387957921`
4. Navigate to any page
5. Should work without 401 errors!

---

## What This Variable Does

```javascript
// LoginPage.tsx checks this when you log in
const ADMIN_IDS = import.meta.env.VITE_ADMIN_IDS.split(',');

// If your ID is in this list, you can log in
if (ADMIN_IDS.includes('387957921')) {
  localStorage.setItem('admin_telegram_id', '387957921');
  // Login successful
}
```

Without this variable:
- `ADMIN_IDS` = `[]` (empty array)
- You can "log in" (no check)
- But API calls fail with 401 because backend doesn't recognize you

With this variable:
- `ADMIN_IDS` = `['387957921']`
- Login validates your ID
- API calls work because both frontend and backend know your ID

---

## Vercel Environment Variables Explained

### Local (.env files)
```
.env                  → Used when running locally (npm run dev)
.env.production       → NOT read by Vercel! Just documentation
```

### Vercel Dashboard (Cloud)
```
Environment Variables → Actually used when site is deployed
```

**IMPORTANT:** `.env.production` files are NOT automatically loaded by Vercel! You must manually add variables in the Vercel dashboard.

---

## After Adding the Variable

### What Should Work:
✅ Login validates your Telegram ID
✅ Dashboard loads stats
✅ Courses page shows courses
✅ Can create/edit/delete courses
✅ Orders page shows orders
✅ Can approve/reject orders
✅ Payment Setup saves successfully
✅ No 401 Unauthorized errors

### What Might Still Have Issues:
⚠️ File uploads (thumbnails) - May need CORS fix on Railway

---

## Troubleshooting

### Still Getting 401 After Adding Env Var?

**Check 1: Was the site redeployed?**
- Go to Vercel → Deployments
- Confirm there's a new deployment after you added the variable
- Environment variables only take effect after redeployment

**Check 2: Is the env var actually set?**
- In browser console: `console.log(import.meta.env.VITE_ADMIN_IDS)`
- Should show: `"387957921"`
- If undefined, the deployment didn't pick it up

**Check 3: Did you check all 3 environments?**
- Production ✅
- Preview ✅
- Development ✅

**Check 4: Clear browser cache**
- Press Ctrl+Shift+R
- Or Ctrl+Shift+Delete to clear all cache

**Check 5: Check Railway backend**
- Railway should have: `TELEGRAM_ADMIN_IDS=387957921`
- This must match the Vercel `VITE_ADMIN_IDS`

---

## Quick Summary

1. **Go to:** Vercel Dashboard → nilexis-admin → Settings → Environment Variables
2. **Add:** `VITE_ADMIN_IDS` = `387957921` (all environments)
3. **Redeploy:** Deployments → Latest → Redeploy
4. **Wait:** 1-2 minutes
5. **Test:** Hard refresh (Ctrl+Shift+R) and login
6. **Done:** Should work!

---

**DO THIS NOW:** Go to Vercel and add the environment variable!
