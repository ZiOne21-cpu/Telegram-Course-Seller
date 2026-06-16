# Deployment Guide

This guide walks you through deploying the Telegram Course Seller to production.

## Prerequisites

- GitHub account
- Railway account ([railway.app](https://railway.app))
- Vercel account ([vercel.com](https://vercel.com))
- Telegram Bot Token from [@BotFather](https://t.me/BotFather)
- Your Telegram User ID (get it from [@userinfobot](https://t.me/userinfobot))

---

## Step 1: Deploy Backend to Railway

### 1.1 Push Code to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 1.2 Deploy to Railway
1. Go to [railway.app](https://railway.app)
2. Click **New Project** → **Deploy from GitHub repo**
3. Authorize Railway to access your repo
4. Select your repository
5. Click **Add Variables** and set:

```env
BOT_TOKEN=your_bot_token_from_botfather
TELEGRAM_ADMIN_IDS=your_telegram_user_id
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://TEMP
ADMIN_URL=https://TEMP
APP_URL=https://TEMP
```

> We'll update the URLs after deploying the frontend.

6. Go to **Settings** → set **Root Directory** to `backend`
7. Go to **Settings** → **Volumes** → Click **New Volume**
   - **Mount Path**: `/app/data`
   - Click **Add Volume**

### 1.3 Get Railway URL
After deployment completes:
- Go to **Settings** → **Networking** → **Generate Domain**
- Copy your URL: `https://your-app.up.railway.app`

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Update vercel.json
Edit `frontend/vercel.json` and replace `YOUR-BACKEND.up.railway.app` with your Railway URL:
```json
"destination": "https://your-app.up.railway.app/api/:path*"
```

### 2.2 Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

5. Add Environment Variables:
```env
VITE_ADMIN_IDS=your_telegram_user_id
VITE_API_URL=https://your-app.up.railway.app
```

6. Click **Deploy**
7. Copy your frontend URL: `https://your-frontend.vercel.app`

---

## Step 3: Deploy Admin Panel to Vercel

### 3.1 Update admin/vercel.json
Same as frontend — replace `YOUR-BACKEND.up.railway.app` with your Railway URL.

### 3.2 Deploy to Vercel
1. In Vercel, click **Add New** → **Project**
2. Import the same GitHub repo
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. Add Environment Variables:
```env
VITE_ADMIN_IDS=your_telegram_user_id
VITE_API_URL=https://your-app.up.railway.app
```

5. Click **Deploy**
6. Copy your admin URL: `https://your-admin.vercel.app`

---

## Step 4: Update Backend URLs

Go back to Railway → your project → **Variables** and update:
```env
FRONTEND_URL=https://your-frontend.vercel.app
ADMIN_URL=https://your-admin.vercel.app
APP_URL=https://your-frontend.vercel.app
```

Railway will automatically redeploy with the new variables.

---

## Step 5: Configure Telegram Bot

1. Open [@BotFather](https://t.me/BotFather) in Telegram
2. Send `/mybots` → select your bot
3. Click **Bot Settings** → **Menu Button**
4. Set the URL to: `https://your-frontend.vercel.app`

---

## Step 6: Test Your Deployment

1. Open your bot in Telegram
2. Click the **Menu Button** (bottom left) — it should open your Mini App
3. Browse courses (you won't have any yet)
4. Go to `https://your-admin.vercel.app` in your browser
5. Navigate to **Payment Setup** and configure your payment accounts
6. Add your first course with a thumbnail and description
7. Test the full buyer flow: browse → buy → upload screenshot → approve

---

## Troubleshooting

### Backend Issues
- Check Railway logs: **Deployments** → click the latest → **View Logs**
- Make sure the volume is mounted at `/app/data`
- Verify `BOT_TOKEN` is set correctly

### Frontend/Admin Issues
- Check Vercel logs: **Deployments** → click the latest → **View Function Logs**
- Make sure `vercel.json` has the correct Railway URL
- Verify CORS: Railway backend needs `FRONTEND_URL` and `ADMIN_URL` set

### Bot Not Responding
- Check the bot token is valid
- Make sure Railway backend is running (check logs)
- Verify the Mini App URL is set in BotFather

### Database Lost After Redeploy
- Make sure Railway has a volume mounted at `/app/data`
- Check **Settings** → **Volumes** in Railway

---

## Cost Estimate (Free Tier)

| Service | Free Tier | Limit |
|---------|-----------|-------|
| Railway | $5/month credit | ~500 hours/month |
| Vercel (Frontend) | Unlimited | 100GB bandwidth |
| Vercel (Admin) | Unlimited | 100GB bandwidth |
| Telegram Bot API | Free | Unlimited |

**Total: $0/month** for small traffic (Railway's $5 credit should cover it)

---

## Production Checklist

- [ ] Backend deployed to Railway with persistent volume
- [ ] Frontend deployed to Vercel
- [ ] Admin panel deployed to Vercel
- [ ] All environment variables set correctly
- [ ] Bot Menu Button URL configured in BotFather
- [ ] Payment accounts configured in Admin panel
- [ ] At least one test course created
- [ ] Full buyer flow tested end-to-end
- [ ] Database persists after Railway redeploy

---

## Next Steps

1. Add your bot to your private channels as admin
2. Configure channel links in the Admin panel
3. Share your bot with customers
4. Monitor orders in the Admin panel
5. Set up monitoring (optional): Railway has built-in metrics

---

## Support

If you encounter issues:
1. Check the logs (Railway for backend, Vercel for frontend)
2. Verify all environment variables are set
3. Test the API health endpoint: `https://your-app.up.railway.app/health`
4. Check CORS settings if you get cross-origin errors

