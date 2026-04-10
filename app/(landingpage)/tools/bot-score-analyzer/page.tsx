'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function BotScoreAnalyzerPage() {
  const [email, setEmail] = useState('');
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!email || !ip) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, ip, toolType: 'botScore' }),
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
          title="Bot Score Analyzer"
          subtitle="Analyze behavior patterns to calculate the probability that an account is a bot."
          icon="🤖"
        />

        <ToolSection title="Analyze Bot Likelihood">
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
          <ToolButton onClick={handleAnalyze} disabled={!email || !ip} loading={loading}>
            Analyze Bot Likelihood
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.score > 70 ? 'danger' : result.score > 40 ? 'warning' : 'success'}
              title={`Bot Score: ${result.score}%`}
              description={result.summary}
              details={{
                'Human Likelihood': `${100 - result.score}%`,
                'Detection Factors': result.factors || '5',
                'Confidence': result.confidence || 'High',
                'Recommendation': result.recommendation,
              }}
              recommendations={[
                'Implement behavioral CAPTCHAs',
                'Monitor interaction patterns',
                'Require email confirmation',
                'Use device fingerprinting',
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
