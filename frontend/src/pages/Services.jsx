import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import { Ship, FileText, Briefcase, Globe, CheckCircle, ArrowRight, Shield } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { fetchServices } from '../services/api';
import Skeleton from '../components/Skeleton';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      try {
        const data = await fetchServices();
        setServices(data);
      } catch (error) {
        console.error("Error loading services:", error);
      }
      setLoading(false);
    };
    loadServices();
  }, []);

  const getIcon = (iconName) => {
    const LucideIcon = Icons[iconName] || Icons.FileText;
    return <LucideIcon size={32} />;
  };

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
          {loading ? (
            <div className="services-grid-modern">
                {[1,2,3,4].map(i => <Skeleton key={i} height="400px" />)}
            </div>
          ) : (
            <div className="services-grid-modern">
              {services.map((service, index) => (
                <motion.div 
                  key={service._id || index}
                  className="service-card-premium"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="service-card-top">
                    <div className="service-icon-modern" style={{ color: service.color }}>
                        {service.image ? (
                          <img src={service.image} alt={service.title} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                        ) : (
                          getIcon(service.icon)
                        )}
                    </div>
                    <span className="service-number">0{index + 1}</span>
                  </div>
                  <div className="service-card-body">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className="service-points">
                      {service.details?.map((detail, idx) => (
                        <li key={idx}>
                          <CheckCircle size={16} /> 
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="service-card-footer">
                     <Link to={`/${lng}/contact`} className="learn-more">{t('services_page.list.inquire') || 'Inquire Now'} <ArrowRight size={16} /></Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding quality-assurance">
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
                            <span className="years">5+</span>
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
