// app/api/ask-docs/route.ts
import { NextRequest } from "next/server";
import { pipeline } from "@xenova/transformers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Ollama runs locally (or on your server) — no API key needed
const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "mistral";

// ── Embedder cache ────────────────────────────────────────────────────────────
let embedder: any;
async function getEmbedder() {
  if (!embedder) {
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  }
  return embedder;
}

// ── Step 1: Embed the query ───────────────────────────────────────────────────
async function embedQuery(query: string): Promise<number[]> {
  const model = await getEmbedder();
  const output = await model(query, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

// ── Step 2: Hybrid search in Supabase ────────────────────────────────────────
async function searchDocs(query: string, embedding: number[]) {
  const { data, error } = await supabase.rpc("hybrid_search", {
    query_text: query,
    query_embedding: embedding,
    match_count: 5,
  });
  if (error) throw new Error(`Supabase search failed: ${error.message}`);
  return data || [];
}

// ── Step 3: Build context from results ───────────────────────────────────────
function buildContext(results: any[]): string {
  if (!results.length) return "";

  const seen = new Set<string>();
  let filtered = results
    .filter((r) => {
      if (seen.has(r.title)) return false;
      seen.add(r.title);
      return true;
    })
    .filter((r) => r.score > 0.2);

  // Fallback if nothing passes score threshold
  if (!filtered.length) filtered = results.slice(0, 3);

  return filtered
    .slice(0, 4)
    .map(
      (r, i) =>
        `--- Source ${i + 1}: ${r.title} (${r.url}) ---\n${r.content.slice(0, 600)}`
    )
    .join("\n\n");
}

// ── Step 4: Stream from Ollama ────────────────────────────────────────────────
async function* streamOllama(
  query: string,
  context: string,
  history: { role: string; content: string }[]
) {
  const systemPrompt = `You are a helpful assistant for SignalMesh documentation.
Rules:
- Answer ONLY using the provided context. Do not guess or make up information.
- Be concise and clear. Use bullet points when listing multiple reasons.
- Include code snippets if they are relevant to the answer.
- If the answer is not in the context, say: "I couldn't find that in the docs."
- Do not mention "context" or "sources" — just answer naturally.`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-6), // last 3 conversation turns
    {
      role: "user",
      content: `Context from SignalMesh docs:\n\n${context}\n\n---\nQuestion: ${query}`,
    },
  ];

  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: OLLAMA_MODEL,
      messages,
      stream: true,
    }),
  });

  if (!res.ok || !res.body) {
    throw new Error(`Ollama returned ${res.status} — is it running? Try: ollama serve`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    // Ollama streams newline-delimited JSON
    const lines = decoder.decode(value).split("\n").filter(Boolean);

    for (const line of lines) {
      try {
        const json = JSON.parse(line);
        const text = json.message?.content;
        if (text) yield text;
        if (json.done) return;
      } catch {
        // skip malformed lines
      }
    }
  }
}

// ── POST /api/ask-docs ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const { query, history = [] } = await req.json();

  if (!query?.trim()) {
    return new Response(JSON.stringify({ error: "Query is required" }), {
      status: 400,
    });
  }

  const encoder = new TextEncoder();

  function sse(payload: object) {
    return encoder.encode(`data: ${JSON.stringify(payload)}\n\n`);
  }

  try {
    // 1. Embed
    const embedding = await embedQuery(query);

    // 2. Search
    const results = await searchDocs(query, embedding);

    // 3. Build context + sources
    const context = buildContext(results);
    const sources = results
      .slice(0, 3)
      .map((r: any) => ({ title: r.title, url: r.url }));

    // 4. Stream SSE
    const readable = new ReadableStream({
      async start(ctrl) {
        // Always send sources first
        ctrl.enqueue(sse({ type: "sources", sources }));

        if (!results.length || !context) {
          ctrl.enqueue(
            sse({
              type: "delta",
              text: "I couldn't find anything relevant in the docs for that question.",
            })
          );
          ctrl.enqueue(sse({ type: "done" }));
          ctrl.close();
          return;
        }

        try {
          for await (const text of streamOllama(query, context, history)) {
            ctrl.enqueue(sse({ type: "delta", text }));
          }
        } catch (err: any) {
          ctrl.enqueue(
            sse({
              type: "delta",
              text: `\n\n⚠️ ${err.message}`,
            })
          );
        }

        ctrl.enqueue(sse({ type: "done" }));
        ctrl.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("ask-docs error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Something went wrong" }),
      { status: 500 }
    );
  }
}