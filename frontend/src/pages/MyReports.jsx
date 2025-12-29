import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import IssueCard from '../components/IssueCard';

export default function MyReports() {
  const { user } = useAuth();

  // Mock Data - showing only user's reports
  const [myReports] = useState([
    { 
      id: 1, 
      title: 'Street Light Broken', 
      description: 'The street light on 5th Avenue is flickering and needs replacement.', 
      status: 'Open', 
      author: user?.name || 'You', 
      timestamp: Date.now() - 86400000 
    },
    { 
      id: 2, 
      title: 'Pothole on Main Street', 
      description: 'Large pothole causing traffic issues near the intersection.', 
      status: 'In Progress', 
      author: user?.name || 'You', 
      timestamp: Date.now() - 172800000 
    },
    { 
      id: 3, 
      title: 'Park Bench Needs Repair', 
      description: 'Several benches in Central Park are broken and unsafe.', 
      status: 'Resolved', 
      author: user?.name || 'You', 
      timestamp: Date.now() - 604800000 
    }
  ]);

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>My Reports</h2>
      
      {myReports.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '1rem' }}>
            You haven't submitted any reports yet.
          </p>
          <a href="/citizen" className="btn btn-primary" style={{ display: 'inline-block' }}>
            Submit Your First Report
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {myReports.map(report => (
            <IssueCard key={report.id} issue={report} />
          ))}
        </div>
      )}
      
      <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Report Status Guide</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#f59e0b' 
            }}></span>
            <span style={{ color: 'var(--text-muted)' }}><strong>Open:</strong> Report submitted and under review</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#3b82f6' 
            }}></span>
            <span style={{ color: 'var(--text-muted)' }}><strong>In Progress:</strong> Being worked on by officials</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              borderRadius: '50%', 
              backgroundColor: '#10b981' 
            }}></span>
            <span style={{ color: 'var(--text-muted)' }}><strong>Resolved:</strong> Issue has been fixed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
