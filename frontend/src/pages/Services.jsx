import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FileText, Ship, Briefcase, Globe, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();

  const serviceList = [
    {
      icon: <Ship size={32} />,
      title: t('services_page.list.s1.title'),
      description: t('services_page.list.s1.desc'),
      details: [t('services_page.list.s1.p1'), t('services_page.list.s1.p2'), t('services_page.list.s1.p3')],
      color: "var(--primary)"
    },
    {
      icon: <FileText size={32} />,
      title: t('services_page.list.s2.title'),
      description: t('services_page.list.s2.desc'),
      details: [t('services_page.list.s2.p1'), t('services_page.list.s2.p2'), t('services_page.list.s2.p3')],
      color: "var(--secondary)"
    },
    {
      icon: <Briefcase size={32} />,
      title: t('services_page.list.s3.title'),
      description: t('services_page.list.s3.desc'),
      details: [t('services_page.list.s3.p1'), t('services_page.list.s3.p2'), t('services_page.list.s3.p3')],
      color: "var(--primary)"
    },
    {
      icon: <Globe size={32} />,
      title: t('services_page.list.s4.title'),
      description: t('services_page.list.s4.desc'),
      details: [t('services_page.list.s4.p1'), t('services_page.list.s4.p2'), t('services_page.list.s4.p3')],
      color: "var(--secondary)"
    }
  ];

  return (
    <div className="services-page">
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">{t('services_page.header.label')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('services_page.header.title') }}></h1>
            <p>{t('services_page.header.desc')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="services-grid-modern">
            {serviceList.map((service, index) => (
              <motion.div 
                key={index}
                className="service-card-premium"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="service-card-top">
                  <div className="service-icon-modern">{service.icon}</div>
                  <span className="service-number">0{index + 1}</span>
                </div>
                <div className="service-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service-points">
                    {service.details.map((detail, idx) => (
                      <li key={idx}><CheckCircle size={16} /> {detail}</li>
                    ))}
                  </ul>
                </div>
                <div className="service-card-footer">
                   <Link to="/contact" className="learn-more">{t('services_page.list.inquire')} <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-dark quality-assurance">
        <div className="container">
            <div className="quality-wrapper">
                <motion.div 
                    className="quality-content"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <Shield size={60} className="text-gold" />
                    <h2>{t('services_page.quality.title')}</h2>
                    <p>{t('services_page.quality.desc')}</p>
                    <div className="assurance-badges">
                        <div className="badge-item">{t('services_page.quality.b1')}</div>
                        <div className="badge-item">{t('services_page.quality.b2')}</div>
                        <div className="badge-item">{t('services_page.quality.b3')}</div>
                    </div>
                </motion.div>
                <motion.div 
                    className="quality-image"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="image-stack">
                        <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=800" alt="Quality Control" />
                        <div className="experience-tag">
                            <span className="years">10+</span>
                            <span className="text">{t('services_page.quality.exp')}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
