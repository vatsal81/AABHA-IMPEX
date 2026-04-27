import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, Globe, Loader2, CheckCircle, Clock, ChevronRight, ChevronLeft, Package, Truck } from 'lucide-react';
import { submitInquiry } from '../services/api';
import { generateQuotePDF } from '../utils/quoteGenerator';
import toast from 'react-hot-toast';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    product: '',
    quantity: '',
    incoterms: 'FOB',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Combine fields for the backend if needed, or send as is
      const fullMessage = `Product: ${formData.product}\nQuantity: ${formData.quantity}\nIncoterms: ${formData.incoterms}\n\nMessage: ${formData.message}`;
      const submissionData = {
        ...formData,
        message: fullMessage
      };
      
      await submitInquiry(submissionData);
      generateQuotePDF(formData); // Download PDF
      setSubmitted(true);
      toast.success(t('contact_page.form.toast_success'));
      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', product: '', quantity: '', incoterms: 'FOB', message: '' });
      setStep(1);
    } catch (err) {
      setError(t('contact_page.form.toast_error'));
      toast.error(t('contact_page.form.toast_error'));
    }
    setLoading(false);
  };

  return (
    <div className="contact-page">
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">{t('contact_page.header.label')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('contact_page.header.title') }}></h1>
            <p>{t('contact_page.header.desc')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="contact-info-cards">
            {[
              { icon: <Mail size={24} />, title: t('contact_page.cards.email'), details: ["aabhaimpex209@gmail.com", "info@aabhaimpex.com"] },
              { icon: <Phone size={24} />, title: t('contact_page.cards.call'), details: ["+91 94268 68883", "+91 82002 07666"] },
              { icon: <MapPin size={24} />, title: t('contact_page.cards.visit'), details: ["Vavdi Industrial Area,", "Rajkot, Gujarat, India"] },
              { icon: <Clock size={24} />, title: t('contact_page.cards.hours'), details: [t('contact_page.cards.mon_sat'), t('contact_page.cards.sun')] }
            ].map((card, i) => (
              <motion.div 
                key={i} 
                className="info-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="icon-circle">{card.icon}</div>
                <h3>{card.title}</h3>
                {card.details.map((line, idx) => <p key={idx}>{line}</p>)}
              </motion.div>
            ))}
          </div>

          <div className="contact-wrapper">
            <motion.div 
              className="contact-form-section-premium"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="form-container-premium">
                {submitted ? (
                  <div className="success-message">
                    <div className="success-icon">
                      <CheckCircle size={80} color="var(--secondary)" />
                    </div>
                    <h3>{t('contact_page.form.success_title')}</h3>
                    <p>{t('contact_page.form.success_desc')}</p>
                    <button className="btn btn-primary" onClick={() => setSubmitted(false)}>{t('contact_page.form.btn_another')}</button>
                  </div>
                ) : (
                  <>
                    <div className="form-header-v2">
                       <h2>{t('contact_page.form.title')}</h2>
                       <div className="step-indicator">
                          <div className={`step ${step === 1 ? 'active' : 'completed'}`}>1</div>
                          <div className="line"></div>
                          <div className={`step ${step === 2 ? 'active' : ''}`}>2</div>
                       </div>
                    </div>
                    
                    {error && <p className="error-text">{error}</p>}
                    
                    <form onSubmit={handleSubmit}>
                      <AnimatePresence mode="wait">
                        {step === 1 ? (
                          <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                          >
                            <div className="form-row">
                              <div className="form-group">
                                <label>{t('contact_page.form.name')}</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} />
                              </div>
                              <div className="form-group">
                                <label>{t('contact_page.form.email')}</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label>{t('contact_page.form.phone')}</label>
                                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                              </div>
                              <div className="form-group">
                                <label>{t('contact_page.form.subject')}</label>
                                <select name="subject" value={formData.subject} onChange={handleChange}>
                                  <option value="General Inquiry">{t('contact_page.form.subjects.general')}</option>
                                  <option value="Product Sourcing">{t('contact_page.form.subjects.sourcing')}</option>
                                  <option value="Bulk Order">{t('contact_page.form.subjects.bulk')}</option>
                                  <option value="Partnership">{t('contact_page.form.subjects.partnership')}</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-actions-premium">
                               <button type="button" className="btn btn-primary" onClick={nextStep}>
                                  Next Step <ChevronRight size={18} />
                               </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                          >
                            <div className="form-row">
                              <div className="form-group">
                                <label><Package size={14} /> Product Selection</label>
                                <input type="text" name="product" placeholder="e.g. Cumin Seeds" value={formData.product} onChange={handleChange} />
                              </div>
                              <div className="form-group">
                                <label>Quantity Required</label>
                                <input type="text" name="quantity" placeholder="e.g. 5 Metric Tons" value={formData.quantity} onChange={handleChange} />
                              </div>
                            </div>
                            <div className="form-row">
                              <div className="form-group">
                                <label><Truck size={14} /> Preferred Incoterms</label>
                                <select name="incoterms" value={formData.incoterms} onChange={handleChange}>
                                  <option value="FOB">FOB (Free on Board)</option>
                                  <option value="CIF">CIF (Cost, Insurance, Freight)</option>
                                  <option value="EXW">EXW (Ex Works)</option>
                                  <option value="CFR">CFR (Cost and Freight)</option>
                                </select>
                              </div>
                            </div>
                            <div className="form-group">
                              <label>{t('contact_page.form.message')}</label>
                              <textarea rows="4" name="message" required value={formData.message} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-actions-premium">
                               <button type="button" className="btn btn-outline" onClick={prevStep}>
                                  <ChevronLeft size={18} /> Back
                               </button>
                               <button type="submit" className="btn btn-primary" disabled={loading}>
                                  {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Inquiry</>}
                               </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div 
              className="map-container-premium"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
                <div className="map-glass-overlay">
                   <MapPin size={32} className="text-gold" />
                   <h3>Visit our Headquarters</h3>
                   <p>Vavdi Industrial Area, Rajkot</p>
                </div>
                <iframe 
                    title="AABHA IMPEX Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.686159674068!2d70.7818788!3d22.2519134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca18928646b9%3A0x7d25e0e02621184a!2sVavdi%20Industrial%20Area%2C%20Rajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1713870000000!5m2!1sen!2sin" 
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                ></iframe>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
