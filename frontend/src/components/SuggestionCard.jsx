import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function SuggestionCard({ suggestion, onUpvote, onComment }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    onComment(suggestion.id, {
      text: newComment,
      author: user.name,
      timestamp: Date.now()
    });
    
    setNewComment('');
  };

  const hasUserUpvoted = suggestion.upvotedBy?.includes(user?.id);

  return (
    <div className="card" style={{ marginBottom: '1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
          <h4 style={{ margin: 0, color: 'var(--text-main)', fontSize: '1.1rem' }}>
            💡 {suggestion.title}
          </h4>
          <span style={{
            backgroundColor: suggestion.category === 'Infrastructure' ? '#3b82f6' :
                           suggestion.category === 'Healthcare' ? '#ef4444' :
                           suggestion.category === 'Education' ? '#f59e0b' :
                           suggestion.category === 'Environment' ? '#10b981' : '#8b5cf6',
            color: 'white',
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            whiteSpace: 'nowrap'
          }}>
            {suggestion.category}
          </span>
        </div>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
          By {suggestion.author} • {new Date(suggestion.timestamp).toLocaleDateString()}
        </p>
      </div>

      {/* Description */}
      <p style={{ marginBottom: '0.75rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
        {suggestion.description}
      </p>

      {/* Expected Benefit */}
      {suggestion.expectedBenefit && (
        <div style={{ 
          backgroundColor: '#f0fdf4', 
          padding: '0.75rem', 
          borderRadius: 'var(--radius-md)',
          marginBottom: '0.75rem',
          borderLeft: '3px solid #10b981'
        }}>
          <strong style={{ color: '#059669', fontSize: '0.85rem' }}>Expected Benefit:</strong>
          <p style={{ margin: '0.25rem 0 0 0', color: '#065f46', fontSize: '0.9rem' }}>
            {suggestion.expectedBenefit}
          </p>
        </div>
      )}

      {/* Actions */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        paddingTop: '0.75rem', 
        borderTop: '1px solid var(--border)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => onUpvote(suggestion.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: hasUserUpvoted ? 'var(--primary)' : 'transparent',
            color: hasUserUpvoted ? 'white' : 'var(--primary)',
            border: `2px solid var(--primary)`,
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>👍</span>
          <span>{suggestion.upvotes || 0}</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            color: 'var(--text-muted)',
            border: '2px solid var(--border)',
            borderRadius: 'var(--radius-md)',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>💬</span>
          <span>{suggestion.comments?.length || 0} Comments</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div style={{ 
          marginTop: '1rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid var(--border)' 
        }}>
          <h5 style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>Comments</h5>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'inherit'
                }}
              />
              <button 
                type="submit"
                className="btn btn-primary"
                style={{ padding: '0.5rem 1rem' }}
              >
                Post
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {suggestion.comments && suggestion.comments.length > 0 ? (
              suggestion.comments.map((comment, index) => (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: '#f9fafb',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <p style={{ 
                    margin: 0, 
                    marginBottom: '0.25rem',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}>
                    {comment.text}
                  </p>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    color: 'var(--text-muted)' 
                  }}>
                    {comment.author} • {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <p style={{ 
                color: 'var(--text-muted)', 
                fontSize: '0.85rem',
                fontStyle: 'italic',
                margin: 0
              }}>
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
