import { useState } from 'react';
import BarChart from '../components/BarChart';

export default function ModeratorDashboard() {
  const [flaggedItems, setFlaggedItems] = useState([
    { id: 1, type: 'Comment', content: 'This is a spam comment!', reporter: 'Citizen A', reason: 'Spam' },
    { id: 2, type: 'Issue', content: 'Fake issue report.', reporter: 'Politician B', reason: 'Misinformation' },
    { id: 3, type: 'Comment', content: 'Inappropriate language used', reporter: 'Citizen C', reason: 'Harassment' },
    { id: 4, type: 'Issue', content: 'Duplicate issue submission', reporter: 'Moderator D', reason: 'Duplicate' }
  ]);

  // Moderation statistics
  const stats = {
    totalReviewed: 156,
    approved: 128,
    removed: 28,
    pending: flaggedItems.length,
    responseTime: '1.8h'
  };

  // Chart data
  const reviewStatusData = [
    { label: 'Approved', value: stats.approved, color: '#10b981' },
    { label: 'Removed', value: stats.removed, color: '#ef4444' },
    { label: 'Pending', value: stats.pending, color: '#f59e0b' }
  ];

  const flagReasonData = [
    { label: 'Spam', value: 45, color: '#ef4444' },
    { label: 'Harassment', value: 23, color: '#f59e0b' },
    { label: 'Misinformation', value: 18, color: '#8b5cf6' },
    { label: 'Duplicate', value: 12, color: '#3b82f6' }
  ];

  const handleAction = (id, action) => {
    // Determine action result (mock)
    alert(`${action} item ${id}`);
    setFlaggedItems(flaggedItems.filter(i => i.id !== id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Moderation Dashboard</h2>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Total Reviewed</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.totalReviewed}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Approved</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.approved}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Removed</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.removed}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Pending</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.pending}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Avg Response</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.responseTime}</div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card">
          <BarChart data={reviewStatusData} title="Review Status Overview" height={250} />
        </div>

        <div className="card">
          <BarChart data={flagReasonData} title="Reports by Reason" height={250} />
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '600' }}>
          Performance Metrics
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--background)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Approval Rate
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#10b981' }}>
              82%
            </div>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--background)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Accuracy Score
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#3b82f6' }}>
              95%
            </div>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--background)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Items/Day
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#8b5cf6' }}>
              24
            </div>
          </div>

          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'var(--background)', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              User Reports
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: '700', color: '#f59e0b' }}>
              8
            </div>
          </div>
        </div>
      </div>

      {/* Moderation Queue */}
      <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', fontWeight: '600' }}>
        Moderation Queue
      </h3>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {flaggedItems.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No flagged items to review.</p>
        ) : (
          flaggedItems.map(item => (
            <div key={item.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: '600', color: 'var(--danger)' }}>[{item.type}]</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Reported by {item.reporter} for: {item.reason}</span>
                </div>
                <p>{item.content}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => handleAction(item.id, 'Approved')}
                  className="btn"
                  style={{ border: '1px solid var(--border)', color: '#10b981' }}
                >
                  Keep
                </button>
                <button
                  onClick={() => handleAction(item.id, 'Removed')}
                  className="btn"
                  style={{ border: '1px solid var(--border)', color: 'var(--danger)' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
