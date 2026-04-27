import React from 'react';
import logoImg from '../assets/ChatGPT Image Apr 24, 2026, 03_53_04 PM.png';

const Logo = ({ size = 45, light = true }) => {
  return (
    <div className="logo-wrapper" style={{ height: size, display: 'flex', alignItems: 'center' }}>
      <img 
        src={logoImg} 
        alt="AABHA IMPEX" 
        style={{ 
            height: '100%', 
            width: 'auto', 
            objectFit: 'contain',
            /* 
               The logo has dark blue text. On a dark navy navbar, we need to make it white.
               We use brightness(0) invert(1) to make the whole logo white/light.
            */
            filter: light ? 'brightness(0) invert(1)' : 'none'
        }} 
      />
    </div>
  );
};

export default Logo;
