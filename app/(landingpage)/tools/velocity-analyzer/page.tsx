'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function VelocityAnalyzerPage() {
  const [ip, setIp] = useState('');
  const [email, setEmail] = useState('');
  const [timeframe, setTimeframe] = useState('1h');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!ip && !email) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, email, timeframe, toolType: 'velocity' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Analysis failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Velocity Analyzer"
          subtitle="Detect rapid and suspicious signup velocity patterns from the same IP address or email domain."
        />

        <ToolSection title="Analyze Signup Velocity">
          <ToolInput
            label="IP Address (or Email)"
            placeholder="192.168.1.1"
            value={ip}
            onChange={setIp}
            type="text"
            disabled={loading}
          />
          <ToolInput
            label="Email Address (optional)"
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--text)',
            }}>
              Timeframe
            </label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1.5px solid var(--border)',
                borderRadius: '9px',
                fontSize: '0.88rem',
                backgroundColor: 'var(--surface)',
                color: 'var(--text)',
              }}
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>

          <ToolButton onClick={handleAnalyze} disabled={!ip && !email} loading={loading}>
            Analyze Velocity
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.suspicious ? 'warning' : 'success'}
              title={result.suspicious ? 'Suspicious Velocity' : 'Normal Pattern'}
              description={result.summary}
              details={{
                'Signups in Period': result.signupCount,
                'Average Time Between': result.avgTime,
                'Pattern Type': result.pattern,
                'Risk Score': `${result.riskScore}%`,
              }}
              recommendations={[
                'Set velocity limits (e.g., 5 signups per hour per IP)',
                'Implement progressive challenges for rapid signups',
                'Require email verification after 3 signups',
                'Monitor for account abuse patterns',
              ]}
            />
          </ToolSection>
        )}

        {result?.error && (
          <ToolSection title="Error">
            <ToolResult status="danger" title="Error" description={result.error} />
          </ToolSection>
        )}
      </main>
      <Footer />
    </>
  );
}
