'use client';

interface ToolSectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function ToolSection({ title, subtitle, children }: ToolSectionProps) {
  return (
    <section className="live-section">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ marginBottom: '20px' }}>{title}</h2>
        {subtitle && <p className="section-sub">{subtitle}</p>}
        <div style={{ marginTop: '28px' }}>
          {children}
        </div>
      </div>
    </section>
  );
}
