'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navigation } from '@/lib/docs-data';

const badgeColors: Record<string, { bg: string; text: string }> = {
  new: { bg: '#dcfce7', text: '#166534' },
  beta: { bg: '#fef3c7', text: '#92400e' },
  deprecated: { bg: '#fee2e2', text: '#991b1b' },
};

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const currentSlug = pathname.split('/').pop();

  return (
    <>
      {/* Dim overlay — mobile only (CSS controls display) */}
      <div
        className={`sidebar-overlay${isOpen ? ' open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar-drawer${isOpen ? ' open' : ''}`}
        style={{
          position: 'fixed',
          top: 'var(--header-height)',
          left: 0,
          bottom: 0,
          width: 'var(--sidebar-width)',
          borderRight: '1px solid #f0f0f0',
          overflowY: 'auto',
          padding: '1.5rem 0 2rem',
          background: '#fafafa',
        }}
      >
        {navigation.map((section) => (
          <div key={section.title} style={{ marginBottom: '0.25rem' }}>
            <div
              style={{
                padding: '0.5rem 1.25rem 0.35rem',
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: '#999',
              }}
            >
              {section.title}
            </div>

            {section.items.map((item) => {
              const isActive = currentSlug === item.slug;
              const badge = item.badge ? badgeColors[item.badge] : null;

              return (
                <Link
                  key={item.slug}
                  href={`/knowledgebase/${item.slug}`}
                  onClick={onClose}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.38rem 1.25rem',
                    margin: '0.05rem 0.5rem',
                    borderRadius: 6,
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    fontWeight: isActive ? 500 : 400,
                    color: isActive ? '#0055dd' : '#444',
                    background: isActive ? '#eef2ff' : 'transparent',
                    transition: 'all 0.12s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = '#f0f0f0';
                      (e.currentTarget as HTMLElement).style.color = '#111';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.background = 'transparent';
                      (e.currentTarget as HTMLElement).style.color = '#444';
                    }
                  }}
                >
                  <span style={{ flex: 1 }}>{item.title}</span>
                  {badge && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.04em',
                        padding: '0.1rem 0.45rem',
                        borderRadius: 99,
                        background: badge.bg,
                        color: badge.text,
                        flexShrink: 0,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div style={{ height: '0.75rem' }} />
          </div>
        ))}

        <div
          style={{
            padding: '1rem 1.25rem',
            borderTop: '1px solid #ebebeb',
            marginTop: '0.5rem',
          }}
        >
          <div style={{ fontSize: '0.72rem', color: '#bbb', lineHeight: 1.6 }}>
            v1.2.0 · MIT License
          </div>
        </div>
      </aside>
    </>
  );
}