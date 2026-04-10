'use client';

import { useState } from 'react';
import type { Heading } from '@/lib/utils';
import { TableOfContents } from './TableOfContents';

export function MobileTOC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* "On this page" button — mobile ONLY, hidden on ≥1024px via inline media style trick */}
      <style>{`
        .mobile-toc-btn { display: flex; }
        @media (min-width: 1024px) { .mobile-toc-btn { display: none !important; } }
      `}</style>

      {/* Floating button — sits LEFT of the Ask AI button on mobile */}
      <button
        className="mobile-toc-btn"
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          /* Ask AI is at right:24px (~1.5rem) with width ~120px, so we offset left of it */
          right: 'calc(1.5rem + 130px)',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.55rem 1rem',
          background: '#fff',
          color: '#0066ff',
          border: '1.5px solid #0066ff',
          borderRadius: '999px',
          fontSize: '0.8rem',
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
          zIndex: 60,
          boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="15" y2="12" />
          <line x1="3" y1="18" x2="18" y2="18" />
        </svg>
        On this page
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.3)',
          zIndex: 70,
          backdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Bottom sheet drawer — always in DOM, slides via transform */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Table of contents"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '65%',
          background: '#fff',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: '0 1.25rem 2rem',
          overflowY: 'auto',
          zIndex: 80,
          transform: open ? 'translateY(0)' : 'translateY(105%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
          boxShadow: '0 -4px 32px rgba(0,0,0,0.12)',
        }}
      >
        {/* Drag handle */}
        <div style={{ display: 'flex', justifyContent: 'center', padding: '0.85rem 0 0.5rem' }}>
          <div style={{ width: 36, height: 4, borderRadius: 99, background: '#e0e0e0' }} />
        </div>

        {/* Drawer header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#999' }}>
            On this page
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#aaa', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <TableOfContents headings={headings} onLinkClick={() => setOpen(false)} />
      </div>
    </>
  );
}