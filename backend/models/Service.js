const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: 'FileText' }, // Store Lucide icon name
  image: { type: String }, // Optional image URL
  details: [{ type: String }],
  color: { type: String, default: 'var(--primary)' }
});

module.exports = mongoose.model('Service', serviceSchema);
