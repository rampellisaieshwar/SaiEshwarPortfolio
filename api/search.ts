import { Groq } from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const professionalContext = {
  profile: {
    name: "Rampelli Sai Eshwar",
    role: "Applied AI & Backend Developer",
    location: "Hyderabad, India",
    education: [
      { institution: "IIT Ropar", major: "AI", status: "Current" },
      { institution: "KITS", major: "B.Tech" }
    ],
    experience: [
      { company: "0101 Digitall", role: "AIML Intern", description: "Applied AI & Backend Development focusing on agentic systems and CV pipelines." }
    ]
  },
  projects: [
    { title: "Barney", description: "Multi-Agent Orchestration platform using LangGraph and Python.", tech: ["LangGraph", "Python", "Multi-Agent"] },
    { title: "TelePort", description: "Android TV Launcher for OTT live TV channels with deep link optimization.", tech: ["Android TV", "Deep Linking"] },
    { title: "Gravity Edits", description: "Autonomous Video AI using Gemini 2.5 Pro and FFmpeg.", tech: ["Gemini 2.5 Pro", "FastAPI", "FFmpeg"] },
    { title: "VirBoard", description: "CV Virtual Blackboard using OpenCV and Mediapipe.", tech: ["OpenCV", "Mediapipe", "Python"] },
    { title: "VidLingo", description: "AI Subtitle Engine using Google Cloud Speech-to-Text and Translation API.", tech: ["Google Cloud", "Speech-to-Text", "Translation"] }
  ],
  internship_highlights: [
    { title: "Requirements Agent", description: "LangChain-based agent converting briefs to Jira stories." },
    { title: "Horse Tracking", description: "CV system using YOLO and PyTorch for movement analysis." }
  ]
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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
      model: 'llama3-8b-8192',
      temperature: 0.2,
      max_tokens: 500,
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";
    return res.status(200).json({ response: responseText });
  } catch (error: any) {
    console.error('Groq API Error:', error);
    return res.status(500).json({ error: 'Failed to process search query' });
  }
}
