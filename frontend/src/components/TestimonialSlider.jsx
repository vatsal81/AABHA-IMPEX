import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import './TestimonialSlider.css';

const TestimonialSlider = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    })
  };

  const current = testimonials[currentIndex];

  return (
    <div className="premium-testimonial-slider">
      <div className="slider-container">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 }
            }}
            className="testimonial-slide"
          >
            <div className="testimonial-content-card">
              <div className="quote-badge">
                <Quote size={40} fill="var(--secondary)" color="var(--secondary)" opacity={0.2} />
              </div>
              
              <p className="testimonial-text">"{current.text}"</p>
              
              <div className="testimonial-author-box">
                <div className="author-avatar-premium">
                  {current.name ? current.name[0] : 'U'}
                </div>
                <div className="author-info-premium">
                  <h4>{current.name}</h4>
                  <span>{current.role}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="slider-controls">
          <button className="slider-nav-btn" onClick={handlePrev}><ChevronLeft size={24} /></button>
          <div className="slider-dots">
            {testimonials.map((_, idx) => (
              <button 
                key={idx} 
                className={`dot-btn ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
              />
            ))}
          </div>
          <button className="slider-nav-btn" onClick={handleNext}><ChevronRight size={24} /></button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
