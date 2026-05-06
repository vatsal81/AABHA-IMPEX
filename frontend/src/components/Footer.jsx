import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowRight, Globe } from 'lucide-react';
import Logo from './Logo';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { lng } = useParams();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to={`/${lng}`} style={{ display: 'inline-block', marginBottom: '25px' }}>
              <Logo size={60} />
            </Link>
            <p>{t('footer.tagline')}</p>
            <div className="social-links">
              <a href="https://www.instagram.com/aabhaimpex?igsh=ZW05M3VsMWFweWEz" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/aabha-impex/" target="_blank" rel="noopener noreferrer"><Linkedin size={20} /></a>
              <a href="https://www.globallinker.com/seller/aabha-impex" target="_blank" rel="noopener noreferrer" title="Global Linker"><Globe size={20} /></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>{t('footer.quick_links')}</h3>
            <ul>
              <li><Link to={`/${lng}/products`}><ArrowRight size={14} /> {t('nav.products')}</Link></li>
              <li><Link to={`/${lng}/about`}><ArrowRight size={14} /> {t('nav.about')}</Link></li>
              <li><Link to={`/${lng}/services`}><ArrowRight size={14} /> {t('nav.services')}</Link></li>
              <li><Link to={`/${lng}/contact`}><ArrowRight size={14} /> {t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="footer-newsletter">
            <h3>{t('footer.newsletter_title') || 'Stay Globally Connected'}</h3>
            <p>{t('footer.newsletter_desc') || 'Get the latest insights on international trade and market trends.'}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder={t('footer.email_placeholder') || 'Your Business Email'} required className="glass-card" />
              <button type="submit" className="btn-premium gold">
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom glass-panel">
          <p>&copy; {new Date().getFullYear()} AABHA IMPEX. {t('footer.rights')}</p>
          <div className="footer-legal">
            <Link to="#">{t('footer.privacy')}</Link>
            <Link to="#">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
