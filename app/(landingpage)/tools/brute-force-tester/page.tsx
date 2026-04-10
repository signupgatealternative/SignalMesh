'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function BruteForceTesterPage() {
  const [url, setUrl] = useState('');
  const [attempts, setAttempts] = useState('100');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'bruteForce', attempts: parseInt(attempts) }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Test failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Brute Force Tester"
          subtitle="Simulate brute force attacks to assess login protection effectiveness."
          icon="🔓"
        />

        <ToolSection title="Test Brute Force Resistance">
          <ToolInput
            label="Login Endpoint"
            placeholder="https://example.com/login"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolInput
            label="Number of Attempts"
            placeholder="100"
            value={attempts}
            onChange={setAttempts}
            type="number"
            disabled={loading}
          />
          <ToolButton onClick={handleTest} disabled={!url} loading={loading}>
            Simulate Attack
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.protected ? 'success' : 'danger'}
              title={result.protected ? 'Protected' : 'Vulnerable'}
              description={result.summary}
              details={{
                'Lockout Triggered': result.lockedOut ? 'Yes' : 'No',
                'Attempts Before Block': result.attemptsAllowed,
                'Block Duration': result.blockDuration || 'Permanent',
              }}
              recommendations={[
                'Implement account lockout after 5-10 failed attempts',
                'Add progressive delays between attempts',
                'Log suspicious login patterns',
                'Use multi-factor authentication',
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
