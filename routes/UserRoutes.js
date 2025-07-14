const express = require("express");
const router = express.Router();
const {registerUser, getAllUsers } = require('../controllers/userController')
const { protect, admin } = require('../middleware/authMiddleware');


router.post('/register', registerUser);

router.get('/all', protect, admin, getAllUsers);

module.exports = router;