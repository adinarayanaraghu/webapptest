import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;

  const file = path.join(process.cwd(), 'data', 'users.json');
  const adapter = new JSONFile(file);
  const db = new Low(adapter);
  await db.read();
  db.data = db.data || { users: [] };
  const exists = db.data.users.find(u => u.username === username);
  if (exists) return res.status(400).json({ message: 'Username taken' });

  const hash = await bcrypt.hash(password, 10);
  db.data.users.push({ username, password: hash });
  await db.write();
  res.status(200).json({ message: 'User registered' });
}
