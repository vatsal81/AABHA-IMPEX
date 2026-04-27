import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Search, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import SEO from '../components/SEO';
import Skeleton from '../components/Skeleton';
import './Products.css';

const Products = () => {
  const { t } = useTranslation();
  const { lng } = useParams();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const categories = [
    { id: 'All', label: t('products_page.filter.all') },
    { id: 'Seeds', label: t('products_page.filter.seeds') },
    { id: 'Pulses', label: t('products_page.filter.pulses') },
    { id: 'Spices', label: t('products_page.filter.spices') },
    { id: 'Construction', label: t('products_page.filter.construction') }
  ];

  const filteredProducts = products.filter(p => {
    const matchesFilter = filter === 'All' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getProductImage = (p) => {
    return p.image || "https://images.unsplash.com/photo-1542838132-92c53300491e";
  };

  return (
    <div className="products-page">
      <SEO 
        title={t('nav.products')} 
        description={t('products_page.header.desc')}
      />
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">{t('products_page.header.label')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('products_page.header.title') }}></h1>
            <p>{t('products_page.header.desc')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="modern-filter-bar">
            <div className="categories-pill">
              {categories.map(cat => (
                <button 
                  key={cat.id} 
                  className={`pill-btn ${filter === cat.id ? 'active' : ''}`}
                  onClick={() => setFilter(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            <div className="modern-search">
                <Search size={18} />
                <input 
                    type="text" 
                    placeholder={t('products_page.filter.search')} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>

          {loading ? (
            <div className="artisanal-products-grid">
                {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} type="card" />)}
            </div>
          ) : (
            <div className="artisanal-products-grid">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  key={product._id || product.id} 
                  className="art-product-card"
                >
                  <div className="art-product-img">
                    <img 
                        src={getProductImage(product)} 
                        alt={product.name} 
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800";
                        }}
                    />
                    <div className="art-cat-badge">{product.category}</div>
                  </div>
                  <div className="art-product-details">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <Link to={`/${lng}/products/${product._id || product.id}`} className="btn btn-outline btn-sm">
                        {t('products_page.card.view_details')} <ArrowRight size={14} style={{marginLeft: '8px'}} />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
