# Security Best Practices

## Environment Variables

**NEVER commit `.env` files to Git!** They contain sensitive credentials.

### What's Sensitive
- `BOT_TOKEN` - Anyone with this can control your bot
- `TELEGRAM_ADMIN_IDS` - Controls who has admin access
- Database file - Contains all orders and payment info

### Protection
- All `.env` files are in `.gitignore`
- Set environment variables directly in Railway/Vercel dashboards
- Use `.env.example` files as templates (with fake values)

---

## CORS (Cross-Origin Resource Sharing)

The backend only accepts requests from:
- `FRONTEND_URL` - Your Mini App
- `ADMIN_URL` - Your Admin Panel
- `localhost:5173` and `localhost:5174` (development only)

This prevents unauthorized websites from accessing your API.

---

## Admin Authentication

Two-layer verification:
1. **Telegram WebApp Signature** - Verifies request came from Telegram
2. **Admin ID Check** - Verifies user is in `TELEGRAM_ADMIN_IDS`

Both checks happen in `backend/src/middleware.ts`.

---

## File Upload Security

### Restrictions
- **Max size**: 5MB per file
- **Allowed types**: Only images (JPEG, PNG, GIF, WebP)
- **Storage**: Files saved with random names (prevents overwriting)

### Validation
```typescript
// In backend/src/routes/orders.ts and courses.ts
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});
```

---

## Database Security

### SQLite Best Practices
- Database stored outside web root (`/data/app.db`)
- No direct SQL exposure in API (all queries parameterized)
- Railway volume mounted with restricted permissions

### Backup Recommendations
Periodically download your database:
```bash
# SSH into Railway (if available) or use Railway CLI
railway run bash
tar -czf backup.tar.gz /app/data/app.db
# Download via Railway dashboard
```

---

## Telegram Bot Security

### Webhook vs Polling
This app uses **polling** (default). For production, consider webhooks:
- More reliable
- Lower latency
- Requires HTTPS endpoint

To enable webhooks (optional):
```typescript
// In backend/src/bot.ts
bot.setWebHook(`${process.env.APP_URL}/webhook/${BOT_TOKEN}`);
```

### Invite Links
- **One-time use** (`member_limit=1`)
- **7-day expiry** (`expire_date`)
- Generated only after payment approval

---

## Production Hardening

### 1. Enable HTTPS Everywhere
- Railway: HTTPS by default ✅
- Vercel: HTTPS by default ✅

### 2. Add Rate Limiting (Optional)
Install `express-rate-limit`:
```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // max 100 requests per IP
});

app.use('/api/', limiter);
```

### 3. Add Request Logging (Optional)
Install `morgan`:
```typescript
import morgan from 'morgan';
app.use(morgan('combined'));
```

### 4. Monitor Error Logs
- Railway: Check **Deployments** → **Logs**
- Set up alerts for repeated errors

---

## Incident Response

### If BOT_TOKEN is compromised:
1. Revoke token in @BotFather
2. Generate new token
3. Update `BOT_TOKEN` in Railway
4. Redeploy immediately

### If Database is Lost:
- You'll lose all orders and courses
- Always keep Railway volume mounted at `/app/data`
- Consider periodic backups (manual download via Railway CLI)

### If Admin Account is Compromised:
1. Remove compromised ID from `TELEGRAM_ADMIN_IDS`
2. Update env var in Railway
3. Check order history for suspicious approvals

---

## Compliance (Ethiopia)

### Data Protection
- Customer data (name, phone, screenshot) stored locally in SQLite
- No third-party analytics by default
- Consider adding a privacy policy page

### Payment Processing
- **Manual verification** - You approve each payment screenshot
- **CBE/Telebirr** - Compliant with Ethiopian banking regulations
- Keep records of all transactions (orders table)

---

## Security Checklist

- [ ] `.env` files not committed to Git
- [ ] `TELEGRAM_ADMIN_IDS` contains only trusted user IDs
- [ ] `BOT_TOKEN` is valid and secret
- [ ] CORS configured with correct frontend/admin URLs
- [ ] File uploads restricted to 5MB images
- [ ] Railway volume mounted for database persistence
- [ ] HTTPS enabled on all deployed URLs
- [ ] Regular database backups scheduled
- [ ] Error logs monitored for suspicious activity

---

## Reporting Vulnerabilities

If you find a security issue, please report it privately rather than creating a public issue.
