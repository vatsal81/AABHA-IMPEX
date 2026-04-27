import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Globe, Shield, Truck, Package, 
  ArrowUpRight, CheckCircle2, Users, Award, Zap, 
  MapPin, Mail, Phone, ExternalLink 
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchProducts } from '../services/api';
import SEO from '../components/SEO';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const getFeaturedProducts = async () => {
      try {
        const products = await fetchProducts();
        // Get up to 4 latest products for the home page
        setFeaturedProducts(products.slice(0, 4));
      } catch (error) {
        console.error("Failed to load featured products:", error);
      }
    };
    getFeaturedProducts();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const getProductImage = (p) => {
    return p.image || "https://images.unsplash.com/photo-1542838132-92c53300491e";
  };

  return (
    <div className="home-page">
      <SEO 
        title={t('home.hero.title').replace(/<br \/>/g, '').replace(/<[^>]*>/g, '')} 
        description={t('home.hero.desc')}
      />

      {/* 1. Hero Section */}
      <section className="hero-premium">
        <div className="hero-visual">
          <div className="hero-overlay-gradient"></div>
          <img 
            src="https://www.umaexports.net/images/slider-mainbg-001.jpg" 
            alt="Global Trade Cargo" 
            className="hero-main-img" 
          />
        </div>
        
        <div className="container hero-container">
          <div className="hero-content-wrapper">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="hero-text-block"
            >
              <span className="premium-label">{t('home.hero.label')}</span>
              <h1 dangerouslySetInnerHTML={{ __html: t('home.hero.title') }}></h1>
              <p>{t('home.hero.desc')}</p>
              
              <div className="hero-button-group">
                <Link to={`/${lng}/contact`} className="btn btn-primary">
                  {t('home.hero.cta_quote')} <ArrowRight size={18} />
                </Link>
                <Link to={`/${lng}/services`} className="btn btn-outline-white">
                  {t('home.hero.cta_services')}
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="hero-badge-float"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <div className="experience-badge">
                <span className="exp-num">15+</span>
                <span className="exp-text" dangerouslySetInnerHTML={{ __html: t('home.hero.experience') }}></span>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="hero-scroll-indicator">
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mouse-icon"
          ></motion.div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="section-padding about-summary">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-image-stack"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=1000" alt="Logistics Hub" className="img-main" />
              <div className="img-overlay-box">
                <h4>Empowering Global Commerce</h4>
              </div>
            </motion.div>
            
            <motion.div 
              className="about-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="label">{t('home.about.label')}</span>
              <h2>{t('home.about.title')}</h2>
              <p>{t('home.about.desc')}</p>
              
              <div className="mission-vision">
                <div className="mv-item">
                  <Globe className="text-gold" />
                  <div>
                    <h4>{t('home.about.reach_title')}</h4>
                    <p>{t('home.about.reach_desc')}</p>
                  </div>
                </div>
                <div className="mv-item">
                  <Shield className="text-gold" />
                  <div>
                    <h4>{t('home.about.integrity_title')}</h4>
                    <p>{t('home.about.integrity_desc')}</p>
                  </div>
                </div>
              </div>
              
              <Link to={`/${lng}/about`} className="btn-text">{t('home.about.learn_more')} <ArrowRight size={18} /></Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="section-padding bg-alt services-grid-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="label">{t('home.services.label')}</span>
            <h2>{t('home.services.title')}</h2>
            <p className="section-desc">{t('home.services.desc')}</p>
          </div>

          <motion.div 
            className="services-modern-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { 
                icon: <Package size={32} />, 
                title: t('home.services.import.title'), 
                desc: t('home.services.import.desc') 
              },
              { 
                icon: <ExternalLink size={32} />, 
                title: t('home.services.export.title'), 
                desc: t('home.services.export.desc') 
              },
              { 
                icon: <CheckCircle2 size={32} />, 
                title: t('home.services.docs.title'), 
                desc: t('home.services.docs.desc') 
              },
              { 
                icon: <Truck size={32} />, 
                title: t('home.services.logistics.title'), 
                desc: t('home.services.logistics.desc') 
              }
            ].map((service, index) => (
              <motion.div key={index} className="service-card-premium" variants={itemVariants}>
                <div className="s-icon-box">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to={`/${lng}/services`} className="s-link">Details <ArrowUpRight size={16} /></Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Global Presence Section */}
      <section className="section-padding global-presence">
        <div className="container">
          <div className="global-flex">
            <motion.div 
              className="global-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="label">{t('home.global.label')}</span>
              <h2>{t('home.global.title')}</h2>
              <p>{t('home.global.desc')}</p>
              
              <div className="region-tags">
                <span>{t('global_export.geography.asia')}</span>
                <span>{t('global_export.geography.middle_east')}</span>
                <span>{t('global_export.geography.europe')}</span>
                <span>Africa</span>
                <span>{t('global_export.geography.americas')}</span>
              </div>
            </motion.div>
            
            <div className="map-container">
              <img src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1200" alt="World Map Trade" className="world-map-img" />
              <div className="map-overlay-dots">
                <div className="dot d1"></div>
                <div className="dot d2"></div>
                <div className="dot d3"></div>
                <div className="dot d4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Live Featured Products Section from Backend */}
      <section className="section-padding products-showcase">
        <div className="container">
          <div className="section-header-flex">
            <div className="section-header-left">
               <span className="label">OUR PORTFOLIO</span>
               <h2>Featured Export Products</h2>
            </div>
            <Link to={`/${lng}/products`} className="btn btn-outline">View All Catalog</Link>
          </div>

          <div className="industry-grid">
            {featuredProducts.length > 0 ? (
                featuredProducts.map((product, i) => (
                  <motion.div 
                    key={product._id} 
                    className="industry-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="ind-img">
                      <img 
                        src={getProductImage(product)} 
                        alt={product.name} 
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800";
                        }}
                      />
                      <div className="ind-overlay">
                        <span className="ind-count">{product.category}</span>
                        <h3>{product.name}</h3>
                        <Link to={`/${lng}/products/${product._id}`} className="ind-btn">
                           View Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
            ) : (
                <div className="no-products-message">
                   <p>Fetching latest products from our global catalog...</p>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us Section */}
      <section className="section-padding bg-dark why-choose-us">
        <div className="container">
          <div className="why-grid">
            <div className="why-header">
              <span className="label">{t('home.why.label')}</span>
              <h2 className="text-white" dangerouslySetInnerHTML={{ __html: t('home.why.title') }}></h2>
              <p>{t('home.why.desc')}</p>
              
              <div className="trust-bars">
                <div className="t-bar"><span>{t('home.why.reliability')}</span><div className="bar"><div className="fill" style={{width: '98%'}}></div></div></div>
                <div className="t-bar"><span>{t('home.why.compliance')}</span><div className="bar"><div className="fill" style={{width: '100%'}}></div></div></div>
                <div className="t-bar"><span>{t('home.why.satisfaction')}</span><div className="bar"><div className="fill" style={{width: '95%'}}></div></div></div>
              </div>
            </div>

            <div className="why-features">
              {[
                { icon: <Users />, title: t('home.why.trusted_network.title'), text: t('home.why.trusted_network.desc') },
                { icon: <Zap />, title: t('home.why.fast_docs.title'), text: t('home.why.fast_docs.desc') },
                { icon: <Award />, title: t('home.why.pricing.title'), text: t('home.why.pricing.desc') },
                { icon: <Globe />, title: t('home.why.expertise.title'), text: t('home.why.expertise.desc') }
              ].map((f, i) => (
                <motion.div 
                  key={i} 
                  className="why-feature-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="wf-icon">{f.icon}</div>
                  <div className="wf-text">
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="section-padding testimonials-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="label">{t('home.testimonials.label')}</span>
            <h2>{t('home.testimonials.title')}</h2>
          </div>

          <div className="testimonials-grid">
            {(t('home.testimonials.list', { returnObjects: true }) || []).map((t, i) => (
              <motion.div 
                key={i} 
                className="testimonial-card"
                whileHover={{ y: -10 }}
              >
                <div className="quote-icon">"</div>
                <p>{t.text}</p>
                <div className="t-author">
                  <div className="t-avatar">{t.name ? t.name[0] : 'U'}</div>
                  <div className="t-meta">
                    <h4>{t.name}</h4>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Contact Summary Section */}
      <section className="section-padding contact-cta-section">
        <div className="container">
          <div className="contact-premium-box">
            <div className="cp-content">
              <h2 dangerouslySetInnerHTML={{ __html: t('home.contact_cta.title') }}></h2>
              <p>{t('home.contact_cta.desc')}</p>
              
              <div className="cp-contact-info">
                <div className="c-item"><Phone size={20} className="text-gold" /> <span>+91 94268 68883</span></div>
                <div className="c-item"><Mail size={20} className="text-gold" /> <span>aabhaimpex209@gmail.com</span></div>
                <div className="c-item"><MapPin size={20} className="text-gold" /> <span>Rajkot, Gujarat, India</span></div>
              </div>
              
              <Link to={`/${lng}/contact`} className="btn btn-primary btn-lg">{t('home.contact_cta.btn')}</Link>
            </div>
            <div className="cp-visual">
              <img src="https://images.unsplash.com/photo-1454165833767-027ffea9e778?auto=format&fit=crop&q=80&w=1000" alt="Consultation" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
