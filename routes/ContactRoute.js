const express = require('express');
const router = express.Router();
// Controller-ல் இருந்து sendContactEmail செயல்பாட்டை இறக்குமதி செய்யவும்
const { sendContactEmail } = require('../controllers/contactController'); 

// @desc    Send a contact email and save contact data
// @route   POST /api/contact/send-email
// @access  Public
router.post('/send-email', sendContactEmail); // Controller-ல் இருந்து இறக்குமதி செய்யப்பட்ட செயல்பாட்டைப் பயன்படுத்தவும்

module.exports = router;
