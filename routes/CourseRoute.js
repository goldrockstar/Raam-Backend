const express = require('express');
const router = express.Router();
const { getCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getCourses);
router.get('/:id', getCourseById);

// Admin routes (protected)
router.post('/admin', protect, admin, createCourse);
router.put('/admin/:id', protect, admin, updateCourse);
router.delete('/admin/:id', protect, admin, deleteCourse);

module.exports = router;