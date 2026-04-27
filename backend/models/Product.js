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
  available: { type: Boolean, default: true }
});

module.exports = mongoose.model('Product', productSchema);
