'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function HoneypotDetectorPage() {
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
        body: JSON.stringify({ url, toolType: 'honeypotDetector' }),
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
          title="Honeypot Detector"
          subtitle="Detect honeypot fields and form traps that catch bot submissions."
          icon="🍯"
        />

        <ToolSection title="Scan for Honeypot Fields">
          <ToolInput
            label="Form URL"
            placeholder="https://example.com/signup"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolButton onClick={handleDetect} disabled={!url} loading={loading}>
            Detect Honeypots
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.honeypotFound ? 'success' : 'warning'}
              title={result.honeypotFound ? 'Honeypot Detected' : 'No Honeypot Found'}
              description={result.summary}
              details={{
                'Fields Found': result.fieldCount,
                'Hidden Fields': result.hiddenFields,
                'Trap Triggered': result.trapTriggered ? 'Yes' : 'No',
                'Effectiveness': result.effectiveness || 'Medium',
              }}
              recommendations={[
                'Implement honeypot fields (hidden from real users)',
                'Use CSS display: none for hidden fields',
                'Name fields to match common bot submissions',
                'Block submissions that fill honeypot fields',
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
