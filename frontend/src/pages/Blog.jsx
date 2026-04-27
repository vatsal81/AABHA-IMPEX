import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, User, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { fetchBlogs } from '../services/api';
import Skeleton from '../components/Skeleton';
import './Blog.css';

const Blog = () => {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      setLoading(true);
      try {
        const data = await fetchBlogs();
        setPosts(data);
      } catch (error) {
        console.error("Failed to load blogs:", error);
      }
      setLoading(false);
    };
    loadBlogs();
  }, []);

  return (
    <div className="blog-page">
      <section className="page-header">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="label">{t('blog_page.header.label')}</span>
            <h1 dangerouslySetInnerHTML={{ __html: t('blog_page.header.title') }}></h1>
            <p>{t('blog_page.header.desc')}</p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {loading ? (
             <div className="blog-grid">
               {[1, 2, 3].map(i => <Skeleton key={i} type="card" />)}
             </div>
          ) : (
            <div className="blog-grid">
              {posts.length > 0 ? (
                posts.map((post, i) => (
                  <motion.article 
                    key={post._id || post.id}
                    className="blog-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="blog-image">
                       <img src={post.image || "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=800"} alt={post.title} />
                       <div className="blog-category">{post.category || "General"}</div>
                    </div>
                    <div className="blog-content">
                       <div className="blog-meta">
                          <span><Calendar size={14} /> {new Date(post.createdAt || Date.now()).toLocaleDateString()}</span>
                          <span><User size={14} /> {post.author || "Admin"}</span>
                       </div>
                       <h3>{post.title}</h3>
                       <p>{post.excerpt || post.content?.substring(0, 100) + '...'}</p>
                       <div className="blog-footer">
                          <button className="read-more">Read Full Insight <ArrowRight size={16} /></button>
                          <div className="blog-actions">
                             <Share2 size={18} />
                             <Bookmark size={18} />
                          </div>
                       </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div style={{gridColumn: "1 / -1", textAlign: "center", padding: "50px 0"}}>
                  <h3>No insights published yet.</h3>
                  <p>Check back later for market updates and trade education.</p>
                </div>
              )}
            </div>
          )}

          <div className="newsletter-box">
             <div className="newsletter-content">
                <h2 dangerouslySetInnerHTML={{ __html: t('blog_page.newsletter.title') }}></h2>
                <p>{t('blog_page.newsletter.desc')}</p>
                <form className="newsletter-form">
                   <input type="email" placeholder={t('blog_page.newsletter.placeholder')} required />
                   <button type="submit" className="btn btn-primary">{t('blog_page.newsletter.btn')}</button>
                </form>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
