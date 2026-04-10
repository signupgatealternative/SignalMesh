'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { navigation } from '@/lib/docs-data';

// ── Flatten all nav items into a searchable list ──────────────────────────────
const ALL_PAGES = navigation.flatMap((section) =>
  section.items.map((item) => ({
    slug: item.slug,
    title: item.title,
    section: section.title,
    badge: item.badge,
    href: `/knowledgebase/${item.slug}`,
  }))
);

// ── Highlight matched substring ───────────────────────────────────────────────
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: '#fef08a', color: 'inherit', borderRadius: 2, padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

// ── Badge chip ────────────────────────────────────────────────────────────────
const badgeStyle: Record<string, React.CSSProperties> = {
  new:        { background: '#dcfce7', color: '#166534' },
  beta:       { background: '#fef3c7', color: '#92400e' },
  deprecated: { background: '#fee2e2', color: '#991b1b' },
};

// ── Icons ─────────────────────────────────────────────────────────────────────
const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C17.5 22.15 21 17.25 21 12V6l-9-4z" fill="white" />
    <path d="M9 12l2 2 4-4" stroke="#00c48a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const HamburgerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

// ── Search Modal ──────────────────────────────────────────────────────────────
function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Filter results
  const results = query.trim()
    ? ALL_PAGES.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.section.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_PAGES;

  // Reset active when results change
  useEffect(() => { setActiveIdx(0); }, [query]);

  // Focus input on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      if (results[activeIdx]) navigate(results[activeIdx].href);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  // Group results by section
  const grouped: Record<string, typeof results> = {};
  for (const r of results) {
    if (!grouped[r.section]) grouped[r.section] = [];
    grouped[r.section].push(r);
  }

  let globalIdx = 0;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(4px)',
          zIndex: 9000,
          animation: 'searchFadeIn 0.15s ease',
        }}
      />

      {/* Panel */}
      <div
        style={{
          position: 'fixed',
          top: '10vh',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(620px, calc(100vw - 2rem))',
          maxHeight: '75vh',
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 32px 80px rgba(0,0,0,0.22), 0 0 0 1px rgba(0,0,0,0.06)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 9001,
          animation: 'searchSlideIn 0.18s cubic-bezier(0.34,1.26,0.64,1)',
        }}
        onKeyDown={handleKey}
      >
        {/* Search input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '0 16px',
            borderBottom: '1px solid #f0f0f0',
            flexShrink: 0,
          }}
        >
          <svg width="17" height="17" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, color: '#aaa' }}>
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m14.5 14.5 3.5 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documentation…"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              padding: '15px 0',
              fontSize: '1rem',
              fontFamily: 'inherit',
              color: '#111',
              background: 'transparent',
            }}
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: '#f0f0f0',
                border: 'none',
                borderRadius: 6,
                width: 22,
                height: 22,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#888',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          <button
            onClick={onClose}
            style={{
              background: '#f4f4f5',
              border: '1px solid #e8e8e8',
              borderRadius: 6,
              padding: '3px 8px',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#666',
              cursor: 'pointer',
              flexShrink: 0,
              fontFamily: 'inherit',
            }}
          >
            Esc
          </button>
        </div>

        {/* Results */}
        <div
          ref={listRef}
          style={{
            overflowY: 'auto',
            padding: '8px 0 12px',
            flex: 1,
          }}
        >
          {results.length === 0 ? (
            <div
              style={{
                padding: '2.5rem 1rem',
                textAlign: 'center',
                color: '#aaa',
                fontSize: '0.88rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              No results for <strong style={{ color: '#666' }}>"{query}"</strong>
            </div>
          ) : (
            Object.entries(grouped).map(([section, items]) => (
              <div key={section}>
                {/* Section label */}
                <div
                  style={{
                    padding: '8px 16px 4px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#bbb',
                  }}
                >
                  {section}
                </div>

                {items.map((item) => {
                  const idx = globalIdx++;
                  const isActive = idx === activeIdx;

                  return (
                    <button
                      key={item.slug}
                      data-idx={idx}
                      onClick={() => navigate(item.href)}
                      onMouseEnter={() => setActiveIdx(idx)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '9px 16px',
                        background: isActive ? '#f0f5ff' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        transition: 'background 0.08s',
                      }}
                    >
                      {/* Doc icon */}
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: isActive ? '#dde8ff' : '#f4f4f5',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          transition: 'background 0.08s',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isActive ? '#0066ff' : '#aaa'} strokeWidth="2" strokeLinecap="round">
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </div>

                      {/* Title + section */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500, color: isActive ? '#0055dd' : '#111', lineHeight: 1.3 }}>
                          <Highlight text={item.title} query={query} />
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: 1 }}>
                          <Highlight text={item.section} query={query} />
                        </div>
                      </div>

                      {/* Badge */}
                      {item.badge && (
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            padding: '2px 7px',
                            borderRadius: 99,
                            flexShrink: 0,
                            ...badgeStyle[item.badge],
                          }}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Arrow */}
                      <svg
                        width="13" height="13" viewBox="0 0 24 24" fill="none"
                        stroke={isActive ? '#0066ff' : '#ddd'}
                        strokeWidth="2.5" strokeLinecap="round"
                        style={{ flexShrink: 0, transition: 'stroke 0.08s' }}
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div
          style={{
            borderTop: '1px solid #f4f4f5',
            padding: '8px 16px',
            display: 'flex',
            gap: 14,
            flexShrink: 0,
          }}
        >
          {[
            { keys: ['↑', '↓'], label: 'navigate' },
            { keys: ['↵'], label: 'open' },
            { keys: ['Esc'], label: 'close' },
          ].map(({ keys, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {keys.map((k) => (
                <kbd
                  key={k}
                  style={{
                    background: '#f4f4f5',
                    border: '1px solid #e8e8e8',
                    borderBottom: '2px solid #e0e0e0',
                    borderRadius: 4,
                    padding: '1px 6px',
                    fontSize: '0.7rem',
                    fontFamily: 'inherit',
                    color: '#666',
                  }}
                >
                  {k}
                </kbd>
              ))}
              <span style={{ fontSize: '0.72rem', color: '#bbb' }}>{label}</span>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: '0.72rem', color: '#ddd' }}>{results.length} result{results.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes searchFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes searchSlideIn {
          from { opacity: 0; transform: translateX(-50%) scale(0.96) translateY(-8px); }
          to   { opacity: 1; transform: translateX(-50%) scale(1)    translateY(0); }
        }
      `}</style>
    </>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────
interface HeaderProps {
  onMenuToggle?: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  // Global ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 'var(--header-height)',
          background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1rem',
          gap: '0.75rem',
        }}
      >
        {/* Hamburger — mobile only */}
        <button
          className="mobile-menu-btn"
          onClick={onMenuToggle}
          aria-label="Open navigation"
        >
          <HamburgerIcon />
        </button>

        {/* Logo */}
        <a href="/" className="nav-logo" style={{ flexShrink: 0 }}>
          <div className="logo-icon">
            <ShieldIcon />
          </div>
          <span>SignalMesh</span>
        </a>

        {/* Nav links — hidden on mobile */}
        <nav className="header-nav" style={{ display: 'flex', gap: '0.25rem', flex: 1 }}>
          {['Guides', 'API Reference', 'SDK'].map((item) => (
            <button
              key={item}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.35rem 0.75rem',
                borderRadius: 6,
                fontSize: '0.875rem',
                color: '#555',
                fontFamily: 'inherit',
                fontWeight: 500,
                transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = '#f4f4f5';
                (e.target as HTMLElement).style.color = '#111';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'none';
                (e.target as HTMLElement).style.color = '#555';
              }}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile spacer */}
        <div style={{ flex: 1 }} className="mobile-spacer" />

        {/* Search trigger button */}
        <button
          onClick={() => setSearchOpen(true)}
          aria-label="Search documentation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#f4f4f5',
            border: '1px solid #e8e8e8',
            borderRadius: 8,
            padding: '0.4rem 0.75rem',
            cursor: 'pointer',
            fontSize: '0.82rem',
            color: '#888',
            fontFamily: 'inherit',
            minWidth: 0,
            maxWidth: 240,
            flex: '0 1 200px',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#00c48a';
            e.currentTarget.style.background = '#f0fdf8';
            e.currentTarget.style.color = '#555';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e8e8e8';
            e.currentTarget.style.background = '#f4f4f5';
            e.currentTarget.style.color = '#888';
          }}
        >
          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="9" cy="9" r="7" stroke="#aaa" strokeWidth="2" />
            <path d="m14.5 14.5 3.5 3.5" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span
            className="header-search-label"
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, textAlign: 'left' }}
          >
            Search docs...
          </span>
          <span
            className="header-shortcut"
            style={{
              marginLeft: 'auto',
              background: '#e8e8e8',
              borderRadius: 4,
              padding: '0.05rem 0.4rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#666',
              letterSpacing: '0.02em',
              flexShrink: 0,
            }}
          >
            ⌘K
          </span>
        </button>

        {/* GitHub */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="header-github"
          aria-label="GitHub"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 34,
            height: 34,
            borderRadius: 8,
            border: '1px solid #e8e8e8',
            color: '#555',
            textDecoration: 'none',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#ccc';
            e.currentTarget.style.background = '#f4f4f5';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#e8e8e8';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </header>

      {/* Search modal — portal-rendered */}
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}