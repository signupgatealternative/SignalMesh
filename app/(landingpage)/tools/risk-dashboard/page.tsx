'use client';

import { useState, useEffect } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function RiskDashboardPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateDashboard = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolType: 'riskDashboard' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Dashboard generation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Comprehensive Risk Dashboard"
          subtitle="View all fraud metrics, security signals, and risk assessment data in one unified dashboard."
        />

        <ToolSection title="Generate Risk Report">
          <p style={{ marginBottom: '20px', color: 'var(--text-2)' }}>
            Generate a comprehensive risk assessment dashboard showing all fraud metrics and security insights.
          </p>
          <ToolButton onClick={handleGenerateDashboard} disabled={loading} loading={loading}>
            Generate Dashboard
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <>
            <ToolSection title="Overall Risk Score">
              <ToolResult
                status={result.overallRisk > 70 ? 'danger' : result.overallRisk > 40 ? 'warning' : 'success'}
                title={`Overall Risk: ${result.overallRisk}%`}
                description={result.summary}
                details={{
                  'Critical Alerts': result.criticalAlerts,
                  'Blocked Attempts': result.blockedAttempts,
                  'Anomalies': result.anomalies,
                  'Trending': result.trending,
                }}
              />
            </ToolSection>

            <ToolSection title="Fraud Metrics">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {[
                  { label: 'Bot Signups', value: `${result.botSignups}%`, color: 'danger' },
                  { label: 'Disposable Email', value: `${result.disposableEmail}%`, color: 'warning' },
                  { label: 'Proxy/VPN', value: `${result.proxyVpn}%`, color: 'warning' },
                  { label: 'Verification Rate', value: `${result.verificationRate}%`, color: 'success' },
                ].map((metric) => (
                  <div key={metric.label} style={{
                    padding: '16px',
                    backgroundColor: 'var(--surface2)',
                    borderRadius: '9px',
                    border: `1.5px solid var(--border)`,
                  }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginBottom: '8px' }}>
                      {metric.label}
                    </div>
                    <div style={{
                      fontSize: '1.8rem',
                      fontWeight: 'bold',
                      color: metric.color === 'danger' ? 'var(--danger)' : metric.color === 'warning' ? 'var(--warn)' : 'var(--shield)',
                    }}>
                      {metric.value}
                    </div>
                  </div>
                ))}
              </div>
            </ToolSection>
          </>
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
