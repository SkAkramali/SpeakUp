import { useState } from 'react';
import StarRating from './StarRating';
import { useAuth } from '../context/AuthContext';

export default function FeedbackList({ feedbacks, onRate }) {
  const { user } = useAuth();
  const [expandedFeedback, setExpandedFeedback] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingReview, setRatingReview] = useState('');

  const handleRateSubmit = (feedbackId) => {
    if (selectedRating === 0) {
      alert('Please select a rating');
      return;
    }

    onRate(feedbackId, {
      rating: selectedRating,
      review: ratingReview,
      ratedBy: user.name,
      timestamp: Date.now()
    });

    setExpandedFeedback(null);
    setSelectedRating(0);
    setRatingReview('');
  };

  const getFeedbackIcon = (type) => {
    switch (type) {
      case 'complaint': return '⚠️';
      case 'suggestion': return '💡';
      case 'appreciation': return '👍';
      default: return '📝';
    }
  };

  const getFeedbackColor = (type) => {
    switch (type) {
      case 'complaint': return '#ef4444';
      case 'suggestion': return '#3b82f6';
      case 'appreciation': return '#10b981';
      default: return '#8b5cf6';
    }
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
        <p style={{ color: 'var(--text-muted)' }}>No feedback submitted yet.</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {feedbacks.map((feedback) => (
        <div key={feedback.id} className="card">
          {/* Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'start',
            marginBottom: '0.75rem'
          }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.2rem' }}>{getFeedbackIcon(feedback.feedbackType)}</span>
                <span style={{
                  backgroundColor: getFeedbackColor(feedback.feedbackType) + '20',
                  color: getFeedbackColor(feedback.feedbackType),
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}>
                  {feedback.feedbackType}
                </span>
                <span style={{
                  backgroundColor: '#e5e7eb',
                  color: '#374151',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {feedback.serviceCategory}
                </span>
              </div>
              
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.85rem',
                margin: 0
              }}>
                By {feedback.author} • {new Date(feedback.timestamp).toLocaleString()}
              </p>
            </div>

            {feedback.status && (
              <span style={{
                backgroundColor: 
                  feedback.status === 'Resolved' ? '#10b981' :
                  feedback.status === 'In Progress' ? '#f59e0b' : '#6b7280',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.75rem',
                fontWeight: '600',
                whiteSpace: 'nowrap'
              }}>
                {feedback.status}
              </span>
            )}
          </div>

          {/* Description */}
          <p style={{ 
            marginBottom: '0.75rem', 
            lineHeight: '1.6',
            color: 'var(--text-main)'
          }}>
            {feedback.description}
          </p>

          {/* Location */}
          {feedback.location && feedback.location !== 'Not specified' && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              <span>📍</span>
              <span>{feedback.location}</span>
            </div>
          )}

          {/* Attachment */}
          {feedback.attachment && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              marginBottom: '0.75rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}>
              <span>📎</span>
              <span>{feedback.attachment}</span>
            </div>
          )}

          {/* Rating Display */}
          {feedback.rating && (
            <div style={{ 
              backgroundColor: '#fef3c7',
              padding: '0.75rem',
              borderRadius: 'var(--radius-md)',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.9rem' }}>Rating:</strong>
                <StarRating rating={feedback.rating.rating} readOnly size="small" />
              </div>
              {feedback.rating.review && (
                <>
                  <p style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '0.9rem' }}>
                    {feedback.rating.review}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    - {feedback.rating.ratedBy}
                  </p>
                </>
              )}
            </div>
          )}

          {/* Rate Button (only if status is Resolved and no rating yet) */}
          {feedback.status === 'Resolved' && !feedback.rating && user.role === 'citizen' && (
            <div style={{ paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              {expandedFeedback === feedback.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '500',
                      fontSize: '0.9rem'
                    }}>
                      Rate this resolution:
                    </label>
                    <StarRating 
                      rating={selectedRating} 
                      onRatingChange={setSelectedRating}
                      size="large"
                    />
                  </div>
                  
                  <textarea
                    placeholder="Optional: Share your experience with this resolution..."
                    value={ratingReview}
                    onChange={(e) => setRatingReview(e.target.value)}
                    rows="2"
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => handleRateSubmit(feedback.id)}
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                    >
                      Submit Rating
                    </button>
                    <button
                      onClick={() => {
                        setExpandedFeedback(null);
                        setSelectedRating(0);
                        setRatingReview('');
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-md)',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setExpandedFeedback(feedback.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}
                >
                  ⭐ Rate This Resolution
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
