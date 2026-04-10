'use client';

import { useEffect, useState } from 'react';
import type { Heading } from '@/lib/utils';

interface Props {
  headings: Heading[];
  onLinkClick?: () => void;
}

export function TableOfContents({ headings, onLinkClick }: Props) {
  const [activeId, setActiveId] = useState<string>('');
  const [progress, setProgress] = useState({ top: 0, height: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveId(id);

            const el = document.querySelector(`[href="#${id}"]`);
            if (el) {
              const rect = el.getBoundingClientRect();
              const parentRect = el.parentElement?.getBoundingClientRect();
              if (parentRect) {
                setProgress({
                  top: rect.top - parentRect.top,
                  height: rect.height,
                });
              }
            }

            break;
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px' }
    );

    headings.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getParentActive = (heading: Heading) => {
    if (heading.level === 2) {
      const index = headings.findIndex((h) => h.id === heading.id);
      for (let i = index + 1; i < headings.length; i++) {
        if (headings[i].level === 2) break;
        if (headings[i].id === activeId) return true;
      }
    }
    return heading.id === activeId;
  };

  return (
    <div style={{ position: 'sticky', top: 'calc(var(--header-height) + 2rem)' }}>
      <div
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          color: '#999',
          marginBottom: '0.75rem',
        }}
      >
        On this page
      </div>

      <div style={{ position: 'relative' }}>
        {/* Background track */}
        <div
          style={{
            position: 'absolute',
            left: '2px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'rgba(0,0,0,0.06)',
          }}
        />

        {/* Scroll progress */}
        <div
          style={{
            position: 'absolute',
            left: '2px',
            top: 0,
            width: '2px',
            height: `${scrollProgress * 100}%`,
            background: 'rgba(0,102,255,0.2)',
            transition: 'height 0.1s linear',
          }}
        />

        {/* Active indicator */}
        <div
          style={{
            position: 'absolute',
            left: '2px',
            width: '2px',
            background: '#0066ff',
            borderRadius: '2px',
            top: `${progress.top}px`,
            height: `${progress.height}px`,
            transition: 'all 0.2s ease',
          }}
        />

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.05rem' }}>
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const isParentActive = getParentActive(heading);
            const basePadding = heading.level === 3 ? 14 : 10;
            const borderWidth = 2;

            return (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={onLinkClick}
                style={{
                  display: 'block',
                  padding: '0.28rem 0px',
                  paddingLeft: `${basePadding + borderWidth + 6}px`,
                  fontSize: '0.8rem',
                  color: isActive ? '#0066ff' : isParentActive ? '#333' : '#777',
                  fontWeight: isActive ? 600 : isParentActive ? 500 : 400,
                  textDecoration: 'none',
                  borderLeft: `${borderWidth}px solid ${
                    isActive ? '#0066ff' : isParentActive ? 'rgba(0,102,255,0.3)' : 'transparent'
                  }`,
                  backgroundColor: isActive ? 'rgba(0,102,255,0.06)' : 'transparent',
                  borderRadius: '4px',
                  transition: 'all 0.12s',
                  lineHeight: 1.4,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#111';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = isParentActive ? '#333' : '#777';
                }}
              >
                {heading.text}
              </a>
            );
          })}
        </nav>
      </div>
    </div>
  );
}