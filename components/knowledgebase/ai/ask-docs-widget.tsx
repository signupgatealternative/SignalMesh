// 'use client';

// import { useEffect, useState, useRef } from 'react';

// export function AskDocsWidget() {
//   const [open, setOpen] = useState(false);
//   const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
//   const [loading, setLoading] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // ⌘K / Ctrl+K shortcut
//   useEffect(() => {
//     const handler = (e: KeyboardEvent) => {
//       if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
//         e.preventDefault();
//         setOpen((v) => !v);
//       }
//       if (e.key === 'Escape') setOpen(false);
//     };
//     window.addEventListener('keydown', handler);
//     return () => window.removeEventListener('keydown', handler);
//   }, []);

//   // Auto-focus input when opened
//   useEffect(() => {
//     if (open) {
//       setTimeout(() => inputRef.current?.focus(), 120);
//     }
//   }, [open]);

//   // Scroll to latest message
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   const handleSend = async (value: string) => {
//     if (!value.trim()) return;
//     setMessages((prev) => [...prev, { role: 'user', text: value }]);
//     setLoading(true);

//     try {
//       const res = await fetch('https://api.anthropic.com/v1/messages', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           model: 'claude-sonnet-4-20250514',
//           max_tokens: 1000,
//           system:
//             'You are a helpful documentation assistant for SignalMesh, a developer product. Answer questions about the docs clearly and concisely. Keep replies short and scannable.',
//           messages: [{ role: 'user', content: value }],
//         }),
//       });
//       const data = await res.json();
//       const reply =
//         data?.content?.map((b: { type: string; text?: string }) => b.text ?? '').join('') ||
//         'Sorry, I could not get a response.';
//       setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
//     } catch {
//       setMessages((prev) => [...prev, { role: 'ai', text: 'Something went wrong. Please try again.' }]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Scoped styles for responsive behaviour */}
//       <style>{`
//         .ask-ai-panel {
//           width: 380px;
//           height: 520px;
//           bottom: 24px;
//           right: 24px;
//           border-radius: 16px;
//         }
//         @media (max-width: 480px) {
//           .ask-ai-panel {
//             width: 100vw !important;
//             height: 85dvh !important;
//             bottom: 0 !important;
//             right: 0 !important;
//             left: 0 !important;
//             border-radius: 18px 18px 0 0 !important;
//           }
//         }
//         .ask-ai-fab {
//           display: flex;
//         }
//       `}</style>

//       {/* Backdrop (click outside to close) */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           aria-hidden="true"
//           style={{
//             position: 'fixed',
//             inset: 0,
//             zIndex: 999,
//           }}
//         />
//       )}

//       {/* ── FAB button — only when closed ── */}
//       {!open && (
//         <button
//           className="ask-ai-fab"
//           onClick={() => setOpen(true)}
//           aria-label="Ask AI"
//           style={{
//             position: 'fixed',
//             bottom: '1.5rem',
//             right: '1.5rem',
//             alignItems: 'center',
//             gap: '8px',
//             padding: '10px 16px',
//             background: 'rgba(15,15,15,0.92)',
//             color: '#fff',
//             borderRadius: '999px',
//             border: '1px solid rgba(255,255,255,0.08)',
//             backdropFilter: 'blur(10px)',
//             cursor: 'pointer',
//             boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
//             zIndex: 1000,
//             fontFamily: 'inherit',
//             transition: 'transform 0.15s, box-shadow 0.15s',
//             whiteSpace: 'nowrap',
//           }}
//           onMouseEnter={(e) => {
//             (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
//             (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 28px rgba(0,0,0,0.35)';
//           }}
//           onMouseLeave={(e) => {
//             (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
//             (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
//           }}
//         >
//           {/* Pulsing dot */}
//           <span style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
//             <span style={{
//               width: 8, height: 8, borderRadius: '50%', background: '#00c48a',
//               display: 'inline-block', marginRight: 6,
//             }} />
//           </span>
//           <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Ask AI</span>
//           <span
//             style={{
//               fontSize: '0.7rem',
//               color: 'rgba(255,255,255,0.5)',
//               background: 'rgba(255,255,255,0.08)',
//               padding: '2px 7px',
//               borderRadius: '6px',
//               letterSpacing: '0.02em',
//             }}
//           >
//             ⌘K
//           </span>
//         </button>
//       )}

//       {/* ── Chat panel ── */}
//       {open && (
//         <div
//           className="ask-ai-panel"
//           style={{
//             position: 'fixed',
//             zIndex: 1000,
//             background: '#fff',
//             border: '1px solid #e8e8e8',
//             display: 'flex',
//             flexDirection: 'column',
//             boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
//             overflow: 'hidden',
//             animation: 'askPanelIn 0.2s cubic-bezier(0.34,1.26,0.64,1) both',
//           }}
//         >
//           <style>{`
//             @keyframes askPanelIn {
//               from { opacity: 0; transform: scale(0.96) translateY(8px); }
//               to   { opacity: 1; transform: scale(1)    translateY(0); }
//             }
//           `}</style>

//           {/* Header */}
//           <div
//             style={{
//               padding: '13px 16px',
//               borderBottom: '1px solid #f0f0f0',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               background: '#fafafa',
//               flexShrink: 0,
//             }}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//               <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00c48a', display: 'inline-block' }} />
//               <span style={{ fontWeight: 650, fontSize: '0.9rem', color: '#111' }}>Ask SignalMesh AI</span>
//             </div>
//             <button
//               onClick={() => setOpen(false)}
//               aria-label="Close"
//               style={{
//                 border: 'none',
//                 background: 'none',
//                 cursor: 'pointer',
//                 color: '#999',
//                 display: 'flex',
//                 alignItems: 'center',
//                 padding: '4px',
//                 borderRadius: 6,
//                 transition: 'background 0.12s',
//               }}
//               onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0f0f0'; }}
//               onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
//             >
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//                 <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
//               </svg>
//             </button>
//           </div>

//           {/* Messages */}
//           <div
//             style={{
//               flex: 1,
//               padding: '16px',
//               overflowY: 'auto',
//               display: 'flex',
//               flexDirection: 'column',
//               gap: '12px',
//             }}
//           >
//             {messages.length === 0 && (
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   height: '100%',
//                   gap: 10,
//                   color: '#bbb',
//                   textAlign: 'center',
//                   fontSize: '0.85rem',
//                 }}
//               >
//                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5">
//                   <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
//                 </svg>
//                 <span>Ask me anything about the docs</span>
//               </div>
//             )}

//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 style={{
//                   alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
//                   maxWidth: '88%',
//                   padding: '9px 13px',
//                   borderRadius: msg.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
//                   background: msg.role === 'user' ? '#0066ff' : '#f4f4f5',
//                   color: msg.role === 'user' ? '#fff' : '#1a1a1a',
//                   fontSize: '0.84rem',
//                   lineHeight: 1.55,
//                   whiteSpace: 'pre-wrap',
//                   wordBreak: 'break-word',
//                 }}
//               >
//                 {msg.text}
//               </div>
//             ))}

//             {loading && (
//               <div style={{ alignSelf: 'flex-start', padding: '9px 14px', background: '#f4f4f5', borderRadius: '14px 14px 14px 4px' }}>
//                 <span style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
//                   {[0, 1, 2].map((i) => (
//                     <span
//                       key={i}
//                       style={{
//                         width: 6, height: 6, borderRadius: '50%', background: '#bbb',
//                         animation: `dotBounce 1s ${i * 0.18}s infinite ease-in-out`,
//                         display: 'inline-block',
//                       }}
//                     />
//                   ))}
//                 </span>
//                 <style>{`
//                   @keyframes dotBounce {
//                     0%,80%,100% { transform: translateY(0); opacity: 0.4; }
//                     40% { transform: translateY(-5px); opacity: 1; }
//                   }
//                 `}</style>
//               </div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div
//             style={{
//               borderTop: '1px solid #f0f0f0',
//               padding: '10px',
//               display: 'flex',
//               gap: '8px',
//               flexShrink: 0,
//               background: '#fafafa',
//             }}
//           >
//             <input
//               ref={inputRef}
//               placeholder="Ask a question about the docs…"
//               disabled={loading}
//               style={{
//                 flex: 1,
//                 border: '1px solid #e8e8e8',
//                 outline: 'none',
//                 padding: '9px 12px',
//                 borderRadius: '8px',
//                 background: '#fff',
//                 fontSize: '0.84rem',
//                 fontFamily: 'inherit',
//                 color: '#111',
//                 transition: 'border-color 0.15s',
//                 minWidth: 0,
//               }}
//               onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#0066ff'; }}
//               onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e8e8e8'; }}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' && !e.shiftKey) {
//                   e.preventDefault();
//                   const val = (e.target as HTMLInputElement).value.trim();
//                   if (!val || loading) return;
//                   (e.target as HTMLInputElement).value = '';
//                   handleSend(val);
//                 }
//               }}
//             />
//             <button
//               onClick={() => {
//                 const val = inputRef.current?.value.trim() ?? '';
//                 if (!val || loading) return;
//                 if (inputRef.current) inputRef.current.value = '';
//                 handleSend(val);
//               }}
//               disabled={loading}
//               style={{
//                 background: '#0066ff',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '8px',
//                 padding: '0 14px',
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 opacity: loading ? 0.5 : 1,
//                 fontSize: '1rem',
//                 flexShrink: 0,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 transition: 'opacity 0.15s',
//               }}
//               aria-label="Send"
//             >
//               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="12" y1="19" x2="12" y2="5" />
//                 <polyline points="5 12 12 5 19 12" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }


'use client';

import { useEffect, useRef, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────
interface Source {
  title: string;
  url: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Source[];
  loading?: boolean;
}

// ── Main widget ───────────────────────────────────────────────────────────────
export function AskDocsWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ⌘K / Ctrl+K toggle, Escape to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Auto-focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 120);
  }, [open]);

  // Scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ── Send + SSE stream ────────────────────────────────────────────────────────
  async function sendMessage(query: string) {
    if (!query.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: query };
    const loadingMsg: Message = { role: 'assistant', content: '', loading: true };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput('');
    setIsLoading(true);

    // Full history for multi-turn context (exclude the loading placeholder)
    const history = [...messages, userMsg].map(({ role, content }) => ({ role, content }));

    try {
      const res = await fetch('/api/ask-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, history }),
      });

      if (!res.ok || !res.body) throw new Error('API error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = '';
      let sources: Source[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const json = line.slice(6).trim();
          if (!json) continue;

          try {
            const event = JSON.parse(json);
            if (event.type === 'sources') {
              sources = event.sources;
            } else if (event.type === 'delta' || event.type === 'done') {
              if (event.type === 'delta') answer += event.text;
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: 'assistant',
                  content: answer,
                  sources,
                  loading: false,
                };
                return updated;
              });
            }
          } catch {
            // skip malformed SSE lines
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
          loading: false,
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Responsive styles (panel shape + mobile full-sheet) ── */}
      <style>{`
        .ask-ai-panel {
          width: 400px;
          height: 560px;
          bottom: 24px;
          right: 24px;
          border-radius: 16px;
        }
        @media (max-width: 480px) {
          .ask-ai-panel {
            width: 100vw !important;
            height: 85dvh !important;
            bottom: 0 !important;
            right: 0 !important;
            left: 0 !important;
            border-radius: 18px 18px 0 0 !important;
          }
        }
        @keyframes askPanelIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* Backdrop — click outside to close */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(2px)',
            zIndex: 999,
          }}
        />
      )}

      {/* ── FAB trigger button — only shown when panel is closed ── */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Ask AI"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 16px',
            background: 'rgba(15,15,15,0.92)',
            color: '#fff',
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            boxShadow: '0 6px 24px rgba(0,0,0,0.3)',
            fontSize: '0.85rem',
            fontWeight: 500,
            fontFamily: 'inherit',
            zIndex: 1000,
            whiteSpace: 'nowrap',
            transition: 'transform 0.15s, box-shadow 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 10px 32px rgba(0,0,0,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.3)';
          }}
        >
          {/* Live indicator dot */}
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00c48a', display: 'inline-block', flexShrink: 0 }} />
          <span>Ask AI</span>
          <span
            style={{
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.5)',
              background: 'rgba(255,255,255,0.08)',
              padding: '2px 6px',
              borderRadius: 6,
            }}
          >
            ⌘K
          </span>
        </button>
      )}

      {/* ── Chat panel ── */}
      {open && (
        <div
          className="ask-ai-panel"
          style={{
            position: 'fixed',
            zIndex: 1000,
            background: '#fff',
            border: '1px solid #e8e8e8',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
            overflow: 'hidden',
            animation: 'askPanelIn 0.2s cubic-bezier(0.34,1.26,0.64,1) both',
          }}
        >
          {/* ── Header ── */}
          <div
            style={{
              padding: '13px 16px',
              borderBottom: '1px solid #f0f0f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#fafafa',
              flexShrink: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🛡️</span>
              <span style={{ fontWeight: 650, fontSize: '0.9rem', color: '#111' }}>
                Ask SignalMesh AI
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {messages.length > 0 && (
                <button
                  onClick={() => setMessages([])}
                  title="Clear conversation"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    color: '#888',
                    padding: '2px 8px',
                    borderRadius: 6,
                    fontFamily: 'inherit',
                    transition: 'background 0.12s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0f0f0'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  color: '#999',
                  display: 'flex',
                  alignItems: 'center',
                  padding: 4,
                  borderRadius: 6,
                  transition: 'background 0.12s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#f0f0f0'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'none'; }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* ── Messages ── */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {messages.length === 0 && (
              <EmptyState onSuggestion={sendMessage} />
            )}

            {messages.map((msg, i) => (
              <MessageBubble key={i} msg={msg} />
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* ── Input bar ── */}
          <div
            style={{
              borderTop: '1px solid #f0f0f0',
              padding: '10px',
              display: 'flex',
              gap: 8,
              flexShrink: 0,
              background: '#fafafa',
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask a question about the docs…"
              disabled={isLoading}
              style={{
                flex: 1,
                border: '1px solid #e8e8e8',
                outline: 'none',
                padding: '9px 12px',
                borderRadius: 8,
                background: '#fff',
                fontSize: '0.84rem',
                fontFamily: 'inherit',
                color: '#111',
                opacity: isLoading ? 0.6 : 1,
                minWidth: 0,
                transition: 'border-color 0.15s',
              }}
              onFocus={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#0066ff'; }}
              onBlur={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#e8e8e8'; }}
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
              aria-label="Send"
              style={{
                background: isLoading || !input.trim() ? '#e8e8e8' : '#0066ff',
                color: isLoading || !input.trim() ? '#aaa' : '#fff',
                border: 'none',
                borderRadius: 8,
                width: 38,
                height: 38,
                flexShrink: 0,
                cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {isLoading ? <Spinner /> : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="5 12 12 5 19 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      <div
        style={{
          maxWidth: '88%',
          padding: '9px 13px',
          borderRadius: isUser ? '12px 12px 4px 12px' : '12px 12px 12px 4px',
          background: isUser ? '#0066ff' : '#f4f4f5',
          color: isUser ? '#fff' : '#1a1a1a',
          fontSize: '0.84rem',
          lineHeight: 1.55,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {msg.loading ? <TypingIndicator /> : msg.content}
      </div>

      {/* Source chips */}
      {!isUser && !msg.loading && msg.sources && msg.sources.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: '88%' }}>
          {msg.sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              style={{
                fontSize: '0.71rem',
                color: '#666',
                background: '#f4f4f5',
                padding: '2px 8px',
                borderRadius: 5,
                textDecoration: 'none',
                border: '1px solid #e8e8e8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 190,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
              title={s.title}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {s.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onSuggestion }: { onSuggestion: (q: string) => void }) {
  const suggestions = [
    'How does risk scoring work?',
    'Why does signup get blocked?',
    'How do I detect bots?',
    'How do I reduce false positives?',
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* Icon + greeting */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '1.5rem 0 0.5rem' }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.5">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
        <p style={{ fontSize: '0.84rem', color: '#888', margin: 0, textAlign: 'center' }}>
          Ask me anything about SignalMesh docs.
        </p>
      </div>

      {/* Suggestion chips */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            style={{
              textAlign: 'left',
              background: '#f9f9f9',
              border: '1px solid #f0f0f0',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: '0.81rem',
              cursor: 'pointer',
              color: '#555',
              fontFamily: 'inherit',
              transition: 'background 0.12s, border-color 0.12s',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#f0f5ff';
              (e.currentTarget as HTMLElement).style.borderColor = '#ccd9ff';
              (e.currentTarget as HTMLElement).style.color = '#0055dd';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = '#f9f9f9';
              (e.currentTarget as HTMLElement).style.borderColor = '#f0f0f0';
              (e.currentTarget as HTMLElement).style.color = '#555';
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ flexShrink: 0, opacity: 0.4 }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '2px 0' }}>
      {[0, 0.15, 0.3].map((delay, i) => (
        <span
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#aaa',
            display: 'inline-block',
            animation: `pulse 1s ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Spinner() {
  return (
    <span
      style={{
        width: 14,
        height: 14,
        border: '2px solid rgba(255,255,255,0.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        display: 'inline-block',
        animation: 'spin 0.7s linear infinite',
      }}
    />
  );
}