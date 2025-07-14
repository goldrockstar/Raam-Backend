const asyncHandler = require('express-async-handler');
const Course = require('../model/Course'); // Ensure correct path

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});

// @desc    Get single course by ID
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Create a new course
// @route   POST /api/courses/admin
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    category,
    price,
    duration,
    level,
    instructor,
    syllabus,
    prerequisites,
    benefits,
  } = req.body;

  if (!title || !description || !category || !price || !duration || !level || !instructor) {
    res.status(400);
    throw new Error('Please fill all required fields: title, description, category, price, duration, level, instructor');
  }

  const course = new Course({
    title,
    description,
    imageUrl,
    category,
    price,
    duration,
    level,
    instructor,
    syllabus: syllabus || [],
    prerequisites: prerequisites || [],
    benefits: benefits || [],
  });

  const createdCourse = await course.save();
  res.status(201).json({ message: 'Course created successfully', course: createdCourse });
});

// @desc    Update a course
// @route   PUT /api/courses/admin/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    category,
    price,
    duration,
    level,
    instructor,
    syllabus,
    prerequisites,
    benefits,
  } = req.body;

  const course = await Course.findById(req.params.id);

  if (course) {
    course.title = title || course.title;
    course.description = description || course.description;
    course.imageUrl = imageUrl || course.imageUrl;
    course.category = category || course.category;
    course.price = price || course.price;
    course.duration = duration || course.duration;
    course.level = level || course.level;
    course.instructor = instructor || course.instructor;
    course.syllabus = syllabus || course.syllabus;
    course.prerequisites = prerequisites || course.prerequisites;
    course.benefits = benefits || course.benefits;

    const updatedCourse = await course.save();
    res.json({ message: 'Course updated successfully', course: updatedCourse });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

// @desc    Delete a course
// @route   DELETE /api/courses/admin/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id);

  if (course) {
    await course.deleteOne(); // Use deleteOne()
    res.json({ message: 'Course removed' });
  } else {
    res.status(404);
    throw new Error('Course not found');
  }
});

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};