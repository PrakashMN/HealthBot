import React from 'react';
import { Shield, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToChatbot = () => {
    document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-brand-teal/20 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/20 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50 animate-blob" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-300/20 rounded-full blur-[100px] -z-10 mix-blend-multiply opacity-50 animate-blob" style={{ animationDelay: '4s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center mb-10"
        >
          {/* Logo container mimicking the SVG design */}
          <div className="flex items-center gap-3 md:gap-4 glass-card px-6 py-4 md:px-8 md:py-5 rounded-3xl shadow-2xl">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-brand-blue to-brand-teal flex items-center justify-center shadow-inner relative overflow-hidden">
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-white z-10" />
              <div className="absolute inset-0 bg-white/20 rotate-45 transform translate-y-1/2"></div>
            </div>
            <div className="text-left flex flex-col justify-center">
               <div className="flex items-baseline tracking-tight">
                  <span className="text-4xl md:text-6xl font-bold text-brand-navy dark:text-white leading-none">Dr</span>
                  <span className="text-4xl md:text-6xl font-medium text-brand-teal leading-none">Buddy</span>
               </div>
               <span className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">Designed by Prakash Nagaral</span>
            </div>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-light leading-relaxed"
        >
          AI health assistant empowering communities with intelligent, accessible, and multilingual care.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-12 flex justify-center gap-4"
        >
          <button 
            onClick={scrollToChatbot}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-brand-teal to-brand-medical px-8 py-4 text-lg font-bold text-white shadow-xl shadow-brand-teal/20 transition-all hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 bg-white/20 transition-opacity opacity-0 group-hover:opacity-100"></span>
            <Sparkles className="w-5 h-5 animate-pulse" />
            Interact with DrBuddy
          </button>
        </motion.div>
      </div>
    </div>
  );
}
