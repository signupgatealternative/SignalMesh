'use client';

interface ToolButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function ToolButton({
  onClick,
  disabled = false,
  loading = false,
  children,
  variant = 'primary',
}: ToolButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '13px 24px',
        borderRadius: '9px',
        fontSize: '0.88rem',
        fontWeight: '700',
        fontFamily: '"Outfit", sans-serif',
        border: 'none',
        cursor: disabled || loading ? 'not-allowed' : 'none',
        opacity: disabled || loading ? 0.6 : 1,
        transition: 'all 0.2s',
        ...(variant === 'primary' ? {
          backgroundColor: 'var(--text)',
          color: '#fff',
        } : {
          backgroundColor: 'transparent',
          color: 'var(--text-2)',
          border: '1.5px solid var(--border)',
        }),
      }}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          e.currentTarget.style.transform = 'translateY(-2px)';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(15, 17, 23, 0.2)';
          }
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {loading && <span style={{ animation: 'spin 1s linear infinite' }}>↻</span>}
      {children}
    </button>
  );
}
