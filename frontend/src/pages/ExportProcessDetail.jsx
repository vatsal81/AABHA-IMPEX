import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ClipboardCheck, ShieldCheck, Package, Truck, Ship, 
  ArrowLeft, CheckCircle2, Globe, Zap, Shield, HelpCircle, ArrowRight
} from 'lucide-react';
import SEO from '../components/SEO';
import './ExportProcessDetail.css';

const processData = {
  'inquiry': {
    id: 'inquiry',
    icon: <ClipboardCheck size={60} />,
    title: "Inquiry & Quotation",
    label: "PHASE 01",
    desc: "Expert analysis of global requirements, providing transparent FOB/CIF pricing, and tailored product specifications for various international markets.",
    longDesc: "Our journey begins with a deep dive into your specific needs. We don't just provide a price; we provide a partnership. Our experts analyze current market trends, shipping logistics, and seasonal fluctuations to offer the most competitive and transparent pricing structures available.",
    features: [
      "Real-time market analysis for optimal pricing",
      "Tailored product specification sheets",
      "Transparent FOB, CIF, and CNF options",
      "Dedicated account management"
    ],
    next: 'quality'
  },
  'quality': {
    id: 'quality',
    icon: <ShieldCheck size={60} />,
    title: "Quality Inspection",
    label: "PHASE 02",
    desc: "Rigorous multi-stage checks at farm and warehouse levels. We facilitate third-party inspections to ensure 100% compliance.",
    longDesc: "At AABHA IMPEX, quality is not a department; it's a culture. We implement a multi-tiered inspection protocol that starts at the source. Every batch is tested for purity, moisture content, and nutritional profile, ensuring that only the finest produce carries our name.",
    features: [
      "Farm-level primary quality checks",
      "Laboratory testing for nutritional profiles",
      "SGS / Bureau Veritas third-party certification",
      "Zero-tolerance policy for impurities"
    ],
    next: 'packaging'
  },
  'packaging': {
    id: 'packaging',
    icon: <Package size={60} />,
    title: "Custom Packaging",
    label: "PHASE 03",
    desc: "Premium, moisture-proof packaging solutions. We offer private labeling and bulk industrial packaging tailored to maintain freshness.",
    longDesc: "Proper packaging is critical to preserving quality over long distances. We offer bespoke packaging solutions ranging from small retail packs to industrial-scale bulk bags. Our moisture-lock technology ensures that your products arrive in the same pristine condition they left our warehouse.",
    features: [
      "Moisture-proof vacuum sealing technology",
      "Private labeling and branding services",
      "Export-grade heavy-duty corrugated cartons",
      "Eco-friendly packaging options available"
    ],
    next: 'logistics'
  },
  'logistics': {
    id: 'logistics',
    icon: <Truck size={60} />,
    title: "Logistics & Documentation",
    label: "PHASE 04",
    desc: "End-to-end handling of all regulatory paperwork including IEC, Phyto-sanitary certificates, and Certificates of Origin.",
    longDesc: "Navigating international trade regulations can be complex. Our documentation team handles the entire process—from obtaining Import-Export Codes to securing Phyto-sanitary and Origin certificates. We ensure your shipment has all the necessary 'green channel' clearances for rapid transit.",
    features: [
      "Zero-error documentation management",
      "Phyto-sanitary & Origin certification",
      "Customs clearing at major Indian ports",
      "Strategic multi-modal freight planning"
    ],
    next: 'delivery'
  },
  'delivery': {
    id: 'delivery',
    icon: <Ship size={60} />,
    title: "Global Delivery",
    label: "PHASE 05",
    desc: "Seamless last-mile connectivity and real-time tracking across our network. We ensure on-time delivery to ports and warehouses.",
    longDesc: "The final step is the most rewarding. We coordinate with global shipping lines to ensure your cargo is prioritized. With real-time tracking and a dedicated logistics desk, you'll always know exactly where your investment is, until it reaches its final destination.",
    features: [
      "Priority shipping with top-tier liners",
      "Real-time GPS cargo tracking",
      "Last-mile delivery to warehouses",
      "Comprehensive transit insurance"
    ],
    next: 'inquiry'
  }
};

const ExportProcessDetail = () => {
  const { lng, stepId } = useParams();
  const step = processData[stepId] || processData['inquiry'];

  return (
    <div className="process-detail-page">
      <SEO 
        title={`${step.title} | AABHA IMPEX Process`}
        description={step.desc}
      />

      <div className="container">
        <Link to={`/${lng}/global-export`} className="back-link reveal-up">
          <ArrowLeft size={18} /> Back to Global Export
        </Link>

        <section className="process-hero-section">
          <div className="hero-layout">
            <motion.div 
              className="hero-text reveal-up"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="phase-badge">{step.label}</span>
              <h1>{step.title}</h1>
              <p className="lead">{step.desc}</p>
              
              <div className="trust-indicators">
                <div className="indicator">
                  <Shield size={20} className="text-gold" />
                  <span>ISO 9001:2015 Verified</span>
                </div>
                <div className="indicator">
                  <Zap size={20} className="text-gold" />
                  <span>Priority Processing</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="hero-icon-box glass-panel reveal-up"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <div className="floating-icons">
                 <Globe className="f-icon f-1" />
                 <CheckCircle2 className="f-icon f-2" />
              </div>
              <div className="main-icon">{step.icon}</div>
              <div className="glow-effect"></div>
            </motion.div>
          </div>
        </section>

        <section className="detail-content-section section-padding">
          <div className="content-grid">
            <motion.div 
              className="content-main glass-panel reveal-up"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Detailed Overview</h3>
              <p>{step.longDesc}</p>
              
              <div className="feature-list">
                {step.features.map((f, i) => (
                  <div key={i} className="feature-item">
                    <CheckCircle2 className="text-gold" size={24} />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <aside className="content-sidebar">
              <div className="sidebar-card glass-panel reveal-up">
                <HelpCircle className="text-gold" size={40} />
                <h4>Need more info?</h4>
                <p>Our trade experts are available 24/7 to provide specific details regarding this phase.</p>
                <Link to={`/${lng}/contact`} className="btn-premium gold">Contact Specialist</Link>
              </div>

              <div className="next-step-card glass-panel reveal-up">
                <span className="label">NEXT PHASE</span>
                <h4>{processData[step.next].title}</h4>
                <Link to={`/${lng}/export-process/${step.next}`} className="next-link">
                   View Next Phase <ArrowRight size={18} />
                </Link>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExportProcessDetail;
