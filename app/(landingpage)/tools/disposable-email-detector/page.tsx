'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function DisposableEmailDetectorPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDetect = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, toolType: 'disposableEmail' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Detection failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Disposable Email Detector"
          subtitle="Detect temporary and disposable email services used for fraud and spam."
          icon="🗑️"
        />

        <ToolSection title="Check Email Type">
          <ToolInput
            label="Email Address"
            placeholder="user@tempmail.com"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />
          <ToolButton onClick={handleDetect} disabled={!email} loading={loading}>
            Detect Disposable
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.isDisposable ? 'danger' : 'success'}
              title={result.isDisposable ? 'Disposable Email' : 'Legitimate Email'}
              description={result.summary}
              details={{
                'Disposable': result.isDisposable ? 'Yes' : 'No',
                'Provider': result.provider || 'Unknown',
                'Risk Level': result.riskLevel || 'Low',
                'Lifetime': result.lifetime || 'Permanent',
              }}
              recommendations={[
                'Block known disposable email domains',
                'Require additional verification for suspicious domains',
                'Monitor disposable email service lists',
                'Implement progressive verification challenges',
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
