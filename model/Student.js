const mongoose = require('mongoose');

const studentSchema = mongoose.Schema(
  {
    fullName: { // Ensure this matches frontend form field 'fullName'
      type: String,
      required: true,
    },
    email: { // Ensure this matches frontend form field 'email'
      type: String,
      required: true,
      unique: true, 
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
    phone: {
      type: String,
    },
    courseOfInterest: {
      type: String,
      required: true,
      enum: [ 
        'Artificial Intelligence & Machine Learning',
        'Robotics Engineering', // <-- Ensure this is the exact value, not 'robotics'
        'Data Science',
        'Full Stack Development',
        'Python Programming',
        'Object-Oriented Programming (C++/Java)',
        'Soft Skills Training',
        'Other',
      ],
    },
    levelOfEducation: {
      type: String,
      required: true,
      enum: [ // <-- Ensure these are the exact values, not 'Bachlore of degree'
        'High School',
        'Associate Degree',
        'Bachelor\'s Degree', // <-- Corrected spelling and apostrophe
        'Master\'s Degree',
        'PhD',
        'Other',
      ],
    },
    status: {
      type: String,
      enum: ['Enrolled', 'Pending', 'Graduated', 'Dropped Out'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
