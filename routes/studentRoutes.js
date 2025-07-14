const express = require('express');
const router = express.Router();
const { 
  createStudent, 
  getAllStudents, 
  getStudentById, 
  updateStudent, 
  deleteStudent 
} = require('../controllers/studentController');
const { protect, admin } = require('../middleware/authMiddleware');


router.post('/', protect, admin, createStudent); 


router.get('/', protect, admin, getAllStudents);


router.get('/:id', protect, admin, getStudentById);


router.put('/:id', protect, admin, updateStudent);


router.delete('/:id', protect, admin, deleteStudent);

module.exports = router;
