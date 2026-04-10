export function Pricing() {
  const plans = [
    {
      tier: 'Starter',
      price: '0',
      desc: 'For indie devs and early-stage products testing the waters.',
      features: ['10,000 checks per month', 'Email + IP scoring', 'REST API access', 'Community support'],
      button: { label: 'Get started free', type: 'outline' },
      featured: false,
    },
    {
      tier: 'Growth',
      price: '79',
      desc: 'For growing products that need full-stack protection at scale.',
      features: ['500,000 checks per month', 'All 6 detection layers', 'Device fingerprinting', 'Webhooks + dashboard', 'Email support, 24h SLA'],
      button: { label: 'Start 14-day trial', type: 'filled' },
      featured: true,
    },
    {
      tier: 'Enterprise',
      price: 'Custom',
      desc: 'For platforms processing millions of signups with strict compliance needs.',
      features: ['Unlimited checks', 'Dedicated infrastructure', 'Custom ML models', 'SSO + SAML + Audit logs', 'Slack + dedicated CSM'],
      button: { label: 'Talk to sales', type: 'outline' },
      featured: false,
    },
  ];

  return (
    <section className="pricing-section" id="pricing">
      <div className="section-label reveal">Pricing</div>
      <h2 className="section-title reveal">
        Pay for what
        <br />
        you use
      </h2>
      <p className="section-sub reveal">No seats. No annual lock-in. Scale up or down as your traffic changes.</p>
      <div className="pricing-grid reveal">
        {plans.map((plan, idx) => (
          <div key={idx} className={`price-card ${plan.featured ? 'featured' : ''}`}>
            <div className="price-tier">{plan.tier}</div>
            <div className="price-amount">
              <sup>$</sup>
              {plan.price}
              {plan.price !== 'Custom' && <sub>/mo</sub>}
            </div>
            <div className="price-desc">{plan.desc}</div>
            <ul className="price-features">
              {plan.features.map((feature, fidx) => (
                <li key={fidx}>{feature}</li>
              ))}
            </ul>
            <button className={`btn-plan ${plan.button.type}`}>{plan.button.label}</button>
          </div>
        ))}
      </div>
    </section>
  );
}
