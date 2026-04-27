const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const seedRoutes = require('./routes/seedRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/aabha_impex';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/seed', seedRoutes);

app.get('/', (req, res) => {
  res.send('AABHA IMPEX API is running (Refactored Version)...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
