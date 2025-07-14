const asyncHandler = require('express-async-handler');
const Student = require('../model/Student'); 
const Course = require('../model/Course');   
const Application = require('../model/Application'); 
const Inquiry = require('../model/Inquiry');     


const getDashboardSummary = asyncHandler(async (req, res) => {
  const totalStudents = await Student.countDocuments();
  const totalCourses = await Course.countDocuments();
  const newApplications = await Application.countDocuments({ status: 'Pending' }); 
  const newInquiries = await Inquiry.countDocuments({ status: 'Pending' });

  res.json({
    totalStudents,
    totalCourses,
    newApplications,
    newInquiries,
  });
});

module.exports = {
  getDashboardSummary,
};
