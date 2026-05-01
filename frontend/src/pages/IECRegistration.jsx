import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Shield, CheckCircle, FileText, ArrowLeft, Info, HelpCircle, FileCheck, Landmark } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import './IECRegistration.css';

const IECRegistration = () => {
  const { t } = useTranslation();
  const { lng } = useParams();

  const faqs = [
    {
      q: "What is IEC?",
      a: "Import Export Code (IEC) is a 10-digit identification number that is mandatory for every person/company to import or export goods/services from/to India."
    },
    {
      q: "Is it mandatory?",
      a: "Yes, unless specifically exempted, an IEC is mandatory for all commercial import and export operations in India."
    },
    {
      q: "Does it need renewal?",
      a: "An IEC is valid for the lifetime of the entity. However, it must be updated online on the DGFT portal every year between April and June."
    }
  ];

  return (
    <div className="iec-page">
      <SEO 
        title="IEC Registration Guide | AABHA IMPEX" 
        description="Learn everything about Import Export Code (IEC) registration in India. Mandatory for all exporters and importers." 
      />

      {/* Hero Section */}
      <section className="iec-hero">
        <div className="container">
          <Link to={`/${lng}/services`} className="back-link">
            <ArrowLeft size={20} /> Back to Services
          </Link>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="iec-hero-content"
          >
            <span className="badge">Knowledge Hub</span>
            <h1>IEC Registration <br /><span>Complete Guide</span></h1>
            <p>Your gateway to international trade starts here. Understanding the Import Export Code (IEC) is the first step for any Indian business looking to go global.</p>
          </motion.div>
        </div>
      </section>

      {/* Deep Description */}
      <section className="iec-content section-padding">
        <div className="container">
          <div className="iec-grid">
            <div className="iec-main">
              <div className="content-block">
                <h2><Info size={24} /> What is IEC Registration?</h2>
                <p>
                  The Import Export Code (IEC) is a key business identification number which is mandatory for Exports or Imports from India. No person or entity shall make any Import or Export without obtaining an IEC number granted by the DGFT.
                </p>
                <p>
                  In case of import or export of services or technology, the IEC shall be required only when the service or technology provider is taking benefits under the Foreign Trade Policy or is dealing with specified goods or technologies.
                </p>
              </div>

              <div className="content-block">
                <h2><FileCheck size={24} /> Why do you need an IEC?</h2>
                <div className="reason-grid">
                  <div className="reason-card">
                    <CheckCircle className="text-gold" />
                    <h4>Customs Clearance</h4>
                    <p>Mandatory for clearing shipments through customs for both import and export.</p>
                  </div>
                  <div className="reason-card">
                    <Landmark className="text-gold" />
                    <h4>Banking Transactions</h4>
                    <p>Required by banks to send or receive money in foreign currencies.</p>
                  </div>
                  <div className="reason-card">
                    <Shield className="text-gold" />
                    <h4>Government Benefits</h4>
                    <p>Essential to claim subsidies and benefits from DGFT, Customs, or Export Promotion Councils.</p>
                  </div>
                </div>
              </div>

              <div className="content-block documents-block">
                <h2><FileText size={24} /> Required Documents</h2>
                <ul className="doc-list">
                  <li><CheckCircle size={18} /> Individual's or Firm's or Company's Copy of PAN Card.</li>
                  <li><CheckCircle size={18} /> Individual's Voter id or Aadhar card or Passport copy.</li>
                  <li><CheckCircle size={18} /> Individual's or company's or firm's cancel cheque copies of current bank accounts.</li>
                  <li><CheckCircle size={18} /> Copy of Rent Agreement or Electricity Bill Copy of the premise.</li>
                  <li><CheckCircle size={18} /> A self-addressed envelope for delivery of IEC certificate by registered post.</li>
                </ul>
              </div>
            </div>

            <aside className="iec-sidebar">
              <div className="sidebar-card help-card">
                <h3>Need Assistance?</h3>
                <p>AABHA IMPEX provides end-to-end support for your IEC registration and documentation.</p>
                <Link to={`/${lng}/contact`} className="btn-sidebar">Consult Our Expert</Link>
              </div>

              <div className="sidebar-card faq-card">
                <h3>Quick FAQ</h3>
                {faqs.map((faq, index) => (
                  <div key={index} className="faq-item">
                    <h4><HelpCircle size={16} /> {faq.q}</h4>
                    <p>{faq.a}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="iec-cta">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Start Your Export Business?</h2>
            <p>Don't let documentation hold you back. Let AABHA IMPEX handle the complexities while you focus on your product.</p>
            <div className="cta-buttons">
              <Link to={`/${lng}/contact`} className="btn-gold-filled">Get Started Now</Link>
              <Link to={`/${lng}/services`} className="btn-glass-outline">View All Services</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IECRegistration;
