// import {
//   Shield,
//   Swords,
//   Mail,
//   Globe,
//   BarChart3,
//   Rocket
// } from "lucide-react";



// export function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-container">

//         <div className="footer-column">
//           <h4><Rocket size={16} /> Product</h4>
//           <a href="/">Home</a>
//           <a href="#features">Features</a>
//           <a href="#pricing">Pricing</a>
//           <a href="#how-it-works">How It Works</a>
//         </div>

//         <div className="footer-column">
//           <h4><Shield size={16} /> Security Analysis</h4>
//           <a href="/tools/vulnerability-scanner">Vulnerability Scanner</a>
//           <a href="/tools/captcha-checker">CAPTCHA Checker</a>
//           <a href="/tools/rate-limit-tester">Rate Limit Tester</a>
//           <a href="/tools/brute-force-tester">Brute Force Tester</a>
//         </div>

//         <div className="footer-column">
//           <h4><Swords size={16} /> Attack Simulation</h4>
//           <a href="/tools/bot-attack-simulator">Bot Attack Simulator</a>
//           <a href="/tools/fraud-simulator">Fraud Simulator</a>
//           <a href="/tools/credential-stuffing-tester">Credential Stuffing</a>
//         </div>

//         <div className="footer-column">
//           <h4><Mail size={16} /> Email & Identity</h4>
//           <a href="/tools/email-risk-checker">Email Risk Checker</a>
//           <a href="/tools/email-reputation">Email Reputation</a>
//           <a href="/tools/disposable-email-detector">Disposable Email</a>
//           <a href="/tools/domain-risk-analyzer">Domain Risk</a>
//         </div>

//         <div className="footer-column">
//           <h4><Globe size={16} /> IP & Network</h4>
//           <a href="/tools/ip-intelligence">IP Intelligence</a>
//           <a href="/tools/proxy-vpn-detector">Proxy/VPN Detector</a>
//           <a href="/tools/device-fingerprinting">Device Fingerprint</a>
//         </div>

//         <div className="footer-column">
//           <h4><BarChart3 size={16} /> Analysis & Detection</h4>
//           <a href="/tools/signup-score">Signup Score</a>
//           <a href="/tools/velocity-analyzer">Velocity Analyzer</a>
//           <a href="/tools/bot-score-analyzer">Bot Score</a>
//           <a href="/tools/session-analyzer">Session Analyzer</a>
//           <a href="/tools/traffic-analyzer">Traffic Analyzer</a>
//         </div>

        

//       </div>

//       <div className="footer-bottom">
//         <div className="footer-left">
//           <h2>SignalMesh</h2>
//           <p>Built with zero trust.</p>
//         </div>

//         <div className="footer-right">
//           © 2026 SignalMesh Inc.
//         </div>
//       </div>
//     </footer>
//   );
// }

'use client';

import { footerSections, sdkList } from "@/lib/footerData";

export function Footer() {
  return (
    <footer style={{
      backgroundColor: '#07100e',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      marginTop: '80px',
    }}>

      {/* ── SDK STRIP ──────────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '14px 48px',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        flexWrap: 'wrap',
      }}>
        <span style={{
          fontFamily: 'monospace',
          fontSize: '10px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginRight: '2px',
          flexShrink: 0,
        }}>
          SDKs
        </span>
        {sdkList.map((sdk, idx) => (
          <span key={idx} style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            padding: '2px 10px',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            color: 'rgba(255,255,255,0.45)',
            backgroundColor: 'rgba(255,255,255,0.04)',
            whiteSpace: 'nowrap',
          }}>
            {sdk}
          </span>
        ))}
      </div>

      {/* ── MAIN LINK GRID ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '44px 48px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: '28px',
      }}>
        {footerSections.map((section, idx) => {
          const Icon = section.icon;
          return (
            <div key={idx}>
              {/* Column heading */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '16px',
              }}>
                {Icon && (
                  <Icon size={12} style={{ color: '#00c48a', flexShrink: 0 }} />
                )}
                <span style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  whiteSpace: 'nowrap',
                }}>
                  {section.title}
                </span>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {section.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                      lineHeight: 1.4,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BOTTOM BAR ─────────────────────────────────────────────── */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '20px 48px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.95)',
          }}>
            SignalMesh
          </span>
          <span style={{
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
          }}>
            Built with zero trust.
          </span>
        </div>

        <span style={{
          fontSize: '12px',
          color: 'rgba(255,255,255,0.3)',
        }}>
          © 2026 SignalMesh Inc.
        </span>
      </div>

    </footer>
  );
}