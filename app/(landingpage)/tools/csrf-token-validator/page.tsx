'use client';

import { useState } from 'react';
import { ToolHero } from '@/components/tools/tool-hero';
import { ToolSection } from '@/components/tools/tool-section';
import { ToolInput } from '@/components/tools/tool-input';
import { ToolButton } from '@/components/tools/tool-button';
import { ToolResult } from '@/components/tools/tool-result';
import { Navbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';

export default function CSRFTokenValidatorPage() {
  const [token, setToken] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleValidate = async () => {
    if (!token || !url) return;
    setLoading(true);
    try {
      const response = await fetch('/api/tools/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, url, toolType: 'csrfValidator' }),
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ error: 'Validation failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main style={{ marginTop: '80px' }}>
        <ToolHero
          title="CSRF Token Validator"
          subtitle="Validate CSRF token implementation and check for Cross-Site Request Forgery vulnerabilities."
          icon="🛡️"
        />

        <ToolSection title="Validate CSRF Protection">
          <ToolInput
            label="CSRF Token"
            placeholder="token_abc123xyz..."
            value={token}
            onChange={setToken}
            type="text"
            disabled={loading}
          />
          <ToolInput
            label="Target URL"
            placeholder="https://example.com/form"
            value={url}
            onChange={setUrl}
            type="url"
            disabled={loading}
          />
          <ToolButton onClick={handleValidate} disabled={!token || !url} loading={loading}>
            Validate Token
          </ToolButton>
        </ToolSection>

        {result && !result.error && (
          <ToolSection title="Results">
            <ToolResult
              status={result.isValid ? 'success' : 'danger'}
              title={result.isValid ? 'Token Valid' : 'Invalid Token'}
              description={result.summary}
              details={{
                'Token Valid': result.isValid ? 'Yes' : 'No',
                'Token Fresh': result.isFresh ? 'Yes' : 'No',
                'Signature Check': result.signatureValid ? 'Passed' : 'Failed',
                'Expiration': result.expiration || 'Valid',
              }}
              recommendations={[
                'Implement double-submit cookie pattern',
                'Use SameSite cookie attribute',
                'Validate token on every state-changing request',
                'Refresh tokens after sensitive operations',
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
