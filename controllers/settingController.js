const asyncHandler = require('express-async-handler');
const Setting = require('../model/Setting');

// @desc    Get all settings
// @route   GET /api/settings
// @access  Private/Admin
const getSettings = asyncHandler(async (req, res) => {
  const settings = await Setting.find({});
  res.json(settings);
});

// @desc    Get a single setting by key
// @route   GET /api/settings/:key
// @access  Private/Admin (or Public if some settings are public)
const getSettingByKey = asyncHandler(async (req, res) => {
  const setting = await Setting.findOne({ key: req.params.key });

  if (setting) {
    res.json(setting);
  } else {
    res.status(404);
    throw new Error('Setting not found');
  }
});

// @desc    Create or update a setting
// @route   POST /api/settings
// @access  Private/Admin
const createOrUpdateSetting = asyncHandler(async (req, res) => {
  const { key, value, description } = req.body;

  if (!key || value === undefined || value === null) { // value can be 0 or false, so check for undefined/null
    res.status(400);
    throw new Error('Key and Value are required for a setting.');
  }

  let setting = await Setting.findOne({ key });

  if (setting) {
    // Update existing setting
    setting.value = value;
    setting.description = description || setting.description;
    const updatedSetting = await setting.save();
    res.json(updatedSetting);
  } else {
    // Create new setting
    setting = new Setting({
      key,
      value,
      description,
    });
    const createdSetting = await setting.save();
    res.status(201).json(createdSetting);
  }
});

// @desc    Delete a setting
// @route   DELETE /api/settings/:key
// @access  Private/Admin
const deleteSetting = asyncHandler(async (req, res) => {
  const setting = await Setting.findOne({ key: req.params.key });

  if (setting) {
    await setting.deleteOne();
    res.json({ message: 'Setting removed' });
  } else {
    res.status(404);
    throw new Error('Setting not found');
  }
});

module.exports = {
  getSettings,
  getSettingByKey,
  createOrUpdateSetting,
  deleteSetting,
};
