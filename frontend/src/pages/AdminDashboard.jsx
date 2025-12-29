import { useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Jane Doe', role: 'citizen', email: 'jane@example.com' },
    { id: 2, name: 'John Smith', role: 'politician', email: 'john@example.com' },
    { id: 3, name: 'Admin User', role: 'admin', email: 'admin@speakup.com' }
  ]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>System Administration</h2>

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
