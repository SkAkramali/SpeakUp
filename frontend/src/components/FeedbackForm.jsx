import { useState } from 'react';

export default function FeedbackForm({ onSubmit }) {
  const [serviceCategory, setServiceCategory] = useState('');
  const [feedbackType, setFeedbackType] = useState('complaint');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [attachment, setAttachment] = useState(null);

  const serviceCategories = [
    'Water Supply',
    'Electricity',
    'Roads & Infrastructure',
    'Healthcare',
    'Education',
    'Sanitation',
    'Public Transport',
    'Parks & Recreation',
    'Police Services',
    'Fire Services',
    'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceCategory || !description) {
      alert('Please fill in all required fields');
      return;
    }

    const feedback = {
      serviceCategory,
      feedbackType,
      description,
      location: location || 'Not specified',
      attachment: attachment ? attachment.name : null,
      timestamp: Date.now()
    };

    onSubmit(feedback);
    
    // Reset form
    setServiceCategory('');
    setFeedbackType('complaint');
    setDescription('');
    setLocation('');
    setAttachment(null);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) { // 5MB limit
      setAttachment(file);
    } else {
      alert('File size must be less than 5MB');
    }
  };

  return (
    <div className="card" style={{ marginBottom: '2rem', position: 'sticky', top: '1rem' }}>
      <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)' }}>
        📝 Submit Feedback on Government Services
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {/* Service Category */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Service Category <span style={{ color: 'red' }}>*</span>
          </label>
          <select
            value={serviceCategory}
            onChange={(e) => setServiceCategory(e.target.value)}
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
            <option value="">Select a service...</option>
            {serviceCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Feedback Type */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Feedback Type <span style={{ color: 'red' }}>*</span>
          </label>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {['complaint', 'suggestion', 'appreciation'].map(type => (
              <label key={type} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="feedbackType"
                  value={type}
                  checked={feedbackType === type}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                <span style={{ textTransform: 'capitalize', color: 'var(--text-main)' }}>
                  {type === 'complaint' && '⚠️'}
                  {type === 'suggestion' && '💡'}
                  {type === 'appreciation' && '👍'}
                  {' '}{type}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Description <span style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            placeholder="Provide detailed feedback about the service..."
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

        {/* Location */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Location (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g., Downtown area, 5th Avenue"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Attachment */}
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: 'var(--text-main)' }}>
            Attachment (Optional - max 5MB)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*,.pdf,.doc,.docx"
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'inherit'
            }}
          />
          {attachment && (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              Selected: {attachment.name}
            </p>
          )}
        </div>

        <div style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
}
