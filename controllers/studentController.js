const asyncHandler = require('express-async-handler');
const Student = require('../model/Student');
const sendEmail = require('../utils/SendEmail') 

const createStudent = asyncHandler(async (req, res) => { 
  const { fullName, email, phone, courseOfInterest, levelOfEducation, status } = req.body;

 
  if (!fullName || !email || !courseOfInterest || !levelOfEducation) {
    res.status(400);
    throw new Error('Please fill all required fields: Full Name, Email, Course, Education Level.');
  }

  try {
    const student = new Student({
      fullName,
      email,
      phone,
      courseOfInterest,
      levelOfEducation,
      status, // Include status when creating
    });

    const createdStudent = await student.save();

    // Optionally send an email notification (e.g., to the student or admin)
    // const emailSubject = `Welcome to Our Academy, ${fullName}!`;
    // const emailHtml = `<p>Dear ${fullName}, welcome to our academy. Your application for ${courseOfInterest} has been received.</p>`;
    // await sendEmail(email, emailSubject, emailHtml); // Send email to student

    res.status(201).json({ 
      message: 'Student added successfully!',
      student: createdStudent 
    });
  } catch (error) {
    console.error("Error creating student:", error);
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      res.status(409); // Conflict
      throw new Error(`A student with this email (${error.keyValue.email}) already exists.`);
    } else if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      res.status(400);
      throw new Error(`Student validation failed: ${messages.join(', ')}`);
    } else {
      res.status(500);
      throw new Error('Failed to create student. Please try again later.');
    }
  }
});

// @desc    Get all students
// @route   GET /api/students
// @access  Private/Admin
const getAllStudents = asyncHandler(async (req, res) => { 
  const students = await Student.find({});
  res.json(students);
});

// @desc    Get single student by ID
// @route   GET /api/students/:id
// @access  Private/Admin
const getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    res.json(student);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// @desc    Update a student
// @route   PUT /api/students/:id
// @access  Private/Admin
const updateStudent = asyncHandler(async (req, res) => {
  const { fullName, email, phone, courseOfInterest, levelOfEducation, status } = req.body;

  const student = await Student.findById(req.params.id);

  if (student) {
    student.fullName = fullName || student.fullName;
    student.email = email || student.email;
    student.phone = phone || student.phone;
    student.courseOfInterest = courseOfInterest || student.courseOfInterest;
    student.levelOfEducation = levelOfEducation || student.levelOfEducation;
    student.status = status || student.status; 

    const updatedStudent = await student.save();
    res.json(updatedStudent);
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

// @desc    Delete a student
// @route   DELETE /api/students/:id
// @access  Private/Admin
const deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id);

  if (student) {
    await student.deleteOne();
    res.json({ message: 'Student removed' });
  } else {
    res.status(404);
    throw new Error('Student not found');
  }
});

module.exports = {
  createStudent, // <-- Ensure this function is exported
  getAllStudents, 
  getStudentById,
  updateStudent,
  deleteStudent,
};
