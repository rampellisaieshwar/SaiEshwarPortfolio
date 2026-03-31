import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal as TerminalIcon, 
  Cpu,
  Video,
  FileText,
  Tv,
  PenTool,
  ChevronRight,
  ArrowRight,
  Layers,
  Activity,
  Zap,
  X,
  Lock
} from 'lucide-react';
import { Background } from './components/Background';
import { BentoGrid } from './components/BentoGrid';
import { Timeline } from './components/Timeline';
import { Terminal } from './components/Terminal';
import me9 from './media/me9.png';
import Resume from './media/Resume.pdf';

const projects = [
  {
    id: 'barney',
    title: "Barney",
    subtitle: "Multi-Agent Orchestration",
    description: "Production-grade multi-agent platform that breaks complex workflows into specialized, collaborative units.",
    icon: <Cpu className="text-electric-blue" />,
    tech: ["LangGraph", "Python", "Multi-Agent"],
    githubUrl: "https://github.com/rampellisaieshwar/Barney",
    underProgress: true,
    logs: [
      "Initializing Barney Orchestrator...",
      "Defining Agentic Workflows...",
      "Configuring State Management...",
      "System under heavy development.",
      "Status: [LOCKED] - Out Soon."
    ]
  },
  {
    id: 'teleport',
    title: "TelePort",
    subtitle: "Android TV Launcher",
    description: "Universal launcher hub for OTT live TV channels with deep link optimization.",
    icon: <Tv className="text-deep-violet" />,
    tech: ["Android TV", "Deep Linking", "UI/UX"],
    githubUrl: "https://github.com/rampellisaieshwar/TelePort",
    underProgress: true,
    logs: [
      "Aggregating OTT channels...",
      "Mapping deep links...",
      "System under maintenance.",
      "Status: [LOCKED] - Out Soon."
    ]
  },
  {
    id: 'gravity',
    title: "Gravity Edits",
    subtitle: "Autonomous Video AI",
    description: "Two-Stage AI architecture (Inspector-Director) for natural language video editing.",
    icon: <Video className="text-electric-blue" />,
    tech: ["Gemini 2.5 Pro", "FastAPI", "FFmpeg"],
    githubUrl: "https://github.com/rampellisaieshwar/GravityEdits",
    underProgress: false,
    logs: [
      "Initializing Gemini 2.5 Pro...",
      "Scanning frames with Inspector Agent...",
      "Executing Director Agent logic...",
      "Executing FFmpeg stitch...",
      "Video rendered."
    ]
  },
  {
    id: 'virboard',
    title: "VirBoard",
    subtitle: "CV Virtual Blackboard",
    description: "Real-time virtual writing system using hand gesture recognition and computer vision.",
    icon: <PenTool className="text-electric-blue" />,
    tech: ["OpenCV", "Mediapipe", "Python"],
    githubUrl: "https://github.com/rampellisaieshwar/virboard",
    underProgress: false,
    logs: [
      "Initializing camera feed...",
      "Detecting hand landmarks...",
      "Tracking index finger trajectory...",
      "Rendering canvas overlay...",
      "Gesture recognized: Draw."
    ]
  },
  {
    id: 'vidlingo',
    title: "VidLingo",
    subtitle: "AI Subtitle Engine",
    description: "Automated subtitle generation and multi-language translation system with timeline synchronization.",
    icon: <Layers className="text-deep-violet" />,
    tech: ["Google Cloud", "Speech-to-Text", "Translation API"],
    githubUrl: "https://github.com/rampellisaieshwar/vidlingo",
    underProgress: false,
    logs: [
      "Extracting audio stream...",
      "Running Speech-to-Text inference...",
      "Translating segments via Google Cloud...",
      "Synchronizing timestamps...",
      "Subtitles generated."
    ]
  }
];

const resumeLogs = [
  "Fetching professional profile for RAMPELLI SAI ESHWAR...",
  "Loading academic history: IIT Ropar (AI), KITS (B.Tech)...",
  "Loading industry experience: 0101 Digitall (AIML Intern)...",
  "Parsing technical stack: LangChain, YOLO, FastAPI, FFmpeg...",
  "Role: Applied AI & Backend Developer",
  "Location: Hyderabad, India",
  "Contact: rampellisaieshwar@gmail.com",
  "Resume data parsed successfully."
];

