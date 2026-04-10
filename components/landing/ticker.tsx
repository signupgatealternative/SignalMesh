export function Ticker() {
  const tickerItems = [
    { type: 'd', text: 'BLOCKED · mailinator.com · disposable email' },
    { type: 'sep', text: '/' },
    { type: 'w', text: 'FLAGGED · residential proxy · AS#4134' },
    { type: 'sep', text: '/' },
    { type: 'g', text: 'ALLOWED · clean device · score 0.98' },
    { type: 'sep', text: '/' },
    { type: 'd', text: 'BLOCKED · Puppeteer headless · bot signal' },
    { type: 'sep', text: '/' },
    { type: 'd', text: 'BLOCKED · 14 linked IDs · multi-account' },
    { type: 'sep', text: '/' },
    { type: 'w', text: 'FLAGGED · NordVPN exit · AS#9009' },
    { type: 'sep', text: '/' },
    { type: 'g', text: 'ALLOWED · trusted email · score 0.99' },
    { type: 'sep', text: '/' },
    { type: 'd', text: 'BLOCKED · Tor relay #443 · anonymizer' },
    { type: 'sep', text: '/' },
  ];

  return (
    <div className="ticker-wrap">
      <div className="ticker">
        {[...tickerItems, ...tickerItems].map((item, idx) => (
          <span key={idx} className="ticker-item">
            {item.type === 'sep' ? (
              item.text
            ) : (
              <>
                <span className={item.type}>●</span> {item.text}
              </>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
