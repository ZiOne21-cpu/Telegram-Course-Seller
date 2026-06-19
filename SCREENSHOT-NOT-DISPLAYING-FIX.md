# 🔧 Screenshot Not Displaying - Complete Fix Guide

## 🎯 Possible Issues and Solutions:

---

## **Issue 1: Admin Panel - Screenshot Link Returns 404**

### Symptoms:
- Click "View Screenshot" in Orders page
- Get "404 Not Found" error
- Or page shows "Cannot GET /uploads/..."

### Root Cause:
The screenshot file doesn't exist on Railway, or the URL is wrong.

### Solution A: Check if File Exists on Railway

Test the direct Railway URL in your browser:
```
https://telegram-course-seller-production.up.railway.app/uploads/[FILENAME]
```

Replace `[FILENAME]` with the actual filename from the order (e.g., `1781801100946-photo_2026-06-13_04-17-16.jpg`)

**If it works:** Admin panel just needs updated links
**If it fails:** File not uploaded correctly or lost before volume setup

---

### Solution B: Update Admin Panel to Use Direct Railway URLs

**Already done!** The admin OrdersPage.tsx now uses direct Railway links.

Make sure you deployed the latest version:

1. Go to: https://vercel.com/dashboard
2. Find your admin panel project
3. Check deployment date
4. If it's old, redeploy:
   - Deployments → Latest → ⋯ → Redeploy

---

## **Issue 2: Old Screenshots Lost (Before Volume Setup)**

### Symptoms:
- New uploads work
- Old uploads show 404

### Root Cause:
Railway containers have ephemeral storage. Files uploaded BEFORE adding the volume were lost when Railway restarted.

### Solution:
**Old files are permanently lost.** Only new uploads (after volume setup) will persist.

**For old orders:**
1. Mark them as "processed" or "archived"
2. Ask customers to resubmit if needed
3. Going forward, all new uploads will persist ✅

---

## **Issue 3: Admin Panel Shows Broken Image Icon**

### Symptoms:
- Screenshot link exists
- But image doesn't load (broken image icon)
- No 404 error, just blank/broken

### Root Cause:
- File might be corrupted
- CORS issue preventing image load
- Wrong file path in database

### Solution:

#### Check 1: Verify Database Path
The database stores relative paths like:
```
1781801100946-photo_2026-06-13_04-17-16.jpg
```

NOT full paths like:
```
/app/data/uploads/1781801100946-photo_2026-06-13_04-17-16.jpg
```

Check your orders table:
1. Go to Railway dashboard
2. Open a terminal or use SQLite viewer
3. Check: `SELECT screenshot_path FROM orders;`
4. Paths should be just the filename

#### Check 2: CORS Headers
Railway backend must serve images with proper CORS headers.

Your backend already has this in `index.ts`:
```typescript
app.use('/uploads', express.static(path.join(__dirname, '../../data/uploads')));
```

Test CORS:
```bash
curl -I https://telegram-course-seller-production.up.railway.app/uploads/test.jpg
```

Should include:
```
Access-Control-Allow-Origin: *
```

---

## **Issue 4: Screenshot Upload Failing**

### Symptoms:
- Customer tries to upload screenshot
- Upload fails or doesn't save
- Order created but no screenshot

### Root Cause:
- Form data not sent correctly
- Backend multer middleware issue
- File too large (>5MB limit)

### Solution:

#### Check Frontend Upload Code
The frontend should send FormData with screenshot:

```typescript
const formData = new FormData();
formData.append('screenshot', fileInput.files[0]);
formData.append('full_name', name);
formData.append('phone', phone);
// ... other fields

await api.post('/orders', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
```

#### Check Backend Orders Route
The backend should use multer for file upload:

```typescript
router.post('/', telegramAuth, upload.single('screenshot'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'Screenshot required' });
  }
  // Save order with file.filename
});
```

#### Check File Size Limit
Default limit is 5MB. If customers upload larger files, increase:

```typescript
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});
```

---

## **Issue 5: Screenshot Shows in Database But 404 on Access**

### Symptoms:
- Order has `screenshot_path` in database
- But accessing the URL gives 404

### Root Cause:
- File physically doesn't exist on disk
- Volume not mounted correctly
- File was uploaded before volume setup

### Solution:

#### Verify Railway Volume is Mounted

1. Go to Railway dashboard
2. Click backend service
3. Go to **Volumes** tab
4. Should show:
   - Mount path: `/app/data`
   - Status: **Mounted** (green)
   - Size: 1GB (or whatever you set)

#### Check Railway Logs
Look for volume mount confirmation:
```
✅ Volume mounted at /app/data
```

If not found, the volume isn't working.

