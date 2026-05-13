import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MessageCircle, X, Plus } from 'lucide-react';
import './QuickActionFAB.css';

const QuickActionFAB = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { 
      icon: <Phone size={24} />, 
      label: 'Call', 
      href: 'tel:+919426868883', 
      color: '#d4af37' 
    },
    { 
      icon: <MessageCircle size={24} />, 
      label: 'WhatsApp', 
      href: 'https://wa.me/919426868883', 
      color: '#25D366' 
    },
    { 
      icon: <Mail size={24} />, 
      label: 'Email', 
      href: 'mailto:aabhaimpex209@gmail.com', 
      color: '#EA4335' 
    }
  ];

  return (
    <div className="fab-container">
      <AnimatePresence>
        {isOpen && (
          <div className="fab-options">
            {actions.map((action, i) => (
              <motion.a
                key={i}
                href={action.href}
                className="fab-option"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ delay: i * 0.1 }}
                style={{ backgroundColor: action.color }}
                title={action.label}
              >
                {action.icon}
                <span className="fab-label">{action.label}</span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <motion.button
        className={`fab-main ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <Plus size={32} />
      </motion.button>
    </div>
  );
};

export default QuickActionFAB;
