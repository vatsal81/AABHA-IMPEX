const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  image: { type: String },
  category: { type: String, default: 'Trade Trends' },
  publishedAt: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
