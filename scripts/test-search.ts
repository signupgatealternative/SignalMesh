// // scripts/test-search.ts

// import 'dotenv/config';
// import { pipeline } from '@xenova/transformers';
// import { createClient } from '@supabase/supabase-js';

// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_KEY!
// );

// let embedder: any;

// async function getEmbedder() {
//   if (!embedder) {
//     embedder = await pipeline(
//       'feature-extraction',
//       'Xenova/all-MiniLM-L6-v2'
//     );
//   }
//   return embedder;
// }

// async function search(query: string) {
//   const model = await getEmbedder();

//   const output = await model(query, {
//     pooling: 'mean',
//     normalize: true,
//   });

//   const embedding = Array.from(output.data);

//   const { data } = await supabase.rpc('match_docs', {
//     query_embedding: embedding,
//     match_count: 5,
//   });

//   console.log('\n🔍 QUERY:', query);
//   console.log('-----------------------------------');

//   data?.forEach((d: any, i: number) => {
//     console.log(`\n#${i + 1} (${d.similarity.toFixed(3)})`);
//     console.log(d.title, '-', d.url);
//     console.log(d.content.slice(0, 200), '...');
//   });
// }

// async function run() {
//   await search("How does risk scoring work?");
//   await search("How to detect bots?");
//   await search("SDK integration steps");
//   await search("Why signup gets blocked?");
// }

// run();

import "dotenv/config";
import { pipeline } from "@xenova/transformers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

async function search(query: string) {
  console.log(`\n🔍 QUERY: ${query}`);
  console.log("-----------------------------------");

  // ✅ Create embedding for query
  const embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const output = await embedder(query, {
    pooling: "mean",
    normalize: true,
  });

  const embedding = Array.from(output.data);

  // ✅ Run hybrid query
  const { data, error } = await supabase.rpc("hybrid_search", {
    query_text: query,
  query_embedding: embedding,
  match_count: 5,
   
  });

  if (error) {
    console.error("❌ Error:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log("⚠️ No results found");
    return;
  }

  data.forEach((item: any, i: number) => {
    console.log(`\n#${i + 1}`);
    console.log(item.title);
    console.log(item.content.slice(0, 200), "...");
  });
}

async function run() {
  await search("How does risk scoring work?");
//   await search("How to detect bots?");
//   await search("SDK integration steps");
//   await search("Why signup gets blocked?");
}

run();