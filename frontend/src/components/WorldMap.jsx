import React from 'react';
import { motion } from 'framer-motion';
import mapImage from '../assets/world-map-light.png';
import './WorldMap.css';

const WorldMap = () => {
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
        <div className="map-reflection-overlay"></div>
      </div>
    </motion.div>
  );
};

export default WorldMap;
