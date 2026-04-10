import { pipeline } from "@xenova/transformers";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

async function search(query: string) {
  const embedder = await pipeline(
    "feature-extraction",
    "Xenova/all-MiniLM-L6-v2"
  );

  const output = await embedder(query, {
    pooling: "mean",
    normalize: true,
  });

  const embedding = Array.from(output.data);

  const { data } = await supabase.rpc("hybrid_search", {
    query_text: query,
    query_embedding: embedding,
  });

  return data;
}