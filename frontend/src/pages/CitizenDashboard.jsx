import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueForm from '../components/IssueForm';
import IssueCard from '../components/IssueCard';

export default function CitizenDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');

  // Mock Data
  const [issues, setIssues] = useState([
    { id: 1, title: 'Street Light Broken', description: 'The street light on 5th Avenue is flickering.', status: 'Open', author: 'Jane Doe', timestamp: Date.now() - 86400000 },
    { id: 2, title: 'Garbage Collection Delayed', description: 'Trash has not been picked up for 2 weeks.', status: 'In Progress', author: 'John Smith', timestamp: Date.now() - 172800000 },
    { id: 3, title: 'Pothole on Main Road', description: 'Large pothole causing accidents.', status: 'Resolved', author: 'Sarah Wilson', timestamp: Date.now() - 259200000 },
    { id: 4, title: 'Water Supply Issue', description: 'No water supply since morning.', status: 'Open', author: 'Mike Brown', timestamp: Date.now() - 43200000 },
    { id: 5, title: 'Park Maintenance Required', description: 'Park benches are broken.', status: 'Resolved', author: 'Emily Davis', timestamp: Date.now() - 432000000 }
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

  // Filter issues based on active tab
  const filteredIssues = issues.filter(issue => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return issue.status === 'Open' || issue.status === 'In Progress';
    if (activeTab === 'solved') return issue.status === 'Resolved';
    return true;
  });

  const tabs = [
    { id: 'all', label: 'All Issues', count: issues.length },
    { id: 'pending', label: 'Pending', count: issues.filter(i => i.status === 'Open' || i.status === 'In Progress').length },
    { id: 'solved', label: 'Solved', count: issues.filter(i => i.status === 'Resolved').length }
  ];

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Community Issues</h2>

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
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
