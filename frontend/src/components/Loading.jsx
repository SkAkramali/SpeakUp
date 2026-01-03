export default function Loading({ message = 'Loading...' }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      padding: '2rem'
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        border: '4px solid var(--border)',
        borderTop: '4px solid var(--primary)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} className="spinner"></div>
      <p style={{
        marginTop: '1rem',
        color: 'var(--text-muted)',
        fontSize: '0.95rem'
      }}>
        {message}
      </p>
    </div>
  );
}
