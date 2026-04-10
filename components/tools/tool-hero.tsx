'use client';

interface ToolHeroProps {
  title: string;
  subtitle: string;
  icon?: string;
}

export function ToolHero({ title, subtitle }: ToolHeroProps) {
  return (
    <section className="hero" style={{ minHeight: '70vh' }}>
      <div className="hero-grid"></div>
      <div className="hero-glow"></div>
      
      <div className="hero-badge">
        <span className="badge-dot"></span>
        Security Tool
      </div>
      
      <h1 style={{ position: 'relative', zIndex: 1 }}>
        {title}
      </h1>
      
      <p className="hero-sub" style={{ position: 'relative', zIndex: 1 }}>
        {subtitle}
      </p>
    </section>
  );
}
