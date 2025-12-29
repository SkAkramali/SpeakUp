export default function BarChart({ data, title, height = 300 }) {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div>
      {title && (
        <h3 style={{ 
          fontSize: '1.1rem', 
          marginBottom: '1.5rem', 
          color: 'var(--text-main)',
          fontWeight: '600'
        }}>
          {title}
        </h3>
      )}
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-end', 
        gap: '1.5rem',
        height: `${height}px`,
        padding: '1rem 0'
      }}>
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div 
              key={index}
              style={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}>
                <div
                  style={{
                    width: '100%',
                    height: `${barHeight}%`,
                    backgroundColor: item.color || 'var(--primary)',
                    borderRadius: '8px 8px 0 0',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.transform = 'translateY(-5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: '-25px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: '700',
                    fontSize: '1rem',
                    color: 'var(--text-main)',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.value}
                  </span>
                </div>
              </div>
              <div style={{
                fontSize: '0.9rem',
                fontWeight: '500',
                color: 'var(--text-muted)',
                textAlign: 'center',
                marginTop: '0.5rem'
              }}>
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
