const express = require('express');
const router = express.Router();
const { 
  createApplication, 
  getAllApplications, 
  getApplicationById, 
  updateApplication, 
  deleteApplication 
} = require('../controllers/applicationController');
const { protect, admin } = require('../middleware/authMiddleware');


router.post('/', createApplication);


router.get('/', protect, admin, getAllApplications); 


router.get('/:id', protect, admin, getApplicationById);

router.put('/:id', protect, admin, updateApplication);


router.delete('/:id', protect, admin, deleteApplication);

module.exports = router;
