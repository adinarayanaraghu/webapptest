import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/user');
      if (res.ok) setUser((await res.json()).user);
      else router.push('/login');
    }
    fetchUser();
  }, [router]);

  const logout = async () => {
    await fetch('/api/logout');
    router.push('/login');
  };

  if (!user) return <p>Loading...</p>;
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <button onClick={logout} style={{ padding: '8px', marginTop: '20px' }}>Logout</button>
    </div>
  );
}
