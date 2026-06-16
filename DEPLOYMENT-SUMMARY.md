# Deployment Summary

Quick reference card for your deployed application.

---

## 🌐 Your Live URLs

After deployment, fill these in:

| Service | URL | Purpose |
|---------|-----|---------|
| **Backend** | `https://________________.up.railway.app` | API + Bot |
| **Frontend** | `https://________________.vercel.app` | Mini App |
| **Admin** | `https://________________.vercel.app` | Admin Panel |

---

## 🔑 Environment Variables

### Backend (Railway)
```env
BOT_TOKEN=________________________
TELEGRAM_ADMIN_IDS=_______________
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://________________.vercel.app
ADMIN_URL=https://________________.vercel.app
APP_URL=https://________________.vercel.app
```

### Frontend (Vercel)
```env
VITE_ADMIN_IDS=_______________
VITE_API_URL=https://________________.up.railway.app
```

### Admin (Vercel)
```env
VITE_ADMIN_IDS=_______________
VITE_API_URL=https://________________.up.railway.app
```

---

## 🤖 Bot Configuration

### BotFather Settings
- **Bot Username:** @________________
- **Bot Token:** (saved in Railway env vars)
- **Menu Button URL:** `https://________________.vercel.app`

### Bot Permissions (in each channel)
- ✅ Admin role
- ✅ "Invite Users via Link" permission

---

## 💳 Payment Accounts

Configure these in Admin Panel → Payment Setup:

- **CBE Account:** ________________
- **CBE Name:** ________________
- **Telebirr Account:** ________________
- **Telebirr Name:** ________________

---

## 📊 Quick Access

### For You (Admin)
- **Admin Dashboard:** `https://________________.vercel.app`
- **Railway Logs:** railway.app → Your Project → Deployments → View Logs
- **Vercel Logs:** vercel.com → Your Project → Deployments → Logs
- **Bot Chat:** `https://t.me/________________`

### For Customers
- **Bot Link:** `https://t.me/________________`
- **Mini App:** Open bot → Click menu button (bottom left)

---

## 🛠️ Maintenance Commands

### View Logs
```bash
# Railway logs (if using Railway CLI)
railway logs

# Or check Railway dashboard → Deployments → View Logs
```

### Update Deployment
```bash
git add .
git commit -m "Update description"
git push
# Railway and Vercel auto-deploy from GitHub
```

### Backup Database
```bash
# Use Railway CLI
railway link
railway run bash
tar -czf backup-$(date +%Y%m%d).tar.gz /app/data/app.db
exit
# Download from Railway dashboard
```

---

## 🚨 Emergency Contacts

### If Bot Token is Compromised
1. Open @BotFather
2. Send `/revoke`
3. Select your bot
4. Generate new token
5. Update `BOT_TOKEN` in Railway
6. Redeploy

### If Database is Lost
- Check Railway volume is mounted at `/app/data`
- Restore from latest backup
- If no backup: Start fresh (all orders lost)

### If Admin Account is Hacked
1. Remove compromised ID from `TELEGRAM_ADMIN_IDS` in Railway
2. Change to new trusted admin ID
3. Redeploy
4. Review recent orders for suspicious activity

---

## 📈 Usage Monitoring

### Railway Metrics
- **Dashboard:** railway.app → Your Project → Metrics
- **Free tier credit:** $5/month
- **Monitor:** CPU, Memory, Network usage

### Vercel Analytics
- **Dashboard:** vercel.com → Your Project → Analytics
- **Free tier:** 100GB bandwidth/month
- **Monitor:** Page views, API calls, errors

---

## ✅ Health Checks

Run these periodically:

```bash
# Backend health
curl https://YOUR-BACKEND.up.railway.app/health

# Courses API
curl https://YOUR-BACKEND.up.railway.app/api/courses

# Frontend (should return HTML)
curl https://YOUR-FRONTEND.vercel.app
```

---

## 📝 Regular Tasks

### Daily
- [ ] Check pending orders in Admin Panel
- [ ] Approve/reject payment screenshots
- [ ] Monitor Railway logs for errors

### Weekly
- [ ] Review dashboard statistics
- [ ] Check Railway credit usage
- [ ] Verify all channels still have bot as admin
- [ ] Backup database

### Monthly
- [ ] Review security logs
- [ ] Update dependencies (`npm outdated`)
- [ ] Check Vercel/Railway for service updates
- [ ] Test full buyer flow

---

## 🔒 Security Checklist

- [ ] `.env` files not committed to Git
- [ ] `BOT_TOKEN` is secret and secure
- [ ] Only trusted IDs in `TELEGRAM_ADMIN_IDS`
- [ ] Railway volume mounted at `/app/data`
- [ ] CORS configured correctly
- [ ] File uploads restricted (5MB, images only)
- [ ] Regular database backups scheduled

---

## 📚 Documentation Reference

| Document | Purpose |
|----------|---------|
| [START-HERE.md](./START-HERE.md) | First-time setup guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Detailed deployment steps |
| [VERIFICATION.md](./VERIFICATION.md) | Post-deploy testing |
| [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Fix common issues |
| [SECURITY.md](./SECURITY.md) | Security best practices |

---

## 🎯 Success Metrics

Track these in your Admin Dashboard:

- **Total Orders:** _______
- **Pending Orders:** _______
- **Approval Rate:** _______%
- **Total Revenue:** _______ Birr
- **Active Courses:** _______
- **Average Order Value:** _______ Birr

---

## 📞 Support Resources

- **Railway Docs:** docs.railway.app
- **Vercel Docs:** vercel.com/docs
- **Telegram Bot API:** core.telegram.org/bots/api
- **Project Docs:** See documentation files in this repo

---

## 🎉 Launch Checklist

Before going live with customers:

- [ ] Backend deployed and running
- [ ] Frontend deployed and accessible
- [ ] Admin panel deployed and accessible
- [ ] Bot token configured in BotFather
- [ ] Menu button URL set in BotFather
- [ ] Payment accounts configured
- [ ] At least one test course created
- [ ] Full buyer flow tested end-to-end
- [ ] Bot is admin in all channels
- [ ] Database persists after redeploy
- [ ] All URLs updated in this document
- [ ] Backup strategy in place

---

**Date Deployed:** _______________  
**Deployed By:** _______________  
**Last Updated:** _______________

---

Print this page and keep it handy! 📄
