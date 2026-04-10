// // scripts/embed.ts
// import 'dotenv/config';

// import { pipeline } from '@xenova/transformers';
// import { createClient } from '@supabase/supabase-js';
// import { chunkDocs } from './chunk';

// const supabase = createClient(
//   process.env.SUPABASE_URL!,
//   process.env.SUPABASE_KEY!
// );

// async function run() {
//   const embedder = await pipeline(
//     'feature-extraction',
//     'Xenova/all-MiniLM-L6-v2'
//   );

//   const chunks = chunkDocs();

//   for (const chunk of chunks) {
//     const output = await embedder(chunk.content, {
//       pooling: 'mean',
//       normalize: true,
//     });

//     const embedding = Array.from(output.data);

//     await supabase.from('docs').insert({
//       ...chunk,
//       embedding,
//     });
//   }

//   console.log('✅ Done embedding');
// }

// run();

// scripts/embed.ts
import "dotenv/config";
import { pipeline } from "@xenova/transformers";
import { createClient } from "@supabase/supabase-js";
import { chunkDocs } from "./chunk";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

async function run() {
  console.log("🚀 Loading model...");
  const embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const chunks = chunkDocs();
  console.log(`📦 Total chunks: ${chunks.length}`);

  let success = 0;

  for (const [i, chunk] of chunks.entries()) {
    try {
      const output = await embedder(chunk.content, {
        pooling: "mean",
        normalize: true,
      });

      const embedding = Array.from(output.data);

      await supabase.from("docs").insert({
        title: chunk.title,
        content: chunk.content,
        url: chunk.url,
        section: chunk.section,
        tags: chunk.tags,
        embedding,
        
        });

      success++;

      if (i % 20 === 0) {
        console.log(`✅ Inserted ${i}/${chunks.length}`);
      }
    } catch (err) {
      console.error("❌ Error:", err);
    }
  }

  console.log(`🎉 Done. Inserted ${success} chunks`);
}

run();