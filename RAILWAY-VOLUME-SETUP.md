# 🗄️ Railway Volume Setup Guide

## 🎯 What This Fixes:
- ❌ Uploaded files disappear after Railway restarts
- ❌ Screenshots show 404 after redeploy
- ❌ Course thumbnails lost on restart

## ✅ After Adding Volume:
- ✅ Files persist between deployments
- ✅ Screenshots always accessible
- ✅ Thumbnails never lost

---

## 📋 Step-by-Step Instructions:

### **Step 1: Go to Railway Dashboard** ⏱️ 1 min

1. Open: **https://railway.app/**
2. Log in to your account
3. Find your project (Telegram-Course-Seller or similar)
4. Click on your **backend service**

---

### **Step 2: Add a Volume** ⏱️ 2 min

1. In your backend service, look for tabs at the top
2. Click the **"Volumes"** tab (or "Data" tab)
3. Click **"+ New Volume"** or **"Add Volume"** button

You'll see a form:

**Volume Configuration:**
- **Mount Path**: `/app/data`
- **Size**: Start with **1 GB** (you can increase later)

4. Click **"Add"** or **"Create Volume"**

---

### **Step 3: Verify Mount Path** ⏱️ 1 min

Make sure the mount path is exactly:
```
/app/data
```

This matches your backend code structure:
```
backend/
  src/
  data/
    uploads/
    thumbnails/
    app.db
```

Railway will mount the volume at `/app/data`, which is where your files are stored.

---

### **Step 4: Redeploy Backend** ⏱️ 3 min

After adding the volume:

1. Railway will automatically redeploy, OR
2. Manually trigger redeploy:
   - Click the **⋯** menu at top right
   - Click **"Redeploy"**

3. Wait for deployment to complete (~2-3 minutes)
4. Check deployment status turns to **"Active"** (green)

---

### **Step 5: Verify It Works** ⏱️ 2 min

#### Test 1: Check Backend Health
Open in browser:
```
https://telegram-course-seller-production.up.railway.app/health
```
Should return: `{"ok":true}`

#### Test 2: Upload a New Screenshot
1. Go to your Telegram bot
2. Try to buy a course
3. Upload a payment screenshot
4. Submit the order

#### Test 3: Check Admin Panel
1. Go to: https://nilexis-admin.vercel.app/orders
2. Find the new order
3. Click "View Screenshot"
4. Screenshot should load! ✅

---

## 📊 Understanding the Setup:

### Before Volume:
```
Railway Container (Ephemeral)
├── /app/backend
│   ├── src/
│   └── data/  ← Files stored here
│       ├── uploads/     } Lost on restart! ❌
│       ├── thumbnails/  }
│       └── app.db       }
```
When Railway restarts → All files in `data/` are deleted

### After Volume:
```
Railway Container
├── /app/backend
│   ├── src/
│   └── data/  ← Volume mounted here
│       ├── uploads/     } Persisted! ✅
│       ├── thumbnails/  }
│       └── app.db       }
                ↓
        Railway Volume (Persistent Storage)
        Survives restarts & redeployments
```

---

## 🔍 Troubleshooting:

### Issue: Volume Tab Not Found
**Solution**: Railway might call it "Data" or "Storage" instead. Look for any tab related to persistent storage.

### Issue: Can't Create Volume
**Railway Free Tier Limitations:**
- Free tier may have limited volume support
- You might need to upgrade to Hobby plan ($5/month)
- Check: https://railway.app/pricing

### Issue: Files Still Disappear
**Check:**
1. Volume mount path is exactly `/app/data`
2. Backend code uses `path.join(__dirname, '../../../data/...')` 
3. Volume is attached and showing "Mounted" status

### Issue: Database Reset After Restart
**This means the volume isn't working properly:**
1. Check mount path matches exactly
2. Make sure volume is in "Mounted" state
3. Check Railway logs for volume mount errors

---

## 💰 Cost Information:

**Railway Free Tier:**
- $5 free credits per month
- Volume usage counted against credits
- 1GB volume ≈ $0.25/month

**Railway Hobby Plan ($5/month):**
- $5 monthly credits included
- Unlimited volume storage
- Better support

For a course-selling business, Hobby plan is recommended.

---

## 📈 Volume Size Recommendations:

**1 GB** - Good for starting (100-200 courses with images)
**5 GB** - Small business (500-1000 courses)
**10 GB** - Growing business (1000+ courses)

You can increase size anytime without losing data.

---

## ✅ After Setup Checklist:

- [ ] Volume created with mount path `/app/data`
- [ ] Backend redeployed successfully
- [ ] Health check returns `{"ok":true}`
- [ ] New file uploads work
- [ ] Screenshots accessible in admin panel
- [ ] Database persists after redeploy

---

## 🆘 If You Get Stuck:

1. **Check Railway Logs**:
   - Go to backend service
   - Click "Deployments"
   - Click latest deployment
   - Check "Deploy Logs" for errors

2. **Volume Mount Errors**:
   Look for lines like:
   ```
   ✅ Volume mounted at /app/data
   ```
   or errors like:
   ```
   ❌ Failed to mount volume
   ```

3. **Test File Persistence**:
   - Upload a test file
   - Manually redeploy backend
   - Check if file still exists

---

## 🚀 Next Steps After Volume Setup:

1. ✅ Files now persist
2. ✅ Update admin panel vercel.json (still needs correct URL)
3. ✅ Test complete order workflow
4. ✅ Verify screenshots load in admin panel

---

**Total Time: ~10 minutes**

**Start now by going to Railway dashboard!** 🚂
