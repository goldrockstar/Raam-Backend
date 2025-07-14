const asyncHandler = require('express-async-handler');
const PageContent = require('../model/PageContent'); 

// @desc    Get page content by page name
// @route   GET /api/page-content/:pageName
// @access  Public
const getPageContentByPageName = asyncHandler(async (req, res) => {
  const { pageName } = req.params;
  console.log(`Received pageName for fetch: ${pageName}`); 

  const contentDoc = await PageContent.findOne({ pageName });

  if (contentDoc) {
    const contentToReturn = contentDoc.content && typeof contentDoc.content === 'object' ? contentDoc.content : {};
    console.log(`Content found for ${pageName}. Returning:`, contentToReturn); 
    res.json(contentToReturn); 
  } else {
    // If no content found, explicitly send a 404 with a JSON message
    console.log(`No content found for page: ${pageName}. Sending 404.`); 
    res.status(404).json({ message: `No content found for page: ${pageName}` }); 
  }
});

// @desc    Create or update page content
// @route   PUT /api/page-content
// @access  Private/Admin
const createOrUpdatePageContent = asyncHandler(async (req, res) => {
  const { pageName, content } = req.body; 

  // Ensure pageName is provided and content is a non-empty object
  if (!pageName || !content || typeof content !== 'object' || Object.keys(content).length === 0) {
    res.status(400);
    throw new Error('Page name and a non-empty content object are required');
  }

  const existingContent = await PageContent.findOne({ pageName });

  if (existingContent) {
    existingContent.content = content; // Update the entire content object
    const updatedContent = await existingContent.save();
    res.json({ message: 'Page content updated successfully', pageContent: updatedContent });
  } else {
    const newContent = new PageContent({
      pageName,
      content, // Save the entire content object (which now contains sections)
    });
    const createdContent = await newContent.save();
    res.status(201).json({ message: 'Page content created successfully', pageContent: createdContent });
  }
});

module.exports = {
  getPageContentByPageName,
  createOrUpdatePageContent,
};
