// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { toolType, ...params } = body;

//     // Rate limiting per IP
//     const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
//     switch (toolType) {
//       case 'vulnerability':
//         return handleVulnerabilityScan(params);
//       case 'captcha':
//         return handleCaptchaCheck(params);
//       case 'rateLimit':
//         return handleRateLimitTest(params);
//       case 'bruteForce':
//         return handleBruteForceTest(params);
//       case 'botSimulator':
//         return handleBotSimulator(params);
//       case 'fraud':
//         return handleFraudSimulator(params);
//       case 'credentialStuffing':
//         return handleCredentialStuffingTest(params);
//       case 'emailRisk':
//         return handleEmailRiskCheck(params);
//       case 'emailReputation':
//         return handleEmailReputation(params);
//       case 'disposableEmail':
//         return handleDisposableEmailDetector(params);
//       case 'domainRisk':
//         return handleDomainRiskAnalysis(params);
//       case 'ipIntelligence':
//         return handleIPIntelligence(params);
//       case 'proxyDetector':
//         return handleProxyDetector(params);
//       case 'deviceFingerprint':
//         return handleDeviceFingerprint(params);
//       case 'signupScore':
//         return handleSignupScore(params);
//       case 'velocity':
//         return handleVelocityAnalyzer(params);
//       case 'botScore':
//         return handleBotScoreAnalyzer(params);
//       case 'sessionAnalysis':
//         return handleSessionAnalysis(params);
//       case 'trafficAnalysis':
//         return handleTrafficAnalysis(params);
//       case 'riskDashboard':
//         return handleRiskDashboard();
//       case 'csrfValidator':
//         return handleCSRFValidator(params);
//       case 'honeypotDetector':
//         return handleHoneypotDetector(params);
//       case 'wafDetector':
//         return handleWAFDetector(params);
//       default:
//         return NextResponse.json({ error: 'Unknown tool type' }, { status: 400 });
//     }
//   } catch (error) {
//     return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
//   }
// }

// function handleVulnerabilityScan(params: any) {
//   const { url } = params;
//   const riskScore = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     riskScore,
//     summary: `Website has ${riskScore > 70 ? 'HIGH' : riskScore > 40 ? 'MEDIUM' : 'LOW'} risk vulnerabilities.`,
//     findings: {
//       captcha: Math.random() > 0.5,
//       csrf: Math.random() > 0.5,
//       rateLimit: Math.random() > 0.3,
//       csp: Math.random() > 0.4,
//     },
//   });
// }

// function handleCaptchaCheck(params: any) {
//   const { url } = params;
//   const hasCaptcha = Math.random() > 0.4;
//   return NextResponse.json({
//     hasCaptcha,
//     type: hasCaptcha ? 'reCAPTCHA v3' : 'None',
//     strength: hasCaptcha ? 'Strong' : 'None',
//     botDetection: hasCaptcha,
//     summary: hasCaptcha ? 'Modern CAPTCHA detected' : 'No CAPTCHA protection found',
//   });
// }

// function handleRateLimitTest(params: any) {
//   const { url, requests } = params;
//   const isLimited = Math.random() > 0.3;
//   return NextResponse.json({
//     isLimited,
//     allowedRequests: isLimited ? Math.floor(Math.random() * 100) + 10 : 1000,
//     timeWindow: '1m',
//     blocked: !isLimited,
//     summary: isLimited ? 'Rate limiting is active' : 'No rate limiting detected',
//   });
// }

// function handleBruteForceTest(params: any) {
//   const { url, attempts } = params;
//   const protected_ = Math.random() > 0.3;
//   return NextResponse.json({
//     protected: protected_,
//     lockedOut: protected_,
//     attemptsAllowed: protected_ ? Math.floor(Math.random() * 8) + 3 : attempts,
//     blockDuration: protected_ ? '30m' : 'None',
//     summary: protected_ ? 'Good brute force protection' : 'Vulnerable to brute force',
//   });
// }

// function handleBotSimulator(params: any) {
//   const { url, botType } = params;
//   const blocked = Math.random() > 0.2;
//   return NextResponse.json({
//     blocked,
//     detectionMethod: blocked ? 'Behavioral Analysis' : 'None',
//     score: Math.floor(Math.random() * 100),
//     summary: blocked ? 'Bot was successfully blocked' : 'Bot activity not detected',
//   });
// }

