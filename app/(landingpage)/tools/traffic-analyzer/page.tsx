'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function TrafficAnalyzerPage() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'trafficAnalysis' }),
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
          title="Traffic Analyzer"
          subtitle="Analyze traffic patterns to detect DDoS attacks, bot activity, and anomalies."
          icon="📈"
        />

        <ToolSection title="Analyze Traffic Pattern">
          <ToolInput
            label="Website or API URL"
            placeholder="https://example.com"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolButton onClick={handleAnalyze} disabled={!url} loading={loading}>
            Analyze Traffic
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.anomaly ? 'warning' : 'success'}
              title={result.anomaly ? 'Anomaly Detected' : 'Normal Traffic'}
              description={result.summary}
              details={{
                'Requests/min': result.requestsPerMin,
                'Unique IPs': result.uniqueIps,
                'Bot Percentage': `${result.botPercentage}%`,
                'Spike Detected': result.spike ? 'Yes' : 'No',
              }}
              recommendations={[
                'Implement rate limiting (100-1000 req/min)',
                'Use DDoS protection service',
                'Monitor for traffic spikes',
                'Implement bot detection filters',
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
