import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || '',
});

const professionalContext = {
  "profile": {
    "name": "Rampelli Sai Eshwar",
    "role": "AI Systems Engineer (LLMs, Computer Vision, Distributed Systems)",
    "location": "Hyderabad, India",
    "tagline": "Designs autonomous AI systems using multi-agent orchestration, real-time pipelines, and scalable backend architectures.",
    "availability": "Available for AI Engineering Roles",
    "summary": "AI/ML Engineer specializing in LLM-driven systems, multi-agent orchestration, and real-time computer vision pipelines. Experienced in building production-grade AI applications including requirement-generation agents, video intelligence systems, and distributed AI architectures with strong focus on scalability, reliability, and optimization."
  },
  "experience": [
    {
      "role": "AI/ML Engineer Intern",
      "company": "0101 Digitall",
      "duration": "Dec 2024 – Mar 2025",
      "work": [
        "Built a Requirements Agent using LangChain that converts ambiguous client ideas into structured software requirements (user stories, acceptance criteria).",
        "Developed a real-time horse movement analysis system using computer vision with visual overlays for training feedback.",
        "Optimized deep learning models for real-time inference, improving latency and stability in video processing pipelines."
      ]
    }
  ],
  "education": [
    {
      "degree": "Minor in Artificial Intelligence",
      "institution": "Indian Institute of Technology (IIT), Ropar",
      "duration": "Jan 2025 – Jan 2026",
      "details": [
        "Focused on AI systems, machine learning theory, and applied deep learning.",
        "Worked on real-world AI projects involving computer vision and intelligent systems."
      ]
    },
    {
      "degree": "Bachelor of Technology (B.Tech)",
      "institution": "Kamala Institute of Technology and Science",
      "duration": "Aug 2020 – Jul 2024",
      "details": [
        "Major in Computer Science and Engineering.",
        "Built foundational knowledge in data structures, algorithms, and system design."
      ]
    }
  ],
  "certifications": [
    {
      "name": "Full Stack Web Development Hackathon (48-Hour Challenge)",
      "provider": "Brainovision",
      "type": "Hackathon"
    },
    {
      "name": "Analyzing and Visualizing Data with Microsoft Power BI",
      "provider": "Skill Nation",
      "type": "Data Analysis"
    },
    {
      "name": "Linux Fundamentals & Command Line Basics",
      "provider": "Cybrary",
      "type": "System Administration"
    }
  ],
  "skills": {
    "technical": {
      "ai_ml": [
        "Deep Learning (CNNs, Transfer Learning, Fine-tuning, Quantization)",
        "Agent-based Systems (LangChain, Multi-Agent Orchestration)",
        "Prompt Engineering",
        "Model Optimization"
      ],
      "computer_vision": [
        "Object Detection (YOLO, SSD)",
        "Real-time Video Processing",
        "OpenCV, MediaPipe"
      ],
      "frameworks_tools": [
        "PyTorch",
        "TensorFlow",
        "FastAPI",
        "Django",
        "LangGraph",
        "FFmpeg",
        "Docker",
        "Redis",
        "PostgreSQL",
        "Vector Databases"
      ],
      "programming": [
        "Python",
        "SQL"
      ],
      "core_concepts": [
        "Data Structures & Algorithms",
        "System Design",
        "Distributed Systems",
        "API Design"
      ]
    },
    "soft_skills": [
      "Problem Solving",
      "Analytical Thinking",
      "Communication",
      "Team Collaboration",
      "Adaptability",
      "Time Management"
    ]
  },
  "projects": [
    {
      "title": "Barney",
      "type": "Multi-Agent AI Orchestration System",
      "problem_statement": "Single-LLM systems struggle with complex multi-step tasks due to lack of planning, memory, and tool integration.",
      "solution": "Built a modular multi-agent system that decomposes tasks, assigns them to specialized agents, and executes them using tools and memory-aware reasoning.",
      "system_design": {
        "input": [
          "User query",
          "Conversation history",
          "External context (documents, APIs)"
        ],
        "processing_pipeline": [
          "1. Intent understanding using LLM",
          "2. Task decomposition into subtasks",
          "3. Agent selection based on task type",
          "4. Context retrieval via vector search (RAG)",
          "5. Tool execution (APIs, DB queries)",
          "6. Parallel/Sequential task execution",
          "7. Intermediate result aggregation",
          "8. Final response synthesis"
        ],
        "output": [
          "Structured response",
          "Tool execution logs",
          "Updated memory context"
        ]
      },
      "decision_logic": [
        "Dynamic agent selection (reasoning, retrieval, execution)",
        "Tool selection via LLM reasoning",
        "Fallback strategies for tool failures",
        "Semantic prioritization of context"
      ],
      "architecture_components": {
        "orchestrator": "Controls workflow, decomposition, and coordination",
        "agents": [
          "Reasoning Agent",
          "Retrieval Agent",
          "Execution Agent"
        ],
        "memory": "Vector DB for semantic retrieval and persistence",
        "tool_layer": "Pluggable APIs, DB queries, external integrations",
        "execution_engine": "Async pipeline with parallel + sequential support"
      },
      "data_flow": [
        "User → Orchestrator → Agents → Tools/Memory → Aggregation → Response"
      ],
      "constraints_and_tradeoffs": [
        "Latency vs reasoning depth",
        "Token cost due to multi-agent communication",
        "Memory accuracy vs retrieval speed",
        "System complexity vs maintainability"
      ],
      "failure_handling": [
        "Retry mechanisms",
        "LLM fallback responses",
        "Partial result aggregation"
      ],
      "observability": [
        "Agent decision logs",
        "Tool call tracking",
        "Latency monitoring"
      ],
      "tech": [
        "LangGraph",
        "Python",
        "FastAPI",
        "Redis",
        "PostgreSQL",
        "Vector Databases",
        "Docker"
      ],
      "status": "Under Progress"
    },
    {
      "title": "Gravity Edits",
      "type": "AI Video Editing System",
      "problem_statement": "Manual video editing is slow and requires expertise.",
      "solution": "Built a dual-agent pipeline (Inspector + Director) to convert natural language instructions into executable video editing workflows.",
      "system_design": {
        "input": [
          "User prompt",
          "Video file"
        ],
        "processing_pipeline": [
          "1. Video analysis (scene/object detection)",
          "2. Intent-to-plan conversion",
          "3. Editing instruction generation",
          "4. Execution via FFmpeg pipeline"
        ],
        "output": [
          "Edited video",
          "Structured editing plan"
        ]
      },
      "decision_logic": [
        "Mapping natural language to edit operations",
        "Segment selection",
        "Edit sequencing"
      ],
      "constraints_and_tradeoffs": [
        "Processing time vs video size",
        "Scene understanding accuracy",
        "Automation vs manual control"
      ],
      "tech": [
        "Gemini 2.5 Pro",
        "FastAPI",
        "FFmpeg"
      ],
      "status": "Completed"
    },
    {
      "title": "VirBoard",
      "type": "Real-Time Computer Vision Interaction System",
      "problem_statement": "Traditional input devices limit natural interaction.",
      "solution": "Gesture-controlled virtual drawing system using real-time hand tracking.",
      "system_design": {
        "input": [
          "Webcam stream"
        ],
        "processing_pipeline": [
          "1. Hand landmark detection",
          "2. Finger tracking",
          "3. Gesture-to-coordinate mapping",
          "4. Canvas rendering"
        ],
        "output": [
          "Interactive drawing interface"
        ]
      },
      "decision_logic": [
        "Gesture classification",
        "Noise filtering"
      ],
      "constraints_and_tradeoffs": [
        "Latency vs accuracy",
        "Lighting sensitivity",
        "Hardware limitations"
      ],
      "tech": [
        "OpenCV",
        "MediaPipe",
        "Python"
      ],
      "status": "Completed"
    },
    {
      "title": "VidLingo",
      "type": "Speech Recognition + Translation System",
      "problem_statement": "Manual subtitle creation is slow and not scalable.",
      "solution": "Automated pipeline for subtitle generation, translation, and synchronization.",
      "system_design": {
        "input": [
          "Audio/Video"
        ],
        "processing_pipeline": [
          "1. Speech-to-text",
          "2. Timestamp generation",
          "3. Translation",
          "4. Subtitle synchronization"
        ],
        "output": [
          "SRT files",
          "Multi-language subtitles"
        ]
      },
      "decision_logic": [
        "Language detection",
        "Model selection",
        "Alignment strategy"
      ],
      "constraints_and_tradeoffs": [
        "Accuracy vs speed",
        "Translation quality vs cost",
        "Sync precision"
      ],
      "tech": [
        "Google Speech-to-Text",
        "Translation APIs"
      ],
      "status": "Completed"
    },
    {
      "title": "TelePort",
      "type": "Android TV Aggregation Platform",
      "problem_statement": "Fragmented OTT ecosystem reduces content discoverability.",
      "solution": "Unified Android TV launcher with deep-link optimization.",
      "system_design": {
        "input": [
          "User navigation"
        ],
        "processing_pipeline": [
          "1. Metadata aggregation",
          "2. Deep link resolution",
          "3. UI rendering"
        ],
        "output": [
          "Unified dashboard",
          "Direct playback navigation"
        ]
      },
      "constraints_and_tradeoffs": [
        "Deep link inconsistency",
        "UI performance",
        "Latency"
      ],
      "tech": [
        "Android TV",
        "Deep Linking"
      ],
      "status": "Under Progress"
    }
  ]
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Check for API Key
  if (!process.env.GROQ_API_KEY) {
    console.error('MISSING_API_KEY: GROQ_API_KEY is not defined in Vercel environment variables.');
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
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are the AI version of Rampelli Sai Eshwar's portfolio. 
          Your goal is to answer questions about Sai Eshwar's professional experience, projects, and skills.
          
          USE ONLY THE FOLLOWING CONTEXT:
          ${JSON.stringify(professionalContext, null, 2)}
          
          RULES:
          1. Only answer based on the provided context.
          2. If the user asks something outside this context, politely say: "I'm sorry, I'm specifically trained on Sai Eshwar's professional background. I don't have information on that topic."
          3. Be professional, concise, and helpful.
          4. Format your response with markdown for readability.`
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
    console.error('Groq API Error Details:', {
      message: error.message,
      stack: error.stack,
      status: error.status,
      name: error.name
    });
    return res.status(500).json({
      error: 'Failed to process search query',
      details: error.message
    });
  }
}
