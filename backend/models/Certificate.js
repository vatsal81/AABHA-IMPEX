const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  imageUrl: { type: String }, // Authority logo
  fileUrl: { type: String, required: true }, // The certificate itself
  description: String
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
