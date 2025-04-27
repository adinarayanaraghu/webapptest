import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/user').then(res => {
      if (res.ok) return res.json();
      throw new Error('Not auth');
    }).then(data => setUser(data.user)).catch(() => router.push('/login'));
  }, [router]);

  function logout() {
    fetch('/api/logout').then(() => router.push('/login'));
  }

  if (!user) return <p>Loading...</p>;
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Dashboard</h2>
      <p>Welcome, {user.username}</p>
      <button onClick={logout} style={{ padding: '8px' }}>Logout</button>
    </div>
  );
}
