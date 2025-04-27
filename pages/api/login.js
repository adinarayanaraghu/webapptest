import { Low, JSONFile } from 'lowdb';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { username, password } = req.body;
  const file = path.join(process.cwd(), 'data', 'users.json');
  const adapter = new JSONFile(file);
  const db = new Low(adapter);
  await db.read();
  const user = db.data.users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.setHeader('Set-Cookie', cookie.serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 3600
  }));
  res.status(200).json({ message: 'Logged in' });
}
