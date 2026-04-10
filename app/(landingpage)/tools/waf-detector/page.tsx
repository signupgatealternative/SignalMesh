'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function WAFDetectorPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDetect = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'wafDetector' }),
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
          title="WAF Detector"
          subtitle="Detect and identify Web Application Firewalls protecting a website."
          icon="🔥"
        />

        <ToolSection title="Detect WAF Protection">
          <ToolInput
            label="Website URL"
            placeholder="https://example.com"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolButton onClick={handleDetect} disabled={!url} loading={loading}>
            Detect WAF
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.wafDetected ? 'success' : 'warning'}
              title={result.wafDetected ? 'WAF Detected' : 'No WAF Detected'}
              description={result.summary}
              details={{
                'WAF Provider': result.provider || 'Unknown',
                'Detection Confidence': `${result.confidence}%`,
                'Protection Level': result.protectionLevel || 'Medium',
                'Evasion Possible': result.evasionPossible ? 'Yes' : 'No',
              }}
              recommendations={[
                'Deploy a reputable WAF (Cloudflare, AWS WAF)',
                'Configure WAF rules for your application',
                'Monitor WAF logs for attacks',
                'Regularly update WAF signatures',
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
