"use client"
import { useState } from "react";

export function SDKSection() {
  const [activeTab, setActiveTab] = useState("js");

  const tabs = [
    { id: "js", label: "JavaScript" },
    { id: "swift", label: "Swift" },
    { id: "kotlin", label: "Kotlin" },
    { id: "unity", label: "Unity C#" },
  ];

  return (
    <section id="sdks">
      <div className="section-tag">Native SDKs</div>

      <h2 className="section-title">
        One signal.<br />Every platform.
      </h2>

      <p className="section-sub">
        Drop-in SDKs for web, iOS, Android, Flutter, React Native, and Unity.
        Auto-collects keystroke dynamics, touch patterns, device fingerprint —
        no manual wiring.
      </p>

      {/* SDK GRID */}
      <div className="sdk-grid">
        <div className="sdk-card">
          <span className="sdk-icon">🌐</span>
          <div className="sdk-name">JavaScript</div>
          <div className="sdk-platform">Web / React / Node</div>
          <div className="sdk-badge new">STABLE</div>
        </div>

        <div className="sdk-card">
          <span className="sdk-icon">🍎</span>
          <div className="sdk-name">Swift SDK</div>
          <div className="sdk-platform">iOS / iPadOS</div>
          <div className="sdk-badge beta">BETA</div>
        </div>

        <div className="sdk-card">
          <span className="sdk-icon">🤖</span>
          <div className="sdk-name">Android SDK</div>
          <div className="sdk-platform">Kotlin / Java</div>
          <div className="sdk-badge beta">BETA</div>
        </div>

        <div className="sdk-card">
          <span className="sdk-icon">💙</span>
          <div className="sdk-name">Flutter</div>
          <div className="sdk-platform">iOS + Android</div>
          <div className="sdk-badge new">NEW</div>
        </div>

        <div className="sdk-card">
          <span className="sdk-icon">⚛️</span>
          <div className="sdk-name">React Native</div>
          <div className="sdk-platform">Cross-platform</div>
          <div className="sdk-badge new">NEW</div>
        </div>

        <div className="sdk-card">
          <span className="sdk-icon">🎮</span>
          <div className="sdk-name">Unity SDK</div>
          <div className="sdk-platform">Games / C#</div>
          <div className="sdk-badge new">UNIQUE</div>
        </div>
      </div>

      {/* CODE BLOCK */}
      <div className="code-block">
        {/* Tabs */}
        <div className="code-tab-row">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`code-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div className={`code-content ${activeTab === "js" ? "active" : ""}`}>
<pre>{`import SignalSDK from "@SignalMesh/sdk";

const signal = new SignalSDK({
  apiKey:   "sk_live_your_key",
  endpoint: "https://your-api.com/api/v1",
  // auto-collects mouse, typing, clicks
});

const result = await signal.evaluate({ event_type: "signup", email });

if (result.decision === "block")     return showError(result.action.message);
if (result.decision === "challenge") return showCaptcha();
// allow → proceed normally`}</pre>
        </div>

        <div className={`code-content ${activeTab === "swift" ? "active" : ""}`}>
<pre>{`import SignalMesh

SignalMesh.shared.configure(SignalConfig(
  apiKey:   "sk_live_your_key",
  endpoint: "https://your-api.com/api/v1"
))

let result = try await SignalMesh.shared.evaluate(
  EvaluateOptions(eventType: "signup", email: emailField.text)
)

switch result.decision {
case .allow:     await submitSignup()
case .challenge: showCaptchaView()
case .block:     showAlert(result.action.message ?? "Blocked")
}`}</pre>
        </div>

        <div className={`code-content ${activeTab === "kotlin" ? "active" : ""}`}>
<pre>{`import com.SignalMesh.SignalMesh

SignalMesh.configure(context, SignalConfig(
  apiKey   = "sk_live_your_key",
  endpoint = "https://your-api.com/api/v1"
))

lifecycleScope.launch {
  val result = SignalMesh.evaluate(EvaluateOptions(
    eventType = "signup", email = emailInput.text.toString()
  ))
  when (result.decision) {
    "allow"     -> submitSignup()
    "challenge" -> showCaptchaDialog()
    "block"     -> showBlockMessage(result.action.message)
  }
}`}</pre>
        </div>

        <div className={`code-content ${activeTab === "unity" ? "active" : ""}`}>
<pre>{`using SignalMesh;

[SerializeField] private SignalSDK signal;

public void OnSignupClick() {
  signal.Evaluate(
    eventType: "signup",
    email:     emailInput.text,
    onResult:  result => {
      switch (result.decision) {
        case "allow":     SubmitSignup(); break;
        case "challenge": ShowCaptcha(); break;
        case "block":     ShowBlock(result.action.message); break;
      }
    }
  );
}`}</pre>
        </div>
      </div>
    </section>
  );
}