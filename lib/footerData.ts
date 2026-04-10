import {
  Shield,
  Swords,
  Mail,
  Globe,
  BarChart3,
  Rocket,
} from "lucide-react";

export const footerSections = [
  {
    title: "Product",
    icon: Rocket,
    links: [
      { label: "Home", href: "/" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
    ],
  },
  {
    title: "Security Analysis",
    icon: Shield,
    links: [
      { label: "Vulnerability Scanner", href: "/tools/vulnerability-scanner" },
      { label: "CAPTCHA Checker", href: "/tools/captcha-checker" },
      { label: "Rate Limit Tester", href: "/tools/rate-limit-tester" },
      { label: "Brute Force Tester", href: "/tools/brute-force-tester" },
    ],
  },
  {
    title: "Attack Simulation",
    icon: Swords,
    links: [
      { label: "Bot Attack Simulator", href: "/tools/bot-attack-simulator" },
      { label: "Fraud Simulator", href: "/tools/fraud-simulator" },
      { label: "Credential Stuffing", href: "/tools/credential-stuffing-tester" },
    ],
  },
  {
    title: "Email & Identity",
    icon: Mail,
    links: [
      { label: "Email Risk Checker", href: "/tools/email-risk-checker" },
      { label: "Email Reputation", href: "/tools/email-reputation" },
      { label: "Disposable Email", href: "/tools/disposable-email-detector" },
      { label: "Domain Risk", href: "/tools/domain-risk-analyzer" },
    ],
  },
  {
    title: "IP & Network",
    icon: Globe,
    links: [
      { label: "IP Intelligence", href: "/tools/ip-intelligence" },
      { label: "Proxy/VPN Detector", href: "/tools/proxy-vpn-detector" },
      { label: "Device Fingerprint", href: "/tools/device-fingerprinting" },
    ],
  },
  {
    title: "Analysis & Detection",
    icon: BarChart3,
    links: [
      { label: "Signup Score", href: "/tools/signup-score" },
      { label: "Velocity Analyzer", href: "/tools/velocity-analyzer" },
      { label: "Bot Score", href: "/tools/bot-score-analyzer" },
      { label: "Session Analyzer", href: "/tools/session-analyzer" },
      { label: "Traffic Analyzer", href: "/tools/traffic-analyzer" },
    ],
  },
];

// ✅ SDK STRIP DATA
export const sdkList = [
  "JavaScript",
  "Swift (iOS)",
  "Android",
  "Unity",
];