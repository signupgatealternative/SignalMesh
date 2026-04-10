'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function EmailRiskCheckerPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, toolType: 'emailRisk' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Check failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Email Risk Checker"
          subtitle="Detect risky email addresses, disposable services, spam providers, and fraud patterns in real-time."
        />

        <ToolSection title="Check Email Address">
          <ToolInput
            label="Email Address"
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />
          <ToolButton onClick={handleCheck} disabled={!email || loading} loading={loading}>
            {loading ? 'Analyzing...' : 'Analyze Email'}
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <>
            <ToolSection title="Email Risk Analysis">
              <ToolResult
                status={result.riskScore > 70 ? 'danger' : result.riskScore > 40 ? 'warning' : 'success'}
                title={`Email Risk Score: ${result.riskScore}%`}
                description={result.summary}
                details={{
                  'Disposable Service': result.isDisposable ? 'Detected' : 'Clean',
                  'Domain Reputation': result.domainReputation || 'Good Standing',
                  'Spam Provider': result.isSpam ? 'Flagged' : 'Not Flagged',
                  'Email Verifiable': result.canVerify ? 'Yes' : 'No',
                  'Domain Age': result.domainAge || 'Unknown',
                  'Bounce Rate': result.bounceRate || 'Unknown',
                }}
                recommendations={[
                  'Require email verification for high-risk addresses',
                  'Implement SMTP validation and MX record checks',
                  'Monitor for disposable email domains',
                  'Use double opt-in confirmation process',
                  'Track bounce rates and unsubscribe patterns',
                ]}
              />
            </ToolSection>

            <ToolSection title="Email Indicators">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
              }}>
                {[
                  { label: 'Domain Reputation', value: result.domainReputation || 'Good', icon: '🌐' },
                  { label: 'Account Age', value: result.accountAge || 'New', icon: '⏰' },
                  { label: 'Verification Status', value: result.canVerify ? 'Verifiable' : 'Unverifiable', icon: '✓' },
                  { label: 'Risk Level', value: result.riskScore > 70 ? 'High' : result.riskScore > 40 ? 'Medium' : 'Low', icon: '⚠️' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '20px',
                    backgroundColor: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{item.icon}</div>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.8rem', margin: '0 0 4px' }}>{item.label}</p>
                    <h4 style={{ color: 'var(--text)', margin: 0, fontSize: '0.95rem', fontWeight: '600' }}>{item.value}</h4>
                  </div>
                ))}
              </div>
            </ToolSection>
          </>
        )}

        {result?.error && (
          <ToolSection title="Analysis Error">
            <ToolResult status="danger" title="Check Failed" description={result.error} />
          </ToolSection>
        )}

        <ToolSection title="Why Email Risk Matters">
          <p style={{ color: 'var(--text-2)', lineHeight: '1.75', marginBottom: '24px' }}>
            Email addresses are a primary vector for signup fraud. Disposable email services, spam providers, and bot-controlled accounts can bypass traditional verification methods.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {[
              { title: 'Disposable Services', desc: 'Temporary email providers create accounts that disappear after minutes' },
              { title: 'Spam Traps', desc: 'Honeypot addresses that catch senders without proper list hygiene' },
              { title: 'Bot Accounts', desc: 'Automated systems generating thousands of fraudulent signups daily' },
            ].map((item) => (
              <div key={item.title} style={{
                padding: '24px',
                backgroundColor: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
              }}>
                <h4 style={{ color: 'var(--text)', margin: '0 0 8px', fontSize: '0.95rem', fontWeight: '700' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-2)', margin: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ToolSection>
      </main>
      <Footer />
    </>
  );
}