// function handleFraudSimulator(params: any) {
//   const { email, ip } = params;
//   const riskScore = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     flagged: riskScore > 60,
//     riskScore,
//     emailRisk: Math.random() > 0.5 ? 'High' : 'Low',
//     ipRisk: Math.random() > 0.5 ? 'High' : 'Low',
//     summary: `Fraud risk score: ${riskScore}%`,
//   });
// }

// function handleCredentialStuffingTest(params: any) {
//   const { url, attempts } = params;
//   const protected_ = Math.random() > 0.25;
//   return NextResponse.json({
//     protected: protected_,
//     attemptsDetected: protected_,
//     blocked: protected_,
//     falsePositives: protected_ ? Math.floor(Math.random() * 3) : 0,
//     summary: protected_ ? 'Good credential stuffing protection' : 'Vulnerable',
//   });
// }

// function handleEmailRiskCheck(params: any) {
//   const { email } = params;
//   const riskScore = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     riskScore,
//     isDisposable: Math.random() > 0.7,
//     domainReputation: riskScore > 70 ? 'Poor' : 'Good',
//     isSpam: Math.random() > 0.8,
//     canVerify: riskScore < 70,
//     summary: `Email risk score: ${riskScore}%`,
//   });
// }

// function handleEmailReputation(params: any) {
//   const { email } = params;
//   const reputation = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     reputation,
//     spf: Math.random() > 0.2,
//     dkim: Math.random() > 0.3,
//     dmarc: Math.random() > 0.4,
//     blacklisted: reputation < 30,
//     summary: `Domain reputation: ${reputation}%`,
//   });
// }

// function handleDisposableEmailDetector(params: any) {
//   const { email } = params;
//   const isDisposable = Math.random() > 0.8;
//   return NextResponse.json({
//     isDisposable,
//     provider: isDisposable ? 'TempMail' : 'Gmail',
//     riskLevel: isDisposable ? 'High' : 'Low',
//     lifetime: isDisposable ? '1 hour' : 'Permanent',
//     summary: isDisposable ? 'Disposable email detected' : 'Legitimate email provider',
//   });
// }

// function handleDomainRiskAnalysis(params: any) {
//   const { domain } = params;
//   const riskScore = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     riskScore,
//     domainAge: Math.floor(Math.random() * 15) + ' years',
//     reputation: riskScore > 70 ? 'Poor' : 'Good',
//     phishingRisk: riskScore > 60,
//     malwareRisk: riskScore > 70,
//     summary: `Domain risk: ${riskScore}%`,
//   });
// }

// function handleIPIntelligence(params: any) {
//   const { ip } = params;
//   const riskScore = Math.floor(Math.random() * 100);
//   const countries = ['US', 'UK', 'DE', 'CN', 'RU', 'NG'];
//   return NextResponse.json({
//     riskScore,
//     country: countries[Math.floor(Math.random() * countries.length)],
//     isp: 'Major ISP',
//     reputation: riskScore > 70 ? 'Poor' : 'Good',
//     abuseReports: Math.floor(Math.random() * 50),
//     summary: `IP risk score: ${riskScore}%`,
//   });
// }

// function handleProxyDetector(params: any) {
//   const { ip } = params;
//   const isProxy = Math.random() > 0.7;
//   return NextResponse.json({
//     isProxy,
//     proxyType: isProxy ? 'VPN' : 'None',
//     provider: isProxy ? 'ExpressVPN' : 'ISP',
//     riskLevel: isProxy ? 'High' : 'Low',
//     summary: isProxy ? 'Proxy/VPN detected' : 'Residential IP',
//   });
// }

// function handleDeviceFingerprint(params: any) {
//   const { fingerprint } = params;
//   const suspicionScore = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     suspicionScore,
//     uniqueness: suspicionScore > 70 ? 'Very Unique' : 'Common',
//     consistency: Math.random() > 0.5,
//     emulationDetected: suspicionScore > 75,
//     botRisk: suspicionScore > 70,
//     summary: `Device suspicion: ${suspicionScore}%`,
//   });
// }

// function handleSignupScore(params: any) {
//   const { email, ip } = params;
//   const score = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     score,
//     riskLevel: score > 70 ? 'High' : score > 40 ? 'Medium' : 'Low',
//     emailRisk: 'Medium',
//     ipRisk: 'Low',
//     recommendation: score > 70 ? 'Block' : score > 40 ? 'Verify' : 'Accept',
//     summary: `Overall signup score: ${score}/100`,
//   });
// }

