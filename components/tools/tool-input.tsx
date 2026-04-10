'use client';

interface ToolInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'url' | 'number';
  disabled?: boolean;
}

export function ToolInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  disabled = false,
}: ToolInputProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        display: 'block',
        fontSize: '0.85rem',
        fontWeight: '600',
        marginBottom: '8px',
        color: 'var(--text)',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1.5px solid var(--border)',
          borderRadius: '9px',
          fontSize: '0.88rem',
          backgroundColor: 'var(--surface)',
          color: 'var(--text)',
          fontFamily: 'inherit',
          transition: 'border-color 0.2s',
          cursor: disabled ? 'not-allowed' : 'default',
          opacity: disabled ? 0.6 : 1,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--shield)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border)';
        }}
      />
    </div>
  );
}
