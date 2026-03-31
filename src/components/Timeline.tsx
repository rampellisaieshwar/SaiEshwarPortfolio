import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, MapPin, ChevronRight } from 'lucide-react';

const experience = [
  {
    title: "AIML Developer Intern",
    company: "0101 Digitall",
    location: "Hyderabad, India",
    period: "12/2024 – 03/2025",
    description: "Architected agentic systems and CV pipelines. Key projects include: 'Requirements Agent' (LangChain-based documentation automation) and 'Horse Tracking' (Real-time movement analysis using YOLO & OpenCV).",
    icon: <Briefcase size={18} />,
    color: "text-electric-blue"
  }
];

const education = [
  {
    title: "Major in Artificial Intelligence",
    institution: "IIT Ropar",
    location: "Remote / Hybrid",
    period: "01/2025 – 01/2026",
    description: "Focused on LLM fine-tuning, quantization, and agentic workflows.",
    icon: <GraduationCap size={18} />,
    color: "text-deep-violet"
  },
  {
    title: "B.Tech in Computer Science",
    institution: "Kamala Institute of Technology",
    location: "Telangana, India",
    period: "08/2020 – 07/2024",
    description: "Graduated with focus on core CS fundamentals. Developed 'VirBoard' (CV-based virtual blackboard) and 'VidLingo' (AI-powered subtitle translation engine) as key academic milestones.",
    icon: <GraduationCap size={18} />,
    color: "text-deep-violet"
  }
];

interface TimelineProps {
  onExperienceClick?: (company: string) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ onExperienceClick }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
      {/* Experience */}
      <div>
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl bg-electric-blue/10 text-electric-blue">
            <Briefcase size={24} />
          </div>
          <h3 className="text-3xl font-display font-bold">Experience</h3>
        </div>
        
        <div className="space-y-12 relative before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-electric-blue/20 before:to-transparent">
          {experience.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative pl-16"
            >
              <div className="absolute left-[19px] top-2 w-2.5 h-2.5 rounded-full bg-electric-blue shadow-[0_0_10px_rgba(0,210,255,0.8)] z-10" />
              <div 
                onClick={() => onExperienceClick?.(item.company)}
                className={`glass p-8 rounded-[2rem] glass-hover ${onExperienceClick ? 'cursor-pointer' : ''}`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-electric-blue/60 font-mono text-xs uppercase tracking-wider">{item.company}</p>
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                    {item.period}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono uppercase tracking-widest">
                    <MapPin size={12} />
                    {item.location}
                  </div>
                  {item.company === "0101 Digitall" && (
                    <div className="flex items-center gap-1 text-[10px] text-electric-blue font-mono uppercase tracking-widest animate-pulse">
                      View Spotlight <ChevronRight size={10} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <div className="flex items-center gap-4 mb-12">
          <div className="p-3 rounded-2xl bg-deep-violet/10 text-deep-violet">
            <GraduationCap size={24} />
          </div>
          <h3 className="text-3xl font-display font-bold">Education</h3>
        </div>
        
        <div className="space-y-12 relative before:absolute before:left-[23px] before:top-4 before:bottom-4 before:w-px before:bg-gradient-to-b before:from-deep-violet/20 before:to-transparent">
          {education.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-16"
            >
              <div className="absolute left-[19px] top-2 w-2.5 h-2.5 rounded-full bg-deep-violet shadow-[0_0_10px_rgba(157,80,187,0.8)] z-10" />
              <div className="glass p-8 rounded-[2rem] glass-hover">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-deep-violet/60 font-mono text-xs uppercase tracking-wider">{item.institution}</p>
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                    {item.period}
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{item.description}</p>
                <div className="flex items-center gap-2 text-[10px] text-white/30 font-mono uppercase tracking-widest">
                  <MapPin size={12} />
                  {item.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