const internshipProjects = [
  {
    id: 'req-agent',
    title: "Requirements Agent",
    subtitle: "0101 Digitall Internship",
    description: "Converts unstructured client briefs into Jira-ready user stories and requirements.",
    icon: <FileText className="text-deep-violet" />,
    tech: ["LangChain", "Python", "LLMs"],
    underProgress: false,
    logs: [
      "Loading LangChain...",
      "Parsing client brief...",
      "Generating User Stories...",
      "Documentation Ready."
    ]
  },
  {
    id: 'horse-track',
    title: "Horse Tracking",
    subtitle: "0101 Digitall Internship",
    description: "Computer vision system for real-time movement analysis and training feedback.",
    icon: <Activity className="text-electric-blue" />,
    tech: ["YOLO", "OpenCV", "PyTorch"],
    underProgress: false,
    logs: [
      "Loading YOLO weights...",
      "Initializing real-time tracking...",
      "Analyzing trajectory...",
      "Generating feedback overlay."
    ]
  }
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [showInternshipSpotlight, setShowInternshipSpotlight] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen relative selection:bg-electric-blue/30 overflow-x-hidden">
      {/* Main Content Wrapper (Blurred when spotlight is active) */}
      <div className={`transition-all duration-700 ${showInternshipSpotlight ? 'blur-xl scale-[0.98] brightness-50' : ''}`}>
        <Background />
        
        {/* Floating Navigation */}
        <div className="fixed top-8 left-0 w-full z-50 px-6 flex justify-center pointer-events-none">
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className={`pointer-events-auto flex items-center gap-6 px-6 py-2.5 rounded-full glass transition-all duration-500 ${scrolled ? 'bg-black/40 border-white/20' : ''}`}
          >
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden glass">
                <img 
                  src={me9} 
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden md:block">RSE.SYS</span>
            </div>
            <a href="#" className="text-sm font-medium hover:text-electric-blue transition-colors">Home</a>
            <a href="#projects" className="text-sm font-medium hover:text-electric-blue transition-colors">Projects</a>
            <a href="#skills" className="text-sm font-medium hover:text-electric-blue transition-colors">Expertise</a>
            <a href="#experience" className="text-sm font-medium hover:text-electric-blue transition-colors">Timeline</a>
            <div className="w-px h-4 bg-white/10" />
            <div className="flex gap-4">
              <a href="https://github.com/rampellisaieshwar" target="_blank" className="text-white/50 hover:text-white transition-colors"><Github size={18} /></a>
              <a href="https://linkedin.com/in/saieshwarrampelli" target="_blank" className="text-white/50 hover:text-white transition-colors"><Linkedin size={18} /></a>
            </div>
          </motion.nav>
        </div>

        {/* Hero Section */}
        <section className="relative pt-48 pb-32 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-t from-electric-blue to-transparent" />
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(0,210,255,0.8)]" />
            
            {/* Profile Identity Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative w-32 h-32 mx-auto mb-10 group"
            >
              <div className="absolute inset-0 rounded-full bg-electric-blue/10 blur-2xl group-hover:bg-electric-blue/20 transition-colors duration-500" />
              <div className="relative w-full h-full rounded-full border border-white/10 overflow-hidden glass p-1.5 group-hover:border-electric-blue/30 transition-colors duration-500">
                <img 
                  src={me9} 
                  alt="Rampelli Sai Eshwar"
                  className="w-full h-full object-cover rounded-full filter contrast-110 brightness-110 grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              {/* Identity Tag */}
              <div className="absolute -bottom-2 -right-4 px-3 py-1 rounded-full glass text-[8px] font-mono text-electric-blue border border-electric-blue/20 flex items-center gap-1.5 shadow-lg">
                <div className="w-1 h-1 rounded-full bg-electric-blue animate-pulse" />
                ID: RSE-2026
              </div>
            </motion.div>

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-8">
              <Zap size={12} className="text-electric-blue" />
              Available for AI Engineering
            </span>
            
            <h1 className="text-7xl md:text-9xl font-display font-bold tracking-tighter leading-[0.85] mb-8">
              RAMPELLI <br />
              <span className="gemini-gradient">SAI ESHWAR</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/40 font-light max-w-2xl mx-auto leading-relaxed mb-12">
              Applied AI Engineer at 0101 Digitall. <br />
              Architecting agentic systems and CV pipelines.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="#projects" className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-electric-blue hover:text-white transition-all duration-500 flex items-center gap-2">
                View Projects <ArrowRight size={18} />
              </a>
              <button 
                onClick={() => setShowResume(true)}
                className="px-8 py-4 rounded-full glass font-semibold hover:bg-white/10 transition-all duration-500 flex items-center gap-2"
              >
                Resume <FileText size={18} />
              </button>
              <a href="mailto:rampellisaieshwar@gmail.com" className="px-8 py-4 rounded-full glass font-semibold hover:bg-white/10 transition-all duration-500">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto relative">
          <div className="stitch-line left-1/2 top-0 h-24" />
          <div className="node-dot left-1/2 top-24 -translate-x-1/2" />
          
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">Project Intelligence</h2>
            <p className="text-white/40 max-w-lg mx-auto">Interactive nodes representing core engineering milestones. Hover to expand, click to initialize system logs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  zIndex: 10,
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="glass p-6 rounded-[2rem] cursor-pointer glass-hover group relative overflow-hidden transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(project.icon as React.ReactElement, { size: 20 })}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                      <TerminalIcon size={10} />
                      {project.underProgress ? 'System Initializing' : 'System Ready'}
                    </div>
                    {project.underProgress && (
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue text-[8px] font-mono uppercase tracking-widest border border-electric-blue/20">
                        <Activity size={8} className="animate-pulse" />
                        Under Progress
                      </div>
                    )}
                  </div>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-1">{project.title}</h3>
                <p className="text-xs text-electric-blue/60 font-mono mb-3 uppercase tracking-wider">{project.subtitle}</p>
                <p className="text-xs text-white/50 leading-relaxed mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-medium text-white/30 group-hover:text-electric-blue transition-colors">
                  {project.underProgress ? (
                    <div className="flex items-center gap-2">
                      <Lock size={14} />
                      <span>Out Soon</span>
                    </div>
                  ) : (
                    <>
                      <span>Initialize Terminal</span>
                      <ChevronRight size={16} />
                    </>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-32 px-6 max-w-7xl mx-auto relative">
          <div className="stitch-line left-1/2 top-0 h-24" />
          <div className="node-dot left-1/2 top-24 -translate-x-1/2" />
          
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">Technical Stack</h2>
            <p className="text-white/40">Specialized toolsets for AI, Vision, and Backend Engineering.</p>
          </div>
          <BentoGrid />
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-6 max-w-7xl mx-auto relative">
          <div className="stitch-line left-1/2 top-0 h-24" />
          <div className="node-dot left-1/2 top-24 -translate-x-1/2" />
          
          <div className="text-center mb-20">
            <h2 className="text-4xl font-display font-bold mb-4">Professional Journey</h2>
            <p className="text-white/40">From academic excellence at IIT Ropar to industry impact.</p>
          </div>
          <Timeline onExperienceClick={(company) => {
            if (company === "0101 Digitall") {
              setShowInternshipSpotlight(true);
            }
          }} />
        </section>

        {/* Footer */}
        <footer className="py-32 px-6 border-t border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-electric-blue/5 blur-[120px] -z-10" />
          
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8">
              THE VISION YOU FIND. <br />
              THE CODE <span className="gemini-gradient">AI DESIGNED</span>.
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-20">
              <a href="mailto:rampellisaieshwar@gmail.com" className="px-10 py-5 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform flex items-center gap-3">
                <Mail size={20} />
                Start Conversation
              </a>
              <div className="flex gap-4">
                <a href="https://github.com/rampellisaieshwar" target="_blank" className="glass p-5 rounded-full hover:bg-white/10 transition-all"><Github size={24} /></a>
                <a href="https://linkedin.com/in/saieshwarrampelli" target="_blank" className="glass p-5 rounded-full hover:bg-white/10 transition-all"><Linkedin size={24} /></a>
              </div>
            </div>
            
            <div className="w-full pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/20 uppercase tracking-[0.3em]">
              <span>© 2026 RAMPELLI SAI ESHWAR</span>
              <div className="flex gap-8">
                <span>HYDERABAD, IN</span>
                <span>IIT ROPAR '26</span>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Modals & Overlays (Outside the blurred wrapper) */}
      
      {/* Terminal Modal */}
      <Terminal 
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ''}
        logs={selectedProject?.logs || []}
        githubUrl={selectedProject?.githubUrl}
      />

      {/* Resume Terminal Modal */}
      <Terminal 
        isOpen={showResume}
        onClose={() => setShowResume(false)}
        title="Professional Resume"
        logs={resumeLogs}
        downloadUrl={Resume}
        downloadFileName="Rampelli_Sai_Eshwar_Resume.pdf"
      />

      {/* Internship Spotlight Overlay */}
      <AnimatePresence>
        {showInternshipSpotlight && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInternshipSpotlight(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl z-10 bg-obsidian/40 p-12 rounded-[3rem] border border-white/10 backdrop-blur-2xl shadow-[0_0_100px_rgba(0,210,255,0.1)]"
            >
              <div className="flex justify-between items-center mb-12">
                <div>
                  <h2 className="text-4xl font-display font-bold mb-2">Internship Spotlight</h2>
                  <p className="text-electric-blue font-mono text-sm uppercase tracking-widest">0101 Digitall - AIML Developer</p>
                </div>
                <button 
                  onClick={() => setShowInternshipSpotlight(false)}
                  className="p-4 rounded-full glass hover:bg-white/10 transition-all group"
                >
                  <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {internshipProjects.map((project, i) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                    className="glass p-6 rounded-[2rem] cursor-pointer glass-hover group relative overflow-hidden border-white/10 hover:border-electric-blue/30"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform duration-500">
                        {React.cloneElement(project.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-widest">
                          <TerminalIcon size={10} />
                          {project.underProgress ? 'System Initializing' : 'System Ready'}
                        </div>
                        {project.underProgress && (
                          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-electric-blue/10 text-electric-blue text-[8px] font-mono uppercase tracking-widest border border-electric-blue/20">
                            <Activity size={8} className="animate-pulse" />
                            Under Progress
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-display font-bold mb-1">{project.title}</h3>
                    <p className="text-xs text-electric-blue/60 font-mono mb-3 uppercase tracking-wider">{project.subtitle}</p>
                    <p className="text-xs text-white/50 leading-relaxed mb-6">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-white/40 border border-white/5 font-mono">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-medium text-white/30 group-hover:text-electric-blue transition-colors">
                      {project.underProgress ? (
                        <div className="flex items-center gap-2">
                          <Lock size={14} />
                          <span>Out Soon</span>
                        </div>
                      ) : (
                        <>
                          <span>Initialize Terminal</span>
                          <ChevronRight size={16} />
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
