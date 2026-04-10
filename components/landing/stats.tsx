export function Stats() {
  const stats = [
    { value: '99.6%', label: 'Fraud detection accuracy' },
    { value: '42ms', label: 'Average API response time' },
    { value: '2.4B+', label: 'Signups analyzed to date' },
    { value: '0.01%', label: 'False positive rate' },
  ];

  return (
    <div className="stats-band" id="stats">
      <div className="stats-inner">
        {stats.map((stat, idx) => (
          <div key={idx} className={`reveal ${idx > 0 ? `reveal-delay-${idx}` : ''}`}>
            <div className="stat-big">{stat.value}</div>
            <div className="stat-big-label">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
