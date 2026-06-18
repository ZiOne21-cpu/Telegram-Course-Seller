# 🔧 Vercel Dashboard Build Settings (OVERRIDE METHOD)

Since the permission issue persists in every configuration, we need to override the build settings directly in the Vercel dashboard.

## ⚠️ The Problem
Vercel's build environment has restricted execute permissions on node_modules binaries, causing exit code 126 errors.

## ✅ The Solution
Configure build settings directly in Vercel dashboard to use a different approach.

---

## Step-by-Step Instructions:

### 1. Go to Your Vercel Project Settings
1. Go to: https://vercel.com/dashboard
2. Click on your frontend project (e.g., `nilexis-et-frontend`)
3. Click **"Settings"** tab at the top
4. Click **"General"** in the left sidebar

### 2. Override Build & Output Settings
Scroll down to **"Build & Development Settings"**

Click **"Override"** toggle to enable custom settings

Configure as follows:

#### Framework Preset:
- Select: **Other**

#### Build Command:
```
node node_modules/vite/bin/vite.js build
```

#### Output Directory:
```
dist
```

#### Install Command:
```
npm install
```

### 3. Save and Redeploy
1. Click **"Save"** at the bottom
2. Go to **"Deployments"** tab
3. Click the "..." menu on the latest deployment
4. Click **"Redeploy"**

---

## Why This Works:
- `node node_modules/vite/bin/vite.js build` runs vite via Node.js directly
- Bypasses the permission-restricted binary in `.bin/`
- Uses the JavaScript source file which has read permissions
- No shell execution needed

---

## Alternative: If Above Still Fails

Try this build command instead:

```
node --require ./node_modules/vite/dist/node/cli.js build
```

Or this simpler approach:

```
node -e "require('vite').build()"
```

---

## For Admin Panel:
Use the exact same settings when deploying the admin panel, just change the root directory to `admin`.

---

**This should finally resolve the permission issue!** 🎯
