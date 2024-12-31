const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const seatRoutes = require('./routes/seatRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://train-seat-manage.vercel.app'], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true, // Allow cookies if needed
  })); // Enable CORS
app.use(bodyParser.json()); // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/seats', seatRoutes); // Seat-related routes

// Error handling middleware
app.use(errorHandler);

module.exports = app;
