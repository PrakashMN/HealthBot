import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Chatbot } from './components/Chatbot';
import { Moon, Sun, HeartPulse, Shield, Beaker, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Toggle Theme
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans relative overflow-hidden">
      
      {/* Global Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         {/* Grid Pattern */}
         <div className="absolute inset-0 bg-grid-pattern opacity-100"></div>
         {/* Ambient Glows */}
         <div className="absolute top-1/4 -left-64 w-96 h-96 bg-brand-medical/20 dark:bg-brand-medical/5 rounded-full blur-3xl animate-pulse-slow"></div>
         <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-indigo-500/20 dark:bg-indigo-500/5 rounded-full blur-3xl animate-pulse-slow font-blob" style={{ animationDelay: '2s' }}></div>
         
         {/* Floating Background Icons */}
         <motion.div 
           className="absolute top-[15%] left-[10%] text-brand-teal/20 dark:text-brand-teal/5"
           animate={{ y: [0, 30, 0], rotate: [0, 10, -10, 0] }}
           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
         >
           <HeartPulse size={120} />
         </motion.div>
         <motion.div 
           className="absolute top-[40%] right-[10%] text-brand-blue/15 dark:text-white/5"
           animate={{ y: [0, -40, 0], rotate: [0, -15, 10, 0] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
         >
           <Shield size={160} />
         </motion.div>
         <motion.div 
           className="absolute bottom-[20%] left-[20%] text-indigo-500/15 dark:text-indigo-400/5"
           animate={{ y: [0, 50, 0], scale: [1, 1.1, 1] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
         >
           <Beaker size={100} />
         </motion.div>
         <motion.div 
           className="absolute top-[70%] right-[25%] text-rose-400/20 dark:text-rose-400/5"
           animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
           transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
         >
           <Plus size={80} />
         </motion.div>
      </div>

      {/* Theme Toggle Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-700 dark:text-yellow-400 border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
        aria-label="Toggle Dark Mode"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Floating Action Button & Chat */}
      {isChatOpen && (
         <Chatbot isFloating={true} onClose={() => setIsChatOpen(false)} />
      )}
      
      <button 
        onClick={() => setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-6 right-6 z-[70] p-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-teal shadow-[0_10px_30px_rgba(0,102,204,0.4)] text-white hover:scale-110 active:scale-95 transition-all outline-none ${isChatOpen ? 'scale-90 rotate-12 opacity-90' : ''}`}
        aria-label="Toggle Chatbot"
      >
        <span className="relative flex">
           {!isChatOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>}
           <img src="https://static.vecteezy.com/system/resources/previews/010/893/116/non_2x/healthcare-medical-logo-and-icon-template-free-vector.jpg" className="w-8 h-8 rounded-full object-cover mix-blend-screen" alt="Bot Icon" style={{filter: 'brightness(100)'}} />
        </span>
      </button>

      <main className="relative z-10">
        <Hero />
        <Stats />
        <Features />
        
        {/* Chatbot section container with a subtle background split */}
        <div className="bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-sm py-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
          <Chatbot />
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="bg-brand-navy py-12 text-center text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
           <div className="text-xl font-bold text-white mb-2 tracking-tight">Dr<span className="text-brand-teal">Buddy</span></div>
           <p className="mb-6 max-w-md">An AI-driven public health assistant designed to empower rural and semi-urban communities.</p>
           <div className="w-16 h-1 bg-brand-teal rounded-full mb-6"></div>
           <p className="text-sm">Built by <span className="text-white font-medium">Prakash Nagaral</span> for Smart India Hackathon.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
