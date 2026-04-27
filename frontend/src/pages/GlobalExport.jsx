import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Globe, Ship, ShieldCheck, ClipboardCheck, Package, Truck, ArrowRight, CheckCircle, X, Download, Eye } from 'lucide-react';
import WorldMap from '../components/WorldMap';
import './GlobalExport.css';

const GlobalExport = () => {
  const { t } = useTranslation();
  const [selectedCert, setSelectedCert] = useState(null);

  const exportSteps = [
    {
      icon: <ClipboardCheck size={32} />,
      title: t('global_export.process.steps.s1.title'),
      desc: t('global_export.process.steps.s1.desc')
    },
    {
      icon: <ShieldCheck size={32} />,
      title: t('global_export.process.steps.s2.title'),
      desc: t('global_export.process.steps.s2.desc')
    },
    {
      icon: <Package size={32} />,
      title: t('global_export.process.steps.s3.title'),
      desc: t('global_export.process.steps.s3.desc')
    },
    {
      icon: <Truck size={32} />,
      title: t('global_export.process.steps.s4.title'),
      desc: t('global_export.process.steps.s4.desc')
    },
    {
      icon: <Ship size={32} />,
      title: t('global_export.process.steps.s5.title'),
      desc: t('global_export.process.steps.s5.desc')
    }
  ];

  const countries = [
    { region: t('global_export.geography.middle_east'), list: ["UAE", "Saudi Arabia", "Qatar", "Oman", "Kuwait"] },
    { region: t('global_export.geography.europe'), list: ["UK", "Germany", "Netherlands", "Belgium", "Spain"] },
    { region: t('global_export.geography.asia'), list: ["Singapore", "Malaysia", "Vietnam", "Thailand"] },
    { region: t('global_export.geography.americas'), list: ["USA", "Canada"] }
  ];

  const certifications = [
    { id: 1, name: 'APEDA', full: 'Agricultural & Processed Food Products Export Development Authority', icon: <ShieldCheck size={40} /> },
    { id: 2, name: 'FSSAI', full: 'Food Safety and Standards Authority of India', icon: <ShieldCheck size={40} /> },
    { id: 3, name: 'ISO 9001:2015', full: 'Quality Management System Certification', icon: <ShieldCheck size={40} /> },
    { id: 4, name: 'US FDA', full: 'United States Food and Drug Administration Registration', icon: <ShieldCheck size={40} /> },
    { id: 5, name: 'FIEO', full: 'Federation of Indian Export Organisations', icon: <ShieldCheck size={40} /> }
  ];

  return (
    <div className="global-export-page">
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">{t('global_export.header.label')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('global_export.header.title') }}></h1>
            <p>{t('global_export.header.desc')}</p>
          </motion.div>
        </div>
      </section>

      {/* Export Process Roadmap */}
      <section className="section-padding">
        <div className="container">
          <div className="section-title text-center">
            <span className="label">{t('global_export.process.label')}</span>
            <h2>{t('global_export.process.title')}</h2>
            <p>{t('global_export.process.desc')}</p>
          </div>

          <div className="roadmap-grid">
            {exportSteps.map((step, index) => (
              <motion.div 
                key={index}
                className="roadmap-step"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="step-icon-box">
                  {step.icon}
                  <div className="step-number">{index + 1}</div>
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {index < exportSteps.length - 1 && <div className="step-arrow"><ArrowRight size={20} /></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark market-presence">
        <div className="container">
          <motion.div 
              className="market-intro-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
          >
            <span className="label">{t('global_export.geography.label')}</span>
            <h2>{t('global_export.geography.title')}</h2>
            <p className="intro-text-wide">{t('global_export.geography.desc')}</p>
          </motion.div>

          <div className="market-region-grid">
            {countries.map((c, i) => (
                <motion.div 
                  key={i} 
                  className="region-box-modern"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                    <h4>{c.region}</h4>
                    <ul>
                        {c.list.map((item, idx) => (
                            <li key={idx}><CheckCircle size={14} className="text-gold" /> {item}</li>
                        ))}
                    </ul>
                </motion.div>
            ))}
          </div>

          <motion.div 
              className="full-width-export-map"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
          >
              <WorldMap />
          </motion.div>
        </div>
      </section>

      {/* Certifications Vault */}
      <section className="section-padding bg-alt cert-vault-section">
        <div className="container">
            <div className="section-title text-center">
                <span className="label">COMPLIANCE</span>
                <h2>{t('global_export.compliance.title')}</h2>
                <p>{t('global_export.compliance.desc')}</p>
            </div>
            <div className="cert-grid-premium">
                {certifications.map((cert) => (
                    <motion.div 
                        key={cert.id} 
                        className="cert-card-premium"
                        whileHover={{ y: -10 }}
                        onClick={() => setSelectedCert(cert)}
                    >
                        <div className="cert-icon-premium">
                            {cert.icon}
                        </div>
                        <h3>{cert.name}</h3>
                        <p>{cert.full}</p>
                        <div className="cert-action">
                            <Eye size={18} /> <span>View Certificate</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
            <motion.div 
                className="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCert(null)}
            >
                <motion.div 
                    className="cert-modal"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button className="close-modal" onClick={() => setSelectedCert(null)}><X size={24} /></button>
                    <div className="modal-header">
                        <h2>{selectedCert.name} Certification</h2>
                        <p>{selectedCert.full}</p>
                    </div>
                    <div className="modal-body">
                        <div className="cert-preview-placeholder">
                            <ShieldCheck size={120} className="text-gold" />
                            <p>Official Verification Document</p>
                            <span className="seal">AABHA IMPEX EXCELLENCE</span>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-outline btn-sm"><Download size={16} /> Download Copy</button>
                        <button className="btn btn-primary btn-sm" onClick={() => setSelectedCert(null)}>Close</button>
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Final CTA */}
      <section className="section-padding global-cta">
        <div className="container">
            <motion.div 
                className="cta-box-premium"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
            >
                <h2>{t('global_export.cta.title')}</h2>
                <p>{t('global_export.cta.desc')}</p>
                <button className="btn btn-primary">{t('global_export.cta.btn')}</button>
            </motion.div>
        </div>
      </section>
    </div>
  );
};

export default GlobalExport;
