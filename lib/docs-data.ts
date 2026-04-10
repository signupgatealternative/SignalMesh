export interface DocSection {
  title: string;
  items: DocItem[];
}

export interface DocItem {
  title: string;
  slug: string;
  badge?: 'beta' | 'new' | 'deprecated';
}

export interface DocPage {
  title: string;
  description?: string;
  badge?: 'beta' | 'new' | 'deprecated';
  content: string;
}

export const navigation: DocSection[] = [
  {
    title: 'Getting Started',
    items: [
      { title: 'Introduction',   slug: 'introduction' },
      { title: 'Quick Start',    slug: 'quick-start', badge: 'new' },
      { title: 'Installation',   slug: 'installation' },
      { title: 'Configuration',  slug: 'configuration' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { title: 'Architecture',      slug: 'architecture' },
      { title: 'Authentication',    slug: 'authentication' },
      { title: 'Risk Scoring',      slug: 'risk-scoring' },
      { title: 'Decision Engine',   slug: 'decision-engine' },
    ],
  },
  {
    title: 'Fraud Engines',
    items: [
      { title: 'IP Intelligence',     slug: 'ip-intelligence' },
      { title: 'Device Reputation',   slug: 'device-reputation' },
      { title: 'Behavior Analysis',   slug: 'behavior-analysis' },
      { title: 'Velocity Engine',     slug: 'velocity-engine' },
      { title: 'Email Intelligence',  slug: 'email-intelligence' },
      { title: 'ML Model (XGBoost)',  slug: 'ml-model', badge: 'new' },
    ],
  },
  {
    title: 'SDK Reference',
    items: [
      { title: 'JavaScript SDK',    slug: 'js-sdk' },
      { title: 'iOS SDK (Swift)',   slug: 'swift-sdk',   badge: 'beta' },
      { title: 'Android SDK',       slug: 'android-sdk', badge: 'beta' },
      { title: 'React Native SDK',  slug: 'react-native-sdk' },
      { title: 'Flutter SDK',       slug: 'flutter-sdk' },
      { title: 'Unity SDK',         slug: 'unity-sdk' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { title: 'SDK Evaluate',    slug: 'api-evaluate' },
      { title: 'Signup Check',    slug: 'api-signup' },
      { title: 'IP Lookup',       slug: 'api-ip-lookup' },
      { title: 'Threat Map',      slug: 'api-threat-map' },
      { title: 'Label Events',    slug: 'api-label', badge: 'new' },
    ],
  },
  {
    title: 'Guides',
    items: [
      { title: 'Training XGBoost',     slug: 'training-ml' },
      { title: 'Threat Feeds Setup',   slug: 'threat-feeds' },
      { title: 'Supabase Schema',      slug: 'supabase-schema' },
      { title: 'Testing SDKs',         slug: 'testing-sdks' },
      { title: 'Deployment',           slug: 'deployment' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { title: 'Changelog',        slug: 'changelog' },
      { title: 'FAQ',              slug: 'faq' },
      { title: 'Troubleshooting',  slug: 'troubleshooting' },
    ],
  },
];

export const docs: Record<string, DocPage> = {

  // ── GETTING STARTED ────────────────────────────────────────────────────────

  introduction: {
    title: 'Introduction',
    description: 'SignalMesh — real-time signup fraud detection for web, mobile, and games.',
    content: `
## What is SignalMesh?

SignalMesh is a real-time fraud detection platform that protects signups, logins, and payments across web, mobile, and game platforms. It combines IP intelligence, device reputation, behavioral analysis, velocity tracking, and machine learning into a single API call.

<callout type="tip">One SDK call replaces weeks of custom fraud logic. Developers get a decision in milliseconds — allow, challenge, or block.</callout>

## How it works

Every time a user attempts to sign up, the SDK silently collects device and behavior signals, sends them to the SignalMesh engine, and returns a risk decision before the form is submitted.

\`\`\`
User fills form → SDK collects signals → Engine scores → Decision returned
     allow / challenge / block
\`\`\`

## What gets detected

| Threat | How |
|---|---|
| Bots | Zero clicks, instant submit, uniform keystrokes |
| Tor / VPN / Proxy | IP intelligence DB + torproject.org |
| Disposable emails | 100k+ domain blocklist |
| Device abuse | Same device → multiple emails |
| Velocity attacks | IP or device flooding signups |
| Bot clusters | Device fraud rate > 60% |
| Residential proxies | ASN + CIDR matching |

## Stack

- **Backend**: FastAPI + Supabase (PostgreSQL)
- **ML**: XGBoost trained on labeled events
- **Threat feeds**: MaxMind GeoLite2, torproject.org, X4BNet, Firehol, IPsum
- **SDKs**: JS, Swift, Kotlin, React Native, Flutter, Unity
    `,
  },

  'quick-start': {
    title: 'Quick Start',
    badge: 'new',
    description: 'Integrate SignalMesh in under 5 minutes.',
    content: `
## 1. Get your API key

Sign up and copy your key from the dashboard. It looks like:

\`\`\`
sk_live_797fb5a96e47029224d24265afab5902
\`\`\`

## 2. Install the SDK

\`\`\`bash
# Web / React
npm install @SignalMesh/sdk

# iOS — add in Xcode → File → Add Package Dependencies
https://github.com/SignalMesh/swift-sdk

# Android — add to build.gradle
implementation 'com.SignalMesh:sdk:1.0.0'
\`\`\`

## 3. Add one call before submit

\`\`\`typescript
import SignalSDK from "@SignalMesh/sdk";

const signal = new SignalSDK({
  apiKey:   "sk_live_your_key",
  endpoint: "https://your-api.com/api/v1",
});

const result = await signal.evaluate({
  event_type: "signup",
  email:      formData.email,
});

if (result.decision === "block")     return showError(result.action.message);
if (result.decision === "challenge") return showCaptcha();
// allow → proceed normally
\`\`\`

## 4. Handle the response

\`\`\`json
{
  "decision":   "block",
  "risk_score": 95,
  "reasons":    ["tor_flag", "disposable_flag", "fast_submission"],
  "action": {
    "proceed":      false,
    "show_captcha": false,
    "block":        true,
    "message":      "This request has been blocked"
  }
}
\`\`\`

<callout type="tip">The SDK auto-collects device fingerprint, typing speed, mouse movements, click count, and timing — you don't need to pass any of that manually.</callout>
    `,
  },

  installation: {
    title: 'Installation',
    description: 'Server setup and SDK installation for all platforms.',
    content: `
## Server requirements

- Python 3.11+
- Supabase project (free tier works)
- MaxMind account (free GeoLite2 license)

## Server setup

\`\`\`bash
git clone https://github.com/SignalMesh/server
cd server
pip install -r requirements.txt

# Set environment variables
export SUPABASE_URL=https://xxx.supabase.co
export SUPABASE_KEY=your_service_role_key
export MAXMIND_LICENSE_KEY=your_maxmind_key

# Download threat feeds + GeoIP databases
python -m app.scripts.updater --all

# Start server
uvicorn app.main:app --reload
\`\`\`

## SDK installation

### JavaScript / TypeScript

\`\`\`bash
npm install @SignalMesh/sdk
# or
pnpm add @SignalMesh/sdk
\`\`\`

### iOS (Swift Package Manager)

In Xcode: **File → Add Package Dependencies**

\`\`\`
https://github.com/SignalMesh/swift-sdk
\`\`\`

Or in \`Package.swift\`:

\`\`\`swift
dependencies: [
  .package(url: "https://github.com/SignalMesh/swift-sdk", from: "1.0.0")
]
\`\`\`

### Android (Gradle)

\`\`\`groovy
dependencies {
  implementation 'com.SignalMesh:sdk:1.0.0'
}
\`\`\`

### React Native

\`\`\`bash
npm install @SignalMesh/react-native-sdk react-native-device-info
\`\`\`

### Flutter

\`\`\`bash
flutter pub add SignalMesh_sdk
\`\`\`
    `,
  },

  configuration: {
    title: 'Configuration',
    description: 'Environment variables, rule weights, and scoring thresholds.',
    content: `
## Environment variables

\`\`\`env
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_KEY=your_service_role_key

# MaxMind GeoIP
MAXMIND_LICENSE_KEY=your_key

# App
APP_ENV=production
DEBUG=false
\`\`\`

## Rule weights

Edit \`app/core/constants.py\` to tune sensitivity:

\`\`\`python
RULE_WEIGHTS = {
  # IP threat signals
  "tor_flag":     50,
  "threat_flag":  40,
  "vpn_flag":     40,
  "proxy_flag":   30,
  "hosting_flag": 25,
  "velocity_flag": 40,

  # Email
  "disposable_flag": 50,

  # Device
  "suspicious_user_agent": 40,
  "low_entropy_device":    30,
  "headless_screen":       25,

  # Behavior
  "fast_submission":   40,
  "no_clicks":         20,
  "no_typing":         20,
  "no_mouse_movement": 20,
  "high_typing_speed": 20,
}
\`\`\`

## Decision thresholds

\`\`\`python
# app/risk/decision_engine.py
def make_decision(score):
  if score >= 70: return "block"
  if score >= 40: return "challenge"
  return "allow"
\`\`\`

## Behavior thresholds

\`\`\`python
# app/intelligence/behavior_engine.py
time_to_submit  < 10s   → fast_submission flag
click_count     < 3     → no_clicks flag
typing_speed    < 10    → no_typing flag
mouse_movements < 20    → no_mouse_movement flag
typing_speed    > 200   → high_typing_speed flag (bot autofill)
\`\`\`

## Velocity thresholds

\`\`\`python
# app/intelligence/velocity_engine.py
ip_1h     >= 5   → flag   |  >= 20 → hard block
ip_24h    >= 20  → flag   |  >= 50 → hard block
device_1h >= 3   → flag   |  >= 10 → hard block
email_1h  >= 2   → flag
\`\`\`
    `,
  },

  // ── CORE CONCEPTS ──────────────────────────────────────────────────────────

  architecture: {
    title: 'Architecture',
    description: 'How SignalMesh processes every signup event.',
    content: `
## Pipeline overview

Every signup flows through 6 stages in sequence:

\`\`\`
Payload → Feature Builder → Rule Engine + XGBoost → Ensemble → Decision → Log
\`\`\`

## Stage 1: Feature builder

Runs 5 engines in parallel:

\`\`\`python
ip_result, email_result, device_result, behavior_result, vel_result = await asyncio.gather(
  analyze_ip(payload.ip),
  analyze_email(payload.email),
  analyze_device(device_data),
  analyze_behavior(behavior_data),
  check_velocity(ip, device_id, email),
)
\`\`\`

Produces ~35 numeric features per event.

## Stage 2: Rule engine

Applies weighted flag scoring:

\`\`\`python
for rule, weight in RULE_WEIGHTS.items():
  if features.get(rule) == 1:
    rule_score += weight
\`\`\`

## Stage 3: XGBoost

Runs ML inference on the same feature vector:

\`\`\`python
ml_score = model.predict_proba(features)[0][1] * 100  # 0–100
\`\`\`

## Stage 4: Ensemble

Combines both scores:

\`\`\`
final_score = rule_score × 0.4 + ml_score × 0.6
\`\`\`

Rules are instant. ML improves with data over time.

## Stage 5: Decision

\`\`\`
score ≥ 70 → block
score ≥ 40 → challenge
score < 40 → allow
\`\`\`

## Stage 6: Logging

Every event is persisted to Supabase:
- \`events\` table — decision, score, IP, email, device_id
- \`event_features\` table — all 35 feature values (used for ML retraining)
- \`devices\` table — reputation upsert
- \`ip_cache\` table — 7-day geo cache
    `,
  },

  authentication: {
    title: 'Authentication',
    description: 'API key management and organization setup.',
    content: `
## API keys

All requests require an \`x-api-key\` header:

\`\`\`bash
curl -X POST https://your-api.com/api/v1/sdk/evaluate \\
  -H 'x-api-key: sk_live_your_key' \\
  -H 'Content-Type: application/json' \\
  -d '{...}'
\`\`\`

## Key format

\`\`\`
sk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   # production
sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx   # test mode
\`\`\`

## Organization model

Every API key is scoped to an organization. Events are isolated per org.

\`\`\`python
# Resolved automatically from x-api-key header
org = await get_current_org(api_key)
organization_id = org["organization_id"]
\`\`\`

<callout type="warning">Never expose your API key in client-side code. The SDK sends requests through your backend, not directly to SignalMesh.</callout>

## Key rotation

Generate a new key from the dashboard. Old keys remain valid for 24h during rotation.
    `,
  },

  'risk-scoring': {
    title: 'Risk Scoring',
    description: 'How risk scores are calculated from 0 to 100.',
    content: `
## Score range

| Range | Decision | Meaning |
|---|---|---|
| 0–39 | allow | Low risk — proceed |
| 40–69 | challenge | Suspicious — show captcha |
| 70–100 | block | High risk — reject |

## What contributes to score

### IP signals (up to 50 pts each)
- Tor exit node: **+50**
- Known threat IP: **+40**
- VPN detected: **+40**
- Proxy detected: **+30**
- Datacenter/hosting: **+25**
- High velocity: **+up to 40**

### Email signals
- Disposable domain: **+50**

### Device signals
- Suspicious user agent (curl, python, headless): **+40**
- Low entropy (missing fields): **+30**
- Headless screen resolution (0x0): **+25**

### Behavior signals
- Submission in < 10 seconds: **+40**
- Zero clicks: **+20**
- Zero typing: **+20**
- Zero mouse movement: **+20**
- Inhuman typing speed: **+20**

### Device reputation
- Same device, 3+ different emails: **+30**
- Known fraud device: **+40**
- Bot cluster detected: **+50**

## Score is capped at 100

\`\`\`python
rule_score = min(rule_score, 100)
\`\`\`

## Ensemble with ML

Once XGBoost is trained (100+ labeled samples):

\`\`\`
final = rule_score × 0.4 + ml_score × 0.6
\`\`\`
    `,
  },

  'decision-engine': {
    title: 'Decision Engine',
    description: 'How allow, challenge, and block decisions are made.',
    content: `
## Decisions

| Decision | Score | What to do |
|---|---|---|
| \`allow\` | < 40 | Proceed normally |
| \`challenge\` | 40–69 | Show CAPTCHA or email OTP |
| \`block\` | ≥ 70 | Reject the request |

## Hard blocks (skip ML entirely)

Certain signals trigger immediate block without scoring:

\`\`\`python
if features.get("hard_block_velocity"):   # IP flooding
    decision = "block"

if features.get("bot_cluster"):           # known bot device
    decision = "block"
\`\`\`

## Action object

Every response includes an \`action\` object — ready to use directly in your UI:

\`\`\`json
// allow
{ "proceed": true,  "show_captcha": false, "block": false, "message": null }

// challenge
{ "proceed": false, "show_captcha": true,  "block": false, "message": "Please verify you're human" }

// block
{ "proceed": false, "show_captcha": false, "block": true,  "message": "This request has been blocked" }
\`\`\`

## Customizing thresholds

\`\`\`python
# app/risk/decision_engine.py
def make_decision(score):
  if score >= 70: return "block"     # raise to 80 to be more lenient
  if score >= 40: return "challenge" # raise to 60 to reduce captchas
  return "allow"
\`\`\`
    `,
  },

  // ── FRAUD ENGINES ──────────────────────────────────────────────────────────

  'ip-intelligence': {
    title: 'IP Intelligence',
    description: 'Self-hosted geo, threat, and reputation data for every IP.',
    content: `
## What it detects

- Country, city, lat/lon, timezone, currency
- ISP, ASN, organization
- Tor exit node
- VPN provider
- Datacenter / hosting
- Known threat / spam IP
- Proxy

## Data sources

| Source | Data | Update frequency |
|---|---|---|
| MaxMind GeoLite2-City | Geo location | Weekly (Tuesdays) |
| MaxMind GeoLite2-ASN | ISP / ASN | Weekly |
| torproject.org | Tor exit nodes | Every 30 minutes |
| X4BNet | VPN / datacenter ranges | Weekly |
| Firehol | Proxy CIDR ranges | Daily |
| IPsum / Spamhaus | Threat IPs | Daily |

## Response shape

\`\`\`json
{
  "query":         "185.220.101.45",
  "status":        "success",
  "country":       "Germany",
  "countryCode":   "DE",
  "city":          "Frankfurt",
  "lat":           50.1109,
  "lon":           8.6821,
  "timezone":      "Europe/Berlin",
  "currency":      "EUR",
  "isp":           "Tor Project",
  "asn":           "AS396507",
  "tor":           true,
  "vpn":           false,
  "proxy":         false,
  "hosting":       false,
  "ip_score":      50,
  "flags":         ["tor"],
  "cache_hit":     false
}
\`\`\`

## Caching

Results are cached in Supabase for 7 days. Cache hit = zero latency.

\`\`\`sql
SELECT * FROM ip_cache
WHERE ip = '185.220.101.45'
  AND expires_at > NOW();
\`\`\`

## Standalone IP lookup

\`\`\`bash
GET /api/v1/ip/lookup/185.220.101.45
\`\`\`
    `,
  },

  'device-reputation': {
    title: 'Device Reputation',
    description: 'Track device history across signups to catch multi-account abuse.',
    content: `
## What it tracks

Every device gets a fingerprint (SHA-256 of user_agent + os + browser + timezone). The reputation system tracks:

- How many emails this device has used
- How many fraud/block events this device has
- Rolling average risk score
- Whether it's part of a bot cluster

## Reputation score formula

\`\`\`sql
reputation_score = LEAST(
  email_count * 10 +
  fraud_count * 20 +
  risk_score_avg * 0.5,
  100
)
\`\`\`

## Bot cluster detection

\`\`\`sql
is_bot_cluster = (
  total_events > 5 AND
  fraud_count::FLOAT / total_events > 0.6
)
\`\`\`

If a device has submitted 10 times and 7 were blocked → \`is_bot_cluster = true\` → instant block on next attempt.

## Flags

| Flag | Trigger |
|---|---|
| \`multi_email_device\` | 3+ different emails from same device |
| \`high_email_churn\` | 10+ emails from same device |
| \`repeat_fraud_device\` | 2+ block events from this device |
| \`bot_cluster\` | >60% fraud rate on device |
| \`high_reputation_score\` | Reputation score ≥ 60 |

## Supabase tables

\`\`\`sql
devices       -- device_id, fraud_count, email_count, reputation_score
device_emails -- device_id ↔ email mapping (unique pairs)
\`\`\`
    `,
  },

  'behavior-analysis': {
    title: 'Behavior Analysis',
    description: 'Detect bots through interaction patterns — timing, clicks, typing.',
    content: `
## Signals collected by SDK

| Signal | Web | iOS | Android |
|---|---|---|---|
| Time to submit | ✅ | ✅ | ✅ |
| Click / touch count | ✅ | ✅ | ✅ |
| Typing speed (keys/min) | ✅ | ✅ | ✅ |
| Mouse movements | ✅ | — | — |
| Keystroke intervals | ✅ | ✅ | ✅ |
| Paste count | ✅ | — | — |
| Tab switching | ✅ | — | — |

## Thresholds

\`\`\`python
time_to_submit  < 10s   → fast_submission  (+40 pts)
time_to_submit  < 2s    → instant_submission (+20 pts extra)
click_count     < 3     → no_clicks        (+20 pts)
typing_speed    < 10    → no_typing        (+20 pts)
mouse_movements < 20    → no_mouse_movement (+20 pts)
typing_speed    > 200   → high_typing_speed (+20 pts)
paste_count     > 2     → paste_abuse
\`\`\`

## Keystroke dynamics

The SDK captures intervals between keypresses (in ms). Uniform intervals (e.g. exactly 100ms between every key) indicate scripted input:

\`\`\`typescript
// SDK collects automatically
keyIntervals: [110, 95, 130, 88, 102]  // human — variable
keyIntervals: [100, 100, 100, 100, 100] // bot — uniform
\`\`\`

## Human vs bot comparison

| Metric | Human | Bot |
|---|---|---|
| Time to submit | 15–120s | < 2s |
| Click count | 3–15 | 0 |
| Mouse movements | 50–500 | 0 |
| Typing speed | 20–150 | 0 or > 300 |
| Key intervals | Variable (±30ms) | Uniform (< 5ms variance) |
    `,
  },

  'velocity-engine': {
    title: 'Velocity Engine',
    description: 'Real-time sliding window rate limiting across IP, device, and email.',
    content: `
## What it tracks

Sliding window counters stored in Supabase:

\`\`\`
ip:{ip}:1h         → signups from this IP in last 1 hour
ip:{ip}:24h        → signups from this IP in last 24 hours
device:{id}:1h     → signups from this device in last 1 hour
device:{id}:24h    → signups from this device in last 24 hours
email:{email}:1h   → attempts with this email in last 1 hour
\`\`\`

## Thresholds

| Counter | Flag threshold | Hard block threshold |
|---|---|---|
| IP (1h) | 5 | 20 |
| IP (24h) | 20 | 50 |
| Device (1h) | 3 | 10 |
| Device (24h) | 10 | 30 |
| Email (1h) | 2 | — |

## Hard block

When a hard block threshold is crossed, ML scoring is skipped:

\`\`\`python
if features.get("hard_block_velocity"):
  decision    = "block"
  final_score = 100
  # XGBoost not called — saves latency
\`\`\`

## Supabase counter upsert

\`\`\`sql
-- increment_velocity(key, window) → returns new count
INSERT INTO velocity_counters (key, count, expires_at)
VALUES (p_key, 1, NOW() + p_window)
ON CONFLICT (key) DO UPDATE SET
  count      = CASE WHEN expires_at < NOW() THEN 1
               ELSE velocity_counters.count + 1 END,
  expires_at = CASE WHEN expires_at < NOW() THEN NOW() + p_window
               ELSE velocity_counters.expires_at END;
\`\`\`
    `,
  },

  'email-intelligence': {
    title: 'Email Intelligence',
    description: 'Disposable email detection and domain heuristics.',
    content: `
## What it detects

- Disposable / throwaway email providers
- Suspicious domain length
- Numeric-heavy local parts (user123456@)

## Disposable domain list

100,000+ domains loaded from:

\`\`\`
github.com/disposable-email-domains/disposable-email-domains
\`\`\`

Updated daily. Fallback hardcoded list includes:

\`\`\`
mailinator.com, guerrillamail.com, tempmail.com,
throwaway.email, yopmail.com, trashmail.com,
maildrop.cc, fakeinbox.com, spamgourmet.com ...
\`\`\`

## Loading on startup

\`\`\`python
# app/core/lifecycle.py
@asynccontextmanager
async def lifespan(app):
  load_disposable_domains()   # loads from file into memory set
  yield
\`\`\`

## Score contribution

\`\`\`python
if disposable:         score += 60   # +60 pts
if len(domain) > 30:   score += 10   # suspicious length
if digit_ratio > 0.5:  score += 10   # user123456@
\`\`\`

## Response

\`\`\`json
{
  "email_score": 60,
  "disposable":  true,
  "domain":      "mailinator.com",
  "flags":       ["disposable_email"]
}
\`\`\`
    `,
  },

  'ml-model': {
    title: 'ML Model (XGBoost)',
    badge: 'new',
    description: 'Train and deploy XGBoost on your labeled event history.',
    content: `
## How it works

XGBoost trains on your labeled events stored in Supabase. Each event has ~35 features. The model outputs a fraud probability (0–1) which becomes a 0–100 ML score.

## Feature vector (35 features)

\`\`\`python
ML_FEATURES = [
  # Scores
  "ip_score", "email_score", "device_score",
  "behavior_score", "velocity_score", "reputation_score",
  # IP flags
  "tor_flag", "vpn_flag", "proxy_flag", "hosting_flag", "threat_flag",
  # Email
  "disposable_flag",
  # Device
  "low_entropy_device", "suspicious_ua", "headless_screen", "device_entropy",
  # Behavior
  "fast_submission", "no_clicks", "no_typing",
  "no_mouse_movement", "high_typing_speed",
  # Velocity
  "ip_velocity_1h", "ip_velocity_24h",
  "device_velocity_1h", "device_velocity_24h",
  "ip_count_1h", "ip_count_24h",
  # Reputation
  "multi_email_device", "repeat_fraud_device", "bot_cluster",
  "device_email_count", "device_fraud_count",
]
\`\`\`

## Training

\`\`\`bash
# Requires 100+ labeled events
python -m app.ml.trainer
\`\`\`

Output:

\`\`\`
[trainer] Loaded 1240 labeled samples
[trainer] Label distribution: 0→1102  1→138
[trainer] scale_pos_weight: 7.99
[trainer] Metrics: accuracy=0.9612 precision=0.8800 recall=0.8333 f1=0.8560
[trainer] Top features:
  tor_flag:           0.1821
  ip_count_1h:        0.1234
  fast_submission:    0.1102
  disposable_flag:    0.0981
  reputation_score:   0.0823
\`\`\`

## Labeling events

\`\`\`bash
POST /api/v1/label/
{
  "event_id": "uuid-here",
  "label":    1,          # 1 = fraud, 0 = legit
  "source":   "manual"
}
\`\`\`

## Auto-retraining

Every Sunday at midnight, the lifecycle scheduler retrains the model automatically if ≥ 100 labeled events exist.

## Accuracy over time

| Phase | Samples | Accuracy |
|---|---|---|
| Rules only | — | ~70% |
| Week 4 | 100+ | ~88% |
| Month 3 | 1000+ | ~94% |
| Month 6+ | 5000+ | ~96% |
    `,
  },

  // ── SDK REFERENCE ──────────────────────────────────────────────────────────

  'js-sdk': {
    title: 'JavaScript SDK',
    description: 'Full browser and Node.js SDK with auto behavior collection.',
    content: `
## Install

\`\`\`bash
npm install @SignalMesh/sdk
\`\`\`

## Basic usage

\`\`\`typescript
import SignalSDK from "@SignalMesh/sdk";

const signal = new SignalSDK({
  apiKey:      "sk_live_your_key",
  endpoint:    "https://your-api.com/api/v1",
  debug:       false,
  autoCollect: true,   // auto-collects mouse, typing, clicks
});

const result = await signal.evaluate({
  event_type: "signup",
  email:      "user@example.com",
});
\`\`\`

## React hook

\`\`\`typescript
import { useSignal } from "@SignalMesh/sdk/react";

function SignupForm() {
  const { evaluate } = useSignal({
    apiKey:   "sk_live_your_key",
    endpoint: "https://your-api.com/api/v1",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await evaluate({ event_type: "signup", email });

    if (result.decision === "block")     return setError(result.action.message);
    if (result.decision === "challenge") return setShowCaptcha(true);
    await submitToBackend();
  };
}
\`\`\`

## Auto-collected signals

| Signal | Description |
|---|---|
| \`time_to_submit\` | Seconds from page load to submit |
| \`click_count\` | Total mouse clicks |
| \`mouse_movements\` | Total mouse move events |
| \`typing_speed\` | Keys per minute |
| \`key_intervals\` | Time between keypresses (ms) |
| \`paste_count\` | Ctrl+V / right-click paste |
| \`focus_changes\` | Tab switches away from page |

## Config options

\`\`\`typescript
new SignalSDK({
  apiKey:      string,    // required
  endpoint:    string,    // required
  debug:       boolean,   // logs to console
  autoCollect: boolean,   // default true
  onResult:    (result) => void,   // callback
})
\`\`\`
    `,
  },

  'swift-sdk': {
    title: 'iOS SDK (Swift)',
    badge: 'beta',
    description: 'Native Swift SDK for iOS apps with touch and keystroke collection.',
    content: `
## Install (Swift Package Manager)

In Xcode: **File → Add Package Dependencies**

\`\`\`
https://github.com/SignalMesh/swift-sdk
\`\`\`

## Configure once (AppDelegate or @main)

\`\`\`swift
import SignalMesh

SignalMesh.shared.configure(SignalConfig(
  apiKey:   "sk_live_your_key",
  endpoint: "https://your-api.com/api/v1",
  debug:    true
))
\`\`\`

## Evaluate on submit

\`\`\`swift
let result = try await SignalMesh.shared.evaluate(
  EvaluateOptions(
    eventType: "signup",
    email:     emailField.text
  )
)

switch result.decision {
case .allow:
  await submitSignup()
case .challenge:
  showCaptchaView()
case .block:
  showAlert(result.action.message ?? "Blocked")
}
\`\`\`

## Collect behavior signals

Hook into your text fields and buttons:

\`\`\`swift
// On every keystroke
TextField("Email", text: $email)
  .onChange(of: email) { _ in
    SignalMesh.shared.collector.onKeyPress()
  }

// On button tap
Button("Sign Up") {
  SignalMesh.shared.collector.onTouch()
  Task { await handleSignup() }
}

// On paste
.onPasteCommand { _ in
  SignalMesh.shared.collector.onPaste()
}
\`\`\`

## Auto-collected signals

- \`time_to_submit\` — seconds from view appear to evaluate()
- \`touch_events\` — tap count
- \`typing_speed\` — keys/min
- \`key_intervals\` — ms between keypresses
- \`paste_count\` — paste events
- Device: OS version, model, screen, timezone, app version
    `,
  },

  'android-sdk': {
    title: 'Android SDK (Kotlin)',
    badge: 'beta',
    description: 'Native Kotlin SDK with coroutines, OkHttp, and auto device collection.',
    content: `
## Install

\`\`\`groovy
// build.gradle (app)
dependencies {
  implementation 'com.SignalMesh:sdk:1.0.0'
}
\`\`\`

## Configure once (Application class)

\`\`\`kotlin
import com.SignalMesh.SignalMesh
import com.SignalMesh.SignalConfig

class MyApp : Application() {
  override fun onCreate() {
    super.onCreate()
    SignalMesh.configure(
      context = this,
      config  = SignalConfig(
        apiKey   = "sk_live_your_key",
        endpoint = "https://your-api.com/api/v1",
        debug    = BuildConfig.DEBUG
      )
    )
  }
}
\`\`\`

## Evaluate in your Activity / Fragment

\`\`\`kotlin
lifecycleScope.launch {
  val result = SignalMesh.evaluate(
    EvaluateOptions(
      eventType = "signup",
      email     = emailInput.text.toString()
    )
  )

  when (result.decision) {
    "allow"     -> submitSignup()
    "challenge" -> showCaptchaDialog()
    "block"     -> showBlockMessage(result.action.message)
  }
}
\`\`\`

## Collect behavior signals

\`\`\`kotlin
emailInput.addTextChangedListener {
  SignalMesh.collector.onKeyPress()
}

signupButton.setOnClickListener {
  SignalMesh.collector.onTouch()
  // ...
}

// Or auto-attach to any view
SignalMesh.collector.attachTo(signupButton)
\`\`\`

## Manifest permissions

\`\`\`xml
<uses-permission android:name="android.permission.INTERNET" />
\`\`\`
    `,
  },

  'react-native-sdk': {
    title: 'React Native SDK',
    description: 'Cross-platform SDK for iOS and Android React Native apps.',
    content: `
## Install

\`\`\`bash
npm install @SignalMesh/react-native-sdk react-native-device-info
npx pod-install   # iOS
\`\`\`

## Usage

\`\`\`typescript
import SignalSDK from "@SignalMesh/react-native-sdk";

const sdk = new SignalSDK({
  apiKey:   "sk_live_your_key",
  endpoint: "https://your-api.com/api/v1",
});

const handleSignup = async () => {
  const result = await sdk.evaluate({
    event_type: "signup",
    email:      email,
  });

  if (result.decision === "block") {
    Alert.alert("Blocked", result.action.message);
    return;
  }
  if (result.decision === "challenge") {
    navigation.navigate("CaptchaScreen");
    return;
  }
  await submitSignup();
};
\`\`\`

## Collect behavior in TextInput

\`\`\`tsx
<TextInput
  onChangeText={setText}
  onKeyPress={() => sdk.collector.onKeyPress()}
  onFocus={() => {}}
/>

<TouchableOpacity onPress={() => {
  sdk.collector.onTouch();
  handleSignup();
}}>
  <Text>Sign Up</Text>
</TouchableOpacity>
\`\`\`
    `,
  },

  'flutter-sdk': {
    title: 'Flutter SDK',
    description: 'Dart SDK for Flutter apps — iOS and Android from one codebase.',
    content: `
## Install

\`\`\`yaml
# pubspec.yaml
dependencies:
  SignalMesh_sdk: ^1.0.0
  device_info_plus: ^9.0.0
  package_info_plus: ^4.0.0
  http: ^1.0.0
\`\`\`

\`\`\`bash
flutter pub get
\`\`\`

## Usage

\`\`\`dart
import 'package:SignalMesh_sdk/SignalMesh_sdk.dart';

final sdk = SignalSDK(
  apiKey:   "sk_live_your_key",
  endpoint: "https://your-api.com/api/v1",
  debug:    kDebugMode,
);

Future<void> handleSignup() async {
  final result = await sdk.evaluate(
    eventType: "signup",
    email:     _emailController.text,
  );

  switch (result["decision"]) {
    case "allow":
      await submitSignup();
      break;
    case "challenge":
      Navigator.pushNamed(context, "/captcha");
      break;
    case "block":
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(result["action"]["message"])),
      );
      break;
  }
}
\`\`\`

## Collect touch events

\`\`\`dart
GestureDetector(
  onTap: () => sdk.collector.onTouch(),
  child: TextField(
    onChanged: (_) => sdk.collector.onKeyPress(),
  ),
)
\`\`\`
    `,
  },

  'unity-sdk': {
    title: 'Unity SDK (C#)',
    description: 'Fraud detection for games — detect bot account farms and payment fraud.',
    content: `
## Install

Download \`SignalSDK.cs\` from releases and drag into your \`Assets/Plugins/\` folder.

## Setup in scene

Add \`SignalSDK\` component to a GameObject:

\`\`\`
Inspector:
  Api Key:  sk_live_your_key
  Endpoint: https://your-api.com/api/v1
  Debug:    ✓ (dev builds)
\`\`\`

## Usage

\`\`\`csharp
using SignalMesh;

public class GameSignup : MonoBehaviour
{
  [SerializeField] private SignalSDK signal;

  public void OnSignupClick()
  {
    signal.Evaluate(
      eventType: "signup",
      email:     emailInput.text,
      onResult:  HandleResult
    );
  }

  private void HandleResult(EvaluateResult result)
  {
    switch (result.decision)
    {
      case "allow":     SubmitSignup();       break;
      case "challenge": ShowCaptchaPanel();   break;
      case "block":     ShowBlockUI(result.action.message); break;
    }
  }
}
\`\`\`

## Collect player input

\`\`\`csharp
void Update()
{
  if (Input.GetMouseButtonDown(0))
    signal.Collector.OnClick();

  if (Input.anyKeyDown)
    signal.Collector.OnKeyPress();
}
\`\`\`

<callout type="tip">Use SignalMesh on account creation, in-app purchases, and gift code redemption to stop bot farms.</callout>
    `,
  },

  // ── API REFERENCE ──────────────────────────────────────────────────────────

  'api-evaluate': {
    title: 'POST /sdk/evaluate',
    description: 'Primary endpoint — evaluate any event from any SDK.',
    content: `
## Endpoint

\`\`\`
POST /api/v1/sdk/evaluate
\`\`\`

## Headers

\`\`\`
Content-Type: application/json
x-api-key:    sk_live_your_key
\`\`\`

## Request body

\`\`\`json
{
  "session_id":  "uuid-generated-by-sdk",
  "event_type":  "signup",
  "email":       "user@example.com",
  "phone":       "+91-9876543210",
  "user_id":     "optional-existing-id",
  "ip":          "49.37.201.100",
  "device": {
    "platform":          "ios",
    "os":                "iOS 17.0",
    "browser":           "native",
    "user_agent":        "iPhone14,3",
    "screen_resolution": "390x844",
    "timezone":          "Asia/Kolkata",
    "language":          "en",
    "sdk_version":       "1.0.0",
    "app_version":       "2.1.0"
  },
  "behavior": {
    "time_to_submit":  32.5,
    "touch_events":    12,
    "click_count":     12,
    "typing_speed":    48.0,
    "mouse_movements": 0,
    "key_intervals":   [110, 95, 130, 88, 102],
    "paste_count":     0,
    "focus_changes":   1
  }
}
\`\`\`

## Response

\`\`\`json
{
  "session_id":  "uuid",
  "event_id":    "uuid",
  "decision":    "block",
  "risk_score":  92,
  "reasons":     ["tor_flag", "disposable_flag", "fast_submission"],
  "action": {
    "proceed":      false,
    "show_captcha": false,
    "block":        true,
    "message":      "This request has been blocked"
  },
  "device_id": "sha256-fingerprint"
}
\`\`\`

## Event types

\`\`\`
signup    login    payment    password_reset    custom
\`\`\`
    `,
  },

  'api-signup': {
    title: 'POST /signup/signup',
    description: 'Direct signup check endpoint — for server-to-server integration.',
    content: `
## Endpoint

\`\`\`
POST /api/v1/signup/signup
\`\`\`

## Example request

\`\`\`bash
curl -X POST 'http://localhost:8000/api/v1/signup/signup' \\
  -H 'x-api-key: sk_live_your_key' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "ip": "49.37.201.100",
    "email": "john@gmail.com",
    "device": {
      "user_agent":        "Mozilla/5.0 Chrome/120.0",
      "os":                "Windows",
      "browser":           "Chrome",
      "screen_resolution": "1920x1080",
      "timezone":          "Asia/Kolkata"
    },
    "behavior": {
      "time_to_submit":  45.0,
      "click_count":     8,
      "typing_speed":    62.0,
      "mouse_movements": 120
    }
  }'
\`\`\`

## Test payloads

### Allow (clean human signal)

\`\`\`json
{
  "ip": "49.37.201.100", "email": "john@gmail.com",
  "device": { "user_agent": "Mozilla/5.0 Chrome/120.0",
    "os": "Windows", "browser": "Chrome",
    "screen_resolution": "1920x1080", "timezone": "Asia/Kolkata" },
  "behavior": { "time_to_submit": 45.0, "click_count": 8,
    "typing_speed": 62.0, "mouse_movements": 120 }
}
\`\`\`

### Challenge (suspicious)

\`\`\`json
{
  "ip": "49.37.201.100", "email": "user123@yahoo.com",
  "device": { "user_agent": "Mozilla/5.0 Chrome/119.0",
    "os": "Linux", "browser": "Chrome",
    "screen_resolution": "1280x720", "timezone": "Europe/Amsterdam" },
  "behavior": { "time_to_submit": 12.0, "click_count": 3,
    "typing_speed": 25.0, "mouse_movements": 25 }
}
\`\`\`

### Block (bot)

\`\`\`json
{
  "ip": "185.220.101.45", "email": "test@mailinator.com",
  "device": { "user_agent": "python-requests/2.31.0",
    "os": "Linux", "browser": "Other",
    "screen_resolution": "0x0", "timezone": "UTC" },
  "behavior": { "time_to_submit": 0.5, "click_count": 0,
    "typing_speed": 0, "mouse_movements": 0 }
}
\`\`\`
    `,
  },

  'api-ip-lookup': {
    title: 'GET /ip/lookup/{ip}',
    description: 'Standalone IP intelligence endpoint.',
    content: `
## Endpoint

\`\`\`
GET /api/v1/ip/lookup/{ip}
\`\`\`

## Example

\`\`\`bash
curl https://your-api.com/api/v1/ip/lookup/49.37.201.100 \\
  -H 'x-api-key: sk_live_your_key'
\`\`\`

## Response

\`\`\`json
{
  "query":         "49.37.201.100",
  "status":        "success",
  "continent":     "Asia",
  "continentCode": "AS",
  "country":       "India",
  "countryCode":   "IN",
  "region":        "TN",
  "regionName":    "Tamil Nadu",
  "city":          "Chennai",
  "zip":           "600001",
  "lat":           13.0895,
  "lon":           80.2739,
  "timezone":      "Asia/Kolkata",
  "offset":        19800,
  "currency":      "INR",
  "isp":           "Reliance Jio Infocomm Limited",
  "org":           "JIO FTTX SUBSCRIBER",
  "as":            "AS55836 Reliance Jio Infocomm Limited",
  "asname":        "RELIANCEJIO-IN",
  "mobile":        true,
  "proxy":         false,
  "vpn":           false,
  "tor":           false,
  "hosting":       false,
  "ip_score":      0,
  "flags":         [],
  "cache_hit":     false,
  "map_url":       "https://maps.google.com/?q=13.0895,80.2739"
}
\`\`\`

## Batch lookup

\`\`\`
GET /api/v1/ip/batch?ips=1.2.3.4,5.6.7.8,9.10.11.12
\`\`\`
    `,
  },

  'api-threat-map': {
    title: 'GET /threat-map',
    description: 'Geo-enriched fraud events for building a live threat map.',
    content: `
## Endpoint

\`\`\`
GET /api/v1/threat-map/?hours=24&decision=block
\`\`\`

## Parameters

| Param | Default | Description |
|---|---|---|
| \`hours\` | 24 | Lookback window (1–168) |
| \`decision\` | all | Filter by allow / challenge / block |

## Response

\`\`\`json
{
  "total":  142,
  "hours":  24,
  "by_decision": { "block": 98, "challenge": 31, "allow": 13 },
  "by_country":  { "DE": 42, "RU": 28, "US": 19, "CN": 14 },
  "by_flag":     { "tor_flag": 67, "disposable_flag": 45 },
  "points": [
    {
      "lat":      50.1109,
      "lon":      8.6821,
      "city":     "Frankfurt",
      "country":  "Germany",
      "decision": "block",
      "score":    95,
      "tor":      true,
      "vpn":      false,
      "flags":    ["tor_flag", "fast_submission"],
      "ts":       "2024-01-15T14:23:01Z"
    }
  ]
}
\`\`\`

<callout type="tip">Feed the points array directly into Leaflet, Mapbox, or deck.gl to build a real-time threat heatmap.</callout>
    `,
  },

  'api-label': {
    title: 'POST /label',
    badge: 'new',
    description: 'Label events as fraud or legit to build XGBoost training data.',
    content: `
## Endpoint

\`\`\`
POST /api/v1/label/
\`\`\`

## Request

\`\`\`json
{
  "event_id": "uuid-from-event-log",
  "label":    1,
  "source":   "manual"
}
\`\`\`

## Labels

| Value | Meaning |
|---|---|
| \`1\` | Fraud / confirmed bad |
| \`0\` | Legitimate / false positive cleared |

## Sources

\`\`\`
manual       → human review
chargeback   → payment reversed
report       → user reported
automated    → rule-triggered
\`\`\`

## Response

\`\`\`json
{
  "status":   "labeled",
  "event_id": "uuid",
  "label":    1
}
\`\`\`

## Workflow

1. Event arrives → decision = block (risk_score = 92)
2. Human reviews → confirms fraud
3. Call \`POST /label\` with label=1
4. Event added to XGBoost training dataset
5. Weekly retraining automatically picks it up
    `,
  },

  // ── GUIDES ─────────────────────────────────────────────────────────────────

  'training-ml': {
    title: 'Training XGBoost',
    description: 'Step-by-step guide to collect labels and train your ML model.',
    content: `
## Prerequisites

- 100+ labeled events in Supabase
- \`xgboost scikit-learn pandas numpy joblib\` installed

## Step 1: Install ML dependencies

\`\`\`bash
pip install xgboost scikit-learn pandas numpy joblib --break-system-packages
\`\`\`

## Step 2: Start collecting events

Run SignalMesh normally. Every signup creates an event in Supabase. You need to label at least 100 of them (both fraud and legit).

## Step 3: Label events

\`\`\`bash
# Label a fraud event
curl -X POST https://your-api.com/api/v1/label/ \\
  -H 'x-api-key: sk_live_your_key' \\
  -d '{"event_id": "uuid", "label": 1}'

# Clear a false positive
curl -X POST https://your-api.com/api/v1/label/ \\
  -H 'x-api-key: sk_live_your_key' \\
  -d '{"event_id": "uuid", "label": 0}'
\`\`\`

## Step 4: Train

\`\`\`bash
python -m app.ml.trainer
\`\`\`

Expect output like:

\`\`\`
[trainer] Loaded 847 labeled samples
[trainer] Metrics: accuracy=0.9612 f1=0.8560
[trainer] Top features:
  tor_flag:        0.1821
  ip_count_1h:     0.1234
  fast_submission: 0.1102
✅ Model saved to app/ml/models/xgb_fraud.joblib
\`\`\`

## Step 5: Restart server

The model loads on startup automatically. Hot reload picks it up from the weekly scheduler after that.

## Step 6: Verify ensemble is active

\`\`\`python
# In response, check that ml_score is present and > 0
{ "risk_score": 85, "ml_score": 91.2, "rule_score": 75 }
\`\`\`
    `,
  },

  'threat-feeds': {
    title: 'Threat Feeds Setup',
    description: 'Download and configure GeoIP and threat intelligence databases.',
    content: `
## MaxMind GeoLite2 (free)

1. Sign up at https://dev.maxmind.com
2. Generate a free license key
3. Add to environment:

\`\`\`env
MAXMIND_LICENSE_KEY=your_key_here
\`\`\`

4. Download databases:

\`\`\`bash
python -m app.scripts.updater --geoip
\`\`\`

## All feeds (first run)

\`\`\`bash
python -m app.scripts.updater --all
\`\`\`

Downloads and loads into Supabase:
- Tor exit nodes (torproject.org)
- VPN IP ranges (X4BNet)
- Datacenter ranges (X4BNet)
- Proxy ranges (Firehol)
- Threat IPs (IPsum)
- Spamhaus DROP list
- Disposable email domains

## Update schedule (automatic)

| Feed | Frequency | Command |
|---|---|---|
| Tor exit nodes | Every 30 min | auto via scheduler |
| Threat IPs + Proxy | Daily | auto via scheduler |
| VPN / Datacenter | Weekly | auto via scheduler |
| GeoIP databases | Weekly (Tuesdays) | manual or cron |

## Manual update

\`\`\`bash
python -m app.scripts.updater --tor          # Tor only
python -m app.scripts.updater --all-feeds    # all threat feeds
python -m app.scripts.updater --geoip        # GeoIP databases
python -m app.scripts.updater --all          # everything
\`\`\`
    `,
  },

  'supabase-schema': {
    title: 'Supabase Schema',
    description: 'Full database schema — tables, indexes, and SQL functions.',
    content: `
## Core tables

\`\`\`sql
events             -- every fraud check event
event_features     -- 35 feature values per event (ML training)
devices            -- device reputation + fraud history
device_emails      -- device ↔ email mapping
ip_cache           -- 7-day geo + threat cache per IP
threat_ips         -- individual threat IPs (Tor, proxy, threat)
ip_ranges          -- CIDR ranges (VPN, datacenter, proxy)
asn_classification -- known VPN/hosting/mobile ASNs
velocity_counters  -- sliding window rate limit counters
feed_metadata      -- threat feed last-update tracking
ml_models          -- XGBoost model registry
organizations      -- multi-tenant org + API key table
\`\`\`

## Key SQL functions

\`\`\`sql
-- CIDR lookup (uses Postgres INET operator — very fast)
check_ip_in_ranges(p_ip TEXT) → TABLE(cidr, type, source)

-- Device reputation upsert
upsert_device_reputation(device_id, email, risk_score, decision)
  → TABLE(id, email_count, fraud_count, reputation_score)

-- Velocity increment with auto-expiry
increment_velocity(key TEXT, window INTERVAL) → INTEGER
\`\`\`

## Threat map view

\`\`\`sql
CREATE VIEW threat_map_data AS
SELECT e.ip, e.decision, e.risk_score, e.created_at,
       c.lat, c.lon, c.city, c.country, c.is_tor, c.flags
FROM   events e
JOIN   ip_cache c ON c.ip = e.ip
WHERE  e.created_at > NOW() - INTERVAL '24 hours';
\`\`\`

## Run schema

Paste \`supabase_schema.sql\` into your Supabase SQL editor and click Run.
    `,
  },

  'testing-sdks': {
    title: 'Testing SDKs',
    description: 'Unit tests for iOS and Android SDKs, plus integration tests.',
    content: `
## iOS unit tests

\`\`\`bash
cd sdks/ios
swift test
\`\`\`

Test coverage includes:
- \`BehaviorCollectorTests\` — touch count, keystroke intervals, reset
- \`DeviceCollectorTests\` — correct platform/timezone fields
- \`SessionManagerTests\` — session ID rotation, retry logic
- \`NetworkTests\` — evaluates against local server

## Android unit tests

\`\`\`bash
cd sdks/android
./gradlew test
\`\`\`

Test coverage includes:
- \`BehaviorCollectorTest\` — touch, key intervals, typing speed
- \`DeviceCollectorTest\` — correct device fields
- \`NetworkTest\` — evaluates against local server

## Integration tests (Python)

Tests hit the real \`/sdk/evaluate\` endpoint:

\`\`\`bash
# Start server first
uvicorn app.main:app --reload &

# Run all platform integration tests
pytest tests/integration/ -v
\`\`\`

### Test cases

| Test | Expected |
|---|---|
| Clean iOS payload | decision ∈ {allow, challenge} |
| Clean Android payload | decision ∈ {allow, challenge} |
| Bot payload | decision = block |
| Disposable email | disposable_flag in reasons |
| Response shape | all required keys present |
| Action matches decision | proceed/block/captcha consistent |

## Run everything

\`\`\`bash
make test
\`\`\`
    `,
  },

  deployment: {
    title: 'Deployment',
    description: 'Deploy SignalMesh server to production.',
    content: `
## Docker

\`\`\`dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
\`\`\`

\`\`\`bash
docker build -t SignalMesh .
docker run -p 8000:8000 --env-file .env SignalMesh
\`\`\`

## Railway / Render / Fly.io

\`\`\`bash
# Railway
railway init
railway up

# Render — add render.yaml
# Fly.io
fly launch
fly deploy
\`\`\`

## GeoIP databases in production

The \`.mmdb\` files must be present at startup. Mount them as a volume or bake into the Docker image:

\`\`\`dockerfile
COPY app/data/geoip/ app/data/geoip/
\`\`\`

## Environment variables checklist

\`\`\`env
SUPABASE_URL=
SUPABASE_KEY=
MAXMIND_LICENSE_KEY=
APP_ENV=production
\`\`\`

<callout type="warning">Use your Supabase service role key (not the anon key) on the server. Never expose it in client code or the SDK.</callout>
    `,
  },

  // ── RESOURCES ──────────────────────────────────────────────────────────────

  changelog: {
    title: 'Changelog',
    description: 'Release history and what changed.',
    content: `
## v1.1.0 — ML + SDK release

- **New**: XGBoost ensemble scoring (rules × 0.4 + ML × 0.6)
- **New**: iOS Swift SDK (beta)
- **New**: Android Kotlin SDK (beta)
- **New**: \`/sdk/evaluate\` unified endpoint for all platforms
- **New**: \`/label\` endpoint for training data collection
- **New**: Device reputation system — multi-email tracking, bot cluster detection
- **New**: Velocity engine — sliding window counters in Supabase
- **New**: Keystroke dynamics analysis (key_intervals)
- **New**: Auto-retraining scheduler (weekly)
- **Improved**: Behavior thresholds tuned (fast_submission < 10s, not < 1s)
- **Fixed**: \`Optional[str]\` fields now default to \`None\` in all schemas

## v1.0.0 — Initial release

- Signup fraud detection API
- IP intelligence (MaxMind + Tor + VPN + Proxy)
- Email disposable domain detection
- Device fingerprinting
- Behavior analysis
- Rule engine with weighted scoring
- Supabase persistence
- JavaScript SDK
- Threat map endpoint
    `,
  },

  faq: {
    title: 'FAQ',
    description: 'Common questions from developers.',
    content: `
## Does the SDK work without behavior signals?

Yes. If behavior is missing, the engine relies on IP, email, and device signals. Accuracy is lower (~70%) vs full signals (~90%+).

## How long does evaluation take?

- Cache hit (IP seen before): ~20–50ms
- Fresh IP lookup: ~150–300ms (GeoIP + Supabase queries)
- Hard block (velocity): ~10ms (skips everything)

## Can I use SignalMesh without ML?

Yes. Before you have 100 labeled events, the rule engine runs alone. The ML layer activates automatically once you train a model.

## What if the API is down?

The SDKs include retry logic (3 attempts with exponential backoff). If all retries fail, you should fail open (allow) and log the error — don't block users because of an API outage.

## How do I reduce false positives?

- Raise the block threshold from 70 → 80
- Lower the weight of \`vpn_flag\` if your users use VPNs legitimately
- Use \`challenge\` instead of \`block\` for mid-range scores
- Label false positives via \`/label\` — the ML model learns from them

## Does this work for login and payment events?

Yes — use \`event_type: "login"\` or \`event_type: "payment"\`. The same scoring pipeline applies. You can adjust weights per event type if needed.

## What is a bot cluster?

A device with > 5 total signups where > 60% were blocked. Once flagged, every future attempt from that device is instantly blocked without scoring.

## How do I test locally?

Use the test payloads from the \`/signup/signup\` API reference page. Run the server with \`uvicorn app.main:app --reload\` and hit \`http://localhost:8000/api/v1/\`.
    `,
  },

  troubleshooting: {
    title: 'Troubleshooting',
    description: 'Fix common errors and integration issues.',
    content: `
## Risk score is always 0

**Cause**: Behavior thresholds too strict OR engines returning empty results.

**Fix**: Add debug logging after build_features:

\`\`\`python
print("=== FEATURES ===")
for k, v in features.items():
  if v not in (0, None, ""): print(f"  {k}: {v}")
\`\`\`

If all features are 0, check each engine's return value individually.

---

## "fingerprint column not found" (Supabase)

**Cause**: \`devices\` table schema mismatch.

**Fix**: The correct column is \`device_id\` (not \`fingerprint\`). Check your Supabase table and re-run the schema SQL.

---

## Field required: os, browser, screen_resolution

**Cause**: Pydantic schema has \`Optional[str]\` without \`= None\`.

**Fix**:

\`\`\`python
class DevicePayload(BaseModel):
  os:                Optional[str] = None   # ← = None is required
  browser:           Optional[str] = None
  screen_resolution: Optional[str] = None
  timezone:          Optional[str] = None
  user_agent:        Optional[str] = None
\`\`\`

---

## log_event() missing device_id argument

**Fix**: Add \`device_id=device_id\` to your \`log_event()\` call.

---

## XGBoost model not loading

**Cause**: \`app/ml/models/xgb_fraud.joblib\` doesn't exist yet.

**Fix**: Run \`python -m app.ml.trainer\` after labeling 100+ events. Until then, ML scoring is silently disabled and rules run alone.

---

## Tor exit nodes not updating

**Cause**: torproject.org blocked or scheduler not running.

**Fix**:

\`\`\`bash
python -m app.scripts.updater --tor
\`\`\`

Check \`feed_metadata\` table in Supabase for last_run and status.

---

## iOS: "Call configure() first"

**Fix**: Call \`SignalMesh.shared.configure()\` in your \`@main\` App struct or \`AppDelegate\`, before any view appears.

---

## Android: ClassNotFoundException for SignalMesh

**Fix**: Check that \`com.SignalMesh:sdk:1.0.0\` is in your app-level \`build.gradle\`, not project-level.
    `,
  },
};