# 🚀 Deploy to Vercel via Dashboard (Recommended)

Since Vercel CLI has installation issues, use the web dashboard instead. It's actually easier!

## ✅ Step 1: Connect GitHub to Vercel

1. Go to: **https://vercel.com/new**
2. Click **"Continue with GitHub"** (if not already connected)
3. Authorize Vercel to access your GitHub repositories

## ✅ Step 2: Import Your GitHub Repository

1. You'll see a list of your GitHub repositories
2. Find: **`Telegram-Course-Seller`** (or search for it)
3. Click **"Import"**

## ✅ Step 3: Configure Frontend Deployment

Vercel will detect your project. Configure it:

### Project Settings:
- **Project Name**: `nilexis-et-frontend` (or your choice)
- **Framework Preset**: Vite
- **Root Directory**: Click "Edit" → Select **`frontend`**
- **Build Command**: Leave as default (it will use `vite build` from vercel.json)
- **Output Directory**: Leave as default (`dist`)

### Environment Variables:
- None needed for frontend (API URL is in vercel.json)

4. Click **"Deploy"**

⏳ Wait 1-2 minutes for the build to complete.

### Expected Result:
✅ Build succeeds  
✅ You get a URL like: `https://nilexis-et-frontend.vercel.app`  
**📋 SAVE THIS URL!** You'll need it later.

---

## ✅ Step 4: Deploy Admin Panel (Same Process)

1. Go back to: **https://vercel.com/new**
2. Find **`Telegram-Course-Seller`** again
3. Click **"Import"**

### Project Settings:
- **Project Name**: `nilexis-et-admin` (or your choice)
- **Framework Preset**: Vite
- **Root Directory**: Click "Edit" → Select **`admin`**
- **Build Command**: Leave as default
- **Output Directory**: Leave as default (`dist`)

### Environment Variables:
- None needed for admin

4. Click **"Deploy"**

⏳ Wait 1-2 minutes.

### Expected Result:
✅ Build succeeds  
✅ You get a URL like: `https://nilexis-et-admin.vercel.app`  
**📋 SAVE THIS URL TOO!**

---

## ✅ Step 5: Update Railway Environment Variables

Now that both frontend and admin are deployed:

1. Go to: **https://railway.app/dashboard**
2. Select your backend project: **vibrant-intuition**
3. Click the **"Variables"** tab
4. Add these new variables:

```
FRONTEND_URL=https://nilexis-et-frontend.vercel.app
ADMIN_URL=https://nilexis-et-admin.vercel.app
```

*(Replace with your actual Vercel URLs)*

5. Railway will automatically redeploy with the new variables

---

## ✅ Step 6: Configure Telegram Bot Menu Button

1. Open Telegram
2. Search for: **@BotFather**
3. Send: `/mybots`
4. Select your bot
5. Click: **Bot Settings**
6. Click: **Menu Button**
7. Click: **Configure Menu Button**
8. When prompted for URL, send: `https://nilexis-et-frontend.vercel.app`
9. When prompted for button text, send: `Browse Courses`

---

## 🎉 Step 7: Test Everything!

### Test Frontend:
1. Visit your frontend URL
2. Check: Courses load
3. Check: Modern Nilexis.Et design is visible
4. Check: Blue/purple gradients show

### Test Admin:
1. Visit your admin URL
2. Login with your admin credentials
3. Check: Dashboard shows stats
4. Check: Can view/edit courses

### Test Bot:
1. Open your bot in Telegram
2. Click the **Menu Button**
3. Verify it opens the frontend
4. Try browsing courses

---

## 🔄 Auto-Deploy Feature

Now that Vercel is connected to your GitHub:
- Every time you push to the `main` branch
- Vercel automatically redeploys both frontend and admin
- No manual steps needed!

---

## 📝 Summary

**Deployment Stack:**
- ✅ Backend: Railway → `https://vibrant-intuition-production-c1e8.up.railway.app`
- ✅ Frontend: Vercel → `https://your-frontend.vercel.app`
- ✅ Admin: Vercel → `https://your-admin.vercel.app`
- ✅ Bot: Telegram with menu button to frontend

**All done! Your Nilexis.Et platform is live! 🚀**
