import express from 'express';
import nodemailer from 'nodemailer';
import { Contact } from '../models/Contact';
import type { RequestHandler } from 'express';

const router = express.Router();

// Use RequestHandler type which is specifically designed for Express route handlers
const contactHandler: RequestHandler = async (req, res): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    
    // Validate input
    if (!name || !email || !message) {
      res.status(400).json({ 
        success: false, 
        message: 'Please provide name, email and message' 
      });
      return;
    }
    
    // Save to database
    const newContact = new Contact({
      name,
      email,
      message
    });
    
    await newContact.save();
    
    // Send email notification - with error handling
    try {
      // Check if email credentials are set
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });
        
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to yourself
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
          `
        });
        
        console.log('Email notification sent successfully');
      } else {
        console.log('Email notification skipped - credentials not set');
      }
    } catch (emailError) {
      // Continue even if email fails
      console.error('Failed to send email notification:', emailError);
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Your message was sent successfully!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error, please try again later' 
    });
  }
};

// Apply the handler to the route
router.post('/', contactHandler);

export { router as contactRouter };
