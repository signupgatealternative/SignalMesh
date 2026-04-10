'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function DomainRiskAnalyzerPage() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!domain) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain, toolType: 'domainRisk' }),
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
          title="Domain Risk Analyzer"
          subtitle="Analyze email domains for phishing, malware, and fraud risk factors."
          icon="🔗"
        />

        <ToolSection title="Analyze Domain Risk">
          <ToolInput
            label="Email Domain"
            placeholder="example.com"
            value={domain}
            onChange={setDomain}
            type="text"
            disabled={loading}
          />
          <ToolButton onClick={handleAnalyze} disabled={!domain} loading={loading}>
            Analyze Risk
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.riskScore > 70 ? 'danger' : result.riskScore > 40 ? 'warning' : 'success'}
              title={`Domain Risk: ${result.riskScore}%`}
              description={result.summary}
              details={{
                'Age': result.domainAge || 'Unknown',
                'Reputation': result.reputation || 'Unknown',
                'Phishing Risk': result.phishingRisk ? 'High' : 'Low',
                'Malware Risk': result.malwareRisk ? 'Yes' : 'No',
              }}
              recommendations={[
                'Verify domain age and registration info',
                'Check for phishing reports',
                'Monitor SSL certificate validity',
                'Verify DNS records for authenticity',
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
