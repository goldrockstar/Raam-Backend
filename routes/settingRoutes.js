const express = require('express');
const router = express.Router();
const { getSettings, getSettingByKey, createOrUpdateSetting, deleteSetting } = require('../controllers/settingController');
const { protect, admin } = require('../middleware/authMiddleware'); // Assuming admin protection


router.get('/', protect, admin, getSettings);


router.get('/:key', protect, admin, getSettingByKey);


router.post('/', protect, admin, createOrUpdateSetting);


router.delete('/:key', protect, admin, deleteSetting);

module.exports = router;
