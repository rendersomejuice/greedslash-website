import express, { Request, Response } from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';

const app = express();
app.use(cors());
app.use(express.json());

const db = new Database('blog.db');

// Crear tabla al arrancar
db.prepare('CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, contenido TEXT)').run();

interface Post { id?: number; titulo: string; contenido: string; }

// Enpoints del Blog
app.get('/api/posts', (req: Request, res: Response) => {
  const posts = db.prepare('SELECT * FROM posts').all() as Post[];
  res.json(posts);
});

app.post('/api/posts', (req: Request<{}, {}, Post>, res: Response) => {
  const { titulo, contenido } = req.body;
  const info = db.prepare('INSERT INTO posts (titulo, contenido) VALUES (?, ?)').run(titulo, contenido);
  res.status(201).json({ id: Number(info.lastInsertRowid), titulo, contenido });
});

// JSONs Estáticos directos
app.get('/api/config', (req: Request, res: Response) => {
  res.json({ nombreWeb: "Mi Blog", version: "1.0.0" });
});

app.get('/api/autor', (req: Request, res: Response) => {
  res.json({ nombre: "Carlos Dev", rol: "Fullstack" });
});

app.listen(3000, () => console.log('🚀 Servidor listo en http://localhost:3000'));
