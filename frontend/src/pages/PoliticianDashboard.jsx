import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/IssueCard';
import UpdateForm from '../components/UpdateForm';
import FeedbackList from '../components/FeedbackList';
import SuggestionCard from '../components/SuggestionCard';
import StarRating from '../components/StarRating';

export default function PoliticianDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('issues');

  // Mock Data (Shared source ideally, but local for now)
  const [issues] = useState([
    { id: 1, title: 'Street Light Broken', description: 'The street light on 5th Avenue is flickering.', status: 'Open', author: 'Jane Doe', timestamp: Date.now() - 86400000 },
    { id: 2, title: 'Garbage Collection Delayed', description: 'Trash has not been picked up for 2 weeks.', status: 'In Progress', author: 'John Smith', timestamp: Date.now() - 172800000 }
  ]);

  const [updates, setUpdates] = useState([
    { id: 101, content: 'We are aware of the garbage collection delays. New trucks are arriving tomorrow.', timestamp: Date.now() - 3600000 }
  ]);

  const [feedbacks] = useState([
    { 
      id: 1, 
      serviceCategory: 'Water Supply', 
      feedbackType: 'complaint', 
      description: 'Water supply has been irregular for the past week.', 
      location: 'Downtown Area', 
      author: 'Jane Doe',
      status: 'Resolved',
      timestamp: Date.now() - 86400000,
      rating: { rating: 4, review: 'Issue was resolved quickly. Thank you!', ratedBy: 'Jane Doe' }
    },
    { 
      id: 2, 
      serviceCategory: 'Roads & Infrastructure', 
      feedbackType: 'complaint', 
      description: 'Multiple potholes on Main Street causing traffic issues.', 
      location: 'Main Street', 
      author: 'John Smith',
      status: 'In Progress',
      timestamp: Date.now() - 172800000 
    },
    { 
      id: 3, 
      serviceCategory: 'Education', 
      feedbackType: 'appreciation', 
      description: 'The new library opening has been excellent for the community.', 
      location: 'City Center', 
      author: 'Sarah Lee',
      status: 'Open',
      timestamp: Date.now() - 259200000 
    }
  ]);

  const [suggestions] = useState([
    {
      id: 1,
      title: 'Install Solar Panels on Public Buildings',
      description: 'We should install solar panels on government buildings to reduce energy costs and promote renewable energy.',
      category: 'Environment',
      expectedBenefit: 'Reduce carbon footprint by 30% and save $50,000 annually on electricity bills.',
      author: 'Alex Johnson',
      upvotes: 45,
      upvotedBy: [],
      comments: [
        { text: 'Great idea! This will help the environment.', author: 'Sarah Lee', timestamp: Date.now() - 3600000 },
        { text: 'Has anyone calculated the installation cost?', author: 'Mike Brown', timestamp: Date.now() - 7200000 }
      ],
      timestamp: Date.now() - 86400000
    }
  ]);

  const handlePostUpdate = (content) => {
    const newUpdate = {
      id: Date.now(),
      content,
      timestamp: Date.now()
    };
    setUpdates([newUpdate, ...updates]);
  };

  // Calculate average rating
  const ratedFeedbacks = feedbacks.filter(fb => fb.rating);
  const averageRating = ratedFeedbacks.length > 0
    ? (ratedFeedbacks.reduce((sum, fb) => sum + fb.rating.rating, 0) / ratedFeedbacks.length).toFixed(1)
    : 0;

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Representative Dashboard</h2>

      {/* Performance Summary */}
      <div className="analytics-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Total Feedback</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{feedbacks.length}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Avg Rating</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800' }}>{averageRating}</span>
            <span style={{ fontSize: '1.5rem' }}>⭐</span>
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Top Suggestions</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{suggestions.length}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tab-navigation" style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        borderBottom: '2px solid var(--border)',
        paddingBottom: '0',
        overflowX: 'auto'
      }}>
        {[
          { id: 'issues', label: '🏛️ Issues', count: issues.length },
          { id: 'feedback', label: '📝 Feedback', count: feedbacks.length },
          { id: 'suggestions', label: '💡 Suggestions', count: suggestions.length },
          { id: 'updates', label: '📢 My Updates', count: updates.length }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeTab === tab.id ? '3px solid var(--primary)' : '3px solid transparent',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeTab === tab.id ? '600' : '500',
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              marginBottom: '-2px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              whiteSpace: 'nowrap'
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--border)',
              color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
              padding: '0.15rem 0.5rem',
              borderRadius: '1rem',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Issues Tab */}
      {activeTab === 'issues' && (
        <div className="responsive-grid-2" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem' 
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Citizen Issues</h3>
            {issues.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No issues to review at the moment.</p>
              </div>
            ) : (
              issues.map(issue => (
                <IssueCard key={issue.id} issue={issue} />
              ))
            )}
          </div>

          <div>
            <UpdateForm onSubmit={handlePostUpdate} />
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
            Citizen Feedback ({feedbacks.length})
          </h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Review feedback from citizens about government services. Monitor ratings to improve service quality.
          </p>
          {feedbacks.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>No feedback received yet.</p>
            </div>
          ) : (
            <FeedbackList feedbacks={feedbacks} onRate={() => {}} />
          )}
        </div>
      )}

      {/* Suggestions Tab */}
      {activeTab === 'suggestions' && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
            Community Suggestions ({suggestions.length})
          </h3>
          <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
            Review improvement ideas from the community. Popular suggestions are listed first.
          </p>
          {suggestions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>No suggestions submitted yet.</p>
            </div>
          ) : (
            suggestions
              .sort((a, b) => b.upvotes - a.upvotes)
              .map(suggestion => (
                <SuggestionCard 
                  key={suggestion.id} 
                  suggestion={suggestion}
                  onUpvote={() => {}}
                  onComment={() => {}}
                />
              ))
          )}
        </div>
      )}

      {/* Updates Tab */}
      {activeTab === 'updates' && (
        <div className="responsive-grid-2" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem' 
        }}>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Your Updates</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              Keep citizens informed about ongoing work and resolutions.
            </p>
            {updates.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No updates posted yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {updates.map(update => (
                  <div key={update.id} className="card" style={{ padding: '1rem' }}>
                    <p style={{ marginBottom: '0.5rem', lineHeight: '1.6' }}>{update.content}</p>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Posted {new Date(update.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <UpdateForm onSubmit={handlePostUpdate} />
            
            <div className="card" style={{ marginTop: '1rem', backgroundColor: '#f0f9ff', borderColor: '#bfdbfe' }}>
              <h4 style={{ marginBottom: '0.5rem', color: '#1e40af' }}>💡 Tips for Updates</h4>
              <ul style={{ marginLeft: '1.25rem', color: '#1e3a8a', fontSize: '0.9rem', lineHeight: '1.6' }}>
                <li>Be clear and concise</li>
                <li>Include specific actions taken</li>
                <li>Provide timelines when possible</li>
                <li>Acknowledge citizen concerns</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
