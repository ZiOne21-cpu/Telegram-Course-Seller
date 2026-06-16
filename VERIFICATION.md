# Deployment Verification Checklist

After deploying, verify everything works correctly.

---

## ✅ Backend Verification

### 1. Health Check
```bash
curl https://your-backend.railway.app/health
```
**Expected:** `{"ok":true}`

### 2. Courses API
```bash
curl https://your-backend.railway.app/api/courses
```
**Expected:** `[]` (empty array, or list of courses if you added some)

### 3. Bot is Running
**Check Railway logs for:**
```
✅ Telegram bot started
🚀 Server running on http://localhost:3001
```

### 4. Database Volume
**Railway Dashboard:**
- Settings → Volumes → Should show 1 volume mounted at `/app/data`

### 5. Environment Variables
**Verify all are set:**
- [ ] `BOT_TOKEN`
- [ ] `TELEGRAM_ADMIN_IDS`
- [ ] `FRONTEND_URL`
- [ ] `ADMIN_URL`
- [ ] `APP_URL`
- [ ] `PORT`
- [ ] `NODE_ENV`

---

## ✅ Frontend Verification

### 1. Home Page Loads
Open: `https://your-frontend.vercel.app`
**Expected:** Course list page (empty or with courses)

### 2. API Connection
**Browser Console (F12):**
- No CORS errors
- No network errors
- Should see API requests to Railway backend

### 3. Telegram Mini App
**Open bot in Telegram → Click Menu Button**
**Expected:**
- Mini App opens
- Shows course list
- Bottom navigation works

### 4. Admin Features (if you're admin)
**Expected:**
- Admin tab visible in bottom nav
- Clicking shows admin panel

---

## ✅ Admin Panel Verification

### 1. Admin Page Loads
Open: `https://your-admin.vercel.app`
**Expected:** Login page or dashboard (if using Telegram auth)

### 2. Payment Setup
**Go to Payment Setup tab:**
- [ ] Can enter CBE account details
- [ ] Can enter Telebirr account details
- [ ] Save button works
- [ ] Details persist after refresh

### 3. Course Management
**Go to Courses tab:**
- [ ] Can see "Add Course" button
- [ ] Can upload thumbnail (max 5MB image)
- [ ] Can enter title, description, price
- [ ] Can select channel from list
- [ ] Course appears in list after creation
- [ ] Can delete course

### 4. Orders Page
**Go to Orders tab:**
- [ ] Shows empty state (no orders yet)
- [ ] Filter buttons work (All/Pending/Approved/Rejected)

### 5. Dashboard Stats
**Go to Dashboard:**
- [ ] Shows 0 total orders, 0 pending, 0 revenue
- [ ] No errors in console

---

## ✅ End-to-End Buyer Flow

### 1. Browse Courses
**In Telegram Mini App:**
- [ ] Can see course cards
- [ ] Thumbnails load correctly
- [ ] Price is displayed in Birr

### 2. Checkout
**Click "Buy Now" on a course:**
- [ ] Shows payment details (CBE + Telebirr)
- [ ] Shows payment instructions
- [ ] Can fill in name and phone
- [ ] Can upload screenshot (max 5MB)
- [ ] Submit button works

### 3. Admin Approval
**In Admin Panel (Orders page):**
- [ ] New order appears with "Pending" status
- [ ] Can view buyer details
- [ ] Can view uploaded screenshot
- [ ] Can click "Approve"

### 4. Buyer Receives Invite
**After admin approval:**
- [ ] Order status changes to "Approved" in admin panel
- [ ] Buyer receives bot message with invite link
- [ ] Invite link also shows in Mini App (My Orders page)
- [ ] Link works and joins user to channel

### 5. My Orders Page
**In Telegram Mini App:**
- [ ] Can see "My Orders" in bottom nav
- [ ] Shows list of user's orders
- [ ] Shows order status (Pending/Approved/Rejected)
- [ ] Approved orders show invite link

---

## ✅ Bot Verification

### 1. Bot Responds to Messages
Send `/start` to your bot
**Expected:** Welcome message with instructions

