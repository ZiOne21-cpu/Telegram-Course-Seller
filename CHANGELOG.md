# Changelog

All notable changes to this project will be documented in this file.

---

## [1.0.0] - 2026-06-16

### 🎉 Initial Release - Production Ready

### Added
- Complete Telegram Mini App for course selling
- Backend API with Express + TypeScript + SQLite
- Telegram bot integration for auto-invite links
- Frontend Mini App UI (React + Vite + Tailwind)
- Separate Admin dashboard
- Payment verification via screenshot upload
- CBE and Telebirr payment account configuration
- Order approval/rejection workflow
- Dashboard with statistics
- One-time invite link generation
- Course management (CRUD)
- File upload handling (thumbnails + screenshots)
- Telegram WebApp authentication
- Admin authorization middleware
- CORS protection

### Documentation
- Complete deployment guide (DEPLOYMENT.md)
- Quick deployment guide (QUICK-DEPLOY.md)
- Pre-deployment checklist (PRE-DEPLOYMENT-CHECKLIST.md)
- Post-deployment verification (VERIFICATION.md)
- Troubleshooting guide (TROUBLESHOOTING.md)
- Security best practices (SECURITY.md)
- File structure overview (FILES-OVERVIEW.md)
- Start here guide (START-HERE.md)
- Backend API documentation (backend/README.md)
- Main README with local setup instructions

### Configuration
- Railway deployment configuration (.railway.toml)
- Vercel deployment configuration (vercel.json)
- Docker support (Dockerfile, .dockerignore)
- Heroku/Railway Procfile
- Environment variable templates (.env.example files)
- Git ignore rules (.gitignore)
- TypeScript configuration (tsconfig.json)
- Tailwind CSS configuration
- Vite build configuration

### Security Features
- Telegram WebApp HMAC signature verification
- Admin ID verification for protected endpoints
- CORS configuration with whitelist
- File upload restrictions (5MB max, images only)
- One-time invite links with expiration
- Environment variable protection (.gitignore)

### Database Schema
- courses table (id, title, description, price, thumbnail_url, channel_id, active, created_at)
- orders table (id, course_id, telegram_id, telegram_username, full_name, phone, screenshot_path, status, reject_note, invite_link, created_at, updated_at)
- settings table (key-value store for payment accounts)

### API Endpoints
- GET /health - Health check
- GET /api/courses - List active courses
- POST /api/courses - Create course (admin)
- DELETE /api/courses/:id - Delete course (admin)
- GET /api/orders - List orders (admin) or user orders (buyer)
- POST /api/orders - Create order
- PATCH /api/orders/:id - Approve/reject order (admin)
- GET /api/settings - Get payment settings (admin)
- POST /api/settings - Update payment settings (admin)
- GET /api/stats - Get dashboard stats (admin)

### UI Features
- Responsive design (mobile-first)
- Bottom navigation (Mini App)
- Sidebar navigation (Admin)
- Course cards with thumbnails
- Payment details display
- Screenshot upload preview
- Order status badges
- Filter buttons (orders page)
- Dashboard statistics cards
- Payment setup form
- Course creation form with thumbnail upload

---

## Deployment Targets

### Supported Platforms
- **Backend:** Railway (recommended), Render, Heroku, Docker, VPS
- **Frontend:** Vercel (recommended), Netlify, Cloudflare Pages
- **Admin:** Vercel (recommended), Netlify, Cloudflare Pages
- **Database:** SQLite (with persistent volume)

### System Requirements
- Node.js 18+
- npm 8+
- Telegram Bot API access
- HTTPS endpoint for production

---

## Known Limitations

- SQLite not ideal for high concurrency (consider PostgreSQL for large scale)
- File uploads stored locally (consider S3/Cloudinary for large scale)
- No automated backups (manual via Railway CLI)
- Telegram bot uses polling (consider webhooks for production)
- Payment verification is manual (screenshot review)
- No email notifications (Telegram only)
- Single currency (Ethiopian Birr)
- No refund handling
- No analytics/reporting beyond basic stats

---

## Future Enhancements (Not Implemented)

- [ ] PostgreSQL/MySQL support
- [ ] Automated database backups
- [ ] Webhook mode for bot
- [ ] S3/Cloudinary integration for files
- [ ] Email notifications
- [ ] Multi-currency support
- [ ] Automated payment verification (API integration)
- [ ] Refund handling
- [ ] Advanced analytics
- [ ] Bulk operations (approve multiple orders)
- [ ] Export orders to CSV
- [ ] Discount codes/coupons
- [ ] Subscription-based access
- [ ] Multiple payment methods
- [ ] Payment gateway integration (Stripe, etc.)
- [ ] Course categories/tags
- [ ] Search functionality
- [ ] User reviews/ratings
- [ ] Waiting list for sold-out courses

---

## Migration Notes

### From Local to Production
1. Push code to GitHub
2. Deploy backend to Railway with volume at `/app/data`
3. Deploy frontend/admin to Vercel
4. Update environment variables
5. Configure BotFather Menu Button

### From Development to Production Database
- Local database: `./data/app.db`
- Production database: `/app/data/app.db` (Railway volume)
- No migration needed (SQLite is portable)
- To migrate existing data: Download local DB and upload to Railway volume

---

## Breaking Changes

None (initial release)

---

## Contributors

- Initial release by AI House Team

---

## License

MIT License - See LICENSE file for details
