'use client';

import { useState, useEffect } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function DeviceFingerprintingPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateFingerprint = async () => {
    setLoading(true);
    try {
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        colorDepth: window.screen.colorDepth,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack,
        plugins: navigator.plugins.length,
        hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
        deviceMemory: (navigator as any).deviceMemory || 'Unknown',
      };

      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fingerprint, toolType: 'deviceFingerprint' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Fingerprinting failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Device Fingerprinting"
          subtitle="Generate and analyze device fingerprints to detect spoofed or suspicious devices."
          icon="📱"
        />

        <ToolSection title="Generate Device Fingerprint">
          <p style={{ marginBottom: '20px', color: 'var(--text-2)' }}>
            Click below to generate a fingerprint of your current device. This data helps detect fraudulent accounts and suspicious activity.
          </p>
          <ToolButton onClick={handleGenerateFingerprint} disabled={loading} loading={loading}>
            Generate Fingerprint
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Fingerprint Results">
            <ToolResult
              status={result.suspicionScore > 70 ? 'warning' : 'success'}
              title={`Device Suspicion Score: ${result.suspicionScore}%`}
              description={result.summary}
              details={{
                'Uniqueness': result.uniqueness,
                'Consistency': result.consistency ? 'High' : 'Low',
                'Emulation Detected': result.emulationDetected ? 'Yes' : 'No',
                'Bot Risk': result.botRisk ? 'High' : 'Low',
              }}
              recommendations={[
                'Monitor devices with high suspicion scores',
                'Require email verification for unusual devices',
                'Implement gradual trust building',
                'Track device fingerprint changes over time',
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
