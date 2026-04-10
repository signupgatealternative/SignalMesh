'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function SignupScorePage() {
  const [email, setEmail] = useState('');
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async () => {
    if (!email || !ip) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ip, toolType: 'signupScore' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Calculation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Signup Score Calculator"
          subtitle="Calculate a comprehensive signup risk score based on email, IP, and behavioral patterns."
          icon="📊"
        />

        <ToolSection title="Calculate Signup Score">
          <ToolInput
            label="Email Address"
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />
          <ToolInput
            label="IP Address"
            placeholder="192.168.1.1"
            value={ip}
            onChange={setIp}
            type="text"
            disabled={loading}
          />
          <ToolButton onClick={handleCalculate} disabled={!email || !ip} loading={loading}>
            Calculate Score
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.score > 70 ? 'danger' : result.score > 40 ? 'warning' : 'success'}
              title={`Signup Score: ${result.score}/100`}
              description={result.summary}
              details={{
                'Risk Level': result.riskLevel,
                'Email Risk': result.emailRisk,
                'IP Risk': result.ipRisk,
                'Recommendation': result.recommendation,
              }}
              recommendations={[
                'Require email verification for scores above 60',
                'Implement CAPTCHA for medium risk signups',
                'Block or quarantine high-risk signups',
                'Monitor for patterns over time',
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
