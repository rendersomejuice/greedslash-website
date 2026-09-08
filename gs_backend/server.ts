import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database('blog.db');

// Crear tabla al arrancar
db.prepare('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT, date TEXT DEFAULT CURRENT_TIMESTAMP)').run();

interface Post { id?: number; title: string; body: string; }

// Enpoints
app.get('/api/posts', (req: Request, res: Response) => {
  const posts = db.prepare('SELECT * FROM posts').all() as Post[];
  res.json(posts);
});

app.post('/api/posts', (req: Request<{}, {}, Post>, res: Response) => {
  const { title, body } = req.body;
  const info = db.prepare('INSERT INTO posts (title, body) VALUES (?, ?)').run(title, body);
  res.status(201).json({ id: Number(info.lastInsertRowid), title, body });
});

app.listen(3000, () => console.log('🚀 Servidor listo en http://localhost:3000'));
