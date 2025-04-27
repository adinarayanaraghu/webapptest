import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Auth App</h1>
      <Link href="/register"><a style={{ margin: '0 20px' }}>Register</a></Link>
      <Link href="/login"><a style={{ margin: '0 20px' }}>Login</a></Link>
    </div>
  );
}
