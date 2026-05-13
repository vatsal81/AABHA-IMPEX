import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Share2, Bookmark, Search, Clock, ChevronRight, TrendingUp, Filter, BellRing } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../services/api';
import Skeleton from '../components/Skeleton';
import CropCalendar from '../components/CropCalendar';
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

  const featuredPost = posts.find(p => p.isFeatured) || posts[0];
  const regularPosts = filteredPosts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="blog-page trade-journal">
      <section className="journal-header">
        <div className="container">
          <div className="journal-masthead">
             <div className="masthead-top">
                <span className="current-date">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
                <div className="masthead-logo">INDUSTRY <span className="text-gold">INTELLIGENCE</span></div>
                <div className="masthead-meta">Volume IV | Issue 12</div>
             </div>
             <div className="masthead-bottom">
                <div className="journal-nav">
                   {categories.map(cat => (
                      <button 
                         key={cat} 
                         className={`nav-link ${activeCategory === cat ? 'active' : ''}`}
                         onClick={() => setActiveCategory(cat)}
                      >
                         {cat}
                      </button>
                   ))}
                </div>
                <div className="journal-search">
                   <Search size={16} />
                   <input 
                      type="text" 
                      placeholder="Search Intelligence Archive..." 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                   />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Analysis Hero */}
      {!loading && featuredPost && activeCategory === 'All' && !searchTerm && (
        <section className="featured-analysis">
          <div className="container">
            <motion.div 
              className="featured-box glass-panel"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="featured-image">
                <img src={featuredPost.image || "https://images.unsplash.com/photo-1454165833767-027ffea9e77b"} alt={featuredPost.title} />
                <div className="featured-badge"><TrendingUp size={14} /> Featured Analysis</div>
              </div>
              <div className="featured-text">
                <span className="f-cat">{featuredPost.category}</span>
                <h2>{featuredPost.title}</h2>
                <p>{featuredPost.excerpt || featuredPost.content?.substring(0, 200) + '...'}</p>
                <div className="f-meta">
                  <span><User size={14} /> By AABHA Trade Desk</span>
                  <span><Clock size={14} /> {featuredPost.readTime || '8 min read'}</span>
                </div>
                <Link to={`/blog/${featuredPost.slug}`} className="btn btn-primary">
                  Read Analysis <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <section className="journal-content-section">
        <div className="container">
          <div className="journal-layout-grid">
            {/* Main Column */}
            <div className="main-journal-column">
              <div className="section-title-journal">
                <h3>{activeCategory === 'All' ? 'Latest Reports' : activeCategory}</h3>
                <div className="title-line"></div>
              </div>

              {loading ? (
                <div className="journal-list">
                  {[1, 2, 3].map(i => <Skeleton key={i} type="card" />)}
                </div>
              ) : (
                <div className="journal-list">
                  <AnimatePresence mode="popLayout">
                    {regularPosts.map((post, i) => (
                      <motion.article 
                        key={post._id || post.id}
                        className="journal-article-row"
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <div className="article-thumb">
                          <img src={post.image || "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f"} alt={post.title} />
                        </div>
                        <div className="article-body">
                          <div className="article-meta">
                            <span className="a-cat">{post.category}</span>
                            <span className="a-date">{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h4><Link to={`/blog/${post.slug}`}>{post.title}</Link></h4>
                          <p>{post.excerpt}</p>
                          <div className="article-footer">
                            <Link to={`/blog/${post.slug}`} className="read-link">Full Report <ChevronRight size={14} /></Link>
                            <div className="article-actions">
                              <Share2 size={14} />
                              <Bookmark size={14} />
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </AnimatePresence>

                  {filteredPosts.length === 0 && (
                    <div className="no-intel-found">
                       <Search size={40} />
                       <h4>No intelligence reports match your criteria.</h4>
                       <button onClick={() => {setSearchTerm(''); setActiveCategory('All');}}>View All Archives</button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="journal-sidebar">
              <div className="sidebar-widget">
                <CropCalendar />
              </div>

              <div className="sidebar-widget trade-alerts-widget glass-panel">
                <div className="alert-icon-box"><BellRing size={24} /></div>
                <h4>Trade Alerts</h4>
                <p>Receive real-time market shifts and crop alerts directly in your inbox.</p>
                <form className="alert-form">
                  <input type="email" placeholder="trade.desk@example.com" />
                  <button className="btn btn-gold w-100">Subscribe to Alerts</button>
                </form>
                <span className="privacy-note">Secure & Confidential Trade Desk Access</span>
              </div>

              <div className="sidebar-widget trending-topics">
                <div className="section-title-journal">
                   <h3>Market Indicators</h3>
                   <div className="title-line"></div>
                </div>
                <div className="indicator-list">
                   <div className="indicator-item">
                      <span>Logistics Index</span>
                      <span className="val up">+2.1%</span>
                   </div>
                   <div className="indicator-item">
                      <span>Agri-Commodity Index</span>
                      <span className="val down">-0.4%</span>
                   </div>
                   <div className="indicator-item">
                      <span>Export Demand</span>
                      <span className="val up">+5.7%</span>
                   </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
