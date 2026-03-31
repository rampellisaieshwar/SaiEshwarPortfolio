import React from 'react';
import { motion } from 'motion/react';
import { Brain, Eye, Server, Code, Database, Cpu, Zap, Shield, Globe } from 'lucide-react';

const skills = [
  {
    title: "AI & Agents",
    icon: <Brain className="text-electric-blue" />,
    items: ["LangChain", "Agentic Systems", "LLM Fine-tuning", "Quantization"],
    className: "md:col-span-2 md:row-span-1",
    accent: "bg-electric-blue/10"
  },
  {
    title: "Computer Vision",
    icon: <Eye className="text-deep-violet" />,
    items: ["YOLO", "SSD", "OpenCV", "Real-time Tracking"],
    className: "md:col-span-1 md:row-span-2",
    accent: "bg-deep-violet/10"
  },
  {
    title: "Backend",
    icon: <Server className="text-electric-blue" />,
    items: ["FastAPI", "Django", "Redis", "FFmpeg"],
    className: "md:col-span-1 md:row-span-1",
    accent: "bg-electric-blue/10"
  },
  {
    title: "Tools",
    icon: <Code className="text-white/70" />,
    items: ["Python", "SQL", "Git/GitHub", "System Design"],
    className: "md:col-span-1 md:row-span-1",
    accent: "bg-white/5"
  }
];

export const BentoGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
      {skills.map((skill, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className={`glass p-8 rounded-[2rem] flex flex-col justify-between group glass-hover ${skill.className}`}
        >
          <div className="flex justify-between items-start">
            <div className={`p-3 rounded-2xl ${skill.accent} group-hover:scale-110 transition-transform duration-500`}>
              {skill.icon}
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-electric-blue transition-colors" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold mb-3">{skill.title}</h3>
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, j) => (
                <span key={j} className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/5 text-white/40 border border-white/5">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
