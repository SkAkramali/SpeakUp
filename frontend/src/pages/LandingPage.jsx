export default function LandingPage() {
  return (
    <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
        Bridge the Gap Between <br /> Citizens and Leaders
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
        SpeakUp provides a transparent platform for citizens to report issues and for politicians to engage with their constituents efficiently.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <a href="/register" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>Get Started</a>
        <a href="/login" className="btn" style={{ border: '1px solid var(--border)', padding: '0.75rem 1.5rem', fontSize: '1.1rem' }}>Login</a>
      </div>
    </div>
  );
}
