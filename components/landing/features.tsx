export function Features() {
  const features = [
    {
      icon: '🌐',
      title: 'IP & Proxy Intelligence',
      desc: 'Detect VPNs, Tor exits, residential proxies, and datacenter ranges. Updated every 15 minutes from 40+ threat feeds.',
    },
    {
      icon: '✉️',
      title: 'Email Risk Scoring',
      desc: 'Identify disposable, catch-all, and role-based addresses. 4,200+ temporary domain patterns blocked on signup.',
    },
    {
      icon: '🖥️',
      title: 'Device Fingerprinting',
      desc: 'Canvas, WebGL, and audio fingerprinting identify device spoofing, headless browsers, and multi-accounting at hardware level.',
    },
    {
      icon: '🧠',
      title: 'Behavioral Biometrics',
      desc: 'Mouse movement, typing cadence, and form interaction patterns distinguish human users from automated scripts instantly.',
    },
    {
      icon: '⚡',
      title: 'Velocity Detection',
      desc: 'Rate-limit by IP, device, email domain, or subnet. Catch coordinated fraud rings that spread across thousands of IPs.',
    },
    {
      icon: '🤖',
      title: 'Graph Linkage',
      desc: 'Connect the dots between related accounts using shared IPs, devices, and behavioral patterns — even across platforms.',
    },

    {
      icon: '🕸️',
      title: 'Swarm Graph Intelligence (GraphRAG)',
      desc: 'Knowledge graph connecting IP nodes, device nodes, email nodes, and bot clusters. Vector similarity search finds matching fraud patterns from collective memory. Graph traversal detects fraud rings across shared infrastructure in milliseconds. The only fraud system where every detection makes all customers safer.',
      featured: true,
      badge: 'NEW',
    },
  ];

  const normalFeatures = features.filter(f => !f.featured);
  const featuredFeature = features.find(f => f.featured);

  return (
    <section className="features-section" id="features">
      <div className="section-label reveal">Detection Layers</div>

      <h2 className="section-title reveal">
        Six signals.
        <br />
        One decision.
      </h2>

      <p className="section-sub reveal">
        Every signup is scored across six independent intelligence layers.
      </p>

      {/* ✅ PERFECT GRID (6 CARDS) */}
      <div className="features-grid reveal">
        {normalFeatures.map((feature, idx) => (
          <div key={idx} className="feature-card">
            <div className="feat-icon">{feature.icon}</div>
            <div className="feat-title">{feature.title}</div>
            <div className="feat-desc">{feature.desc}</div>
          </div>
        ))}
      </div>

      {/* ✅ FEATURED FULL WIDTH (SEPARATE) */}
      {featuredFeature && (
        <div className="featured-wrapper reveal">
          <div className="layer-card featured feature-card">
            <div className="feat-icon">{featuredFeature.icon}</div>

            <div className="feat-title">
              {featuredFeature.title}
            </div>

            <div className="feat-desc">
              {featuredFeature.desc}
            </div>

            {featuredFeature.badge && (
              <div className="layer-new">{featuredFeature.badge}</div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}