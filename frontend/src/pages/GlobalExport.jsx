import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Ship, ShieldCheck, ClipboardCheck, Package, Truck, ArrowRight, CheckCircle, X, Download, Eye, ArrowUpRight, RefreshCcw, Clock } from 'lucide-react';
import WorldMap from '../components/WorldMap';
import { fetchCertificates, fetchMarketNews } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import Skeleton from '../components/Skeleton';
import { formatTimeAgo } from '../utils/timeAgo';
import './GlobalExport.css';


const GlobalExport = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lng } = useParams();
  const [selectedCert, setSelectedCert] = useState(null);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedStep, setSelectedStep] = useState(null);

  // Use Query for Certificates
  const { data: certificates = [], isLoading: loading } = useQuery({
    queryKey: ['certificates'],
    queryFn: fetchCertificates
  });

  // Use Query for News
  const { data: news = [], isLoading: newsLoading, refetch: refetchNews, isFetching: newsFetching } = useQuery({
    queryKey: ['tradeNews'],
    queryFn: fetchMarketNews,
    refetchInterval: 300000, // Auto-refresh every 5 minutes (300,000 ms)
    staleTime: 60000, // Consider data stale after 1 minute
    refetchOnWindowFocus: true
  });








  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);
    
    const handleKeyDown = (e) => {
        if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
            alert("Screenshots and printing are restricted for this document.");
            e.preventDefault();
        }
    };

    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('keyup', handleKeyDown);
    
    return () => {
        window.removeEventListener('focus', handleFocus);
        window.removeEventListener('blur', handleBlur);
        window.removeEventListener('keyup', handleKeyDown);
    };
  }, []);


  const exportSteps = [
    {
      id: 'inquiry',
      icon: <ClipboardCheck size={32} />,
      title: t('global_export.process.steps.s1.title'),
      desc: t('global_export.process.steps.s1.desc')
    },
    {
      id: 'quality',
      icon: <ShieldCheck size={32} />,
      title: t('global_export.process.steps.s2.title'),
      desc: t('global_export.process.steps.s2.desc')
    },
    {
      id: 'packaging',
      icon: <Package size={32} />,
      title: t('global_export.process.steps.s3.title'),
      desc: t('global_export.process.steps.s3.desc')
    },
    {
      id: 'logistics',
      icon: <Truck size={32} />,
      title: t('global_export.process.steps.s4.title'),
      desc: t('global_export.process.steps.s4.desc')
    },
    {
      id: 'delivery',
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

  return (
    <div className="global-export-page">
      <section className="global-export-hero">
        <div className="container">
          <motion.div
            className="hero-content-box centered"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="label">{t('global_export.header.label')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('global_export.header.title') }}></h1>
            <p>{t('global_export.header.desc')}</p>
            <div className="hero-actions">
              <button className="btn btn-secondary">{t('global_export.process.label')}</button>
            </div>
          </motion.div>

        </div>
      </section>





      {/* Interactive Export Roadmap Stepper */}
      <section className="section-padding roadmap-stepper-section">
        <div className="container">
          <div className="section-title text-center">
            <span className="label">{t('global_export.process.label')}</span>
            <h2>Interactive Export <span className="text-gold">Roadmap</span></h2>
            <p>{t('global_export.process.desc')}</p>
          </div>

          <div className="stepper-container glass-panel">
            {/* Stepper Header */}
            <div className="stepper-header">
              {exportSteps.map((step, index) => (
                <div 
                  key={step.id} 
                  className={`step-item ${selectedStep?.id === step.id || (!selectedStep && index === 0) ? 'active' : ''} ${index < exportSteps.findIndex(s => s.id === selectedStep?.id) ? 'completed' : ''}`}
                  onClick={() => setSelectedStep(step)}
                >
                  <div className="step-circle">
                    {index < exportSteps.findIndex(s => s.id === selectedStep?.id) ? <CheckCircle size={18} /> : <span>{index + 1}</span>}
                  </div>
                  <span className="step-label">{step.title}</span>
                </div>
              ))}
            </div>

            {/* Stepper Content */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedStep?.id || 's1'}
                className="stepper-content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="step-detail-grid">
                  <div className="step-visual-box">
                    {(selectedStep || exportSteps[0]).icon}
                  </div>
                  <div className="step-text-box">
                    <span className="step-num-tag">Step {(exportSteps.findIndex(s => s.id === (selectedStep?.id || 'inquiry')) + 1)}</span>
                    <h3>{(selectedStep || exportSteps[0]).title}</h3>
                    <p>{(selectedStep || exportSteps[0]).desc}</p>
                    
                    <div className="step-meta-info">
                      <div className="meta-item">
                        <Clock size={16} className="text-gold" />
                        <span>Est. Time: {exportSteps.findIndex(s => s.id === (selectedStep?.id || 'inquiry')) === 0 ? '24-48 hrs' : '3-5 Days'}</span>
                      </div>
                      <div className="meta-item">
                        <ShieldCheck size={16} className="text-gold" />
                        <span>Quality Gates: 100% Passed</span>
                      </div>
                    </div>

                    <button 
                      className="btn btn-primary"
                      onClick={() => navigate(`/${lng}/export-process/${(selectedStep?.id || 'inquiry')}`)}
                    >
                      View Detailed Documentation <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
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

      {/* Global Trade News Feed */}
      <section className="section-padding trade-news-section">
        <div className="container">
          <div className="section-title text-center" style={{ marginBottom: '50px', position: 'relative' }}>
            <span className="label">{t('global_export.news.label')}</span>
            <h2>{t('global_export.news.title')}</h2>
            <p>Latest high-impact updates from Business Standard and Times of India (Business & World).</p>
            
            <button 
              className={`refresh-btn-premium ${newsFetching ? 'spinning' : ''}`}
              onClick={() => refetchNews()}
              title="Refresh Intelligence Feed"
            >
              <RefreshCcw size={18} />
            </button>
          </div>

          {/* News Source Tabs */}
          <div className="news-tabs-premium">
            <button 
              className={`news-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Top News
            </button>
            <button 
              className={`news-tab ${activeTab === 'toi' ? 'active' : ''}`}
              onClick={() => setActiveTab('toi')}
            >
              Times of India
            </button>
            <button 
              className={`news-tab ${activeTab === 'bs' ? 'active' : ''}`}
              onClick={() => setActiveTab('bs')}
            >
              Business Standard
            </button>
          </div>

          <div className="news-grid-horizontal">
            {newsLoading ? (
              [1, 2, 3, 4].map(i => (
                <div key={i} className="news-card-skeleton">
                  <Skeleton height="320px" width="100%" />
                </div>
              ))
            ) : news.length > 0 ? (
              <div className="news-scroll-container">
                {news
                  .filter(item => {
                    if (activeTab === 'toi') return item.source.includes('Times of India');
                    if (activeTab === 'bs') return item.source.includes('Business Standard');
                    return true; // 'all' tab
                  })
                  .map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      className={`trade-news-card-premium impact-${item.impactLevel.toLowerCase()}`}
                      onClick={() => window.open(item.url, '_blank')}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="news-header-premium">
                        <div className="source-badge">{item.source}</div>
                      </div>
                      
                      <div className="news-body-premium">
                        <h3>{item.title}</h3>
                        <p>{item.summary}</p>
                      </div>

                      <div className="news-footer-premium">
                        <div className="meta-info">
                          <span className="category-tag">{item.category}</span>
                          <span className="divider">•</span>
                          <span className="region-tag">{item.region}</span>
                        </div>
                        <span className="time-ago">{formatTimeAgo(item.publishedAt)}</span>
                      </div>
                      
                      <div className="card-glass-overlay"></div>
                    </motion.div>
                ))}
              </div>
            ) : (
              <div className="no-news-box">
                <RefreshCcw size={40} className="text-muted" />
                <p>Analyzing global trade channels... No high-impact updates in the last 24h.</p>
                <button className="btn btn-outline btn-sm" onClick={() => refetchNews()}>Retry Intelligence Fetch</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Certifications Vault */}
      <section className="section-padding bg-alt cert-vault-section">
        <div className="container">
            <div className="section-title text-center">
                <span className="label">COMPLIANCE</span>
                <h2>{t('global_export.compliance.title') || 'Certifications & Compliance'}</h2>
                <p>{t('global_export.compliance.desc') || 'Ensuring the highest standards of quality and international safety protocols.'}</p>
            </div>
            {loading ? (
                <div className="cert-grid-premium">
                    {[1,2,3,4,5].map(i => <Skeleton key={i} height="200px" />)}
                </div>
            ) : (
                <div className="cert-grid-premium">
                    {certificates.map((cert) => (
                        <motion.div 
                            key={cert._id} 
                            className="cert-card-premium"
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedCert(cert)}
                        >
                            <div className="cert-icon-premium">
                                {cert.imageUrl ? <img src={cert.imageUrl} alt={cert.name} style={{width: '60px', height: '60px', objectFit: 'contain'}} /> : <ShieldCheck size={40} />}
                            </div>
                            <h3>{cert.name}</h3>
                            <p>{cert.fullName}</p>
                            <div className="cert-action">
                                <Eye size={18} /> <span>View Certificate</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
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
                        <p>{selectedCert.fullName}</p>
                    </div>
                    <div 
                        className="modal-body" 
                        style={{ userSelect: 'none', filter: isWindowFocused ? 'none' : 'blur(40px)', transition: 'filter 0.3s' }} 
                        onContextMenu={(e) => e.preventDefault()}
                    >
                        {selectedCert.fileUrl ? (
                            <div className="cert-image-preview">
                                {selectedCert.fileUrl.toLowerCase().endsWith('.pdf') ? (
                                    <iframe 
                                        src={`${selectedCert.fileUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                                        title={selectedCert.name}
                                        style={{width: '100%', height: '60vh', border: 'none', borderRadius: '8px'}}
                                    />
                                ) : (
                                    <img 
                                        src={selectedCert.fileUrl} 
                                        alt={selectedCert.name} 
                                        style={{width: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: '8px', pointerEvents: 'none'}} 
                                    />
                                )}
                                <div className="cert-overlay-protection">
                                    <div className="watermark-container">
                                        {[...Array(9)].map((_, i) => (
                                            <span key={i} className="watermark-text">OFFICIAL DOCUMENT - DO NOT COPY</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="cert-preview-placeholder">
                                <ShieldCheck size={120} className="text-gold" />
                                <p>Official Verification Document</p>
                                <span className="seal">AABHA IMPEX EXCELLENCE</span>
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
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
