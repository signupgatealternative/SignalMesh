'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function CredentialStuffingTesterPage() {
  const [url, setUrl] = useState('');
  const [attempts, setAttempts] = useState('50');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'credentialStuffing', attempts: parseInt(attempts) }),
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
          title="Credential Stuffing Tester"
          subtitle="Test protection against credential stuffing attacks using compromised credentials."
          icon="🔑"
        />

        <ToolSection title="Test Credential Stuffing Protection">
          <ToolInput
            label="Login Endpoint"
            placeholder="https://example.com/login"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolInput
            label="Test Attempts"
            placeholder="50"
            value={attempts}
            onChange={setAttempts}
            type="number"
            disabled={loading}
          />
          <ToolButton onClick={handleTest} disabled={!url} loading={loading}>
            Test Protection
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.protected ? 'success' : 'danger'}
              title={result.protected ? 'Protected' : 'Vulnerable'}
              description={result.summary}
              details={{
                'Attempts Detected': result.attemptsDetected ? 'Yes' : 'No',
                'Pattern Blocked': result.blocked ? 'Yes' : 'No',
                'False Positives': result.falsePositives || '0',
              }}
              recommendations={[
                'Monitor for credential reuse patterns',
                'Implement behavioral biometrics',
                'Require additional verification for suspicious logins',
                'Use haveibeenpwned API to warn users',
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
