import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const { lng } = useParams();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="logo-text">AABHA IMPEX</h2>
            <p>{t('footer.tagline')}</p>
            <div className="social-links">
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Linkedin size={20} /></a>
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

          <div className="footer-contact">
            <h3>{t('footer.contact_info')}</h3>
            <ul>
              <li><Mail size={18} /> aabhaimpex209@gmail.com</li>
              <li><Phone size={18} /> +91 99042 12151</li>
              <li><MapPin size={18} /> Vavdi Industrial Area, Rajkot, Gujarat</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
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
