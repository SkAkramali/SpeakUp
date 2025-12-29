import { useState } from 'react';

export default function Updates() {
  const [updates] = useState([
    { 
      id: 1, 
      title: 'Your Issue "Street Light Broken" has been updated',
      message: 'The Municipal Corporation has assigned a team to fix the street light. Expected completion: 2 days.',
      timestamp: Date.now() - 3600000,
      type: 'progress',
      issueId: 1
    },
    { 
      id: 2, 
      title: 'Issue Resolved: "Pothole on Main Road"',
      message: 'Great news! The pothole has been filled and the road is now safe for traffic.',
      timestamp: Date.now() - 86400000,
      type: 'resolved',
      issueId: 3
    },
    { 
      id: 3, 
      title: 'New Response from Municipal Officer',
      message: 'Officer Sharma has responded to your water supply complaint. They are investigating the issue.',
      timestamp: Date.now() - 172800000,
      type: 'response',
      issueId: 4
    },
    { 
      id: 4, 
      title: 'Community Alert: Scheduled Maintenance',
      message: 'Water supply will be temporarily shut down tomorrow from 10 AM to 2 PM in Sector 15.',
      timestamp: Date.now() - 259200000,
      type: 'alert',
      issueId: null
    },
    { 
      id: 5, 
      title: 'Your report has been acknowledged',
      message: 'Thank you for reporting "Drainage Blocked". We have registered your complaint.',
      timestamp: Date.now() - 345600000,
      type: 'info',
      issueId: 7
    }
  ]);

  const getUpdateIcon = (type) => {
    switch(type) {
      case 'progress': return '🔄';
      case 'resolved': return '✅';
      case 'response': return '💬';
      case 'alert': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  const getUpdateColor = (type) => {
    switch(type) {
      case 'progress': return '#3b82f6';
      case 'resolved': return '#10b981';
      case 'response': return '#8b5cf6';
      case 'alert': return '#f59e0b';
      case 'info': return '#64748b';
      default: return 'var(--primary)';
    }
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours} hours ago`;
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Updates & Notifications</h2>

      {/* Summary Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ 
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '0.5rem' }}>
            In Progress
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e40af' }}>
            {updates.filter(u => u.type === 'progress').length}
          </div>
        </div>

        <div className="card" style={{ 
          backgroundColor: '#dcfce7',
          border: '1px solid #86efac',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: '0.5rem' }}>
            Resolved
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803d' }}>
            {updates.filter(u => u.type === 'resolved').length}
          </div>
        </div>

        <div className="card" style={{ 
          backgroundColor: '#f3e8ff',
          border: '1px solid #d8b4fe',
          padding: '1rem'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#581c87', marginBottom: '0.5rem' }}>
            New Responses
          </div>
          <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6b21a8' }}>
            {updates.filter(u => u.type === 'response').length}
          </div>
        </div>
      </div>

      {/* Updates List */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {updates.map(update => (
          <div 
            key={update.id} 
            className="card"
            style={{
              borderLeft: `4px solid ${getUpdateColor(update.type)}`,
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateX(5px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateX(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
            }}
          >
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ 
                fontSize: '2rem',
                flexShrink: 0
              }}>
                {getUpdateIcon(update.type)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  marginBottom: '0.5rem'
                }}>
                  <h3 style={{ 
                    fontSize: '1rem', 
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    margin: 0
                  }}>
                    {update.title}
                  </h3>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    marginLeft: '1rem'
                  }}>
                    {formatTime(update.timestamp)}
                  </span>
                </div>
                <p style={{ 
                  color: 'var(--text-muted)', 
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {update.message}
                </p>
                {update.issueId && (
                  <button 
                    style={{
                      marginTop: '0.75rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'var(--background)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--primary)',
                      fontSize: '0.85rem',
                      fontWeight: '500',
                      cursor: 'pointer'
                    }}
                  >
                    View Issue #{update.issueId}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {updates.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
            No updates yet. Check back later for updates on your issues!
          </p>
        </div>
      )}
    </div>
  );
}
