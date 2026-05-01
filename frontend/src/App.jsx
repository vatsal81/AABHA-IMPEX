import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Login from './pages/Login';
import GlobalExport from './pages/GlobalExport';
import Blog from './pages/Blog';
import IECRegistration from './pages/IECRegistration';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AnimatedBackground from './components/AnimatedBackground';
import CargoLoader from './components/CargoLoader';
import CookieConsent from './components/CookieConsent';
import { Toaster } from 'react-hot-toast';

// Layout component to keep Navbar and Footer persistent and handle language
const LanguageLayout = () => {
  const { lng } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const supportedLngs = ['en', 'hi', 'gu', 'ar', 'ur', 'ml', 'ta', 'bn', 'tl'];

  useEffect(() => {
    if (lng && supportedLngs.includes(lng)) {
      if (i18n.language !== lng) {
        i18n.changeLanguage(lng);
      }
    } else if (!lng) {
      // Root path, redirect to detected or fallback language
      const detectedLng = i18n.language.split('-')[0];
      const targetLng = supportedLngs.includes(detectedLng) ? detectedLng : 'en';
      navigate(`/${targetLng}${location.pathname}`, { replace: true });
    } else {
      // Invalid language prefix, treat as 404 or redirect to en
      navigate(`/en${location.pathname.replace(`/${lng}`, '')}`, { replace: true });
    }

    // Set direction and body class for RTL support
    const isRTL = lng === 'ar' || lng === 'ur';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lng || 'en';
    if (isRTL) {
      document.body.classList.add('rtl-active');
    } else {
      document.body.classList.remove('rtl-active');
    }
  }, [lng, i18n, navigate, location.pathname]);

  return (
    <>
      <Navbar />
      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            style={{ minHeight: '80vh' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

const ProtectedAdminRoute = () => {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  return isAuthenticated ? <Admin /> : <Navigate to="../login" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Simulate initial loading for professional feel - reduced for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <CargoLoader />;

  return (
    <Router>
      <motion.div
        className="scroll-progress-bar"
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'var(--secondary)',
          transformOrigin: '0%',
          zIndex: 9999
        }}
      />
      <Toaster position="top-right" />
      <ScrollToTop />
      <div className="app">
        <AnimatedBackground />
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to="/en" replace />} />
          
          {/* Language prefixed routes with unified Layout */}
          <Route path="/:lng" element={<LanguageLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="services" element={<Services />} />
            <Route path="global-export" element={<GlobalExport />} />
            <Route path="export" element={<Navigate to="../global-export" replace />} />
            <Route path="blog" element={<Blog />} />
            <Route path="iec-registration" element={<IECRegistration />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />


            <Route path="login" element={<Login />} />
            <Route path="admin-portal" element={<ProtectedAdminRoute />} />
            
            {/* Dynamic category route for products like pisumfoods.com/spices/chilli-pepper */}
            <Route path=":category/:id" element={<ProductDetail />} />
            
            {/* Fallback for invalid URLs within language scope */}
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Fallback for completely invalid URLs */}
          <Route path="*" element={<Navigate to="/en/404" replace />} />
        </Routes>
        <WhatsAppButton />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
