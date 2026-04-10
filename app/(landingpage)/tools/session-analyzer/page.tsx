'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function SessionAnalyzerPage() {
  const [sessionId, setSessionId] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!sessionId) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, userId, toolType: 'sessionAnalysis' }),
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
          title="Session Analyzer"
          subtitle="Analyze user sessions for hijacking, credential reuse, and account takeover patterns."
          icon="🔐"
        />

        <ToolSection title="Analyze Session Behavior">
          <ToolInput
            label="Session ID"
            placeholder="sess_abc123xyz..."
            value={sessionId}
            onChange={setSessionId}
            type="text"
            disabled={loading}
          />
          <ToolInput
            label="User ID (optional)"
            placeholder="user_123"
            value={userId}
            onChange={setUserId}
            type="text"
            disabled={loading}
          />
          <ToolButton onClick={handleAnalyze} disabled={!sessionId} loading={loading}>
            Analyze Session
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.suspicious ? 'warning' : 'success'}
              title={result.suspicious ? 'Suspicious Activity' : 'Normal Session'}
              description={result.summary}
              details={{
                'Session Age': result.sessionAge,
                'Location Changes': result.locationChanges,
                'Device Changes': result.deviceChanges,
                'Risk Score': `${result.riskScore}%`,
              }}
              recommendations={[
                'Implement session timeout after inactivity',
                'Track location and device for changes',
                'Require re-authentication for sensitive actions',
                'Monitor for session fixation attacks',
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
