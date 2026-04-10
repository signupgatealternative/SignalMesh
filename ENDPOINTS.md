# SignalMesh - Working Endpoints & Links Reference

## Frontend Routes

### Landing Pages
| Path | Component | Description |
|------|-----------|-------------|
| `/` | `app/page.tsx` | Main landing page with all features |
| `/tools` | `app/tools/page.tsx` | Security tools dashboard |

### Anchor Navigation (Landing Page `/`)
| Anchor | Section | Component |
|--------|---------|-----------|
| `/#features` | Features section | `components/landing/features.tsx` |
| `/#stats` | Statistics band | `components/landing/stats.tsx` |
| `/#how-it-works` | How it works section | `components/landing/how-it-works.tsx` |
| `/#pricing` | Pricing section | `components/landing/pricing.tsx` |

### Tool Direct Links
| Path | Tool | Component |
|------|------|-----------|
| `/tools#tool-vuln` | Vulnerability Scanner | `components/tools/vulnerability-checker.tsx` |
| `/tools#tool-bot` | Bot Attack Simulator | `components/tools/bot-simulator.tsx` |
| `/tools#tool-email` | Email Risk Checker | `components/tools/email-risk-checker.tsx` |

## API Endpoints

### POST /api/scan
**Purpose:** Server-side proxy for URL fetching

**Request:**
```bash
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://yourapp.com/signup"}'
```

**Request Body:**
```json
{
  "url": "https://example.com/signup"
}
```

**Response (200 OK):**
```json
{
  "status": 200,
  "headers": {
    "content-type": "text/html",
    "server": "nginx/1.21.0",
    "x-ratelimit-limit": "100"
  },
  "html": "<!DOCTYPE html>...",
  "ms": 145
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Invalid or private URL."
}
```

**Response (429 Too Many Requests):**
```json
{
  "error": "Rate limit exceeded. Max 10 scans per minute."
}
```

**Response (502 Bad Gateway):**
```json
{
  "error": "Could not reach the URL: timeout"
}
```

### Rate Limiting
- **Limit:** 10 scans per minute per IP
- **Reset:** 60 seconds
- **Header Detection:** `x-forwarded-for`, `x-real-ip`

### Security Rules
- ✅ Validates public URLs only
- ✅ Blocks private IP ranges (localhost, 127.x, 10.x, 192.168.x, 172.16-31.x)
- ✅ Supports HTTP and HTTPS only
- ✅ 8-second request timeout
- ✅ 500KB response size limit
- ✅ User-Agent: `SignupGuard-Scanner/1.0`

## Footer Navigation Links

### Free Security Tools Section
```html
<a href="/tools#tool-vuln">Vulnerability checker</a>
<a href="/tools#tool-bot">Bot attack simulator</a>
<a href="/tools#tool-email">Email risk checker</a>
<a href="/tools">All Tools</a>
```

### Product Section
```html
<a href="/">Home</a>
<a href="#features">Features</a>
<a href="#pricing">Pricing</a>
<a href="#how-it-works">How It Works</a>
<a href="#stats">Stats</a>
```

### Company Section
```html
<a href="/">About</a>
<a href="/">Blog</a>
<a href="/">Contact</a>
<a href="/">Status</a>
```

## Working Features Checklist

### Landing Page Features
- ✅ Navigation bar (sticky)
- ✅ Hero section (with animations)
- ✅ Ticker (scrolling text)
- ✅ Live dashboard (real-time data)
- ✅ Features grid (6 items)
- ✅ Stats band (4 statistics)
- ✅ How it works (4 steps)
- ✅ Pricing (3 tiers)
- ✅ Email CTA form
- ✅ Footer (with working links)

### Interactive Elements
- ✅ Custom cursor (tracking + ring effect)
- ✅ Scroll reveal animations
- ✅ Hover effects on cards
- ✅ Button animations
- ✅ Form inputs (email, URL)
- ✅ Slider controls (range inputs)

### Tool Functionality
- ✅ Vulnerability Scanner
  - URL input validation
  - Server-side fetching
  - HTML parsing
  - Signal detection (8 signals)
  - Risk scoring (0-100%)
  - Manual fallback mode

- ✅ Bot Attack Simulator
  - URL input validation
  - Form auto-detection
  - Configurable concurrency
  - Configurable request count
  - Real-time logging
  - Performance metrics

