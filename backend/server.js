const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middleware/errorMiddleware');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const blogRoutes = require('./routes/blogRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const certificateRoutes = require('./routes/certificateRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
// const seedRoutes = require('./routes/seedRoutes');
const marketRoutes = require('./routes/marketRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow any localhost or 127.0.0.1 origin
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1') || origin.includes('vercel.app')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization', 'x-requested-with'],
  credentials: true
}));

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" } 
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Increased for development
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiter to all routes
// app.use('/api/', limiter);

// MongoDB Connection with Retry Logic
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aabha_impex';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000, // Increased timeout
      socketTimeoutMS: 45000,
      autoIndex: true,
      family: 4, // Force IPv4 (fixes many ECONNREFUSED issues)
      retryWrites: true,
    });
    console.log('✅ Connected to MongoDB Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('🔄 Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/upload', uploadRoutes);
// app.use('/api/seed', seedRoutes);
app.use('/api/market', marketRoutes);

app.get('/', (req, res) => {
  res.send('AABHA IMPEX API is running (Production Grade)...');
});

// Error Middleware (Must be after routes)
app.use(errorMiddleware);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT} (All Interfaces)`);
});
