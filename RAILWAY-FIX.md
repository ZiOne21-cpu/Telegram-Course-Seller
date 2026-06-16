# Railway Deployment Fix ✅

## Issues Fixed

1. ✅ **Removed `postinstall` script** from `backend/package.json`
2. ✅ **Renamed `.railway.toml` to `railway.toml`** (removed leading dot)
3. ✅ **Deleted `Dockerfile`** (Railway will use Nixpacks instead)

---

## Issue 1: postinstall Script

### Problem
The `postinstall` script ran `npm run build` (which runs `tsc`) during `npm install`. However, in Railway's build process:
1. It copies `package.json` and runs `npm ci` first
2. **Then** it copies the source code (`src/` and `tsconfig.json`)
3. So when `postinstall` tried to run `tsc`, the source files weren't there yet

### Fix Applied ✅
Removed the `postinstall` script from `backend/package.json`

---

## Issue 2: Hidden Config File

### Problem
Railway couldn't detect `.railway.toml` (with leading dot) so it fell back to using the Dockerfile instead of Nixpacks.

### Fix Applied ✅
Renamed `.railway.toml` → `railway.toml` (no dot)

---

## Issue 3: Dockerfile Conflict

### Problem
When Railway found the Dockerfile, it used that instead of Nixpacks with the railway.toml config.

### Fix Applied ✅
Deleted `backend/Dockerfile` - Railway will now use Nixpacks which is better optimized

---

## Files Changed

**Modified:**
- ✅ `backend/package.json` (removed postinstall)
- ✅ `backend/.railway.toml` → `backend/railway.toml` (renamed)

**Deleted:**
- ✅ `backend/Dockerfile` (no longer needed)

---

## Deploy Now! 🚀

### 1. Commit All Fixes

```bash
cd "z:\MY FILES\AI House\Telegram Course Seller"

git add backend/package.json
git add backend/railway.toml
git add backend/Dockerfile
git commit -m "Fix Railway deployment: remove postinstall, rename config, delete Dockerfile"
git push origin main
```

### 2. Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. If you already created a project:
   - Go to **Deployments** → Click **Redeploy**
   - Or delete the old project and create new one
3. **New Project** → **Deploy from GitHub repo**
4. Select your repository
5. **Settings** → **Root Directory** → Set to `backend`
6. Add environment variables:

```env
BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_IDS=your_telegram_user_id
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://TEMP
ADMIN_URL=https://TEMP
APP_URL=https://TEMP
```

7. **Settings** → **Volumes** → **New Volume**
   - Mount Path: `/app/data`
8. Deploy should succeed now! ✅

---

## What Railway Will Do Now

With `railway.toml` (Nixpacks):

1. ✅ Detect Node.js project
2. ✅ Install dependencies with `npm ci`
3. ✅ Copy all source files
4. ✅ Run `npm run build` (from railway.toml)
5. ✅ Run `npm start` (starts the server)
6. ✅ Mount volume at `/app/data`

---

## Expected Build Logs

You should see:
```
✓ Installing dependencies...
✓ Copying source files...
✓ Building TypeScript...
✓ Starting server...
✅ Server running on port 3001
✅ Telegram bot started
```

---

## Verification

After deployment:
```bash
curl https://your-app.up.railway.app/health
```

Should return:
```json
{"ok":true}
```

---

## Railway.toml Config

Your final `backend/railway.toml` file:

```toml
[build]
builder = "NIXPACKS"

[deploy]
startCommand = "npm run build && npm start"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[volumes]]
mountPath = "/app/data"
```

---

**Status:** All Issues Fixed ✅  
**Next:** Push to GitHub and redeploy on Railway  
**Docs:** See DEPLOYMENT.md for complete deployment guide
