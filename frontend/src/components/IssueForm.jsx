import { useState } from 'react';

export default function IssueForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description) return; // Simple validation
    onSubmit({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Report an Issue</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Issue Title (e.g., Pothole on Main St)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'inherit'
          }}
        />
        <textarea
          placeholder="Describe the issue detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          style={{
            padding: '0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'inherit',
            resize: 'vertical'
          }}
        />
        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">Submit Report</button>
        </div>
      </form>
    </div>
  );
}
