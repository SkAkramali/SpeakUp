import { useState } from 'react';
import BarChart from '../components/BarChart';

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Doe', role: 'citizen', email: 'jane@example.com' },
    { id: 2, name: 'John Smith', role: 'politician', email: 'john@example.com' },
    { id: 3, name: 'Admin User', role: 'admin', email: 'admin@speakup.com' },
    { id: 4, name: 'Sarah Wilson', role: 'citizen', email: 'sarah@example.com' },
    { id: 5, name: 'Mike Johnson', role: 'moderator', email: 'mike@example.com' },
    { id: 6, name: 'Emily Brown', role: 'politician', email: 'emily@example.com' },
    { id: 7, name: 'David Lee', role: 'citizen', email: 'david@example.com' },
    { id: 8, name: 'Lisa Anderson', role: 'moderator', email: 'lisa@example.com' },
    { id: 9, name: 'Tom Garcia', role: 'citizen', email: 'tom@example.com' },
    { id: 10, name: 'Anna Martinez', role: 'politician', email: 'anna@example.com' }
  ]);

  // Issue tracking state - updates when new issues arrive
  const [issueStats, setIssueStats] = useState({
    open: 45,
    inProgress: 32,
    resolved: 78,
    closed: 23
  });

  // Calculate statistics
  const stats = {
    totalUsers: users.length,
    citizens: users.filter(u => u.role === 'citizen').length,
    politicians: users.filter(u => u.role === 'politician').length,
    moderators: users.filter(u => u.role === 'moderator').length,
    admins: users.filter(u => u.role === 'admin').length,
    totalIssues: issueStats.open + issueStats.inProgress + issueStats.resolved + issueStats.closed
  };

  // Chart data
  const userRoleData = [
    { label: 'Citizens', value: stats.citizens, color: '#3b82f6' },
    { label: 'Politicians', value: stats.politicians, color: '#8b5cf6' },
    { label: 'Moderators', value: stats.moderators, color: '#10b981' },
    { label: 'Admins', value: stats.admins, color: '#f59e0b' }
  ];

  // Dynamic issue status data - updates when issueStats changes
  const issueStatusData = [
    { label: 'Open', value: issueStats.open, color: '#f59e0b' },
    { label: 'In Progress', value: issueStats.inProgress, color: '#3b82f6' },
    { label: 'Resolved', value: issueStats.resolved, color: '#10b981' },
    { label: 'Closed', value: issueStats.closed, color: '#64748b' }
  ];

  const monthlyActivityData = [
    { label: 'Jan', value: 65, color: '#4f46e5' },
    { label: 'Feb', value: 78, color: '#4f46e5' },
    { label: 'Mar', value: 90, color: '#4f46e5' },
    { label: 'Apr', value: 81, color: '#4f46e5' },
    { label: 'May', value: 95, color: '#4f46e5' },
    { label: 'Jun', value: 110, color: '#4f46e5' }
  ];

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  // Function to handle new issue arrival - updates the chart count
  const handleNewIssue = () => {
    setIssueStats(prev => ({
      ...prev,
      open: prev.open + 1
    }));
  };

  // Function to update issue status - updates the chart
  const handleStatusChange = (fromStatus, toStatus) => {
    setIssueStats(prev => ({
      ...prev,
      [fromStatus]: Math.max(0, prev[fromStatus] - 1),
      [toStatus]: prev[toStatus] + 1
    }));
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>System Administration</h2>

      {/* Statistics Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '0.5rem' }}>Total Users</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.totalUsers}</div>
          <div style={{ fontSize: '0.85rem', opacity: '0.8', marginTop: '0.5rem' }}>
            All registered users
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '0.5rem' }}>Citizens</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.citizens}</div>
          <div style={{ fontSize: '0.85rem', opacity: '0.8', marginTop: '0.5rem' }}>
            Active community members
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '0.5rem' }}>Politicians</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.politicians}</div>
          <div style={{ fontSize: '0.85rem', opacity: '0.8', marginTop: '0.5rem' }}>
            Elected officials
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none'
        }}>
          <div style={{ fontSize: '0.9rem', opacity: '0.9', marginBottom: '0.5rem' }}>Moderators</div>
          <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{stats.moderators}</div>
          <div style={{ fontSize: '0.85rem', opacity: '0.8', marginTop: '0.5rem' }}>
            Content moderators
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card">
          <BarChart data={userRoleData} title="Users by Role" height={280} />
        </div>

        <div className="card">
          <BarChart data={issueStatusData} title="Issues by Status" height={280} />
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <BarChart data={monthlyActivityData} title="Monthly User Activity (Last 6 Months)" height={300} />
      </div>

      {/* System Metrics */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div className="card" style={{ backgroundColor: '#fef3c7', border: '1px solid #fde047' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#92400e', marginBottom: '0.5rem' }}>
                Open Issues
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#78350f' }}>{issueStats.open}</div>
            </div>
            <div style={{ fontSize: '2.5rem' }}>📋</div>
          </div>
          <button 
            onClick={handleNewIssue}
            style={{
              marginTop: '0.75rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '500'
            }}
          >
            + Simulate New Issue
          </button>
        </div>

        <div className="card" style={{ backgroundColor: '#dbeafe', border: '1px solid #93c5fd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '0.5rem' }}>
                Active Sessions
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e40af' }}>127</div>
            </div>
            <div style={{ fontSize: '2.5rem' }}>👥</div>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#dcfce7', border: '1px solid #86efac' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#14532d', marginBottom: '0.5rem' }}>
                Resolution Rate
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#15803d' }}>
                {stats.totalIssues > 0 ? Math.round((issueStats.resolved / stats.totalIssues) * 100) : 0}%
              </div>
            </div>
            <div style={{ fontSize: '2.5rem' }}>✅</div>
          </div>
        </div>

        <div className="card" style={{ backgroundColor: '#f3e8ff', border: '1px solid #d8b4fe' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#581c87', marginBottom: '0.5rem' }}>
                Avg Response Time
              </div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: '#6b21a8' }}>2.3h</div>
            </div>
            <div style={{ fontSize: '2.5rem' }}>⏱️</div>
          </div>
        </div>
      </div>

      {/* User Management Table */}
      <div className="card">
        <h3 style={{ marginBottom: '1rem' }}>User Management</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem' }}>Name</th>
              <th style={{ padding: '0.75rem' }}>Role</th>
              <th style={{ padding: '0.75rem' }}>Email</th>
              <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.75rem' }}>{user.name}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '1rem',
                    fontSize: '0.8rem',
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)'
                  }}>
                    {user.role}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', color: 'var(--text-muted)' }}>{user.email}</td>
                <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                  <button
                    onClick={() => handleDelete(user.id)}
                    style={{ color: 'var(--danger)', fontWeight: '500' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