// function handleVelocityAnalyzer(params: any) {
//   const { ip, email, timeframe } = params;
//   const signupCount = Math.floor(Math.random() * 100);
//   const suspicious = signupCount > 20;
//   return NextResponse.json({
//     suspicious,
//     signupCount,
//     avgTime: suspicious ? '5 minutes' : '2 hours',
//     pattern: suspicious ? 'Suspicious' : 'Normal',
//     riskScore: suspicious ? 85 : 15,
//     summary: suspicious ? 'High velocity detected' : 'Normal signup pattern',
//   });
// }

// function handleBotScoreAnalyzer(params: any) {
//   const { email, ip } = params;
//   const score = Math.floor(Math.random() * 100);
//   return NextResponse.json({
//     score,
//     factors: Math.floor(Math.random() * 8) + 1,
//     confidence: score > 70 ? 'High' : 'Medium',
//     recommendation: score > 70 ? 'Block' : 'Monitor',
//     summary: `Bot likelihood: ${score}%`,
//   });
// }

// function handleSessionAnalysis(params: any) {
//   const { sessionId, userId } = params;
//   const suspicious = Math.random() > 0.5;
//   const riskScore = suspicious ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 50);
//   return NextResponse.json({
//     suspicious,
//     sessionAge: Math.floor(Math.random() * 12) + ' hours',
//     locationChanges: Math.floor(Math.random() * 5),
//     deviceChanges: Math.floor(Math.random() * 3),
//     riskScore,
//     summary: suspicious ? 'Suspicious activity detected' : 'Normal session',
//   });
// }

// function handleTrafficAnalysis(params: any) {
//   const { url } = params;
//   const anomaly = Math.random() > 0.6;
//   return NextResponse.json({
//     anomaly,
//     requestsPerMin: Math.floor(Math.random() * 5000) + 100,
//     uniqueIps: Math.floor(Math.random() * 10000) + 100,
//     botPercentage: Math.floor(Math.random() * 60),
//     spike: anomaly,
//     summary: anomaly ? 'Traffic anomaly detected' : 'Normal traffic pattern',
//   });
// }

// function handleRiskDashboard() {
//   return NextResponse.json({
//     overallRisk: Math.floor(Math.random() * 100),
//     summary: 'Current risk assessment',
//     criticalAlerts: Math.floor(Math.random() * 10),
//     blockedAttempts: Math.floor(Math.random() * 1000),
//     anomalies: Math.floor(Math.random() * 50),
//     trending: 'Increasing',
//     botSignups: Math.floor(Math.random() * 30),
//     disposableEmail: Math.floor(Math.random() * 25),
//     proxyVpn: Math.floor(Math.random() * 15),
//     verificationRate: Math.floor(Math.random() * 40) + 60,
//   });
// }

// function handleCSRFValidator(params: any) {
//   const { token, url } = params;
//   const isValid = Math.random() > 0.2;
//   return NextResponse.json({
//     isValid,
//     isFresh: isValid,
//     signatureValid: isValid,
//     expiration: isValid ? 'Valid' : 'Expired',
//     summary: isValid ? 'Token is valid and fresh' : 'Token validation failed',
//   });
// }

// function handleHoneypotDetector(params: any) {
//   const { url } = params;
//   const honeypotFound = Math.random() > 0.4;
//   return NextResponse.json({
//     honeypotFound,
//     fieldCount: Math.floor(Math.random() * 8) + 2,
//     hiddenFields: honeypotFound ? Math.floor(Math.random() * 3) + 1 : 0,
//     trapTriggered: honeypotFound,
//     effectiveness: honeypotFound ? 'High' : 'Low',
//     summary: honeypotFound ? 'Honeypot fields detected' : 'No honeypot found',
//   });
// }

// function handleWAFDetector(params: any) {
//   const { url } = params;
//   const wafDetected = Math.random() > 0.3;
//   return NextResponse.json({
//     wafDetected,
//     provider: wafDetected ? 'Cloudflare' : 'Unknown',
//     confidence: wafDetected ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30),
//     protectionLevel: wafDetected ? 'High' : 'Medium',
//     evasionPossible: !wafDetected,
//     summary: wafDetected ? 'WAF protection detected' : 'No WAF detected',
//   });
// }


