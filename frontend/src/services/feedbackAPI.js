// API Service for SpeakUp Feedback System
// Place this file at: frontend/src/services/feedbackAPI.js

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Helper function to get auth token
const getAuthToken = () => {
  const user = localStorage.getItem('speakup_user');
  if (user) {
    const userData = JSON.parse(user);
    return userData.token; // Adjust based on your auth structure
  }
  return null;
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }
  return response.json();
};

// Feedback API
export const feedbackAPI = {
  /**
   * Create new feedback
   * @param {Object} data - Feedback data
   * @returns {Promise<Object>} Created feedback
   */
  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  /**
   * Get all feedback with filters
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Feedback list with pagination
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/feedback?${params}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },

  /**
   * Get single feedback by ID
   * @param {string} id - Feedback ID
   * @returns {Promise<Object>} Feedback details
   */
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },

  /**
   * Update feedback status (Admin/Politician only)
   * @param {string} id - Feedback ID
   * @param {string} status - New status (Open, In Progress, Resolved)
   * @returns {Promise<Object>} Updated feedback
   */
  updateStatus: async (id, status) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ status })
    });
    return handleResponse(response);
  }
};

// Rating API
export const ratingAPI = {
  /**
   * Submit rating for resolved feedback
   * @param {string} feedbackId - Feedback ID
   * @param {Object} data - Rating data {rating: 1-5, review: string}
   * @returns {Promise<Object>} Created rating
   */
  create: async (feedbackId, data) => {
    const response = await fetch(`${API_BASE_URL}/feedback/${feedbackId}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  /**
   * Get ratings with analytics
   * @param {Object} filters - Filter options
   * @returns {Promise<Object>} Ratings with analytics
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/ratings?${params}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  }
};

// Suggestion API
export const suggestionAPI = {
  /**
   * Create new suggestion
   * @param {Object} data - Suggestion data
   * @returns {Promise<Object>} Created suggestion
   */
  create: async (data) => {
    const response = await fetch(`${API_BASE_URL}/suggestions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify(data)
    });
    return handleResponse(response);
  },

  /**
   * Get all suggestions with filters
   * @param {Object} filters - Filter options {category, sortBy, page, limit}
   * @returns {Promise<Object>} Suggestions list with pagination
   */
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/suggestions?${params}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },

  /**
   * Toggle upvote on suggestion
   * @param {string} id - Suggestion ID
   * @returns {Promise<Object>} Updated upvote count
   */
  upvote: async (id) => {
    const response = await fetch(`${API_BASE_URL}/suggestions/${id}/upvote`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },

  /**
   * Add comment to suggestion
   * @param {string} id - Suggestion ID
   * @param {string} text - Comment text
   * @returns {Promise<Object>} Created comment
   */
  addComment: async (id, text) => {
    const response = await fetch(`${API_BASE_URL}/suggestions/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`
      },
      body: JSON.stringify({ text })
    });
    return handleResponse(response);
  },

  /**
   * Delete comment (Author only)
   * @param {string} suggestionId - Suggestion ID
   * @param {string} commentId - Comment ID
   * @returns {Promise<Object>} Success message
   */
  deleteComment: async (suggestionId, commentId) => {
    const response = await fetch(
      `${API_BASE_URL}/suggestions/${suggestionId}/comments/${commentId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getAuthToken()}`
        }
      }
    );
    return handleResponse(response);
  }
};

// Analytics API (Admin/Politician only)
export const analyticsAPI = {
  /**
   * Get dashboard analytics
   * @returns {Promise<Object>} Analytics data
   */
  getDashboard: async () => {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    return handleResponse(response);
  },

  /**
   * Export reports
   * @param {Object} params - Export parameters {type, format, startDate, endDate}
   * @returns {Promise<Blob>} File download
   */
  exportReport: async (params) => {
    const queryParams = new URLSearchParams(params);
    const response = await fetch(`${API_BASE_URL}/analytics/export?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Export failed');
    }
    
    return response.blob();
  }
};

// File Upload Helper
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: formData
  });

  return handleResponse(response);
};

// Example usage in components:

/**
 * Example: Using in CitizenDashboard.jsx
 * 
 * import { feedbackAPI, ratingAPI, suggestionAPI } from '../services/feedbackAPI';
 * 
 * // Create feedback
 * const handleCreateFeedback = async (newFeedback) => {
 *   try {
 *     const result = await feedbackAPI.create(newFeedback);
 *     if (result.success) {
 *       setFeedbacks([result.data, ...feedbacks]);
 *       alert('Feedback submitted successfully!');
 *     }
 *   } catch (error) {
 *     console.error('Error creating feedback:', error);
 *     alert('Failed to submit feedback. Please try again.');
 *   }
 * };
 * 
 * // Rate feedback
 * const handleRateFeedback = async (feedbackId, rating) => {
 *   try {
 *     const result = await ratingAPI.create(feedbackId, rating);
 *     if (result.success) {
 *       setFeedbacks(feedbacks.map(fb => 
 *         fb.id === feedbackId ? { ...fb, rating: result.data } : fb
 *       ));
 *       alert('Rating submitted successfully!');
 *     }
 *   } catch (error) {
 *     console.error('Error rating feedback:', error);
 *     alert('Failed to submit rating. Please try again.');
 *   }
 * };
 * 
 * // Create suggestion
 * const handleCreateSuggestion = async (newSuggestion) => {
 *   try {
 *     const result = await suggestionAPI.create(newSuggestion);
 *     if (result.success) {
 *       setSuggestions([result.data, ...suggestions]);
 *       alert('Suggestion submitted successfully!');
 *     }
 *   } catch (error) {
 *     console.error('Error creating suggestion:', error);
 *     alert('Failed to submit suggestion. Please try again.');
 *   }
 * };
 * 
 * // Upvote suggestion
 * const handleUpvoteSuggestion = async (suggestionId) => {
 *   try {
 *     const result = await suggestionAPI.upvote(suggestionId);
 *     if (result.success) {
 *       setSuggestions(suggestions.map(sug =>
 *         sug.id === suggestionId 
 *           ? { ...sug, upvotes: result.data.upvotes, hasUserUpvoted: result.data.hasUpvoted }
 *           : sug
 *       ));
 *     }
 *   } catch (error) {
 *     console.error('Error upvoting suggestion:', error);
 *     alert('Failed to upvote. Please try again.');
 *   }
 * };
 * 
 * // Add comment
 * const handleCommentSuggestion = async (suggestionId, comment) => {
 *   try {
 *     const result = await suggestionAPI.addComment(suggestionId, comment.text);
 *     if (result.success) {
 *       setSuggestions(suggestions.map(sug =>
 *         sug.id === suggestionId 
 *           ? { ...sug, comments: [...sug.comments, result.data] }
 *           : sug
 *       ));
 *     }
 *   } catch (error) {
 *     console.error('Error adding comment:', error);
 *     alert('Failed to add comment. Please try again.');
 *   }
 * };
 * 
 * // Load feedback on mount
 * useEffect(() => {
 *   const loadFeedback = async () => {
 *     try {
 *       const result = await feedbackAPI.getAll({ page: 1, limit: 20 });
 *       if (result.success) {
 *         setFeedbacks(result.data.feedbacks);
 *       }
 *     } catch (error) {
 *       console.error('Error loading feedback:', error);
 *     }
 *   };
 *   
 *   loadFeedback();
 * }, []);
 */

export default {
  feedback: feedbackAPI,
  rating: ratingAPI,
  suggestion: suggestionAPI,
  analytics: analyticsAPI,
  uploadFile
};
