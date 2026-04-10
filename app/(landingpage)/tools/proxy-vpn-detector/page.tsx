'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function ProxyVPNDetectorPage() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleDetect = async () => {
    if (!ip) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, toolType: 'proxyDetector' }),
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
          title="Proxy & VPN Detector"
          subtitle="Detect if an IP belongs to a proxy service, VPN provider, or datacenter."
          icon="🔒"
        />

        <ToolSection title="Detect Proxy/VPN">
          <ToolInput
            label="IP Address"
            placeholder="192.168.1.1"
            value={ip}
            onChange={setIp}
            type="text"
            disabled={loading}
          />
          <ToolButton onClick={handleDetect} disabled={!ip} loading={loading}>
            Detect Proxy/VPN
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.isProxy ? 'danger' : 'success'}
              title={result.isProxy ? 'Proxy/VPN Detected' : 'Residential IP'}
              description={result.summary}
              details={{
                'Proxy': result.isProxy ? 'Yes' : 'No',
                'Type': result.proxyType || 'None',
                'Provider': result.provider || 'ISP',
                'Risk Level': result.riskLevel || 'Low',
              }}
              recommendations={[
                'Block or require additional verification for proxies',
                'Monitor suspicious proxy providers',
                'Implement device fingerprinting for proxy users',
                'Consider requiring email verification',
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
