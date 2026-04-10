'use client';

interface ToolResultProps {
  status: 'success' | 'danger' | 'warning' | 'info';
  title: string;
  description: string;
  details?: Record<string, string | number>;
  recommendations?: string[];
}

export function ToolResult({
  status,
  title,
  description,
  details,
  recommendations,
}: ToolResultProps) {
  const colors = {
    success: { bg: 'var(--shield-light)', text: 'var(--shield-mid)', border: 'rgba(0, 196, 138, 0.15)' },
    danger: { bg: 'var(--danger-light)', text: 'var(--danger)', border: 'rgba(240, 62, 90, 0.12)' },
    warning: { bg: 'var(--warn-light)', text: 'var(--warn)', border: 'rgba(245, 158, 11, 0.15)' },
    info: { bg: '#f0f4f8', text: '#0f1117', border: '#e4e7ec' },
  };

  const color = colors[status];

  return (
    <div style={{
      backgroundColor: color.bg,
      border: `1.5px solid ${color.border}`,
      borderRadius: '12px',
      padding: '24px',
      marginTop: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div style={{
          width: '24px',
          height: '24px',
          borderRadius: '50%',
          backgroundColor: color.text,
          opacity: 0.2,
        }} />
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '700',
          color: color.text,
          margin: 0,
        }}>
          {title}
        </h3>
      </div>

      <p style={{
        fontSize: '0.88rem',
        color: 'var(--text-2)',
        margin: '0 0 16px 0',
        lineHeight: '1.6',
      }}>
        {description}
      </p>

      {details && Object.keys(details).length > 0 && (
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '16px',
          fontSize: '0.82rem',
        }}>
          {Object.entries(details).map(([key, value]) => (
            <div key={key} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '6px 0',
              borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
            }}>
              <span style={{ fontWeight: '500' }}>{key}:</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', color: color.text, fontWeight: '600' }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <div>
          <div style={{ fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text)' }}>
            Recommendations:
          </div>
          <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem' }}>
            {recommendations.map((rec, i) => (
              <li key={i} style={{ marginBottom: '6px', color: 'var(--text-2)' }}>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
