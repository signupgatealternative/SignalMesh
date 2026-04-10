export function HowItWorks() {
  const steps = [
    { num: '01', title: 'Get your API key', desc: 'Sign up and receive your key instantly. No contracts, no calls, no waiting.' },
    { num: '02', title: 'Add 3 lines of code', desc: 'Drop our SDK into your signup form. Works with any frontend stack.' },
    { num: '03', title: 'Score every signup', desc: 'Each submission is analyzed and a risk score returned before you process anything.' },
    { num: '04', title: 'Block, flag, or allow', desc: 'Your rules, your thresholds. Automate decisions or review flagged cases manually.' },
  ];

  return (
    <section className="how-section" id="how-it-works">
      <div className="section-label reveal">Integration</div>
      <h2 className="section-title reveal">
        Live in 10 minutes,
        <br />
        not 10 weeks
      </h2>
      <div className="steps-grid reveal">
        {steps.map((step, idx) => (
          <div key={idx} className="step">
            <div className="step-num">{step.num}</div>
            <div className="step-title">{step.title}</div>
            <div className="step-desc">{step.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
