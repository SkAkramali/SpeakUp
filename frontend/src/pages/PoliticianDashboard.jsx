import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/IssueCard';
import UpdateForm from '../components/UpdateForm';

export default function PoliticianDashboard() {
  const { user } = useAuth();

  // Mock Data (Shared source ideally, but local for now)
  const [issues] = useState([
    { id: 1, title: 'Street Light Broken', description: 'The street light on 5th Avenue is flickering.', status: 'Open', author: 'Jane Doe', timestamp: Date.now() - 86400000 },
    { id: 2, title: 'Garbage Collection Delayed', description: 'Trash has not been picked up for 2 weeks.', status: 'In Progress', author: 'John Smith', timestamp: Date.now() - 172800000 }
  ]);

  const [updates, setUpdates] = useState([
    { id: 101, content: 'We are aware of the garbage collection delays. New trucks are arriving tomorrow.', timestamp: Date.now() - 3600000 }
  ]);

  const handlePostUpdate = (content) => {
    const newUpdate = {
      id: Date.now(),
      content,
      timestamp: Date.now()
    };
    setUpdates([newUpdate, ...updates]);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Representative Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Left: Citizen Issues to Review */}
        <div>
          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Citizen Issues</h3>
          {issues.map(issue => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        {/* Right: My Updates */}
        <div>
          <UpdateForm onSubmit={handlePostUpdate} />

          <h3 style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>Recent Updates</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {updates.map(update => (
              <div key={update.id} className="card" style={{ padding: '1rem' }}>
                <p style={{ marginBottom: '0.5rem' }}>{update.content}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Posted {new Date(update.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
