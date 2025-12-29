import { Outlet, Link } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            SpeakUp
          </Link>
          <nav style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/login" className="btn" style={{ color: 'var(--text-muted)' }}>Login</Link>
            <Link to="/register" className="btn btn-primary">Get Started</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <footer style={{
        backgroundColor: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        marginTop: 'auto'
      }}>
        <div className="container" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>&copy; {new Date().getFullYear()} SpeakUp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
