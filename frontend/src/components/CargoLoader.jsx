import React from 'react';
import { motion } from 'framer-motion';
import './CargoLoader.css';

const CargoLoader = () => {
  return (
    <div className="cargo-loader-overlay">
      <div className="loader-scene-cinematic">
        
        <svg viewBox="0 0 1000 500" className="scene-svg-cinematic" preserveAspectRatio="xMidYMid slice">
          {/* Deep Ocean & Night Sky Gradients */}
          <defs>
            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#020617"/>
              <stop offset="50%" stopColor="#0f172a"/>
              <stop offset="100%" stopColor="#1e293b"/>
            </linearGradient>
            <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B3D91" />
              <stop offset="100%" stopColor="#020617" />
            </linearGradient>
            <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="lightGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Sky Background */}
          <rect width="100%" height="500" fill="url(#nightSky)" />
          
          {/* Distant City/Port Lights */}
          <g opacity="0.3">
            <rect x="100" y="280" width="10" height="40" fill="#D4AF37" filter="url(#lightGlow)"/>
            <rect x="120" y="250" width="15" height="70" fill="#D4AF37" filter="url(#lightGlow)"/>
            <rect x="850" y="220" width="20" height="100" fill="#D4AF37" filter="url(#lightGlow)"/>
            <rect x="880" y="260" width="15" height="60" fill="#D4AF37" filter="url(#lightGlow)"/>
          </g>

          {/* Cinematic Cargo Ship Animating */}
          <motion.g 
             className="cargo-ship-master"
             animate={{ 
                 x: [-600, 150, 150, 1200],
                 y: [0, 5, -5, 0]
             }}
             transition={{
                 x: { times: [0, 0.3, 0.7, 1], duration: 9, repeat: Infinity, ease: "easeInOut" },
                 y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
             }}
          >
             {/* Massive Ship Hull */}
             <path d="M 150 400 L 650 400 L 750 310 L 100 310 Z" fill="#020617" stroke="#1e293b" strokeWidth="2" />
             <path d="M 100 310 L 750 310 L 750 325 L 120 325 Z" fill="#D4AF37" />
             <path d="M 120 325 L 750 325 L 750 330 L 130 330 Z" fill="#ffffff" opacity="0.2" />
             
             {/* Ship Bridge / Cabin */}
             <path d="M 150 310 L 150 180 L 250 180 L 280 310 Z" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
             <rect x="170" y="200" width="70" height="15" fill="#D4AF37" filter="url(#lightGlow)" opacity="0.8" />
             <rect x="170" y="230" width="70" height="15" fill="#D4AF37" filter="url(#lightGlow)" opacity="0.8" />
             
             {/* Radar / Comm Tower */}
             <rect x="190" y="120" width="5" height="60" fill="#475569" />
             <motion.line 
                x1="192" y1="120" x2="230" y2="100" 
                stroke="#D4AF37" strokeWidth="2"
                animate={{ rotate: [0, 360] }}
                style={{ transformOrigin: "192px 120px" }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
             />

             {/* Containers Stacked High */}
             <g className="cinematic-containers">
                 {/* Row 1 */}
                 <rect x="300" y="270" width="60" height="40" fill="#0B3D91" stroke="#1e293b" strokeWidth="1"/>
                 <rect x="365" y="270" width="60" height="40" fill="#1e293b" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="430" y="270" width="60" height="40" fill="#D4AF37" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="495" y="270" width="60" height="40" fill="#0B3D91" stroke="#1e293b" strokeWidth="1"/>
                 <rect x="560" y="270" width="60" height="40" fill="#1e293b" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="625" y="270" width="60" height="40" fill="#D4AF37" stroke="#0f172a" strokeWidth="1"/>
                 
                 {/* Row 2 */}
                 <rect x="300" y="230" width="60" height="40" fill="#1e293b" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="365" y="230" width="60" height="40" fill="#D4AF37" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="430" y="230" width="60" height="40" fill="#0B3D91" stroke="#1e293b" strokeWidth="1"/>
                 <rect x="495" y="230" width="60" height="40" fill="#D4AF37" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="560" y="230" width="60" height="40" fill="#0B3D91" stroke="#1e293b" strokeWidth="1"/>
                 
                 {/* Row 3 */}
                 <rect x="365" y="190" width="60" height="40" fill="#0B3D91" stroke="#1e293b" strokeWidth="1"/>
                 <rect x="430" y="190" width="60" height="40" fill="#1e293b" stroke="#0f172a" strokeWidth="1"/>
                 <rect x="495" y="190" width="60" height="40" fill="#D4AF37" stroke="#0f172a" strokeWidth="1"/>
             </g>
             
             {/* The Magic "AABHA IMPEX" Text Animation */}
             <motion.text 
               x="320" y="375" 
               fontSize="38" 
               fontWeight="900" 
               fontFamily="Inter, sans-serif" 
               letterSpacing="8"
               style={{ transformOrigin: "470px 360px" }}
               animate={{ 
                 scale: [1, 1, 2.5, 2.5, 1, 1],
                 y: [0, 0, -200, -200, 0, 0],
                 fill: ["#475569", "#475569", "#D4AF37", "#D4AF37", "#ffffff", "#475569"],
                 filter: ["none", "none", "url(#goldGlow)", "url(#goldGlow)", "url(#goldGlow)", "none"]
               }}
               transition={{
                 times: [0, 0.3, 0.4, 0.6, 0.7, 1],
                 duration: 9,
                 repeat: Infinity,
                 ease: "easeInOut"
               }}
             >
               AABHA IMPEX
             </motion.text>
          </motion.g>

          {/* Deep Ocean Foreground */}
          <motion.path 
             d="M 0 380 Q 100 350 200 380 T 400 380 T 600 380 T 800 380 T 1000 380 L 1000 500 L 0 500 Z"
             fill="#0f172a"
             opacity="0.9"
             animate={{ x: [0, -200] }}
             transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          <motion.path 
             d="M -200 395 Q -100 420 0 395 T 200 395 T 400 395 T 600 395 T 800 395 T 1000 395 T 1200 395 L 1200 500 L -200 500 Z"
             fill="url(#oceanGrad)"
             opacity="0.95"
             animate={{ x: [-200, 0] }}
             transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />
        </svg>

      </div>

      <div className="loader-text-wrapper-premium">
          <motion.div 
             className="brand-loader-name-gold"
             animate={{ opacity: [0, 1, 1, 0] }}
             transition={{ times: [0, 0.4, 0.6, 1], duration: 9, repeat: Infinity }}
          >
            INITIALIZING GLOBAL LOGISTICS...
          </motion.div>
          
          <div className="loading-progress-bar-premium">
             <motion.div 
               className="loading-progress-fill-gold"
               initial={{ width: "0%" }}
               animate={{ width: ["0%", "30%", "70%", "100%"] }}
               transition={{ times: [0, 0.3, 0.7, 1], duration: 9, repeat: Infinity, ease: "easeInOut" }}
             />
          </div>
      </div>
    </div>
  );
};

export default CargoLoader;
