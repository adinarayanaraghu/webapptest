import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default function handler(req, res) {
  const { token } = cookie.parse(req.headers.cookie || '');
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ user });
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}
