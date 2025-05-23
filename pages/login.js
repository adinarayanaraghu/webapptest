import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function submitHandler(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    if (res.ok) router.push('/dashboard');
    else alert((await res.json()).message);
  }

  return (
    <form onSubmit={submitHandler} style={{ maxWidth: '300px', margin: '100px auto' }}>
      <h2>Login</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0' }} />
      <button type="submit" style={{ width: '100%', padding: '8px' }}>Login</button>
    </form>
  );
}
