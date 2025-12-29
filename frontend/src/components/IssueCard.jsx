export default function IssueCard({ issue }) {
  const statusColors = {
    'Open': 'var(--danger)',
    'In Progress': 'var(--accent)',
    'Resolved': '#10b981' // Green
  };

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <h4 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{issue.title}</h4>
        <span style={{
          fontSize: '0.75rem',
          backgroundColor: `${statusColors[issue.status] || '#ccc'}20`,
          color: statusColors[issue.status] || '#666',
          border: `1px solid ${statusColors[issue.status] || '#ccc'}`,
          padding: '0.25rem 0.5rem',
          borderRadius: '1rem',
          fontWeight: '600'
        }}>
          {issue.status}
        </span>
      </div>
      <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{issue.description}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span>Reported by: {issue.author}</span>
        <span>{new Date(issue.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
