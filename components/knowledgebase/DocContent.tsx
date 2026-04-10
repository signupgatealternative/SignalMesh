import type { DocPage } from '@/lib/docs-data';
import type { Heading } from '@/lib/utils';

interface Props {
  page: DocPage;
  headings: Heading[];
}

const badgeLabels: Record<string, string> = {
  new: 'New',
  beta: 'Beta',
  deprecated: 'Deprecated',
};

const badgeStyles: Record<string, React.CSSProperties> = {
  new: { background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0' },
  beta: { background: '#fef3c7', color: '#92400e', borderColor: '#fde68a' },
  deprecated: { background: '#fee2e2', color: '#991b1b', borderColor: '#fecaca' },
};

function renderContent(content: string): string {
  let html = content.trim();

  // Escape HTML (basic)
  // Process line by line for block elements
  const lines = html.split('\n');
  const result: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(
          lines[i]
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        );
        i++;
      }
      result.push(`<pre data-lang="${lang}"><code>${codeLines.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    // Callouts
    const calloutMatch = line.match(/^<callout type="(\w+)">(.*?)<\/callout>$/);
    if (calloutMatch) {
      const type = calloutMatch[1];
      const text = calloutMatch[2];
      const icons: Record<string, string> = {
        note: '💡',
        warning: '⚠️',
        tip: '✨',
      };
      result.push(
        `<div class="callout callout-${type}">${icons[type] || '📌'} ${text}</div>`
      );
      i++;
      continue;
    }

    // Tables
    if (line.trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Skip separator line
      const rows = tableLines.filter((r) => !r.match(/^\|[\s\-:|]+\|$/));
      const tableHtml = ['<table>'];
      rows.forEach((row, idx) => {
        const cells = row
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());
        const tag = idx === 0 ? 'th' : 'td';
        tableHtml.push(`<tr>${cells.map((c) => `<${tag}>${applyInline(c)}</${tag}>`).join('')}</tr>`);
      });
      tableHtml.push('</table>');
      result.push(tableHtml.join(''));
      continue;
    }

    // Headings
    const h4 = line.match(/^####\s+(.+)/);
    const h3 = line.match(/^###\s+(.+)/);
    const h2 = line.match(/^##\s+(.+)/);
    const h1 = line.match(/^#\s+(.+)/);
    if (h4) { result.push(`<h4 id="${slugify(h4[1])}">${applyInline(h4[1])}</h4>`); i++; continue; }
    if (h3) { result.push(`<h3 id="${slugify(h3[1])}">${applyInline(h3[1])}</h3>`); i++; continue; }
    if (h2) { result.push(`<h2 id="${slugify(h2[1])}">${applyInline(h2[1])}</h2>`); i++; continue; }
    if (h1) { result.push(`<h1 id="${slugify(h1[1])}">${applyInline(h1[1])}</h1>`); i++; continue; }

    // Unordered list
    if (line.match(/^[-*]\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
        listItems.push(`<li>${applyInline(lines[i].replace(/^[-*]\s+/, ''))}</li>`);
        i++;
      }
      result.push(`<ul>${listItems.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        listItems.push(`<li>${applyInline(lines[i].replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      result.push(`<ol>${listItems.join('')}</ol>`);
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      result.push('<hr style="border:none;border-top:1px solid #f0f0f0;margin:2rem 0;" />');
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    result.push(`<p>${applyInline(line)}</p>`);
    i++;
  }

  return result.join('\n');
}

function applyInline(text: string): string {
  return text
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export function DocContent({ page, headings }: Props) {
  const html = renderContent(page.content);

  return (
    <article>
      {/* Page header */}
      <header style={{ marginBottom: '2.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          {page.badge && (
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.03em',
                padding: '0.2rem 0.6rem',
                borderRadius: 99,
                border: '1px solid',
                ...badgeStyles[page.badge],
              }}
            >
              {badgeLabels[page.badge]}
            </span>
          )}
        </div>

        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 750,
            letterSpacing: '-0.03em',
            color: '#0a0a0a',
            lineHeight: 1.15,
            margin: 0,
            marginBottom: page.description ? '0.6rem' : 0,
          }}
        >
          {page.title}
        </h1>

        {page.description && (
          <p
            style={{
              fontSize: '1rem',
              color: '#6b7280',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '60ch',
            }}
          >
            {page.description}
          </p>
        )}
      </header>

      {/* Doc body */}
      <div
        className="doc-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Footer */}
      <footer
        style={{
          marginTop: '4rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span style={{ fontSize: '0.8rem', color: '#aaa' }}>
          Last updated: January 2025
        </span>
        {/* <a
          href="#"
          style={{
            fontSize: '0.8rem',
            color: '#666',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
          Edit this page
        </a> */}
      </footer>
    </article>
  );
}
