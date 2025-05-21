import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { contactRouter } from './routes/contact';
import { testRouter } from './routes/test';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-portfolio-website.vercel.app'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/test', testRouter); // Add this line

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
