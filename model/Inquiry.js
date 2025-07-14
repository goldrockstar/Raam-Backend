const mongoose = require('mongoose');

const inquirySchema = mongoose.Schema(
  {
    fullName: { 
      type: String,
      required: true,
    },
    emailAddress: { 
      type: String,
      required: true,
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Resolved', 'Closed'], 
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
