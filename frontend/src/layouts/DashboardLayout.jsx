import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout({ entries = [] }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <aside style={{
        width: '240px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Link to="/" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '2rem', paddingLeft: '0.5rem' }}>
          CiviConnect
        </Link>

        {user && (
          <div style={{ padding: '0 0.5rem 1.5rem', borderBottom: '1px solid var(--border)', marginBottom: '1rem' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Welcome,</p>
            <p style={{ fontWeight: '600' }}>{user.name}</p>
            <span style={{
              fontSize: '0.75rem',
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '0.1rem 0.5rem',
              borderRadius: '1rem',
              display: 'inline-block',
              marginTop: '0.25rem'
            }}>
              {user.role}
            </span>
          </div>
        )}

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {entries.map((entry) => (
            <Link
              key={entry.path}
              to={entry.path}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                color: location.pathname === entry.path ? 'var(--primary)' : 'var(--text-muted)',
                backgroundColor: location.pathname === entry.path ? 'rgb(79 70 229 / 0.1)' : 'transparent',
                fontWeight: location.pathname === entry.path ? '600' : '400'
              }}
            >
              {entry.label}
            </Link>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', color: 'var(--danger)', display: 'block', background: 'none', width: '100%', textAlign: 'left' }}>Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem' }}>
        <Header user={user} />
        <Outlet />
      </main>
    </div>
  );
}

function Header({ user }) {
  return (
    <header style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
      {/* Placeholder for header actions (Notifications, etc) */}
    </header>
  );
}
