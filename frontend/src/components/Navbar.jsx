import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Menu, X, Instagram, Linkedin, Globe, ChevronDown, 
  Home as HomeIcon, Package, Settings, Users, FileText, Phone,
  Sun, Moon
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import Logo from './Logo';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langDropdown, setLangDropdown] = useState(false);
  
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const productCategories = [
    { name: 'Spices', path: `/${lng}/products?category=Spices` },
    { name: 'Fresh Fruits', path: `/${lng}/products?category=Fresh%20Fruits` },
    { name: 'Fresh Vegetables', path: `/${lng}/products?category=Fresh%20Vegetables` },
    { name: 'Oil Seeds', path: `/${lng}/products?category=Oil%20Seeds` },
    { name: 'Rice', path: `/${lng}/products?category=Rice` },
    { name: 'Pulses', path: `/${lng}/products?category=Pulses` },
  ];

  const navLinks = [
    { name: t('nav.home'), path: `/${lng}`, icon: <HomeIcon size={20} /> },
    { name: t('nav.products'), path: `/${lng}/products`, icon: <Package size={20} />, dropdown: productCategories },
    { name: t('nav.services'), path: `/${lng}/services`, icon: <Settings size={20} /> },
    { name: t('nav.export'), path: `/${lng}/global-export`, icon: <Globe size={20} /> },
    { name: t('nav.about'), path: `/${lng}/about`, icon: <Users size={20} /> },
    { name: t('nav.insights'), path: `/${lng}/blog`, icon: <FileText size={20} /> },

    { name: t('nav.contact'), path: `/${lng}/contact`, icon: <Phone size={20} /> },

  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ar', label: 'العربية', flag: '🇦🇪' },
    { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
    { code: 'gu', label: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'ur', label: 'اردو', flag: '🇵🇰' },
    { code: 'ml', label: 'മലയാളം', flag: '🇮🇳' },
    { code: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { code: 'bn', label: 'বাংলা', flag: '🇧🇩' },
    { code: 'tl', label: 'Tagalog', flag: '🇵🇭' }
  ];


  const currentLang = languages.find(l => l.code === (lng || 'en'));
  const isHome = location.pathname === `/${lng}` || location.pathname === `/${lng}/`;

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''} ${!isHome ? 'solid' : ''}`}>
      <div className="container">
        <div className="nav-floating-container">
          <div className="nav-left">
            <Link to={`/${lng}`} className="logo-container">
              <Logo size={70} />
            </Link>
          </div>

          <div className="nav-center">
            <nav className="desktop-menu">
              {navLinks.map((link) => (
                <div key={link.name} className={`nav-item-wrapper ${link.dropdown ? 'has-dropdown' : ''}`}>
                  <Link
                    to={link.path}
                    className={`nav-link ${location.pathname.startsWith(link.path) && link.path !== `/${lng}` ? 'active' : (location.pathname === link.path ? 'active' : '')}`}
                  >
                    <motion.span 
                      className="nav-icon"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.icon}
                    </motion.span>
                    <span className="nav-text">
                      {link.name} {link.dropdown && <ChevronDown size={12} className="dropdown-arrow" style={{display: 'inline', marginLeft: '4px', verticalAlign: 'middle'}} />}
                    </span>
                  </Link>
                  {link.dropdown && (
                    <div className="nav-dropdown-menu glass-panel">
                      {link.dropdown.map(dropItem => (
                        <Link key={dropItem.name} to={dropItem.path} className="dropdown-item">
                          {dropItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="nav-right">
            <div className="desktop-actions">
              <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
              
              <div className="lang-selector-box">
                <button className="lang-selector-btn" onClick={() => setLangDropdown(!langDropdown)}>
                  <Globe size={18} />
                  <span>{currentLang?.label}</span>
                  <ChevronDown size={14} className={langDropdown ? 'rotate' : ''} />
                </button>
                {langDropdown && (
                  <div className="lang-dropdown glass-panel">
                    {languages.map((l) => (
                      <button key={l.code} className={`lang-option ${lng === l.code ? 'active' : ''}`} onClick={() => changeLanguage(l.code)}>
                        <span className="flag">{l.flag}</span>
                        <span className="label">{l.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
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
            <div key={link.name} className="mobile-nav-group">
              <Link to={link.path} className="mobile-link" onClick={() => setIsOpen(false)}>
                {link.name}
              </Link>
              {link.dropdown && (
                <div className="mobile-dropdown-links">
                  {link.dropdown.map(dropItem => (
                    <Link key={dropItem.name} to={dropItem.path} className="mobile-dropdown-link" onClick={() => setIsOpen(false)}>
                      — {dropItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
