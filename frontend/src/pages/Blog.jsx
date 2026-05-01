import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Share2, Bookmark, Search, Clock, ChevronRight } from 'lucide-react';
import { fetchBlogs } from '../services/api';
import Skeleton from '../components/Skeleton';
import './Blog.css';

const Blog = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Market Updates', 'Trade Intelligence', 'Logistics', 'Industry Trends'];

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs();
        setPosts(data);
        setFilteredPosts(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
      setLoading(false);
    };
    loadBlogs();
  }, []);

  useEffect(() => {
    let result = posts;
    if (activeCategory !== 'All') {
      result = result.filter(post => post.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    setFilteredPosts(result);
  }, [searchTerm, activeCategory, posts]);

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="hero-patterns">
           <div className="pattern-circle p1"></div>
           <div className="pattern-circle p2"></div>
           <div className="pattern-circle p3"></div>
        </div>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="hero-content"
          >
            <span className="blog-label">{t('blog_page.header.label')}</span>
            <h1 className="blog-title" dangerouslySetInnerHTML={{ __html: t('blog_page.header.title') }}></h1>
            <p className="blog-subtitle">{t('blog_page.header.desc')}</p>
            
            <div className="blog-breadcrumbs">
               <span>Home</span> <ChevronRight size={14} /> <span>Blogs</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="blog-filters-section">
        <div className="container">
           <div className="filters-wrapper">
              <div className="categories-tabs">
                 {categories.map(cat => (
                    <button 
                       key={cat} 
                       className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                       onClick={() => setActiveCategory(cat)}
                    >
                       {cat}
                    </button>
                 ))}
              </div>
              <div className="search-box">
                 <Search size={18} className="search-icon" />
                 <input 
                    type="text" 
                    placeholder="Search blogs..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
              </div>
           </div>
        </div>
      </section>

      <section className="blog-grid-section">
        <div className="container">
          {loading ? (
             <div className="blog-grid">
               {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} type="card" />)}
             </div>
          ) : (
            <div className="blog-grid">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <motion.article 
                    key={post._id || post.id}
                    className="premium-blog-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.5 }}
                  >
                    <div className="card-image-wrapper">
                       <img src={post.image || "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800"} alt={post.title} />
                       <div className="card-category-tag">{post.category || "General"}</div>
                    </div>
                    <div className="card-body">
                       <div className="card-meta-top">
                          <span className="card-date"><Calendar size={14} /> {new Date(post.createdAt || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span className="card-read-time"><Clock size={14} /> {post.readTime || "5 min read"}</span>
                       </div>
                       <h3 className="card-title">{post.title}</h3>
                       <p className="card-excerpt">{post.excerpt || post.content?.substring(0, 110) + '...'}</p>
                       <div className="card-footer-premium">
                          <button className="premium-read-more">
                             Read Full Blog <ArrowRight size={16} />
                          </button>
                          <div className="card-quick-actions">
                             <button title="Share"><Share2 size={16} /></button>
                             <button title="Bookmark"><Bookmark size={16} /></button>
                          </div>
                       </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="no-results">
                  <div className="no-results-icon"><Search size={40} /></div>
                  <h3>No blogs found</h3>
                  <p>Try adjusting your search or category filters.</p>
                  <button className="btn-gold-filled" onClick={() => {setSearchTerm(''); setActiveCategory('All');}}>Reset Filters</button>
                </div>
              )}
            </div>
          )}

          <div className="blog-newsletter-section">
             <div className="newsletter-premium-card">
                <div className="newsletter-visual">
                   <div className="visual-circle"></div>
                   <div className="visual-circle"></div>
                </div>
                <div className="newsletter-content-v2">
                   <h2 dangerouslySetInnerHTML={{ __html: t('blog_page.newsletter.title') }}></h2>
                   <p>{t('blog_page.newsletter.desc')}</p>
                   <form className="newsletter-form-v2">
                      <div className="input-group-premium">
                         <input type="email" placeholder={t('blog_page.newsletter.placeholder')} required />
                         <button type="submit" className="btn-gold-filled">
                            {t('blog_page.newsletter.btn')}
                         </button>
                      </div>
                   </form>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
