import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Bot, User, Send, ThumbsUp, ThumbsDown, UserCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import { useChat } from '../hooks/useChat';

export function Chatbot({ isFloating = false, onClose }) {
  const { messages, isTyping, language, setLanguage, sendMessage, clearChat } = useChat();
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      sendMessage(inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  const handleQuickAction = (action) => {
    const actions = {
      symptoms: "I have been experiencing fever, headache, and body aches for the past 2 days. What should I do?",
      vaccine: "My 6-month-old baby is due for vaccinations. What vaccines should they receive at this age?",
      prevention: "Can you give me tips to prevent seasonal illnesses during monsoon season?",
      emergency: "I'm experiencing severe chest pain and shortness of breath. Please help!"
    };
    sendMessage(actions[action]);
  };

  return (
    <AnimatePresence>
    <div id={isFloating ? "floating-chatbot" : "chatbot"} className={isFloating ? "fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[450px] z-[60] shadow-2xl origin-bottom-right" : "w-full max-w-4xl mx-auto mt-12 mb-20 px-4"}>
      {!isFloating && (
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3 mb-3 text-brand-dark dark:text-white">
          <Bot className="w-10 h-10 text-brand-teal" />
          Interactive AI Assistant
        </h2>
        <p className="text-slate-600 dark:text-slate-400">Experience the AI-powered health assistant in action with native multilingual support</p>
      </div>
      )}

      {/* Language Selector */}
      {!isFloating && (
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[
          { code: 'en', label: 'English' },
          { code: 'hi', label: 'हिंदी' },
          { code: 'bn', label: 'বাংলা' },
          { code: 'kn', label: 'ಕನ್ನಡ' },
          { code: 'or', label: 'ଓଡ଼ିଆ' }
        ].map(lang => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-5 py-2 rounded-full border transition-all duration-300 font-medium ${
                language === lang.code 
                ? 'bg-brand-teal text-white border-brand-teal shadow-lg shadow-brand-teal/25' 
                : 'bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-teal'
              }`}
            >
              {lang.label}
            </button>
        ))}
      </div>
      )}

      <motion.div 
         initial={isFloating ? { opacity: 0, scale: 0.8, y: 50 } : false}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         exit={{ opacity: 0, scale: 0.8, y: 50 }}
         className={`glass-card rounded-2xl overflow-hidden flex flex-col ${isFloating ? 'h-[600px] border-brand-teal/30' : 'h-[650px]'}`}
      >
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-medical p-4 sm:p-5 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner block">
                <Bot size={24} />
             </div>
             <div>
                <h3 className="text-white font-bold text-lg m-0 leading-tight">DrBuddy Assistant</h3>
                 <div className="flex items-center gap-2 text-blue-100 text-sm mt-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  Online
                </div>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={clearChat} className="text-white/80 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/10 hidden sm:block">
              Clear
            </button>
            {isFloating && (
               <button onClick={onClose} className="text-white/80 hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
               </button>
            )}
          </div>
        </div>

        {/* Message Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 chat-scroll bg-slate-50/50 dark:bg-slate-900/50">
           <AnimatePresence initial={false}>
              {messages.length === 0 && (
                 <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center h-full text-center space-y-4"
                 >
                    <div className="w-16 h-16 rounded-full bg-brand-teal/10 text-brand-teal flex items-center justify-center mb-2">
                       <Bot size={32} />
                    </div>
                    <p className="text-slate-500 max-w-sm">I'm your AI health assistant. I can help with symptom checking, vaccine schedules, and preventive care tips.</p>
                 </motion.div>
              )}

              {messages.map((msg, index) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className={`flex mb-6 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex-shrink-0 flex items-center justify-center mr-3 mt-1">
                      <Bot size={16} />
                    </div>
                  )}
                  
                  <div className={`max-w-[85%] md:max-w-[75%] px-5 py-4 rounded-2xl shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-brand-blue to-indigo-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'
                  }`}>
                    {msg.sender === 'bot' ? (
                      <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-headings:mb-2 prose-ul:my-2 max-w-none">
                         <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
                           {msg.text.replace(/•/g, '-')}
                         </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    )}
                    
                    <div className={`text-[11px] mt-2 opacity-70 flex justify-between items-center ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-500'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      {msg.sender === 'bot' && (
                        <div className="flex gap-2">
                           <button className="hover:text-brand-teal transition-colors"><ThumbsUp size={14} /></button>
                           <button className="hover:text-red-500 transition-colors"><ThumbsDown size={14} /></button>
                        </div>
                      )}
                    </div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 flex-shrink-0 flex items-center justify-center ml-3 mt-1">
                      <UserCircle2 size={16} />
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                 <motion.div
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="flex justify-start mb-6"
                 >
                   <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex-shrink-0 flex items-center justify-center mr-3 mt-1">
                      <Bot size={16} />
                   </div>
                   <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-5 py-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1 items-center">
                     <div className="w-2 h-2 rounded-full bg-brand-teal animate-bounce" style={{ animationDelay: '0ms' }} />
                     <div className="w-2 h-2 rounded-full bg-brand-teal animate-bounce" style={{ animationDelay: '150ms' }} />
                     <div className="w-2 h-2 rounded-full bg-brand-teal animate-bounce" style={{ animationDelay: '300ms' }} />
                   </div>
                 </motion.div>
              )}
           </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700">
           {/* Quick Actions */}
           <div className="flex overflow-x-auto gap-2 mb-4 pb-2 chat-scroll">
              {[
                { label: 'Check Symptoms', action: 'symptoms', color: 'text-rose-500 bg-rose-50 border-rose-100' },
                { label: 'Vaccination Info', action: 'vaccine', color: 'text-blue-500 bg-blue-50 border-blue-100' },
                { label: 'Prevention Tips', action: 'prevention', color: 'text-green-500 bg-green-50 border-green-100' },
                { label: 'Emergency Help', action: 'emergency', color: 'text-amber-600 bg-amber-50 border-amber-100' }
              ].map(item => (
                 <button 
                   key={item.action}
                   onClick={() => handleQuickAction(item.action)}
                   className={`flex-shrink-0 px-3 py-1.5 rounded-lg border text-sm font-medium transition-transform hover:scale-105 active:scale-95 ${item.color} dark:bg-slate-700 dark:border-slate-600`}
                 >
                   {item.label}
                 </button>
              ))}
           </div>
           
           <form onSubmit={handleSubmit} className="flex gap-2">
               <input 
                 ref={inputRef}
                 type="text" 
                 disabled={isTyping}
                 placeholder={isTyping ? "HealthBot is typing..." : "Type your question..."}
                 className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-teal/50 focus:border-brand-teal dark:text-white transition-shadow text-sm"
               />
               <button 
                 type="submit"
                 disabled={isTyping}
                 className="bg-brand-teal hover:bg-brand-medical disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white rounded-xl px-4 flex items-center justify-center transition-colors shadow-sm active:scale-95"
               >
                 <Send size={18} />
               </button>
            </form>
         </div>
       </motion.div>
     </div>
     </AnimatePresence>
   );
 }
