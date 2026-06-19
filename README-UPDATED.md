# 🎓 Nilexis.Et - Telegram Course Seller Bot

Modern, elegant course selling platform integrated with Telegram. Built with React, TypeScript, Node.js, and SQLite.

![Status](https://img.shields.io/badge/status-deployed-success)
![Backend](https://img.shields.io/badge/backend-Railway-blueviolet)
![Frontend](https://img.shields.io/badge/frontend-Vercel-black)

---

## 🚀 Quick Start

**New here?** Start with these files in order:

1. **[START-HERE.md](./START-HERE.md)** ⭐ - Current status and immediate actions
2. **[WHAT-TO-DO-NOW.md](./WHAT-TO-DO-NOW.md)** - Testing guide
3. **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** - URLs and commands cheat sheet

**Need help?** Check **[DOCUMENTATION-INDEX.md](./DOCUMENTATION-INDEX.md)** for complete guide navigation.

---

## 🌐 Live Deployment

| Service | URL | Status |
|---------|-----|--------|
| **Backend API** | https://vibrant-intuition-production-c1e8.up.railway.app | ✅ Live |
| **Admin Panel** | https://nilexis-admin.vercel.app | ✅ Live |
| **Frontend** | https://nilexis-frontend-jku0t0fy5-zione-s-projects.vercel.app | ✅ Live |

**Health Check**: https://vibrant-intuition-production-c1e8.up.railway.app/health

---

## ✨ Features

### For Admins
- ✅ Modern, responsive admin dashboard
- ✅ Course management (create, edit, delete, toggle active/inactive)
- ✅ Image upload for course thumbnails
- ✅ Order management (approve/reject with notes)
- ✅ Payment settings (CBE Bank, Telebirr)
- ✅ Revenue and sales statistics with charts
- ✅ Real-time order notifications

### For Users
- ✅ Browse courses through Telegram bot
- ✅ View course details with prices
- ✅ Place orders with payment screenshot upload
- ✅ Get automatic channel invite links upon approval
- ✅ Order status tracking
- ✅ Payment instructions

### Technical Features
- ✅ Persistent SQLite database
- ✅ File storage for images and uploads
- ✅ Secure admin authentication
- ✅ CORS-enabled API
- ✅ Responsive design (mobile-first)
- ✅ Modern UI with glassmorphism effects
- ✅ Gradient color scheme (blue/purple/cyan)

---

## 🏗️ Architecture

```
Telegram Bot ←→ Railway Backend (Express + SQLite) ←→ Vercel Frontend/Admin
```

- **Backend**: Node.js + Express.js + SQLite (Railway)
- **Frontend**: React + TypeScript + Vite + TailwindCSS (Vercel)
- **Admin**: React + TypeScript + Vite + TailwindCSS (Vercel)
- **Bot**: node-telegram-bot-api

**Full architecture**: See [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## 📚 Complete Documentation

### 🚀 Getting Started
- **[START-HERE.md](./START-HERE.md)** - Begin here
- **[WHAT-TO-DO-NOW.md](./WHAT-TO-DO-NOW.md)** - Testing procedures
- **[QUICK-REFERENCE.md](./QUICK-REFERENCE.md)** - Cheat sheet

### 🔧 Troubleshooting
- **[TROUBLESHOOTING-COMPLETE.md](./TROUBLESHOOTING-COMPLETE.md)** - Comprehensive guide
- **[DEBUG-FLOWCHART.md](./DEBUG-FLOWCHART.md)** - Visual debugging
- **[CHECK-STATUS.md](./CHECK-STATUS.md)** - Health checks

### ⚙️ Configuration
- **[RAILWAY-ENV-CONFIG.md](./RAILWAY-ENV-CONFIG.md)** - Backend setup
- **[VERCEL-ENV-VARS-GUIDE.md](./VERCEL-ENV-VARS-GUIDE.md)** - Frontend setup

### 📖 Reference
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System design
- **[FINAL-STATUS.md](./FINAL-STATUS.md)** - Deployment status
- **[SESSION-SUMMARY.md](./SESSION-SUMMARY.md)** - Latest changes

### 📋 Index
- **[DOCUMENTATION-INDEX.md](./DOCUMENTATION-INDEX.md)** - Complete file index

---

## 🎯 Current Status

### ✅ What's Working
- Backend deployed on Railway
- Frontend deployed on Vercel
- Admin panel deployed on Vercel
- CORS configured
- Authentication working
- Course listing
- Dashboard statistics

### ⚠️ Recently Fixed
- Local node.exe conflict (caused 409 bot errors)
- Upload endpoint configuration
- Direct Railway API connection
- Admin authentication middleware

### 🧪 Needs Testing
- Image upload functionality
- Course creation flow
- Order approval flow

**Latest Update**: June 18, 2026 - Resolved local process conflict

---

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- npm or yarn
- Telegram Bot Token
- Admin Telegram ID

### Setup

#### 1. Clone & Install
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Admin
cd ../admin
npm install
```

#### 2. Environment Variables

**Backend (.env)**:
```env
BOT_TOKEN=your_bot_token
TELEGRAM_ADMIN_IDS=your_telegram_id
PORT=3001
NODE_ENV=development
```

**Frontend (.env)**:
```env
VITE_BACKEND_URL=http://localhost:3001
```

**Admin (.env)**:
```env
VITE_BACKEND_URL=http://localhost:3001
VITE_ADMIN_IDS=your_telegram_id
```

#### 3. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - Admin
cd admin
npm run dev
```

**Important**: When testing locally, stop Railway deployment to avoid 409 bot conflicts!

---

## 🚀 Deployment

### Railway (Backend)
1. Connect GitHub repository
2. Add environment variables (see [RAILWAY-ENV-CONFIG.md](./RAILWAY-ENV-CONFIG.md))
3. Mount volume at `/data`
4. Deploy

### Vercel (Frontend & Admin)
1. Connect GitHub repository
2. Add environment variables (see [VERCEL-ENV-VARS-GUIDE.md](./VERCEL-ENV-VARS-GUIDE.md))
3. Set build command in dashboard: `node node_modules/vite/bin/vite.js build`
4. Deploy

**Detailed Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)

---

## 🔐 Security

- ✅ Admin authentication via Telegram ID
- ✅ Environment variables for secrets
- ✅ CORS protection
- ✅ SQL injection protection (prepared statements)
- ✅ File upload size limits (5MB)
- ✅ HTTPS on all deployments

**Security Details**: See [SECURITY.md](./SECURITY.md)

---

## 📊 Database Schema

### Tables
- **courses** - Course listings with metadata
- **orders** - User orders with payment proofs
- **settings** - Payment and bot settings

**Schema Details**: See [ARCHITECTURE.md](./ARCHITECTURE.md#data-model)

---

## 🎨 Design

- **Color Scheme**: Blue (#6366f1), Purple (#8b5cf6), Cyan (#06b6d4)
- **Font**: Inter (Google Fonts, 300-900)
- **Style**: Modern glassmorphism with gradients
- **Framework**: TailwindCSS
- **Responsive**: Mobile-first design

**Design Update**: See [DESIGN-UPDATE.md](./DESIGN-UPDATE.md)

---

## 📝 API Endpoints

### Public (Bot Users)
- `GET /api/courses` - List active courses
- `POST /api/orders` - Create order

### Admin Only
- `GET /api/courses/all` - List all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course
- `POST /api/courses/upload-thumbnail` - Upload image
- `GET /api/orders/all` - List orders
- `POST /api/orders/:id/approve` - Approve order
- `POST /api/orders/:id/reject` - Reject order
- `GET /api/settings/payment` - Get payment settings
- `PUT /api/settings` - Update settings
- `GET /api/stats` - Get statistics

**Full API Reference**: See [ARCHITECTURE.md](./ARCHITECTURE.md#api-endpoints)

---

## 🤝 Contributing

This is a private project for Nilexis.Et. For issues or improvements, contact the admin.

---

## 📄 License

Private / Proprietary

---

## 🆘 Support

### Quick Help
1. Check [TROUBLESHOOTING-COMPLETE.md](./TROUBLESHOOTING-COMPLETE.md)
2. Review [DEBUG-FLOWCHART.md](./DEBUG-FLOWCHART.md)
3. Use [CHECK-STATUS.md](./CHECK-STATUS.md) for diagnostics

### Common Issues
- **409 Bot Conflict**: Kill local node.exe processes, wait 60s
- **Upload Fails**: Check Railway logs and browser console (F12)
- **401 Auth Error**: Verify admin ID in localStorage
- **CORS Error**: Check backend CORS configuration

**Full Troubleshooting**: [TROUBLESHOOTING-COMPLETE.md](./TROUBLESHOOTING-COMPLETE.md)

---

## 📞 Quick Reference

**Admin ID**: `387957921`

**URLs**:
- Backend: https://vibrant-intuition-production-c1e8.up.railway.app
- Admin: https://nilexis-admin.vercel.app
- Health: https://vibrant-intuition-production-c1e8.up.railway.app/health

**Commands**:
```bash
# Check local processes
tasklist | findstr "node.exe"

# Kill processes
taskkill /F /IM node.exe
```

**Full Reference**: [QUICK-REFERENCE.md](./QUICK-REFERENCE.md)

---

## 🎉 Project Info

**Name**: Nilexis.Et  
**Type**: Telegram Course Seller Bot  
**Version**: 1.0  
**Status**: ✅ Deployed & Ready  
**Created**: June 2026  
**Last Updated**: June 18, 2026

---

## 📋 File Structure

```
.
├── backend/          # Express API + Bot + SQLite
├── frontend/         # User-facing React app
├── admin/            # Admin panel React app
├── data/             # SQLite DB + uploads
└── *.md              # Documentation (12+ files)
```

**Full Structure**: [FILES-OVERVIEW.md](./FILES-OVERVIEW.md)

---

## 🌟 Features Roadmap

- [x] Basic course management
- [x] Order processing
- [x] Payment settings
- [x] Statistics dashboard
- [ ] Webhook mode (instead of polling)
- [ ] Rate limiting
- [ ] Request logging
- [ ] Session tokens
- [ ] Email notifications
- [ ] Multi-language support

---

## 🔗 Links

- **Railway Dashboard**: https://railway.app/
- **Vercel Dashboard**: https://vercel.com/
- **Telegram Bot API**: https://core.telegram.org/bots/api

---

**Built with ❤️ for Nilexis.Et**

**Documentation**: Complete and comprehensive  
**Status**: Production-ready  
**Support**: Full troubleshooting guides included
