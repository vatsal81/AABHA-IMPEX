import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';
import SEO from '../components/SEO';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <SEO title="404 - Page Not Found" />
      <div className="container">
        <motion.div 
            className="not-found-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
        >
            <div className="error-code">404</div>
            <h1>Lost in <span className="italic">Trade?</span></h1>
            <p>The page you are looking for doesn't exist or has been moved. Let's get you back on track to global excellence.</p>
            
            <div className="not-found-actions">
                <Link to="/" className="btn btn-primary">
                    <Home size={18} /> Back to Home
                </Link>
                <Link to="/products" className="btn btn-outline">
                    <Search size={18} /> Search Products
                </Link>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
