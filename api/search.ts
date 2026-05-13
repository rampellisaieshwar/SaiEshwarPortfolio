import { Groq } from 'groq-sdk';
import { pipeline, env } from '@xenova/transformers';
import path from 'path';
import fs from 'fs';

// Configuration for @xenova/transformers in a serverless environment
env.allowLocalModels = false;
env.useBrowserCache = false;

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

// We load the vector store
const vectorStorePath = path.join(process.cwd(), 'src/data/vector_store.json');
let vectorStore: any[] | null = null;
try {
  if (fs.existsSync(vectorStorePath)) {
    vectorStore = JSON.parse(fs.readFileSync(vectorStorePath, 'utf8'));
  }
} catch (e) {
  console.error("Failed to load vector store", e);
}

// Global variable to hold the extractor to reuse across requests
let extractor: any = null;

// Cosine similarity utility
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error('MISSING_API_KEY: GROQ_API_KEY is not defined.');
    return res.status(500).json({
      error: 'AI System Offline',
      details: 'GROQ_API_KEY is missing from server environment.'
    });
  }

  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    // 1. Initialize extractor if not already
    if (!extractor) {
      console.log('Loading embedding model...');
      extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    }

    // 2. Generate embedding for query
    const output = await extractor(query, { pooling: 'mean', normalize: true });
    const queryEmbedding = Array.from(output.data) as number[];

    // 3. Find top 3 chunks
    if (!vectorStore) {
      throw new Error("Vector store not initialized or missing.");
    }

    const scoredChunks = vectorStore.map(chunk => ({
      ...chunk,
      score: cosineSimilarity(queryEmbedding, chunk.embedding)
    }));

    // Sort descending by score
    scoredChunks.sort((a, b) => b.score - a.score);
    const topChunks = scoredChunks.slice(0, 5);
    
    const contextContent = topChunks.map(c => c.content).join('\n\n---\n\n');

    console.log(`Top chunks retrieved for query "${query}":`, topChunks.map(c => c.id));

    // 4. Send to LLM
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are the AI version of Rampelli Sai Eshwar's portfolio. 
          Your goal is to answer questions about Sai Eshwar's professional experience, projects, and skills.
          
          USE ONLY THE FOLLOWING RETRIEVED CONTEXT:
          ${contextContent}
          
          RULES:
          1. The retrieved context contains his most up-to-date and current information. Treat all 'Under Progress' projects or recent experiences as what he is currently doing.
          2. Only answer based on the provided context. If the answer is not in the context, politely say you don't have information on that topic.
          3. Speak in a natural, conversational, one-on-one tone, as if you are chatting directly with the visitor.
          4. DO NOT use markdown headers (like ###) or bullet points. Write your answers as neat, flowing sentences.`
        },
        {
          role: 'user',
          content: query
        }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.2,
      max_tokens: 500,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";
    return res.status(200).json({ response: responseText });
  } catch (error: any) {
    console.error('API Error Details:', error);
    return res.status(500).json({
      error: 'Failed to process search query',
      details: error.message
    });
  }
}
