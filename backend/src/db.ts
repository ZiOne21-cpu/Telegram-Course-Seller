import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(__dirname, '../../data');
const UPLOADS_DIR = path.join(DB_DIR, 'uploads');
const THUMBNAILS_DIR = path.join(DB_DIR, 'thumbnails');

// Ensure directories exist
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(THUMBNAILS_DIR)) fs.mkdirSync(THUMBNAILS_DIR, { recursive: true });

const db = new Database(path.join(DB_DIR, 'app.db'));

db.exec(`
  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL,
    thumbnail_url TEXT,
    channel_id TEXT NOT NULL,
    active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    course_id INTEGER NOT NULL,
    telegram_id TEXT NOT NULL,
    telegram_username TEXT,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    screenshot_path TEXT,
    status TEXT DEFAULT 'pending',
    reject_note TEXT,
    invite_link TEXT,
    created_at TEXT DEFAULT (datetime('now')),
    updated_at TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  INSERT OR IGNORE INTO settings (key, value) VALUES
    ('cbe_account', ''),
    ('cbe_name', ''),
    ('telebirr_account', ''),
    ('telebirr_name', ''),
    ('payment_instructions', 'Please send payment to the account below and upload your screenshot as proof.');
`);

export default db;
