import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const app = express();
app.use(cors({
  origin: process.env.APP_URL, 
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const db = new Database('blog.db');

db.prepare('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, date TEXT DEFAULT CURRENT_TIMESTAMP)').run();

const JWT_SECRET = process.env.JWT_SECRET || 'clave_temporal_por_si_falla';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

const authenticateToken = (req: Request, res: Response, next: Function) => {
  const token = req.cookies.adminToken; // 

  if (!token) return res.status(401).json({ error: 'Access denied.' });

  jwt.verify(token, JWT_SECRET, (err: any) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    next();
  });
};

interface Post { id?: number; title: string; body: string; }

//private endpoints

app.post('/api/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && await bcrypt.compare(password, ADMIN_PASSWORD_HASH!)) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '2h' });

    res.cookie('adminToken', token, {
      httpOnly: true,    // Protege contra ataques XSS (JavaScript no puede leerla)
      secure: false,     // Ponlo en 'true' cuando subas tu web a producción con HTTPS
      sameSite: 'lax',   // Protege contra ataques CSRF
      maxAge: 7200000    // Duración de 2 horas en milisegundos
    });
    return res.json({ success: true });
  }

  res.status(401).json({ error: 'Invalid username or password.' });
});

// Enpoints
app.get('/api/posts', (req: Request, res: Response) => {
  const posts = db.prepare('SELECT * FROM posts').all() as Post[];
  res.json(posts);
});

app.post('/api/posts',authenticateToken , (req: Request<{}, {}, Post>, res: Response) => {
  const { title, body } = req.body;
  const info = db.prepare('INSERT INTO posts (title, body) VALUES (?, ?)').run(title, body);
  res.status(201).json({ id: Number(info.lastInsertRowid), title, body });
});

app.listen(3000, () => console.log('🚀 Server Ready! http://localhost:3000'));
