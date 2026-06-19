# 🚀 Quick Reference Card

## 📱 Your Information
- **Admin Telegram ID**: `387957921`
- **Bot Token**: `8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI`

## 🌐 Deployment URLs
| Service | URL |
|---------|-----|
| **Backend** | `https://vibrant-intuition-production-c1e8.up.railway.app` |
| **Admin Panel** | `https://nilexis-admin.vercel.app` |
| **Frontend** | `https://nilexis-frontend-jku0t0fy5-zione-s-projects.vercel.app` |

## 🔍 Quick Health Check
```
https://vibrant-intuition-production-c1e8.up.railway.app/health
```
Should return: `{"ok":true}`

## ⚡ Quick Commands

### Check if Node is Running
```bash
tasklist | findstr "node.exe"
```

### Kill All Node Processes
```bash
taskkill /F /IM node.exe
```

### Check localStorage (Browser Console)
```javascript
localStorage.getItem('admin_telegram_id')
```

## 🐛 Common Errors

| Error | Quick Fix |
|-------|-----------|
| **409 Bot Conflict** | Kill node.exe processes, wait 60 seconds |
| **Failed to upload image** | Check Railway logs, verify admin ID in localStorage |
| **401 Unauthorized** | Re-login with Telegram ID 387957921 |
| **CORS Error** | Verify Railway backend is running |

## 📋 Environment Variables

### Railway
```env
BOT_TOKEN=8641996615:AAEk8cdPJ6_END28Q_6YaDIMpvD2W7iHAzI
TELEGRAM_ADMIN_IDS=387957921
PORT=8080
NODE_ENV=production
```

### Vercel Admin
```env
VITE_BACKEND_URL=https://vibrant-intuition-production-c1e8.up.railway.app
VITE_ADMIN_IDS=387957921
```

## 🔧 Debug Tools

### Browser DevTools (F12)
- **Console**: JavaScript errors
- **Network**: API request/response
- **Application → Local Storage**: Auth tokens

### Railway Dashboard
- **Deployments**: View logs
- **Metrics**: CPU/Memory usage
- **Variables**: Environment variables

## 📚 Documentation Quick Links

| Need | File |
|------|------|
| What to do now | `WHAT-TO-DO-NOW.md` |
| Something broken | `TROUBLESHOOTING-COMPLETE.md` |
| Check status | `CHECK-STATUS.md` |
| Railway setup | `RAILWAY-ENV-CONFIG.md` |
| Understand system | `ARCHITECTURE.md` |
| Full status | `FINAL-STATUS.md` |
| Session notes | `SESSION-SUMMARY.md` |

## ⏰ Current Status
✅ Local node.exe killed  
⏳ Waiting 60s for bot conflict to clear  
🎯 Ready to test after wait period  

## 🎯 Next Steps
1. ⏰ Wait 60 seconds
2. 🔍 Check backend health URL
3. 🖥️ Login to admin panel
4. 🖼️ Test image upload
5. ✍️ Create test course

---

**Print this and keep it handy!** 📄
