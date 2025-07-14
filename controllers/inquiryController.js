const asyncHandler = require('express-async-handler');
const Inquiry = require('../model/Inquiry'); 
const sendEmail = require('../utils/SendEmail');

// @desc    Create a new inquiry
// @route   POST /api/inquiries
// @access  Public (for contact form submissions)
const createInquiry = asyncHandler(async (req, res) => {
  // CRITICAL FIX: Destructure from req.body using 'fullName' and 'emailAddress'
  const { fullName, emailAddress, subject, message } = req.body;

  // Basic validation using new field names
  if (!fullName || !emailAddress || !subject || !message) {
    res.status(400);
    throw new Error('Please fill all required fields for the inquiry: Full Name, Email Address, Subject, Message');
  }

  try {
    const inquiry = new Inquiry({
      fullName,     // Use 'fullName'
      emailAddress, // Use 'emailAddress'
      subject,
      message,
    });

    const createdInquiry = await inquiry.save();

    // Optionally send an email notification to admin for new inquiry
    const emailSubject = `New Website Inquiry: ${subject}`;
    const emailHtml = `
      <h3>New Inquiry from Website Contact Form</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${emailAddress}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong> ${message}</p>
      <p>Status: ${createdInquiry.status}</p>
    `;
    await sendEmail(process.env.ADMIN_EMAIL || 'youradmin@example.com', emailSubject, emailHtml);

    res.status(201).json({ 
      message: 'Inquiry submitted successfully!',
      inquiry: createdInquiry 
    });
  } catch (error) {
    console.error("Error creating inquiry:", error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400);
      throw new Error(`Inquiry validation failed: ${messages.join(', ')}`);
    } else {
      res.status(500);
      throw new Error('Failed to create inquiry. Please try again later.');
    }
  }
});

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Private/Admin
const getAllInquiries = asyncHandler(async (req, res) => { 
  const inquiries = await Inquiry.find({}); 
  res.json(inquiries);
});

// @desc    Get single inquiry by ID
// @route   GET /api/inquiries/:id
// @access  Private/Admin
const getInquiryById = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (inquiry) {
    res.json(inquiry);
  } else {
    res.status(404);
    throw new Error('Inquiry not found');
  }
});

// @desc    Update an inquiry
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
const updateInquiry = asyncHandler(async (req, res) => {
  // CRITICAL FIX: Use 'fullName' and 'emailAddress' when destructuring
  const { fullName, emailAddress, subject, message, status } = req.body;

  const inquiry = await Inquiry.findById(req.params.id);

  if (inquiry) {
    inquiry.fullName = fullName || inquiry.fullName;       // Use 'fullName'
    inquiry.emailAddress = emailAddress || inquiry.emailAddress; // Use 'emailAddress'
    inquiry.subject = subject || inquiry.subject;
    inquiry.message = message || inquiry.message;
    inquiry.status = status || inquiry.status; 

    const updatedInquiry = await inquiry.save();
    res.json(updatedInquiry);
  } else {
    res.status(404);
    throw new Error('Inquiry not found');
  }
});

// @desc    Delete an inquiry
// @route   DELETE /api/inquiries/:id
// @access  Private/Admin
const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (inquiry) {
    await inquiry.deleteOne();
    res.json({ message: 'Inquiry removed' });
  } else {
    res.status(404);
    throw new Error('Inquiry not found');
  }
});

module.exports = {
  createInquiry,
  getAllInquiries, 
  getInquiryById,
  updateInquiry,
  deleteInquiry,
};
