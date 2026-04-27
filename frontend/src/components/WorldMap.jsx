import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const WorldMap = ({ countries }) => {
  const [hoveredRegion, setHoveredRegion] = useState(null);

  // Simplified Region Coordinates (Relative to 800x400 SVG)
  const regions = [
    { id: 'middle_east', label: 'Middle East', path: 'M450,150 L500,150 L520,200 L480,220 L440,200 Z', color: '#D4AF37' },
    { id: 'europe', label: 'Europe', path: 'M400,100 L480,100 L500,150 L420,150 Z', color: '#E5C100' },
    { id: 'asia', label: 'Asia', path: 'M500,150 L700,150 L750,300 L550,300 Z', color: '#B8860B' },
    { id: 'americas', label: 'Americas', path: 'M50,100 L250,100 L300,350 L100,350 Z', color: '#DAA520' }
  ];

  return (
    <div className="interactive-map-container">
      <svg viewBox="0 0 800 400" className="world-svg">
        {/* Simplified Background Map Shape */}
        <path 
           d="M50,100 H750 V350 H50 Z" 
           fill="#172A45" 
           opacity="0.3" 
        />
        
        {regions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            fill={hoveredRegion === region.id ? region.color : 'rgba(212, 175, 55, 0.2)'}
            stroke={region.color}
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onMouseEnter={() => setHoveredRegion(region.id)}
            onMouseLeave={() => setHoveredRegion(null)}
            style={{ cursor: 'pointer' }}
          />
        ))}
      </svg>

      <AnimatePresence>
        {hoveredRegion && (
          <motion.div 
            className="map-tooltip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <h4>{regions.find(r => r.id === hoveredRegion).label}</h4>
            <ul>
               {countries.find(c => c.region.toLowerCase().includes(hoveredRegion.split('_')[0]))?.list.map((item, idx) => (
                 <li key={idx}><CheckCircle size={12} /> {item}</li>
               ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WorldMap;
