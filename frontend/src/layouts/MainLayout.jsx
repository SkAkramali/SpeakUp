import { Outlet, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
            CiviConnect
          </Link>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              '@media (max-width: 640px)': { display: 'block' },
              padding: '0.5rem',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}
            className="mobile-menu-btn"
          >
            <span style={{ fontSize: '1.5rem' }}>☰</span>
          </button>

          <nav style={{ 
            display: 'flex', 
            gap: '1.5rem', 
            alignItems: 'center',
            flexWrap: 'wrap'
          }} className="nav-menu">
            <Link to="/about" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>About Us</Link>
            <Link to="/login" className="btn" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>Login</Link>
            <Link to="/register" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>Get Started</Link>
          </nav>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