### 2. Bot Sends Notifications
**After approving an order:**
- [ ] Bot sends message to buyer
- [ ] Message contains invite link
- [ ] Message is formatted correctly

### 3. Bot Has Admin Permissions
**In each private channel:**
- [ ] Bot is added as admin
- [ ] Bot has "Invite Users via Link" permission
- [ ] Bot can generate invite links

---

## ✅ Security Verification

### 1. CORS Protection
Try accessing backend from unauthorized origin:
```bash
curl -H "Origin: https://evil.com" \
     https://your-backend.railway.app/api/courses
```
**Expected:** CORS error or blocked

### 2. Admin Endpoints Protected
Try creating a course without auth:
```bash
curl -X POST https://your-backend.railway.app/api/courses \
     -H "Content-Type: application/json" \
     -d '{"title":"Hack"}'
```
**Expected:** 401 Unauthorized

### 3. File Upload Restrictions
Try uploading a 10MB file or non-image file
**Expected:** Error "File too large" or "Only images allowed"

### 4. Environment Variables Not Exposed
**Check frontend source code (view-source):**
- [ ] No `BOT_TOKEN` visible
- [ ] No sensitive data in HTML/JS
- [ ] Only `VITE_*` variables are exposed (this is normal)

---

## ✅ Performance Verification

### 1. Load Times
- [ ] Frontend loads in <3 seconds
- [ ] Admin panel loads in <3 seconds
- [ ] API responses <500ms
- [ ] Image thumbnails load quickly

### 2. Railway Metrics
**Railway Dashboard:**
- [ ] CPU usage <50%
- [ ] Memory usage <256MB
- [ ] No crashes or restarts

### 3. Vercel Analytics (optional)
**Vercel Dashboard:**
- [ ] No 4xx/5xx errors
- [ ] All routes returning 200

---

## ✅ Data Persistence

### 1. Redeploy Backend
**Railway:** Manually trigger a redeploy
**Then verify:**
- [ ] Database still has all courses
- [ ] Orders are not lost
- [ ] Settings are preserved
- [ ] Uploaded files still accessible

### 2. Redeploy Frontend
**Vercel:** Redeploy frontend
**Then verify:**
- [ ] App still works
- [ ] No build errors
- [ ] Environment variables still set

---

## ✅ Mobile Testing

### 1. iOS
- [ ] Mini App opens correctly
- [ ] UI is responsive
- [ ] Touch interactions work
- [ ] File upload works

### 2. Android
- [ ] Mini App opens correctly
- [ ] UI is responsive
- [ ] Touch interactions work
- [ ] File upload works

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| CORS errors | Update `FRONTEND_URL`/`ADMIN_URL` in Railway |
| Database resets | Add volume at `/app/data` in Railway |
| Bot not responding | Check `BOT_TOKEN` and Railway logs |
| 404 on API routes | Update `vercel.json` with Railway URL |
| Admin features hidden | Check `VITE_ADMIN_IDS` matches your ID |
| Images not loading | Check volume is mounted, files exist in `/app/data/` |

---

## 📊 Success Criteria

Your deployment is successful if:
- ✅ All API endpoints return expected responses
- ✅ Mini App loads in Telegram without errors
- ✅ Admin panel is accessible and functional
- ✅ Can complete full buyer flow (browse → buy → approve)
- ✅ Bot sends notifications after approval
- ✅ Database persists after redeploys
- ✅ No CORS or security errors
- ✅ All uploaded files are accessible
- ✅ Payment details can be configured

---

## 🎉 You're Live!

Once all checks pass, your Telegram Course Seller is ready for customers!

**Next Steps:**
1. Add all your courses
2. Configure payment details
3. Share your bot with potential buyers
4. Monitor orders in Admin Panel
5. Set up backup strategy (download database periodically)

**Monitoring:**
- Check Railway logs daily for errors
- Monitor order volume in Admin Dashboard
- Keep an eye on Railway credit usage

**Maintenance:**
- Update code via Git push (auto-deploys)
- Backup database weekly
- Review security logs monthly

---

**Need help?** Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
