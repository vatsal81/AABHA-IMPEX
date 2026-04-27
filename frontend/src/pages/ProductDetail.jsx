import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, Package, ShieldCheck, Info, FileText, Globe, Download } from 'lucide-react';
import { fetchProductById } from '../services/api';
import SEO from '../components/SEO';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id, lng } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setLoading(false);
    };
    loadProduct();
  }, [id]);

  if (loading) return (
    <div className="loader-container section-padding">
        <div className="spinner"></div>
        <p>{t('product_detail.loading')}</p>
    </div>
  );

  if (!product) return (
    <div className="container section-padding text-center">
        <h2>{t('product_detail.not_found')}</h2>
        <Link to={`/${lng}/products`} className="btn btn-primary mt-20">{t('product_detail.back')}</Link>
    </div>
  );

  return (
    <div className="product-detail-page" ref={containerRef}>
      <SEO 
        title={product.name} 
        description={product.description || `Premium quality ${product.name} from AABHA IMPEX.`}
        keywords={`${product.name}, ${product.category}, Indian Export, AABHA IMPEX`}
      />

      {/* Hero Section with Parallax */}
      <section className="detail-hero">
        <motion.div className="hero-bg" style={{ y, opacity }}>
           <img src={product.image} alt="" />
        </motion.div>
        <div className="hero-overlay"></div>
        <div className="container">
           <Link to={`/${lng}/products`} className="back-link-premium">
             <ArrowLeft size={18} /> {t('product_detail.back')}
           </Link>
           <motion.div 
             className="hero-content"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <span className="premium-tag">{t('product_detail.premium_tag')}</span>
              <h1>{product.name}</h1>
              <div className="hero-meta">
                 <span><Globe size={16} /> Global Export Grade</span>
                 <span><ShieldCheck size={16} /> Certified Quality</span>
              </div>
           </motion.div>
        </div>
      </section>
      
      <section className="section-padding detail-main-content">
        <div className="container">
          <div className="detail-grid-v2">
            <div className="detail-left">
               <div className="info-card">
                  <h3><Info size={24} /> {t('common.overview') || 'Overview'}</h3>
                  <p className="description-long">{product.longDescription || product.description}</p>
               </div>

               {product.benefits && product.benefits.length > 0 && (
                <div className="info-card">
                  <h3><CheckCircle size={24} /> {t('product_detail.benefits')}</h3>
                  <div className="benefits-grid">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="benefit-pill">
                        <CheckCircle size={14} /> {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="detail-right">
               <div className="specs-card-premium">
                  <div className="card-header">
                    <FileText size={20} />
                    <h3>{t('product_detail.specs')}</h3>
                  </div>
                  <div className="specs-body">
                    {product.specifications && product.specifications.length > 0 ? (
                      product.specifications.map((spec, i) => (
                        <div key={i} className="spec-row-premium">
                          <span className="s-label">{spec.label}</span>
                          <span className="s-value">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <p className="no-specs">Standard export specifications apply.</p>
                    )}
                  </div>
                  
                  {product.packing && (
                    <div className="packing-footer">
                       <Package size={20} />
                       <div>
                          <strong>{t('product_detail.packing')}</strong>
                          <p>{product.packing}</p>
                       </div>
                    </div>
                  )}

                  <div className="detail-actions-v2 premium-actions">
                    <Link to={`/${lng}/contact`} className="btn btn-secondary btn-block">{t('product_detail.inquire_now')}</Link>
                    <button className="btn btn-outline-white btn-block" onClick={() => window.print()}>
                      <Download size={18} /> {t('product_detail.download_specs')}
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
