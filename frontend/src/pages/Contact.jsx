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
          <div className="premium-contact-grid">
            <motion.div 
              className="contact-form-side"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="form-card-elite">
                {submitted ? (
                  <div className="success-elite">
                    <CheckCircle size={60} className="text-gold" />
                    <h3>Inquiry Received</h3>
                    <p>Our trade specialists will contact you within 24 business hours.</p>
                    <button className="btn-gold-filled" onClick={() => setSubmitted(false)}>Send Another</button>
                  </div>
                ) : (
                  <>
                    <div className="form-title-area">
                       <h2>Connect with <span className="text-gold">AABHA</span></h2>
                       <p>Start your global trade partnership today.</p>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="elite-form">
                       <div className="form-grid-2">
                          <div className="input-group-elite">
                             <label>Full Name</label>
                             <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                          </div>
                          <div className="input-group-elite">
                             <label>Email Address</label>
                             <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                          </div>
                       </div>
                       
                       <div className="form-grid-2">
                          <div className="input-group-elite">
                             <label>Phone Number</label>
                             <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 ..." />
                          </div>
                          <div className="input-group-elite">
                             <label>Subject</label>
                             <select name="subject" value={formData.subject} onChange={handleChange}>
                               <option value="General Inquiry">General Inquiry</option>
                               <option value="Bulk Order">Bulk Order</option>
                               <option value="Product Sourcing">Product Sourcing</option>
                             </select>
                          </div>
                       </div>

                       <div className="input-group-elite">
                          <label>Message</label>
                          <textarea rows="5" name="message" required value={formData.message} onChange={handleChange} placeholder="Tell us about your requirements..."></textarea>
                       </div>

                       <button type="submit" className="btn-gold-filled w-full" disabled={loading}>
                          {loading ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Submit Inquiry</>}
                       </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div 
              className="contact-details-side"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="details-stack">
                 <div className="detail-item-elite">
                    <div className="die-icon"><MapPin /></div>
                    <div className="die-text">
                       <h4>Global Headquarters</h4>
                       <p>Vavdi Industrial Area, Rajkot, Gujarat, India</p>
                    </div>
                 </div>
                 
                 <div className="detail-item-elite">
                    <div className="die-icon"><Phone /></div>
                    <div className="die-text">
                       <h4>Direct Line</h4>
                       <p>+91 94268 68883</p>
                       <p>+91 82002 07666</p>
                    </div>
                 </div>

                 <div className="detail-item-elite">
                    <div className="die-icon"><Mail /></div>
                    <div className="die-text">
                       <h4>Digital Mail</h4>
                       <p>aabhaimpex209@gmail.com</p>
                       <p>info@aabhaimpex.com</p>
                    </div>
                 </div>
              </div>

              <div className="mini-map-card">
                 <iframe 
                    title="AABHA IMPEX Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.686159674068!2d70.7818788!3d22.2519134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca18928646b9%3A0x7d25e0e02621184a!2sVavdi%20Industrial%20Area%2C%20Rajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1713870000000!5m2!1sen!2sin" 
                    width="100%" height="300" style={{ border: 0, borderRadius: '20px' }} allowFullScreen="" loading="lazy"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
