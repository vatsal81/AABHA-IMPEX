const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: String,
  longDescription: String,
  image: String,
  specifications: [{ label: String, value: String }],
  benefits: [String],
  packing: String,
  hsCode: String,
  origin: { type: String, default: 'India' },
  loadingPort: { type: String, default: 'Mundra / Pipavav, India' },
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);
