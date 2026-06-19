# 🔄 Debug Flowchart - Image Upload Issue

## Start Here 👇

```
                    ┌─────────────────────────┐
                    │   Image Upload Fails    │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Wait 60 seconds from   │
                    │  node.exe termination   │
                    └───────────┬─────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  Check Backend Health   │
                    │  /health endpoint       │
                    └───────────┬─────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌───────────────┐       ┌──────────────┐
            │ {"ok": true}  │       │  Error or    │
            │   ✅ Good     │       │  No Response │
            └───────┬───────┘       └──────┬───────┘
                    │                       │
                    │                       ▼
                    │               ┌──────────────────┐
                    │               │ Check Railway    │
                    │               │ Logs for:        │
                    │               │ • 409 errors     │
                    │               │ • Crash logs     │
                    │               │ • Start message  │
                    │               └──────┬───────────┘
                    │                       │
                    │                       ▼
                    │               ┌──────────────────┐
                    │               │ Still 409 error? │
                    │               │ Wait 30s more    │
                    │               │ and recheck      │
                    │               └──────────────────┘
                    │
                    ▼
            ┌───────────────────┐
            │  Login to Admin   │
            │  Panel            │
            │  ID: 387957921    │
            └─────────┬─────────┘
                      │
                      ▼
            ┌───────────────────┐
            │  Try Upload Image │
            │  (<5MB)           │
            └─────────┬─────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
        ▼                           ▼
┌───────────────┐           ┌──────────────────┐
│ Upload Works! │           │  Upload Fails    │
│   ✅ Success  │           │                  │
└───────────────┘           └────────┬─────────┘
                                     │
                                     ▼
                            ┌─────────────────────┐
                            │  Open Browser F12   │
                            │  → Network Tab      │
                            └─────────┬───────────┘
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │  Find upload-       │
                            │  thumbnail request  │
                            └─────────┬───────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
            ┌───────────┐     ┌──────────┐     ┌──────────┐
            │ Status    │     │ Status   │     │ Status   │
            │ 401/403   │     │ 404      │     │ 500      │
            └─────┬─────┘     └────┬─────┘     └────┬─────┘
                  │                │                │
                  ▼                ▼                ▼
         ┌────────────────┐ ┌──────────────┐ ┌─────────────┐
         │ Check          │ │ Backend not  │ │ Server      │
         │ localStorage   │ │ responding   │ │ error       │
         │ has admin ID   │ │ or route     │ │             │
         │                │ │ missing      │ │ Check       │
         │ Re-login if    │ │              │ │ Railway     │
         │ needed         │ │ Check Railway│ │ logs for    │
         └────────────────┘ │ deployment   │ │ error       │
                            │ status       │ │ details     │
                            └──────────────┘ └─────────────┘
```

---

## Decision Tree

### 1. Is backend health check working?
- **YES** → Proceed to step 2
- **NO** → Check Railway logs, wait for bot conflict to clear

### 2. Can you login to admin panel?
- **YES** → Proceed to step 3
- **NO** → Check if Vercel admin is deployed correctly

### 3. Does localStorage have your admin ID?
- **YES** → Proceed to step 4
- **NO** → Re-login with Telegram ID 387957921

### 4. What status code does upload return?
- **200** → Success! Upload is working
- **401/403** → Authentication issue (check admin ID)
- **404** → Endpoint not found (check Railway deployment)
- **500** → Server error (check Railway logs)
- **CORS** → Backend CORS issue (should be fixed)

### 5. Are there errors in Railway logs?
- **409 Conflict** → Wait more time, ensure no local node.exe
- **File system error** → Check volume mount at /data
- **Other errors** → Share error message for diagnosis

---

## Quick Diagnosis Guide

| Symptom | Most Likely Cause | Quick Fix |
|---------|-------------------|-----------|
| 409 in Railway logs | Multiple bot instances | Kill node.exe, wait 60s |
| 401 Unauthorized | Admin ID not sent | Check localStorage, re-login |
| 404 Not Found | Backend not running | Check Railway deployment |
| 500 Server Error | Backend crash/bug | Check Railway logs |
| No response | Backend offline | Check Railway status |
| CORS error | Origin not allowed | Verify CORS in backend |

---

## Debugging Checklist

### Before Testing Upload
- [ ] All local node.exe processes killed
- [ ] Waited 60 seconds since killing processes
- [ ] Railway backend health check returns `{"ok":true}`
- [ ] Railway logs show "✅ Telegram bot started"
- [ ] No 409 errors in Railway logs

### When Testing Upload
- [ ] Logged into admin panel with ID 387957921
- [ ] Browser F12 DevTools open (Network tab)
- [ ] Image file size < 5MB
- [ ] Console shows no errors before upload attempt

### If Upload Fails
- [ ] Note the status code (401, 404, 500, etc.)
- [ ] Check request headers include `x-admin-id`
- [ ] Check response body for error message
- [ ] Check Railway logs at time of upload attempt
- [ ] Take screenshots of error details

---

## Information to Collect

If upload still fails after following all steps, collect:

### 1. Browser Information
- Screenshot of Network tab showing failed request
- Screenshot of Console tab showing any errors
- Value of `localStorage.getItem('admin_telegram_id')`

### 2. Railway Information
- Screenshot of deployment logs (last 50 lines)
- Current deployment status (active/crashed)
- Environment variables (BOT_TOKEN present?)

### 3. Request Details
- Status code
- Request headers (especially `x-admin-id`)
- Response body
- Request URL

---

## Success Path

```
✅ Local node.exe killed
    ↓
✅ Wait 60 seconds
    ↓
✅ Backend health check: {"ok":true}
    ↓
✅ Railway logs: "✅ Telegram bot started"
    ↓
✅ Login to admin panel: 387957921
    ↓
✅ localStorage has admin_telegram_id
    ↓
✅ Upload image (<5MB)
    ↓
✅ Request sent with x-admin-id header
    ↓
✅ Status 200, returns thumbnail URL
    ↓
✅ Image preview appears
    ↓
✅ Fill course details
    ↓
✅ Save course
    ↓
🎉 SUCCESS!
```

---

**Use this flowchart to systematically debug any upload issues**
