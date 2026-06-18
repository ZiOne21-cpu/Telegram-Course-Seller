# Vercel Deployment Guide

Your backend is deployed on Railway! ✅  
**Backend URL:** https://vibrant-intuition-production-c1e8.up.railway.app

Now deploy the frontend and admin panel to Vercel.

---

## 🚀 Deploy Frontend to Vercel

### Step 1: Go to Vercel
1. Open [vercel.com](https://vercel.com) and sign in
2. Click **"Add New"** → **"Project"**

### Step 2: Import Repository
1. Click **"Import Git Repository"**
2. Find and select: `ZiOne21-cpu/Telegram-Course-Seller`
3. Click **"Import"**

### Step 3: Configure Project
- **Project Name:** `nilexis-frontend` (or your choice)
- **Framework Preset:** Vite ✅ (should auto-detect)
- **Root Directory:** Click **"Edit"** → Select `frontend`
- **Build Command:** `npm run build` (default)
- **Output Directory:** `dist` (default)

### Step 4: Add Environment Variables
Click **"Environment Variables"** and add:

```
VITE_ADMIN_IDS = your_telegram_user_id
VITE_API_URL = https://vibrant-intuition-production-c1e8.up.railway.app
```

**Example:**
```
VITE_ADMIN_IDS = 387957921
VITE_API_URL = https://vibrant-intuition-production-c1e8.up.railway.app
```

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete (1-2 minutes)
3. **Copy your frontend URL:** `https://your-frontend.vercel.app`

---

## 🛡️ Deploy Admin Panel to Vercel

### Step 1: Add New Project
1. In Vercel, click **"Add New"** → **"Project"**

### Step 2: Import Same Repository
1. Click **"Import Git Repository"**
2. Select: `ZiOne21-cpu/Telegram-Course-Seller` (same repo)
3. Click **"Import"**

### Step 3: Configure Project
- **Project Name:** `nilexis-admin` (or your choice)
- **Framework Preset:** Vite ✅
- **Root Directory:** Click **"Edit"** → Select `admin`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Step 4: Add Environment Variables
```
VITE_ADMIN_IDS = your_telegram_user_id
VITE_API_URL = https://vibrant-intuition-production-c1e8.up.railway.app
```

### Step 5: Deploy
1. Click **"Deploy"**
2. Wait for build to complete
3. **Copy your admin URL:** `https://your-admin.vercel.app`

---

## 🔄 Update Railway Environment Variables

After both frontend and admin are deployed:

1. Go to Railway → Your Project → **Variables**
2. Update these variables:

```
FRONTEND_URL = https://your-frontend.vercel.app
ADMIN_URL = https://your-admin.vercel.app
APP_URL = https://your-frontend.vercel.app
```

3. Railway will automatically redeploy

---

## 🤖 Configure Telegram Bot

### Step 1: Open BotFather
1. Open Telegram and find [@BotFather](https://t.me/BotFather)
2. Send `/mybots`
3. Select your bot

### Step 2: Set Menu Button
1. Click **"Bot Settings"**
2. Click **"Menu Button"**
3. Click **"Edit Menu Button"** or **"Configure Menu Button"**
4. Enter your frontend URL: `https://your-frontend.vercel.app`
5. Done!

---

## ✅ Testing Checklist

### Backend Test
```bash
curl https://vibrant-intuition-production-c1e8.up.railway.app/health
```
**Expected:** `{"ok":true}` ✅

### Frontend Test
1. Open your bot in Telegram
2. Click the **menu button** (bottom left)
3. Mini App should open
4. You should see **Nilexis.Et** branding
5. Blue/purple gradient theme ✅

### Admin Test
1. Open `https://your-admin.vercel.app` in browser
2. Login page should appear
3. After login (Telegram auth), dashboard should load
4. Sidebar should show **Nilexis.Et** branding ✅

---

## 📝 Your Deployment URLs

Fill these in after deployment:

```
Backend:  https://vibrant-intuition-production-c1e8.up.railway.app ✅
Frontend: https://___________________________.vercel.app
Admin:    https://___________________________.vercel.app
Bot:      https://t.me/___________________________
```

---

## 🎉 After Deployment

### 1. Configure Payment Accounts
1. Open admin panel
2. Go to **Payment Setup**
3. Enter your CBE and Telebirr account details
4. Click **Save**

### 2. Add Your First Course
1. Go to **Courses** in admin panel
2. Click **Add Course**
3. Fill in details:
   - Title
   - Description
   - Price (in ETB)
   - Upload thumbnail
   - Select channel
4. Click **Create**

### 3. Test Purchase Flow
1. Open Mini App in Telegram
2. Browse courses
3. Click **Buy Now**
4. Fill in payment details
5. Upload screenshot
6. Submit
7. Approve in admin panel
8. Verify invite link is sent

---

## 🆘 Troubleshooting

### CORS Errors
**Problem:** Frontend can't reach backend  
**Solution:** 
- Check `FRONTEND_URL` and `ADMIN_URL` in Railway variables
- Make sure URLs match exactly (no trailing slash)
- Redeploy Railway after updating

### Mini App Not Opening
**Problem:** Bot menu button doesn't work  
**Solution:**
- Verify Menu Button URL in BotFather
- Should be: `https://your-frontend.vercel.app` (no path)
- Test URL directly in browser first

### Admin Panel Shows Blank
**Problem:** Admin panel won't load  
**Solution:**
- Check browser console (F12)
- Verify `VITE_API_URL` in Vercel environment variables
- Redeploy Vercel after updating

### 404 on API Routes
**Problem:** API calls return 404  
**Solution:**
- Check `vercel.json` has correct Railway URL
- Should be: `vibrant-intuition-production-c1e8.up.railway.app`
- Redeploy Vercel

---

## 📚 Next Steps

1. ✅ Deploy frontend to Vercel
2. ✅ Deploy admin to Vercel
3. ✅ Update Railway environment variables
4. ✅ Configure BotFather Menu Button
5. ✅ Test everything
6. ✅ Configure payment accounts
7. ✅ Add first course
8. 🎉 Launch!

---

**Need help?** Check:
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- [VERIFICATION.md](./VERIFICATION.md)
- [DEPLOYMENT.md](./DEPLOYMENT.md)
