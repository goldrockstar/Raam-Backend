const mongoose = require('mongoose');

const courseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default: 'https://placehold.co/400x200/E0E0E0/808080?text=Course+Image',
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    syllabus: [
      {
        type: String,
      },
    ],
    prerequisites: [
      {
        type: String,
      },
    ],
    benefits: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;