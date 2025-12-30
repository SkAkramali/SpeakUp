import { useState } from 'react';

export default function StarRating({ rating, onRatingChange, readOnly = false, size = 'medium' }) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizes = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem'
  };

  const starSize = sizes[size] || sizes.medium;

  const handleClick = (value) => {
    if (!readOnly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <span
            key={star}
            onClick={() => handleClick(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            style={{
              cursor: readOnly ? 'default' : 'pointer',
              fontSize: starSize,
              color: isFilled ? '#fbbf24' : '#d1d5db',
              transition: 'color 0.2s',
              lineHeight: 1,
            }}
            title={`${star} star${star > 1 ? 's' : ''}`}
          >
            ★
          </span>
        );
      })}
      {rating > 0 && (
        <span style={{ 
          marginLeft: '0.5rem', 
          fontSize: '0.9rem', 
          color: 'var(--text-muted)',
          fontWeight: '500'
        }}>
          {rating}.0
        </span>
      )}
    </div>
  );
}
