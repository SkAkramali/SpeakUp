export default function IssueCard({ issue }) {
  const statusColors = {
    'Open': 'var(--danger)',
    'In Progress': 'var(--accent)',
    'Resolved': '#10b981' // Green
  };

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.25rem' }}>{issue.title}</h4>
          {issue.category && (
            <span style={{ 
              fontSize: '0.75rem', 
              backgroundColor: '#e0e7ff', 
              color: '#4338ca', 
              padding: '0.15rem 0.4rem', 
              borderRadius: '0.25rem' 
            }}>
              {issue.category}
            </span>
          )}
        </div>
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
      
      {/* Display Image if attached */}
      {issue.image && (
        <div style={{ marginBottom: '1rem' }}>
          <img 
            src={issue.image} 
            alt="Issue" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '200px', 
              borderRadius: '0.5rem',
              border: '1px solid var(--border)',
              objectFit: 'cover'
            }} 
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <span>Reported by: {issue.author}</span>
        <span>{new Date(issue.timestamp).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
