'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function IPIntelligencePage() {
  const [ip, setIp] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!ip) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip, toolType: 'ipIntelligence' }),
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
          title="IP Intelligence"
          subtitle="Analyze IP addresses for geolocation, ISP, reputation, and abuse history."
          icon="🌐"
        />

        <ToolSection title="Analyze IP Address">
          <ToolInput
            label="IP Address"
            placeholder="192.168.1.1"
            value={ip}
            onChange={setIp}
            type="text"
            disabled={loading}
          />
          <ToolButton onClick={handleAnalyze} disabled={!ip} loading={loading}>
            Analyze IP
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.riskScore > 70 ? 'danger' : result.riskScore > 40 ? 'warning' : 'success'}
              title={`IP Risk Score: ${result.riskScore}%`}
              description={result.summary}
              details={{
                'Country': result.country || 'Unknown',
                'ISP': result.isp || 'Unknown',
                'Reputation': result.reputation || 'Unknown',
                'Abuse Reports': result.abuseReports || '0',
              }}
              recommendations={[
                'Implement geo-blocking if necessary',
                'Monitor IPs with high abuse history',
                'Require additional verification for suspicious regions',
                'Track velocity of signups from same IP',
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
