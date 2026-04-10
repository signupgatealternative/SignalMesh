// import "dotenv/config";
// import { pipeline } from "@xenova/transformers";
// import { createClient } from "@supabase/supabase-js";
// import ollama from "ollama";

// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_KEY!
// );

// async function answer(query: string) {
//   // 1. Embed query
//   const embedder = await pipeline(
//     "feature-extraction",
//     "Xenova/all-MiniLM-L6-v2"
//   );

//   const output = await embedder(query, {
//     pooling: "mean",
//     normalize: true,
//   });

//   const embedding = Array.from(output.data);

//   // 2. Hybrid search
//   const { data } = await supabase.rpc("hybrid_search", {
//     query_text: query,
//     query_embedding: embedding,
//   });

//   const context = data?.map((d: any) => d.content).join("\n\n");

//   // 3. Generate answer (Ollama)
//   const response = await ollama.chat({
//     model: "mistral",
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a helpful API assistant. Answer clearly using the provided context.",
//       },
//       {
//         role: "user",
//         content: `Context:\n${context}\n\nQuestion: ${query}`,
//       },
//     ],
//   });

//   console.log("\n🧠 FINAL ANSWER:\n");
//   console.log(response.message.content);
// }

// answer("How does risk scoring work?");



import "dotenv/config";
import { pipeline } from "@xenova/transformers";
import { createClient } from "@supabase/supabase-js";
import ollama from "ollama";

// 🔌 Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// 🧠 Load embedder once (IMPORTANT for performance)
let embedder: any;

async function getEmbedder() {
  if (!embedder) {
    console.log("⚡ Loading embedding model...");
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }
  return embedder;
}

// 🔍 Embed query
async function embedQuery(query: string) {
  const model = await getEmbedder();

  const output = await model(query, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}

// 📚 Hybrid search (Supabase RPC)
async function searchDocs(query: string) {
  const embedding = await embedQuery(query);

  const { data, error } = await supabase.rpc("hybrid_search", {
    query_text: query,
    query_embedding: embedding,
  });

  if (error) {
    console.error("❌ Supabase error:", error);
    return [];
  }

  return data || [];
}



// 🧹 Clean + rank results
function prepareContext(results: any[]) {
  if (!results || results.length === 0) return "";

  const seen = new Set();

  const unique = results.filter((r) => {
    if (seen.has(r.title)) return false;
    seen.add(r.title);
    return true;
  });

  // ✅ try filtering
  let filtered = unique.filter((r) => r.score > 0.25);

  // 🔥 fallback (VERY IMPORTANT)
  if (filtered.length === 0) {
    console.log("⚠️ No high-score results, using fallback...");
    filtered = unique.slice(0, 5);
  }

  const top = filtered.slice(0, 3);

  return top
    .map(
      (d, i) => `
Source ${i + 1}:
Title: ${d.title}
Score: ${d.score}

${d.content.slice(0, 500)}
`
    )
    .join("\n-----------------\n");
}

// 🤖 Generate answer using Ollama
async function generateAnswer(query: string, context: string) {
  const response = await ollama.chat({
    model: "mistral",
    messages: [
      {
        role: "system",
        content: `
You are an expert API assistant.

Strict Rules:
- Answer ONLY from the context
- Do NOT guess or hallucinate
- Be clear and structured
- If multiple reasons exist, list them as bullet points
- If code exists, explain it simply
- If answer not found, say "Not found in docs"
        `,
      },
      {
        role: "user",
        content: `
Context:
${context}

Question: ${query}

Extract ALL relevant reasons and explain clearly.
Use bullet points where possible.
        `,
      },
    ],
  });

  return response.message.content;
}

// 🎯 Main function
async function answer(query: string) {
  console.log(`\n🔍 QUERY: ${query}`);
  console.log("-----------------------------------");

  // 1. Retrieve
  const results = await searchDocs(query);

  if (!results.length) {
    console.log("❌ No results found");
    return;
  }


  console.log("\n🔎 RAW RESULTS:\n");
results.forEach((r: any, i: number) => {
  console.log(`#${i + 1}`, r.title, r.score);
});

  // 2. Prepare context
  const context = prepareContext(results);

  console.log("\n📚 CONTEXT USED:\n");
  console.log(context);

  // 3. Generate answer
  const finalAnswer = await generateAnswer(query, context);

  console.log("\n🧠 FINAL ANSWER:\n");
  console.log(finalAnswer);

  // 4. Show sources
  console.log("\n📌 SOURCES:\n");
  results.slice(0, 3).forEach((r: any, i: number) => {
    console.log(`#${i + 1}: ${r.url}`);
  });
}

// 🧪 Run test
answer("Why signup gets blocked?");