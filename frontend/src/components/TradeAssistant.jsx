import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ChevronRight, Sparkles } from 'lucide-react';
import { chatWithAssistant } from '../services/api';
import './TradeAssistant.css';

const TradeAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! I am your AABHA Trade Assistant (V2.5 Optimized). How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const suggestions = [
    'How to start export?',
    'Current Jeera prices',
    'Product catalog',
    'Get a quote'
  ];

  const handleSend = async (text) => {
    const msg = text || inputValue;
    if (!msg.trim()) return;

    const newMessages = [...messages, { type: 'user', text: msg }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const data = await chatWithAssistant(msg, newMessages);
      setMessages([...newMessages, { type: 'bot', text: data.response }]);
    } catch (error) {
      setMessages([...newMessages, { type: 'bot', text: "I encountered a connection error. Please try again in a moment." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="bot-trigger" onClick={() => setIsOpen(true)}>
        <motion.div 
          className="bot-icon-wrapper"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={28} />
          <motion.div 
            className="online-indicator"
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <span className="bot-tooltip">AABHA Assistant</span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="bot-window"
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="bot-header">
              <div className="bot-info">
                <div className="bot-avatar">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4>AABHA AI</h4>
                  <span>Trading Expert | Online</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close Assistant">
                <X size={20} />
              </button>
            </div>

            <div className="bot-messages">
              {messages.map((m, i) => (
                <motion.div 
                  key={i} 
                  className={`message-row ${m.type}`}
                  initial={{ opacity: 0, x: m.type === 'bot' ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="msg-bubble">{m.text}</div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div 
                  className="message-row bot"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="msg-bubble typing">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <motion.div 
                className="bot-suggestions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {suggestions.map((s, i) => (
                  <button key={i} onClick={() => handleSend(s)}>
                    {s} <ChevronRight size={14} />
                  </button>
                ))}
              </motion.div>
            )}

            <div className="bot-input-area">
              <input 
                type="text" 
                placeholder="How can I help with your trade?" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={() => handleSend()} disabled={!inputValue.trim()}>
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TradeAssistant;
