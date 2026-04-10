const express = require('express');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const app = express();
app.use(express.json());

// Allow requests from your frontend domain
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace * with your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Rate limit: max 10 scans per IP per minute
const scanCounts = new Map();
function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const entry = scanCounts.get(ip) || { count: 0, reset: now + 60000 };
  if (now > entry.reset) { entry.count = 0; entry.reset = now + 60000; }
  entry.count++;
  scanCounts.set(ip, entry);
  if (entry.count > 10) return res.status(429).json({ error: 'Rate limit exceeded. Max 10 scans per minute.' });
  next();
}

// Fetch a URL server-side (bypasses CORS for the client)
function fetchUrl(targetUrl, timeoutMs = 8000) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(targetUrl);
    const lib = parsed.protocol === 'https:' ? https : http;
    const start = Date.now();
    const req = lib.get(
      { hostname: parsed.hostname, path: parsed.pathname + parsed.search, headers: { 'User-Agent': 'SignupGuard-Scanner/1.0' }, timeout: timeoutMs },
      (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; if (body.length > 500000) req.destroy(); }); // cap at 500KB
        res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body, ms: Date.now() - start }));
      }
    );
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')); });
  });
}

// Validate that the URL is a public internet address (block private IPs)
function isPublicUrl(urlStr) {
  try {
    const { hostname, protocol } = new URL(urlStr);
    if (!['http:', 'https:'].includes(protocol)) return false;
    if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname)) return false;
    return true;
  } catch { return false; }
}

// POST /api/scan  { url: "https://example.com/signup" }
// Returns: html of the page + response headers + latency
app.post('/api/scan', rateLimit, async (req, res) => {
  const { url } = req.body;
  if (!url || !isPublicUrl(url)) return res.status(400).json({ error: 'Invalid or private URL.' });

  try {
    const result = await fetchUrl(url);
    res.json({
      status: result.status,
      headers: result.headers,
      html: result.body,
      ms: result.ms,
    });
  } catch (err) {
    res.status(502).json({ error: err.message === 'timeout' ? 'Request timed out (>8s)' : 'Could not reach the URL: ' + err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`SignupGuard proxy running on port ${PORT}`));
