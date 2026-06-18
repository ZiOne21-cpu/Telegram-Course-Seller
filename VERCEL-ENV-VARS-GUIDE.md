# 🔧 How to Add Environment Variables in Vercel

## Step-by-Step Guide with Screenshots Reference

### Step 1: Go to Vercel Dashboard
1. Open your browser
2. Go to: **https://vercel.com/dashboard**
3. You'll see a list of your projects

### Step 2: Select Your Admin Project
1. Find your admin project in the list (should be named something like `nilexis-admin`)
2. **Click on the project name** to open it

### Step 3: Open Settings
1. At the top of the page, you'll see several tabs: **Overview**, **Deployments**, **Analytics**, **Settings**, etc.
2. **Click on "Settings"** tab

### Step 4: Navigate to Environment Variables
1. On the left sidebar, you'll see a menu with options like:
   - General
   - Domains
   - **Environment Variables** ← Click this one
   - Git
   - Functions
   - etc.
2. **Click on "Environment Variables"**

### Step 5: Add New Environment Variable
1. You'll see a section that says "Add New"
2. You'll see three input fields:
   
   **Field 1 - Name (Key):**
   ```
   VITE_BACKEND_URL
   ```
   Type this exactly as shown (case-sensitive)

   **Field 2 - Value:**
   ```
   https://vibrant-intuition-production-c1e8.up.railway.app
   ```
   Type or paste this URL

   **Field 3 - Environment (checkboxes):**
   - ☑ Production
   - ☑ Preview  
   - ☑ Development
   
   Check all three boxes

3. **Click the "Save" button** (usually on the right side)

### Step 6: Redeploy Your Admin Panel
1. **Click on "Deployments"** tab at the top
2. You'll see a list of your deployments
3. Find the **most recent deployment** (should be at the top)
4. On the right side of that deployment, click the **three dots "..."** menu
5. From the dropdown, click **"Redeploy"**
6. A confirmation dialog will appear
7. Click **"Redeploy"** again to confirm
8. Wait 1-2 minutes for the deployment to complete

---

## What This Does:

The environment variable tells your admin panel where to find the backend API:
- Without it: Admin tries to connect to `localhost:3001` (your computer)
- With it: Admin connects to `https://vibrant-intuition-production-c1e8.up.railway.app` (Railway server)

---

## After Redeployment:

1. Visit your admin panel URL
2. Try to login or create a course
3. It should now connect to the backend successfully!

---

## Visual Guide:

### Where to Click:

```
Vercel Dashboard
├── [Your Projects List]
│   └── nilexis-admin ← CLICK HERE
│       └── [Project Page Opens]
│           ├── Tabs: Overview | Deployments | Settings ← CLICK "Settings"
│           │   └── [Settings Page Opens]
│           │       └── Left Sidebar:
│           │           ├── General
│           │           ├── Domains
│           │           ├── Environment Variables ← CLICK HERE
│           │           └── ...
│           │               └── [Environment Variables Page]
│           │                   ├── Name: [VITE_BACKEND_URL]
│           │                   ├── Value: [https://vibrant-intuition...]
│           │                   ├── ☑ Production ☑ Preview ☑ Development
│           │                   └── [Save] ← CLICK HERE
│           │
│           └── After saving, go to "Deployments" tab
│               └── Latest deployment → [...] menu → Redeploy
```

---

## Troubleshooting:

### Can't Find Environment Variables?
- Make sure you're in the **Settings** tab
- Look in the **left sidebar** (not the top menu)
- Scroll down if needed

### Save Button Not Working?
- Make sure you filled in both Name and Value
- Make sure at least one environment checkbox is selected

### Still Not Working After Redeploy?
1. Check browser console (F12) for errors
2. Verify the environment variable was saved:
   - Go back to Settings → Environment Variables
   - You should see `VITE_BACKEND_URL` in the list

---

**Once you complete these steps, your admin panel will connect to the Railway backend!** ✅
