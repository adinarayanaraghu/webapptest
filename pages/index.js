import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h1>Welcome</h1>
      <div>
        <Link href="/register"><a style={{ margin: '0 10px' }}>Register</a></Link>
        <Link href="/login"><a style={{ margin: '0 10px' }}>Login</a></Link>
      </div>
    </div>
  );
}
