const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv'); 

// IMPORTANT: Load environment variables from .env file
dotenv.config(); 

const app = express();

// DEBUG: Check if environment variables are loaded immediately after dotenv.config()
console.log('Environment variables loaded:');
console.log('PORT:', process.env.PORT);
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'NOT LOADED');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'NOT LOADED'); 

// Middleware
app.use(express.json()); // To parse JSON request bodies
app.use(cors()); // To enable CORS

// Database connection
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Raamacademy:Raamacademy2024@cluster0.5908k1n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('Connected to MongoDB'); // Log if connection is successful
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err); // Log connection errors
        process.exit(1); // Exit if connection fails
    });

// Import routes
const userRouter = require('./routes/authRoutes'); // Authentication routes
const courseRouter = require('./routes/CourseRoute'); 
const studentRouter = require('./routes/studentRoutes'); // Ensure correct path
const applicationRouter = require('./routes/applicationRoutes');
const inquiryRouter = require('./routes/inquiryRoutes'); 
const pageContentRouter = require('./routes/PageContentRoute'); 
const dashboardRouter = require('./routes/dashboardRoutes');
const settingRouter = require('./routes/settingRoutes'); 

// Import error handling middleware
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); 

// Define API routes
app.use('/api/users', userRouter); // <-- CRITICAL: Connect userRouter at /api/users base path
app.use('/api/courses', courseRouter);
app.use('/api/students', studentRouter); 
app.use('/api/applications', applicationRouter);
app.use('/api/inquiries', inquiryRouter); 
app.use('/api/page-content', pageContentRouter); 
app.use('/api/dashboard', dashboardRouter);
app.use('/api/settings', settingRouter); 

// Base route
app.get('/', (req, res) => {
    res.send('API is running');
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
