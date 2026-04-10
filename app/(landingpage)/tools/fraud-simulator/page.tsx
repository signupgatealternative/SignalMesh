'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function FraudSimulatorPage() {
  const [email, setEmail] = useState('');
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async () => {
    if (!email || !ip) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ip, toolType: 'fraud' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Simulation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Fraud Simulator"
          subtitle="Test fraud detection systems by simulating realistic fraudulent signup patterns and attack scenarios."
        />

        <ToolSection title="Configure Fraud Simulation">
          <ToolInput
            label="Email Address"
            placeholder="fraudster@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />
          <ToolInput
            label="IP Address"
            placeholder="203.0.113.42"
            value={ip}
            onChange={setIp}
            type="text"
            disabled={loading}
          />
          <ToolButton onClick={handleSimulate} disabled={!email || !ip || loading} loading={loading}>
            {loading ? 'Simulating...' : 'Start Fraud Simulation'}
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <>
            <ToolSection title="Fraud Detection Results">
              <ToolResult
                status={result.flagged ? 'danger' : 'success'}
                title={result.flagged ? 'Fraud Detected - Account Blocked' : 'Fraud Pattern Passed Detection'}
                description={result.summary}
                details={{
                  'Overall Risk Score': `${result.riskScore}%`,
                  'Email Risk Level': result.emailRisk || 'Medium',
                  'IP Risk Level': result.ipRisk || 'High',
                  'Detection Status': result.flagged ? 'Blocked' : 'Allowed',
                  'Confidence': `${result.confidence || 85}%`,
                  'Detection Time': `${result.detectionTime || '234'}ms`,
                }}
                recommendations={[
                  'Implement multi-step email verification with OTP',
                  'Monitor IP reputation using external threat intelligence',
                  'Add behavioral analysis to detect anomalous patterns',
                  'Implement device fingerprinting for account linking',
                  'Enable real-time transaction monitoring',
                  'Create fraud rules based on velocity and patterns',
                ]}
              />
            </ToolSection>

            <ToolSection title="Fraud Indicators Detected">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}>
                {[
                  { label: 'Email Risk', value: result.emailRisk || 'Medium', icon: '✉️' },
                  { label: 'IP Risk', value: result.ipRisk || 'High', icon: '🌐' },
                  { label: 'Velocity Risk', value: result.velocityRisk || 'Low', icon: '⚡' },
                  { label: 'Device Risk', value: result.deviceRisk || 'Medium', icon: '📱' },
                  { label: 'Behavioral Risk', value: result.behavioralRisk || 'Medium', icon: '🔍' },
                  { label: 'Pattern Risk', value: result.patternRisk || 'High', icon: '📊' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '18px 16px',
                    backgroundColor: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '1.2rem', marginBottom: '6px' }}>{item.icon}</div>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.75rem', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</p>
                    <h4 style={{ color: 'var(--text)', margin: 0, fontSize: '0.9rem', fontWeight: '700' }}>{item.value}</h4>
                  </div>
                ))}
              </div>
            </ToolSection>
          </>
        )}

        {result?.error && (
          <ToolSection title="Simulation Error">
            <ToolResult status="danger" title="Simulation Failed" description={result.error} />
          </ToolSection>
        )}

        <ToolSection title="Fraud Types This Tool Simulates">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}>
            {[
              {
                title: 'Account Takeover',
                desc: 'Attacker gains access to legitimate account through credential compromise and changes account details',
              },
              {
                title: 'Friendly Fraud',
                desc: 'Legitimate customer makes purchase then claims non-receipt or unauthorized transaction for refund',
              },
              {
                title: 'Synthetic Identity',
                desc: 'Fraudster creates fake identity using combination of real and fake information to establish credit',
              },
              {
                title: 'Chargeback Fraud',
                desc: 'Customer disputes legitimate transaction with their bank to receive refund while keeping product',
              },
            ].map((item) => (
              <div key={item.title} style={{
                padding: '24px',
                backgroundColor: 'var(--surface)',
                border: '1.5px solid var(--danger-light)',
                borderLeft: '4px solid var(--danger)',
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
