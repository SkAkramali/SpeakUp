import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/IssueCard';
import UpdateForm from '../components/UpdateForm';
import FeedbackList from '../components/FeedbackList';
import SuggestionCard from '../components/SuggestionCard';
import StarRating from '../components/StarRating';
import BarChart from '../components/BarChart';

export default function PoliticianDashboard() {
  const { user, sharedIssues, updateIssueStatus, addIssueResponse } = useAuth();
  const [activeTab, setActiveTab] = useState('issues');

  // Use shared issues from context - visible across all dashboards
  const issues = sharedIssues || [];

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

  // Handle status change for issues - uses shared context
  const handleStatusChange = (issueId, newStatus) => {
    updateIssueStatus(issueId, newStatus);
  };

  // Handle adding feedback/response to an issue - uses shared context
  const handleAddResponse = (issueId, response) => {
    addIssueResponse(issueId, response, user?.name || 'Representative');
  };

  // Calculate issue statistics
  const issueStats = {
    total: issues.length,
    open: issues.filter(i => i.status === 'Open').length,
    inProgress: issues.filter(i => i.status === 'In Progress').length,
    resolved: issues.filter(i => i.status === 'Resolved').length
  };

  // Issue status chart data - updates dynamically
  const issueStatusChartData = [
    { label: 'Open', value: issueStats.open, color: '#f59e0b' },
    { label: 'In Progress', value: issueStats.inProgress, color: '#3b82f6' },
    { label: 'Resolved', value: issueStats.resolved, color: '#10b981' }
  ];

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    autoResponseEnabled: false,
    responseTemplate: 'Thank you for reporting this issue. We are looking into it.',
    priorityCategories: ['Infrastructure', 'Water', 'Roads'],
    workingHours: '9:00 AM - 5:00 PM'
  });

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
    console.log('Saved settings:', settings);
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
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{issueStats.total}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Open Issues</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{issueStats.open}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>In Progress</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{issueStats.inProgress}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          padding: '1.25rem'
        }}>
          <div style={{ fontSize: '0.85rem', opacity: '0.9', marginBottom: '0.5rem' }}>Resolved</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{issueStats.resolved}</div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
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
      </div>

      {/* Issue Status Chart */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <BarChart data={issueStatusChartData} title="Issues by Status (Updates when status changes)" height={200} />
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
          { id: 'updates', label: '📢 My Updates', count: updates.length },
          { id: 'settings', label: '⚙️ Settings', count: null }
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
            {tab.count !== null && (
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
            )}
          </button>
        ))}
      </div>

      {/* Issues Tab */}
      {activeTab === 'issues' && (
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-main)' }}>Citizen Issues</h3>
          {issues.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: 'var(--text-muted)' }}>No issues to review at the moment.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {issues.map(issue => (
                <div key={issue.id} className="card" style={{ padding: '1.25rem' }}>
                  {/* Issue Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                    <div>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.25rem' }}>{issue.title}</h4>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        backgroundColor: '#e0e7ff', 
                        color: '#4338ca', 
                        padding: '0.2rem 0.5rem', 
                        borderRadius: '0.25rem' 
                      }}>
                        {issue.category || 'General'}
                      </span>
                    </div>
                    {/* Status Dropdown */}
                    <select
                      value={issue.status}
                      onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                      style={{
                        padding: '0.5rem 1rem',
                        borderRadius: '0.5rem',
                        border: '2px solid',
                        borderColor: issue.status === 'Resolved' ? '#10b981' : issue.status === 'In Progress' ? '#3b82f6' : '#f59e0b',
                        backgroundColor: issue.status === 'Resolved' ? '#d1fae5' : issue.status === 'In Progress' ? '#dbeafe' : '#fef3c7',
                        color: issue.status === 'Resolved' ? '#065f46' : issue.status === 'In Progress' ? '#1e40af' : '#92400e',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      <option value="Open">🔴 Open</option>
                      <option value="In Progress">🔵 In Progress</option>
                      <option value="Resolved">🟢 Resolved</option>
                    </select>
                  </div>

                  {/* Description */}
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: '1.6' }}>{issue.description}</p>

                  {/* Issue Image */}
                  {issue.image && (
                    <div style={{ marginBottom: '1rem' }}>
                      <img 
                        src={issue.image} 
                        alt="Issue" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '300px', 
                          borderRadius: '0.5rem',
                          border: '1px solid var(--border)'
                        }} 
                      />
                    </div>
                  )}

                  {/* Meta Info */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <span>Reported by: <strong>{issue.author}</strong></span>
                    <span>{new Date(issue.timestamp).toLocaleDateString()}</span>
                  </div>

                  {/* Politician Response Section */}
                  {issue.politicianResponse ? (
                    <div style={{ 
                      backgroundColor: '#f0fdf4', 
                      border: '1px solid #86efac', 
                      borderRadius: '0.5rem', 
                      padding: '1rem',
                      marginTop: '0.5rem'
                    }}>
                      <div style={{ fontWeight: '600', color: '#166534', marginBottom: '0.5rem' }}>✓ Your Response:</div>
                      <p style={{ color: '#14532d', fontSize: '0.9rem' }}>{issue.politicianResponse}</p>
                    </div>
                  ) : (
                    <div style={{ marginTop: '0.5rem' }}>
                      <textarea
                        placeholder="Add your feedback/response to this issue..."
                        id={`response-${issue.id}`}
                        rows="2"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          border: '1px solid var(--border)',
                          borderRadius: '0.5rem',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          marginBottom: '0.5rem'
                        }}
                      />
                      <button
                        onClick={() => {
                          const textarea = document.getElementById(`response-${issue.id}`);
                          if (textarea.value.trim()) {
                            handleAddResponse(issue.id, textarea.value);
                            textarea.value = '';
                          }
                        }}
                        style={{
                          padding: '0.5rem 1rem',
                          backgroundColor: 'var(--primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontWeight: '500'
                        }}
                      >
                        Submit Response
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
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

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)' }}>Dashboard Settings</h3>
          
          <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px' }}>
            {/* Notification Settings */}
            <div className="card">
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>🔔 Notification Settings</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={settings.emailNotifications}
                    onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span>Email Notifications for New Issues</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={settings.smsNotifications}
                    onChange={(e) => handleSettingChange('smsNotifications', e.target.checked)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span>SMS Notifications for Urgent Issues</span>
                </label>
              </div>
            </div>

            {/* Auto Response Settings */}
            <div className="card">
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>🤖 Auto Response</h4>
              
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', marginBottom: '1rem' }}>
                <input
                  type="checkbox"
                  checked={settings.autoResponseEnabled}
                  onChange={(e) => handleSettingChange('autoResponseEnabled', e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span>Enable Auto Response for New Issues</span>
              </label>

              {settings.autoResponseEnabled && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                    Response Template:
                  </label>
                  <textarea
                    value={settings.responseTemplate}
                    onChange={(e) => handleSettingChange('responseTemplate', e.target.value)}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid var(--border)',
                      borderRadius: '0.5rem',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>
              )}
            </div>

            {/* Working Hours */}
            <div className="card">
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>🕐 Working Hours</h4>
              
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', fontSize: '0.9rem' }}>
                  Available Hours:
                </label>
                <input
                  type="text"
                  value={settings.workingHours}
                  onChange={(e) => handleSettingChange('workingHours', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid var(--border)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                  placeholder="e.g., 9:00 AM - 5:00 PM"
                />
              </div>
            </div>

            {/* Priority Categories */}
            <div className="card">
              <h4 style={{ marginBottom: '1rem', fontWeight: '600' }}>⚡ Priority Categories</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                Select categories you want to prioritize:
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Infrastructure', 'Water', 'Roads', 'Sanitation', 'Parks', 'Traffic', 'Education', 'Healthcare'].map(cat => (
                  <label 
                    key={cat}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem', 
                      padding: '0.5rem 1rem',
                      backgroundColor: settings.priorityCategories.includes(cat) ? '#dbeafe' : '#f3f4f6',
                      border: `2px solid ${settings.priorityCategories.includes(cat) ? '#3b82f6' : 'transparent'}`,
                      borderRadius: '2rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={settings.priorityCategories.includes(cat)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleSettingChange('priorityCategories', [...settings.priorityCategories, cat]);
                        } else {
                          handleSettingChange('priorityCategories', settings.priorityCategories.filter(c => c !== cat));
                        }
                      }}
                      style={{ display: 'none' }}
                    />
                    <span style={{ fontWeight: settings.priorityCategories.includes(cat) ? '600' : '400' }}>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSaveSettings}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1rem',
                width: 'fit-content'
              }}
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
