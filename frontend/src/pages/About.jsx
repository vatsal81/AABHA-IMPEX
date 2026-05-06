import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Plus, Minus, HelpCircle, User, Award, ShieldCheck, Clock, Lightbulb, TrendingUp } from 'lucide-react';
import './About.css';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`faq-item-premium ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
      <div className="faq-question">
        <span>{question}</span>
        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="faq-answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <p>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const About = () => {
  const { t } = useTranslation();

  const faqs = [
    { q: "What payment terms do you accept?", a: "We primarily work with Irrevocable Letter of Credit (L/C) at sight and Telegraphic Transfer (T/T) with 30% advance and 70% against scan documents." },
    { q: "Do you provide customized packaging?", a: "Yes, we offer customized branding and packaging solutions in PP bags, Jute bags, and Corrugated boxes as per international buyer requirements." },
    { q: "Which ports do you export from?", a: "Most of our shipments are routed through Mundra and Kandla ports in Gujarat, ensuring efficient logistics to global destinations." },
    { q: "Are your products certified?", a: "Absolutely. We are APEDA, FSSAI, and ISO certified, ensuring every shipment meets global food safety and quality standards." }
  ];

  return (
    <div className="about-page">
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">OUR STORY</span>
            <h1>AABHA IMPEX</h1>
            <p>Empowering global commerce with integrity and quality.</p>
          </motion.div>
        </div>
      </section>

      {/* 1. Elite Editorial About Section */}
      <section className="section-padding about-editorial">
        <div className="container">
          <div className="editorial-layout">
            <motion.div 
              className="editorial-image-side"
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "circOut" }}
            >
              <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=1200" alt="Global Trade" className="editorial-img" />
              <div className="img-caption-float">
                 <span className="caption-num">01</span>
                 <p>Connecting continents through quality agriculture.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="editorial-content-side"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="editorial-label">ESTABLISHED EXCELLENCE</span>
              <h2 className="editorial-title">Pioneering the Future of <span className="text-gold">Agricultural Export</span></h2>
              
              <div className="editorial-text">
                <p className="lead-para">
                  Our journey began with a single vision: to bridge the gap between India's rich agricultural heritage and the global market's demand for purity.
                </p>
                <p>
                  Originally incorporated as a specialized merchant export house, AABHA IMPEX has evolved into a diversified global entity. We have transitioned from industrial materials to a curated portfolio of premium agricultural produce, including cumin seeds, high-grade rice, wheat, and exotic spices.
                </p>
                <p>
                  Today, we operate a sophisticated supply chain that spans Asia, Europe, and the Middle East. Our strategy is built on agility—switching between commodities to match market dynamics while maintaining an unwavering commitment to quality and ethical trade.
                </p>
                
                <div className="editorial-stats">
                   <div className="e-stat"><span>15+</span> Years Exp.</div>
                   <div className="e-stat"><span>100%</span> Compliance</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Vision and Mission Section */}
      <section className="vision-mission-section reveal-up">
        <div className="container">
          <div className="vm-wrapper">
            <div className="vm-grid">
              
              {/* Vision */}
              <motion.div 
                className="vm-box glass-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="vm-icon-wrapper">
                  <Eye size={100} className="vm-icon" strokeWidth={1} />
                </div>
                <h3>Vision</h3>
                <div className="heading-line"></div>
                <p>
                  Being a global entity in the field of International Trade, our vision is to provide a reliable market and fair prices for commodities to our customers. To deliver high quality products in time, consistently through a customer centric approach.
                </p>
                <p>
                  With a vision to grow, commitment to perform and excellence to delivering the very best and to be the strongest link between suppliers and consumers globally. We aim to enlarge our capability continuously in the value chain and to be the most preferred player with commitment to quality, safety, environment, cost economics and delivering.
                </p>
              </motion.div>

              {/* Mission */}
              <motion.div 
                className="vm-box glass-panel"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="vm-icon-wrapper">
                  <Target size={100} className="vm-icon" strokeWidth={1} />
                </div>
                <h3>Mission</h3>
                <div className="heading-line"></div>
                <p>
                  While holding a deep respect for all individuals inside and outside the company and the community at large, the company lays down its mission statement:
                </p>
                <ul>
                  <li>To make, distribute and sell the finest quality of products and promote business practices that respect the Earth and the Environment.</li>
                  <li>Regularly evaluate and improve our capabilities by investing in training and thereby responding to changing client needs.</li>
                  <li>To imbibe, practice & maintain the quality of products at the apex of its purity, originality, contamination free standards at all analytical parameters of its best quality.</li>
                </ul>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Modern Process Section */}
      <section className="section-padding process-section bg-alt reveal-up">
        <div className="container">
          <div className="section-header text-center">
             <span className="label">OUR WORKFLOW</span>
             <h2>The AABHA <span className="text-gold">Standard</span></h2>
             <p className="section-desc">A meticulous journey from the farm to the global table.</p>
          </div>

          <div className="process-timeline">
            {[
              { num: '01', title: 'Ethical Sourcing', desc: 'Direct partnerships with certified farmers across India.' },
              { num: '02', title: 'Quality Analysis', desc: 'Rigorous laboratory testing for purity and moisture levels.' },
              { num: '03', title: 'Precision Packing', desc: 'Customized international-standard moisture-proof packaging.' },
              { num: '04', title: 'Global Logistics', desc: 'Seamless export through Mundra and Kandla ports.' }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                className="process-step glass-panel reveal-up"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="step-num">{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Management Team Section */}
      <section className="section-padding team-section reveal-up">
        <div className="container">
          <div className="team-header">
            <span className="sub-heading">TEAM MEMBER</span>
            <h2>Management Team</h2>
            <p>The management of "AABHA" group of companies represent the wisdom, experience and tact of the old along with the energetic efficiency of the young.</p>
            <div className="heading-line"></div>
          </div>

          <div className="team-grid">
            {[
              { name: "Khushal Patel", role: "Executive Director" },
              { name: "Prince Patel", role: "Managing Director" },
              { name: "P Kothiya", role: "Operations Head" }
            ].map((member, i) => (
              <motion.div 
                key={i} 
                className="team-card glass-panel reveal-up"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="team-avatar-placeholder">
                  <User size={120} color="#cbd5e1" strokeWidth={1} />
                </div>
                <div className="team-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding trade-faq-section reveal-up">
        <div className="container">
           <div className="faq-wrapper-premium glass-panel">
              <div className="faq-info">
                 <span className="label">KNOWLEDGE CENTER</span>
                 <h2>Global Trade <span className="text-gold">FAQ</span></h2>
                 <p>Essential information about our export operations and standards.</p>
                 <HelpCircle size={100} className="faq-icon-bg" />
              </div>
              <div className="faq-list-premium">
                 {faqs.map((faq, i) => <FAQItem key={i} question={faq.q} answer={faq.a} />)}
              </div>
           </div>
        </div>
      </section>

    </div>
  );
};

export default About;
