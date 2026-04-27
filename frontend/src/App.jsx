import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
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
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AnimatedBackground from './components/AnimatedBackground';
import CargoLoader from './components/CargoLoader';
import { Toaster } from 'react-hot-toast';

// Layout component to keep Navbar and Footer persistent and handle language
const LanguageLayout = () => {
  const { lng } = useParams();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const supportedLngs = ['en', 'hi', 'gu'];

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
            transition={{ duration: 0.3, ease: "easeInOut" }}
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

  useEffect(() => {
    // Simulate initial loading for professional feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <CargoLoader />;

  return (
    <Router>
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
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="admin-portal" element={<ProtectedAdminRoute />} />
            
            {/* Fallback for invalid URLs within language scope */}
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Fallback for completely invalid URLs */}
          <Route path="*" element={<Navigate to="/en/404" replace />} />
        </Routes>
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
