const express = require('express');
const router = express.Router();
const { createInquiry, getAllInquiries, getInquiryById, updateInquiry, deleteInquiry } = require('../controllers/inquiryController');
const { protect, admin } = require('../middleware/authMiddleware'); 


router.post('/', createInquiry);


router.get('/', protect, admin, getAllInquiries);


router.get('/:id', protect, admin, getInquiryById);


router.put('/:id', protect, admin, updateInquiry);


router.delete('/:id', protect, admin, deleteInquiry);

module.exports = router;
