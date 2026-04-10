import { NextRequest, NextResponse } from 'next/server';
import https from 'https';
import http from 'http';
import { URL } from 'url';

// Rate limit: max 10 scans per IP per minute
const scanCounts = new Map<string, { count: number; reset: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = scanCounts.get(ip) || { count: 0, reset: now + 60000 };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + 60000;
  }
  entry.count++;
  scanCounts.set(ip, entry);
  return entry.count <= 10;
}

// Fetch a URL server-side (bypasses CORS for the client)
function fetchUrl(targetUrl: string, timeoutMs = 8000): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const parsed = new URL(targetUrl);
      const lib = parsed.protocol === 'https:' ? https : http;
      const start = Date.now();
      
      const req = lib.get(
        {
          hostname: parsed.hostname,
          path: parsed.pathname + parsed.search,
          headers: {
            'User-Agent': 'SignupGuard-Scanner/1.0',
          },
          timeout: timeoutMs,
        },
        (res) => {
          let body = '';
          res.on('data', (chunk) => {
            body += chunk;
            if (body.length > 500000) {
              req.destroy();
            }
          });
          res.on('end', () => {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body,
              ms: Date.now() - start,
            });
          });
        }
      );

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('timeout'));
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Validate that the URL is a public internet address (block private IPs)
function isPublicUrl(urlStr: string): boolean {
  try {
    const { hostname, protocol } = new URL(urlStr);
    if (!['http:', 'https:'].includes(protocol)) return false;
    if (/^(localhost|127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!rateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Max 10 scans per minute.' },
        { status: 429 }
      );
    }

    const { url } = await request.json();

    if (!url || !isPublicUrl(url)) {
      return NextResponse.json(
        { error: 'Invalid or private URL.' },
        { status: 400 }
      );
    }

    const result = await fetchUrl(url);

    return NextResponse.json({
      status: result.status,
      headers: result.headers,
      html: result.body,
      ms: result.ms,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        error:
          err.message === 'timeout'
            ? 'Request timed out (>8s)'
            : 'Could not reach the URL: ' + err.message,
      },
      { status: 502 }
    );
  }
}
