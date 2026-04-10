export default function KnowledgebaseHome() {
  const sections = [
    {
      title: 'Quick Start',
      description: 'Get up and running in minutes',
      slug: 'quick-start',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      ),
      color: '#00c48a',
      bg: '#e8faf4',
    },
    {
      title: 'Introduction',
      description: 'Understand how SignalMesh works',
      slug: 'introduction',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      ),
      color: '#3b82f6',
      bg: '#eff6ff',
    },
    {
      title: 'Getting Started',
      description: 'Install the SDK and send your first event',
      slug: 'getting-started',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      color: '#8b5cf6',
      bg: '#f5f3ff',
    },
    {
      title: 'Risk Scoring',
      description: 'Learn how signals become a risk score',
      slug: 'risk-scoring',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C17.5 22.15 21 17.25 21 12V6l-9-4z" />
        </svg>
      ),
      color: '#f59e0b',
      bg: '#fffbeb',
    },
    {
      title: 'Bot Detection',
      description: 'Catch automated signups before they land',
      slug: 'bot-detection',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="10" rx="2" />
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v4" />
          <line x1="8" y1="16" x2="8" y2="16" strokeWidth="2.5" />
          <line x1="16" y1="16" x2="16" y2="16" strokeWidth="2.5" />
        </svg>
      ),
      color: '#f03e5a',
      bg: '#fff1f3',
    },
    {
      title: 'API Reference',
      description: 'Full REST API docs and request examples',
      slug: 'api-reference',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="9" y1="13" x2="15" y2="13" />
          <line x1="9" y1="17" x2="13" y2="17" />
        </svg>
      ),
      color: '#0066ff',
      bg: '#eff4ff',
    },
    {
      title: 'Webhooks',
      description: 'Receive real-time events on your server',
      slug: 'webhooks',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 16v-1a4 4 0 00-4-4H8" />
          <polyline points="12 7 8 11 12 15" />
          <circle cx="18" cy="18" r="2" />
          <circle cx="6" cy="11" r="2" />
        </svg>
      ),
      color: '#06b6d4',
      bg: '#ecfeff',
    },
    {
      title: 'False Positives',
      description: 'Tune thresholds and reduce friction',
      slug: 'false-positives',
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      ),
      color: '#ec4899',
      bg: '#fdf2f8',
    },
  ];

  const popular = sections.slice(0, 3).map((s) => s.title);

  return (
    <>
      <style>{`
        .kb-home {
          max-width: 860px;
          margin: 0 auto;
          padding: 3.5rem 2rem 5rem;
        }

        /* ── Hero ── */
        .kb-hero {
          margin-bottom: 2.75rem;
        }
        .kb-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #00c48a;
          background: #e8faf4;
          border: 1px solid #b6f0db;
          padding: 4px 10px;
          border-radius: 99px;
          margin-bottom: 1rem;
        }
        .kb-title {
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 750;
          letter-spacing: -0.04em;
          color: #0a0a0a;
          line-height: 1.1;
          margin: 0 0 0.65rem;
        }
        .kb-subtitle {
          font-size: 1rem;
          color: #6b7280;
          margin: 0;
          max-width: 48ch;
          line-height: 1.65;
        }

        /* ── Search bar ── */
        .kb-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1.5px solid #e4e7ec;
          border-radius: 12px;
          padding: 0 14px;
          margin: 2rem 0 2.75rem;
          transition: border-color 0.15s, box-shadow 0.15s;
          max-width: 480px;
        }
        .kb-search:focus-within {
          border-color: #00c48a;
          box-shadow: 0 0 0 3px rgba(0,196,138,0.12);
        }
        .kb-search input {
          flex: 1;
          border: none;
          outline: none;
          padding: 11px 0;
          font-size: 0.88rem;
          font-family: inherit;
          color: #111;
          background: transparent;
        }
        .kb-search input::placeholder { color: #aaa; }

        /* ── Section label ── */
        .kb-section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #bbb;
          margin-bottom: 0.85rem;
        }

        /* ── Card grid ── */
        .kb-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 2.5rem;
        }
        @media (max-width: 580px) {
          .kb-grid { grid-template-columns: 1fr; }
          .kb-home { padding: 2rem 1.25rem 4rem; }
          .kb-search { max-width: 100%; }
        }

        /* ── Card ── */
        .kb-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 18px 20px;
          background: #fff;
          border: 1.5px solid #f0f0f0;
          border-radius: 14px;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: border-color 0.15s, box-shadow 0.15s, transform 0.15s;
          position: relative;
          overflow: hidden;
        }
        .kb-card::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.15s;
          pointer-events: none;
        }
        .kb-card:hover {
          border-color: transparent;
          box-shadow: 0 4px 24px rgba(0,0,0,0.09);
          transform: translateY(-2px);
        }
        .kb-card-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.15s;
        }
        .kb-card:hover .kb-card-icon {
          transform: scale(1.08);
        }
        .kb-card-body { flex: 1; min-width: 0; }
        .kb-card-title {
          font-size: 0.92rem;
          font-weight: 650;
          color: #111;
          margin: 0 0 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .kb-card-desc {
          font-size: 0.78rem;
          color: #888;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .kb-card-arrow {
          color: #ccc;
          flex-shrink: 0;
          transition: transform 0.15s, color 0.15s;
        }
        .kb-card:hover .kb-card-arrow {
          transform: translateX(3px);
          color: #888;
        }

        /* ── Popular pills ── */
        .kb-popular {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .kb-popular-label {
          font-size: 0.78rem;
          color: #aaa;
          flex-shrink: 0;
        }
        .kb-pill {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          background: #f9f9f9;
          border: 1px solid #f0f0f0;
          border-radius: 99px;
          font-size: 0.78rem;
          color: #555;
          text-decoration: none;
          transition: background 0.12s, border-color 0.12s, color 0.12s;
        }
        .kb-pill:hover {
          background: #e8faf4;
          border-color: #b6f0db;
          color: #00a877;
        }

        /* ── Fade-up animation ── */
        @keyframes kbFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .kb-hero   { animation: kbFadeUp 0.4s ease both; }
        .kb-search { animation: kbFadeUp 0.4s 0.08s ease both; }
        .kb-grid .kb-card:nth-child(1)  { animation: kbFadeUp 0.35s 0.10s ease both; }
        .kb-grid .kb-card:nth-child(2)  { animation: kbFadeUp 0.35s 0.14s ease both; }
        .kb-grid .kb-card:nth-child(3)  { animation: kbFadeUp 0.35s 0.18s ease both; }
        .kb-grid .kb-card:nth-child(4)  { animation: kbFadeUp 0.35s 0.22s ease both; }
        .kb-grid .kb-card:nth-child(5)  { animation: kbFadeUp 0.35s 0.26s ease both; }
        .kb-grid .kb-card:nth-child(6)  { animation: kbFadeUp 0.35s 0.30s ease both; }
        .kb-grid .kb-card:nth-child(7)  { animation: kbFadeUp 0.35s 0.34s ease both; }
        .kb-grid .kb-card:nth-child(8)  { animation: kbFadeUp 0.35s 0.38s ease both; }
        .kb-popular { animation: kbFadeUp 0.35s 0.42s ease both; }
      `}</style>

      <div className="kb-home">
        {/* ── Hero ── */}
        <div className="kb-hero">
          <div className="kb-eyebrow">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C17.5 22.15 21 17.25 21 12V6l-9-4z" />
            </svg>
            SignalMesh Docs
          </div>
          <h1 className="kb-title">Knowledge Base</h1>
          <p className="kb-subtitle">
            Everything you need to integrate, configure, and get the most out of SignalMesh.
          </p>
        </div>

        {/* ── Search ── */}
        <div className="kb-search">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="7" stroke="#bbb" strokeWidth="2" />
            <path d="m14.5 14.5 3.5 3.5" stroke="#bbb" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input placeholder="Search the docs…" />
          <span style={{ fontSize: '0.72rem', background: '#f4f4f5', color: '#aaa', borderRadius: 5, padding: '2px 6px', fontWeight: 600, flexShrink: 0 }}>⌘K</span>
        </div>

        {/* ── Card grid ── */}
        <p className="kb-section-label">Browse topics</p>
        <div className="kb-grid">
          {sections.map((s) => (
            <a
              key={s.slug}
              href={`/knowledgebase/${s.slug}`}
              className="kb-card"
            >
              <div
                className="kb-card-icon"
                style={{ background: s.bg, color: s.color }}
              >
                {s.icon}
              </div>
              <div className="kb-card-body">
                <p className="kb-card-title">{s.title}</p>
                <p className="kb-card-desc">{s.description}</p>
              </div>
              <svg className="kb-card-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          ))}
        </div>

        {/* ── Popular ── */}
        <div className="kb-popular">
          <span className="kb-popular-label">Popular:</span>
          {popular.map((title) => {
            const s = sections.find((x) => x.title === title)!;
            return (
              <a key={s.slug} href={`/knowledgebase/${s.slug}`} className="kb-pill">
                <span style={{ color: s.color, display: 'flex' }}>{s.icon && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                )}</span>
                {title}
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}