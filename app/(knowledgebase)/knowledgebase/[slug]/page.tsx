import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { docs } from '@/lib/docs-data';
import { DocContent } from '@/components/knowledgebase/DocContent';
import { TableOfContents } from '@/components/knowledgebase/TableOfContents';
import { MobileTOC } from '@/components/knowledgebase/MobileTOC';
import { extractHeadings } from '@/lib/utils';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(docs).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = docs[slug];
  if (!page) return {};
  return { title: page.title, description: page.description };
}

export default async function DocPage({ params }: Props) {
  const { slug } = await params;
  const page = docs[slug];
  if (!page) notFound();

  const headings = extractHeadings(page.content);

  return (
    <div style={{ display: 'flex', gap: 0, maxWidth: '100%' }}>
      {/* Main doc content */}
      <div
        className="doc-page-content"
        style={{
          flex: 1,
          minWidth: 0,
          // On desktop with TOC, leave room for it. CSS handles mobile.
          maxWidth: headings.length > 0 ? `calc(100% - var(--toc-width) - 2rem)` : '100%',
          padding: 'clamp(1.5rem, 4vw, 3rem) clamp(1.25rem, 5vw, 3.5rem) 4rem',
        }}
      >
        <DocContent page={page} headings={headings} />
      </div>

      {/* Desktop TOC — hidden on mobile via CSS */}
      {headings.length > 0 && (
        <aside
          className="toc-aside"
          style={{
            width: 'var(--toc-width)',
            flexShrink: 0,
            padding: '3rem 1.5rem 4rem 0',
          }}
        >
          <TableOfContents headings={headings} />
        </aside>
      )}

      {/* Mobile TOC — floating button + drawer, hidden on desktop */}
      {headings.length > 0 && <MobileTOC headings={headings} />}
    </div>
  );
}