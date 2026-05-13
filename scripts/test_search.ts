import { pipeline, env } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';

env.allowLocalModels = false;
env.useBrowserCache = false;

function cosineSimilarity(a: number[], b: number[]) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function test() {
  const vectorStorePath = path.join(process.cwd(), 'src/data/vector_store.json');
  const vectorStore = JSON.parse(fs.readFileSync(vectorStorePath, 'utf8'));

  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  const query = "what he is doing now";
  const output = await extractor(query, { pooling: 'mean', normalize: true });
  const queryEmbedding = Array.from(output.data) as number[];

  const scoredChunks = vectorStore.map((chunk: any) => ({
    id: chunk.id,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
    content: chunk.content
  }));

  scoredChunks.sort((a: any, b: any) => b.score - a.score);
  
  console.log("TOP 5 CHUNKS FOR QUERY: " + query);
  scoredChunks.slice(0, 5).forEach((c: any) => {
    console.log(`- ${c.id} (Score: ${c.score.toFixed(3)})`);
  });
}

test().catch(console.error);
