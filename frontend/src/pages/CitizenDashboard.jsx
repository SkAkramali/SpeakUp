import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueForm from '../components/IssueForm';
import IssueCard from '../components/IssueCard';

export default function CitizenDashboard() {
  const { user } = useAuth();

  // Mock Data
  const [issues, setIssues] = useState([
    { id: 1, title: 'Street Light Broken', description: 'The street light on 5th Avenue is flickering.', status: 'Open', author: 'Jane Doe', timestamp: Date.now() - 86400000 },
    { id: 2, title: 'Garbage Collection Delayed', description: 'Trash has not been picked up for 2 weeks.', status: 'In Progress', author: 'John Smith', timestamp: Date.now() - 172800000 }
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

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Community Issues</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Column: Feed */}
        <div>
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {/* Right Column: Actions */}
        <div>
          <IssueForm onSubmit={handleCreateIssue} />
        </div>
      </div>
    </div>
  );
}
