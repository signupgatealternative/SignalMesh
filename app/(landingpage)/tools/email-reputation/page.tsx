'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function EmailReputationPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async () => {
    if (!email) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, toolType: 'emailReputation' }),
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
          title="Email Reputation Checker"
          subtitle="Check email domain reputation, SPF/DKIM records, and blacklist status."
          icon="⭐"
        />

        <ToolSection title="Check Email Reputation">
          <ToolInput
            label="Email Address"
            placeholder="user@example.com"
            value={email}
            onChange={setEmail}
            type="email"
            disabled={loading}
          />
          <ToolButton onClick={handleCheck} disabled={!email} loading={loading}>
            Check Reputation
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.reputation > 70 ? 'success' : result.reputation > 40 ? 'warning' : 'danger'}
              title={`Reputation Score: ${result.reputation}%`}
              description={result.summary}
              details={{
                'SPF Record': result.spf ? 'Valid' : 'Missing',
                'DKIM Record': result.dkim ? 'Valid' : 'Missing',
                'DMARC Policy': result.dmarc ? 'Present' : 'Missing',
                'Blacklist Status': result.blacklisted ? 'Listed' : 'Clear',
              }}
              recommendations={[
                'Configure SPF records properly',
                'Implement DKIM signing',
                'Set DMARC policy to reject',
                'Monitor email deliverability metrics',
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
