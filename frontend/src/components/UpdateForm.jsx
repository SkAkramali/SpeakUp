import { useState } from 'react';

export default function UpdateForm({ onSubmit }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content) return;
    onSubmit(content);
    setContent('');
  };

  return (
    <div className="card" style={{ marginBottom: '2rem', borderLeft: '4px solid var(--primary)', position: 'sticky', top: '1rem' }}>
      <h3 style={{ marginBottom: '0.5rem', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>📢 Post Official Update</h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
        Keep citizens informed about actions taken on issues
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Share an update with your constituents..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="3"
          style={{
            width: '100%',
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'inherit',
            resize: 'vertical',
            marginBottom: '1rem'
          }}
        />
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">Post Update</button>
        </div>
      </form>
    </div>
  );
}
