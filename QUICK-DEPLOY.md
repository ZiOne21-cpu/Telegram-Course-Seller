# Quick Deploy (TL;DR)

For experienced developers who want to deploy fast.

---

## Prerequisites
- [ ] Telegram bot token from @BotFather
- [ ] Your Telegram user ID from @userinfobot
- [ ] GitHub repo with code pushed
- [ ] Railway + Vercel accounts

---

## Step 1: Railway (Backend)

```bash
# 1. Push to GitHub
git add . && git commit -m "Ready for deploy" && git push

# 2. Deploy to Railway
# - Go to railway.app → New Project → Deploy from GitHub
# - Root Directory: backend
# - Add Volume: /app/data
```

**Environment Variables:**
```env
BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_IDS=your_user_id
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://TEMP
ADMIN_URL=https://TEMP
APP_URL=https://TEMP
```

**Get Railway URL:** Settings → Networking → Generate Domain
→ Copy: `https://xxx.up.railway.app`

---

## Step 2: Update vercel.json Files

Replace `YOUR-BACKEND.up.railway.app` with your Railway URL in:
- `frontend/vercel.json`
- `admin/vercel.json`

```bash
# Quick find & replace (Linux/Mac)
sed -i 's/YOUR-BACKEND.up.railway.app/xxx.up.railway.app/g' frontend/vercel.json
sed -i 's/YOUR-BACKEND.up.railway.app/xxx.up.railway.app/g' admin/vercel.json

# Windows PowerShell
(Get-Content frontend\vercel.json) -replace 'YOUR-BACKEND.up.railway.app', 'xxx.up.railway.app' | Set-Content frontend\vercel.json
(Get-Content admin\vercel.json) -replace 'YOUR-BACKEND.up.railway.app', 'xxx.up.railway.app' | Set-Content admin\vercel.json

# Commit changes
git add . && git commit -m "Update backend URLs" && git push
```

---

## Step 3: Vercel (Frontend)

```bash
# Deploy via Vercel CLI (optional)
npm i -g vercel
cd frontend
vercel --prod
```

**Or via Dashboard:**
- Go to vercel.com → New Project → Import repo
- Root Directory: `frontend`
- Environment Variables:
  ```env
  VITE_ADMIN_IDS=your_user_id
  VITE_API_URL=https://xxx.up.railway.app
  ```

**Get Frontend URL:** → Copy: `https://yyy.vercel.app`

---

## Step 4: Vercel (Admin)

Same as frontend, but:
- Root Directory: `admin`
- Environment Variables:
  ```env
  VITE_ADMIN_IDS=your_user_id
  VITE_API_URL=https://xxx.up.railway.app
  ```

**Get Admin URL:** → Copy: `https://zzz.vercel.app`

---

## Step 5: Update Railway Environment

Go back to Railway → Variables → Update:
```env
FRONTEND_URL=https://yyy.vercel.app
ADMIN_URL=https://zzz.vercel.app
APP_URL=https://yyy.vercel.app
```

Railway auto-redeploys.

---

## Step 6: Configure BotFather

```
Open @BotFather on Telegram
/mybots → Select your bot
Bot Settings → Menu Button
Enter URL: https://yyy.vercel.app
```

---

## Step 7: Test

1. Open bot in Telegram → Click Menu Button
2. Should see course list (empty)
3. Open `https://zzz.vercel.app` (admin panel)
4. Go to Payment Setup → Fill in details
5. Go to Courses → Add a course
6. Test buyer flow in Mini App

---

## Done! 🎉

**Your URLs:**
- **Backend:** `https://xxx.up.railway.app`
- **Frontend:** `https://yyy.vercel.app`
- **Admin:** `https://zzz.vercel.app`

---

## Troubleshooting

**CORS errors?**
- Check `FRONTEND_URL` and `ADMIN_URL` in Railway (no trailing slash)

**Database resets?**
- Check Railway volume is mounted at `/app/data`

**Bot not responding?**
- Check Railway logs for errors
- Verify `BOT_TOKEN` is correct

**404 on API routes?**
- Check `vercel.json` has correct Railway URL
- Redeploy Vercel

---

## Maintenance

**View logs:**
- Railway: Deployments → View Logs
- Vercel: Deployments → View Function Logs

**Update code:**
```bash
git add . && git commit -m "Update" && git push
# Railway/Vercel auto-deploy from GitHub
```

**Backup database:**
```bash
# Use Railway CLI
railway link
railway run bash
tar -czf backup.tar.gz /app/data/app.db
exit
# Download from Railway dashboard
```

---

**Full guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)  
**Troubleshooting:** [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
