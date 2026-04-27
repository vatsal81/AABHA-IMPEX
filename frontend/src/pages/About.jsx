import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Target, Eye, Plus, Minus, HelpCircle } from 'lucide-react';
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

      {/* 1. About Company Section */}
      <section className="section-padding about-company-section">
        <div className="container">
          <div className="company-grid">
            <motion.div 
              className="company-image-container"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="image-offset-border"></div>
              <img src="https://images.unsplash.com/photo-1599330231908-09559f214690?auto=format&fit=crop&q=80&w=800" alt="AABHA IMPEX Products" />
            </motion.div>
            
            <motion.div 
              className="company-text-container"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="sub-heading">ABOUT</span>
              <h2>AABHA IMPEX</h2>
              <div className="heading-line"></div>
              
              <p>
                Our Company was initially incorporated as a merchant export house specializing in premium agricultural produce and commodities. Keeping in view the demand in global markets, our Company diversified from export of industrial materials to export of agricultural produce and commodities. Since then, our Company has been engaged in exporting agricultural produce including premium seeds, pulses, and spices.
              </p>
              <p>
                Our Company is engaged into trading and marketing of agricultural produce and commodities such as cumin seeds, food grains like rice, wheat, corn, and pulses. We import and export in bulk quantities. Our major markets span across Asia, Europe, and the Middle East. We maintain stocks and distribute them to different institutional parties. We follow a standard packing process to ensure that quality and authentic taste of commodities remains intact.
              </p>
              <p>
                Our Company has developed a business strategy to switch over exports/imports from one commodity to another with change in demand or inconsistency in pricing during any season. This policy ensures we do not pass through a lean period.
              </p>
              <p>
                We are recognized by the Directorate General of Foreign Trade. We are registered with APEDA and the Federation of Indian Export Organizations. Our customer-oriented approach and cordial relations with them are the key strengths of our company. We aim to provide cost-effective solutions while adhering to the quality standards of the services.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. Vision and Mission Section */}
      <section className="vision-mission-section">
        <div className="container">
          <div className="vm-wrapper">
            <div className="vm-grid">
              
              {/* Vision */}
              <motion.div 
                className="vm-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                className="vm-box"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
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

      {/* 3. Management Team Section */}
      <section className="section-padding team-section">
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
                className="team-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
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
      <section className="section-padding trade-faq-section">
        <div className="container">
           <div className="faq-wrapper-premium">
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
