import React from 'react';
import { motion } from 'framer-motion';
import { Ship, Plane, Package, Globe, Anchor, Truck } from 'lucide-react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const icons = [
    { Icon: Ship, size: 40, top: '10%', left: '5%', duration: 25 },
    { Icon: Plane, size: 30, top: '15%', left: '80%', duration: 18 },
    { Icon: Package, size: 25, top: '40%', left: '15%', duration: 22 },
    { Icon: Globe, size: 50, top: '60%', left: '85%', duration: 30 },
    { Icon: Anchor, size: 35, top: '80%', left: '10%', duration: 28 },
    { Icon: Truck, size: 35, top: '50%', left: '70%', duration: 20 },
    { Icon: Ship, size: 30, top: '30%', left: '90%', duration: 35 },
    { Icon: Package, size: 20, top: '70%', left: '40%', duration: 24 },
  ];

  return (
    <div className="animated-bg-container">
      {/* Floating Particles/Shapes */}
      <div className="bg-gradient-mesh"></div>
      <div className="bg-lines"></div>
      
      {/* Animated Trade Icons */}
      {icons.map((item, index) => (
        <motion.div
          key={index}
          className="floating-icon"
          style={{
            top: item.top,
            left: item.left,
            color: 'var(--secondary)',
            opacity: 0.15,
            position: 'absolute',
            filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))'
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <item.Icon size={item.size} />
        </motion.div>
      ))}

      {/* Decorative Blur Orbs */}
      <motion.div 
        className="blur-orb orb-1"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity }}
      />
      <motion.div 
        className="blur-orb orb-2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 20, repeat: Infinity }}
      />
    </div>
  );
};

export default AnimatedBackground;
