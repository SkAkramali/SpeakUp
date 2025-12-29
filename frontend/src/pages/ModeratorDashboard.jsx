import { useState } from 'react';

export default function ModeratorDashboard() {
  const [flaggedItems, setFlaggedItems] = useState([
    { id: 1, type: 'Comment', content: 'This is a spam comment!', reporter: 'Citizen A', reason: 'Spam' },
    { id: 2, type: 'Issue', content: 'Fake issue report.', reporter: 'Politician B', reason: 'Misinformation' }
  ]);

  const handleAction = (id, action) => {
    // Determine action result (mock)
    alert(`${action} item ${id}`);
    setFlaggedItems(flaggedItems.filter(i => i.id !== id));
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Moderation Queue</h2>

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
