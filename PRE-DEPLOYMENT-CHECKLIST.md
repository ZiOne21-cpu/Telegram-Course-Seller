# Pre-Deployment Checklist

Before deploying, make sure you have:

## 1. Telegram Bot Setup
- [ ] Created a bot via [@BotFather](https://t.me/BotFather)
- [ ] Saved your `BOT_TOKEN`
- [ ] Added bot as admin to all private channels (with "Invite Users via Link" permission)
- [ ] Got your Telegram User ID from [@userinfobot](https://t.me/userinfobot)

## 2. Accounts Created
- [ ] Railway account ([railway.app](https://railway.app))
- [ ] Vercel account ([vercel.com](https://vercel.com))
- [ ] GitHub account with your code pushed

## 3. Payment Accounts Ready
- [ ] CBE (Commercial Bank of Ethiopia) account number
- [ ] Telebirr phone number and account holder name

## 4. Code Preparation
- [ ] All files committed to Git
- [ ] `.env` files not committed (they're in `.gitignore`)
- [ ] Test locally one more time:
  ```bash
  # Backend
  cd backend
  npm install
  npm run dev
  
  # Frontend (in new terminal)
  cd frontend
  npm install
  npm run dev
  
  # Admin (in new terminal)
  cd admin
  npm install
  npm run dev
  ```

## 5. Environment Variables Prepared

Have these ready to copy-paste:

### Backend (Railway)
```
BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_IDS=your_telegram_user_id
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://TEMP
ADMIN_URL=https://TEMP
APP_URL=https://TEMP
```

### Frontend (Vercel)
```
VITE_ADMIN_IDS=your_telegram_user_id
VITE_API_URL=https://TEMP
```

### Admin (Vercel)
```
VITE_ADMIN_IDS=your_telegram_user_id
VITE_API_URL=https://TEMP
```

---

## Deployment Order

1. **Backend first** (Railway) → Get backend URL
2. **Update `vercel.json` files** with backend URL
3. **Frontend** (Vercel) → Get frontend URL
4. **Admin** (Vercel) → Get admin URL
5. **Update backend env vars** on Railway with frontend/admin URLs
6. **Configure BotFather** with frontend URL
7. **Test everything**

---

## Quick Commands

### Build and test locally
```bash
# Backend
cd backend && npm run build && npm start

# Frontend
cd frontend && npm run build && npm run preview

# Admin
cd admin && npm run build && npm run preview
```

### Update vercel.json files
Replace `YOUR-BACKEND.up.railway.app` in:
- `frontend/vercel.json`
- `admin/vercel.json`

---

Ready? Follow the **DEPLOYMENT.md** guide step-by-step!
