import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles, Send, Command } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    // LLM Integration placeholder
    console.log('Searching for:', query);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Floating Results Panel (Gemini-like) */}
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: query.length > 0 ? '0%' : '100%', opacity: query.length > 0 ? 1 : 0 }}
            exit={{ y: '100%', opacity: 0 }}
            className="fixed bottom-[120px] left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101] px-6 pointer-events-none"
          >
            <div className="glass rounded-[2.5rem] p-8 pointer-events-auto relative overflow-hidden">
              {/* Gemini Glow Effect */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-40 bg-electric-blue/20 blur-[100px] animate-pulse" />
              
              <div className="flex items-start gap-4 mb-6">
                <div className="p-2 rounded-xl bg-electric-blue/10 text-electric-blue">
                  <Sparkles size={20} className="animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-2">System Intelligence</h3>
                  <div className="text-white/80 leading-relaxed">
                    {query.length > 0 ? (
                      <div className="space-y-4">
                        <p className="animate-pulse">Analyzing query: "{query}"...</p>
                        <p className="text-sm text-white/40 italic">LLM integration pending. This panel will display real-time insights from your professional data.</p>
                      </div>
                    ) : (
                      <p>Awaiting input...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Search Bar */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-xl z-[102] px-6"
          >
            <form onSubmit={handleSearch} className="relative group">
              <div className="absolute inset-0 bg-electric-blue/5 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center glass rounded-full px-6 py-4 border-white/10 group-focus-within:border-electric-blue/30 transition-all">
                <Search size={20} className="text-white/30 mr-4" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything about my experience..."
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/20 font-sans"
                />
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/30">
                    <Command size={10} />
                    <span>K</span>
                  </div>
                  <button 
                    type="submit"
                    className={`p-2 rounded-full transition-all ${query.trim() ? 'bg-electric-blue text-black scale-100' : 'bg-white/5 text-white/20 scale-90'}`}
                  >
                    <Send size={18} />
                  </button>
                  <button 
                    type="button"
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-white/10 text-white/30 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