- ✅ Email Risk Checker
  - Email input validation
  - Disposable domain detection (40+ domains)
  - Free provider identification
  - Pattern analysis
  - Plus addressing detection
  - Risk scoring (0-100%)

## Mobile Responsiveness

### Breakpoints
- Mobile: < 600px
- Tablet: 600px - 960px
- Desktop: > 960px

### Responsive Elements
- ✅ Navigation (responsive)
- ✅ Hero heading (scales with vw)
- ✅ Grid layouts (1-3 columns)
- ✅ Form inputs (full-width mobile)
- ✅ Stats grid (4 → 2 → 1 columns)
- ✅ Footer grid (adjusts columns)

## Component Props

### Tool Components
All tool components are self-contained and handle their own state:
- No required props
- Internal React hooks for state management
- Integrated styling (CSS-in-JS)

### Layout Components
- **Navbar:** No props
- **Hero:** No props
- **Features:** No props
- **Pricing:** No props
- **Footer:** No props (displays hardcoded links)

## Error Handling

### URL Scanning Errors
| Scenario | Response | Status |
|----------|----------|--------|
| Invalid URL format | Invalid or private URL | 400 |
| Private/internal IP | Invalid or private URL | 400 |
| Request timeout (>8s) | Request timed out (>8s) | 502 |
| Rate limit exceeded | Rate limit exceeded | 429 |
| Server unreachable | Could not reach the URL | 502 |

### Form Validation
- Email checker: Validates email format
- Bot simulator: Requires valid URL
- Vulnerability checker: Requires valid URL
- All fields: Client-side validation before API call

## Performance Metrics

### Typical Response Times
- **Vulnerability Scanner:** 200-500ms (depends on target server)
- **Bot Simulator:** 1-10 seconds (depends on request count)
- **Email Checker:** <10ms (all calculations local)

### API Rate Limits
- 10 scans per minute per IP
- Automatic reset every 60 seconds

## Authentication & Authorization

### Current Implementation
- ✅ No authentication required
- ✅ No user accounts
- ✅ Public access to all tools
- ✅ IP-based rate limiting only

### Future Enhancement Points
- Add user accounts (Supabase Auth)
- Save scan history per user
- Premium features / API tiers
- API key generation
- Usage analytics dashboard

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Chromium (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

### JavaScript Features Used
- Fetch API
- Promise/async-await
- DOMParser
- IntersectionObserver
- Event listeners
- LocalStorage (none currently)

## Deployment Notes

### Environment Variables
Currently no required environment variables, but you can add:
- `NEXT_PUBLIC_PROXY_URL` - Override proxy endpoint
- `API_RATE_LIMIT` - Custom rate limit
- `CORS_ALLOWED_ORIGINS` - CORS whitelist

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

### Development
```bash
npm run dev
```

Server runs on `http://localhost:3000`

## Testing the Endpoints

### Test Vulnerability Scanner
```bash
# Navigate to http://localhost:3000/tools#tool-vuln
# Enter: https://example.com
# Click: Scan page
```

### Test Bot Simulator
```bash
# Navigate to http://localhost:3000/tools#tool-bot
# Enter: https://example.com/signup
# Adjust sliders as needed
# Click: Run simulation
```

### Test Email Checker
```bash
# Navigate to http://localhost:3000/tools#tool-email
# Enter: test@example.com
# Click: Check risk
```

### Test API Directly
```bash
# Vulnerability Scanner API
curl -X POST http://localhost:3000/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'

# Test rate limiting
for i in {1..15}; do
  curl -X POST http://localhost:3000/api/scan \
    -H "Content-Type: application/json" \
    -d '{"url": "https://example.com"}'
done
# After 10 requests, should get 429 response
```

## FAQ

**Q: Do I need an API key?**
A: No, all tools are free and don't require authentication.

**Q: Is my data stored?**
A: No, all tool results are calculated on-the-fly and not persisted.

**Q: Can I self-host this?**
A: Yes, it's a standard Next.js app. Deploy to any Node.js server or Vercel.

**Q: Are there usage limits?**
A: Yes, 10 API scans per minute per IP. No limit on tool usage itself.

**Q: What's the accuracy of the tools?**
A: They're educational tools showing what attackers can detect. Real protection requires backend implementation.

---

**Last Updated:** March 2026
**Status:** ✅ Production Ready
