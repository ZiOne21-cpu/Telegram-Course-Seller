# 🔧 Admin Panel Screenshot Fix

## 🚨 Problem:
When you click "View Screenshot" in the Orders page, you get a **404 Not Found** error.

## 🎯 Root Cause:
The admin panel's `vercel.json` was proxying to the **old wrong backend URL**:
- ❌ Old: `vibrant-intuition-production-c1e8.up.railway.app`
- ✅ New: `telegram-course-seller-production.up.railway.app`

**Status**: ✅ Fixed locally in code

---

## 🚀 FIX - Update Admin Panel on Vercel

Since the admin folder is a separate deployment, you need to update it manually on Vercel.

### **Option 1: Update vercel.json via Vercel Dashboard** (Easiest)

Unfortunately, Vercel doesn't let you edit `vercel.json` directly in the dashboard. You need to push the changes via git.

---

### **Option 2: Push via Git** (Recommended)

The admin folder needs its own git repository connected to Vercel.

#### **Step 1: Check if Admin Has GitHub Repo**

1. Go to: **https://vercel.com/dashboard**
2. Find your **admin panel project** (nilexis-admin)
3. Click **Settings** → **Git**
4. Do you see a connected GitHub repository?

---

#### **If YES - Admin is Connected to GitHub:**

1. Check which repository it's connected to
2. The file that needs updating is: `vercel.json`
3. You have two options:

**Option A - Edit on GitHub:**
1. Go to your admin repository on GitHub
2. Find `vercel.json`
3. Click **Edit** (pencil icon)
4. Change all instances of:
   ```
   https://vibrant-intuition-production-c1e8.up.railway.app
   ```
   to:
   ```
   https://telegram-course-seller-production.up.railway.app
   ```
5. Commit the changes
6. Vercel will auto-deploy

**Option B - Push from Local:**
1. Open PowerShell in the admin folder
2. Run:
   ```powershell
   cd "z:\MY FILES\AI House\Telegram Course Seller\admin"
   git status
   # Should show vercel.json as modified
   git add vercel.json
   git commit -m "Fix: Update backend URL for screenshot access"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push origin master
   ```
3. Vercel will auto-deploy

---

#### **If NO - Admin is NOT Connected to GitHub:**

You need to manually update the `vercel.json` file through a new deployment.

**Method 1 - Redeploy from Local Files:**

1. Go to: **https://vercel.com/new**
2. Click **Browse** to upload files
3. Select your admin folder: `z:\MY FILES\AI House\Telegram Course Seller\admin`
4. Make sure to use the **updated** `vercel.json` (I already fixed it locally)
5. Deploy
6. This will create a new deployment with the correct URL

**Method 2 - Update Environment Variables (Temporary Workaround):**

If the admin uses environment variables, you can update them:

1. Go to: **https://vercel.com/dashboard**
2. Click your **admin panel project**
3. Go to **Settings** → **Environment Variables**
4. Look for `VITE_BACKEND_URL`
5. Update it to: `https://telegram-course-seller-production.up.railway.app`
6. Save
7. Go to **Deployments** → Latest → ⋯ → **Redeploy**

**Note:** This only fixes API calls, not static file proxying. You still need to update `vercel.json`.

---

## ✅ Verify the Fix Works:

After updating and redeploying:

1. Go to: **https://nilexis-admin.vercel.app/orders**
2. Find an order with a screenshot
3. Click **"View Screenshot"**
4. The image should load instead of showing 404

---

## 🔍 Test the URLs Directly:

After the fix, these should work:

**Test 1 - Health Check:**
```
https://nilexis-admin.vercel.app/api/settings/payment
```
Should return payment settings (not 404)

**Test 2 - Screenshot:**
```
https://nilexis-admin.vercel.app/uploads/1781798190757-photo_2026-06-13_04-17-15.jpg
```
Should show the uploaded screenshot

**Test 3 - Thumbnail:**
```
https://nilexis-admin.vercel.app/thumbnails/thumb-1781532010013.jpg
```
Should show a course thumbnail

---

## 📋 Files That Need the Correct Backend URL:

### ✅ Already Fixed Locally:
- `admin/vercel.json` - Proxies API, uploads, thumbnails to Railway
- `admin/.env.production` - Backend URL for direct API calls
- `frontend/vercel.json` - Frontend proxy to Railway

### ⏳ Need Deployment:
- Admin panel on Vercel (needs `vercel.json` update)

---

## 🆘 If You're Stuck:

### Quick Workaround (Not Recommended):

You can view screenshots directly from Railway instead:

When you see the screenshot URL like:
```
/uploads/1781798190757-photo_2026-06-13_04-17-15.jpg
```

Open it directly on Railway:
```
https://telegram-course-seller-production.up.railway.app/uploads/1781798190757-photo_2026-06-13_04-17-15.jpg
```

This is temporary - the proper fix is to update the admin panel's `vercel.json`.

---

## 💡 What I've Done:

1. ✅ Fixed `admin/vercel.json` locally
2. ✅ Fixed `admin/.env.production` locally
3. ✅ Fixed `frontend/vercel.json` and pushed to git
4. ⏳ Admin panel needs manual redeploy on Vercel

---

**Choose one of the methods above and redeploy your admin panel!** 🚀

After redeploying, the screenshots will load correctly.
