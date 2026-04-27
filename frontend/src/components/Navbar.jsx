import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Menu, X, Instagram, Linkedin, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lng } = useParams();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = `/${lng}/login`;
  };

  const changeLanguage = (newLng) => {
    const currentPath = location.pathname;
    const pathParts = currentPath.split('/');
    pathParts[1] = newLng;
    const newPath = pathParts.join('/');
    i18n.changeLanguage(newLng);
    setLangDropdown(false);
    setIsOpen(false);
    navigate(newPath);
  };


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), path: `/${lng}` },
    { name: t('nav.products'), path: `/${lng}/products` },
    { name: t('nav.services'), path: `/${lng}/services` },
    { name: t('nav.export'), path: `/${lng}/global-export` },
    { name: t('nav.about'), path: `/${lng}/about` },
    { name: 'Insights', path: `/${lng}/blog` },
    { name: t('nav.contact'), path: `/${lng}/contact` },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' }
  ];


  const currentLang = languages.find(l => l.code === (lng || 'en'));
  const isHome = location.pathname === `/${lng}` || location.pathname === `/${lng}/`;

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${!isHome ? 'solid' : ''}`}>
      <div className="container nav-content">
        <div className="nav-left">
          <Link to={`/${lng}`} className="logo-container">
            <Logo light={!scrolled && isHome} size={scrolled || !isHome ? 45 : 60} />
          </Link>
        </div>

        <div className="nav-center">
          <nav className="desktop-menu">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="nav-right">
          <div className="desktop-actions">

            {/* Language Selector */}
            <div className="lang-selector-container">
              <button className="lang-selector-btn" onClick={() => setLangDropdown(!langDropdown)}>
                <Globe size={18} />
                <span>{currentLang?.label}</span>
                <ChevronDown size={14} className={langDropdown ? 'rotate' : ''} />
              </button>
              {langDropdown && (
                <div className="lang-dropdown">
                  {languages.map((l) => (
                    <button key={l.code} className={`lang-option ${lng === l.code ? 'active' : ''}`} onClick={() => changeLanguage(l.code)}>
                      <span className="flag">{l.flag}</span>
                      <span className="label">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="nav-socials">
              <a href="#"><Instagram size={18} /></a>
              <a href="#"><Linkedin size={18} /></a>
            </div>

            <Link to={`/${lng}/contact`} className="btn btn-cta">
              {t('nav.getQuote')}
            </Link>
          </div>

          <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="logo-text">AABHA IMPEX</span>
          <button onClick={() => setIsOpen(false)}><X size={30} /></button>
        </div>
        <div className="mobile-links">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="mobile-link" onClick={() => setIsOpen(false)}>{link.name}</Link>
          ))}
        </div>


        <div className="mobile-lang-section">
          <h4>{t('common.select_language') || 'Language'}</h4>
          <div className="mobile-lang-grid">
            {languages.map((l) => (
              <button key={l.code} className={`mobile-lang-btn ${lng === l.code ? 'active' : ''}`} onClick={() => changeLanguage(l.code)}>
                <span className="flag">{l.flag}</span> {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
