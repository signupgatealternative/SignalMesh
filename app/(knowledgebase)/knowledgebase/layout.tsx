import type { Metadata } from 'next';
import './globals.css';

import { AskDocsWidget } from '@/components/knowledgebase/ai/ask-docs-widget';
import { LayoutShell } from '@/components/knowledgebase/LayoutShell';

export const metadata: Metadata = {
  title: { default: 'SignUp Docs', template: '%s — DevDocs' },
  description: 'Developer documentation and notes',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
        <AskDocsWidget />
      </body>
    </html>
  );
}