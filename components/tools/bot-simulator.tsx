'use client';

import { useState, useRef, useEffect } from 'react';

export default function BotSimulator() {
  const [url, setUrl] = useState('');
  const [concurrency, setConcurrency] = useState(10);
  const [totalRequests, setTotalRequests] = useState(30);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ sent: 0, ok: 0, blocked: 0, avg: 0 });
  const [logs, setLogs] = useState<string[]>(['Waiting to start…']);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, msg].slice(-50)); // Keep last 50
  };

  const runSimulation = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setLogs(['Starting simulation…']);
    setStats({ sent: 0, ok: 0, blocked: 0, avg: 0 });

    try {
      // First, fetch the page to detect form fields
      const scanRes = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!scanRes.ok) {
        addLog('Error: Could not fetch page');
        setLoading(false);
        return;
      }

      const scanData = await scanRes.json();
      addLog(`Fetched page in ${scanData.ms}ms`);

      // Parse form fields
      const doc = new DOMParser().parseFromString(scanData.html, 'text/html');
      const forms = doc.querySelectorAll('form');
      if (forms.length === 0) {
        addLog('No forms detected on page');
        setLoading(false);
        return;
      }

      const form = forms[0];
      const formAction = form.getAttribute('action') || url;
      const formMethod = (form.getAttribute('method') || 'POST').toUpperCase();
      const inputs = Array.from(form.querySelectorAll('input, textarea, select'));

      addLog(`Detected form: ${formMethod} to ${formAction}`);
      addLog(`Found ${inputs.length} input fields`);

      // Build sample payload
      const payload: any = {};
      inputs.forEach((input: any) => {
        const name = input.getAttribute('name') || input.id;
        const type = input.getAttribute('type') || 'text';
        if (name && type !== 'submit') {
          if (type === 'email') payload[name] = `bot${Math.random().toString(36).substr(2, 9)}@example.com`;
          else if (type === 'checkbox') payload[name] = 'on';
          else payload[name] = 'test_value';
        }
      });

      // Simulate bot attacks
      let sent = 0, ok = 0, blocked = 0;
      const latencies: number[] = [];

      for (let i = 0; i < totalRequests; i++) {
        const promises = [];
        const batchSize = Math.min(concurrency, totalRequests - i);

        for (let j = 0; j < batchSize; j++) {
          const p = (async () => {
            const t0 = performance.now();
            try {
              const res = await fetch(formAction, {
                method: formMethod,
                headers: { 'Content-Type': 'application/json' },
                body: formMethod !== 'GET' ? JSON.stringify(payload) : undefined,
              });
              const ms = Math.round(performance.now() - t0);
              latencies.push(ms);

              if (res.status >= 200 && res.status < 300) {
                ok++;
                addLog(`✓ 2xx (${ms}ms)`);
              } else if (res.status === 429 || res.status === 403) {
                blocked++;
                addLog(`⊘ ${res.status} blocked (${ms}ms)`);
              } else {
                addLog(`✗ ${res.status} error (${ms}ms)`);
              }
              sent++;
            } catch {
              addLog(`✗ timeout/error`);
              sent++;
            }
          })();
          promises.push(p);
        }

        await Promise.all(promises);
      }

      const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
      setStats({ sent, ok, blocked, avg: avgLatency });
      addLog(`Simulation complete: ${ok} accepted, ${blocked} blocked`);
    } catch (error) {
      addLog(`Error: ${(error as any).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tool-card" id="tool-bot">
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
        .slider-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }
        .slider-card { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; }
        .slider-label { font-size: 11px; color: var(--text-3); margin-bottom: 4px; }
        .slider-val { font-family: monospace; font-size: 14px; font-weight: 500; margin-bottom: 6px; }
        input[type=range] { width: 100%; accent-color: var(--text); }
        .stat-strip { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; }
        .stat-box { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; text-align: center; }
        .stat-n { font-family: monospace; font-size: 20px; font-weight: 500; }
        .stat-l { font-size: 11px; color: var(--text-3); margin-top: 2px; }
        .log-box { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; padding: 10px 12px; height: 160px; overflow-y: auto; font-family: monospace; font-size: 11px; }
        .ll { line-height: 1.9; color: var(--text-2); white-space: pre-wrap; }
      `}</style>

      <div className="tool-header">
        <p className="tool-tag">Tool 02</p>
        <h2>Bot attack simulator</h2>
        <p>Enter your signup URL and we'll fire real HTTP requests to test how well your form resists bot attacks.</p>
      </div>

      <div className="tool-body">
        <p className="sec-lbl">Target signup URL</p>
        <div className="input-row">
          <input
            className="sg-input"
            placeholder="https://yourapp.com/signup"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="sg-btn" onClick={runSimulation} disabled={loading}>
            {loading ? 'Running…' : 'Run simulation'}
          </button>
        </div>

        <div className="slider-row">
          <div className="slider-card">
            <div className="slider-label">Concurrency (parallel bots)</div>
            <div className="slider-val">{concurrency}</div>
            <input type="range" min="1" max="50" value={concurrency} step="1" onChange={(e) => setConcurrency(Number(e.target.value))} />
          </div>
          <div className="slider-card">
            <div className="slider-label">Total requests</div>
            <div className="slider-val">{totalRequests}</div>
            <input type="range" min="5" max="100" value={totalRequests} step="5" onChange={(e) => setTotalRequests(Number(e.target.value))} />
          </div>
        </div>

        <div className="stat-strip">
          <div className="stat-box">
            <div className="stat-n">{stats.sent}</div>
            <div className="stat-l">Sent</div>
          </div>
          <div className="stat-box">
            <div className="stat-n">{stats.ok}</div>
            <div className="stat-l">2xx ok</div>
          </div>
          <div className="stat-box">
            <div className="stat-n">{stats.blocked}</div>
            <div className="stat-l">Blocked</div>
          </div>
          <div className="stat-box">
            <div className="stat-n">{stats.avg || '—'}</div>
            <div className="stat-l">{stats.avg ? 'ms avg' : 'Avg ms'}</div>
          </div>
        </div>

        <p className="sec-lbl">Live request log</p>
        <div className="log-box">
          {logs.map((log, idx) => (
            <div key={idx} className="ll">{log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
