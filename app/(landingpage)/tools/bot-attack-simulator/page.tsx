'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';


export default function BotAttackSimulatorPage() {
  const [url, setUrl] = useState('');
  const [botType, setBotType] = useState('general');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSimulate = async () => {
    if (!url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, toolType: 'botSimulator', botType }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Simulation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="Bot Attack Simulator"
          subtitle="Test your signup defenses by simulating various bot attack patterns and automation scripts."
        />

        <ToolSection title="Simulate Bot Attack">
          <ToolInput
            label="Target URL"
            placeholder="https://example.com/signup"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: '700',
              marginBottom: '10px',
              color: 'var(--text)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}>
              Bot Attack Type
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { value: 'general', label: 'General Bot' },
                { value: 'credential', label: 'Credential Stuffing' },
                { value: 'automation', label: 'Automation Script' },
                { value: 'proxy', label: 'Proxy Bot' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setBotType(option.value)}
                  style={{
                    padding: '12px 16px',
                    border: botType === option.value ? '1.5px solid var(--shield)' : '1.5px solid var(--border)',
                    borderRadius: '8px',
                    backgroundColor: botType === option.value ? 'var(--shield-light)' : 'var(--surface)',
                    color: botType === option.value ? 'var(--shield-mid)' : 'var(--text-2)',
                    cursor: 'none',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    transition: 'all 0.2s',
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <ToolButton onClick={handleSimulate} disabled={!url || loading} loading={loading}>
            {loading ? 'Simulating...' : 'Start Simulation'}
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <>
            <ToolSection title="Bot Simulation Results">
              <ToolResult
                status={result.blocked ? 'success' : 'danger'}
                title={result.blocked ? 'Bot Successfully Blocked' : 'Bot Attack Not Detected'}
                description={result.summary}
                details={{
                  'Attack Type': botType.charAt(0).toUpperCase() + botType.slice(1),
                  'Detection Method': result.detectionMethod || 'Multiple signals',
                  'Status': result.blocked ? 'Blocked' : 'Passed Through',
                  'Confidence Score': `${result.score || 75}%`,
                  'Response Time': result.responseTime || '145ms',
                }}
                recommendations={[
                  'Implement multi-signal bot detection combining behavioral analysis',
                  'Use device fingerprinting to identify automation tools',
                  'Monitor for velocity anomalies and suspicious patterns',
                  'Require email verification with SMTP validation',
                  'Implement rate limiting on signup endpoints',
                  'Track failed attempt patterns',
                ]}
              />
            </ToolSection>

            <ToolSection title="Attack Details">
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '20px',
              }}>
                {[
                  { label: 'Requests Blocked', value: result.blocked ? '1' : '0', icon: '🚫' },
                  { label: 'Detection Points', value: result.signals || '4/6', icon: '🎯' },
                  { label: 'Response Time', value: result.responseTime || '145ms', icon: '⏱️' },
                  { label: 'Bypass Risk', value: result.blocked ? 'Low' : 'High', icon: '⚠️' },
                ].map((item) => (
                  <div key={item.label} style={{
                    padding: '20px',
                    backgroundColor: 'var(--surface)',
                    border: '1.5px solid var(--border)',
                    borderRadius: '10px',
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{item.icon}</div>
                    <p style={{ color: 'var(--text-2)', fontSize: '0.8rem', margin: '0 0 4px' }}>{item.label}</p>
                    <h4 style={{ color: 'var(--text)', margin: 0, fontSize: '1rem', fontWeight: '700' }}>{item.value}</h4>
                  </div>
                ))}
              </div>
            </ToolSection>
          </>
        )}

        {result?.error && (
          <ToolSection title="Simulation Error">
            <ToolResult status="danger" title="Simulation Failed" description={result.error} />
          </ToolSection>
        )}

        <ToolSection title="Bot Attack Types">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}>
            {[
              {
                title: 'Credential Stuffing',
                desc: 'Attackers use leaked username/password combos to compromise accounts systematically across multiple services',
              },
              {
                title: 'Automation Scripts',
                desc: 'Headless browsers and scripting tools that automate signup forms to create fake accounts at scale',
              },
              {
                title: 'Proxy Bots',
                desc: 'Attackers route requests through residential proxies and VPNs to mask bot behavior and bypass IP-based detection',
              },
              {
                title: 'Distributed Attacks',
                desc: 'Coordinated botnet attacks from multiple IPs simulating different users and locations simultaneously',
              },
            ].map((item) => (
              <div key={item.title} style={{
                padding: '24px',
                backgroundColor: 'var(--surface)',
                border: '1.5px solid var(--border)',
                borderRadius: '12px',
              }}>
                <h4 style={{ color: 'var(--text)', margin: '0 0 8px', fontSize: '0.95rem', fontWeight: '700' }}>
                  {item.title}
                </h4>
                <p style={{ color: 'var(--text-2)', margin: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </ToolSection>
      </main>
      <Footer />
    </>
  );
}
