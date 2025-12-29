import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueForm from '../components/IssueForm';
import IssueCard from '../components/IssueCard';
import BarChart from '../components/BarChart';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // Mock Data with categories
  const [issues, setIssues] = useState([
    { id: 1, title: 'Street Light Broken', description: 'The street light on 5th Avenue is flickering.', status: 'Open', category: 'Infrastructure', author: 'Jane Doe', timestamp: Date.now() - 86400000 },
    { id: 2, title: 'Garbage Collection Delayed', description: 'Trash has not been picked up for 2 weeks.', status: 'In Progress', category: 'Sanitation', author: 'John Smith', timestamp: Date.now() - 172800000 },
    { id: 3, title: 'Pothole on Main Road', description: 'Large pothole causing accidents.', status: 'Resolved', category: 'Roads', author: 'Sarah Wilson', timestamp: Date.now() - 259200000 },
    { id: 4, title: 'Water Supply Issue', description: 'No water supply since morning.', status: 'Open', category: 'Water', author: 'Mike Brown', timestamp: Date.now() - 43200000 },
    { id: 5, title: 'Park Maintenance Required', description: 'Park benches are broken.', status: 'Resolved', category: 'Parks', author: 'Emily Davis', timestamp: Date.now() - 432000000 },
    { id: 6, title: 'Traffic Signal Not Working', description: 'Signal at junction is malfunctioning.', status: 'In Progress', category: 'Traffic', author: 'David Lee', timestamp: Date.now() - 86400000 },
    { id: 7, title: 'Drainage Blocked', description: 'Water logging due to blocked drainage.', status: 'Open', category: 'Sanitation', author: 'Anna Kumar', timestamp: Date.now() - 129600000 }
  ]);

  const handleCreateIssue = (newIssue) => {
    const issue = {
      id: Date.now(),
      ...newIssue,
      status: 'Open',
      author: user.name,
      timestamp: Date.now()
    };
    setIssues([issue, ...issues]);
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
    { label: 'Traffic', value: issues.filter(i => i.category === 'Traffic').length, color: '#06b6d4' }
  ].filter(cat => cat.value > 0);

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
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Community Issues Dashboard</h2>

      {/* Analytics Cards */}
      <div style={{ 
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

      {/* Category Chart */}
      {categoryData.length > 0 && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <BarChart data={categoryData} title="Issues by Category" height={200} />
        </div>
      )}

      {/* Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginBottom: '2rem',
        borderBottom: '2px solid var(--border)',
        paddingBottom: '0'
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
              gap: '0.5rem'
            }}
          >
            {tab.label}
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
    </div>
  );
}
