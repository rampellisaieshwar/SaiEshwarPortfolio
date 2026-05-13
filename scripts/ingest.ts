import fs from 'fs';
import path from 'path';
import { pipeline, env } from '@xenova/transformers';

// Disable local models to fetch from HF hub directly
env.allowLocalModels = false;
env.useBrowserCache = false;

const CONTEXT_PATH = path.join(process.cwd(), 'src/data/professional_context.json');
const OUTPUT_PATH = path.join(process.cwd(), 'src/data/vector_store.json');

interface Chunk {
  id: string;
  type: string;
  content: string;
  metadata?: any;
}

interface VectorItem extends Chunk {
  embedding: number[];
}

async function ingest() {
  console.log('Loading professional context...');
  const data = JSON.parse(fs.readFileSync(CONTEXT_PATH, 'utf-8'));

  const chunks: Chunk[] = [];

  // Profile Chunk
  chunks.push({
    id: 'profile',
    type: 'profile',
    content: `Profile Name: ${data.profile.name}\nRole: ${data.profile.role}\nLocation: ${data.profile.location}\nSummary: ${data.profile.summary}`,
  });

  // Experience Chunks
  data.experience.forEach((exp: any, i: number) => {
    chunks.push({
      id: `experience_${i}`,
      type: 'experience',
      content: `Experience at ${exp.company}\nRole: ${exp.role}\nDuration: ${exp.duration}\nWork done:\n${exp.work.join('\n')}`,
    });
  });

  // Education Chunks
  data.education.forEach((edu: any, i: number) => {
    chunks.push({
      id: `education_${i}`,
      type: 'education',
      content: `Education: ${edu.degree} at ${edu.institution} (${edu.duration})\nDetails:\n${edu.details.join('\n')}`,
    });
  });

  // Skills Chunk
  chunks.push({
    id: 'skills',
    type: 'skills',
    content: `Technical Skills:\nAI/ML: ${data.skills.technical.ai_ml.join(', ')}\nComputer Vision: ${data.skills.technical.computer_vision.join(', ')}\nTools: ${data.skills.technical.frameworks_tools.join(', ')}\nProgramming: ${data.skills.technical.programming.join(', ')}`,
  });

  // Projects Chunks
  data.projects.forEach((proj: any, i: number) => {
    chunks.push({
      id: `project_${proj.title.replace(/\s+/g, '_').toLowerCase()}`,
      type: 'project',
      content: `Project: ${proj.title} (${proj.status})\nType: ${proj.type}\nProblem: ${proj.problem_statement}\nSolution: ${proj.solution}\nTechnologies: ${proj.tech.join(', ')}`,
      metadata: { title: proj.title }
    });
  });

  console.log(`Created ${chunks.length} chunks. Loading embedding model...`);

  // Load embedding model
  const extractor = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');

  const vectorStore: VectorItem[] = [];

  for (const chunk of chunks) {
    console.log(`Embedding chunk: ${chunk.id}`);
    const output = await extractor(chunk.content, { pooling: 'mean', normalize: true });
    
    // Extractor output is a Tensor. We convert it to a regular JS array.
    const embedding = Array.from(output.data) as number[];
    
    vectorStore.push({
      ...chunk,
      embedding
    });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(vectorStore, null, 2));
  console.log(`Successfully wrote embeddings to ${OUTPUT_PATH}`);
}

ingest().catch(console.error);
