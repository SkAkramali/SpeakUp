export default function AboutUs() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '6rem 0',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '400px',
          height: '400px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Left Content */}
            <div>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.1',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
              }}>
                About CiviConnect
              </h1>
              <p style={{
                fontSize: '1.25rem',
                lineHeight: '1.8',
                opacity: '0.95',
                marginBottom: '2rem'
              }}>
                Empowering Indian communities to connect with local governance. 
                Report civic issues and track their resolution in real-time.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a 
                  href="/register" 
                  className="btn"
                  style={{
                    backgroundColor: 'white',
                    color: '#667eea',
                    padding: '0.875rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  Get Started
                </a>
                <a 
                  href="#learn-more" 
                  className="btn"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '0.875rem 2rem',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    border: '2px solid white',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#667eea';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.color = 'white';
                  }}
                >
                  Learn More
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div style={{ position: 'relative' }}>
              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                transform: 'rotate(2deg)',
                transition: 'transform 0.3s'
              }}>
                <img 
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop" 
                  alt="Community collaboration" 
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '12px',
                    display: 'block'
                  }}
                />
              </div>
              {/* Floating Stats */}
              <div style={{
                position: 'absolute',
                top: '20px',
                right: '-20px',
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                minWidth: '150px'
              }}>
                <div style={{ color: '#667eea', fontSize: '2rem', fontWeight: '800' }}>10K+</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Active Users</div>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '-30px',
                backgroundColor: 'white',
                padding: '1.5rem',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                minWidth: '150px'
              }}>
                <div style={{ color: '#764ba2', fontSize: '2rem', fontWeight: '800' }}>5K+</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Issues Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="card" style={{ maxWidth: '900px', margin: '0 auto' }} id="learn-more">
        
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Our Mission</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
            CiviConnect bridges the gap between Indian citizens and local government bodies. 
            We enable transparent civic participation through digital reporting of municipal issues, 
            real-time status tracking, and direct engagement with elected representatives.
          </p>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Key Features</h2>
          <ul style={{ color: 'var(--text-muted)', lineHeight: '1.7', paddingLeft: '1.5rem' }}>
            <li>Report civic issues like potholes, street lights, water supply problems</li>
            <li>Track issue resolution status in real-time</li>
            <li>Connect with local MLAs, corporators, and municipal officers</li>
            <li>Community-driven problem solving</li>
          </ul>
        </section>

        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Contact</h2>
          <div style={{ 
            backgroundColor: 'var(--background)', 
            padding: '1.5rem', 
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)'
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Email:</strong>
              <p style={{ color: 'var(--text-muted)' }}>contact@civiconnect.in</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <strong style={{ color: 'var(--text-main)' }}>Support:</strong>
              <p style={{ color: 'var(--text-muted)' }}>support@civiconnect.in</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-main)' }}>Phone:</strong>
              <p style={{ color: 'var(--text-muted)' }}>+91 1800-123-4567 (Toll Free)</p>
            </div>
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Join the Movement</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '1rem' }}>
            Be part of building a better India. Register today and make your community better!
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="/register" className="btn btn-primary">Get Started</a>
            <a href="/login" className="btn" style={{ backgroundColor: 'var(--background)', color: 'var(--text-main)' }}>
              Sign In
            </a>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
