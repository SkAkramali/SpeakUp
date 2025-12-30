import { useState } from 'react';

export default function SuggestionForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expectedBenefit, setExpectedBenefit] = useState('');

  const categories = [
    'Infrastructure',
    'Healthcare',
    'Education',
    'Environment',
    'Transportation',
    'Technology',
    'Public Safety',
    'Economy',
    'Social Services',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      alert('Please fill in all required fields');
      return;
    }

    const suggestion = {
      title,
      description,
      category,
      expectedBenefit,
      upvotes: 0,
      upvotedBy: [],
      comments: [],
      timestamp: Date.now()
    };

    onSubmit(suggestion);
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setExpectedBenefit('');
  };

  return (
    <div className="card" style={{ marginBottom: '2rem', position: 'sticky', top: '1rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
        💡 Suggest an Improvement or Idea
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Idea Title */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Idea Title <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Install Solar Panels on Public Buildings"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'inherit'
            }}
            required
          />
        </div>

        {/* Category */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Category <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'inherit',
              backgroundColor: 'white'
            }}
            required
          >
            <option value="">Select a category...</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Description <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            placeholder="Describe your idea in detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            required
          />
        </div>

        {/* Expected Benefit */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Expected Benefit (Optional)
          </label>
          <textarea
            placeholder="What benefits will this idea bring to the community?"
            value={expectedBenefit}
            onChange={(e) => setExpectedBenefit(e.target.value)}
            rows="2"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">
            Submit Idea
          </button>
        </div>
      </form>
    </div>
  );
}
