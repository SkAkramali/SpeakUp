import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, registeredUsers } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    const result = login(email, password);
    
    if (result.success) {
      navigate(`/${result.user.role}`);
    } else {
      setError(result.message);
    }
  };

  // Demo login for quick access
  const handleDemoLogin = (role) => {
    const demoUsers = {
      citizen: { email: 'demo.citizen@speakup.com', password: 'demo123', name: 'Demo Citizen' },
      politician: { email: 'demo.politician@speakup.com', password: 'demo123', name: 'Demo Politician' },
      admin: { email: 'demo.admin@speakup.com', password: 'demo123', name: 'Demo Admin' },
      moderator: { email: 'demo.moderator@speakup.com', password: 'demo123', name: 'Demo Moderator' }
    };

    const demoUser = demoUsers[role];
    
    // Check if demo user exists, if not create it
    const existingUser = registeredUsers?.find(u => u.email === demoUser.email);
    if (!existingUser) {
      // For demo, directly set user in localStorage
      const user = { id: Date.now(), name: demoUser.name, role, email: demoUser.email };
      localStorage.setItem('speakup_user', JSON.stringify(user));
      window.location.href = `/${role}`;
      return;
    }

    setEmail(demoUser.email);
    setPassword(demoUser.password);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', color: 'var(--primary)' }}>Welcome Back</h2>
        <p style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          Sign in to continue to SpeakUp
        </p>

        {error && (
          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder="your.email@example.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                fontSize: '1rem'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter your password"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border)',
                backgroundColor: 'var(--background)',
                fontSize: '1rem'
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem', padding: '0.875rem' }}>
            Sign In
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: '600', textDecoration: 'none' }}>
              Register First
            </Link>
          </p>
        </div>

        {/* Demo Access Section */}
        <div style={{ 
          marginTop: '1rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center' }}>
            🚀 Quick Demo Access:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => handleDemoLogin('citizen')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#dbeafe',
                border: '1px solid #93c5fd',
                borderRadius: '0.375rem',
                color: '#1e40af',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              👤 Citizen
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('politician')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#f3e8ff',
                border: '1px solid #d8b4fe',
                borderRadius: '0.375rem',
                color: '#6b21a8',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              🏛️ Politician
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('admin')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#fef3c7',
                border: '1px solid #fcd34d',
                borderRadius: '0.375rem',
                color: '#92400e',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              ⚙️ Admin
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin('moderator')}
              style={{
                padding: '0.5rem',
                backgroundColor: '#dcfce7',
                border: '1px solid #86efac',
                borderRadius: '0.375rem',
                color: '#166534',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}
            >
              🛡️ Moderator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
