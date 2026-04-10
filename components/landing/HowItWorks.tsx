export function HowItWorks() {
  const steps = [
    { num: "01", title: "Get your API key", body: "Sign up and get your API key instantly. No contracts, no sales calls. Start with a free tier of 10,000 checks per month." },
    { num: "02", title: "Install the SDK", body: "Add a single line to install. Works across web, mobile, and games. The SDK automatically captures behavioral and device signals—no manual setup needed." },
    { num: "03", title: "Call evaluate()", body: "Make one async call before form submission. Receive a decision—allow, challenge, or block—along with reasons and recommended actions." },
    { num: "04", title: "Swarm learns and adapts", body: "Each event strengthens the network. Our models continuously learn from global patterns, improving detection accuracy over time." },
  ];

  return (
    <section className="how-section">
      <div className="container">
        
        {/* HEADER BLOCK */}
        <div className="section-head">
          <div className="section-tag">Integration</div>

          <h2 className="section-title">
            Go live in minutes,<br />not weeks.
          </h2>

          <p className="section-sub">
            No contracts. No sales calls. No delays. Start protecting your signup
            flow before your next deployment.
          </p>
        </div>

        {/* STEPS */}
        <div className="steps">
          {steps.map((step) => (
            <div key={step.num} className="step">
              <div className="step-num">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-body">{step.body}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}