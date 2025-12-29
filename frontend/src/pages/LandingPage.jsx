export default function LandingPage() {
  return (
    <div style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)' }}>
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 0 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(14, 165, 233, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              borderRadius: '50px',
              marginBottom: '2rem',
              border: '1px solid rgba(79, 70, 229, 0.2)'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🇮🇳</span>
              <span style={{ 
                fontSize: '0.9rem', 
                fontWeight: '600',
                color: 'var(--primary)'
              }}>
                Empowering Indian Communities
              </span>
            </div>

            {/* Main Heading */}
            <h1 style={{ 
              fontSize: '4rem',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Connect. Report.<br />Transform Your City.
            </h1>

            {/* Subheading */}
            <p style={{ 
              fontSize: '1.25rem',
              lineHeight: '1.8',
              color: 'var(--text-muted)',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              fontWeight: '400'
            }}>
              Your voice matters. Report civic issues, track resolutions in real-time, 
              and connect directly with local government officials across India.
            </p>

            {/* CTA Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '4rem'
            }}>
              <a 
                href="/register" 
                className="btn btn-primary" 
                style={{ 
                  padding: '1rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(79, 70, 229, 0.3)';
                }}
              >
                Start Reporting Issues
              </a>
              <a 
                href="/about" 
                className="btn" 
                style={{ 
                  padding: '1rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  border: '2px solid var(--border)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.borderColor = 'var(--primary)';
                  e.target.style.color = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.target.style.borderColor = 'var(--border)';
                  e.target.style.color = 'inherit';
                }}
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '2rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>10K+</div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-muted)',
                  fontWeight: '500'
                }}>Active Citizens</div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>5K+</div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-muted)',
                  fontWeight: '500'
                }}>Issues Resolved</div>
              </div>
              <div>
                <div style={{ 
                  fontSize: '2.5rem', 
                  fontWeight: '800',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>150+</div>
                <div style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-muted)',
                  fontWeight: '500'
                }}>Cities Covered</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ 
        padding: '6rem 0',
        backgroundColor: 'white'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1rem',
              color: 'var(--text-main)'
            }}>
              How CiviConnect Works
            </h2>
            <p style={{ 
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Simple, transparent, and effective civic engagement
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1100px',
            margin: '0 auto'
          }}>
            {/* Feature 1 */}
            <div style={{
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'white',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.8rem'
              }}>
                📝
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--text-main)'
              }}>
                Report Issues
              </h3>
              <p style={{ 
                color: 'var(--text-muted)',
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Easily report civic problems like potholes, street lights, water supply issues, and more with photos and location.
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'white',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.8rem'
              }}>
                🔄
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--text-main)'
              }}>
                Track Progress
              </h3>
              <p style={{ 
                color: 'var(--text-muted)',
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Monitor your reported issues in real-time from submission to resolution with status updates and notifications.
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{
              padding: '2rem',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border)',
              backgroundColor: 'white',
              transition: 'all 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = 'var(--border)';
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                fontSize: '1.8rem'
              }}>
                💬
              </div>
              <h3 style={{ 
                fontSize: '1.3rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: 'var(--text-main)'
              }}>
                Direct Communication
              </h3>
              <p style={{ 
                color: 'var(--text-muted)',
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Connect directly with MLAs, corporators, and municipal officials. Get responses and updates on your concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 0',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(100px)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 style={{ 
              fontSize: '3rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Ready to Make a Difference?
            </h2>
            <p style={{ 
              fontSize: '1.2rem',
              marginBottom: '2.5rem',
              opacity: '0.95',
              lineHeight: '1.7'
            }}>
              Join thousands of citizens across India who are actively improving their communities. 
              Start reporting issues today and be the change you want to see.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="/register" 
                className="btn" 
                style={{ 
                  padding: '1rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  color: 'var(--primary)',
                  border: 'none',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
                }}
              >
                Create Free Account
              </a>
              <a 
                href="/login" 
                className="btn" 
                style={{ 
                  padding: '1rem 2.5rem',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  transition: 'all 0.3s'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = 'white';
                  e.target.style.color = 'var(--primary)';
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = 'white';
                }}
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
