import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal as TerminalIcon, Download, CheckCircle2, Github } from 'lucide-react';

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  logs: string[];
  downloadUrl?: string;
  downloadFileName?: string;
  githubUrl?: string;
  githubLabel?: string;
}

export const Terminal: React.FC<TerminalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  logs, 
  downloadUrl,
  downloadFileName = "resume.pdf",
  githubUrl,
  githubLabel = "View Source on GitHub"
}) => {
  const [displayedLogs, setDisplayedLogs] = useState<string[]>([]);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDisplayedLogs([]);
      setCurrentLogIndex(0);
      setCurrentText('');
      setIsComplete(false);
    }
  }, [isOpen, logs]);

  useEffect(() => {
    if (isOpen && currentLogIndex < logs.length) {
      const fullText = logs[currentLogIndex];
      if (currentText.length < fullText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 10); // Faster typing
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedLogs((prev) => [...prev, fullText]);
          setCurrentLogIndex((prev) => prev + 1);
          setCurrentText('');
        }, 150); // Faster line transition
        return () => clearTimeout(timeout);
      }
    } else if (isOpen && currentLogIndex === logs.length) {
      const timeout = setTimeout(() => {
        setIsComplete(true);
      }, 200); // Faster completion
      return () => clearTimeout(timeout);
    }
  }, [isOpen, currentLogIndex, currentText, logs]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedLogs, currentText, isComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-3xl h-[500px] glass rounded-xl overflow-hidden flex flex-col shadow-2xl border-white/20 terminal-glow"
          >
            {/* Terminal Header */}
            <div className="bg-white/10 px-4 py-2 flex items-center justify-between border-bottom border-white/10">
              <div className="flex items-center gap-2">
                <TerminalIcon size={16} className="text-electric-blue" />
                <span className="text-xs font-mono text-white/70 uppercase tracking-widest">{title} - System Logs</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <button 
                  onClick={onClose}
                  className="ml-2 p-1 hover:bg-white/10 rounded-md transition-colors"
                >
                  <X size={16} className="text-white/50 hover:text-white" />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div 
              ref={scrollRef}
              className="flex-1 p-6 font-mono text-sm md:text-base overflow-y-auto bg-black/40 relative"
            >
              <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
              
              {displayedLogs.map((log, i) => (
                <div key={i} className="mb-2 flex gap-3">
                  <span className="text-electric-blue shrink-0">&gt;</span>
                  <span className="text-white/90">{log}</span>
                </div>
              ))}
              
              {!isComplete && currentLogIndex < logs.length && (
                <div className="flex gap-3">
                  <span className="text-electric-blue shrink-0">&gt;</span>
                  <span className="text-white/90">
                    {currentText}
                    <span className="inline-block w-2 h-4 bg-electric-blue ml-1 animate-pulse" />
                  </span>
                </div>
              )}

              {isComplete && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-2xl bg-electric-blue/5 border border-electric-blue/20 flex flex-col items-center text-center gap-4"
                >
                  <div className="flex items-center gap-2 text-green-400 font-bold">
                    <CheckCircle2 size={20} />
                    [PROCESS COMPLETED SUCCESSFULLY]
                  </div>
                  
                  {downloadUrl && (
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-white/50 text-xs uppercase tracking-widest">System ready for file export</p>
                      <a 
                        href={downloadUrl} 
                        download={downloadFileName}
                        className="flex items-center gap-3 px-8 py-3 rounded-full bg-electric-blue text-black font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                      >
                        <Download size={18} />
                        Download PDF
                      </a>
                    </div>
                  )}

                  {githubUrl && (
                    <div className="flex flex-col items-center gap-4">
                      <p className="text-white/50 text-xs uppercase tracking-widest">Repository access granted</p>
                      <a 
                        href={githubUrl} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-8 py-3 rounded-full border border-white/20 bg-white/5 text-white font-bold hover:bg-white/10 transition-all hover:scale-105"
                      >
                        <Github size={18} />
                        {githubLabel}
                      </a>
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