#### Test File Upload After Volume
1. Upload a NEW screenshot (after volume setup)
2. Check if it persists after Railway restart
3. If yes, volume is working
4. Old files before volume are lost forever

---

## **Issue 6: Admin Panel Not Updated**

### Symptoms:
- You made changes to code
- But admin panel still shows old behavior

### Root Cause:
Admin panel on Vercel hasn't been redeployed with new changes.

### Solution:

#### Deploy Latest Admin Code

**Method 1: Quick Redeploy**
1. Go to: https://vercel.com/dashboard
2. Find admin panel project
3. Deployments → Latest → ⋯ → Redeploy

**Method 2: Upload New Files**
1. Go to: https://vercel.com/new
2. Upload admin folder: `z:\MY FILES\AI House\Telegram Course Seller\admin`
3. Deploy

**Method 3: Git Push (if connected)**
```bash
cd "z:\MY FILES\AI House\Telegram Course Seller\admin"
git add .
git commit -m "Fix screenshot display"
git push
```
Vercel will auto-deploy.

---

## **Issue 7: Thumbnail Images Work But Screenshots Don't**

### Symptoms:
- Course thumbnails load fine
- But order screenshots show 404

### Root Cause:
Different storage paths or permissions.

### Solution:

Check both paths are configured:
```typescript
// Backend index.ts
app.use('/uploads', express.static(path.join(__dirname, '../../data/uploads')));
app.use('/thumbnails', express.static(path.join(__dirname, '../../data/thumbnails')));
```

Check both folders exist:
```typescript
const uploadsDir = path.join(__dirname, '../../data/uploads');
const thumbsDir = path.join(__dirname, '../../data/thumbnails');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(thumbsDir)) fs.mkdirSync(thumbsDir, { recursive: true });
```

---

## **Issue 8: Screenshots Display on Desktop But Not Mobile**

### Symptoms:
- Works on desktop browser
- Fails on mobile/Telegram WebApp

### Root Cause:
- HTTPS mixed content issue
- Image too large for mobile
- CORS policy on mobile

### Solution:

#### Ensure HTTPS Everywhere
Both frontend and backend must use HTTPS:
- ✅ Frontend: `https://nilexis-frontend.vercel.app`
- ✅ Admin: `https://nilexis-admin.vercel.app`
- ✅ Backend: `https://telegram-course-seller-production.up.railway.app`

#### Optimize Image Size
Large images may fail on mobile. Add image compression:

```typescript
const sharp = require('sharp');

// In upload handler
await sharp(file.path)
  .resize(1200, 1200, { fit: 'inside' })
  .jpeg({ quality: 80 })
  .toFile(file.path + '.optimized');
```

---

## 🔍 **Diagnostic Checklist:**

Run through this checklist:

- [ ] Railway volume is mounted at `/app/data`
- [ ] Railway backend returns `{"ok":true}` at `/health`
- [ ] Direct Railway URL works: `https://telegram-course-seller-production.up.railway.app/uploads/[filename]`
- [ ] Admin panel is latest deployment (not old cached version)
- [ ] Database `screenshot_path` contains just filename (not full path)
- [ ] Backend serves `/uploads` folder via express.static
- [ ] CORS headers are present: `Access-Control-Allow-Origin: *`
- [ ] File size is under 5MB limit
- [ ] File was uploaded AFTER volume setup (not before)

---

## 🆘 **Still Not Working? Do This:**

### Step 1: Test Direct Railway URL
```
https://telegram-course-seller-production.up.railway.app/uploads/[ACTUAL_FILENAME]
```

**If it works** → Issue is with admin panel, redeploy it
**If it fails** → Issue is with backend/volume/file upload

### Step 2: Check Railway Logs
1. Go to Railway dashboard
2. Backend service → Deployments → Latest
3. View logs
4. Look for errors during upload
5. Share any error messages

### Step 3: Check Database
View the orders table to see what's stored:
```sql
SELECT id, screenshot_path, created_at FROM orders ORDER BY created_at DESC LIMIT 5;
```

Should see paths like:
```
1781801100946-photo_2026-06-13_04-17-16.jpg
```

### Step 4: Test New Upload
1. Create a test order via Telegram
2. Upload a screenshot
3. Check Railway logs for upload confirmation
4. Immediately test the URL
5. Restart Railway and test again (to verify volume persistence)

---

## ✅ **Quick Fix (Right Now):**

If you need screenshots working IMMEDIATELY:

**Use Direct Railway URLs:**

When viewing an order in admin panel, manually construct the URL:
```
https://telegram-course-seller-production.up.railway.app/uploads/[FILENAME_FROM_DATABASE]
```

This bypasses any proxy or admin panel issues.

---

**Tell me which issue matches your situation and I'll help you fix it!** 🔧
