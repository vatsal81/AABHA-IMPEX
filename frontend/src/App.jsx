import React, { useEffect, useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AnimatedBackground from './components/AnimatedBackground';
import CargoLoader from './components/CargoLoader';
import CookieConsent from './components/CookieConsent';
import QuickActionFAB from './components/QuickActionFAB';
import TradeAssistant from './components/TradeAssistant';
import { Toaster } from 'react-hot-toast';
import TradeIntelligenceBar from './components/TradeIntelligenceBar';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));
const GlobalExport = lazy(() => import('./pages/GlobalExport'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const IECRegistration = lazy(() => import('./pages/IECRegistration'));
const ExportProcessDetail = lazy(() => import('./pages/ExportProcessDetail'));
const NotFound = lazy(() => import('./pages/NotFound'));

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

    // Reveal animation observer
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Small delay to ensure DOM is updated after route change
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-up');
      revealElements.forEach(el => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [lng, i18n, navigate, location.pathname]);

  return (
    <>
      <TradeIntelligenceBar />
      <Navbar />
      <div className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
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
  const currentPath = window.location.pathname;
  const isHomePage = currentPath === '/' || 
                     currentPath.match(/^\/(en|hi|gu|ar|ur|ml|ta|bn|tl)(\/)?$/);

  const [isLoading, setIsLoading] = useState(isHomePage);

  if (isLoading && isHomePage) {
    return <CargoLoader onFinish={() => setIsLoading(false)} />;
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <ScrollToTop />
      <div className="app">
        <AnimatedBackground />
        <Suspense fallback={null}>
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
              <Route path="export-process/:stepId" element={<ExportProcessDetail />} />
              <Route path="export" element={<Navigate to="../global-export" replace />} />
              <Route path="blog" element={<Blog />} />
              <Route path="blog/:slug" element={<BlogDetail />} />
              <Route path="iec-registration" element={<IECRegistration />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="admin-portal" element={<ProtectedAdminRoute />} />

              {/* Dynamic category route */}
              <Route path=":category/:id" element={<ProductDetail />} />

              {/* Fallback for invalid URLs within language scope */}
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* Fallback for completely invalid URLs */}
            <Route path="*" element={<Navigate to="/en/404" replace />} />
          </Routes>
        </Suspense>
        <WhatsAppButton />
        <QuickActionFAB />
        <TradeAssistant />
        <CookieConsent />
      </div>
    </Router>
  );
}

export default App;
