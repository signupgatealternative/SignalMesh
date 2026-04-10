'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function CaptchaCheckerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'captcha' }),
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
          title="CAPTCHA Checker"
          subtitle="Detect what type of CAPTCHA protection a website uses and assess its effectiveness."
          icon="🤖"
        />

        <ToolSection title="Analyze CAPTCHA Protection">
          <ToolInput
            label="Website URL"
            placeholder="https://example.com"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolButton onClick={handleCheck} disabled={!url} loading={loading}>
            Check CAPTCHA
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.hasCaptcha ? 'success' : 'warning'}
              title={result.hasCaptcha ? 'CAPTCHA Detected' : 'No CAPTCHA Found'}
              description={result.summary}
              details={{
                'CAPTCHA Type': result.type || 'None',
                'Strength': result.strength || 'Low',
                'Bot Detection': result.botDetection ? 'Yes' : 'No',
              }}
              recommendations={[
                'Implement modern CAPTCHA like reCAPTCHA v3',
                'Use invisible CAPTCHA to improve UX',
                'Combine with rate limiting for better protection',
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
