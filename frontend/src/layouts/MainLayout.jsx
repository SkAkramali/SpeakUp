import { Outlet, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 99,
            display: 'none'
          }}
          className="mobile-menu-overlay"
        />
      )}
      
      <header style={{
        backgroundColor: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="container" style={{ position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>
              CiviConnect
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'none',
                padding: '0.5rem 0.75rem',
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--text-main)'
              }}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
            >
              <span style={{ fontSize: '1.5rem' }}>{menuOpen ? '✕' : '☰'}</span>
            </button>

            <nav style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              alignItems: 'center'
            }} className={`nav-menu ${menuOpen ? 'mobile-menu-open' : ''}`}>
              <Link to="/about" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }} onClick={() => setMenuOpen(false)}>About Us</Link>
              <Link to="/login" className="btn" style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }} onClick={() => setMenuOpen(false)}>Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
