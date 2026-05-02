import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Calendar, User, Clock, ChevronLeft, 
  Share2, Bookmark, ArrowRight, MessageSquare 
} from 'lucide-react';
import { fetchBlogBySlug } from '../services/api';
import './BlogDetail.css';

const BlogDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      const data = await fetchBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
      window.scrollTo(0, 0);
    };
    getBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail-loading">
        <div className="premium-loader"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-not-found">
        <h2>Article Not Found</h2>
        <p>The trade intelligence report you are looking for may have been archived.</p>
        <Link to="/blog" className="btn-gold-filled">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="blog-detail-page">
      {/* 1. Article Hero */}
      <section className="article-hero">
        <div className="article-hero-bg" style={{ backgroundImage: `url(${blog.image || "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&q=80&w=1920"})` }}></div>
        <div className="article-hero-overlay"></div>
        <div className="container">
          <motion.div 
            className="article-header-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link to="/blog" className="back-link">
              <ChevronLeft size={18} /> Back to Trade Intelligence
            </Link>
            <div className="article-category">{blog.category}</div>
            <h1>{blog.title}</h1>
            <div className="article-meta">
              <span className="meta-item"><Calendar size={16} /> {new Date(blog.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="meta-item"><User size={16} /> {blog.author}</span>
              <span className="meta-item"><Clock size={16} /> {blog.readTime || "6 min read"}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Article Body */}
      <section className="article-body-section">
        <div className="container">
          <div className="article-layout">
            {/* Sidebar / Tools */}
            <aside className="article-sidebar">
              <div className="sticky-tools">
                <button className="tool-btn" title="Share"><Share2 size={20} /></button>
                <button className="tool-btn" title="Save"><Bookmark size={20} /></button>
                <button className="tool-btn" title="Comments"><MessageSquare size={20} /></button>
              </div>
            </aside>

            {/* Content */}
            <main className="article-main-content">
              <div className="article-excerpt-highlight">
                {blog.excerpt}
              </div>
              
              <div className="article-rich-text" dangerouslySetInnerHTML={{ __html: blog.content }}>
              </div>

              <div className="article-tags">
                <span className="tag">#GlobalTrade</span>
                <span className="tag">#MarketAnalysis</span>
                <span className="tag">#ExportPolicy</span>
              </div>

              <div className="article-author-box">
                <div className="author-avatar">
                   {blog.author.charAt(0)}
                </div>
                <div className="author-info">
                   <h5>Written by {blog.author}</h5>
                   <p>Senior Trade Analyst at AABHA IMPEX specializing in global agricultural supply chains and emerging market trends.</p>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 3. Next Article / CTA */}
      <section className="next-article-cta section-padding">
        <div className="container">
          <div className="cta-glass-card">
            <div className="cta-text">
               <span>Next in Trade Intelligence</span>
               <h3>Navigating the $2 Trillion Export Target: India's 2030 Vision</h3>
            </div>
            <Link to="/blog" className="btn-secondary">
               Read Next <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
