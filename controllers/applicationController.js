const asyncHandler = require('express-async-handler');
const Application = require('../model/Application'); 
const sendEmail = require('../utils/SendEmail'); 


const createApplication = asyncHandler(async (req, res) => {
  const { fullName, email, phone, courseOfInterest, levelOfEducation, message } = req.body;

  if (!fullName || !email || !courseOfInterest || !levelOfEducation) {
    res.status(400);
    throw new Error('Please fill all required fields: Full Name, Email, Course, Education Level.');
  }

  try {
    const application = new Application({
      fullName,
      email,
      phone,
      courseOfInterest,
      levelOfEducation,
      message,
    });

    const createdApplication = await application.save();

    const emailSubject = `New Course Application: ${fullName}`;
    const emailHtml = `
      <h3>New Application from Website</h3>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Course of Interest:</strong> ${courseOfInterest}</p>
      <p><strong>Level of Education:</strong> ${levelOfEducation}</p>
      <p><strong>Message:</strong> ${message || 'N/A'}</p>
      <p>Status: ${createdApplication.status}</p>
    `;
    await sendEmail(process.env.ADMIN_EMAIL || 'youradmin@example.com', emailSubject, emailHtml);

    res.status(201).json({ 
      message: 'Application submitted successfully!',
      application: createdApplication 
    });
  } catch (error) {
    console.error("Error creating application:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(409); 
      throw new Error(`An application with this email (${error.keyValue.email}) already exists. Please use a different email or contact support.`);
    } else if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400);
      throw new Error(`Application validation failed: ${messages.join(', ')}`);
    } else {
      res.status(500);
      throw new Error('Failed to create application. Please try again later.');
    }
  }
});


const getAllApplications = asyncHandler(async (req, res) => { 
  const applications = await Application.find({});
  res.json(applications);
});


const getApplicationById = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    res.json(application);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});


const updateApplication = asyncHandler(async (req, res) => {
  const { fullName, email, phone, courseOfInterest, levelOfEducation, message, status } = req.body;

  const application = await Application.findById(req.params.id);

  if (application) {
    application.fullName = fullName || application.fullName;
    application.email = email || application.email;
    application.phone = phone || application.phone;
    application.courseOfInterest = courseOfInterest || application.courseOfInterest;
    application.levelOfEducation = levelOfEducation || application.levelOfEducation;
    application.message = message || application.message;
    application.status = status || application.status;

    const updatedApplication = await application.save();
    res.json(updatedApplication);
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});


const deleteApplication = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);

  if (application) {
    await application.deleteOne();
    res.json({ message: 'Application removed' });
  } else {
    res.status(404);
    throw new Error('Application not found');
  }
});

module.exports = {
  createApplication,
  getAllApplications, 
  getApplicationById,
  updateApplication,
  deleteApplication,
};
