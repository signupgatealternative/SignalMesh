'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function RateLimitTesterPage() {
  const [url, setUrl] = useState('');
  const [requests, setRequests] = useState('10');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'rateLimit', requests: parseInt(requests) }),
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
          title="Rate Limit Tester"
          subtitle="Test if an API or endpoint properly implements rate limiting to prevent brute force attacks."
          icon="⚡"
        />

        <ToolSection title="Test Rate Limiting">
          <ToolInput
            label="API Endpoint"
            placeholder="https://api.example.com/login"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolInput
            label="Number of Requests"
            placeholder="10"
            value={requests}
            onChange={setRequests}
            type="number"
            disabled={loading}
          />
          <ToolButton onClick={handleTest} disabled={!url} loading={loading}>
            Test Rate Limit
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.isLimited ? 'success' : 'danger'}
              title={result.isLimited ? 'Rate Limit Detected' : 'No Rate Limit'}
              description={result.summary}
              details={{
                'Requests Allowed': result.allowedRequests,
                'Time Window': result.timeWindow || '1m',
                'Block Status': result.blocked ? 'Blocked' : 'Not Blocked',
              }}
              recommendations={[
                'Implement rate limiting (e.g., 5-10 requests per minute)',
                'Use exponential backoff for retries',
                'Monitor for suspicious patterns',
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
