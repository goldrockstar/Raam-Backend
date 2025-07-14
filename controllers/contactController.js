const asyncHandler = require('express-async-handler');
const sendEmail = require('../utils/SendEmail'); // Ensure this path is correct (SendEmail vs sendEmail)
const Contact = require('../model/Contact'); // Import your Contact model to save data

const sendContactEmail = asyncHandler(async (req, res) => {
  // Frontend sends: FullName, EmailAddress, PhoneNumber, InterestedCourse, Subject, Message
  const { FullName, EmailAddress, PhoneNumber, InterestedCourse, Subject, Message } = req.body;

  // Basic validation for required fields
  if (!FullName || !EmailAddress || !Subject || !Message) {
    res.status(400);
    throw new Error('Please fill all required fields: Full Name, Email Address, Subject, and Message.');
  }

  try {
    // 1. Save contact form data to MongoDB
    const newContact = new Contact({
      FullName,
      EmailAddress,
      PhoneNumber,
      InterestedCourse,
      Subject,
      Message,
    });
    await newContact.save();
    console.log('Contact form data saved to DB:', newContact);

    // 2. Send email notification to admin
    const emailSubject = `New Contact Form Submission: ${Subject}`;
    const emailHtml = `
      <h3>New Contact Form Submission</h3>
      <p><strong>Full Name:</strong> ${FullName}</p>
      <p><strong>Email Address:</strong> ${EmailAddress}</p>
      <p><strong>Phone Number:</strong> ${PhoneNumber || 'N/A'}</p>
      <p><strong>Interested Course:</strong> ${InterestedCourse || 'N/A'}</p>
      <p><strong>Subject:</strong> ${Subject}</p>
      <p><strong>Message:</strong> ${Message}</p>
    `;

    // Ensure process.env.ADMIN_EMAIL is set in your .env file
    await sendEmail(process.env.ADMIN_EMAIL || 'youradmin@example.com', emailSubject, emailHtml); 

    res.status(200).json({ message: 'Message sent successfully and data saved!' });
  } catch (error) {
    console.error("Error processing contact form:", error);
    // Mongoose validation errors (if you add required:true to model fields)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400);
      throw new Error(`Validation failed: ${messages.join(', ')}`);
    } else {
      res.status(500);
      throw new Error('Failed to process contact form. Please try again later.');
    }
  }
});

module.exports = {
  sendContactEmail,
};
