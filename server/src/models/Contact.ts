import mongoose, { Document } from 'mongoose';

// Define interface for Contact document
export interface IContact extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

// Create schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create and export model
export const Contact = mongoose.model<IContact>('Contact', contactSchema);
