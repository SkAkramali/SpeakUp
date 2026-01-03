import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueForm from '../components/IssueForm';
import IssueCard from '../components/IssueCard';
import BarChart from '../components/BarChart';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import SuggestionForm from '../components/SuggestionForm';
import SuggestionCard from '../components/SuggestionCard';

export default function CitizenDashboard() {
  const { user, sharedIssues, addIssue } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [activeSection, setActiveSection] = useState('issues'); // New: issues, feedback, or suggestions

  // Use shared issues from context - visible across all dashboards
  const issues = sharedIssues || [];

  // Feedback State
  const [feedbacks, setFeedbacks] = useState([
    { 
      id: 1, 
      serviceCategory: 'Water Supply', 
      feedbackType: 'complaint', 
      description: 'Water supply has been irregular for the past week.', 
      location: 'Downtown Area', 
      author: user?.name || 'Anonymous',
      status: 'Resolved',
      timestamp: Date.now() - 86400000,
      rating: { rating: 4, review: 'Issue was resolved quickly. Thank you!', ratedBy: user?.name || 'Anonymous' }
    },
    { 
      id: 2, 
      serviceCategory: 'Education', 
      feedbackType: 'appreciation', 
      description: 'The new library opening has been excellent for the community.', 
      location: 'City Center', 
      author: user?.name || 'Anonymous',
      status: 'Open',
      timestamp: Date.now() - 172800000 
    }
  ]);

  // Suggestions State
  const [suggestions, setSuggestions] = useState([
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
    },
    {
      id: 2,
      title: 'Free WiFi in Public Parks',
      description: 'Provide free WiFi access in all public parks to enhance community connectivity.',
      category: 'Technology',
      expectedBenefit: 'Improve digital access for all citizens and attract more visitors to parks.',
      author: 'Emily Chen',
      upvotes: 32,
      upvotedBy: [],
      comments: [],
      timestamp: Date.now() - 172800000
    }
  ]);

  const handleCreateIssue = (newIssue) => {
    // Use shared context to add issue - visible to politicians
    addIssue({
      ...newIssue,
      author: user?.name || 'Anonymous'
    });
  };

  const handleCreateFeedback = (newFeedback) => {
    const feedback = {
      id: Date.now(),
      ...newFeedback,
      author: user?.name || 'Anonymous',
      status: 'Open'
    };
    setFeedbacks([feedback, ...feedbacks]);
  };

  const handleRateFeedback = (feedbackId, rating) => {
    setFeedbacks(feedbacks.map(fb => 
      fb.id === feedbackId ? { ...fb, rating } : fb
    ));
  };

  const handleCreateSuggestion = (newSuggestion) => {
    const suggestion = {
      id: Date.now(),
      ...newSuggestion,
      author: user?.name || 'Anonymous'
    };
    setSuggestions([suggestion, ...suggestions]);
  };

  const handleUpvoteSuggestion = (suggestionId) => {
    setSuggestions(suggestions.map(sug => {
      if (sug.id === suggestionId) {
        const hasUpvoted = sug.upvotedBy.includes(user.id);
        return {
          ...sug,
          upvotes: hasUpvoted ? sug.upvotes - 1 : sug.upvotes + 1,
          upvotedBy: hasUpvoted 
            ? sug.upvotedBy.filter(id => id !== user.id)
            : [...sug.upvotedBy, user.id]
        };
      }
      return sug;
    }));
  };

  const handleCommentSuggestion = (suggestionId, comment) => {
    setSuggestions(suggestions.map(sug =>
      sug.id === suggestionId 
        ? { ...sug, comments: [...(sug.comments || []), comment] }
        : sug
    ));
  };

  // Calculate statistics
  const stats = {
    total: issues.length,
    pending: issues.filter(i => i.status === 'Open' || i.status === 'In Progress').length,
    solved: issues.filter(i => i.status === 'Resolved').length,
    open: issues.filter(i => i.status === 'Open').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length
  };

  // Category statistics
  const categoryData = [
    { label: 'Roads', value: issues.filter(i => i.category === 'Roads').length, color: '#ef4444' },
    { label: 'Water', value: issues.filter(i => i.category === 'Water').length, color: '#3b82f6' },
    { label: 'Sanitation', value: issues.filter(i => i.category === 'Sanitation').length, color: '#10b981' },
    { label: 'Infrastructure', value: issues.filter(i => i.category === 'Infrastructure').length, color: '#f59e0b' },
    { label: 'Parks', value: issues.filter(i => i.category === 'Parks').length, color: '#8b5cf6' },
    { label: 'Traffic', value: issues.filter(i => i.category === 'Traffic').length, color: '#06b6d4' },
    { label: 'Other', value: issues.filter(i => i.category === 'Other').length, color: '#64748b' }
  ].filter(cat => cat.value > 0);

  // Status statistics - updates when new issues arrive
  const statusData = [
    { label: 'Open', value: stats.open, color: '#f59e0b' },
    { label: 'In Progress', value: stats.inProgress, color: '#3b82f6' },
    { label: 'Resolved', value: stats.solved, color: '#10b981' }
  ];

  // Filter issues based on active tab
  const filteredIssues = issues.filter(issue => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return issue.status === 'Open' || issue.status === 'In Progress';
    if (activeTab === 'solved') return issue.status === 'Resolved';
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All Issues', count: issues.length },
    { id: 'pending', label: 'Pending', count: stats.pending },
    { id: 'solved', label: 'Solved', count: stats.solved }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Community Dashboard</h2>

      {/* Main Section Tabs */}
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
          { id: 'suggestions', label: '💡 Ideas', count: suggestions.length }
        ].map(section => (
          <button
            key={section.id}
            onClick={() => {
              setActiveSection(section.id);
              setActiveTab('all');
            }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'none',
              border: 'none',
              borderBottom: activeSection === section.id ? '3px solid var(--primary)' : '3px solid transparent',
              color: activeSection === section.id ? 'var(--primary)' : 'var(--text-muted)',
              fontWeight: activeSection === section.id ? '600' : '500',
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
            <span>{section.label}</span>
            <span style={{
              backgroundColor: activeSection === section.id ? 'var(--primary)' : 'var(--border)',
              color: activeSection === section.id ? 'white' : 'var(--text-muted)',
              padding: '0.15rem 0.5rem',
              borderRadius: '1rem',
              fontSize: '0.85rem',
              fontWeight: '600'
            }}>
              {section.count}
            </span>
          </button>
        ))}
      </div>

      {/* Issues Section */}
      {activeSection === 'issues' && (
        <>
          {/* Analytics Cards */}
          <div className="analytics-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Total Issues</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.total}</div>
            </div>

            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              color: 'white',
              border: 'none',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Pending</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.pending}</div>
              <div style={{ fontSize: '0.75rem', opacity: '0.8', marginTop: '0.25rem' }}>
                Open: {stats.open} | In Progress: {stats.inProgress}
              </div>
            </div>

            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Solved</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.solved}</div>
            </div>

            <div className="card" style={{ 
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '1.25rem'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Success Rate</div>
              <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>
                {stats.total > 0 ? Math.round((stats.solved / stats.total) * 100) : 0}%
              </div>
            </div>
          </div>

          {/* Charts Grid - Updates when new issues arrive */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Category Chart */}
            {categoryData.length > 0 && (
              <div className="card">
                <BarChart data={categoryData} title="Issues by Category" height={200} />
              </div>
            )}

            {/* Status Chart */}
            <div className="card">
              <BarChart data={statusData} title="Issues by Status" height={200} />
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
            {tabs.map(tab => (
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="responsive-grid-2">
            {/* Left Column: Feed */}
            <div>
              {filteredIssues.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ color: 'var(--text-muted)' }}>No issues found in this category.</p>
                </div>
              ) : (
                filteredIssues.map(issue => (
                  <IssueCard key={issue.id} issue={issue} />
                ))
              )}
            </div>

            {/* Right Column: Actions */}
            <div>
              <IssueForm onSubmit={handleCreateIssue} />
            </div>
          </div>
        </>
      )}

      {/* Feedback Section */}
      {activeSection === 'feedback' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="responsive-grid-2">
          {/* Left Column: Feedback List */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>My Feedback</h3>
            <FeedbackList feedbacks={feedbacks} onRate={handleRateFeedback} />
          </div>

          {/* Right Column: Submit Feedback */}
          <div>
            <FeedbackForm onSubmit={handleCreateFeedback} />
          </div>
        </div>
      )}

      {/* Suggestions Section */}
      {activeSection === 'suggestions' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="responsive-grid-2">
          {/* Left Column: Ideas Feed */}
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>
              Community Ideas ({suggestions.length})
            </h3>
            {suggestions.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                <p style={{ color: 'var(--text-muted)' }}>No suggestions yet. Be the first to share an idea!</p>
              </div>
            ) : (
              suggestions
                .sort((a, b) => b.upvotes - a.upvotes)
                .map(suggestion => (
                  <SuggestionCard 
                    key={suggestion.id} 
                    suggestion={suggestion}
                    onUpvote={handleUpvoteSuggestion}
                    onComment={handleCommentSuggestion}
                  />
                ))
            )}
          </div>

          {/* Right Column: Submit Idea */}
          <div>
            <SuggestionForm onSubmit={handleCreateSuggestion} />
          </div>
        </div>
      )}
    </div>
  );
}
