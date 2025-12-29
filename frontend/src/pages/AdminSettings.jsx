import { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    siteName: 'CiviConnect',
    siteEmail: 'admin@civiconnect.in',
    supportEmail: 'support@civiconnect.in',
    maxReportsPerDay: 10,
    enableEmailNotifications: true,
    enableSMSNotifications: false,
    autoModeration: true,
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true
  });

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
    console.log('Saved settings:', settings);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>System Settings</h2>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* General Settings */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: '600' }}>
            General Settings
          </h3>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => handleChange('siteName', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Admin Email
              </label>
              <input
                type="email"
                value={settings.siteEmail}
                onChange={(e) => handleChange('siteEmail', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                Max Reports Per User Per Day
              </label>
              <input
                type="number"
                value={settings.maxReportsPerDay}
                onChange={(e) => handleChange('maxReportsPerDay', parseInt(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border)',
                  fontSize: '1rem'
                }}
              />
            </div>
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="card">
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: '600' }}>
            Feature Settings
          </h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.enableEmailNotifications}
                onChange={(e) => handleChange('enableEmailNotifications', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Email Notifications</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Send email notifications to users
                </div>
              </div>
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.enableSMSNotifications}
                onChange={(e) => handleChange('enableSMSNotifications', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: '500' }}>SMS Notifications</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Send SMS alerts for critical updates
                </div>
              </div>
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.autoModeration}
                onChange={(e) => handleChange('autoModeration', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Auto Moderation</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Automatically filter inappropriate content
                </div>
              </div>
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.allowNewRegistrations}
                onChange={(e) => handleChange('allowNewRegistrations', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Allow New Registrations</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Enable new user sign-ups
                </div>
              </div>
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: 'var(--background)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => handleChange('requireEmailVerification', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Require Email Verification</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Users must verify email before posting
                </div>
              </div>
            </label>

            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1rem',
              backgroundColor: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
                style={{ width: '20px', height: '20px', cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontWeight: '500', color: '#991b1b' }}>Maintenance Mode</div>
                <div style={{ fontSize: '0.85rem', color: '#7f1d1d' }}>
                  Disable site access for maintenance
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
          <button
            onClick={handleSave}
            className="btn btn-primary"
            style={{ padding: '0.75rem 2rem' }}
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
