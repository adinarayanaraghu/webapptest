import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default function handler(req, res) {
  const { token } = cookie.parse(req.headers.cookie || '');
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const user = jwt.verify(token, secret);
    res.status(200).json({ user });
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
