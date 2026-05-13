import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';
import './TradeIntelligenceBar.css';

const TradeIntelligenceBar = () => {
  const intelData = [
    { label: 'Cumin Seeds (Premium)', price: '₹28,450', change: '+2.4%', up: true },
    { label: 'Red Chili (Guntur)', price: '₹18,200', change: '-0.8%', up: false },
    { label: 'Peanuts (Bold)', price: '₹6,400', change: '+1.2%', up: true },
    { label: 'USD/INR', price: '₹83.42', change: '+0.05%', up: true },
    { label: 'EUR/INR', price: '₹90.15', change: '-0.12%', up: false },
    { label: 'Dry Ginger', price: '₹32,000', change: '+3.1%', up: true },
    { label: 'Turmeric (Finger)', price: '₹14,800', change: '+0.5%', up: true }
  ];

  return (
    <div className="intelligence-bar-wrapper">
      <div className="intel-label">
        <Info size={14} /> LIVE TRADE INTELLIGENCE
      </div>
      <div className="ticker-wrap">
        <motion.div 
          className="ticker"
          animate={{ x: [0, -1000] }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          {[...intelData, ...intelData].map((item, i) => (
            <div key={i} className="ticker-item">
              <span className="ticker-name">{item.label}</span>
              <span className="ticker-price">{item.price}</span>
              <span className={`ticker-change ${item.up ? 'up' : 'down'}`}>
                {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {item.change}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TradeIntelligenceBar;
