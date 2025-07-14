const mongoose = require('mongoose');

const pageContentSchema = mongoose.Schema(
  {
    pageName: {
      type: String,
      required: true,
      unique: true, // Each page should have unique content
    },
    content: {
      type: Object, // Store content as a flexible object
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PageContent = mongoose.model('PageContent', pageContentSchema);

module.exports = PageContent;
