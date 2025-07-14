const asyncHandler = require('express-async-handler');
const Student = require('../model/Student'); 


const registerUser = asyncHandler(async (req, res) => {
  try {
    const newUser = new Student(req.body); 
    await newUser.save(); 
    res.status(201).json({ message: 'Registration successful!', user: newUser });
  } catch (error) {
    if (error.code === 11000) { 
      res.status(400);
      throw new Error('Email already exists. Please use a different email or contact support.');
    }
    console.error('Error during user registration:', error);
    res.status(500);
    throw new Error('Failed to complete registration. Please try again later.');
  }
});



const getAllUsers = asyncHandler(async (req, res) => {
  const students = await Student.find({}); 
  res.status(200).json(students);
});



module.exports = {
  registerUser,
  getAllUsers, 
};
