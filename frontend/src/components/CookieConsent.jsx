import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Check } from 'lucide-react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="cookie-consent-overlay"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="cookie-card">
            <div className="cookie-content">
              <div className="cookie-icon">
                <Shield size={24} className="text-gold" />
              </div>
              <div className="cookie-text">
                <h3>Global Compliance & Privacy</h3>
                <p>
                  We use cookies to enhance your experience, serve personalized content, and analyze our global traffic. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
            </div>
            <div className="cookie-actions">
              <button className="btn-cookie-secondary" onClick={handleDecline}>
                Decline
              </button>
              <button className="btn-cookie-primary" onClick={handleAccept}>
                <Check size={18} /> Accept All
              </button>
            </div>
            <button className="cookie-close" onClick={() => setIsVisible(false)}>
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
