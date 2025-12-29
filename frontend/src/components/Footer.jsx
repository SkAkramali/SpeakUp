import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      padding: '3rem 0 2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* About Section */}
          <div>
            <h3 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: 'var(--primary)', 
              marginBottom: '1rem' 
            }}>
              CiviConnect
            </h3>
            <p style={{ 
              color: 'var(--text-muted)', 
              fontSize: '0.9rem', 
              lineHeight: '1.6' 
            }}>
              Empowering communities to connect with their government. 
              Report issues, track progress, and engage with local officials.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: 'var(--text-main)'
            }}>
              Quick Links
            </h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Home</Link>
              <Link to="/about" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>About Us</Link>
              <Link to="/login" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Login</Link>
              <Link to="/register" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Register</Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: 'var(--text-main)'
            }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a 
                href="mailto:contact@civiconnect.in" 
                style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                contact@civiconnect.in
              </a>
              <a 
                href="mailto:support@civiconnect.in" 
                style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}
              >
                support@civiconnect.in
              </a>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                +91 1800-123-4567
              </p>
            </div>
          </div>

          {/* Social & Legal */}
          <div>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: '600', 
              marginBottom: '1rem',
              color: 'var(--text-main)'
            }}>
              Follow Us
            </h4>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <a 
                href="#" 
                style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.9rem',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                Twitter
              </a>
              <a 
                href="#" 
                style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.9rem',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                Facebook
              </a>
              <a 
                href="#" 
                style={{ 
                  color: 'var(--text-muted)', 
                  fontSize: '0.9rem',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.target.style.color = 'var(--text-muted)'}
              >
                LinkedIn
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Privacy Policy</a>
              <a href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Terms of Service</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ 
          textAlign: 'center', 
          paddingTop: '2rem', 
          borderTop: '1px solid var(--border)',
          color: 'var(--text-muted)',
          fontSize: '0.9rem'
        }}>
          <p>&copy; {new Date().getFullYear()} CiviConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
