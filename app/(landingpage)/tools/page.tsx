'use client';

import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

const tools = [
  {
    category: 'Security Analysis',
    items: [
      { name: 'Vulnerability Scanner', href: '/tools/vulnerability-scanner', desc: 'Scan for security vulnerabilities and misconfigurations' },
      { name: 'CAPTCHA Checker', href: '/tools/captcha-checker', desc: 'Detect CAPTCHA protection effectiveness' },
      { name: 'Rate Limit Tester', href: '/tools/rate-limit-tester', desc: 'Test rate limiting and brute force protection' },
      { name: 'Brute Force Tester', href: '/tools/brute-force-tester', desc: 'Simulate brute force attacks on login endpoints' },
    ],
  },
  {
    category: 'Attack Simulation',
    items: [
      { name: 'Bot Attack Simulator', href: '/tools/bot-attack-simulator', desc: 'Simulate different bot attack patterns' },
      { name: 'Fraud Simulator', href: '/tools/fraud-simulator', desc: 'Simulate fraudulent signup attempts' },
      { name: 'Credential Stuffing Tester', href: '/tools/credential-stuffing-tester', desc: 'Test protection against credential reuse attacks' },
    ],
  },
  {
    category: 'Email & Identity',
    items: [
      { name: 'Email Risk Checker', href: '/tools/email-risk-checker', desc: 'Analyze email addresses for fraud risk' },
      { name: 'Email Reputation', href: '/tools/email-reputation', desc: 'Check domain reputation and email infrastructure' },
      { name: 'Disposable Email Detector', href: '/tools/disposable-email-detector', desc: 'Detect temporary email services' },
      { name: 'Domain Risk Analyzer', href: '/tools/domain-risk-analyzer', desc: 'Analyze domain for phishing and malware risk' },
    ],
  },
  {
    category: 'IP & Network',
    items: [
      { name: 'IP Intelligence', href: '/tools/ip-intelligence', desc: 'Analyze IP geolocation and reputation' },
      { name: 'Proxy/VPN Detector', href: '/tools/proxy-vpn-detector', desc: 'Detect proxy and VPN services' },
      { name: 'Device Fingerprinting', href: '/tools/device-fingerprinting', desc: 'Generate and analyze device fingerprints' },
    ],
  },
  {
    category: 'Analysis & Detection',
    items: [
      { name: 'Signup Score', href: '/tools/signup-score', desc: 'Calculate comprehensive signup risk score' },
      { name: 'Bot Score Analyzer', href: '/tools/bot-score-analyzer', desc: 'Analyze probability of bot account' },
      { name: 'Velocity Analyzer', href: '/tools/velocity-analyzer', desc: 'Detect rapid signup patterns' },
      { name: 'Session Analyzer', href: '/tools/session-analyzer', desc: 'Analyze session for hijacking and abuse' },
      { name: 'Traffic Analyzer', href: '/tools/traffic-analyzer', desc: 'Analyze traffic patterns for DDoS and bots' },
      { name: 'Risk Dashboard', href: '/tools/risk-dashboard', desc: 'Comprehensive risk assessment overview' },
      { name: 'CSRF Token Validator', href: '/tools/csrf-token-validator', desc: 'Validate CSRF token implementation' },
      { name: 'Honeypot Detector', href: '/tools/honeypot-detector', desc: 'Detect honeypot fields in forms' },
      { name: 'WAF Detector', href: '/tools/waf-detector', desc: 'Identify Web Application Firewall' },
    ],
  },
];

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px', minHeight: 'calc(100vh - 80px)' }}>
        <section style={{ padding: '80px 48px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              border: '1px solid rgba(0, 196, 138, 0.3)',
              background: 'var(--shield-light)',
              borderRadius: '100px',
              padding: '5px 14px',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.03em',
              color: 'var(--shield-mid)',
              marginBottom: '28px',
            }}>
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--shield)',
                animation: 'pulseDot 1.5s ease-in-out infinite',
              }} />
              Tools
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              letterSpacing: '-0.035em',
              marginBottom: '16px',
              color: 'var(--text)',
              fontFamily: '"Outfit", sans-serif',
            }}>
              22 Security Tools
            </h1>

            <p style={{
              fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
              color: 'var(--text-2)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.75',
            }}>
              Free tools to test, analyze, and improve your signup security. No authentication required.
            </p>
          </div>

          {tools.map((category) => (
            <div key={category.category} style={{ marginBottom: '80px' }}>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '800',
                marginBottom: '36px',
                color: 'var(--text)',
                fontFamily: '"Outfit", sans-serif',
              }}>
                {category.category}
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px',
              }}>
                {category.items.map((tool) => (
                  <a
                    key={tool.name}
                    href={tool.href}
                    style={{
                      display: 'block',
                      padding: '24px',
                      backgroundColor: 'var(--surface)',
                      border: '1.5px solid var(--border)',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      transition: 'all 0.3s',
                      cursor: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--shield)';
                      e.currentTarget.style.backgroundColor = 'var(--shield-light)';
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = '0 12px 32px rgba(15, 17, 23, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.backgroundColor = 'var(--surface)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <h3 style={{
                      fontSize: '1rem',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: 'var(--text)',
                      fontFamily: '"Outfit", sans-serif',
                    }}>
                      {tool.name}
                    </h3>
                    <p style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-2)',
                      lineHeight: '1.6',
                      margin: 0,
                    }}>
                      {tool.desc}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: '80px',
            padding: '40px',
            backgroundColor: 'var(--shield-light)',
            borderRadius: '14px',
            border: '1.5px solid rgba(0, 196, 138, 0.15)',
            textAlign: 'center',
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '12px',
              color: 'var(--text)',
              fontFamily: '"Outfit", sans-serif',
            }}>
              Built for developers
            </h2>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--text-2)',
              marginBottom: '24px',
              maxWidth: '500px',
              margin: '0 auto 24px',
            }}>
              All tools are free to use and don't require authentication. Use them to test your security, understand threats, and improve your defenses.
            </p>
            <a
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'var(--text)',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '0.88rem',
                fontFamily: '"Outfit", sans-serif',
              }}
            >
              Back to Home
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
