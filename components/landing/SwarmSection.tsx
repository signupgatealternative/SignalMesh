export function SwarmSection() {
  return (
    <section id="swarm" style={{ paddingTop: 0 }}>
      <div className="swarm-section">
        
        {/* LEFT CONTENT */}
        <div>
          <div className="section-tag">Swarm intelligence</div>

          <h2 className="section-title">
            The fraud system<br />that never forgets.
          </h2>

          <p className="section-sub">
            Every blocked signup becomes knowledge. Every fraud ring caught
            strengthens the graph for every customer.
          </p>

          <ul className="swarm-points">
            <li className="swarm-point">
              <div className="swarm-point-icon">🧠</div>
              <div>
                <div className="swarm-point-title">Individual memory</div>
                <div className="swarm-point-body">
                  Every device and IP carries a memory of past decisions. A device
                  blocked last week is instantly recognized on a new signup attempt.
                </div>
              </div>
            </li>

            <li className="swarm-point">
              <div className="swarm-point-icon">🌊</div>
              <div>
                <div className="swarm-point-title">Collective memory</div>
                <div className="swarm-point-body">
                  1,200+ fraud patterns stored as vector embeddings. New signups
                  matched against all known patterns via cosine similarity in &lt;5ms.
                </div>
              </div>
            </li>

            <li className="swarm-point">
              <div className="swarm-point-icon">🔗</div>
              <div>
                <div className="swarm-point-title">Graph traversal</div>
                <div className="swarm-point-body">
                  Detects fraud rings by traversing connected nodes. A new device
                  connecting to a known bot cluster IP inherits its fraud score
                  instantly.
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* RIGHT VISUAL */}
        <div className="swarm-visual">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: ".1em",
              marginBottom: 16,
            }}
          >
            Live fraud graph — last 24h
          </div>

          <div className="graph-canvas">
            {/* Bot cluster */}
            <div className="graph-node cluster" style={{ left: 170, top: 80 }}>
              BOT
            </div>

            {/* IPs */}
            <div className="graph-node ip" style={{ left: 60, top: 30 }}>
              IP
            </div>
            <div className="graph-node ip" style={{ left: 290, top: 50 }}>
              IP
            </div>
            <div className="graph-node ip" style={{ left: 80, top: 160 }}>
              IP
            </div>

            {/* Devices */}
            <div className="graph-node dev" style={{ left: 20, top: 110 }}>
              DEV
            </div>
            <div className="graph-node dev" style={{ left: 320, top: 140 }}>
              DEV
            </div>
            <div className="graph-node dev" style={{ left: 240, top: 180 }}>
              DEV
            </div>
            <div className="graph-node dev" style={{ left: 120, top: 210 }}>
              DEV
            </div>

            {/* Emails */}
            <div className="graph-node email" style={{ left: 350, top: 80 }}>
              @
            </div>
            <div className="graph-node email" style={{ left: 40, top: 200 }}>
              @
            </div>
            <div className="graph-node email" style={{ left: 280, top: 220 }}>
              @
            </div>

            {/* Connections */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              <line x1="192" y1="100" x2="82" y2="52" stroke="rgba(255,77,109,0.3)" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="192" y1="100" x2="312" y2="72" stroke="rgba(255,77,109,0.3)" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="192" y1="100" x2="100" y2="182" stroke="rgba(255,77,109,0.3)" strokeWidth="1" strokeDasharray="4 3" />
              <line x1="82" y1="52" x2="38" y2="128" stroke="rgba(79,255,176,0.25)" strokeWidth="1" />
              <line x1="312" y1="72" x2="338" y2="158" stroke="rgba(79,255,176,0.25)" strokeWidth="1" />
              <line x1="312" y1="72" x2="366" y2="96" stroke="rgba(165,243,252,0.25)" strokeWidth="1" />
              <line x1="192" y1="100" x2="258" y2="198" stroke="rgba(79,255,176,0.15)" strokeWidth="1" />
              <line x1="100" y1="182" x2="138" y2="228" stroke="rgba(79,255,176,0.2)" strokeWidth="1" />
              <line x1="100" y1="182" x2="56" y2="216" stroke="rgba(165,243,252,0.2)" strokeWidth="1" />
              <line x1="258" y1="198" x2="296" y2="238" stroke="rgba(165,243,252,0.2)" strokeWidth="1" />
            </svg>
          </div>

          {/* Stats */}
          <div className="memory-bar">
            <div className="memory-stat">
              <div className="memory-val">48k</div>
              <div className="memory-label">Graph nodes</div>
            </div>

            <div className="memory-stat">
              <div className="memory-val" style={{ color: "var(--red)" }}>
                312
              </div>
              <div className="memory-label">Fraud rings</div>
            </div>

            <div className="memory-stat">
              <div className="memory-val" style={{ color: "var(--amber)" }}>
                1,204
              </div>
              <div className="memory-label">Patterns</div>
            </div>

            <div className="memory-stat">
              <div className="memory-val" style={{ color: "var(--volt)" }}>
                97%
              </div>
              <div className="memory-label">Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* FORMULA */}
      <div className="formula-card">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: ".1em",
          }}
        >
          Ensemble scoring formula
        </div>

        <div className="formula">
          final_score = <span className="f-rules">rules</span>{" "}
          <span className="f-op">× 0.30</span> +{" "}
          <span className="f-ml">XGBoost</span>{" "}
          <span className="f-op">× 0.40</span> +{" "}
          <span className="f-swarm">swarm_boost</span>{" "}
          <span className="f-op">× 0.30</span>
        </div>

        <div className="formula-labels">
          <div className="formula-label">
            <div className="formula-label-dot" style={{ background: "var(--volt)" }} />
            Weighted rule flags (instant)
          </div>

          <div className="formula-label">
            <div className="formula-label-dot" style={{ background: "var(--signal)" }} />
            Your XGBoost model (trained on your data)
          </div>

          <div className="formula-label">
            <div className="formula-label-dot" style={{ background: "var(--amber)" }} />
            Graph + collective memory boost (up to +40pts)
          </div>
        </div>
      </div>
    </section>
  );
}