import React from 'react';
import { motion } from 'framer-motion';
import videoSrc from '../assets/Firefly make it image to video 739962.mp4';
import './CargoLoader.css';

const CargoLoader = ({ onFinish }) => {
  return (
    <div className="cargo-loader-overlay">
      <video 
        autoPlay 
        muted 
        playsInline 
        className="bg-video"
        onEnded={onFinish}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

export default CargoLoader;



