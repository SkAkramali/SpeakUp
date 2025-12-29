import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function DashboardLayout({ entries = [] }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock notifications based on role
  const notifications = user?.role === 'politician' || user?.role === 'moderator' ? [
    { id: 1, message: 'New issue reported in your ward', isRead: false, timestamp: Date.now() - 3600000 },
    { id: 2, message: 'Citizen responded to your update', isRead: false, timestamp: Date.now() - 7200000 },
    { id: 3, message: 'Issue #123 marked as resolved', isRead: true, timestamp: Date.now() - 86400000 },
    { id: 4, message: 'New comment on Issue #456', isRead: true, timestamp: Date.now() - 172800000 }
  ] : [
    { id: 1, message: 'Your issue has been updated', isRead: false, timestamp: Date.now() - 3600000 },
    { id: 2, message: 'Issue resolved: Street Light Broken', isRead: true, timestamp: Date.now() - 86400000 }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--background)', position: 'relative' }}>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 1001,
          padding: '0.5rem',
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: '1.5rem',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'none'
        }}
        className="mobile-sidebar-btn"
      >
        ☰
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
          className="mobile-overlay"
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '240px',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        padding: '1.5rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000,
        position: 'relative'
      }} className={sidebarOpen ? 'mobile-open' : ''}>
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
        <Header 
          user={user} 
          notifications={notifications}
          unreadCount={unreadCount}
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          showProfile={showProfile}
          setShowProfile={setShowProfile}
        />
        <Outlet />
      </main>
    </div>
  );
}

function Header({ user, notifications, unreadCount, showNotifications, setShowNotifications, showProfile, setShowProfile }) {
  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'flex-end', 
      alignItems: 'center',
      marginBottom: '2rem',
      gap: '1rem'
    }}>
      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowProfile(false);
          }}
          style={{
            position: 'relative',
            padding: '0.5rem',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
        >
          <span style={{ fontSize: '1.2rem' }}>🔔</span>
          {unreadCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-5px',
              right: '-5px',
              backgroundColor: '#ef4444',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: '700',
              padding: '0.1rem 0.4rem',
              borderRadius: '1rem',
              minWidth: '18px',
              textAlign: 'center'
            }}>
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            width: '350px',
            maxHeight: '400px',
            overflowY: 'auto',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            zIndex: 1000
          }}>
            <div style={{ 
              padding: '1rem',
              borderBottom: '1px solid var(--border)',
              fontWeight: '600',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span style={{ 
                  fontSize: '0.85rem', 
                  color: 'var(--primary)',
                  fontWeight: '500'
                }}>
                  {unreadCount} unread
                </span>
              )}
            </div>
            {notifications.map(notif => (
              <div
                key={notif.id}
                style={{
                  padding: '1rem',
                  borderBottom: '1px solid var(--border)',
                  backgroundColor: notif.isRead ? 'transparent' : '#f0f9ff',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = notif.isRead ? 'transparent' : '#f0f9ff'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                  <span style={{ 
                    fontSize: '0.9rem',
                    fontWeight: notif.isRead ? '400' : '600',
                    color: 'var(--text-main)'
                  }}>
                    {notif.message}
                  </span>
                  {!notif.isRead && (
                    <span style={{
                      width: '8px',
                      height: '8px',
                      backgroundColor: 'var(--primary)',
                      borderRadius: '50%',
                      flexShrink: 0,
                      marginTop: '5px'
                    }}></span>
                  )}
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {formatTime(notif.timestamp)}
                </span>
              </div>
            ))}
            {notifications.length === 0 && (
              <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                No notifications
              </div>
            )}
          </div>
        )}
      </div>

      {/* Profile */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => {
            setShowProfile(!showProfile);
            setShowNotifications(false);
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--surface)'}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: 'var(--primary)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '1rem'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '500' }}>{user?.name}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
              {user?.role}
            </div>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>▼</span>
        </button>

        {/* Profile Dropdown */}
        {showProfile && (
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '0',
            width: '200px',
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
            zIndex: 1000,
            overflow: 'hidden'
          }}>
            <button
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              My Profile
            </button>
            <button
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                textAlign: 'left',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--background)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Settings
            </button>
            <div style={{ borderTop: '1px solid var(--border)' }}>
              <button
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  textAlign: 'left',
                  border: 'none',
                  backgroundColor: 'transparent',
                  color: 'var(--danger)',
                  cursor: 'pointer',
                  fontWeight: '500',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
