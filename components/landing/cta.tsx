'use client';

import { useState } from 'react';

export function CTA() {
  const [email, setEmail] = useState('');

  return (
    <section className="cta-section">
      <div className="cta-bg"></div>
      <div className="cta-inner reveal">
        <h2 className="cta-title">Your first 10,000 checks are on us</h2>
        <p className="cta-sub">No credit card required. Full API access. Start blocking fake signups in minutes.</p>
        <div className="cta-form">
          <input
            className="cta-input"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn-cta">Get API Key →</button>
        </div>
        <p className="cta-note">No credit card · No contracts · Cancel anytime</p>
      </div>
    </section>
  );
}
