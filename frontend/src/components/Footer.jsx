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

          <div className="footer-contact">
            <h3>{t('footer.contact_info')}</h3>
            <ul>
              <li><Mail size={18} /> aabhaimpex209@gmail.com</li>
              <li><Phone size={18} /> +91 94268 68883</li>
              <li><MapPin size={18} /> Vavdi Industrial Area, Rajkot, Gujarat</li>
            </ul>
          </div>

          {/* <div className="footer-certs">
            <h3>{t('footer.certifications') || 'Global Certifications'}</h3>
            <div className="cert-grid">
              <div className="cert-badge" title="Agricultural and Processed Food Products Export Development Authority">
                 <span>APEDA</span>
              </div>
              <div className="cert-badge" title="Food Safety and Standards Authority of India">
                 <span>FSSAI</span>
              </div>
              <div className="cert-badge" title="Import Export Code">
                 <span>IEC</span>
              </div>
              <div className="cert-badge" title="ISO 9001:2015 Certified">
                 <span>ISO 9001</span>
              </div>
            </div>
          </div> */}

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
