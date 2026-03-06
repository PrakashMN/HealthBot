import { useState } from 'react';
import axios from 'axios';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [language, setLanguage] = useState('en');

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // Add user message immediately
    const userMessage = { id: Date.now(), text, sender: 'user', timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://127.0.0.1:8001' 
        : 'https://backend-9t14.onrender.com';

      // Call the AI backend directly
      const response = await axios.post(`${BASE_URL}/chat`, {
        message: text,
        language,
        user_id: 'demo_user' 
      });

      const data = response.data;
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error("Error fetching AI response:", error);
      
      const fallbackMsg = {
        id: Date.now() + 2,
        text: `🤖 **HealthBot Assistant (Offline Mode)**\n\nI'm currently unable to reach the AI servers, but I can still help with basic guidance. Please verify your connection or try again later.`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return {
    messages,
    isTyping,
    language,
    setLanguage,
    sendMessage,
    clearChat
  };
}
