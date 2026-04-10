'use client';

import { useState } from 'react';
import { Header } from '@/components/knowledgebase/Header';
import { Sidebar } from '@/components/knowledgebase/Sidebar';

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onMenuToggle={() => setSidebarOpen((v) => !v)} />
      <div style={{ display: 'flex', flex: 1, paddingTop: 'var(--header-height)' }}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          style={{
            flex: 1,
            minWidth: 0,
            // Desktop: sidebar pushes content right. Mobile: full width via CSS override.
          }}
          className="main-content"
        >
          {children}
        </main>
      </div>
    </div>
  );
}