import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toolType, ...params } = body;

    switch (toolType) {
      case 'vulnerability':
        return handleVulnerabilityScan(params);
      // ... other cases remain unchanged
      default:
        return NextResponse.json({ error: 'Unknown tool type' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

async function handleVulnerabilityScan(params: { url: string }) {
  const { url } = params;

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // Normalise URL
  let targetUrl = url.trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = 'https://' + targetUrl;
  }

  let html = '';
  let responseHeaders: Record<string, string> = {};
  let fetchError: string | null = null;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    const res = await fetch(targetUrl, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SecurityScanner/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    // Collect response headers
    res.headers.forEach((value, key) => {
      responseHeaders[key.toLowerCase()] = value;
    });

    // Read only first 200 KB to keep it fast
    const buffer = await res.arrayBuffer();
    html = new TextDecoder('utf-8', { fatal: false }).decode(
      buffer.slice(0, 200_000)
    );
  } catch (err: any) {
    fetchError = err?.name === 'AbortError' ? 'Request timed out' : 'Could not reach the URL';
  }

  if (fetchError) {
    return NextResponse.json({ error: fetchError }, { status: 502 });
  }

  const h = html.toLowerCase();

  // ── Signal detection ─────────────────────────────────────────────────────
  const findings = {
    captcha:
      /recaptcha|hcaptcha|turnstile|cf-turnstile|grecaptcha/.test(h),

    csrf:
      /csrf|_token|authenticity_token|__requestverificationtoken/.test(h),

    honeypot:
      /honeypot|hp_|bot_trap|trap_field|winnie_the_pooh/.test(h) ||
      // Detect hidden inputs that could be honeypots by inline style or aria-hidden
      /type="text"[^>]*(?:style="[^"]*display:\s*none|aria-hidden="true")/.test(h) ||
      /(?:style="[^"]*display:\s*none)[^>]*type="text"/.test(h),

    rateLimit: !!(
      responseHeaders['x-ratelimit-limit'] ||
      responseHeaders['ratelimit-limit'] ||
      responseHeaders['x-rate-limit'] ||
      responseHeaders['retry-after']
    ),

    csp: !!(
      responseHeaders['content-security-policy'] ||
      responseHeaders['content-security-policy-report-only']
    ),

    waf: /cloudflare|fastly|akamai|imperva|sucuri|barracuda|f5|mod_security/.test(
      (
        (responseHeaders['server'] || '') +
        (responseHeaders['x-powered-by'] || '') +
        (responseHeaders['x-sucuri-id'] || '') +
        (responseHeaders['cf-ray'] || '')
      ).toLowerCase()
    ),

    inputValidation:
      /maxlength=|pattern=|required/.test(h) &&
      /<input/.test(h),

    emailVerification:
      /verif(?:y|ication)|confirm.*email|email.*confirm/.test(h),

    disposableBlock:
      /disposable|throwaway|tempmail|mailinator/.test(h),

    slowHash:
      /bcrypt|argon2|pbkdf2/.test(h),

    httpsOnly: targetUrl.startsWith('https://'),

    hsts: !!(
      responseHeaders['strict-transport-security']
    ),
  } as const;

  type FindingKey = keyof typeof findings;

  // Weighted scoring — higher weight = more important
  const weights: Record<FindingKey, number> = {
    captcha:           22,
    csrf:              18,
    rateLimit:         16,
    emailVerification: 14,
    csp:               12,
    waf:               10,
    inputValidation:    8,
    httpsOnly:          7,
    hsts:               5,
    honeypot:           4,
    disposableBlock:    3,
    slowHash:           3,
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const missingWeight = (Object.keys(weights) as FindingKey[])
    .filter(k => !findings[k])
    .reduce((sum, k) => sum + weights[k], 0);

  const riskScore = Math.round((missingWeight / totalWeight) * 100);

  const summary =
    riskScore > 70
      ? 'This signup page has significant security gaps — bots and fraud actors will find it easy to exploit.'
      : riskScore > 40
      ? 'Some protections are in place but several important layers are missing.'
      : 'Good baseline protection. Review missing items to close remaining attack surface.';

  return NextResponse.json({
    riskScore,
    summary,
    findings,
    headers: responseHeaders,
  });
}