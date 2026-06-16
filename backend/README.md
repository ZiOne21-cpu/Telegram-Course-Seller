# Backend - Course Seller API

Express.js API with Telegram Bot integration for managing course sales.

## Local Development

```bash
npm install
cp ../.env.example .env
# Edit .env with your values
npm run dev
```

The server will start on `http://localhost:3001`.

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `BOT_TOKEN` | Yes | From @BotFather |
| `TELEGRAM_ADMIN_IDS` | Yes | Comma-separated admin user IDs |
| `PORT` | No | Default: 3001 |
| `NODE_ENV` | No | Set to `production` in prod |
| `FRONTEND_URL` | Yes | For CORS (e.g., https://your-app.vercel.app) |
| `ADMIN_URL` | Yes | For CORS (e.g., https://your-admin.vercel.app) |
| `APP_URL` | Yes | The main Mini App URL |

## API Endpoints

### Public
- `GET /health` - Health check
- `GET /api/courses` - List active courses
- `POST /api/orders` - Create new order

### Admin (requires Telegram auth + admin ID)
- `GET /api/orders` - List all orders
- `PATCH /api/orders/:id` - Approve/reject order
- `POST /api/courses` - Create course
- `DELETE /api/courses/:id` - Delete course
- `GET /api/settings` - Get payment settings
- `POST /api/settings` - Update payment settings
- `GET /api/stats` - Get dashboard stats

## Database

SQLite database stored at `../data/app.db`. In production, this must be on a persistent volume.

## File Uploads

- Screenshots: `../data/uploads/`
- Thumbnails: `../data/thumbnails/`

These are served as static files via Express.
