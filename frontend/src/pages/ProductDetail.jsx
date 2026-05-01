import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CheckCircle, ShieldCheck, Globe, Download, Truck, Phone, Mail, MapPin, Award } from 'lucide-react';
import { fetchProductById } from '../services/api';
import SEO from '../components/SEO';
import './ProductDetail.css';

/* ─────────────────────────────────────────
   Premium Print / Export Sheet Component
───────────────────────────────────────── */
const ExportSheet = ({ product }) => (
  <div className="export-sheet-wrapper" id="export-sheet">
    {/* Header Banner */}
    <div className="es-header">
      <div className="es-header-left">
        <div className="es-logo-block">
          <span className="es-logo-text">AABHA IMPEX</span>
          <span className="es-logo-sub">Global Agri & Commodity Exports</span>
        </div>
      </div>
      <div className="es-header-center">
        <div className="es-doc-title">PRODUCT SPECIFICATION SHEET</div>
        <div className="es-doc-ref">Ref: AI/{product.hsCode || product.category?.toUpperCase()}/{new Date().getFullYear()}</div>
      </div>
      <div className="es-header-right">
        <div className="es-contact-block">
          <div className="es-contact-item"><Mail size={10} /> info@aabha-impex.com</div>
          <div className="es-contact-item"><Phone size={10} /> +91 XXXXX XXXXX</div>
          <div className="es-contact-item"><Globe size={10} /> www.aabha-impex.com</div>
        </div>
      </div>
    </div>

    {/* Gold Divider */}
    <div className="es-gold-bar"></div>

    {/* Product Title Strip */}
    <div className="es-title-strip">
      <h1 className="es-product-title">{product.name}</h1>
      <div className="es-badges">
        <span className="es-badge"><Award size={10} /> Export Grade</span>
        <span className="es-badge"><ShieldCheck size={10} /> Quality Certified</span>
        <span className="es-badge category">{product.category}</span>
      </div>
    </div>

    {/* Main Body */}
    <div className="es-body">
      {/* Left Column */}
      <div className="es-col-left">
        <div className="es-image-box">
          <img src={product.image} alt={product.name} />
        </div>

        {/* Quick Stats */}
        <div className="es-quick-stats">
          <div className="es-stat-row">
            <span className="es-stat-label">HS Code</span>
            <span className="es-stat-value">{product.hsCode || '—'}</span>
          </div>
          <div className="es-stat-row">
            <span className="es-stat-label">Origin</span>
            <span className="es-stat-value">{product.origin || 'India'}</span>
          </div>
          <div className="es-stat-row">
            <span className="es-stat-label">Packing</span>
            <span className="es-stat-value">{product.packing || '—'}</span>
          </div>
          <div className="es-stat-row">
            <span className="es-stat-label">Loading Port</span>
            <span className="es-stat-value">{product.loadingPort || '—'}</span>
          </div>
        </div>

        {/* Uses */}
        {product.uses && product.uses.length > 0 && (
          <div className="es-section">
            <div className="es-section-title">Key Applications</div>
            <ul className="es-uses-list">
              {product.uses.map((u, i) => <li key={i}><span className="es-dot">▸</span> {u}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="es-col-right">
        {/* Overview */}
        <div className="es-section">
          <div className="es-section-title">Product Overview</div>
          <p className="es-overview-text">{product.longDescription || product.description}</p>
        </div>

        {/* Technical Specs */}
        {product.specifications && product.specifications.length > 0 && (
          <div className="es-section">
            <div className="es-section-title">Technical Specifications</div>
            <table className="es-table">
              <tbody>
                {product.specifications.map((s, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'even' : ''}>
                    <th>{s.label}</th>
                    <td>{s.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Nutritional Profile */}
        {product.nutrients && product.nutrients.length > 0 && (
          <div className="es-section">
            <div className="es-section-title">Nutritional Profile <span className="es-table-note">(per 100g)</span></div>
            <table className="es-table nutrient-table">
              <thead>
                <tr><th>Component</th><th>Value</th></tr>
              </thead>
              <tbody>
                {product.nutrients.map((n, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'even' : ''}>
                    <td>{n.label}</td>
                    <td><strong>{n.value}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Export Details */}
        {product.exportDetails && (
          <div className="es-section">
            <div className="es-section-title">Logistics & Export Information</div>
            <p className="es-export-text">{product.exportDetails}</p>
            <div className="es-logistic-grid">
              <div className="es-log-chip"><Globe size={11} /> Global Delivery</div>
              <div className="es-log-chip"><ShieldCheck size={11} /> Phytosanitary Cert.</div>
              <div className="es-log-chip"><Truck size={11} /> FCL / LCL Available</div>
              <div className="es-log-chip"><Award size={11} /> FSSAI / ISO Ready</div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* Footer */}
    <div className="es-gold-bar"></div>
    <div className="es-footer">
      <div className="es-footer-left">
        <strong>AABHA IMPEX</strong> — Registered Exporter, India
        <span className="es-footer-addr"><MapPin size={9} /> Rajkot, Gujarat, India — 360XXX</span>
      </div>
      <div className="es-footer-center">
        <span className="es-disclaimer">This document is for informational purposes only. Specifications subject to change without notice.</span>
      </div>
      <div className="es-footer-right">
        <span>Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      </div>
    </div>
  </div>
);

/* ─────────────────────────────────────────
   Main Product Detail Page
───────────────────────────────────────── */
const ProductDetail = () => {
  const { id, lng } = useParams();
  const { t } = useTranslation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specification');

  const handlePrint = () => window.print();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
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
    <>
      {/* ── SCREEN VIEW ── */}
      <div className="product-detail-page no-print">
        <SEO
          title={product.name}
          description={product.description || `Premium quality ${product.name} from AABHA IMPEX.`}
          keywords={`${product.name}, ${product.category}, Indian Export, AABHA IMPEX`}
        />

        <section className="product-header-section">
          <div className="container">
            <nav className="breadcrumbs">
              <Link to={`/${lng}`}>{t('nav.home')}</Link> /&nbsp;
              <Link to={`/${lng}/products`}>{t('nav.products')}</Link> /&nbsp;
              <span>{product.name}</span>
            </nav>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="product-main-title">
              {product.name}
            </motion.h1>
          </div>
        </section>

        <section className="section-padding-sm detail-main-content">
          <div className="container">
            <div className="pisum-top-grid">
              <motion.div className="pisum-visual-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                <img src={product.image} alt={product.name} />
              </motion.div>

              <div className="pisum-overview-card">
                <div className="section-header-line"><h3>Overview</h3></div>
                <p className="overview-para">{product.longDescription || product.description}</p>

                {product.uses && product.uses.length > 0 && (
                  <div className="uses-box-premium">
                    <h4>Key Applications</h4>
                    <ul className="uses-grid-modern">
                      {product.uses.map((use, i) => (
                        <li key={i}><CheckCircle size={16} /> {use}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="quick-contact-strip">
                  <Link to={`/${lng}/contact`} className="btn btn-primary">Inquiry Now</Link>
                  <button className="btn btn-outline" onClick={handlePrint}>
                    <Download size={18} /> Export Sheet
                  </button>
                </div>
              </div>
            </div>

            <div className="pisum-tabs-container">
              <div className="tabs-navigation">
                <button className={activeTab === 'specification' ? 'active' : ''} onClick={() => setActiveTab('specification')}>Specification</button>
                {product.nutrients && product.nutrients.length > 0 && (
                  <button className={activeTab === 'nutrients' ? 'active' : ''} onClick={() => setActiveTab('nutrients')}>Nutrients</button>
                )}
                {product.exportDetails && (
                  <button className={activeTab === 'export' ? 'active' : ''} onClick={() => setActiveTab('export')}>Export Details</button>
                )}
              </div>

              <div className="tabs-content-pane">
                <AnimatePresence mode="wait">
                  {activeTab === 'specification' && (
                    <motion.div key="spec" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <table className="modern-spec-table">
                        <tbody>
                          {product.hsCode && <tr><th>HS Code</th><td>{product.hsCode}</td></tr>}
                          {product.origin && <tr><th>Country of Origin</th><td>{product.origin}</td></tr>}
                          {product.specifications?.map((spec, i) => <tr key={i}><th>{spec.label}</th><td>{spec.value}</td></tr>)}
                          {product.packing && <tr><th>Standard Packing</th><td>{product.packing}</td></tr>}
                          <tr><th>Shipping Port</th><td>{product.loadingPort}</td></tr>
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                  {activeTab === 'nutrients' && (
                    <motion.div key="nutrients" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <table className="modern-spec-table zebra">
                        <thead><tr><th>Component</th><th>Value (per 100g)</th></tr></thead>
                        <tbody>
                          {product.nutrients.map((n, i) => <tr key={i}><th>{n.label}</th><td>{n.value}</td></tr>)}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                  {activeTab === 'export' && (
                    <motion.div key="export" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="export-pane-rich">
                        <p>{product.exportDetails}</p>
                        <div className="logistics-grid">
                          <div className="log-item"><Globe size={24} /> <span>Global Network</span></div>
                          <div className="log-item"><ShieldCheck size={24} /> <span>SGS/Certified</span></div>
                          <div className="log-item"><Truck size={24} /> <span>Door Delivery</span></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ── PRINT-ONLY PREMIUM EXPORT SHEET ── */}
      <div className="print-only">
        <ExportSheet product={product} />
      </div>
    </>
  );
};

export default ProductDetail;
