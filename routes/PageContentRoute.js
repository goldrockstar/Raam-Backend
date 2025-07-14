const express = require('express');
const router = express.Router();
const { getPageContentByPageName, createOrUpdatePageContent } = require('../controllers/pageContentController'); // <-- Correct path and names
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get page content by page name
// @route   GET /api/page-content/:pageName
// @access  Public
router.get('/:pageName', getPageContentByPageName); // <-- Ensure this is a function

// @desc    Create or update page content (using PUT for updates/creation)
// @route   PUT /api/page-content
// @access  Private/Admin
router.put('/', protect, admin, createOrUpdatePageContent); 
                                                          
module.exports = router;
