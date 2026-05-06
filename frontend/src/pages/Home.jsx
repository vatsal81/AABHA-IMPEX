import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Globe, Shield, Truck, Package, 
  ArrowUpRight, CheckCircle2, Users, Award, Zap, 
  MapPin, Mail, Phone, ExternalLink, Activity
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchBlogs, fetchMarketPrices } from '../services/api';
import SEO from '../components/SEO';
import TestimonialSlider from '../components/TestimonialSlider';
import WorldMap from '../components/WorldMap';
import { ProductSkeleton } from '../components/Skeleton';
import heroImg from '../assets/hero.png';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const [activeTab, setActiveTab] = useState('global');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000,
  });

  const { data: blogs = [], isLoading: blogsLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: fetchBlogs,
    staleTime: 5 * 60 * 1000,
  });



  const { data: prices = [], isLoading: pricesLoading } = useQuery({
    queryKey: ['marketPrices'],
    queryFn: fetchMarketPrices,
    staleTime: 5 * 60 * 1000,
  });

  const featuredProducts = Array.isArray(products) ? products.slice(0, 4) : [];
  const latestBlogs = Array.isArray(blogs) ? blogs.slice(0, 3) : [];

  const displayPrices = Array.isArray(prices) ? prices : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
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
      {/* 1. Premium Classic Hero Section */}
      <section className="hero-classic-v2">
        <div className="hero-atmosphere">
          <div className="hero-sky-overlay"></div>
          <div className="hero-particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className="particle"></div>
            ))}
          </div>
          <img 
            src={heroImg} 
            alt="International Trade" 
            className="hero-backdrop" 
          />
        </div>
        
        <div className="container hero-inner-classic">
          <div className="hero-main-layout">
            <motion.div 
              className="hero-classic-text"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              <motion.div 
                className="classic-pre-title"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
                }}
              >
                <span className="gold-line"></span>
                <span>{t('home.hero.label')}</span>
              </motion.div>
              
              <motion.h1 
                className="classic-heading"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1, 
                    transition: { 
                      staggerChildren: 0.08,
                      delayChildren: 0.3
                    } 
                  }
                }}
              >
                {t('home.hero.title').split(' ').map((word, i) => (
                  <span key={i} style={{ display: 'inline-block', marginRight: '0.3em' }}>
                    {word.split('').map((char, j) => (
                      <motion.span
                        key={j}
                        style={{ display: 'inline-block' }}
                        variants={{
                          hidden: { opacity: 0, y: 50, rotateX: -90 },
                          visible: { 
                            opacity: 1, 
                            y: 0, 
                            rotateX: 0,
                            transition: { type: "spring", damping: 12, stiffness: 100 } 
                          }
                        }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </span>
                ))}
              </motion.h1>

              <motion.p 
                className="classic-subtext"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.8 } }
                }}
              >
                {t('home.hero.desc')}
              </motion.p>
              
              <motion.div 
                className="classic-button-row"
                variants={{
                   hidden: { opacity: 0, y: 20 },
                   visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 1 } }
                }}
              >
                <Link to={`/${lng}/contact`} className="btn-premium gold">
                  {t('home.hero.cta_quote')} <ArrowRight size={18} />
                </Link>
                <Link to={`/${lng}/services`} className="btn-premium">
                  {t('home.hero.cta_services')}
                </Link>
              </motion.div>
            </motion.div>

            <motion.div 
              className="hero-premium-badge-box"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, duration: 1, type: "spring" }}
            >
              <div className="classic-glass-badge">
                <div className="badge-inner-glow"></div>
                <span className="badge-number">5+</span>
                <span className="badge-label">YEARS OF</span>
                <span className="badge-sub">EXCELLENCE</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. About Us Section */}
      <section className="section-padding about-summary">
        <div className="container">
          <div className="about-grid">
            <motion.div 
              className="about-image-stack reveal-up"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=1000" alt="Logistics Hub" className="img-main glass-panel" />
              <div className="img-overlay-box glass-panel">
                <h4>Empowering Global Commerce</h4>
              </div>
            </motion.div>
            
            <motion.div 
              className="about-info"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="label">{t('home.about.label')}</span>
              <h2 className="reveal-up">{t('home.about.title')}</h2>
              <p className="reveal-up">{t('home.about.desc')}</p>
              
              <div className="mission-vision reveal-up">
                <div className="mv-item glass-panel">
                  <Globe className="text-gold" />
                  <div>
                    <h4>{t('home.about.reach_title')}</h4>
                    <p>{t('home.about.reach_desc')}</p>
                  </div>
                </div>
                <div className="mv-item glass-panel">
                  <Shield className="text-gold" />
                  <div>
                    <h4>{t('home.about.integrity_title')}</h4>
                    <p>{t('home.about.integrity_desc')}</p>
                  </div>
                </div>
              </div>
              
              <Link to={`/${lng}/about`} className="btn-premium gold reveal-up">{t('home.about.learn_more')} <ArrowRight size={18} /></Link>
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
          <motion.div 
            className="global-content-vertical"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="label">{t('home.global.label')}</span>
            <h2>{t('home.global.title')}</h2>
            <p className="global-desc-wide">{t('home.global.desc')}</p>
            
            <div className="region-tags-centered">
              <span>{t('global_export.geography.asia')}</span>
              <span>{t('global_export.geography.middle_east')}</span>
              <span>{t('global_export.geography.europe')}</span>
              <span>Africa</span>
              <span>{t('global_export.geography.americas')}</span>
            </div>

            <div className="presence-stats">
              <div className="stat-item">
                <span className="stat-num">25+</span>
                <span className="stat-label">Countries Served</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">24/7</span>
                <span className="stat-label">Global Logistics</span>
              </div>
              <div className="stat-item">
                <span className="stat-num">500+</span>
                <span className="stat-label">Bulk Shipments</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="full-width-map-container"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <WorldMap />
          </motion.div>
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
                        <Link to={`/${lng}/${product.category.toLowerCase()}/${product.slug}`} className="ind-btn">
                           View Details <ArrowRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
            ) : (
                <div className="products-skeleton-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px', width: '100%' }}>
                  {[1, 2, 3, 4].map(i => <ProductSkeleton key={i} />)}
                </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Elite Bento Why Choose Us Section */}
      <section className="section-padding bento-why-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="label">{t('home.why.label')}</span>
            <h2>Why Partners Choose <span className="text-gold">AABHA</span></h2>
            <p className="section-desc">Our commitment to excellence is built on four core pillars of international trade.</p>
          </div>

          <div className="bento-grid-container">
            {/* 1. Main Feature: Global Expertise (2x2) */}
            <motion.div className="bento-item main-feature" variants={itemVariants}>
              <div className="bento-card-glass">
                <div className="bento-icon-box"><Globe size={32} /></div>
                <h3>Global Expertise</h3>
                <p>In-depth knowledge of international trade laws and cross-border logistics.</p>
                <div className="bento-visual">
                   <WorldMap mini />
                </div>
              </div>
            </motion.div>

            {/* 2. Trusted Network (2x1) */}
            <motion.div className="bento-item trusted-network" variants={itemVariants}>
              <div className="bento-card-glass">
                <div className="bento-flex-row">
                   <div className="bento-text-stack">
                      <h4>Trusted Network</h4>
                      <p>Verified partners across 30+ countries.</p>
                   </div>
                   <div className="bento-mini-stats">
                      <div className="b-stat"><span>25+</span> Countries</div>
                      <div className="b-stat"><span>500+</span> Clients</div>
                   </div>
                </div>
              </div>
            </motion.div>

            {/* 3. Fast Documentation (1x1) */}
            <motion.div className="bento-item fast-docs" variants={itemVariants}>
              <div className="bento-card-glass">
                <div className="bento-icon-box"><Zap size={32} /></div>
                <h4>Fast Docs</h4>
                <p>Zero-error paperwork for rapid clearances.</p>
                <CheckCircle2 className="floating-check-icon" size={40} />
              </div>
            </motion.div>

            {/* 4. Live Market Watch (1x1) */}
            <motion.div className="bento-item market-watch" variants={itemVariants}>
              <div className="bento-card-glass market-bento-card">
                 <div className="market-bento-header">
                    <div className="bento-icon-box"><Activity size={24} /></div>
                    <h4>Live Market</h4>
                 </div>
                 <div className="market-bento-list">
                    {pricesLoading ? (
                      <div className="bento-price-skeleton"></div>
                    ) : (
                      displayPrices.slice(0, 2).map(price => (
                        <div key={price.id} className="bento-price-row">
                           <span className="bento-price-name">{price.name}</span>
                           <span className="bento-price-amt">₹{price.price}</span>
                        </div>
                      ))
                    )}
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* 8. Testimonials Section */}
      <section className="section-padding testimonials-section bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <span className="label">{t('home.testimonials.label')}</span>
            <h2>{t('home.testimonials.title')}</h2>
          </div>

          <TestimonialSlider testimonials={t('home.testimonials.list', { returnObjects: true }) || []} />
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

      {/* 9. Certification Strip */}
      <section className="certification-strip">
        <div className="container">
          <div className="cert-logos">
             <div className="cert-logo-item">ISO 9001:2015</div>
             <div className="cert-logo-item">DGFT CERTIFIED</div>
             <div className="cert-logo-item">APEDA REGISTERED</div>
             <div className="cert-logo-item">FSSAI COMPLIANT</div>
             <div className="cert-logo-item">GLOBAL GAP</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
