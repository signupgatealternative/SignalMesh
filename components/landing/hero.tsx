const ShieldIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C17.5 22.15 21 17.25 21 12V6l-9-4z" fill="white" />
  </svg>
);

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>
      {/* <div className="hero-badge">
        <span className="badge-dot"></span> Now detecting 47 new proxy types
      </div> */}
      <div className="hero-badge">
        <span className="badge-dot"></span> Now with Swarm Graph Intelligence + XGBoost ML
      </div>
      {/* <h1>
        Stop <span className="strike">fake</span> signups
        <br />
        before they <span className="accent">ever land</span>
      </h1> */}
      <h1>
        Stop <span className="strike">fake</span> signups
        <br />
       Build intelligence that
<span className="accent"> gets smarter every hour. </span>
      </h1>

      {/* <p className="hero-sub">
        SignalMesh blocks bots, disposable emails, and fraud rings at the signup form — in under 50ms. No CAPTCHAs. No friction for real users.
      </p> */}
      <p className="hero-sub">
        SignalMesh combines IP intelligence, behavioral biometrics, device reputation, swarm graph learning, and XGBoost ML into one API call. No CAPTCHAs. No friction. No black boxes.
      </p>
      <div className="hero-actions">
        <a href="#" className="btn-primary">
          <ShieldIcon />
          Start Free — 10k checks/mo
        </a>
        <a href="#" className="btn-secondary">
          See it in action →
        </a>
      </div>
    </section>
  );
}
