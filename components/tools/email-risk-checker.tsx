'use client';

import { useState } from 'react';

interface SignalInfo {
  name: string;
  sub: string;
  risk: 'ok' | 'warn' | 'err';
}

export default function EmailRiskChecker() {
  const [email, setEmail] = useState('');
  const [results, setResults] = useState<any>(null);

  const DISP = new Set([
    'mailnull.com', 'throwam.com', 'yopmail.com', 'guerrillamail.com', 'tempinbox.com', 'mailinator.com',
    'trashmail.com', 'sharklasers.com', 'spam4.me', 'trashmail.me', 'trashmail.net', 'dispostable.com',
    'fakeinbox.com', 'maildrop.cc', 'mailnesia.com', 'spamgourmet.com', 'tempr.email', 'throwaway.email',
    'nwytg.net', 'binkmail.com', 'dayrep.com', 'discard.email', 'discardmail.com', 'dodgit.com', 'dump-email.info',
  ]);

  const FREE = new Set([
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'live.com', 'msn.com', 'me.com',
  ]);

  const checkEmail = () => {
    if (!email.trim()) return;

    const [localPart, domain] = email.toLowerCase().split('@');
    if (!domain) {
      setResults(null);
      return;
    }

    const signals: SignalInfo[] = [];
    let riskScore = 0;

    // Check disposable domain
    if (DISP.has(domain)) {
      signals.push({ name: 'Disposable email', sub: 'Throwaway inbox detected', risk: 'err' });
      riskScore += 35;
    } else {
      signals.push({ name: 'Disposable email', sub: 'Standard email provider', risk: 'ok' });
    }

    // Check free email
    if (FREE.has(domain)) {
      signals.push({ name: 'Free email provider', sub: `${domain} — legitimate but often abused`, risk: 'warn' });
      riskScore += 10;
    } else {
      signals.push({ name: 'Premium domain', sub: 'Custom or enterprise domain', risk: 'ok' });
    }

    // Check local part patterns
    if (/^\d+$/.test(localPart)) {
      signals.push({ name: 'Numeric-only local', sub: 'Unusual pattern, bot-like', risk: 'warn' });
      riskScore += 8;
    }

    if (/[a-z0-9]+\.test$|test\d+|bot\d+|spam|fake/.test(email)) {
      signals.push({ name: 'Suspicious pattern', sub: 'Contains bot-like keywords', risk: 'err' });
      riskScore += 15;
    } else {
      signals.push({ name: 'Pattern check', sub: 'No suspicious patterns detected', risk: 'ok' });
    }

    // Check for plus addressing
    if (localPart.includes('+')) {
      signals.push({ name: 'Plus addressing', sub: `${localPart.split('+')[0]}+... — alias trick`, risk: 'warn' });
      riskScore += 12;
    } else {
      signals.push({ name: 'No aliasing', sub: 'Direct email address', risk: 'ok' });
    }

    const verdict = riskScore <= 15 ? 'Low risk' : riskScore <= 35 ? 'Medium risk' : 'High risk';
    const recommendation = 
      riskScore > 35 ? 'Reject this email or require strong verification (SMS, custom domain).' :
      riskScore > 15 ? 'Allow but monitor; consider email verification.' :
      'Safe to accept.';

    setResults({
      score: riskScore,
      verdict,
      recommendation,
      signals,
    });
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'ok') return 'var(--green)';
    if (risk === 'warn') return 'var(--amber)';
    return 'var(--red)';
  };

  const getRiskDot = (risk: string) => {
    if (risk === 'ok') return 'fdot-ok';
    if (risk === 'warn') return 'fdot-warn';
    return 'fdot-err';
  };

  const getBadgeClass = (score: number) => {
    if (score <= 15) return 'badge-ok';
    if (score <= 35) return 'badge-warn';
    return 'badge-err';
  };

  return (
    <div className="tool-card" id="tool-email">
      <style>{`
        .tool-card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
        .tool-header { padding: 20px 24px 0; border-bottom: 1px solid var(--border); padding-bottom: 18px; }
        .tool-tag { font-family: monospace; font-size: 11px; color: var(--text-3); letter-spacing: .06em; text-transform: uppercase; margin-bottom: 4px; }
        .tool-header h2 { font-size: 17px; font-weight: 500; letter-spacing: -0.02em; }
        .tool-header p { font-size: 13px; color: var(--text-2); margin-top: 3px; }
        .tool-body { padding: 20px 24px; }
        .sec-lbl { font-family: monospace; font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--text-3); margin-bottom: 8px; margin-top: 16px; }
        .input-row { display: flex; gap: 8px; margin-bottom: 16px; }
        .sg-input { flex: 1; height: 38px; padding: 0 12px; font-size: 13px; font-family: monospace; background: var(--bg); color: var(--text); border: 1px solid var(--border); border-radius: 10px; outline: none; }
        .sg-btn { height: 38px; padding: 0 18px; font-size: 13px; font-weight: 500; background: var(--text); color: #fff; border: none; border-radius: 10px; cursor: pointer; }
        .score-wrap { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; margin-bottom: 16px; display: flex; align-items: center; gap: 14px; }
        .score-num { font-family: monospace; font-size: 28px; font-weight: 500; min-width: 52px; }
        .score-info { flex: 1; }
        .score-verdict { font-size: 14px; font-weight: 500; }
        .score-sub { font-size: 12px; color: var(--text-2); margin-top: 1px; }
        .score-badge { font-size: 11px; font-weight: 500; padding: 4px 10px; border-radius: 20px; }
        .badge-ok { background: #eaf5ee; color: var(--green); border: 1px solid #b6dfc7; }
        .badge-warn { background: #fef8ec; color: var(--amber); border: 1px solid #f5d98a; }
        .badge-err { background: #fdf0ee; color: var(--red); border: 1px solid #f5c4bb; }
        .signals { border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
        .sig-row { display: grid; grid-template-columns: 1fr auto; align-items: center; padding: 9px 12px; border-bottom: 1px solid var(--border); }
        .sig-row:last-child { border-bottom: none; }
        .sig-name { font-size: 13px; }
        .sig-sub { font-size: 11px; color: var(--text-2); margin-top: 1px; }
        .pill { font-size: 11px; font-weight: 500; padding: 3px 9px; border-radius: 20px; }
        .pill-ok { background: #eaf5ee; color: var(--green); }
        .pill-warn { background: #fef8ec; color: var(--amber); }
        .pill-err { background: #fdf0ee; color: var(--red); }
        .verdict-box { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; margin-top: 14px; font-size: 13px; color: var(--text); line-height: 1.6; }
      `}</style>

      <div className="tool-header">
        <p className="tool-tag">Tool 03</p>
        <h2>Email abuse risk checker</h2>
        <p>Paste an email address to instantly score its abuse risk — disposable domain, bot patterns, alias tricks, and more.</p>
      </div>

      <div className="tool-body">
        <p className="sec-lbl">Email address</p>
        <div className="input-row">
          <input
            className="sg-input"
            placeholder="user@example.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkEmail()}
          />
          <button className="sg-btn" onClick={checkEmail}>Check risk</button>
        </div>

        {results && (
          <div style={{ marginTop: '4px' }}>
            <p className="sec-lbl">Risk score</p>
            <div className="score-wrap">
              <div className="score-num" style={{ minWidth: '48px' }}>{results.score}</div>
              <div className="score-info">
                <div className="score-verdict">{results.verdict}</div>
                <div className="score-sub">Based on {results.signals.length} risk factors</div>
              </div>
              <div className={`score-badge ${getBadgeClass(results.score)}`}>
                {results.verdict}
              </div>
            </div>

            <p className="sec-lbl">Signal breakdown</p>
            <div className="signals">
              {results.signals.map((signal: SignalInfo, idx: number) => (
                <div key={idx} className="sig-row">
                  <div>
                    <div className="sig-name">{signal.name}</div>
                    <div className="sig-sub">{signal.sub}</div>
                  </div>
                  <div className={`pill pill-${signal.risk}`}>
                    {signal.risk === 'ok' ? '✓' : signal.risk === 'warn' ? '⚠' : '✗'}
                  </div>
                </div>
              ))}
            </div>

            <p className="sec-lbl" style={{ marginTop: '14px' }}>Recommendation</p>
            <div className="verdict-box">{results.recommendation}</div>
          </div>
        )}
      </div>
    </div>
  );
}
