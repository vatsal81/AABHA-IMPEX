import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Calendar as CalendarIcon } from 'lucide-react';
import './CropCalendar.css';

const CropCalendar = () => {
  const crops = [
    { name: 'Cumin Seeds', harvest: [2, 3, 4], sowing: [10, 11] },
    { name: 'Red Chili', harvest: [1, 2, 3, 11, 12], sowing: [6, 7, 8] },
    { name: 'Peanuts', harvest: [10, 11], sowing: [6, 7] },
    { name: 'Turmeric', harvest: [1, 2, 3], sowing: [5, 6] },
    { name: 'Sesame Seeds', harvest: [10, 11], sowing: [7, 8] }
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="crop-calendar-card glass-panel">
      <div className="cc-header">
        <CalendarIcon className="text-gold" size={20} />
        <h4>Annual Crop Cycle</h4>
      </div>
      <p className="cc-desc">Harvesting & Sowing periods for major commodities.</p>
      
      <div className="cc-months-header">
        {months.map(m => <span key={m}>{m[0]}</span>)}
      </div>

      <div className="cc-rows">
        {crops.map((crop, i) => (
          <div key={i} className="cc-row">
            <span className="cc-crop-name">{crop.name}</span>
            <div className="cc-track">
              {months.map((_, idx) => {
                const monthIdx = idx + 1;
                const isHarvest = crop.harvest.includes(monthIdx);
                const isSowing = crop.sowing.includes(monthIdx);
                return (
                  <div 
                    key={idx} 
                    className={`cc-cell ${isHarvest ? 'harvest' : ''} ${isSowing ? 'sowing' : ''}`}
                    title={`${crop.name} - ${isHarvest ? 'Harvesting' : isSowing ? 'Sowing' : ''}`}
                  ></div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="cc-legend">
        <div className="legend-item"><span className="dot harvest"></span> Harvest</div>
        <div className="legend-item"><span className="dot sowing"></span> Sowing</div>
      </div>
    </div>
  );
};

export default CropCalendar;
