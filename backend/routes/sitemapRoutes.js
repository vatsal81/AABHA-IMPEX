const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Blog = require('../models/Blog');

router.get('/sitemap.xml', async (req, res) => {
  try {
    const baseUrl = 'https://aabhaimpex.com';
    const languages = ['en', 'hi', 'gu', 'ar', 'ur', 'ml', 'ta', 'bn', 'tl'];
    const staticPages = ['', '/products', '/about', '/services', '/contact', '/blog', '/global-export'];
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static Pages for all languages
    languages.forEach(lng => {
      staticPages.forEach(page => {
        xml += `  <url>\n    <loc>${baseUrl}/${lng}${page}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
      });
    });

    // Products
    const products = await Product.find({ isActive: true });
    products.forEach(p => {
      languages.forEach(lng => {
        xml += `  <url>\n    <loc>${baseUrl}/${lng}/${p.category.toLowerCase()}/${p.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
      });
    });

    // Blogs
    const blogs = await Blog.find({ status: 'published' });
    blogs.forEach(b => {
      languages.forEach(lng => {
        xml += `  <url>\n    <loc>${baseUrl}/${lng}/blog/${b.slug}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      });
    });

    xml += '</urlset>';
    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('Error generating sitemap');
  }
});

module.exports = router;
