import express from 'express';
import type { RequestHandler } from 'express';
import { Contact } from '../models/Contact';

const router = express.Router();

// Simple test handler to verify MongoDB connection
const testHandler: RequestHandler = async (req, res) => {
  try {
    // Create a test document
    const testContact = new Contact({
      name: 'Test User',
      email: 'test@example.com',
      message: 'This is a test message to verify MongoDB connection'
    });
    
    // Save to database
    await testContact.save();
    
    // Retrieve it to confirm it was saved
    const allContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
    
    res.status(200).json({ 
      success: true, 
      message: 'MongoDB connection is working!',
      testDocument: testContact,
      recentContacts: allContacts
    });
  } catch (error) {
    console.error('MongoDB test error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'MongoDB connection test failed',
      error: String(error)
    });
  }
};

router.get('/', testHandler);

export { router as testRouter };
