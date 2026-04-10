# SignalMesh Free Security Tools

This application includes 3 free security tools integrated into the Next.js landing page.

## Available Tools

### 1. Vulnerability Checker (Tool 01)
**Path:** `/tools#tool-vuln`

Scan your signup page URL to detect security protections in place:
- CAPTCHA / Bot Challenge detection
- CSRF token presence
- Honeypot fields
- Rate limiting headers
- Content Security Policy
- Input length limits
- WAF / Security proxy detection
- Password strength hints

**How it works:**
1. Enter your signup page URL
2. Server-side proxy fetches and parses the HTML
3. Detects security signals and provides a risk score (0-100%)
4. Fallback manual mode if proxy is unavailable

### 2. Bot Attack Simulator (Tool 02)
**Path:** `/tools#tool-bot`

Simulate coordinated bot attacks against your signup form:
- Auto-detects form fields from your signup page
- Fires configurable parallel requests
- Measures response times and blocking effectiveness
- Shows live request logs
- Displays throughput statistics

**Configurable parameters:**
- Concurrency: 1-50 parallel bots
- Total requests: 5-100 requests

### 3. Email Risk Checker (Tool 03)
**Path:** `/tools#tool-email`

Instantly score any email address for abuse risk:
- Disposable/throwaway email detection
- Free provider identification
- Suspicious pattern detection (numeric-only, bot-like keywords)
- Plus addressing detection (email+alias tricks)
- Comprehensive risk scoring (0-100)

**Signals analyzed:**
- Disposable email domains
- Free email providers
- Numeric-only local parts
- Suspicious patterns
- Plus addressing/aliases

## API Endpoints

### POST /api/scan
Fetches a URL server-side and returns HTML + headers for analysis.

**Request:**
```json
{
  "url": "https://yourapp.com/signup"
}
```

**Response:**
```json
{
  "status": 200,
  "headers": {...},
  "html": "...",
  "ms": 145
}
```

**Rate Limiting:** 10 scans per minute per IP

**Security:**
- Validates public URLs only (blocks private IPs)
- 8 second timeout per request
- 500KB response limit
- CORS-safe server-side fetching

## Integration

All tools are accessible from:
- Main landing page: `/` (footer links)
- Tools page: `/tools`
- Direct links with hash anchors (e.g., `/tools#tool-vuln`)

## Components Structure

```
components/
└── tools/
    ├── vulnerability-checker.tsx  # Tool 01
    ├── bot-simulator.tsx          # Tool 02
    └── email-risk-checker.tsx     # Tool 03

app/
├── api/
│   └── scan/route.ts             # Proxy API
└── tools/
    ├── page.tsx                  # Tools dashboard
    └── layout.tsx                # Tools layout
```

## Data Sources

### Disposable Email Domains
40+ disposable email providers including:
- mailinator.com, yopmail.com, guerrillamail.com
- tempinbox.com, throwaway.email, 10minutemail.com
- And many more...

### Free Email Providers
Identified: gmail.com, yahoo.com, outlook.com, aol.com, protonmail.com, etc.

### WAF Detection
Detects: Cloudflare, Fastly, Akamai, Imperva, Sucuri, Barracuda

## Security Considerations

- **No data storage:** All tool results are calculated in-browser
- **No tracking:** IP fetching is anonymous
- **Server-side proxy:** URLs are fetched server-side to bypass CORS restrictions
- **Rate limiting:** Prevents abuse of the scanning API
- **Public URLs only:** Private IPs are blocked to prevent SSRF attacks

## Future Expansions

The footer references 18 additional tool categories that can be built:
- **Brute Force Tester** - Password attack simulation
- **Fraud Simulator** - Account takeover testing
- **CAPTCHA Checker** - CAPTCHA strength analysis
- **Rate Limit Tester** - Rate limiting effectiveness
- **IP Intelligence** - Geo, ISP, proxy detection
- **Proxy & VPN Checker** - Proxy detection
- **Device Fingerprint** - Browser fingerprinting
- **Signup Score** - Comprehensive risk scoring
- **Bot Score** - Bot detection accuracy
- **Velocity Analyzer** - Rate-of-change detection
- **Session Analyzer** - Session pattern analysis
- **Traffic Analyzer** - Traffic pattern analysis
- **Risk Dashboard** - Centralized monitoring

## Getting Started

1. Navigate to `/tools` or click "Free Security Tools" in the footer
2. Choose a tool from the navigation tabs
3. Enter your data (URL, email, etc.)
4. View results in real-time

All tools work without authentication or account creation.
