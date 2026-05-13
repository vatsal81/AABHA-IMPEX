import React from 'react';
import { motion } from 'framer-motion';
import mapImage from '../assets/world-map-light.png';
import './WorldMap.css';

const WorldMap = () => {
  // Coordinates for the hubs (relative to 1000x500 container)
  const hubs = [
    { id: 'rajkot', x: 675, y: 250, name: 'Rajkot, India (HQ)' },
    { id: 'dubai', x: 610, y: 245, name: 'Dubai, UAE' },
    { id: 'singapore', x: 785, y: 320, name: 'Singapore' },
    { id: 'london', x: 480, y: 170, name: 'London, UK' },
    { id: 'newyork', x: 260, y: 195, name: 'New York, USA' },
    { id: 'capetown', x: 535, y: 410, name: 'Cape Town, SA' },
    { id: 'hamburg', x: 505, y: 155, name: 'Hamburg, DE' }
  ];

  const routes = [
    { from: 'rajkot', to: 'dubai' },
    { from: 'rajkot', to: 'singapore' },
    { from: 'dubai', to: 'london' },
    { from: 'dubai', to: 'hamburg' },
    { from: 'london', to: 'newyork' },
    { from: 'singapore', to: 'capetown' }
  ];

  return (
    <motion.div 
      className="official-map-display"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="map-image-container">
        <img 
          src={mapImage} 
          alt="AABHA IMPEX Global Presence" 
          className="official-map-img"
        />
        
        {/* Animated SVG Routes Overlay */}
        <svg viewBox="0 0 1000 500" className="map-overlay-svg">
          <defs>
            <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
              <stop offset="50%" stopColor="rgba(212, 175, 55, 0.8)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
            </linearGradient>
            <filter id="hubGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw Routes */}
          {routes.map((route, idx) => {
            const start = hubs.find(h => h.id === route.from);
            const end = hubs.find(h => h.id === route.to);
            const midX = (start.x + end.x) / 2;
            const midY = (start.y + end.y) / 2 - 20; // Curved effect

            return (
              <g key={idx}>
                <motion.path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="rgba(212, 175, 55, 0.2)"
                  strokeWidth="1"
                />
                <motion.path
                  d={`M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`}
                  fill="none"
                  stroke="url(#routeGrad)"
                  strokeWidth="2"
                  strokeDasharray="10, 20"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: -100 }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: idx * 0.5 
                  }}
                />
              </g>
            );
          })}

          {/* Draw Hubs */}
          {hubs.map((hub) => (
            <g key={hub.id} className="map-hub-group">
              <motion.circle
                cx={hub.x}
                cy={hub.y}
                r="4"
                fill="#d4af37"
                filter="url(#hubGlow)"
              />
              <motion.circle
                cx={hub.x}
                cy={hub.y}
                r="10"
                fill="none"
                stroke="rgba(212, 175, 55, 0.4)"
                strokeWidth="1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
              {/* Tooltip hint on hover (CSS handled) */}
              <circle cx={hub.x} cy={hub.y} r="15" fill="transparent" className="hub-hitbox">
                <title>{hub.name}</title>
              </circle>
            </g>
          ))}
        </svg>

        <div className="map-reflection-overlay"></div>
      </div>
    </motion.div>
  );
};

export default WorldMap;
